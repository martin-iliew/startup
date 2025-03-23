"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/majorQuizQuestions";
import BrandLogo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

interface AnswerMap {
  [questionId: string]: string | string[];
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitting, setSubmitting] = useState(false);

  const visibleQuestions = questions.filter((q) => {
    if (!q.visibleIf) return true;
    const userAnswer = answers[q.visibleIf.questionId];
    if (Array.isArray(q.visibleIf.value)) {
      return q.visibleIf.value.includes(userAnswer as string);
    }
    return userAnswer === q.visibleIf.value;
  });

  const current = visibleQuestions[step];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    setTimeout(() => setStep((prev) => prev + 1), 200);
  };

  const handleMultiSelect = (value: string) => {
    const currentValues = Array.isArray(answers[current.id])
      ? [...(answers[current.id] as string[])]
      : [];
    const exists = currentValues.includes(value);
    const newValues = exists
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setAnswers((prev) => ({ ...prev, [current.id]: newValues }));
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }));
  };

  const handleNext = () => {
    if (!answers[current.id]) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (data.id) {
        router.push(`/recommendations?id=${data.id}`);
      }
    } catch (err) {
      console.error("❌ Failed to submit quiz", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <header className="px-6 pt-6">
        <BrandLogo variant="horizontal" />
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 flex flex-col items-center gap-6">
          {current && (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-center text-stone-900">
                {current.text}
              </h1>

              {current.type === "single" && (
                <div className="flex flex-col gap-4 w-full">
                  {current.options?.map((option) => (
                    <button
                      key={option.value}
                      className={`border rounded-full px-4 py-2 text-stone-900 hover:bg-stone-100 transition ${
                        answers[current.id] === option.value
                          ? "border-black bg-stone-100"
                          : "border-neutral-300"
                      }`}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              {current.type === "multiple" && (
                <div className="flex flex-col gap-4 w-full">
                  {current.options?.map((option) => {
                    const selected =
                      Array.isArray(answers[current.id]) &&
                      (answers[current.id] as string[]).includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleMultiSelect(option.value)}
                        className={`border rounded-full px-4 py-2 text-stone-900 hover:bg-stone-100 transition ${
                          selected
                            ? "border-black bg-stone-100"
                            : "border-neutral-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                  {/* Optional: Keep this Next button only for multiple choice questions */}
                  <Button onClick={handleNext} className="mt-2">
                    Next
                  </Button>
                </div>
              )}

              {current.type === "text" && (
                <div className="w-full space-y-3">
                  <input
                    type="text"
                    value={(answers[current.id] as string) || ""}
                    onChange={handleTextInput}
                    className="w-full border border-neutral-300 rounded-full px-4 py-2 text-stone-900 text-center"
                    placeholder="Type your answer..."
                  />
                </div>
              )}
            </>
          )}

          {/* Global navigation controls */}
          <div className="flex justify-between w-full mt-4">
            <Button variant="ghost" onClick={handleBack} disabled={step === 0}>
              Back
            </Button>

            {/* Only show this Next button if it's not already rendered (like for "multiple" type) */}
            {current?.type !== "multiple" && (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-neutral-100 text-center text-xs text-neutral-500 py-2">
        StartUP Weekend 2025
      </footer>

      {step === visibleQuestions.length && (
        <div className="fixed inset-0 bg-white flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">
              Ready to see your results?
            </h2>
            <Button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Get My Recommendations"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
