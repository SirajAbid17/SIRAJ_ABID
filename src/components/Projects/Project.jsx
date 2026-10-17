import PropTypes from "prop-types";
import styles from "./Project.module.css";
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  FaGithub,
  FaPlay,
  FaTimes,
  FaCode,
  FaEye,
} from "react-icons/fa";

import gsap from "gsap";

function Project({
  name,
  url,
  technologies,
  description,
  githubLink,
  demoLink,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);
  const shineRef = useRef(null);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  const maxLength = 80;

 
  const isLocalVideo =
    demoLink &&
    (demoLink.endsWith(".mp4") ||
      demoLink.endsWith(".webm") ||
      demoLink.endsWith(".ogg"));

  const isEmbedVideo =
    demoLink &&
    (demoLink.includes("youtube.com") ||
      demoLink.includes("youtu.be") ||
      demoLink.includes("vimeo.com"));

  const isLiveSite = demoLink && !isLocalVideo && !isEmbedVideo;

 
  useLayoutEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.set(card, { opacity: 0, y: 70, scale: 0.96 });
      gsap.set(image, { scale: 1.12 });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          end: "top 60%",
          scrub: 1,
        },
      });

      gsap.to(image, {
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 55%",
          scrub: 1.2,
        },
      });
    }, card);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

      gsap.to(card, {
        rotateX: -y,
        rotateY: x,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 900,
        overwrite: true,
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    const handleMouseLeaveCard = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeaveCard);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeaveCard);
    };
  }, []);

  
  const handleMouseEnter = () => {
    setIsHovered(true);

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.06,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    if (shineRef.current) {
      gsap.fromTo(
        shineRef.current,
        { xPercent: -100 },
        { xPercent: 100, duration: 0.8, ease: "power3.inOut" }
      );
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  };

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayDescription =
    description.length <= maxLength || isExpanded
      ? description
      : `${description.substring(0, maxLength)}...`;


  const openVideoModal = () => {
    setShowVideo(true);
    document.body.style.overflow = "hidden";
  };


  const closeVideoModal = () => {
    if (!modalRef.current) {
      setShowVideo(false);
      document.body.style.overflow = "auto";
      return;
    }

    gsap.to(modalContentRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 0.35,
      ease: "power3.in",
    });

    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setShowVideo(false);
        document.body.style.overflow = "auto";
      },
    });
  };

 
  useLayoutEffect(() => {
    if (!showVideo) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power4.out",
          delay: 0.05,
        }
      );
    });

    return () => ctx.revert();
  }, [showVideo]);


  useEffect(() => {
    if (!showVideo) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") closeVideoModal();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showVideo]);


  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  const demoButtonLabel = isLocalVideo
    ? "Watch Demo"
    : isEmbedVideo
    ? "Watch Demo"
    : "Live Demo";

  return (
    <>
     
      <div
        ref={cardRef}
        className={`${styles.projectContainer} ${
          isHovered ? styles.hovered : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={glowRef} className={styles.cardGlow} />
        <div className={styles.cardBorder} />

      
        <div className={styles.imageWrapper}>
          <img
            ref={imageRef}
            src={url}
            alt={`${name} project`}
            className={styles.projectImage}
          />

          <div className={styles.imageOverlay}>
            <div className={styles.overlayContent}>
              <FaEye className={styles.overlayIcon} />
              <span className={styles.overlayText}>View Project</span>
            </div>
          </div>
        </div>

       
        <div className={styles.projectContent}>
          <h2 className={styles.projectName}>{name}</h2>

          <div className={styles.projectTechnologies}>
            {technologies.slice(0, 4).map((technology, index) => (
              <span key={index} className={styles.technologyBadge}>
                {technology}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className={styles.technologyBadge}>
                +{technologies.length - 4}
              </span>
            )}
          </div>

          <div className={styles.descriptionWrapper}>
            <p className={styles.projectDescription}>{displayDescription}</p>

            {description.length > maxLength && (
              <button
                onClick={toggleDescription}
                className={styles.readMoreBtn}
              >
                {isExpanded ? "Show Less" : "Read More"}
                <span className={styles.readMoreArrow}>
                  {isExpanded ? "↑" : "↓"}
                </span>
              </button>
            )}
          </div>

         
          <div className={styles.projectLinks}>
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                <FaGithub className={styles.linkIcon} />
                GitHub
              </a>
            )}

            {demoLink && (
              <button
                onClick={openVideoModal}
                className={styles.demoLink}
              >
                <FaPlay className={styles.linkIcon} />
                {demoButtonLabel}
              </button>
            )}
          </div>
        </div>

        <div ref={shineRef} className={styles.cardShine} />
      </div>

     
      {showVideo && (
        <div
          ref={modalRef}
          className={styles.videoModalOverlay}
          onClick={closeVideoModal}
        >
          <div
            ref={modalContentRef}
            className={styles.videoModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <FaCode className={styles.modalIcon} />
                <h3>{name} Demo</h3>
              </div>

              <button
                className={styles.closeButton}
                onClick={closeVideoModal}
                aria-label="Close demo"
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.videoContainer}>
              {isLocalVideo && (
                <video
                  src={demoLink}
                  controls
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    background: "#000",
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              )}

              {isEmbedVideo && (
                <iframe
                  src={
                    demoLink.includes("youtube.com") ||
                    demoLink.includes("youtu.be")
                      ? `https://www.youtube.com/embed/${demoLink
                          .split("/")
                          .pop()
                          .split("?")[0]}`
                      : demoLink
                  }
                  title={`${name} Demo Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {isLiveSite && (
                <div className={styles.iframeContainer}>
                  <iframe
                    src={demoLink}
                    title={`${name} Live Demo`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Project.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  githubLink: PropTypes.string,
  demoLink: PropTypes.string,
};

export default Project;