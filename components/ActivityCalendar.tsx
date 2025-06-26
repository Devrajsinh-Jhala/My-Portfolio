// components/ActivityCalendar.tsx
"use client";

import React from "react";

// --- YOUR ACTIVITY DATA ---
// This is where you control the graph.
// 'date' format: 'YYYY-MM-DD'
// 'intensity' level: 1 (lightest) to 4 (darkest)
const activityData = [
  {
    date: "2024-01-15",
    intensity: 2,
    details: "Started work on new portfolio project",
  },
  {
    date: "2024-01-16",
    intensity: 3,
    details: "Set up Next.js and Sanity CMS",
  },
  {
    date: "2024-01-20",
    intensity: 1,
    details: "Researched 3D rendering libraries",
  },
  {
    date: "2024-02-05",
    intensity: 4,
    details: "Deep work: Implemented custom shader for hero section",
  },
  {
    date: "2024-02-06",
    intensity: 2,
    details: "Refined hero section animations",
  },
  {
    date: "2024-03-10",
    intensity: 3,
    details: 'Wrote blog post: "Integrating Hashnode"',
  },
  { date: "2024-03-11", intensity: 1, details: "Fixed responsive CSS bugs" },
  {
    date: "2024-03-22",
    intensity: 4,
    details: "Completed skills globe feature",
  },
  {
    date: "2024-04-01",
    intensity: 2,
    details: "Learning Rust: Basics and syntax",
  },
  {
    date: "2024-04-02",
    intensity: 3,
    details: "Learning Rust: Ownership model",
  },
  {
    date: "2024-04-03",
    intensity: 2,
    details: "Learning Rust: Structs and Enums",
  },
  {
    date: "2024-05-18",
    intensity: 4,
    details: "Major feature push for work project",
  },
  { date: "2024-05-19", intensity: 3, details: "Code refactoring and cleanup" },
  {
    date: "2024-05-20",
    intensity: 4,
    details: "Deployed new version of work project",
  },
  // ... Add your own activities here!
];

const ActivityCalendar = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  // Create a map for quick lookups
  const dataMap = new Map(
    activityData.map((d) => [
      d.date,
      { intensity: d.intensity, details: d.details },
    ])
  );

  const days = [];
  let currentDate = new Date(startDate);
  // Adjust to start on a Sunday for grid alignment
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  for (let i = 0; i < 371; i++) {
    // Approx 53 weeks
    const dateString = currentDate.toISOString().split("T")[0];
    const data = dataMap.get(dateString);
    days.push({
      date: dateString,
      intensity: data?.intensity || 0,
      details: data?.details,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const monthLabels = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth() - 11 + i,
      1
    );
    return monthDate.toLocaleString("default", { month: "short" });
  });

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-[auto,1fr] gap-4">
        {/* Day Labels */}
        <div className="grid grid-rows-7 gap-1 text-xs text-muted-foreground pt-6">
          <div className="h-4"></div>
          <div className="h-4">Mon</div>
          <div className="h-4"></div>
          <div className="h-4">Wed</div>
          <div className="h-4"></div>
          <div className="h-4">Fri</div>
          <div className="h-4"></div>
        </div>

        {/* Main Grid */}
        <div>
          {/* Month Labels */}
          <div className="grid grid-cols-53 gap-1 text-xs text-muted-foreground mb-2">
            {monthLabels.map((month, i) => (
              <div
                key={month}
                className={`col-span-4 ${i === 0 ? "col-start-2" : ""}`}
              >
                {month}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-sm bg-level-${day.intensity} relative group`}
              >
                {day.details && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {day.details} on{" "}
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCalendar;
