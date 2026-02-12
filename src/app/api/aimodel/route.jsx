import { OpenAI } from "openai";
import dotenv from "dotenv";
import { NextResponse } from "next/server";
dotenv.config();

const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate **exactly 5** high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{Behavioral/Technical/Problem Solving}}

Your task:
- Analyze the job description for responsibilities and skills.
- Generate **5** interview questions that fit within the given duration.
- Ensure a mix of Technical, Behavioral, and Problem‑Solving.
- Format your response as valid JSON:

{
  "interviewQuestions": [
    { "question": "First question …", "type": "Technical" },
    // … exactly four more …
  ]
}
`;

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTION_PROMPT.replace("{{job Title}}", jobPosition).replace("{{jobDescription}}", jobDescription).replace("{{duration}}", duration).replace("{{type}}", type);
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });
    //console.log(completion.choices[0].message)
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
