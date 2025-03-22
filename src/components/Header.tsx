"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MobileMenuToggle } from "./ui/mobile-menu-toggle";
import Link from "next/link";
import BrandLogo from "./ui/logo";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [bgWhite, setBgWhite] = useState(false);

  // Only handle background color change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setBgWhite(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
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
      className={`fixed top-0 z-50 w-full font-title transition-all duration-300 ${
        bgWhite
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-md"
          : ""
      }`}
    >
      <div className="section-offset">
        <div className="flex h-18 items-center justify-between">
          <div className="left flex items-center gap-4">
            <Link href="/" className="block">
              <BrandLogo variant="horizontal" />
            </Link>
          </div>
          <div className="right flex items-center gap-4">
            <div className="hidden xl:flex gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-stone-950">
                  Влизане
                </Button>
              </Link>
              <Link href="/register">
                <Button>Регистриране</Button>
              </Link>
            </div>
            <div
              role="navigation"
              aria-label="Mobile Menu"
              className="flex xl:hidden relative"
              ref={menuRef}
            >
              <MobileMenuToggle
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                aria-expanded={menuOpen}
              />
              {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md p-10 flex flex-col gap-4">
                  <a href="#" className="block">
                    Home
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
