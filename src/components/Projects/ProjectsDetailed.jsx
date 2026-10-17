import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaPlay,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaLightbulb,
  FaCode,
  FaCalendar,
  FaUser,
  FaClock,
  FaUsers,
  FaRocket,
  FaLayerGroup,
  FaServer,
  FaLock,
  FaUnlock,
  FaShieldAlt,
  FaDatabase,
  FaRobot,
  FaCopy,
  FaBriefcase,
  FaCreditCard,
  FaInfoCircle,
  FaProjectDiagram,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import styles from "./ProjectsDetailed.module.css";


import { getProjectById } from "../../data/projectsCache";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsDetailed() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

 
  const project = getProjectById(projectId);

  
  const isLocalVideo =
    project?.demoLink &&
    (project.demoLink.endsWith(".mp4") ||
      project.demoLink.endsWith(".webm") ||
      project.demoLink.endsWith(".ogg"));

  const isEmbedVideo =
    project?.demoLink &&
    (project.demoLink.includes("youtube.com") ||
      project.demoLink.includes("youtu.be") ||
      project.demoLink.includes("vimeo.com"));

  const isLiveSite =
    project?.demoLink && !isLocalVideo && !isEmbedVideo;

  const demoButtonLabel = isLocalVideo
    ? "Watch Demo"
    : isEmbedVideo
    ? "Watch Demo"
    : "Live Demo";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackHome = () => navigate("/");

  const openVideoModal = () => {
    setShowVideo(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setShowVideo(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (!showVideo) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") closeVideoModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showVideo]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useLayoutEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.from(".headerBar", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".backButton", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".headerProjectName", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".heroContent > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.utils.toArray(".animateSection").forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  const descriptionIconMap = {
    intro: FaInfoCircle,
    robot: FaRobot,
    briefcase: FaBriefcase,
    pipeline: FaProjectDiagram,
    creditCard: FaCreditCard,
    rocket: FaRocket,
  };

  return (
    <div className={styles.detailedContainer} ref={containerRef}>
     
      <header className={`${styles.headerBar} headerBar`}>
        <button
          className={`${styles.backButton} backButton`}
          onClick={handleBackHome}
        >
          <FaArrowLeft className={styles.backIcon} />
          <span>Back to Home</span>
        </button>
        <span className={`${styles.headerProjectName} headerProjectName`}>
          {project.name}
        </span>
      </header>

     
      <section className={styles.hero} ref={heroRef}>
       <div style={{ marginTop: "30px" }} className={`${styles.heroContent} heroContent`}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            {project.category}
          </div>

          <h1 className={styles.heroTitle}>{project.name}</h1>
          <p className={styles.heroDescription}>{project.description}</p>

          <div className={styles.heroActions}>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroBtn}
              >
                <FaGithub /> <span>View Code</span>
              </a>
            )}

            {project.demoLink && isLocalVideo && (
              <button
                onClick={openVideoModal}
                className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}
              >
                <FaPlay /> <span>{demoButtonLabel}</span>
                <FaExternalLinkAlt className={styles.btnIcon} />
              </button>
            )}

            {project.demoLink && isEmbedVideo && (
              <button
                onClick={openVideoModal}
                className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}
              >
                <FaPlay /> <span>{demoButtonLabel}</span>
                <FaExternalLinkAlt className={styles.btnIcon} />
              </button>
            )}

            {project.demoLink && isLiveSite && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}
              >
                <FaPlay /> <span>Live Demo</span>
                <FaExternalLinkAlt className={styles.btnIcon} />
              </a>
            )}
          </div>

          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <FaCalendar className={styles.metaIcon} />
              <div>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>{project.year}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <FaUser className={styles.metaIcon} />
              <div>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>{project.role}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <FaClock className={styles.metaIcon} />
              <div>
                <span className={styles.metaLabel}>Duration</span>
                <span className={styles.metaValue}>{project.duration}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <FaUsers className={styles.metaIcon} />
              <div>
                <span className={styles.metaLabel}>Team</span>
                <span className={styles.metaValue}>{project.team}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {project.techStack && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaLayerGroup className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
          </div>
          <div className={styles.techStackGrouped}>
            {Object.entries(project.techStack).map(([group, items]) => (
              <div key={group} className={styles.techGroup}>
                <h3 className={styles.techGroupTitle}>{group}</h3>
                <div className={styles.techStack}>
                  {items.map((tech, i) => (
                    <span key={i} className={styles.techItem}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!project.techStack && project.technologies && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaLayerGroup className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
          </div>
          <div className={styles.techStack}>
            {project.technologies.map((tech, i) => (
              <span key={i} className={styles.techItem}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

     
      {project.architecture && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaServer className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>
              {project.architecture.title}
            </h2>
          </div>
          <p className={styles.archDescription}>
            {project.architecture.description}
          </p>
          <div className={styles.archLayers}>
            {project.architecture.layers.map((layer, i) => (
              <div key={i} className={styles.archLayer}>
                <div className={styles.archLayerNum}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={styles.archLayerBody}>
                  <h3 className={styles.archLayerTitle}>{layer.name}</h3>
                  <div className={styles.archLayerItems}>
                    {layer.items.map((item, j) => (
                      <span key={j} className={styles.archChip}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      
      {project.services && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaServer className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>
              {project.servicesLabel || "Modules"}
            </h2>
          </div>
          <div className={styles.servicesGrid}>
            {project.services.map((svc, i) => (
              <div key={i} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <h3 className={styles.serviceName}>{svc.name}</h3>
                  <span
                    className={`${styles.serviceBadge} ${
                      styles[`serviceBadge_${svc.type}`]
                    }`}
                  >
                    {svc.type === "paid" && <FaLock />}
                    {svc.type === "free" && <FaUnlock />}
                    {svc.type === "mixed" && <FaShieldAlt />}
                    {svc.type === "admin" && <FaShieldAlt />}
                    {svc.type}
                    {svc.credits && ` · ${svc.credits}c`}
                  </span>
                </div>
                <code className={styles.servicePath}>{svc.path}</code>
                <p className={styles.serviceDesc}>{svc.description}</p>
                {svc.agents && (
                  <div className={styles.agentTags}>
                    {svc.agents.map((a, j) => (
                      <span key={j} className={styles.agentTag}>
                        <FaRobot /> {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

     
      {project.middleware && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaShieldAlt className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>
              {project.middlewareLabel || "Middleware"}
            </h2>
          </div>
          <div className={styles.middlewareGrid}>
            {project.middleware.map((mw, i) => (
              <div key={i} className={styles.middlewareCard}>
                <div className={styles.middlewareHead}>
                  <code className={styles.middlewareName}>{mw.name}</code>
                  <span className={styles.middlewareFile}>{mw.file}</span>
                </div>
                <p className={styles.middlewareDesc}>{mw.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

     
      {project.apiRoutes && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaDatabase className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>API Routes</h2>
          </div>
          <div className={styles.routesTable}>
            <div className={styles.routesHead}>
              <span>Method</span>
              <span>Path</span>
              <span>Type</span>
              <span>Description</span>
            </div>
            {project.apiRoutes.map((r, i) => (
              <div key={i} className={styles.routeRow}>
                <span
                  className={`${styles.methodBadge} ${
                    styles[`method_${r.method.toLowerCase()}`]
                  }`}
                >
                  {r.method}
                </span>
                <code className={styles.routePath}>{r.path}</code>
                <span
                  className={`${styles.routeType} ${
                    styles[`routeType_${r.type}`]
                  }`}
                >
                  {r.type}
                  {r.credits ? ` · ${r.credits}c` : ""}
                </span>
                <span className={styles.routeDesc}>{r.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      
      {project.codeSnippets && project.codeSnippets.length > 0 && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaCode className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Behind the Code</h2>
          </div>

          <div className={styles.snippetTabs}>
            {project.codeSnippets.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSnippet(i)}
                className={`${styles.snippetTab} ${
                  activeSnippet === i ? styles.snippetTabActive : ""
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {project.codeSnippets[activeSnippet] && (
            <div className={styles.snippetCard}>
              <div className={styles.snippetHead}>
                <div>
                  <h3 className={styles.snippetTitle}>
                    {project.codeSnippets[activeSnippet].title}
                  </h3>
                  <code className={styles.snippetFile}>
                    {project.codeSnippets[activeSnippet].file}
                  </code>
                </div>
                <button
                  className={styles.copyBtn}
                  onClick={() =>
                    copyCode(project.codeSnippets[activeSnippet].code)
                  }
                >
                  <FaCopy /> Copy
                </button>
              </div>
              <p className={styles.snippetDesc}>
                {project.codeSnippets[activeSnippet].description}
              </p>
              <pre className={styles.snippetCode}>
                <code>{project.codeSnippets[activeSnippet].code}</code>
              </pre>
            </div>
          )}
        </section>
      )}

      
      <section className={`${styles.section} animateSection`}>
        <div className={styles.sectionHeader}>
          <FaRocket className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>About This Project</h2>
        </div>

        {project.descriptionSections ? (
          <div className={styles.aboutStructured}>
            {project.descriptionSections.map((block, i) => {
              const Icon = descriptionIconMap[block.icon] || FaInfoCircle;

              return (
                <div key={i} className={styles.aboutBlock}>
                  <div className={styles.aboutBlockHead}>
                    <span className={styles.aboutBlockIcon}>
                      <Icon />
                    </span>
                    {block.heading && (
                      <h3 className={styles.aboutBlockTitle}>
                        {block.heading}
                      </h3>
                    )}
                  </div>

                  {block.paragraphs &&
                    block.paragraphs.map((p, j) => (
                      <p key={j} className={styles.paragraph}>
                        {p}
                      </p>
                    ))}

                  {block.items && (
                    <ul className={styles.aboutList}>
                      {block.items.map((item, j) => (
                        <li key={j} className={styles.aboutListItem}>
                          <FaCheckCircle className={styles.aboutListIcon} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.descriptionContent}>
            {project.fullDescription
              ?.split("\n\n")
              .map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph.split("\n").map((line, lineIndex, arr) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
          </div>
        )}
      </section>

    
      {project.features && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaCheckCircle className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Key Features</h2>
          </div>
          <div className={styles.featuresGrid}>
            {project.features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <FaCheckCircle className={styles.featureIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}

    
      {project.challenges && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaCode className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Challenges Faced</h2>
          </div>
          <div className={styles.challengesGrid}>
            {project.challenges.map((challenge, index) => (
              <div key={index} className={styles.challengeItem}>
                <span className={styles.challengeNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{challenge}</span>
              </div>
            ))}
          </div>
        </section>
      )}

     
      {project.learnings && (
        <section className={`${styles.section} animateSection`}>
          <div className={styles.sectionHeader}>
            <FaLightbulb className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>What I Learned</h2>
          </div>
          <div className={styles.learningsGrid}>
            {project.learnings.map((learning, index) => (
              <div key={index} className={styles.learningItem}>
                <FaLightbulb className={styles.learningIcon} />
                <span>{learning}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      
      <section className={`${styles.ctaSection} animateSection`}>
        <h2>Interested in this project?</h2>
        <p>Check out the code or try the live demo</p>
        <div className={styles.ctaButtons}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              <FaGithub /> <span>View on GitHub</span>
            </a>
          )}

          {project.demoLink && isLocalVideo && (
            <button
              onClick={openVideoModal}
              className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
            >
              <FaPlay /> <span>{demoButtonLabel}</span>
            </button>
          )}

          {project.demoLink && isEmbedVideo && (
            <button
              onClick={openVideoModal}
              className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
            >
              <FaPlay /> <span>{demoButtonLabel}</span>
            </button>
          )}

          {project.demoLink && isLiveSite && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
            >
              <FaPlay /> <span>Try Live Demo</span>
            </a>
          )}
        </div>
      </section>

     
      <footer className={styles.detailFooter}>
        <span className={styles.footerLine} />
        <p className={styles.footerText}>
          Thanks for visiting — built & designed by{" "}
          <span className={styles.footerName}>Siraj Abid</span>
        </p>
        <span className={styles.footerLine} />
      </footer>

     
      {showVideo && (
        <div
          className={styles.videoModalOverlay}
          onClick={closeVideoModal}
        >
          <div
            className={styles.videoModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <FaPlay className={styles.modalIcon} />
                <h3>{project.name} Demo</h3>
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
                  src={project.demoLink}
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
                    project.demoLink.includes("youtube.com") ||
                    project.demoLink.includes("youtu.be")
                      ? `https://www.youtube.com/embed/${project.demoLink
                          .split("/")
                          .pop()
                          .split("?")[0]}`
                      : project.demoLink
                  }
                  title={`${project.name} Demo Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {isLiveSite && (
                <div className={styles.iframeContainer}>
                  <iframe
                    src={project.demoLink}
                    title={`${project.name} Live Demo`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}