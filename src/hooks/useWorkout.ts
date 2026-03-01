import { useState, useEffect } from "react";

export interface SetLog {
  weight: string;
  reps: string;
  rir: string;
  completed: boolean;
}

export interface ExerciseLog {
  [exerciseId: string]: SetLog[];
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  exercises: ExerciseLog;
}

const STORAGE_KEY = "fittrack-logs";

export function useWorkout() {
  const [logs, setLogs] = useState<DailyLog[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse workout logs", e);
      }
    }
  }, []);

  const saveLog = (date: string, exerciseId: string, setIndex: number, data: Partial<SetLog>) => {
    setLogs((prev) => {
      const newLogs = [...prev];
      let dayLog = newLogs.find((l) => l.date === date);

      if (!dayLog) {
        dayLog = { date, exercises: {} };
        newLogs.push(dayLog);
      }

      if (!dayLog.exercises[exerciseId]) {
        dayLog.exercises[exerciseId] = [];
      }

      // Ensure array is large enough
      while (dayLog.exercises[exerciseId].length <= setIndex) {
        dayLog.exercises[exerciseId].push({ weight: "", reps: "", rir: "", completed: false });
      }

      const currentSet = dayLog.exercises[exerciseId][setIndex];
      dayLog.exercises[exerciseId][setIndex] = { ...currentSet, ...data };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
      return newLogs;
    });
  };

  const getLogForDay = (date: string) => {
    return logs.find((l) => l.date === date);
  };

  const getHistoryForExercise = (exerciseId: string) => {
    return logs
      .filter((l) => l.exercises[exerciseId])
      .map((l) => ({
        date: l.date,
        sets: l.exercises[exerciseId],
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return { logs, saveLog, getLogForDay, getHistoryForExercise };
}
