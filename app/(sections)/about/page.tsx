// app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { BrainCircuit, Code, Rocket, Feather } from "lucide-react";

import type { Metadata } from "next";

const aboutContent = {
  narrative: [
    `Hello! I'm Devraj Jhala, a passionate full-stack developer currently pursuing my Masters in Computer Science at BITS Pilani – Goa Campus. Over the years, I’ve interned at various startups and mid-sized companies, building modern web applications that are fast, responsive, and scalable. I love working with technologies like Next.js, Tailwind CSS, and TypeScript to create clean and intuitive UI experiences.`,

    `My journey into development began during the second year of my undergraduate studies when I built my first project — a simple portfolio website — by watching and copying code from YouTube tutorials. That small beginning sparked a curiosity that eventually turned into a serious passion for web development.`,

    `As I delved deeper into the field, I explored frontend tools like React, Redux, and TypeScript, and gradually transitioned to understanding API design and backend technologies like Node.js, PostgreSQL, MySQL, and Firebase. Discovering the power of Next.js transformed the way I approached full-stack development — making it faster, more efficient, and a lot more enjoyable.`,

    `Beyond coding, I enjoy sharing what I learn. While I don’t blog regularly, I write on Hashnode whenever I feel something is worth sharing — especially best practices, developer tools, or anything I wish I had known earlier. Writing helps me reflect and also connect with other developers on a similar journey.`,

    `Apart from tech, I’m someone who believes in continuous growth, consistency, and adding value. If you're reading this, I genuinely appreciate your time and would love to connect. Feel free to reach out to me on Twitter or LinkedIn — or check out my projects on GitHub.`,
  ],
};

const coreTechnologies = [
  {
    icon: (
      <Image
        src="https://cdn.simpleicons.org/nextdotjs/white"
        alt="Next.js"
        width={28}
        height={28}
      />
    ),
    title: "Next.js & React",
    description:
      "The foundation for modern, performant, and scalable web applications. I leverage the full power of the React ecosystem.",
  },
  {
    icon: (
      <Image
        src="https://cdn.simpleicons.org/python/white"
        alt="Python"
        width={28}
        height={28}
      />
    ),
    title: "Python & AI/ML",
    description:
      "My go-to for data science, machine learning, and AI research, using frameworks like TensorFlow and PyTorch.",
  },
  {
    icon: (
      <Image
        src="https://cdn.simpleicons.org/typescript/white"
        alt="TypeScript"
        width={28}
        height={28}
      />
    ),
    title: "TypeScript",
    description:
      "For building robust, error-free applications. Non-negotiable for any serious project.",
  },
  {
    icon: (
      <Image
        src="https://cdn.simpleicons.org/tailwindcss/white"
        alt="Tailwind CSS"
        width={28}
        height={28}
      />
    ),
    title: "Tailwind CSS",
    description:
      "A utility-first approach that enables rapid, consistent, and maintainable UI development.",
  },
];

const educationData = [
  /* ... same as before ... */
];

const bookRecommendations = [
  {
    title: "Tuesdays with Morrie",
    imageUrl:
      "https://m.media-amazon.com/images/I/314D1ycrRkL._SY445_SX342_.jpg",
  },
  {
    title: "Building a Second Brain",
    imageUrl:
      "https://m.media-amazon.com/images/I/4112+RuCgeL._SY445_SX342_.jpg",
  },
  {
    title: "Atomic Habits",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg",
  },
  {
    title: "The Four Agreements",
    imageUrl: "https://m.media-amazon.com/images/I/91AfEwKjDgL._SY425_.jpg",
  },
  {
    title: "Discipline is Destiny",
    imageUrl: "https://m.media-amazon.com/images/I/81++i4JY0GL._SY466_.jpg",
  },
  {
    title: "The Alchemist",
    imageUrl:
      "https://m.media-amazon.com/images/I/41ziEX0PJgL._SY445_SX342_.jpg",
  },
  {
    title: "Hooked",
    imageUrl:
      "https://m.media-amazon.com/images/I/51DlnjccG-L._SY445_SX342_.jpg",
  },
];

const mediaRecommendations = [
  {
    title: "Attack on Titan",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
  },
  {
    title: "Death Note",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg",
  },
  {
    title: "5 Cms per Second",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/9/92/5_Centimeters_Per_Second.jpg",
  },
  {
    title: "Garden of Words",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c3/Garden_of_Words_poster.png",
  },
  {
    title: "I Wanna Eat Your Pancreas",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/2/2a/I_Want_to_Eat_Your_Pancreas_anime_film_poster.jpg",
  },
  {
    title: "A Silent Voice",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/3/32/A_Silent_Voice_Film_Poster.jpg",
  },
  {
    title: "Jujutsu Kaisen",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
  },
];

// --- Reusable Animated Components ---

const AnimatedSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Carousel = ({
  items,
  title,
}: {
  items: { title: string; imageUrl: string }[];
  title: string;
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });
  return (
    <AnimatedSection>
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex-[0_0_33.33%] sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_16.66%]"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 text-white text-xs font-bold">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// --- Main Page Component ---

export default function AboutPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4 space-y-28">
      {/* Narrative Section */}
      <AnimatedSection className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h1 className="text-4xl font-bold tracking-tighter sticky top-28">
            My Story
          </h1>
        </div>
        <div className="md:col-span-3 space-y-6 text-lg text-muted-foreground leading-relaxed">
          {aboutContent.narrative.map((paragraph, index) => (
            <p className="text-justify" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </AnimatedSection>

      {/* Carousels Section */}
      <AnimatedSection className="space-y-20">
        <Carousel items={bookRecommendations} title="Must Read" />
        <Carousel items={mediaRecommendations} title="Must Watch" />
      </AnimatedSection>
    </div>
  );
}
