import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faNode,
  faReact,
  faGit,
  faGithub,
  faDocker,
  faBootstrap,
  faPython,
  faAngular,
  faFigma,
  faAws,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faCode,
  faFeatherAlt,
  faServer,
  faCube,
  faFire,
  faLayerGroup,
  faBrain,
  faRobot,
  faMicrochip,
  faChartLine,
  faShieldAlt,
  faCloud,
  faBolt,
  faWandMagicSparkles,
  faNetworkWired,
  faLink,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./Skills.module.css";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
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
      staggerChildren: 0.04,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
    },
  },
};

function Skills() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const skillsData = [
   
    { icon: faHtml5, name: "HTML5", color: "#E34F26", category: "frontend" },
    { icon: faCss3Alt, name: "CSS3", color: "#1572B6", category: "frontend" },
    { icon: faJs, name: "JavaScript", color: "#F7DF1E", category: "frontend" },
    { icon: faJs, name: "TypeScript", color: "#3178C6", category: "frontend" },
    { icon: faReact, name: "React.js", color: "#61DAFB", category: "frontend" },
    { icon: faReact, name: "Next.js", color: "#9CA3AF", category: "frontend" },
    { icon: faAngular, name: "Angular", color: "#DD0031", category: "frontend" },
    { icon: faBootstrap, name: "Bootstrap", color: "#7952B3", category: "frontend" },
    { icon: faFeatherAlt, name: "Tailwind CSS", color: "#06B6D4", category: "frontend" },
    { icon: faLayerGroup, name: "Redux Toolkit", color: "#764ABC", category: "frontend" },
   
    { icon: faNode, name: "Node.js", color: "#339933", category: "backend" },
    { icon: faServer, name: "Express.js", color: "#9CA3AF", category: "backend" },
    { icon: faPython, name: "Python", color: "#3776AB", category: "backend" },
    { icon: faCode, name: "RESTful APIs", color: "#FF6C37", category: "backend" },
   
    { icon: faDatabase, name: "MongoDB", color: "#47A248", category: "database" },
    { icon: faDatabase, name: "MySQL", color: "#4479A1", category: "database" },
    { icon: faDatabase, name: "Mongoose", color: "#B91C1C", category: "database" },
    { icon: faFire, name: "Firebase", color: "#FFCA28", category: "database" },
    { icon: faDatabase, name: "Redis", color: "#DC382D", category: "database" },
   
    { icon: faReact, name: "React Native", color: "#61DAFB", category: "mobile" },
    { icon: faCube, name: "Expo", color: "#A5B4FC", category: "mobile" },
    
    { icon: faBrain, name: "LLMs", color: "#9B59B6", category: "ai" },
    { icon: faRobot, name: "AI Agents", color: "#2ECC71", category: "ai" },
    { icon: faMicrochip, name: "RAG Systems", color: "#E74C3C", category: "ai" },
    { icon: faCode, name: "OpenAI API", color: "#00A67E", category: "ai" },
    { icon: faChartLine, name: "Gemini API", color: "#4285F4", category: "ai" },
    { icon: faCloud, name: "Groq API", color: "#FF6B00", category: "ai" },
    { icon: faWandMagicSparkles, name: "Prompt Eng.", color: "#F1C40F", category: "ai" },
    { icon: faLink, name: "LangChain", color: "#1CB5E0", category: "ai" },
   
    { icon: faShieldAlt, name: "Auth", color: "#E74C3C", category: "tools" },
    { icon: faFigma, name: "Figma", color: "#F24E1E", category: "tools" },
    { icon: faGit, name: "Git", color: "#F05032", category: "tools" },
    { icon: faGithub, name: "GitHub", color: "#9CA3AF", category: "tools" },
    { icon: faDocker, name: "Docker", color: "#2496ED", category: "tools" },
    { icon: faAws, name: "AWS", color: "#FF9900", category: "tools" },
    { icon: faServer, name: "Nginx", color: "#009639", category: "tools" },
    { icon: faNetworkWired, name: "Microservices", color: "#8B5CF6", category: "tools" },
  ];

  const categories = {
    frontend: { label: "Frontend", icon: faLaptopCode },
    backend: { label: "Backend", icon: faServer },
    database: { label: "Database", icon: faDatabase },
    mobile: { label: "Mobile", icon: faCube },
    ai: { label: "Generative AI", icon: faBrain },
    tools: { label: "DevOps & Tools", icon: faBolt },
  };

  const getSkillKey = (category, index) => `${category}-${index}`;
  const getCategorySkills = (category) =>
    skillsData.filter((skill) => skill.category === category);

  return (
    <motion.section
      id="skills"
      ref={sectionRef}
      className={styles.skillsSection}
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
          My Technical Arsenal
        </div>

        <h1 className={styles.mainTitle}>
          Skills <span>&</span> Technologies
        </h1>

        <p className={styles.mainSubtitle}>
          From frontend to AI systems — a comprehensive toolkit for building
          modern, scalable applications.
        </p>

        <div className={styles.titleDivider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>

      
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{skillsData.length}+</span>
            <span className={styles.statLabel}>Technologies</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>6</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>3+</span>
            <span className={styles.statLabel}>Years Coding</span>
          </div>
        </div>
      </motion.div>

    
      <div className={styles.skillsContainer}>
        {Object.entries(categories).map(([key, cat]) => {
          const skills = getCategorySkills(key);
          if (skills.length === 0) return null;

          return (
            <motion.div
              key={key}
              className={styles.column}
              variants={columnVariants}
            >
             
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrap}>
                  <FontAwesomeIcon icon={cat.icon} />
                </div>
                <div className={styles.categoryHeaderText}>
                  <h2 className={styles.sectionHeading}>{cat.label}</h2>
                  <span className={styles.categorySubtitle}>
                    {skills.length} Technologies
                  </span>
                </div>
                <span className={styles.categoryCount}>
                  {String(skills.length).padStart(2, "0")}
                </span>
              </div>

              
              <div className={styles.skillsGrid}>
                {skills.map((skill, index) => {
                  const skillKey = getSkillKey(key, index);
                  const isHovered = hoveredSkill === skillKey;

                  return (
                    <motion.div
                      key={skillKey}
                      className={`${styles.skillItem} ${
                        isHovered ? styles.skillItemHovered : ""
                      }`}
                      style={{ "--skill-color": skill.color }}
                      variants={skillVariants}
                      onMouseEnter={() => setHoveredSkill(skillKey)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className={styles.skillIconWrapper}>
                        <FontAwesomeIcon
                          icon={skill.icon}
                          className={styles.icon}
                          style={{ color: skill.color }}
                        />
                        <div
                          className={styles.iconGlow}
                          style={{
                            background: skill.color,
                            opacity: isHovered ? 0.5 : 0,
                          }}
                        />
                      </div>

                      <span className={styles.skillName}>{skill.name}</span>

                    
                      <div
                        className={`${styles.skillTooltip} ${
                          isHovered ? styles.tooltipVisible : ""
                        }`}
                      >
                        <span
                          className={styles.tooltipDot}
                          style={{ background: skill.color }}
                        />
                        {skill.name}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default Skills;