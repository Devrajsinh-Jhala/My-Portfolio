// components/ModeToggle.tsx or wherever you have this file

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // This state is essential to prevent hydration mismatch errors
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder or null until the component is mounted on the client
  if (!mounted) {
    // You can return a disabled button or a skeleton loader here
    return <Button variant="outline" size="icon" disabled={true} />;
  }

  // Determine the next theme
  const toggleTheme = () => {
    // Simple toggle: if it's dark, make it light, otherwise make it dark.
    // This handles the 'system' case gracefully by forcing a selection.
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {/* 
        The magic happens here. Both icons are always in the DOM.
        Tailwind's `dark:` variants handle showing/hiding them and animating them.
      */}
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
