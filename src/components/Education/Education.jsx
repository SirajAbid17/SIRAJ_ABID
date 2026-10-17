import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./Education.module.css";

import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCodeBracket,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineRocketLaunch,
  HiOutlineCpuChip,
  HiOutlineSquares2X2,
  HiOutlineTrophy,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMagnifyingGlass,
  HiOutlineCommandLine,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlinePaintBrush,
  HiOutlineDocumentArrowDown,
  HiOutlineUserCircle,
  HiOutlineMicrophone,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 18,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const workVariants = {
  hidden: { opacity: 0, x: -30, rotateY: -8 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const badgeVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const projectVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      delay: 0.1,
    },
  },
};



const SOLVIX_FREE_FEATURES = [
  { Icon: HiOutlineChatBubbleLeftRight, label: "AI Chat" },
  { Icon: HiOutlineMagnifyingGlass, label: "AI Web Search" },
  { Icon: HiOutlineCommandLine, label: "AI Coding Assistant" },
  { Icon: HiOutlineDocumentText, label: "PDF Generation" },
  { Icon: HiOutlineChartBar, label: "PPT Generation" },
  { Icon: HiOutlinePaintBrush, label: "AI Image Generation" },
];

const SOLVIX_PREMIUM_FEATURES = [
  { Icon: HiOutlineDocumentArrowDown, label: "AI Resume Analyzer" },
  { Icon: HiOutlineUserCircle, label: "AI CV Generator" },
  { Icon: HiOutlineMicrophone, label: "CV → AI Mock Interview" },
  { Icon: HiOutlineGlobeAlt, label: "CV → AI Portfolio Generator" },
];

const SOLVIX_TECH = [
  "MERN Stack",
  "Microservices",
  "LangChain",
  "LangGraph",
  "RAG",
  "Docker",
  "Redis",
  "Nginx",
  "AWS",
  "Stripe",
  "API Gateway",
];

function Education() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.section
      id="education"
      className={styles.educationSection}
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      
      <div className={styles.auroraBg}>
        <motion.div
          className={styles.auroraLayer1}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.28, 0.15],
            x: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.auroraLayer2}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.22, 0.1],
            x: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className={styles.gridOverlay} />
      </div>

     
      <motion.div className={styles.headerWrap} variants={titleVariants}>
        <div className={styles.eyebrowBadge}>
          <span className={styles.eyebrowDot} />
          Academic & Professional
        </div>

        <h1 className={styles.mainTitle}>
          Education <span>&</span> Experience
        </h1>

        <p className={styles.mainSubtitle}>
          My academic foundation and hands-on engineering journey — building
          real products for real users.
        </p>

        <div className={styles.titleDivider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>
      </motion.div>

      <div className={styles.educationContainer}>
       
        <motion.div className={styles.column} variants={columnVariants}>
          <div className={styles.columnHeader}>
            <div className={styles.columnIconWrap}>
              <HiOutlineAcademicCap />
            </div>
            <div className={styles.columnHeaderText}>
              <h2 className={styles.sectionHeading}>Education</h2>
              <span className={styles.columnSubtitle}>
                Academic background & achievements
              </span>
            </div>
          </div>

          <div className={styles.itemList}>
          
            <motion.div className={styles.educationItem} variants={itemVariants}>
              <div className={styles.itemTop}>
                <span className={styles.itemBadge}>02</span>
                <span className={styles.itemYear}>
                  <HiOutlineCalendarDays />
                  2021 — 2023
                </span>
              </div>

              <h3 className={styles.itemTitle}>
                Abdalin Science Higher Secondary School
              </h3>

              <p className={styles.itemRole}>FSC (Pre-Medical)</p>

              <div className={styles.itemMeta}>
                <span className={styles.metaTag}>
                  <span className={styles.metaTagDot} />
                  Marks: 900 / 1100
                </span>
              </div>
            </motion.div>

          
            <motion.div className={styles.educationItem} variants={itemVariants}>
              <div className={styles.itemTop}>
                <span className={styles.itemBadge}>01</span>
                <span className={styles.itemYear}>
                  <HiOutlineCalendarDays />
                  2023 — 2027
                </span>
              </div>

              <h3 className={styles.itemTitle}>
                University of Agriculture Faisalabad
              </h3>

              <p className={styles.itemRole}>Bachelor of Computer Science</p>

              <div className={styles.itemMeta}>
                <span className={styles.metaTag}>
                  <span className={styles.metaTagDot} />
                  CGPA: 3.1 / 4.0
                </span>
              </div>
            </motion.div>

          
            <motion.div
              className={styles.finalProjectCard}
              variants={projectVariants}
            >
              
              <div className={styles.finalProjectHeader}>
                <div className={styles.finalProjectBadge}>
                  <HiOutlineTrophy />
                  <span>Final Year Project</span>
                </div>

               <span className={styles.finalProjectYear}>
  <HiOutlineCalendarDays />
  Mar 2026 — Oct 2026
</span>
              </div>

            
              <div className={styles.finalProjectTitleRow}>
                <div className={styles.finalProjectIcon}>
                  <HiOutlineRocketLaunch />
                </div>
                <div>
                  <h3 className={styles.finalProjectTitle}>SOLVIX</h3>
                  <p className={styles.finalProjectTagline}>
                    AI-Powered Multi-Agent Platform
                  </p>
                </div>
              </div>

           
              <p className={styles.finalProjectDesc}>
                A production-grade <strong>Multi-Agent AI Platform</strong>{" "}
                built with a scalable <strong>MERN + Microservices</strong>{" "}
                architecture. Powered by{" "}
                <strong>LangChain, LangGraph, RAG, Docker, Redis, Nginx, and AWS</strong>{" "}
                to orchestrate intelligent agent workflows and deliver powerful
                AI automation for productivity, coding, job search, and career
                development.
              </p>

              
              <div className={styles.finalProjectSection}>
                <div className={styles.finalProjectSectionTitle}>
                  <HiOutlineCpuChip />
                  Free AI Features
                </div>

                <div className={styles.freeFeatureGrid}>
                  {SOLVIX_FREE_FEATURES.map((feature, i) => {
                    const { Icon } = feature;
                    return (
                      <div key={i} className={styles.freeFeatureChip}>
                        <span className={styles.freeFeatureIcon}>
                          <Icon />
                        </span>
                        <span className={styles.freeFeatureLabel}>
                          {feature.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              
              <div className={styles.finalProjectSection}>
                <div className={styles.finalProjectSectionTitle}>
                  <HiOutlineSquares2X2 />
                  Premium AI Career Suite
                </div>

                <div className={styles.premiumFeatureGrid}>
                  {SOLVIX_PREMIUM_FEATURES.map((feature, i) => {
                    const { Icon } = feature;
                    return (
                      <div key={i} className={styles.premiumFeatureCard}>
                        <div className={styles.premiumFeatureCardIcon}>
                          <Icon />
                        </div>
                        <span className={styles.premiumFeatureCardLabel}>
                          {feature.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

             

             
              <div className={styles.finalProjectHighlights}>
                <div className={styles.finalHighlight}>
                  <span className={styles.finalHighlightValue}>10+</span>
                  <span className={styles.finalHighlightLabel}>AI Tools</span>
                </div>
                <div className={styles.finalHighlightDivider} />
                <div className={styles.finalHighlight}>
                  <span className={styles.finalHighlightValue}>6</span>
                  <span className={styles.finalHighlightLabel}>
                    Free Features
                  </span>
                </div>
                <div className={styles.finalHighlightDivider} />
                <div className={styles.finalHighlight}>
                  <span className={styles.finalHighlightValue}>4</span>
                  <span className={styles.finalHighlightLabel}>
                    Premium Tools
                  </span>
                </div>
                <div className={styles.finalHighlightDivider} />
                <div className={styles.finalHighlight}>
                  <span className={styles.finalHighlightValue}>Micro</span>
                  <span className={styles.finalHighlightLabel}>
                    Services Arch
                  </span>
                </div>
              </div>

           
              <div className={styles.finalProjectGlowA} />
              <div className={styles.finalProjectGlowB} />
            </motion.div>
          </div>
        </motion.div>

      
        <motion.div className={styles.column} variants={columnVariants}>
          <div className={styles.columnHeader}>
            <div className={styles.columnIconWrap}>
              <HiOutlineBriefcase />
            </div>
            <div className={styles.columnHeaderText}>
              <h2 className={styles.sectionHeading}>Work Experience</h2>
              <span className={styles.columnSubtitle}>
                Real-world engineering & shipped products
              </span>
            </div>
          </div>

          <div className={styles.itemList}>
          
            <motion.div className={styles.workItem} variants={workVariants}>
              <div className={styles.itemTop}>
                <motion.span
                  className={styles.numberBadge}
                  variants={badgeVariants}
                >
                  01
                </motion.span>

                <div className={styles.workHeaderText}>
                  <h3 className={styles.itemTitle}>
                    MAGMA3C
                    <span className={styles.itemTitleSep}>·</span>
                    <span className={styles.itemCompanyRole}>
                      MERN Stack Developer
                    </span>
                  </h3>
                </div>

                <span className={styles.itemYear}>
                  <HiOutlineCalendarDays />
                  Jun 2025 — Oct 2025
                </span>
              </div>

              <p className={styles.itemRole}>Software Developer Intern</p>

              <div className={styles.experienceHighlights}>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Built and deployed 2 full-stack web applications (Guest
                    Posting Platform & Free Ads Website)
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Implemented modern UI/UX with Tailwind CSS & React
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Developed RESTful APIs with Node.js & Express, integrated
                    MongoDB
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Deployed live projects:&nbsp;
                    <a
                      href="https://backlink.com.pk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Backlink.com.pk
                      <HiOutlineArrowTopRightOnSquare
                        className={styles.linkIcon}
                      />
                    </a>
                    &nbsp;& Free Ads Platform
                  </span>
                </div>
              </div>

              <div className={styles.skillsGained}>
                <div className={styles.skillsGrid}>
                  <span className={styles.skillBadge}>
                    <HiOutlineCodeBracket />
                    React.js
                  </span>
                  <span className={styles.skillBadge}>MERN Stack</span>
                  <span className={styles.skillBadge}>RESTful APIs</span>
                  <span className={styles.skillBadge}>Tailwind CSS</span>
                </div>
              </div>
            </motion.div>

            
            <motion.div className={styles.workItem} variants={workVariants}>
              <div className={styles.itemTop}>
                <motion.span
                  className={styles.numberBadge}
                  variants={badgeVariants}
                >
                  02
                </motion.span>

                <div className={styles.workHeaderText}>
                  <h3 className={styles.itemTitle}>
                    GrowCoder
                    <span className={styles.itemTitleSep}>·</span>
                    <span className={styles.itemCompanyRole}>
                      Full Stack Developer
                    </span>
                  </h3>
                </div>

                <span className={styles.itemYear}>
                  <HiOutlineCalendarDays />
                  Jul 2026 — Present
                </span>
              </div>

              <div className={styles.workMetaRow}>
                <span className={styles.itemRole}>
                  YouTube Video Cutter Platform
                </span>
                <span className={styles.remoteTag}>
                  <HiOutlineMapPin />
                  Remote
                </span>
              </div>

              <div className={styles.experienceHighlights}>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Working on&nbsp;
                    <a
                      href="https://www.clipscutter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Clipscutter.com
                      <HiOutlineArrowTopRightOnSquare
                        className={styles.linkIcon}
                      />
                    </a>
                    &nbsp;- YouTube video cutting tool with 4K support
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Built admin dashboard with Next.js, MySQL, and Express for
                    payment management
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Implemented payment, credits, subscription system with graph
                    analytics
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Features: zero re-encoding video trimming, 6 format
                    downloads (MP4, MP3, WebM, etc.)
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Optimized for speed: 2M+ clips processed with 99.98% success
                    rate
                  </span>
                </div>
              </div>

              <div className={styles.skillsGained}>
                <div className={styles.skillsGrid}>
                  <span className={styles.skillBadge}>Next.js</span>
                  <span className={styles.skillBadge}>Express</span>
                  <span className={styles.skillBadge}>MySQL</span>
                  <span className={styles.skillBadge}>Payment Integration</span>
                  <span className={styles.skillBadge}>Subscription System</span>
                  <span className={styles.skillBadge}>Graph Analytics</span>
                </div>
              </div>
            </motion.div>

           
            <motion.div className={styles.workItem} variants={workVariants}>
              <div className={styles.itemTop}>
                <motion.span
                  className={styles.numberBadge}
                  variants={badgeVariants}
                >
                  03
                </motion.span>

                <div className={styles.workHeaderText}>
                  <h3 className={styles.itemTitle}>
                    CodeAlpha
                    <span className={styles.itemTitleSep}>·</span>
                    <span className={styles.itemCompanyRole}>
                      MERN Stack Developer
                    </span>
                  </h3>
                </div>

                <span className={styles.itemYear}>
                  <HiOutlineCalendarDays />
                  Feb 2026 — May 2026
                </span>
              </div>

              <div className={styles.workMetaRow}>
                <span className={styles.itemRole}>
                  E-Commerce Website Development
                </span>
                <span className={styles.remoteTag}>
                  <HiOutlineMapPin />
                  Remote
                </span>
              </div>

              <div className={styles.experienceHighlights}>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Built a full-featured e-commerce platform from scratch
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Integrated payment gateways and shopping cart functionality
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Learned advanced e-commerce concepts: product management,
                    order tracking, user authentication
                  </span>
                </div>
                <div className={styles.highlightItem}>
                  <HiOutlineCheckCircle className={styles.highlightIcon} />
                  <span>
                    Implemented secure payment processing and inventory
                    management
                  </span>
                </div>
              </div>

              <div className={styles.skillsGained}>
                <div className={styles.skillsGrid}>
                  <span className={styles.skillBadge}>E-Commerce</span>
                  <span className={styles.skillBadge}>Payment Integration</span>
                  <span className={styles.skillBadge}>JWT Auth</span>
                  <span className={styles.skillBadge}>Redux</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Education;