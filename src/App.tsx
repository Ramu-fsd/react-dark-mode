import { useEffect, useState } from "react";
import "./App.css";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <h1>My Dashboard</h1>
          <p>React + TypeScript Dark Mode</p>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          aria-pressed={theme === "dark"}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <section className="dashboard-card">
        <h2>Welcome back!</h2>
        <p>
          Your dashboard adapts to your preferred theme. Try switching between
          light and dark mode.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
      </section>

      <footer className="app-footer">
        Theme preference is saved automatically.
      </footer>
    </main>
  );
}

export default App;
