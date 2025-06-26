"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "./ui/button";
import { InteractiveScene } from "@/components/3d/Scene3D";
import { motion, Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { image, section } from "framer-motion/client";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import imd from "@/public/icons/imd.png";
import hirable from "@/public/icons/hirable.png";
import devcode from "@/public/icons/devcode.png";
import thinkbyte from "@/public/icons/thinkbyteai.jpg";
import acm from "@/public/icons/acm.png";
import { Dancing_Script } from "next/font/google";

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400", // Pacifico only has one weight
  display: "swap",
  variable: "--font-pacifico", // Create a CSS variable
});

const items = [
  {
    id: 1,
    name: "Hirable",
    designation: "Frontend Developer",
    image: hirable,
  },
  {
    id: 2,
    name: "ACM PDEU Student Chapter",
    designation: "Full Stack Web Developer",
    image: acm,
  },
  {
    id: 3,
    name: "DevCode",
    designation: "Full Stack Web Developer",
    image: devcode,
  },
  {
    id: 4,
    name: "Indian Meteorological Department",
    designation: "Radar Research Intern",
    image: imd,
  },
  {
    id: 5,
    name: "ThinkByte AI",
    designation: "AI Software Developer",
    image: thinkbyte,
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="mx-auto max-w-6xl">
      <section className="flex items-center justify-center bg-background py-10 ">
        <div className=" px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8  items-center justify-items-center">
            {/* LEFT TEXT SECTION */}
            <motion.div
              className="flex flex-col justify-center space-y-6 items-center text-center md:items-start md:text-left "
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                variants={fadeInUp}
                className={`text-4xl ${dancingScript.className} sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter`}
              >
                Devrajsinh Jhala
              </motion.h1>

              <motion.div variants={fadeInUp}>
                <TypeAnimation
                  sequence={[
                    "Full-Stack Developer",
                    2000,
                    "AI Researcher",
                    2000,
                    "Anime Guy",
                    2000,
                    "Frontend Enthusiast",
                    2000,
                  ]}
                  wrapper="h2"
                  speed={50}
                  className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-500 h-8"
                  repeat={Infinity}
                />
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg"
              >
                I build dynamic and responsive web applications, focusing on
                performance, user experience, and creating elegant, efficient
                solutions to complex problems.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col gap-4 sm:flex-row pt-2 w-full sm:w-auto"
              >
                <Link href="/projects">
                  <Button size="lg" className="w-full sm:w-auto">
                    View My Work <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="/Devraj ML Resume.pdf" download>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Download CV <Download className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </motion.div>
              <p className="text-muted-foreground">
                Organizations I have worked with:
              </p>
              <div className="flex">
                <AnimatedTooltip items={items} />
              </div>
            </motion.div>

            {/* RIGHT 3D SCENE */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full ">
                <InteractiveScene />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero;
