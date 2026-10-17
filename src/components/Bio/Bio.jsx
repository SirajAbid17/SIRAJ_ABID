import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Bio.module.css";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDownload,
  FaArrowRight,
  FaReact,
  FaNodeJs,
  FaMobile,
  FaDocker,
  FaAws,
  FaWhatsapp,
  FaRobot,
} from "react-icons/fa";

import { SiTypescript, SiMongodb, SiAngular } from "react-icons/si";

function Bio() {
  const titles = [
    "Full Stack Developer",
    "Software Engineer",
    "MERN Stack Expert",
    "React Native Developer",
    "AI Systems Engineer",
    "Problem Solver",
  ];

  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const typingSpeed = 60;
  const pauseTime = 1500;

  const bioRef = useRef(null);
  const containerRef = useRef(null);
  const mouseTrailRef = useRef(null);
  const imageRef = useRef(null);
  const rafRef = useRef(null);

  const whatsappNumber = "923287303593";
  const cvUrl = "/Siraj_Abid_Resume.pdf";

  const openWhatsApp = () => {
    const message = "Hi Siraj! I'd like to discuss a project with you.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Siraj_Abid_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        e.clientX < rect.left - 200 ||
        e.clientX > rect.right + 200 ||
        e.clientY < rect.top - 200 ||
        e.clientY > rect.bottom + 200
      ) {
        return;
      }

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

      if (imageRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const rotY = ((currentX / 100) * rect.width - rect.width / 2) / 50;
        const rotX = ((currentY / 100) * rect.height - rect.height / 2) / 50;
        imageRef.current.style.transform = `perspective(1000px) rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (bioRef.current) observer.observe(bioRef.current);

    return () => {
      if (bioRef.current) observer.unobserve(bioRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setTitleIndex((i) => (i + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, isVisible]);

  const techStack = [
    { icon: <SiMongodb />, name: "MERN Stack", color: "#47A248" },
    { icon: <SiAngular />, name: "MEAN Stack", color: "#DD0031" },
    { icon: <FaMobile />, name: "App Development", color: "#61DAFB" },
    { icon: <FaRobot />, name: "GenAI", color: "#10A37F" },
    { icon: <FaDocker />, name: "DevOps", color: "#2496ED" },
  ];

  const orbitTech = [
    { icon: <FaReact />, color: "#61DAFB" },
    { icon: <FaNodeJs />, color: "#339933" },
    { icon: <SiTypescript />, color: "#3178C6" },
    { icon: <SiMongodb />, color: "#47A248" },
    { icon: <FaDocker />, color: "#2496ED" },
  ];

  return (
    <section
      ref={bioRef}
      id="home"
      className={`${styles.bioContainer} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.bgLayer}>
        <div className={styles.bgStars} />
        <div className={styles.bgGrid} />
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgOrb3} />
      </div>

      <div ref={containerRef} className={styles.container}>
        <div ref={mouseTrailRef} className={styles.mouseTrail} />
        <div className={styles.gradientOrb} />

        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <div className={styles.contentWrapper}>
              <div className={styles.availabilityBadge}>
                <span className={styles.availabilityDot} />
                Available for work
              </div>

              <h1 className={styles.mainTitle}>
                <span className={styles.greeting}>👋</span>
                <span className={styles.titleText}>Hi, I'm</span>
                <span className={styles.highlight}>Siraj Abid</span>
              </h1>

              <div className={styles.typingContainer}>
                <div className={styles.typingWrapper}>
                  <span className={styles.typingPrefix}>I'm a</span>
                  <span className={styles.typingText}>
                    {displayText}
                    <span className={styles.cursor}>|</span>
                  </span>
                </div>
              </div>

              <p className={styles.description}>
                Passionate Full Stack Developer specializing in creating
                exceptional digital experiences. I transform complex problems
                into simple, beautiful, and intuitive solutions.
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>2+</span>
                  <span className={styles.statLabel}>Years Experience</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>15+</span>
                  <span className={styles.statLabel}>Projects Delivered</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>5+</span>
                  <span className={styles.statLabel}>Happy Clients</span>
                </div>
              </div>

              <div className={styles.techSection}>
                <div className={styles.techTitle}>
                  <span className={styles.techTitleLine} />
                  Tech Stack
                  <span className={styles.techTitleLine} />
                </div>

                <div className={styles.techList}>
                  {techStack.map((tech, index) => (
                    <div
                      key={index}
                      className={styles.techItem}
                      style={{ "--tech-color": tech.color }}
                    >
                      <span className={styles.techIcon}>{tech.icon}</span>
                      <span className={styles.techName}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.actionButtons}>
                <motion.button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={handleDownloadCV}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <FaDownload className={styles.btnIcon} />
                  Download CV
                </motion.button>

                <motion.button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={openWhatsApp}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <FaWhatsapp className={styles.btnIcon} />
                  Let's Talk
                  <FaArrowRight className={styles.btnIcon} />
                </motion.button>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.profileContainer}>
              <div className={styles.profileImageWrapper}>
                <div className={styles.profileInner}>
                  <div className={styles.ringOrbit}>
                    <div className={styles.ring} />
                    <div className={styles.ring} />
                    <div className={styles.ring} />
                  </div>

                  <div className={styles.particlesOrbit}>
                    <span className={styles.particle} />
                    <span className={styles.particle} />
                    <span className={styles.particle} />
                    <span className={styles.particle} />
                    <span className={styles.particle} />
                    <span className={styles.particle} />
                  </div>

                  <div className={styles.techOrbit}>
                    {orbitTech.map((tech, i) => (
                      <div
                        key={i}
                        className={styles.orbitIcon}
                        style={{
                          "--angle": `${i * (360 / orbitTech.length)}deg`,
                          "--icon-color": tech.color,
                        }}
                      >
                        {tech.icon}
                      </div>
                    ))}
                  </div>

                  <div className={styles.statusRing} />

                  <div
                    id="bio-image-container"
                    ref={imageRef}
                    className={styles.imageContainer}
                  >
                    <div className={styles.imageGlow} />
                    <div className={styles.imageBorder} />
                    <div className={styles.imageBorderInner} />
                    <div className={styles.imageShine} />
                    <div className={styles.hologramOverlay} />

                    <img
                      id="bio-profile-image"
                      src="/siraj.jpeg"
                      alt="Siraj Abid"
                      className={styles.profileImage}
                    />

                    <span className={`${styles.corner} ${styles.cornerTL}`} />
                    <span className={`${styles.corner} ${styles.cornerTR}`} />
                    <span className={`${styles.corner} ${styles.cornerBL}`} />
                    <span className={`${styles.corner} ${styles.cornerBR}`} />

                    <div className={styles.floatingSocial}>
                      <motion.a
                        href="https://github.com/SirajAbid17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label="GitHub"
                        whileHover={{ scale: 1.15, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        }}
                      >
                        <FaGithub />
                      </motion.a>
                      <motion.a
                        href="https://linkedin.com/in/sirajabid17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label="LinkedIn"
                        whileHover={{ scale: 1.15, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        }}
                      >
                        <FaLinkedin />
                      </motion.a>
                      <motion.a
                        href="#"
                        className={styles.socialIcon}
                        aria-label="Facebook"
                        whileHover={{ scale: 1.15, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        }}
                      >
                        <FaFacebook />
                      </motion.a>
                    </div>
                  </div>

                  <motion.div
                    className={styles.experienceBadge}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={styles.badgeContent}>
                      <div className={styles.badgeIcon}>🏆</div>
                      <div>
                        <span className={styles.badgeYears}>2+</span>
                        <span className={styles.badgeText}>
                          Years Experience
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bio;
