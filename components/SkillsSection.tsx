// components/SkillsSection.tsx
"use client";

import React from "react";
import { SkillsGlobe } from "./3d/SkillsGlobe"; // Adjust path if needed

const SkillsSection = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          My Top Stack
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
          Some of the primary tools and technologies I use in my projects. I am
          always eager to learn new skills and improve my knowledge.
        </p>
      </div>
      <div className="w-full h-[400px] md:h-[550px] mt-8 md:mt-12">
        <SkillsGlobe />
      </div>
    </section>
  );
};

export default SkillsSection;
