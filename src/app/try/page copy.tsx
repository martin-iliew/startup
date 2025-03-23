"use client";

import { useState } from "react";
import {
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  GraduationCap,
  MapPin,
  DollarSign,
  BarChart3,
  BookOpen,
  Award,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";

const resultData = [
  {
    major: "Psychology",
    reason:
      "Psychology is a captivating major for students fascinated by human behavior and mental processes. This field offers deep insights into why people think, feel, and act as they do, blending scientific research with real-world applications. Majoring in Psychology equips you with strong analytical and interpersonal skills, and it opens doors to diverse career paths in mental health, counseling, research, education, or business settings. It's an ideal choice for those who want to make a positive impact by understanding and helping others, all while exploring the complexities of the mind and human relationships.",
    universities: [
      {
        name: "Harvard University",
        snippet:
          "Harvard's Psychology program emphasizes research and a broad foundation in cognitive, social, and clinical psychology.",
        location: "Cambridge, MA, USA",
        tuition: "$54,000 per year",
        ranking: "Ranked #3 nationally for Psychology (U.S. News)",
        difficulty: "High",
        image:
          "https://images.pexels.com/photos/18137345/pexels-photo-18137345.jpeg",
      },
      {
        name: "Stanford University",
        snippet:
          "Stanford offers a top-ranked Psychology curriculum with extensive opportunities in cognitive science and developmental research.",
        location: "Stanford, CA, USA",
        tuition: "$56,000 per year",
        ranking: "Ranked #1 Psychology program by U.S. News & World Report",
        difficulty: "High",
        image:
          "https://images.pexels.com/photos/26600254/pexels-photo-26600254.jpeg",
      },
      {
        name: "University of California, Los Angeles (UCLA)",
        snippet:
          "UCLA's Psychology department is known for its diverse specializations and large-scale research in behavioral and cognitive areas.",
        location: "Los Angeles, CA, USA",
        tuition: "$13,804 (in-state), $43,012 (out-of-state) per year",
        ranking: "Top 10 Psychology program at a public university",
        difficulty: "Medium",
        image:
          "https://images.pexels.com/photos/24304639/pexels-photo-24304639.jpeg",
      },
    ],
  },
  {
    major: "Education Sciences",
    reason:
      "Education Sciences is an inspiring major designed for those passionate about improving learning and educational systems. This field explores how people learn and how to design effective educational programs, combining insights from psychology, sociology, and policy studies. As an Education Sciences major, you'll develop skills in research, critical thinking, and curriculum design, preparing you to innovate in classrooms or shape educational policy. The major is perfect for students who want to make a meaningful difference in schools, communities, or educational institutions by ensuring teaching methods and learning environments meet the needs of diverse learners. It offers a fulfilling path for future educators, administrators, or researchers committed to transforming education and empowering the next generation.",
    universities: [
      {
        name: "University of California, Irvine (UCI)",
        snippet:
          "UCI offers a unique Education Sciences program focusing on learning theory, educational technology, and data-driven education policy.",
        location: "Irvine, CA, USA",
        tuition: "$15,000 (in-state), $45,000 (out-of-state) per year",
        ranking: "Highly ranked for education research and innovation",
        difficulty: "Medium",
        image:
          "https://images.pexels.com/photos/17893014/pexels-photo-17893014.jpeg",
      },
      {
        name: "Columbia University",
        snippet:
          "Columbia, through its Teachers College, is renowned for advanced studies in education, teacher training, and leadership in urban education.",
        location: "New York, NY, USA",
        tuition: "$61,000 per year",
        ranking:
          "Home to a top-ranked graduate education program (Teachers College)",
        difficulty: "High",
        image:
          "https://images.pexels.com/photos/28412565/pexels-photo-28412565.jpeg",
      },
      {
        name: "Vanderbilt University",
        snippet:
          "Vanderbilt's Peabody College is nationally acclaimed for its Education programs, focusing on educational policy, psychology, and human development.",
        location: "Nashville, TN, USA",
        tuition: "$52,000 per year",
        ranking: "Peabody College ranked #5 in Education (U.S. News)",
        difficulty: "High",
        image:
          "https://images.pexels.com/photos/28720833/pexels-photo-28720833.jpeg",
      },
    ],
  },
  {
    major: "Computer Science",
    reason:
      "Computer Science is a dynamic and high-demand major for those excited about technology and innovation. Studying Computer Science gives you a strong foundation in problem-solving, programming, and algorithmic thinking, enabling you to create software and systems that drive modern life. This major offers diverse specializations\u2014from artificial intelligence and cybersecurity to software engineering\u2014so you can tailor your studies to your interests. With technology at the core of nearly every industry, a Computer Science degree opens up a wide range of career opportunities in tech firms, startups, finance, healthcare, and more. It's an excellent choice for analytical thinkers who enjoy creative challenges and want to play a key role in shaping the future through technology.",
    universities: [
      {
        name: "Massachusetts Institute of Technology (MIT)",
        snippet:
          "MIT's Computer Science program (EECS) is world-renowned, offering rigorous training in algorithms, AI, and cutting-edge research opportunities.",
        location: "Cambridge, MA, USA",
        tuition: "$53,000 per year",
        ranking: "#1 Computer Science program (U.S. News & World Report)",
        difficulty: "High",
        image:
          "https://images.pexels.com/photos/16361673/pexels-photo-16361673.jpeg",
      },
      {
        name: "Stanford University",
        snippet:
          "Stanford CS is known for its innovative curriculum and entrepreneurship, with strengths in machine learning, systems, and human-computer interaction.",
        location: "Stanford, CA, USA",
        tuition: "$56,000 per year",
        ranking: "Top 3 Computer Science program nationally",
        difficulty: "High",
        image:
          "https://images.pexels.com/photos/26600254/pexels-photo-26600254.jpeg",
      },
      {
        name: "Carnegie Mellon University",
        snippet:
          "Carnegie Mellon offers a premier Computer Science program, famous for its research in artificial intelligence, robotics, and software engineering.",
        location: "Pittsburgh, PA, USA",
        tuition: "$58,000 per year",
        ranking: "Top-tier Computer Science school known for AI and robotics",
        difficulty: "High",
        image: "https://unsplash.com/photos/P64pNhm9g1s/download",
      },
    ],
  },
];

const filterOptions = {
  location: ["Any", "USA", "Europe", "Canada", "Asia", "Australia"],
  tuition: ["Any", "Low", "Medium", "High"],
  ranking: ["Any", "Top 5", "Top 10", "Top 20", "Top 50", "Top 100"],
  difficulty: ["Any", "Medium", "High", "Very High"],
  fieldOfStudy: [
    "Any",
    "Computer Science",
    "Business",
    "Engineering",
    "Arts",
    "Medicine",
    "Law",
  ],
  degreeLevel: ["Any", "Bachelor's", "Master's", "PhD"],
};

type Filters = {
  location: string;
  tuition: string;
  ranking: string;
  difficulty: string;
  fieldOfStudy: string;
  degreeLevel: string;
};

export default function Page() {
  const [selectedMajor, setSelectedMajor] = useState<string>(
    resultData[0].major
  );
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    location: "Any",
    tuition: "Any",
    ranking: "Any",
    difficulty: "Any",
    fieldOfStudy: "Any",
    degreeLevel: "Any",
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedRecommendation = resultData.find(
    (rec) => rec.major === selectedMajor
  );

  const filteredUniversities =
    selectedRecommendation?.universities.filter((uni) => {
      if (filters.location !== "Any" && uni.location !== filters.location)
        return false;
      if (filters.tuition !== "Any" && uni.tuition !== filters.tuition)
        return false;
      if (filters.ranking !== "Any" && uni.ranking !== filters.ranking)
        return false;
      if (filters.difficulty !== "Any" && uni.difficulty !== filters.difficulty)
        return false;
      return true;
    }) ?? [];

  const visibleUniversities = showAll
    ? filteredUniversities
    : filteredUniversities.slice(0, 5);

  const handleFilterChange = (category: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: "Any",
      tuition: "Any",
      ranking: "Any",
      difficulty: "Any",
      fieldOfStudy: "Any",
      degreeLevel: "Any",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        <aside
          className={`bg-white border-r border-neutral-200 w-full md:w-72 lg:w-80 shrink-0 md:block ${
            sidebarOpen ? "block" : "hidden"
          } md:top-[73px] md:h-[calc(100vh-73px)] overflow-y-auto z-30 absolute md:relative`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-sm text-primary"
              >
                Reset all
              </Button>
            </div>
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-neutral-500" />
                  <h3 className="font-medium">Location</h3>
                </div>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                >
                  {filterOptions.location.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-neutral-500" />
                  <h3 className="font-medium">Tuition</h3>
                </div>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={filters.tuition}
                  onChange={(e) =>
                    handleFilterChange("tuition", e.target.value)
                  }
                >
                  {filterOptions.tuition.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-neutral-500" />
                  <h3 className="font-medium">Field of Study</h3>
                </div>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={filters.fieldOfStudy}
                  onChange={(e) =>
                    handleFilterChange("fieldOfStudy", e.target.value)
                  }
                >
                  {filterOptions.fieldOfStudy.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-neutral-500" />
                  <h3 className="font-medium">University Ranking</h3>
                </div>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={filters.ranking}
                  onChange={(e) =>
                    handleFilterChange("ranking", e.target.value)
                  }
                >
                  {filterOptions.ranking.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-neutral-500" />
                  <h3 className="font-medium">Admission Difficulty</h3>
                </div>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={filters.difficulty}
                  onChange={(e) =>
                    handleFilterChange("difficulty", e.target.value)
                  }
                >
                  {filterOptions.difficulty.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-neutral-500" />
                  <h3 className="font-medium">Degree Level</h3>
                </div>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={filters.degreeLevel}
                  onChange={(e) =>
                    handleFilterChange("degreeLevel", e.target.value)
                  }
                >
                  {filterOptions.degreeLevel.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <Button className="w-full mt-4">Apply Filters</Button>
            </div>
          </div>
        </aside>
        <div className="md:hidden p-4 bg-white border-b border-neutral-200 sticky top-[73px] z-10 w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                sidebarOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
        <main className="flex-1 p-4 sm:p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Select Major
            </label>
            <select
              className="w-full md:w-auto border rounded-lg px-4 py-2 text-sm"
              value={selectedMajor}
              onChange={(e) => {
                setSelectedMajor(e.target.value);
                setShowAll(false);
              }}
            >
              {resultData.map((rec) => (
                <option key={rec.major} value={rec.major}>
                  {rec.major}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            {selectedRecommendation && visibleUniversities.length > 0 ? (
              <>
                <div className="bg-white rounded-xl p-6 border border-neutral-200 mb-6">
                  <h2 className="text-xl font-bold text-neutral-950 mb-2">
                    {selectedRecommendation.major}
                  </h2>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {selectedRecommendation.reason}
                  </p>
                </div>
                {visibleUniversities.map((uni, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 sm:p-6 border border-neutral-200 flex flex-col md:flex-row items-start gap-4 hover:shadow-md transition-shadow group"
                  >
                    <div className="relative w-full md:w-40 h-24 sm:h-32 flex-shrink-0 rounded-md overflow-hidden bg-neutral-100">
                      <Image
                        src={`/placeholder.svg?height=300&width=400&text=${uni.name.substring(
                          0,
                          10
                        )}...`}
                        alt={uni.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-950">
                          {uni.name}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                          {uni.snippet}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <Badge variant="outline" className="bg-neutral-50">
                          {uni.location}
                        </Badge>
                        <Badge variant="outline" className="bg-neutral-50">
                          {uni.tuition} Tuition
                        </Badge>
                        <Badge variant="outline" className="bg-neutral-50">
                          {uni.ranking}
                        </Badge>
                      </div>
                      <div className="pt-2">
                        Visit website
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-neutral-200 text-center">
                <p className="text-neutral-600">
                  No universities match your current filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
          {selectedRecommendation && filteredUniversities.length > 5 && (
            <div className="text-center mt-4 sm:mt-6">
              <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                {showAll
                  ? "See Less"
                  : `See More (${filteredUniversities.length - 5} more)`}
              </Button>
            </div>
          )}
          <div className="text-center mt-6 sm:mt-10 bg-white rounded-xl p-4 sm:p-6 border border-neutral-200">
            <p className="text-neutral-700 mb-3">
              Continue exploring close matches for your profile
            </p>
            <Button>See more recommendations</Button>
          </div>
        </main>
      </div>
      <div className="fixed bottom-6 right-6 z-30">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg"
            >
              <GraduationCap className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">EduPathfinder Assistant</h3>
                  <p className="text-sm text-neutral-500">
                    How can I help with your education journey?
                  </p>
                </div>
              </div>
              <Separator />
              <div className="bg-neutral-50 p-3 rounded-lg">
                <p className="text-sm">
                  Hello! I can help you find the perfect university match based
                  on your interests and qualifications.
                </p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Ask a question..." className="flex-1" />
                <Button size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
