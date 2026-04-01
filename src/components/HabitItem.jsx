import { Flame } from "lucide-react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, getStreak } = useHabit();

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);
  const streak = getStreak(habit.completedDates);

  const priorityColors = {
    Low: "text-blue-600 bg-blue-50",
    Medium: "text-amber-600 bg-amber-50",
    High: "text-rose-600 bg-rose-50",
  };

  return (
    <div className={`p-6 bg-white rounded-2xl border transition-all shadow-sm ${isDoneToday ? 'border-[#5D46E3] ring-1 ring-[#5D46E3]/10' : 'border-slate-200'}`}>
      {/* Header Badges & Streak */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded tracking-wider uppercase">
            {habit.category}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${priorityColors[habit.priority]}`}>
            {habit.priority}
          </span>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end leading-none">
            <span className="text-lg font-bold text-slate-800">{streak}</span>
            <span className="text-xs text-orange-400 font-bold">^^</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">STREAK</p>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-xl font-bold mb-4 transition-all ${isDoneToday ? 'text-slate-400' : 'text-slate-800'}`}>
        {habit.name}
      </h3>

      {/* Motivation Note */}
      <div className="border-l-2 border-slate-100 pl-4 mb-8 min-h-[1.5rem]">
        <p className="text-sm text-slate-400">
          {habit.motivation || "No motivation set"}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">GOAL</p>
          <p className="text-sm font-bold text-slate-700 leading-tight">
            {habit.goalValue} {habit.unit}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors">
            Edit
          </button>
          <button 
            onClick={() => deleteHabit(habit.id)}
            className="text-sm font-medium text-slate-400 hover:text-rose-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toggleHabit(habit.id)}
            className={`px-6 py-2 rounded-lg font-bold transition-all shadow-sm ${
              isDoneToday
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-[#5D46E3] text-white hover:bg-[#4B38C4] active:scale-95 shadow-[#5D46E3]/20"
            }`}
          >
            {isDoneToday ? "Done" : "Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;



