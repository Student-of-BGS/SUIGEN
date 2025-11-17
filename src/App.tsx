import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { GeneratePage } from "./components/GeneratePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "generate":
        return <GeneratePage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}
