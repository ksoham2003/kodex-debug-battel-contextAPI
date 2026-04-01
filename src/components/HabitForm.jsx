import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      startDate: new Date().toISOString().split("T")[0],
      priority: "Medium",
      unit: "Minutes",
      category: "Mindset",
    },
  });

  const onSubmit = (data) => {
    addHabit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600">Habit Name</label>
        <input
          {...register("name", { required: true })}
          placeholder="e.g. Morning Exercise"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-[#5D46E3] focus:ring-1 focus:ring-[#5D46E3] outline-none transition-all text-sm text-slate-800"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Daily Goal</label>
          <input
            type="number"
            {...register("goalValue", { required: true })}
            placeholder="30"
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-[#5D46E3] focus:ring-1 focus:ring-[#5D46E3] outline-none text-sm text-slate-800"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Unit</label>
          <select
            {...register("unit")}
            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-[#5D46E3] outline-none text-sm text-slate-700"
          >
            <option>Minutes</option>
            <option>Hours</option>
            <option>Times</option>
            <option>Pages</option>
            <option>Glasses</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Start Date</label>
          <input
            type="date"
            {...register("startDate")}
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-[#5D46E3] outline-none text-sm text-slate-700"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Category</label>
          <select
            {...register("category")}
            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-[#5D46E3] outline-none text-sm text-slate-700"
          >
            <option>Mindset</option>
            <option>Fitness</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Health</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600">Motivation</label>
        <textarea
          {...register("motivation")}
          placeholder="Why is this important to you?"
          rows="2"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-[#5D46E3] outline-none transition-all resize-none text-sm text-slate-700"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600">Priority Level</label>
        <div className="grid grid-cols-3 gap-2">
          {["Low", "Medium", "High"].map((p) => (
            <label key={p} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={p}
                {...register("priority")}
                className="w-4 h-4 text-[#5D46E3] border-slate-300"
              />
              <span className="text-sm text-slate-600">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-[#5D46E3] hover:bg-[#4B38C4] text-white font-semibold rounded-md transition-colors active:bg-[#3B2BA2] mt-2"
      >
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;


