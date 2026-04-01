import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits } = useHabit();

  if (!habits || habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-slate-50 rounded-2xl border border-slate-200 mt-12 max-w-md mx-auto shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-2">No habits yet</h3>
        <p className="text-slate-500 text-sm max-w-[15rem] leading-relaxed">
          Start your journey by adding a new habit above.
        </p>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const completedCount = habits.filter((h) => h.completedDates.includes(today)).length;
  const totalCount = habits.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Find dominant category
  const categories = habits.map((h) => h.category);
  const focusCategory = categories.sort((a, b) =>
    categories.filter((v) => v === a).length - categories.filter((v) => v === b).length
  ).pop();

  const highPriorityCount = habits.filter((h) => h.priority === "High").length;

  return (
    <div className="flex flex-col gap-8">
      {/* Daily Progress Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mx-auto w-full max-w-md">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1 uppercase">DAILY PROGRESS</p>
            <h2 className="text-2xl font-bold text-slate-800">Keep going</h2>
          </div>
          <div className="text-right">
            <span className="text-lg font-medium text-slate-400">{completedCount} / {totalCount}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-[#5D46E3] transition-all duration-500" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1 uppercase">FOCUS</p>
            <p className="font-bold text-slate-700">{focusCategory || "None"}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1 uppercase">PRIORITY</p>
            <p className="font-bold text-slate-700">{highPriorityCount} High Tasks</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-4 uppercase ml-2 max-w-md mx-auto">YOUR ROUTINE</p>
        <div className="grid gap-6">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitList;




