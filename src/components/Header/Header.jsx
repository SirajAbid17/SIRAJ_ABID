import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FaBars, FaCode } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { LuBot } from "react-icons/lu";
import styles from "./Header.module.css";
import { askSirajAI } from "../../lib/groqClient";


const headerVariants = {
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  hidden: {
    y: -120,
    opacity: 0,
    scale: 0.95,
    transition: { type: "spring", stiffness: 80, damping: 25 },
  },
};


function formatMessage(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    if (line.trim() === "") {
      return <div key={lineIdx} style={{ height: 6 }} />;
    }

    const bulletMatch = line.match(/^(\s*[-*•])\s+(.*)$/);
    const isBullet = !!bulletMatch;
    const content = isBullet ? bulletMatch[2] : line;

    const numberMatch = line.match(/^(\s*\d+\.)\s+(.*)$/);
    const isNumbered = !!numberMatch;
    const finalContent = isNumbered ? numberMatch[2] : content;

    const parts = [];
    let key = 0;

    const regex =
      /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|https?:\/\/[^\s*)]+|www\.[^\s*)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:github\.com|linkedin\.com)\/[^\s*)]+)/g;

    const matches = [...finalContent.matchAll(regex)];

    if (matches.length === 0) {
      parts.push(<span key={key++}>{finalContent}</span>);
    } else {
      let lastIdx = 0;
      matches.forEach((m) => {
        const matchStart = m.index;
        const matchText = m[0];

        if (matchStart > lastIdx) {
          parts.push(
            <span key={key++}>{finalContent.slice(lastIdx, matchStart)}</span>
          );
        }

        if (matchText.startsWith("[") && matchText.includes("](")) {
          const linkMatch = matchText.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (linkMatch) {
            const linkText = linkMatch[1];
            let href = linkMatch[2].replace(/\*+/g, "");
            if (!href.startsWith("http") && !href.startsWith("mailto:")) {
              href = `https://${href}`;
            }
            parts.push(
              <a
                key={key++}
                href={href}
                className={styles.chatLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </a>
            );
          }
        } else if (matchText.startsWith("**") && matchText.endsWith("**")) {
          parts.push(
            <strong key={key++} style={{ color: "#fff", fontWeight: 700 }}>
              {matchText.slice(2, -2)}
            </strong>
          );
        } else if (matchText.startsWith("*") && matchText.endsWith("*")) {
          parts.push(
            <em key={key++} style={{ color: "rgba(255,255,255,0.85)" }}>
              {matchText.slice(1, -1)}
            </em>
          );
        } else if (matchText.startsWith("`") && matchText.endsWith("`")) {
          parts.push(
            <code
              key={key++}
              style={{
                background: "rgba(124, 140, 255, 0.15)",
                padding: "2px 6px",
                borderRadius: 4,
                fontFamily: "monospace",
                fontSize: "0.9em",
                color: "#b8c2ff",
              }}
            >
              {matchText.slice(1, -1)}
            </code>
          );
        } else if (
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(matchText)
        ) {
          parts.push(
            <a
              key={key++}
              href={`mailto:${matchText}`}
              className={styles.chatLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {matchText}
            </a>
          );
        } else {
          const cleanText = matchText.replace(/\*+/g, "");
          let href = cleanText;
          if (!href.startsWith("http")) href = `https://${href}`;
          parts.push(
            <a
              key={key++}
              href={href}
              className={styles.chatLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cleanText}
            </a>
          );
        }

        lastIdx = matchStart + matchText.length;
      });

      if (lastIdx < finalContent.length) {
        parts.push(<span key={key++}>{finalContent.slice(lastIdx)}</span>);
      }
    }

    if (isBullet) {
      return (
        <div
          key={lineIdx}
          style={{ display: "flex", gap: 8, paddingLeft: 4, marginTop: 2 }}
        >
          <span style={{ color: "#7c8cff", flexShrink: 0 }}>•</span>
          <span style={{ flex: 1 }}>{parts}</span>
        </div>
      );
    }

    if (isNumbered) {
      return (
        <div
          key={lineIdx}
          style={{ display: "flex", gap: 8, paddingLeft: 4, marginTop: 2 }}
        >
          <span
            style={{
              color: "#7c8cff",
              fontWeight: 700,
              flexShrink: 0,
              minWidth: 18,
            }}
          >
            {numberMatch[1].trim()}
          </span>
          <span style={{ flex: 1 }}>{parts}</span>
        </div>
      );
    }

    return (
      <p key={lineIdx} style={{ margin: 0, marginTop: lineIdx === 0 ? 0 : 4 }}>
        {parts}
      </p>
    );
  });
}


const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! 👋 I'm **Siraj's AI assistant**. Ask me anything about his **skills**, **projects**, or how to **hire him**.",
};

const MAX_HISTORY = 6;

function AIModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    setTimeout(() => inputRef.current?.focus(), 100);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const recentMessages = updated.slice(-MAX_HISTORY);

      const reply = await askSirajAI(
        recentMessages.map(({ role, content }) => ({ role, content }))
      );
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      const status = err?.status || err?.response?.status;

      let userMsg = "Sorry, something went wrong. Please try again.";
      if (status === 413) {
        userMsg =
          "Chat is too long. Please refresh and start a new conversation, or contact Siraj on WhatsApp: **+92 328 7303593**";
      } else if (status === 401 || status === 403) {
        userMsg =
          "AI service key issue. Please contact Siraj directly on WhatsApp: **+92 328 7303593**";
      } else if (status === 429) {
        userMsg = "Too many requests. Please wait a moment and try again.";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: userMsg },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
         
          <motion.div
            className={styles.modalMobileBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.modalPanel}
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            
            <span className={styles.modalGlow1} />
            <span className={styles.modalGlow2} />

           
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalAvatarRing}>
                  <LuBot size={18} />
                  <span className={styles.modalAvatarDot} />
                </div>
                <div className={styles.modalHeaderText}>
                  <h2 className={styles.modalTitle}>Siraj's AI Assistant</h2>
                  <span className={styles.modalStatus}>
                    <span className={styles.modalStatusDot} />
                    Online · Replies instantly
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <ImCross size={11} />
              </button>
            </div>

           
            <div className={styles.modalBody} ref={messagesBoxRef}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.role === "user"
                      ? styles.chatBubbleUser
                      : styles.chatBubbleBot
                  }
                >
                  {msg.role === "assistant" && (
                    <span className={styles.chatAvatar}>
                      <LuBot size={16} />
                    </span>
                  )}
                  <div className={styles.chatText}>
                    {msg.role === "assistant"
                      ? formatMessage(msg.content)
                      : msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className={styles.chatBubbleBot}>
                  <span className={styles.chatAvatar}>
                    <LuBot size={16} />
                  </span>
                  <div className={styles.typingDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

           
            <div className={styles.modalInputRow}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about skills, projects..."
                className={styles.modalInput}
                disabled={loading}
              />
              <button
                type="button"
                className={styles.modalSendBtn}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                {loading ? (
                  <span className={styles.sendSpinner} />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


function FloatingButtons({ onOpenAI, aiOpen }) {
  const [showAITooltip, setShowAITooltip] = useState(false);
  const [showWhatsappTooltip, setShowWhatsappTooltip] = useState(false);

  const whatsappNumber = "923287303593";
  const whatsappMessage = "Hi Siraj! I'd like to discuss a project with you.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.floatingWrap}>
      
      <motion.button
        type="button"
        className={`${styles.floatingBtn} ${styles.whatsappBtn}`}
        onClick={openWhatsApp}
        onMouseEnter={() => setShowWhatsappTooltip(true)}
        onMouseLeave={() => setShowWhatsappTooltip(false)}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat on WhatsApp"
      >
        <span className={styles.floatingPulse} />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.floatingIcon}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <AnimatePresence>
          {showWhatsappTooltip && !aiOpen && (
            <motion.span
              className={styles.floatingTooltip}
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      
      <motion.button
        type="button"
        className={`${styles.floatingBtn} ${styles.aiBtn} ${
          aiOpen ? styles.aiBtnActive : ""
        }`}
        onClick={onOpenAI}
        onMouseEnter={() => setShowAITooltip(true)}
        onMouseLeave={() => setShowAITooltip(false)}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={aiOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={aiOpen}
      >
        {!aiOpen && <span className={styles.floatingPulse} />}

        <AnimatePresence mode="wait" initial={false}>
          {aiOpen ? (
            <motion.span
              key="cross"
              className={styles.floatingIconWrap}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ImCross size={15} />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              className={styles.floatingIconWrap}
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
             
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="20"
                height="20"
              >
                <rect x="4" y="8" width="16" height="11" rx="3.5" />
                <path d="M12 8V5" />
                <circle cx="12" cy="3.5" r="1.2" fill="currentColor" />
                <circle cx="9" cy="13" r="1" fill="currentColor" />
                <circle cx="15" cy="13" r="1" fill="currentColor" />
                <path d="M9.5 16.5h5" />
                <path d="M2.5 12.5v2.5" />
                <path d="M21.5 12.5v2.5" />
                <path
                  d="M18.5 3.2l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAITooltip && !aiOpen && (
            <motion.span
              className={styles.floatingTooltip}
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              Try AI Assistant
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}


function MobileMenu({
  open,
  onClose,
  navLinks,
  activeSection,
  onNavigate,
  theme,
  onThemeToggle,
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.mobileBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          >
            <button
              type="button"
              className={styles.mobileClose}
              onClick={onClose}
              aria-label="Close menu"
            >
              <ImCross />
            </button>

            <div className={styles.mobileMenuInner}>
              <nav className={styles.mobileNav}>
                {navLinks.map(({ id, label }, i) => (
                  <motion.button
                    key={id}
                    type="button"
                    className={`${styles.mobileNavLink} ${
                      activeSection === id ? styles.active : ""
                    }`}
                    onClick={() => onNavigate(id)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i + 0.15 }}
                  >
                    <span className={styles.navDot} />
                    {label}
                  </motion.button>
                ))}
              </nav>

              <motion.div
                className={styles.mobileActions}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <button
                  type="button"
                  className={styles.mobileConnectBtn}
                  onClick={() => onNavigate("connect")}
                >
                  Let's Connect
                  <FontAwesomeIcon icon={faRocket} />
                </button>

                <button
                  type="button"
                  className={styles.mobileThemeToggle}
                  onClick={onThemeToggle}
                  aria-label="Toggle theme"
                >
                  <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
                </button>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


function Header({ theme, setTheme }) {
  const [sideBar, setSideBar] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setSideBar(false);
    };

    setIsMobile(mq.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    let ticking = false;
    let scrollTimeout;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setVisible(currentScrollY < prevScrollY || currentScrollY < 10);
          setPrevScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const sections = [
          "home",
          "education",
          "skills",
          "projects",
          "resume",
          "contact",
        ];
        let current = "home";
        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) current = id;
          }
        });
        setActiveSection(current);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [prevScrollY]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.body.className = newTheme;
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const lenis = window.lenis;
      if (lenis) lenis.scrollTo(section, { offset: -80, duration: 1.2 });
      else section.scrollIntoView({ behavior: "smooth", block: "start" });
      setSideBar(false);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        className={styles.header}
        variants={headerVariants}
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        data-theme={theme}
      >
        <motion.div
          className={styles.glowOrb}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className={styles.logo}
          onClick={() => scrollToSection("home")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          role="button"
          tabIndex={0}
        >
          <div className={styles.logoWrapper}>
            <img
              src="/siraj1.png"
              alt="Siraj Abid"
              className={styles.logoImage}
            />
            <motion.div
              className={styles.logoRing}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Siraj Abid
          </motion.p>
          <span className={styles.logoBadge}>
            <FaCode className={styles.badgeIcon} />
          </span>
        </motion.div>

        {!isMobile && (
          <nav className={styles.nav}>
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`${styles.navLink} ${
                  activeSection === id ? styles.active : ""
                }`}
                onClick={() => scrollToSection(id)}
              >
                <span className={styles.navDot} />
                {label}
              </button>
            ))}

            <div className={styles.navActions}>
              <button
                type="button"
                className={styles.connect_btn}
                onClick={() => scrollToSection("connect")}
              >
                <span className={styles.btnPulse} />
                Let's Connect
                <span className={styles.btnIcon}>
                  <FontAwesomeIcon icon={faRocket} />
                </span>
              </button>

              <button
                type="button"
                className={styles.themeToggle}
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
              >
                <FontAwesomeIcon
                  icon={theme === "light" ? faMoon : faSun}
                  className={styles.themeIcon}
                />
              </button>
            </div>
          </nav>
        )}

        {isMobile && (
          <motion.button
            type="button"
            className={styles.toggleIcon}
            onClick={() => setSideBar(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open menu"
            aria-expanded={sideBar}
          >
            <FaBars />
          </motion.button>
        )}
      </motion.header>

      {isMobile && (
        <MobileMenu
          open={sideBar}
          onClose={() => setSideBar(false)}
          navLinks={navLinks}
          activeSection={activeSection}
          onNavigate={scrollToSection}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />
      )}

      <FloatingButtons
        onOpenAI={() => setAiModalOpen((prev) => !prev)}
        aiOpen={aiModalOpen}
      />
      <AIModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </>
  );
}

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Header;