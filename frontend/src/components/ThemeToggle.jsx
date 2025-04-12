import React from "react";
import { motion } from "framer-motion";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full glass text-white hover:bg-blue-500/50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </motion.button>
  );
}

export default ThemeToggle;
