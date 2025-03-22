"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MobileMenuToggle } from "./ui/mobile-menu-toggle";
import Link from "next/link";
const items = [
  { title: "Лична", url: "/about" },
  { title: "Фирмена", url: "/dashboard" },
  { title: "Revolut <18", url: "/about" },
  { title: "Компания", url: "/dashboard" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [bgWhite, setBgWhite] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setBgWhite(currentScrollY > 50);
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHidden(true);
          } else {
            setHidden(false);
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
      className={` fixed top-0 z-50 w-full font-title transition-transform duration-300  ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        bgWhite
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80  border-b shadow-md"
          : ""
      }`}
    >
      <div className="section-offset">
        <div className="flex h-18 items-center justify-between">
          <div className="left flex items-center gap-12">
            <Link href="/" className="col-span-1 md:col-span-1 lg:col-span-1">
              <svg
                viewBox="0 0 145 32"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-32 h-8 ${
                  bgWhite ? "text-stone-950" : "text-white"
                }`}
                fill="currentColor"
              >
                <path
                  clip-rule="evenodd"
                  d="m98.8039 0h5.6871v31.7312h-5.6871zm46.0571 13.3685v-4.92408h-5.881v-6.41996h-5.687v23.40534c0 2.1506.541 3.7895 1.608 4.8714 1.066 1.0828 2.728 1.6317 4.939 1.6317h5.021v-4.924h-3.674c-.799 0-1.372-.1757-1.704-.5226-.305-.3175-.503-1.1195-.503-2.043v-11.0748zm-84.6893 12.1865 5.8804-17.11125h5.9749l-8.4889 23.28775h-6.7327l-8.489-23.28775h5.9749zm63.8513-5.4451c0 1.4743-.224 2.7569-.664 3.8121-.437 1.0495-1.063 1.8541-1.861 2.3908s-1.779.8089-2.916.8089c-1.626 0-2.853-.5344-3.646-1.5878-.802-1.0646-1.209-2.6781-1.209-4.7954v-12.29412h-5.687v12.92272c0 2.0122.251 3.7189.748 5.0721.497 1.3573 1.18 2.4614 2.029 3.281.849.8187 1.84 1.41 2.946 1.7581 1.1.3463 2.284.5217 3.518.5217 1.778 0 3.25-.3225 4.373-.9586 1.024-.5819 1.883-1.2622 2.555-2.0251l.509 2.7148h4.992v-23.28672h-5.687zm-33.913-10.43745c-1.7923-.99372-3.9206-1.49716-6.3249-1.49716-2.3749 0-4.4953.50344-6.3024 1.49684-1.8092.99597-3.2308 2.40247-4.2254 4.18037-.9931 1.7763-1.4966 3.8817-1.4966 6.2574 0 2.3466.5035 4.4373 1.4966 6.2136.994 1.7773 2.4159 3.1835 4.2254 4.1793 1.8071.9935 3.9276 1.4969 6.3024 1.4969 2.4042 0 4.5325-.5034 6.3249-1.4972 1.7942-.9953 3.2082-2.4014 4.2026-4.179.9934-1.7773 1.4971-3.868 1.4971-6.2136 0-2.3748-.5037-4.4802-1.4971-6.2575-.995-1.7781-2.4087-3.1847-4.2026-4.17995zm-3.0047 16.63905c-.9162.5966-2.0332.8993-3.3199.8993-1.2572 0-2.367-.3026-3.2986-.8995-.9332-.5976-1.665-1.441-2.1757-2.5072-.5128-1.0672-.7732-2.3099-.7732-3.6942 0-1.4128.2601-2.6627.7732-3.7154.5104-1.0518 1.2428-1.8955 2.1769-2.5081.9313-.612 2.0408-.9222 3.2973-.9222 1.2861 0 2.4025.3102 3.319.9215.9191.613 1.6443 1.457 2.1559 2.5091.5125 1.0552.7725 2.3052.7725 3.7152 0 1.3811-.26 2.6242-.7725 3.6941-.5115 1.0664-1.2364 1.9099-2.1549 2.5074zm-81.19475-18.48035h-5.91055v23.90035h5.91055zm18.53525 1.36671c0-5.07148-4.1298-9.19751668-9.2063-9.19751668h-15.2395v5.10407668h14.5149c2.2974 0 4.2004 1.80488 4.2425 4.02316.021 1.11072-.3959 2.15902-1.1738 2.95172-.7782.7929-1.818 1.2299-2.9278 1.2299h-5.65434c-.20074 0-.36413.1631-.36413.3639v4.5363c0 .0772.02383.1509.06866.213l9.59341 13.3092h7.0225l-9.6157-13.3456c4.8425-.2431 8.7396-4.3118 8.7396-9.18814zm18.1745.33907c-1.7026-.90368-3.7242-1.36164-6.0087-1.36164-2.2874 0-4.3325.50376-6.0787 1.4978-1.7491.99501-3.1251 2.40181-4.0897 4.18061-.9636 1.7748-1.452 3.8949-1.452 6.3017 0 2.3457.4959 4.4357 1.4746 6.2123.9808 1.7807 2.3955 3.1797 4.2041 4.158 1.8052.9784 3.9706 1.4743 6.4354 1.4743 1.9554 0 3.7114-.3663 5.2192-1.0894 1.5081-.7249 2.7393-1.712 3.6596-2.9341.8742-1.1615 1.464-2.4752 1.7525-3.9042l.0311-.1525h-5.6559l-.0267.0916c-.3114 1.0659-.9156 1.9081-1.7964 2.5038-.9454.6405-2.1066.9654-3.4519.9654-1.1402 0-2.17-.2443-3.0605-.7261-.8862-.479-1.5791-1.164-2.059-2.0367-.4818-.8757-.756-1.9294-.8146-3.1254v-.187h17.0842l.0191-.1044c.0596-.3278.0979-.6656.1145-1.0053.0141-.331.0223-.6616.0223-.9953-.0305-2.2563-.5348-4.2409-1.4987-5.8993-.9677-1.6603-2.3215-2.9605-4.0238-3.86417zm-2.0724 4.38547c.9717.8178 1.5762 1.9799 1.7979 3.4564h-11.2467c.1285-.958.4466-1.7877.9463-2.4683.5242-.7139 1.1957-1.2748 1.9962-1.6672.8014-.3936 1.6813-.5934 2.6148-.5934 1.5781-.0001 2.8874.4281 3.8915 1.2725z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </Link>
            <nav
              role="navigation"
              aria-label="Main navigation"
              className="hidden xl:flex items-center"
            >
              <ul className="flex gap-12">
                {items.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className={`hover:text-tone-700 font-semibold transition-colors ${
                        bgWhite ? "text-stone-950" : "text-white"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="right flex items-center gap-4">
            <div className="hidden xl:flex gap-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className={`${bgWhite ? "text-stone-950" : "text-white"}`}
                >
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

              {/* Mobile Menu */}
              {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md p-10 flex flex-col gap-4 ">
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
