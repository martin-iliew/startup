"use client";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[][]>([]);
  const [sortOption, setSortOption] = useState("Name A–Z");
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("universityRecommendations");
    if (!saved) return;

    const parsed = saved
      .split(/\n(?=\d+\.\s\*\*)/)
      .slice(1)
      .map((section) => {
        const lines = section.trim().split("\n").filter(Boolean);
        return lines;
      });

    setRecommendations(parsed);
  }, []);

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const nameA = a[0].toLowerCase();
    const nameB = b[0].toLowerCase();
    return sortOption === "Name A–Z"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-6 relative z-10">
          <div className="relative">
            <button
              onClick={() => setShowSortMenu((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-sm font-medium text-neutral-800 rounded-md border hover:shadow-xs transition"
            >
              Sort: {sortOption}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
                {["Name A–Z", "Name Z–A"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortOption(option);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 ${
                      sortOption === option ? "font-semibold" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {recommendations.length === 0 ? (
          <p className="text-neutral-400 text-lg text-center">
            Loading recommendations...
          </p>
        ) : (
          <div className="space-y-4">
            {sortedRecommendations.map((uni, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-neutral-200 flex items-start gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="relative w-40 h-32 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src="/image.png"
                    alt="University"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <h2 className="text-lg font-bold text-neutral-950">
                    {uni[0].replace(/^\d+\.\s\*\*/, "").replace(/\*\*/g, "")}
                  </h2>
                  <p className="text-neutral-700 text-sm leading-snug">
                    {uni[2].replace("- **Explanation:**", "").trim()}
                  </p>
                </div>
                <ArrowRight className="min-w-8 hover:min-w-5 text-neutral-700 mt-1" />
              </div>
            ))}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="text-center mt-10">
            <p className="text-neutral-800 mb-3">
              Continue exploring close matches
            </p>
            <Button>See more</Button>
          </div>
        )}
      </div>
    </div>
  );
}
