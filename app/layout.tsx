import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

import { Inter, Pacifico } from "next/font/google";
import { Footer } from "@/components/Footer";

// Define the primary font for the body
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Create a CSS variable
});

// Define the cursive font for the logo
export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400", // Pacifico only has one weight
  display: "swap",
  variable: "--font-pacifico", // Create a CSS variable
});

export const metadata: Metadata = {
  title: "Devrajsinh Jhala",
  description:
    "Front End Full Stack Developer specializing in React.js, Next.js and TypeScript. I have over 2 years of experience in building and developing web applications for various start-ups and organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${inter.variable} antialiased max-w-7xl mx-auto overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
