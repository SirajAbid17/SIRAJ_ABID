import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect, useRef } from "react";
import styles from "./Contact.module.css";

function Contact() {
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
      { threshold: 0.1 },
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

  const contacts = [
    {
      icon: faPhone,
      label: "Phone",
      value: "+92 328 7303593",
      color: "#7c8cff",
      link: "tel:+923287303593",
    },
    {
      icon: faEnvelope,
      label: "Email",
      value: "sirajabid641@gmail.com",
      color: "#b06cff",
      link: "mailto:sirajabid641@gmail.com",
    },
    {
      icon: faLinkedin,
      label: "LinkedIn",
      value: "sirajabid17",
      color: "#ff6cc1",
      link: "https://www.linkedin.com/in/sirajabid17/",
    },
    {
      icon: faGithub,
      label: "GitHub",
      value: "SirajAbid17",
      color: "#7c8cff",
      link: "https://github.com/SirajAbid17",
    },
    {
      icon: faInstagram,
      label: "Instagram",
      value: "sirajabid17",
      color: "#b06cff",
      link: "https://www.instagram.com/sirajabid17",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${isVisible ? styles.visible : ""}`}
    >
      {/* ===== BACKGROUND ===== */}
      <div className={styles.bgLayer}>
        <div className={styles.bgStars} />
        <div className={styles.bgGrid} />
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgOrb3} />
      </div>

      <div className={styles.container} ref={containerRef}>
        <div ref={mouseTrailRef} className={styles.mouseTrail} />

        {/* ===== HEADER ===== */}
        <div className={styles.headerWrap}>
          <div className={styles.eyebrowBadge}>
            <span className={styles.eyebrowDot} />
            Get in Touch
          </div>

          <h1 className={styles.mainTitle}>
            Contact <span>Me</span>
          </h1>

          <p className={styles.mainSubtitle}>
            Let's connect — I'm always open to new opportunities, projects, and
            collaborations.
          </p>

          <div className={styles.titleDivider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDiamond} />
            <span className={styles.dividerLine} />
          </div>
        </div>

        
        <div className={styles.grid}>
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target={contact.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`${styles.contactCard} ${
                hoveredCard === index ? styles.hovered : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                "--card-color": contact.color,
                "--delay": `${index * 0.08}s`,
              }}
            >
              <div
                className={styles.cardGlow}
                style={{ background: contact.color }}
              />
              <div
                className={styles.cardBorder}
                style={{ borderColor: contact.color }}
              />

              <div className={styles.cardIconWrapper}>
                <FontAwesomeIcon
                  icon={contact.icon}
                  className={styles.icon}
                  style={{ color: contact.color }}
                />
                <div
                  className={styles.iconPulse}
                  style={{ background: contact.color }}
                />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{contact.label}</span>
                <h3 className={styles.cardValue}>{contact.value}</h3>
              </div>

              <div className={styles.cardArrow}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
