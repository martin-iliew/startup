"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const questions = [
  {
    key: "studyField",
    question: "What do you want to study?",
    options: ["Computer Science", "Medicine", "Business", "Art", "Engineering"],
  },
  {
    key: "freeEducation",
    question: "Do you prefer free or paid education?",
    options: ["Free", "Paid", "Doesn’t matter"],
  },
  {
    key: "studyLocation",
    question: "Do you prefer to study in your country or abroad?",
    options: ["My country", "Abroad", "No preference"],
  },
  {
    key: "language",
    question: "What languages do you speak?",
    options: ["English", "Spanish", "French", "German", "Other"],
    multiple: true,
  },
  {
    key: "budget",
    question: "What is your budget per year?",
    options: ["< $5,000", "$5,000 - $15,000", "$15,000+", "No limit"],
  },
  {
    key: "degreeLevel",
    question: "What degree level are you looking for?",
    options: ["Bachelor’s", "Master’s", "PhD"],
  },
  {
    key: "onlinePreference",
    question: "Are you open to online universities?",
    options: ["Yes", "No", "Maybe"],
  },
  {
    key: "academicStrength",
    question: "How strong are your academic results?",
    options: ["Top grades", "Above average", "Average", "Below average"],
  },
  {
    key: "preferredRegion",
    question: "Which region do you prefer to study in?",
    options: [
      "North America",
      "Europe",
      "Asia",
      "Middle East",
      "Africa",
      "Anywhere",
    ],
    multiple: true,
  },
  {
    key: "careerGoal",
    question: "What’s your career goal?",
    options: [
      "Researcher",
      "Entrepreneur",
      "Corporate job",
      "Artist",
      "Engineer",
    ],
  },
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string, multiple = false) => {
    setAnswers((prev) => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: multiple
          ? current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value]
          : [value],
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      sessionStorage.setItem("universityRecommendations", data.message);
      router.push("/recommendations");
    } catch (e) {
      console.error("❌ Failed to submit answers", e);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">University Finder Questionnaire</h1>
      {questions.map((q) => (
        <div key={q.key} className="space-y-2">
          <p className="font-medium">{q.question}</p>
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChange(q.key, opt, q.multiple)}
                className={`px-3 py-1 rounded-full border ${
                  answers[q.key]?.includes(opt)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Submitting..." : "Continue"}
      </button>
    </div>
  );
}
