import { useState } from "react";
import { motion } from "motion/react";
import { Scan, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Generate", id: "generate" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
    { name: "Login", id: "login" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 rounded-2xl"
      style={{
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="relative">
              <Scan className="w-8 h-8" style={{ color: "#00BFFF" }} />
              <div
                className="absolute inset-0 blur-lg opacity-50"
                style={{ background: "#00BFFF" }}
              />
            </div>
            <span
              className="tracking-widest"
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#f5f5f7",
                textShadow: "0 0 20px rgba(0, 191, 255, 0.5)",
              }}
            >
              SUIGEN
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(link.id)}
                className="relative px-1 py-2 transition-colors"
                style={{
                  color:
                    currentPage === link.id ? "#00BFFF" : "#a0a0ab",
                }}
              >
                {link.name}
                {currentPage === link.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "#00BFFF" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="w-5 h-5" style={{ color: "#39FF14" }} />
              ) : (
                <Moon className="w-5 h-5" style={{ color: "#00BFFF" }} />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
