import { useState } from "react";
import { Dumbbell, History, Video, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import RoutineView from "./components/RoutineView";
import HistoryView from "./components/HistoryView";
import VideosView from "./components/VideosView";

export default function App() {
  const [activeTab, setActiveTab] = useState<"routine" | "history" | "videos">("routine");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20">
      <header className="bg-neutral-900 border-b border-neutral-800 p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-emerald-500 flex items-center gap-2">
          <Dumbbell className="w-6 h-6" />
          FitTrack Pro
        </h1>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {activeTab === "routine" && <RoutineView />}
        {activeTab === "history" && <HistoryView />}
        {activeTab === "videos" && <VideosView />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 flex justify-around p-2 z-20">
        <button
          onClick={() => setActiveTab("routine")}
          className={cn(
            "flex flex-col items-center p-2 rounded-lg transition-colors",
            activeTab === "routine" ? "text-emerald-500" : "text-neutral-500 hover:text-neutral-300"
          )}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1">Rutina</span>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex flex-col items-center p-2 rounded-lg transition-colors",
            activeTab === "history" ? "text-emerald-500" : "text-neutral-500 hover:text-neutral-300"
          )}
        >
          <History className="w-6 h-6" />
          <span className="text-xs mt-1">Historial</span>
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={cn(
            "flex flex-col items-center p-2 rounded-lg transition-colors",
            activeTab === "videos" ? "text-emerald-500" : "text-neutral-500 hover:text-neutral-300"
          )}
        >
          <Video className="w-6 h-6" />
          <span className="text-xs mt-1">Videos</span>
        </button>
      </nav>
    </div>
  );
}
