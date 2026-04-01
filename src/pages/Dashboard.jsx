import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import { useHabit } from "../context/HabitContext";

const Dashboard = () => {
  const { overallProgress, habits, getStreak } = useHabit();
  const progress = overallProgress();
  const maxStreak = habits.length > 0 
    ? Math.max(...habits.map(h => getStreak(h.completedDates) || 0))
    : 0;

  return (
    <div className="h-screen w-screen flex bg-[#F8FAFC] font-hello">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5D46E3] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base">H</span>
            </div>
            <h1 className="text-lg font-bold text-slate-800">Track Your Journey</h1>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-2">
          <button className="w-full h-10 bg-[#F1F5F9] text-slate-700 rounded-lg text-sm font-medium">
            Dashboard
          </button>
        </nav>

        <div className="p-4">
          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 mb-2 tracking-wider">STATUS</p>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              You're on a {maxStreak}-day streak. Keep it going!
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header-ish pill area */}
        <div className="px-6 py-4 flex items-center bg-white border-b border-slate-200">
          <div className="bg-slate-100 border border-slate-200 rounded-full px-3 py-1 flex items-center gap-2 shadow-sm">
            <span className="text-xs font-bold text-slate-600">Goal:</span>
            <span className="text-xs font-bold text-slate-600">{progress}%</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-6 p-6 overflow-hidden">
          {/* Active Habits Card */}
          <div className="col-span-8 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-700">Active Habits</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <HabitList />
            </div>
          </div>

          {/* Add Habit Card */}
          <div className="col-span-4 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm p-6">
            <h3 className="font-bold text-slate-700 mb-6 text-lg">Add Habit</h3>
            <div className="flex-1 overflow-y-auto pr-1">
              <HabitForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


