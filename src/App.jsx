import { HabitProvider } from "./context/HabitContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <HabitProvider>
      <Dashboard />
    </HabitProvider>
  );
}

export default App;
