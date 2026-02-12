"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon, Sparkles } from "lucide-react";
import InteriewCall from "./InteriewCall";

type QuestionListProps = {
  jobrole: string;
};

interface Question {
  question: string;
  type: string;
}

function QuestionList({ jobrole }: QuestionListProps) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [isFallback, setIsFallback] = useState(false);

  const staticQuestions: Question[] = [
    { question: "Can you explain the difference between state and props in React?", type: "Technical" },
    { question: "How do you handle negative cycle in a Graph?", type: "Technical" },
    { question: "What happens when UseEffect function is used.", type: "Problem Solving" },
    { question: "How do you handle concurrency in Operating System?", type: "Technical" },
    { question: "Tell me about a difficult technical conflict you had with a team member.", type: "Behavioral" }
  ];

  useEffect(() => {
    if (jobrole) {
      GenerateQuestionList();
    }
  }, [jobrole]);

  async function GenerateQuestionList() {
    try {
      setLoading(true);
      setIsFallback(false);

      // 1. Attempt to get questions from AI Model
      const result = await axios.post("/api/aimodel", {
        jobTitle: jobrole,
        jobDescription: "Responsible for building scalable frontends using React.",
        duration: "30 minutes",
        type: "Technical",
      });

      let rawContent = result.data?.content || "";
      rawContent = rawContent.replace(/^```json\s*/, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(rawContent);
      
      if (parsed.interviewQuestions && parsed.interviewQuestions.length > 0) {
        setQuestionList(parsed.interviewQuestions);
      } else {
        throw new Error("Empty AI response");
      }

    } catch (error) {
      // console.warn("AI Model failed or timed out. Switching to manual questions.", error);
      setQuestionList(staticQuestions);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex flex-col items-center gap-3 text-purple-600 font-medium py-10 justify-center">
          <Loader2Icon className="animate-spin h-8 w-8" />
          <span className="animate-pulse">Generating interview questions for {jobrole}...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Subtle indicator that fallback questions are being used */}
          {isFallback && (
            <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100 text-center">
                Here are your Interview curated Questions.
            </div>
          )}
          
          {questionList.length > 0 ? (
            <InteriewCall questions={questionList} jobrole={jobrole} />
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-red-200 rounded-xl bg-red-50">
              <p className="text-red-500 font-bold">Failed to load questions.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionList;