"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff, Loader2, Timer, SkipForward } from "lucide-react";
import { toast } from "sonner";

export default function InterviewSession({ questions, jobrole }: any) {
  const { user } = useUser();
  const [isCalling, setIsCalling] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const vapi = useMemo(() => {
    const key = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    return key ? new Vapi(key) : null;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isCalling && timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isCalling, timeLeft]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(30); 
      
      vapi?.say(`Moving to the next question. ${questions[nextIndex].question}`);
    } else {
      vapi?.say("That was the final question. Thank you for your time. Goodbye!");
      setTimeout(() => vapi?.stop(), 5000);
    }
  };

  const startInterview = async () => {
    if (!vapi) return;
    setIsConnecting(true);

    try {
      await vapi.start({
        name: "Forced Timer Interview",
        firstMessage: `Hi ${user?.firstName}, let's start. I'll ask a question every 30 seconds. Question 1: ${questions[0].question}`,
        voice: { provider: "openai", voiceId: "shimmer" },
        model: {
          provider: "openai",
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: "You are an interviewer. Support the user as they answer." }],
        },
      } as any);

      setIsCalling(true);
      setIsConnecting(false);
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-10 bg-white rounded-3xl border-2 border-purple-100 shadow-2xl">
      {isCalling && (
        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full text-purple-700 font-mono text-lg border border-purple-200">
          <Timer className="w-5 h-5 animate-pulse" />
          Next Question in: {timeLeft}s
        </div>
      )}

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Technical Interview</h2>
        <p className="text-slate-500 font-medium italic">Role: {jobrole}</p>
      </div>

      <div className="w-full max-w-md p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 text-center shadow-inner">
        {isCalling ? `"${questions[currentQuestionIndex].question}"` : "Click start to begin the timed session"}
      </div>

      <div className="flex gap-4">
        {!isCalling ? (
          <button onClick={startInterview} disabled={isConnecting} className="bg-purple-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-purple-700 flex items-center gap-2 transition-all">
            {isConnecting ? <Loader2 className="animate-spin" /> : <Mic />}
            Start Interview
          </button>
        ) : (
          <>
            <button onClick={handleNextQuestion} className="bg-amber-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-amber-600 flex items-center gap-2 transition-all">
              <SkipForward className="w-5 h-5" /> Skip/Next
            </button>
            <button onClick={() => vapi?.stop()} className="bg-red-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-red-600 flex items-center gap-2 transition-all">
              <PhoneOff className="w-5 h-5" /> End
            </button>
          </>
        )}
      </div>
    </div>
  );
}