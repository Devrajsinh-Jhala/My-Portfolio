// components/Footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "./ui/button";

// --- Easy to edit social links ---
const socialLinks = [
    {
        name: "Gmail",
        href: "mailto:jhaladevrajsinh11@gmail.com", // <-- Replace with your email address
        icon: <Mail className="h-5 w-5" />,
    },
  {
    name: "GitHub",
    href: "https://github.com/Devrajsinh-Jhala", // <-- Replace with your GitHub URL
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/devrajsinh-jhala/", // <-- Replace with your LinkedIn URL
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/@JHALA_D_S", // <-- Replace with your Twitter URL
    icon: <Twitter className="h-5 w-5" />,
  },
];

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full border-t border-border/40 mt-16"
    >
      <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Copyright Notice */}
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Devrajsinh Jhala. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Designed in Figma, built with Next.js & Sanity.io.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label={link.name}>
                {link.icon}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};
