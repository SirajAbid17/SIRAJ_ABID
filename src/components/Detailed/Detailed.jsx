import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Detailed.module.css";


import {
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineCpuChip,
  HiOutlineRocketLaunch,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
  HiOutlinePaintBrush,
  HiOutlineCube,
  HiOutlineServerStack,
  HiOutlineCloud,
  HiOutlineDevicePhoneMobile,
  HiOutlineCircleStack,
  HiOutlineUsers,
  HiOutlineLightBulb,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);


const PRIMARY_IMG = "/blue.png";

const FALLBACK_IMG =
  "https://plus.unsplash.com/premium_photo-1733317453473-175c9831c874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D";


const journey = [
  {
    number: "01",
    year: "The Beginning",
    title: "Learning the Web",
    description:
      "My journey started with HTML, CSS and JavaScript. I focused on understanding how the web works and built my fundamentals from scratch.",
    skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS"],
  },
  {
    number: "02",
    year: "Frontend Era",
    title: "Discovering React",
    description:
      "After building a strong foundation, I moved into React and started creating modern, interactive and reusable user interfaces.",
    skills: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "TypeScript",
      "Angular",
      "Figma",
    ],
  },
  {
    number: "03",
    year: "Full Stack",
    title: "Entering MERN",
    description:
      "Frontend development evolved into complete full-stack development using Node.js, Express.js and MongoDB.",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "MySQL",
      "RESTful APIs",
      "Python",
    ],
  },
  {
    number: "04",
    year: "Real Systems",
    title: "Building Production Apps",
    description:
      "I started building real-world applications with authentication, REST APIs, real-time communication, cloud storage and scalable architectures. I learned how to secure user sessions with JWT and OAuth flows, design clean API contracts, stream live updates through WebSockets, integrate cloud services like Firebase and Cloudinary, and architect systems that remain performant under real production traffic — turning individual features into complete, dependable products.",
    skills: [
      "Authentication",
      "Firebase",
      "Redis",
      "React Native",
      "Expo",
      "Git",
      "GitHub",
      "Nginx",
      "AWS",
    ],
  },
  {
    number: "05",
    year: "Current Chapter",
    title: "Beyond MERN",
    description:
      "Now I am exploring AI, Docker, microservices and enterprise technologies while continuing to grow as a full-stack engineer. From building intelligent GenAI agents and RAG pipelines to orchestrating containerized services and designing scalable backend architectures — I am constantly pushing the boundaries of what modern full-stack engineering can achieve.",
    skills: [
      "LLMs",
      "AI Agents",
      "RAG Systems",
      "OpenAI API",
      "Gemini API",
      "Groq API",
      "Prompt Engineering",
      "LangChain",
      "LangGraph",
      "Docker",
      "Microservices",
    ],
  },
];


const CAPABILITIES = [
  {
    Icon: HiOutlineBolt,
    title: "Built to Deliver",
    desc: "From idea to production, I build fast, scalable, and reliable digital products that solve real business problems, deliver seamless user experiences, and drive lasting value.",
    stat: "15+",
    label: "Projects Delivered",
  },
  {
    Icon: HiOutlineRocketLaunch,
    title: "Full-Stack Expertise",
    desc: "From responsive frontend experiences to secure APIs, databases, cloud deployment, and scalable backend architecture — everything works together.",
    stat: "2+",
    label: "Years Building",
  },
];


const COVERFLOW_IMAGES = [
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "Web Development",
    tag: "01",
    Icon: HiOutlineCodeBracket,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "UI Engineering",
    tag: "02",
    Icon: HiOutlinePaintBrush,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "React Apps",
    tag: "03",
    Icon: HiOutlineCube,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "Full Stack",
    tag: "04",
    Icon: HiOutlineServerStack,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "AI Integration",
    tag: "05",
    Icon: HiOutlineCpuChip,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "Cloud Systems",
    tag: "06",
    Icon: HiOutlineCloud,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "Mobile Apps",
    tag: "07",
    Icon: HiOutlineDevicePhoneMobile,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "Backend APIs",
    tag: "08",
    Icon: HiOutlineCircleStack,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "Team Work",
    tag: "09",
    Icon: HiOutlineUsers,
  },
  {
    img: PRIMARY_IMG,
    fallback: FALLBACK_IMG,
    title: "Innovation",
    tag: "10",
    Icon: HiOutlineLightBulb,
  },
];

const ROLES = [
  "AI Systems Engineer",
  "Full-Stack Dev",
  "GenAI Architect",
  "MERN Specialist",
];


const PRODUCTION_STATS = [
  {
    category: "Full-Lifecycle",
    value: "15",
    suffix: "+",
    unit: "",
    label: "Projects & Systems Delivered",
    tag: "Web, Mobile & AI Platforms",
    desc: "Enterprise-grade web applications, cross-platform mobile apps, and custom RAG & GenAI engines designed, developed, optimized, and shipped to production with scalable architectures, seamless user experiences, and reliable real-world performance.",
    Icon: HiOutlineRocketLaunch,
  },
];

function Detailed() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const coverflowRef = useRef(null);
  const wheelLockRef = useRef(false);


  const imageTargetRef = useRef(null);
  const targetImgRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(
    Math.floor(COVERFLOW_IMAGES.length / 2),
  );
  const [roleIndex, setRoleIndex] = useState(0);

  
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

 
  useEffect(() => {
    [PRIMARY_IMG, FALLBACK_IMG].forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  const goPrev = useCallback(
    () => setActiveIndex((i) => Math.max(0, i - 1)),
    [],
  );
  const goNext = useCallback(
    () => setActiveIndex((i) => Math.min(COVERFLOW_IMAGES.length - 1, i + 1)),
    [],
  );

 
  useLayoutEffect(() => {
    const el = coverflowRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.8 &&
        rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;

      e.preventDefault();
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      setTimeout(() => (wheelLockRef.current = false), 420);

      if (e.deltaY > 0) goNext();
      else goPrev();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goPrev, goNext]);


  useEffect(() => {
    const target = imageTargetRef.current;
    const img = targetImgRef.current;
    if (!target || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let rafId = null;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetScale = 1;
    let currentRotX = 0;
    let currentRotY = 0;
    let currentScale = 1;
    let isHovering = false;

    const handleMove = (e) => {
      const rect = target.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      targetRotY = (x - 0.5) * 22;
      targetRotX = (0.5 - y) * 22;
      targetScale = 1.06;

      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const handleEnter = () => {
      isHovering = true;
      target.classList.add(styles.targetActive);
    };

    const handleLeave = () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
      targetScale = 1;
      target.classList.remove(styles.targetActive);
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const animate = () => {
      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;
      currentScale += (targetScale - currentScale) * 0.12;

      img.style.transform = `perspective(1000px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) scale(${currentScale}) translateZ(20px)`;

      const done =
        Math.abs(targetRotX - currentRotX) < 0.05 &&
        Math.abs(targetRotY - currentRotY) < 0.05 &&
        Math.abs(targetScale - currentScale) < 0.002;

      if (done && !isHovering) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(animate);
    };

    target.addEventListener("mousemove", handleMove);
    target.addEventListener("mouseenter", handleEnter);
    target.addEventListener("mouseleave", handleLeave);

    return () => {
      target.removeEventListener("mousemove", handleMove);
      target.removeEventListener("mouseenter", handleEnter);
      target.removeEventListener("mouseleave", handleLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

 
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      const items = gsap.utils.toArray(`.${styles.journeyItem}`);
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 80, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        `.${styles.heading}`,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      const progressBar = section.querySelector(`.${styles.timelineProgress}`);
      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current || section,
              start: "top 60%",
              end: "bottom 85%",
              scrub: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className={styles.detailedSection}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      
      <div className={styles.heroSection}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroOrb3} />
        <div className={styles.heroGrid} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <HiOutlineSparkles className={styles.heroBadgeIcon} />
            Available for AI &amp; Full-Stack Projects
          </div>

          <div className={styles.heroRoleWrap}>
            <span className={styles.heroRoleLine} />
            <div className={styles.heroRoleTrack}>
              {ROLES.map((role, i) => (
                <span
                  key={role}
                  className={`${styles.heroRoleItem} ${
                    i === roleIndex ? styles.heroRoleItemActive : ""
                  }`}
                >
                  {role}
                </span>
              ))}
            </div>
            <span className={styles.heroRoleLine} />
          </div>

          <h2 className={styles.heroHeadline}>
            Engineering <span>Intelligent Systems</span> for the AI Era.
          </h2>

          <p className={styles.heroDescription}>
            I engineer <strong>GenAI &amp; Agentic workflows</strong>,{" "}
            <strong>RAG applications</strong>, and{" "}
            <strong>intelligent Automations</strong>, integrating them into
            production-ready web and software applications.
          </p>

          <div className={styles.heroChips}>
            {[
              "GenAI",
              "RAG",
              "Agentic AI",
              "MERN",
              "MEAN",
              "Next.js",
              "LangGraph",
              "LangChain",
              "Docker",
              "AWS",
            ].map((chip) => (
              <span key={chip} className={styles.heroChip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

   
      <div className={styles.container}>
      
        <div className={styles.visualColumn}>
          <div className={styles.stickyVisual}>
            <div ref={imageTargetRef} className={styles.imageTarget}>
              <div className={styles.targetRing} />
              <div className={styles.targetOrbit} />
              <div className={styles.targetOrbit2} />
              <div className={styles.targetGlow} />
              <div className={styles.targetGrid} />
              <div className={styles.targetScan} />
              <div className={styles.targetShimmer} />
              <span className={styles.cornerTL} />
              <span className={styles.cornerTR} />
              <span className={styles.cornerBL} />
              <span className={styles.cornerBR} />

              <img
                ref={targetImgRef}
                src="/sirajmskk.png"
                alt="Siraj Abid"
                className={styles.targetImage}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMG;
                }}
                draggable={false}
              />

              <span className={styles.particle} />
              <span className={styles.particle} />
              <span className={styles.particle} />
              <span className={styles.particle} />
              <span className={styles.particle} />
              <span className={styles.particle} />

              <div className={styles.targetLabel}>
                <span>DEVELOPMENT</span>
                <strong>JOURNEY</strong>
              </div>
            </div>
          </div>

         
          <div className={styles.capabilityGrid}>
            {CAPABILITIES.map((cap, i) => {
              const { Icon } = cap;
              return (
                <div
                  key={i}
                  className={styles.capabilityCard}
                  style={{ "--delay": `${i * 0.08}s` }}
                >
                  <div className={styles.capabilityIcon}>
                    <Icon />
                  </div>
                  <h3 className={styles.capabilityTitle}>{cap.title}</h3>
                  <p className={styles.capabilityDesc}>{cap.desc}</p>
                  <div className={styles.capabilityStat}>
                    <strong>{cap.stat}</strong>
                    <span>{cap.label}</span>
                  </div>
                  <div className={styles.capabilityGlow} />
                </div>
              );
            })}
          </div>

          
          <div ref={coverflowRef} className={styles.coverflowSection}>
            <div className={styles.coverflowHeader}>
              <span className={styles.coverflowEyebrow}>SERVICES</span>
              <h2 className={styles.coverflowTitle}>
                What I <span>Deliver</span>
              </h2>

              <div className={styles.coverflowNav}>
                <button
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className={styles.coverflowNavBtn}
                  aria-label="Previous"
                >
                  <HiOutlineArrowLeft />
                </button>
                <span className={styles.coverflowCounter}>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(COVERFLOW_IMAGES.length).padStart(2, "0")}
                </span>
                <button
                  onClick={goNext}
                  disabled={activeIndex === COVERFLOW_IMAGES.length - 1}
                  className={styles.coverflowNavBtn}
                  aria-label="Next"
                >
                  <HiOutlineArrowRight />
                </button>
              </div>
            </div>

            <div className={styles.coverflowViewport}>
              <div className={styles.coverflowTrack}>
                {COVERFLOW_IMAGES.map((item, i) => {
                  const { Icon } = item;
                  return (
                    <div
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`${styles.coverflowCard} ${
                        i === activeIndex ? styles.coverflowCardActive : ""
                      }`}
                      style={{
                        "--index": i - activeIndex,
                        "--card-bg-image": `url("${item.img}"), url("${item.fallback}")`,
                      }}
                    >
                      <div className={styles.cardWelcome}>
                        <span className={styles.cardWelcomeTag}>
                          {item.tag}
                        </span>
                        <div className={styles.cardWelcomeIcon}>
                          <Icon />
                        </div>
                        <h4 className={styles.cardWelcomeTitle}>
                          {item.title}
                        </h4>
                        <p className={styles.cardWelcomeText}>{item.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          
          <div className={styles.statsSection}>
            <div className={styles.statsHeader}>
              <span className={styles.statsEyebrow}>
                <span className={styles.statsEyebrowDot} />
                Proven in Production
              </span>
              <h3 className={styles.statsTitle}>
                Engineered for <span>Results</span>
              </h3>
              <p className={styles.statsSubtitle}>
                Tangible business outcomes, high-availability architecture, and
                rigorous software standards built into every line of code.
              </p>
            </div>

            <div className={styles.statsGrid}>
              {PRODUCTION_STATS.map((stat, i) => {
                const { Icon } = stat;
                return (
                  <div
                    key={i}
                    className={styles.statsCard}
                    style={{ "--delay": `${i * 0.12}s` }}
                  >
                    <div className={styles.statsCardTop}>
                      <span className={styles.statsCardCategory}>
                        {stat.category}
                      </span>
                      <div className={styles.statsCardIcon}>
                        <Icon />
                      </div>
                    </div>

                    <div className={styles.statsCardValue}>
                      <span className={styles.statsCardNumber}>
                        {stat.value}
                      </span>
                      <span className={styles.statsCardSuffix}>
                        {stat.suffix}
                      </span>
                      {stat.unit && (
                        <span className={styles.statsCardUnit}>
                          {stat.unit}
                        </span>
                      )}
                    </div>

                    <h4 className={styles.statsCardLabel}>{stat.label}</h4>
                    <span className={styles.statsCardTag}>{stat.tag}</span>
                    <p className={styles.statsCardDesc}>{stat.desc}</p>

                    <div className={styles.statsCardGlow} />
                    <div className={styles.statsCardAccent} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        
        <div className={styles.contentColumn}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>DEVELOPMENT JOURNEY</span>
            <h2>
              My Journey
              <br />
              <span>as a Developer</span>
            </h2>
            <p>
              From learning the fundamentals of web development to building
              complete full-stack systems.
            </p>
          </div>

          <div ref={timelineRef} className={styles.timeline}>
            <div className={styles.timelineLine}>
              <div className={styles.timelineProgress} />
            </div>

            {journey.map((item) => (
              <article key={item.number} className={styles.journeyItem}>
                <div className={styles.number}>{item.number}</div>
                <div className={styles.journeyContent}>
                  <span className={styles.subtitle}>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className={styles.skills}>
                    {item.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detailed;
