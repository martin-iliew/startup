import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
export default function HomePage() {
  return (
    <>
      <Header />
      <section
        aria-label="Hero Section"
        className="py-12 sm:py-16 lg:py-24 min-h-[calc(100svh+4.5rem)]"
      >
        <div className="section-offset">
          <div className="grid-layout py-10 grid grid-cols-12 gap-8 items-center">
            {/* Desktop Panda (Left) */}
            <div className="col-span-12 md:col-span-6 hidden md:flex justify-center">
              <Image
                src="/panda.svg"
                alt="Panda"
                width={400}
                height={400}
                className="w-full max-w-md h-auto"
                priority
              />
            </div>

            {/* Text (always above on mobile) */}
            <div className="col-span-12 md:col-span-6 flex flex-col justify-center gap-4 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-stone-900 leading-tight">
                Discover Your Perfect Match
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-stone-700 max-w-prose mx-auto md:mx-0">
                Get tailored university & major recommendations based on your
                goals, interests, and budget.
              </p>

              {/* Desktop CTA */}
              <div className="mt-6 hidden md:block">
                <Link href="/quiz">
                  <Button size="lg">Take the quiz</Button>
                </Link>
              </div>
            </div>

            {/* Mobile Panda + Button: below the text */}
            <div className="col-span-12 flex md:hidden items-center justify-center gap-4 mt-6">
              <div className="w-24 sm:w-32">
                <div className="w-32 sm:w-40">
                  <Image
                    src="/panda.svg"
                    alt="Panda"
                    width={160}
                    height={160}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
              <Link href="/quiz">
                <Button size="lg">Take the quiz</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <p className="text-sm sm:text-base font-semibold text-stone-900">
              Personalized Results
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <p className="text-sm sm:text-base font-semibold text-stone-900">
              Compare Options
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <p className="text-sm sm:text-base font-semibold text-stone-900">
              Saves Time & Effort
            </p>
          </div>
        </div>
        <div className="bg-neutral-100 text-center text-xs text-neutral-500 py-2">
          StartUP Weekend 2025
        </div>
      </section>
    </>
  );
}
