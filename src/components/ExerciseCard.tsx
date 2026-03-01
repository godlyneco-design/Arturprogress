import React, { useState, useEffect } from "react";
import { Exercise } from "@/lib/data";
import { useWorkout, SetLog } from "@/hooks/useWorkout";
import { Check, Info, Clock, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const { saveLog, getLogForDay } = useWorkout();
  const [logs, setLogs] = useState<SetLog[]>([]);
  
  // Get today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Initialize logs based on sets
    const initialLogs = Array(exercise.sets).fill({
      weight: "",
      reps: "",
      rir: "",
      completed: false,
    });

    // Check if we have saved data for today
    const savedDay = getLogForDay(today);
    if (savedDay && savedDay.exercises[exercise.id]) {
      const savedLogs = savedDay.exercises[exercise.id];
      // Merge saved logs with initial structure
      const merged = initialLogs.map((init, i) => savedLogs[i] || init);
      setLogs(merged);
    } else {
      setLogs(initialLogs);
    }
  }, [exercise.id, today, exercise.sets]); // Re-run when exercise changes

  const handleUpdate = (index: number, field: keyof SetLog, value: string | boolean) => {
    const newLogs = [...logs];
    newLogs[index] = { ...newLogs[index], [field]: value };
    setLogs(newLogs);
    
    // Auto-save to local storage
    saveLog(today, exercise.id, index, { [field]: value });
  };

  const toggleComplete = (index: number) => {
    handleUpdate(index, "completed", !logs[index].completed);
  };

  return (
    <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
          <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {exercise.sets} series
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {exercise.rest}
            </span>
          </div>
        </div>
        <a 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.videoQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500 text-xs hover:underline"
        >
          Ver Video
        </a>
      </div>

      {exercise.note && (
        <div className="bg-neutral-800/50 p-2 rounded-lg mb-4 text-xs text-neutral-300 flex gap-2 items-start">
          <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p>{exercise.note}</p>
        </div>
      )}

      <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 text-xs text-neutral-500 mb-2 px-1">
        <div className="w-6 text-center">#</div>
        <div className="text-center">KG</div>
        <div className="text-center">Reps</div>
        <div className="text-center">RIR</div>
        <div className="w-8"></div>
      </div>

      <div className="space-y-2">
        {logs.map((log, i) => (
          <div 
            key={i} 
            className={cn(
              "grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 items-center transition-colors",
              log.completed ? "opacity-50" : "opacity-100"
            )}
          >
            <div className="w-6 text-center font-mono text-neutral-400">{i + 1}</div>
            
            <input
              type="number"
              placeholder="-"
              value={log.weight}
              onChange={(e) => handleUpdate(i, "weight", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-center text-white focus:border-emerald-500 focus:outline-none"
            />
            
            <input
              type="number"
              placeholder={exercise.reps}
              value={log.reps}
              onChange={(e) => handleUpdate(i, "reps", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-center text-white focus:border-emerald-500 focus:outline-none"
            />

            <input
              type="number"
              placeholder={exercise.rir}
              value={log.rir}
              onChange={(e) => handleUpdate(i, "rir", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-center text-white focus:border-emerald-500 focus:outline-none"
            />

            <button
              onClick={() => toggleComplete(i)}
              className={cn(
                "w-8 h-8 rounded flex items-center justify-center transition-colors",
                log.completed 
                  ? "bg-emerald-500 text-black" 
                  : "bg-neutral-800 text-neutral-500 hover:bg-neutral-700"
              )}
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseCard;
