"use client";

import { useEffect, useState } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[][]>([]);

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

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Filter Button */}
        <div className="flex justify-end mb-6 relative z-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-neutral-200 text-neutral-900 border rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm hover:bg-neutral-300 transition"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="backdrop-blur-md bg-white/80 border border-neutral-300 shadow-xl rounded-2xl max-w-md p-6">
              <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
              <div className="space-y-3">
                {/* Example filters - you can replace with your real ones */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Location
                  </label>
                  <select className="w-full px-3 py-2 border rounded-md text-sm">
                    <option>Any</option>
                    <option>USA</option>
                    <option>Canada</option>
                    <option>Europe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Tuition
                  </label>
                  <select className="w-full px-3 py-2 border rounded-md text-sm">
                    <option>Any</option>
                    <option>Free</option>
                    <option>Under $10,000</option>
                    <option>Over $10,000</option>
                  </select>
                </div>

                <Button className="w-full mt-4">Apply Filters</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Recommendations */}
        {recommendations.length === 0 ? (
          <p className="text-neutral-400 text-lg text-center">
            Loading recommendations...
          </p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((uni, idx) => (
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
