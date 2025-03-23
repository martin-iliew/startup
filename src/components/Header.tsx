"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import BrandLogo from "./ui/logo";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [bgWhite, setBgWhite] = useState(false);

  // Scroll handling: hide on scroll down, show on scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setBgWhite(currentScrollY > 50);

          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHidden(true); // Hide header on scroll down
          } else {
            setHidden(false); // Show header on scroll up
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header
      role="banner"
      className={`fixed top-0 z-50 w-full font-title transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        bgWhite
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-md"
          : ""
      }`}
    >
      <div className="section-offset">
        <div className="flex h-18 items-center justify-between">
          {/* Left: Logo */}
          <div className="left flex items-center gap-4">
            <Link href="/" className="block">
              <BrandLogo variant="horizontal" />
            </Link>
          </div>

          {/* Right: Nav + Mobile */}
          <div className="right flex items-center gap-4">
            {/* Desktop buttons */}
            <div className="hidden xl:flex gap-4">
              <Button variant="ghost" size={"lg"} className="text-stone-950">
                Log in
              </Button>
              <Button size={"lg"}>Register</Button>
            </div>

            {/* Mobile menu */}
            <div className="xl:hidden">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle Menu"
                    className="p-2 sm:p-2.5 md:p-3"
                  >
                    <Menu className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="top" className="h-screen p-8">
                  <nav className="flex flex-col gap-4 mt-12 w-full text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full justify-center text-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      Log in
                    </Button>
                    <Button
                      size="lg"
                      className="w-full justify-center text-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
