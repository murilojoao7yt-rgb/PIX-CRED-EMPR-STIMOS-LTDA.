/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import AnimatedDashboard from "./components/AnimatedDashboard";
import LoanSimulator from "./components/LoanSimulator";
import CPFConsultation from "./components/CPFConsultation";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return (savedTheme as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="font-sans antialiased text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 min-h-screen flex flex-col scroll-smooth transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <AnimatedDashboard />
        <LoanSimulator />
        <CPFConsultation />
      </main>
      <Footer />
    </div>
  );
}
