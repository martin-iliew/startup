import { getResult } from "@/lib/redis";
import Image from "next/image";
import { SlidersHorizontal, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface University {
  name: string;
  link: string;
  snippet?: string;
}

interface Recommendation {
  major: string;
  reason: string;
  universities: University[];
}

interface ResultData {
  recommendations: Recommendation[];
}

interface RecPageProps {
  searchParams: { id?: string };
}

export default async function RecommendationsPage({
  searchParams,
}: RecPageProps) {
  const resultId = searchParams.id;
  let resultData: ResultData | null = null;

  if (resultId) {
    resultData = await getResult(resultId);
  }

  if (!resultData) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Recommendations</h1>
        <p>No recommendations found. Please complete the quiz first.</p>
      </div>
    );
  }

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

        {/* Major Recommendations */}
        <div className="space-y-6">
          {resultData.recommendations.map((rec) => (
            <div
              key={rec.major}
              className="bg-white rounded-xl p-6 border border-neutral-200 flex flex-col md:flex-row items-start gap-4 hover:shadow-sm transition-shadow"
            >
              <div className="relative w-full md:w-40 h-32 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src="/image.png"
                  alt="University"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 flex-1">
                <h2 className="text-lg font-bold text-neutral-950">
                  {rec.major}
                </h2>
                <p className="text-neutral-700 text-sm leading-snug">
                  {rec.reason}
                </p>
                <ul className="list-disc list-inside text-sm text-neutral-800 mt-2 space-y-1">
                  {rec.universities.slice(0, 10).map((uni, idx) => (
                    <li key={idx}>
                      <a
                        href={uni.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {uni.name}
                      </a>
                      {uni.snippet && (
                        <span className="text-neutral-600">
                          {" "}
                          – {uni.snippet}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <ArrowRight className="text-neutral-600 mt-1 md:mt-0" />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-neutral-800 mb-3">
            Continue exploring close matches
          </p>
          <Button>See more</Button>
        </div>
      </div>
    </div>
  );
}
