import { createContext, useContext, useState, useEffect } from "react";

const HabitContext = createContext();

const getToday = () => new Date().toISOString().split("T")[0];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit) => {
    const newHabit = {
      ...habit,
      id: Date.now(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const toggleHabit = (id) => {
    const today = getToday();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const alreadyDone = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: alreadyDone
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  };

  const getStreak = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];
      if (completedDates.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // If today is not completed but yesterday was, we might still count the streak
        // but for simplicity, let's just check if it's broken.
        break;
      }
    }
    
    return streak;
  };

  const updateHabit = (id, data) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...data } : h)));
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const overallProgress = () => {
    if (habits.length === 0) return 0;
    const today = getToday();
    const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
    return Math.round((completedToday / habits.length) * 100);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        toggleHabit,
        updateHabit,
        deleteHabit,
        getStreak,
        showAll,
        setShowAll,
        overallProgress,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabit must be used within a HabitProvider");
  }
  return context;
};