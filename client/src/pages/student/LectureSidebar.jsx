import React from "react";
import { PlayCircle, CheckCircle2 } from "lucide-react";

export default function LectureSidebar({
  lectures = [],
  currentLecture,
  onSelectLecture,
  completedLectures = [],
}) {
  return (
    <aside className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
      <h3 className="text-white text-base font-bold mb-4 pb-3 border-b border-slate-800">
        Course Content
      </h3>
      <div className="space-y-2">
        {lectures.map((item, index) => {
          const isSelected = currentLecture?._id === item._id;
          const isDone = completedLectures.includes(item._id);

          return (
            <button
              key={item._id || index}
              onClick={() => onSelectLecture && onSelectLecture(item)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-blue-700 text-white font-semibold shadow-md"
                  : "bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800/80"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-slate-500 font-mono">
                  {index + 1}
                </span>
                <span className="line-clamp-1">{item.title}</span>
              </div>
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <PlayCircle className="w-4 h-4 text-slate-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}