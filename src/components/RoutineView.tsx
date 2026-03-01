import { useState, useEffect } from "react";
import { routine } from "@/lib/data";
import { cn } from "@/lib/utils";
import ExerciseCard from "./ExerciseCard";

export default function RoutineView() {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  useEffect(() => {
    const today = new Date().getDay();
    // If it's weekend (0 or 6), default to Monday (1). Otherwise use today.
    if (today === 0 || today === 6) {
      setSelectedDay(1);
    } else {
      setSelectedDay(today);
    }
  }, []);

  const currentRoutine = routine.find((r) => r.dayOfWeek === selectedDay);

  return (
    <div className="pb-20">
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
        {routine.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.dayOfWeek)}
            className={cn(
              "px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors",
              selectedDay === day.dayOfWeek
                ? "bg-emerald-500 text-black"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
            )}
          >
            {day.name.split(" - ")[0]}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {currentRoutine?.name}
        </h2>
        
        {currentRoutine?.exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}
