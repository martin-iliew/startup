"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/ui/logo";

interface Question {
  question: string;
  type: "input" | "select";
  options?: string[];
  conditionalOnAnswer?: {
    step: number;
    value: string;
  };
}

const questions: Question[] = [
  {
    question: "What is your gender?",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  {
    question: "How old are you?",
    type: "input",
  },
  {
    question: "In which country do you live?",
    type: "input",
  },
  {
    question: "Do you prefer to study in your country or abroad?",
    type: "select",
    options: ["My country", "Abroad", "No preference"],
  },
  {
    question: "What languages do you speak?",
    type: "select",
    options: ["English", "French", "Spanish", "German", "Other"],
    conditionalOnAnswer: { step: 3, value: "Abroad" },
  },
  {
    question: "Which region do you prefer to study in?",
    type: "select",
    options: [
      "North America",
      "Europe",
      "Asia",
      "Middle East",
      "Africa",
      "Anywhere",
    ],
    conditionalOnAnswer: { step: 3, value: "Abroad" },
  },
  {
    question: "Do you have preference for specific country?",
    type: "input",
    conditionalOnAnswer: { step: 3, value: "Abroad" },
  },
  {
    question: "What is your budget per year?",
    type: "select",
    options: ["Less than $5,000", "$5,000 - $15,000", "$15,000+", "No limit"],
  },
  {
    question: "Are you open to online universities?",
    type: "select",
    options: ["Yes", "No", "Maybe"],
  },
  {
    question: "How strong are your academic results?",
    type: "select",
    options: ["Top grades", "Above average", "Average", "Below average"],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const getVisibleQuestions = () => {
    return questions.filter((q) => {
      if (!q.conditionalOnAnswer) return true;
      const { step, value } = q.conditionalOnAnswer;
      return answers[step] === value;
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const current = visibleQuestions[currentStep];
  const isLast = currentStep === visibleQuestions.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [questions.indexOf(current)]: value }));
  };

  const handleNext = async () => {
    const currentAnswer = answers[questions.indexOf(current)];
    if (!currentAnswer) return;

    if (!isLast) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setSubmitting(true);
      try {
        const res = await fetch("/api/questionnaire", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });
        const data = await res.json();
        sessionStorage.setItem("universityRecommendations", data.message);
        router.push("/recommendations");
      } catch (err) {
        console.error("❌ Failed to submit quiz answers", err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <header className="px-6 pt-6">
        <BrandLogo variant="horizontal" />
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 flex flex-col items-center gap-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-stone-900">
            {current.question}
          </h1>

          {current.type === "select" && (
            <div className="flex flex-col gap-4 w-full">
              {current.options?.map((option) => (
                <button
                  key={option}
                  className={`border rounded-full px-4 py-2 text-stone-900 hover:bg-stone-100 transition ${
                    answers[questions.indexOf(current)] === option
                      ? "border-black bg-stone-100"
                      : "border-neutral-300"
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {current.type === "input" && (
            <input
              type="text"
              value={answers[questions.indexOf(current)] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full border border-neutral-300 rounded-full px-4 py-2 text-stone-900 text-center"
              placeholder="Type here..."
            />
          )}

          <div className="flex justify-between w-full mt-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[questions.indexOf(current)] || submitting}
            >
              {isLast ? (submitting ? "Submitting..." : "Finish") : "Next"}
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-100 text-center text-xs text-neutral-500 py-2">
        StartUP Weekend 2025
      </footer>
    </div>
  );
}
