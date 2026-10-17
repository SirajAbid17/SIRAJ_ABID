import { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Projects.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

import { getLightProjects } from "../../data/projectsCache";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);

  const projectsContainerRef = useRef(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);

 
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const dragStartRef = useRef({ x: 0, time: 0 });
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);

 
  const projects = useMemo(() => getLightProjects(), []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

 
  const getGap = () => {
    if (!trackRef.current) return 28;
    const cs = window.getComputedStyle(trackRef.current);
    const gapValue = cs.columnGap || cs.gap || "28px";
    const parsed = parseFloat(gapValue);
    return isNaN(parsed) ? 28 : parsed;
  };

  const getStep = () => {
    if (!trackRef.current) return 0;
    const slides = trackRef.current.children;
    if (!slides || slides.length < 1) return 0;
    const rect = slides[0].getBoundingClientRect();
    if (!rect.width) return 0;
    return rect.width + getGap();
  };

  const applyTrackPosition = (index, animate = true) => {
    if (!trackRef.current) return;
    const step = getStep();
    if (!step) return;
    const targetX = -index * step;

    if (animate) {
      gsap.to(trackRef.current, {
        x: targetX,
        duration: 0.75,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      gsap.set(trackRef.current, { x: targetX });
    }
  };

 
  useEffect(() => {
    const updateItemsPerView = () => {
      const w = window.innerWidth;
      if (w >= 1200) setItemsPerView(3);
      else if (w >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

 
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

 
  useLayoutEffect(() => {
    applyTrackPosition(currentIndex, true);
   
  }, [currentIndex, itemsPerView]);

 
  useEffect(() => {
    const handleReposition = () => {
      applyTrackPosition(currentIndex, false);
    };

    let raf1, raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(handleReposition);
    });

    window.addEventListener("resize", handleReposition);
    window.addEventListener("orientationchange", handleReposition);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("orientationchange", handleReposition);
    };
   
  }, [currentIndex, itemsPerView]);

 
  useLayoutEffect(() => {
    if (!projectsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const trigger = projectsContainerRef.current;

      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger,
            start: "top 85%",
            once: true,
          },
        });
      }

      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.1,
          delay: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger,
            start: "top 85%",
            once: true,
          },
        });
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (carouselRef.current) {
        gsap.from(carouselRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          delay: 0.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger,
            start: "top 75%",
            once: true,
          },
        });
      }
    }, projectsContainerRef);

    return () => ctx.revert();
  }, []);

 
  const goToSlide = (index) => {
    const clamped = Math.max(0, Math.min(maxIndex, index));
    setCurrentIndex(clamped);
    applyTrackPosition(clamped, true);
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  
  const handleDragStart = (e) => {
    const target = e.target;
    if (target.closest("a") || target.closest("button")) return;

    isDraggingRef.current = true;
    setIsDragging(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = { x: clientX, time: Date.now() };
    dragOffsetRef.current = 0;
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartRef.current.x;
    dragOffsetRef.current = diff;

    if (trackRef.current) {
      const baseX = -currentIndex * getStep();
      gsap.set(trackRef.current, { x: baseX + diff });
    }
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const timeDiff = Math.max(1, Date.now() - dragStartRef.current.time);
    const velocity = Math.abs(dragOffsetRef.current) / timeDiff;

    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 40 : 60;
    const fastSwipeThreshold = isMobile ? 15 : 25;

    const isFastSwipe =
      velocity > 0.4 && Math.abs(dragOffsetRef.current) > fastSwipeThreshold;

    if (
      dragOffsetRef.current < -threshold ||
      (isFastSwipe && dragOffsetRef.current < 0)
    ) {
      nextSlide();
    } else if (
      dragOffsetRef.current > threshold ||
      (isFastSwipe && dragOffsetRef.current > 0)
    ) {
      prevSlide();
    } else {
      goToSlide(currentIndex);
    }
  };

 
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  
  }, [currentIndex, maxIndex]);

  return (
    <section
      ref={projectsContainerRef}
      className={styles.projectsContainer}
      id="projects"
    >
      <div ref={headerRef} className={styles.projectsHeader}>
        <div className={styles.headerEyebrow}>
          <span className={styles.headerDot} />
          Selected Work
          <span className={styles.headerLine} />
          2024 — 2026
        </div>
        <h1 ref={titleRef} className={styles.mainTitle}>
          Recent Projects
        </h1>
        <p ref={subtitleRef} className={styles.projectsSubtitle}>
          A collection of digital products, AI experiences and full-stack
          applications crafted with modern technologies.
        </p>
      </div>

      <div className={styles.carouselWrapper} ref={carouselRef}>
        <div
          className={styles.carouselTrack}
          ref={trackRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onTouchCancel={handleDragEnd}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={styles.carouselSlide}
              style={{ "--items": itemsPerView, userSelect: "none" }}
            >
              <article className={styles.projectCard}>
                <div className={styles.projectImageWrap}>
                  <img
                    src={project.url}
                    alt={project.name}
                    className={styles.projectImage}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.imageGradient} />
                  <div className={styles.imageIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.imageCategory}>
                    <span className={styles.categoryDot} />
                    {project.technologies[0]}
                  </div>
                  <div
                    className={styles.imageHoverOverlay}
                    onClick={() => handleViewProject(project.id)}
                  >
                    <div className={styles.viewButton}>
                      <span>View Project</span>
                      <FaArrowUpRightFromSquare className={styles.viewArrow} />
                    </div>
                  </div>
                </div>

                <div className={styles.projectBody}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.projectTitle}>{project.name}</h3>
                    <span className={styles.projectYear}>{project.year}</span>
                  </div>

                  <div className={styles.techChips}>
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className={styles.techChip}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className={styles.techChipMore}>
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <p className={styles.projectDesc}>{project.description}</p>

                  <div className={styles.projectActions}>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionBtn}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <FaGithub />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <FaPlay />
                        <span>Demo</span>
                      </a>
                    )}
                    <button
                      className={`${styles.actionBtn} ${styles.actionBtnView}`}
                      onClick={() => handleViewProject(project.id)}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <FaArrowUpRightFromSquare />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <button
          className={`${styles.carouselNav} ${styles.carouselNavPrev}`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          className={`${styles.carouselNav} ${styles.carouselNavNext}`}
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.carouselFooter}>
        <div className={styles.carouselDots}>
          {projects.map((_, i) => {
            const isActive =
              i >= currentIndex && i < currentIndex + itemsPerView;
            const targetIndex = Math.min(i, maxIndex);
            return (
              <button
                key={i}
                className={`${styles.carouselDot} ${
                  isActive ? styles.carouselDotActive : ""
                }`}
                onClick={() => goToSlide(targetIndex)}
                aria-label={`Go to project ${i + 1}`}
              >
                <span className={styles.carouselDotInner} />
              </button>
            );
          })}
        </div>

        <div className={styles.carouselCounter}>
          <span className={styles.carouselCounterCurrent}>
            {String(currentIndex + 1).padStart(2, "0")}
            <span className={styles.carouselCounterDivider}>–</span>
            {String(
              Math.min(currentIndex + itemsPerView, projects.length)
            ).padStart(2, "0")}
          </span>
          <span className={styles.carouselCounterDivider}>/</span>
          <span className={styles.carouselCounterTotal}>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Projects;