"use client";

import Image from "next/image";
import clsx from "clsx";

interface BrandLogoProps {
  variant?: "horizontal" | "vertical";
  bgWhite?: boolean;
}

export default function BrandLogo({
  variant = "horizontal",
  bgWhite = false,
}: BrandLogoProps) {
  return (
    <div className="flex flex-col items-center w-full h-auto">
      {variant === "horizontal" ? (
        <div className="w-full max-w-[150px] h-auto">
          <Image
            src="/horizontal.svg"
            alt="Horizontal Logo"
            width={150}
            height={40}
            className={clsx(
              "w-full h-auto object-contain",
              bgWhite ? "text-stone-950" : "text-white"
            )}
          />
        </div>
      ) : (
        <div className="w-full max-w-[100px] h-auto">
          <Image
            src="/vertical.svg"
            alt="Vertical Logo"
            width={100}
            height={100}
            className={clsx(
              "w-full h-auto object-contain",
              bgWhite ? "text-stone-950" : "text-white"
            )}
          />
        </div>
      )}
    </div>
  );
}
