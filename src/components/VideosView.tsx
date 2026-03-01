import { routine } from "@/lib/data";
import { ExternalLink, Play } from "lucide-react";

export default function VideosView() {
  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">Biblioteca de Videos</h2>

      {routine.map((day) => (
        <div key={day.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-500 border-b border-neutral-800 pb-2">
            {day.name}
          </h3>
          
          <div className="grid gap-3">
            {day.exercises.map((exercise) => (
              <a
                key={exercise.id}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.videoQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex items-center justify-between group hover:border-emerald-500/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                    {exercise.name}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">{exercise.note}</p>
                </div>
                <div className="bg-neutral-800 p-2 rounded-full group-hover:bg-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
