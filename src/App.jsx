
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Bio from "./components/Bio/Bio";
import Connect from "./components/Connect/Connect";
import Contact from "./components/Contact/Contact";
import Education from "./components/Education/Education";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Projects from "./components/Projects/Projects";
import Resume from "./components/Resume/Resume";
import Skills from "./components/Skills/Skills";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Detailed from "./components/Detailed/Detailed";


const ProjectsDetailed = lazy(
  () => import("./components/Projects/ProjectsDetailed")
);


function ProjectLoading() {
  return (
    <div className="project-loading">
      <div className="project-loader">
        <div className="loader-ring"></div>
        <div className="loader-ring loader-ring-inner"></div>
        <span className="loader-icon">&lt;/&gt;</span>
      </div>

      <h2 className="loading-title">
        LOADING PROJECT
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </h2>

      <p className="loading-subtitle">
        Preparing something awesome
      </p>

      <div className="loading-progress">
        <div className="loading-progress-bar"></div>
      </div>
    </div>
  );
}

function HomePage({ theme, handleThemeToggle }) {
  return (
    <>
      <Header theme={theme} setTheme={handleThemeToggle} />
      <main>
        <Bio />
        <Detailed />
        <Education />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
        <Connect />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme =
      savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.body.className = initialTheme;
    document.documentElement.setAttribute(
      "data-theme",
      initialTheme
    );

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleThemeToggle = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );
    localStorage.setItem("theme", newTheme);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`app ${theme}`}>
      <Routes>
      
        <Route
          path="/"
          element={
            <HomePage
              theme={theme}
              handleThemeToggle={handleThemeToggle}
            />
          }
        />

     
        <Route
          path="/project/:projectId"
          element={
            <Suspense fallback={<ProjectLoading />}>
              <ProjectsDetailed />
            </Suspense>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
