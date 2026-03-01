import { useWorkout, SetLog } from "@/hooks/useWorkout";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { routine } from "@/lib/data";

export default function HistoryView() {
  const { logs } = useWorkout();

  // Sort logs by date descending
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sortedLogs.length === 0) {
    return (
      <div className="text-center py-20 text-neutral-500">
        <p>No hay historial aún.</p>
        <p className="text-sm mt-2">Completa tu primer entrenamiento para verlo aquí.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">Historial</h2>
      
      {sortedLogs.map((log) => {
        const date = parseISO(log.date);
        // Find which routine day this corresponds to (heuristic: check first exercise)
        const firstExerciseId = Object.keys(log.exercises)[0];
        const dayName = routine.find(r => r.exercises.some(e => e.id === firstExerciseId))?.name || "Entrenamiento";

        return (
          <div key={log.date} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
              <div>
                <h3 className="font-semibold text-white">{dayName.split(" - ")[0]}</h3>
                <p className="text-xs text-neutral-400 capitalize">
                  {format(date, "EEEE, d 'de' MMMM", { locale: es })}
                </p>
              </div>
              <div className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-300">
                {Object.keys(log.exercises).length} Ejercicios
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(log.exercises).map(([exerciseId, setsData]) => {
                const sets = setsData as SetLog[];
                const exerciseDef = routine.flatMap(r => r.exercises).find(e => e.id === exerciseId);
                if (!exerciseDef) return null;

                const completedSets = sets.filter(s => s.completed).length;
                if (completedSets === 0) return null;

                const bestSet = sets.reduce((best, current) => {
                  const currentWeight = parseFloat(current.weight) || 0;
                  const bestWeight = parseFloat(best.weight) || 0;
                  return currentWeight > bestWeight ? current : best;
                }, sets[0]);

                return (
                  <div key={exerciseId} className="flex justify-between text-sm">
                    <span className="text-neutral-300 truncate pr-4">{exerciseDef.name}</span>
                    <span className="text-emerald-500 font-mono whitespace-nowrap">
                      {completedSets} x {bestSet.weight || "-"}kg
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
