// components/ExperienceSection.tsx
"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import Link from "next/link";

// --- UPDATED: Data structure with optional certificate URL ---
const experienceData = [
  {
    role: "AI Software Developer",
    company: "ThinkByte AI",
    duration: "April 2024 to June 2024",
    description:
      "Worked on creating Lang chain based models for SEO writing, content writing, etc. Worked on SEO lead generation Product which uses SerperAPI and ChatGPT API to get structured leads for clients on a pay-per-use basis. Worked on maintaining and optimizing the company's website on subjects of web page performance and SEO score based on data by Google Search Analytics",
    certificateUrl:
      "https://drive.google.com/file/d/1pKCR5DGq0SjyrxrqmEaxbeQ1jUiayFan/view?usp=sharing", // Example path
  },
  {
    role: "Research Intern",
    company: "IMD",
    duration: "June 2023 to August 2023",
    description:
      "Worked on contributing to Rainfall Estimation using a customized dynamic Z-R relationship based on echo for Bhopal. Focused on visualizing and segregating clouds from radar images and estimating rainfall from it using the Marshal-Palmer Equation.",
    certificateUrl:
      "https://drive.google.com/file/d/1_efTG_yeATNUg09NmKg9fpy7zBuoI66m/view", // Example path
  },
  {
    role: "ACM Core Team Member - Web Development",
    company: "ACM PDEU Student Chapter",
    duration: "June 2023",
    description:
      "Responsible for building the ACM PDEU Student Chapter website, featuring a fully functional blog and event information system to serve the university community.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Devcode",
    duration: "April 2023 to May 2023",
    description:
      "Integrated REST APIs into a React front-end, managed application state using Redux, and upgraded the user interface with Tailwind CSS for a more modern and responsive design.",
    certificateUrl:
      "https://drive.google.com/file/d/1TkyY4_673sToTGk5uLHHx8JM2YbXqxvX/view", // Example path
  },
  {
    duration: "March 2023",
    role: "Website Development Manager",
    company: "TEDxPDEU",
    description:
      "Led the team that built the website for TEDxPDEU Event 2023. Consisted of 3 members the website built was crucial for the success of the event as more than 90% leads came from the website only",
  },
  {
    role: "Front End Developer Intern",
    company: "Hirable",
    duration: "June 2022 to August 2022",
    description:
      "Built the front end of 5 landing pages for the company and 2 admin dashboards in Next.js, TailwindCSS.Achieved 75% decrease in loading time of the site via image optimizations and implemented incremental server regeneration.",
    certificateUrl:
      "https://drive.google.com/file/d/1MiBEDEsAxqBFJdbC48t18rIOZZIM5Y5z/view", // Example path
  },
];

const ExperienceSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center tracking-tighter sm:text-4xl mb-12">
          Experience
        </h2>

        <div className="relative">
          {/* The vertical timeline line */}
          <div className="absolute left-3 top-0 h-full w-0.5 bg-border"></div>

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-10" // Padding to the left of the line
              >
                {/* The timeline dot */}
                <div className="absolute left-3 top-1.5 h-3 w-3 bg-primary rounded-full -translate-x-1/2"></div>

                {/* The content */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    {exp.duration}
                  </p>
                  <h3 className="text-xl font-bold mt-1">
                    {exp.role} at {exp.company}
                  </h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* --- CONDITIONAL CERTIFICATE BUTTON --- */}
                  {exp.certificateUrl && (
                    <div className="mt-4">
                      <Link
                        href={exp.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" size="sm">
                          Certificate <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
