// components/Navbar.tsx
"use client"; // This must be a client component to use state and hooks

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { ModeToggle } from "./DarkMode";
import myImage from "@/public/icons/myImage.jpg"; // Your image import

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/research", label: "Research" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={myImage} // Using the imported static image object
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full border-2 border-border"
            priority // Good for LCP
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden sm:flex items-center gap-x-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary"></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <ModeToggle />

          {/* Hamburger Menu Button (visible only on small screens) */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-foreground transition-colors hover:bg-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="sm:hidden fixed inset-x-0 top-[65px] z-40 h-[calc(100vh-65px)] bg-background/95 backdrop-blur-lg"
          >
            <ul className="flex flex-col items-center justify-center h-full space-y-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)} // Close menu on link click
                    className="text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
