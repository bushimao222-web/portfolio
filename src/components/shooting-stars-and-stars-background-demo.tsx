"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div className="h-[40rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full overflow-hidden">
      <h2 className="relative z-10 text-4xl md:text-5xl font-semibold text-center text-white mb-6">
        Shooting Stars x Star Background
      </h2>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
