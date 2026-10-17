import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiagramProject,
  faUsers,
  faBriefcase,
  faClock,
  faTrophy,
  faDownload,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import styles from "./Resume.module.css";

function Resume() {
  const url = "Siraj_Abid_Resume.pdf";
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const sectionRef = useRef();
  const containerRef = useRef();
  const mouseTrailRef = useRef();
  const rafRef = useRef();

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

 
  useEffect(() => {
    if (window.innerWidth <= 900) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let isActive = false;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (
        e.clientX < rect.left - 300 ||
        e.clientX > rect.right + 300 ||
        e.clientY < rect.top - 300 ||
        e.clientY > rect.bottom + 300
      )
        return;

      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;

      if (!isActive) {
        isActive = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (mouseTrailRef.current) {
        mouseTrailRef.current.style.transform = `translate3d(calc(${currentX}% - 200px), calc(${currentY}% - 200px), 0)`;
      }

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        isActive = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "sirajabid.pdf";
    link.click();
  };

  const stats = [
    { icon: faDiagramProject, label: "Projects", value: "15+", color: "#7c8cff" },
    { icon: faBriefcase, label: "Experience", value: "3+ Yrs", color: "#b06cff" },
    { icon: faUsers, label: "Clients", value: "10+", color: "#ff6cc1" },
    { icon: faClock, label: "Hours Worked", value: "1000+", color: "#7c8cff" },
    { icon: faTrophy, label: "Rank", value: "Top 10%", color: "#b06cff" },
  ];

  return (
    <section
      id="resume"
      ref={sectionRef}
      className={`${styles.resumeSection} ${isVisible ? styles.visible : ""}`}
    >
     
      <div className={styles.bgLayer}>
        <div className={styles.bgStars} />
        <div className={styles.bgGrid} />
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgOrb3} />
      </div>

      <div className={styles.container} ref={containerRef}>
        <div ref={mouseTrailRef} className={styles.mouseTrail} />

        
        <div className={styles.headerWrap}>
          <div className={styles.eyebrowBadge}>
            <span className={styles.eyebrowDot} />
            My Professional Journey
          </div>

          <h1 className={styles.mainTitle}>
            My <span>Resume</span>
          </h1>

          <p className={styles.mainSubtitle}>
            A snapshot of my professional journey — numbers that tell the story
            of dedication, growth, and delivered value.
          </p>

          <div className={styles.titleDivider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDiamond} />
            <span className={styles.dividerLine} />
          </div>
        </div>

      
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${styles.headingCard} ${
                hoveredCard === index ? styles.hovered : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                "--card-color": stat.color,
                "--delay": `${index * 0.08}s`,
              }}
            >
              <div className={styles.cardGlow} style={{ background: stat.color }} />
              <div className={styles.cardBorder} style={{ borderColor: stat.color }} />

              <div className={styles.cardIconWrapper}>
                <FontAwesomeIcon
                  icon={stat.icon}
                  className={styles.icon}
                  style={{ color: stat.color }}
                />
                <div className={styles.iconPulse} style={{ background: stat.color }} />
              </div>

              <h2 className={styles.statValue} style={{ color: stat.color }}>
                {stat.value}
              </h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

       
        <div className={styles.ctaWrap}>
          <button className={styles.downloadButton} onClick={handleDownload}>
            <span className={styles.btnGlow} />
            <FontAwesomeIcon icon={faDownload} className={styles.btnIcon} />
            <span className={styles.btnText}>Download Resume</span>
            <FontAwesomeIcon icon={faRocket} className={styles.btnRocket} />
          </button>
          <span className={styles.ctaHint}>
            PDF · Updated {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Resume;