import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner@2.0.3";
import PreLoader from "./components/PreLoader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { QuickStats } from "./components/QuickStats";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { StarfieldBackground } from "./components/StarfieldBackground";
import "./styles/globals.css";

export default function App() {
  const [showPreLoader, setShowPreLoader] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mediaQuery.matches);
    apply();

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    document.documentElement.classList.add("dark");

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reduceMotion]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "experience",
        "skills",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePreLoaderComplete = () => {
    setShowPreLoader(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white overflow-x-hidden">
      <Toaster position="top-right" theme="dark" />

      <StarfieldBackground reduceMotion={reduceMotion} />

      <div className="relative z-[2]">
        <AnimatePresence mode="wait">
          {showPreLoader ? (
            <PreLoader
              key="pre-loader"
              onComplete={handlePreLoaderComplete}
              reduceMotion={reduceMotion}
            />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen"
            >
              <Navbar activeSection={activeSection} />

              <main>
                <Hero reduceMotion={reduceMotion} />
                <QuickStats />
                <Experience />
                <Skills reduceMotion={reduceMotion} />
                <Projects />
                <Education />
                <Certifications />
                <Contact />
              </main>

              <Footer />
              <ScrollProgressBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;
      const progress =
        totalHeight > 0
          ? (window.scrollY / totalHeight) * 100
          : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0078d4] to-cyan-500 z-50 origin-left"
      style={{ scaleX: scrollProgress / 100 }}
    />
  );
}