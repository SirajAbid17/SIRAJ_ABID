import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faPaperPlane,
  faMessage,
  faTag,
  faSpinner,
  faCheckCircle,
  faTimes,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Connect.module.css";

function Connect() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [envError, setEnvError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailConfig, setEmailConfig] = useState({
    publicKey: "",
    serviceId: "",
    templateId: "",
  });

  useEffect(() => {
    const initializeEmailJS = async () => {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      setEmailConfig({ publicKey, serviceId, templateId });

      if (!publicKey || !serviceId || !templateId) {
        setEnvError(
          "EmailJS configuration is missing. Check your .env file for VITE_EMAILJS_* variables.",
        );
        return;
      }

      try {
        await emailjs.init(publicKey);
        setIsInitialized(true);
        setEnvError("");
      } catch (error) {
        if (
          error.message?.includes("public key") ||
          error.message?.includes("Invalid")
        ) {
          setEnvError("Invalid public key configuration");
        } else {
          setEnvError("Failed to initialize email service");
        }
      }
    };

    initializeEmailJS();
  }, []);

 
  useEffect(() => {
    if (showSuccess || showError) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSuccess, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (envError) {
      setErrorMsg("Email service is not configured properly.");
      setShowError(true);
      return;
    }

    if (!isInitialized) {
      setErrorMsg("Email service is not ready. Please wait.");
      setShowError(true);
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all required fields.");
      setShowError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || `New Message from ${formData.name}`,
      message: formData.message,
      to_name: "Siraj Abid",
      reply_to: formData.email,
      date: new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      if (!emailConfig.serviceId || !emailConfig.templateId) {
        throw new Error("Email service configuration is incomplete");
      }

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
      );

      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowSuccess(true);
    } catch (error) {
      let errorMessage = "Failed to send message. Please try again later.";

      if (
        error.text?.includes("public key") ||
        error.text?.includes("Invalid public key")
      ) {
        errorMessage = "Email service config error. Please contact admin.";
      } else if (
        error.text?.includes("limit") ||
        error.text?.includes("exceeded")
      ) {
        errorMessage = "Email limit reached. Try again tomorrow.";
      } else if (
        error.text?.includes("template") ||
        error.text?.includes("service")
      ) {
        errorMessage = "Email template error. Please contact admin.";
      } else if (error.status === 0 || error.status === 400) {
        errorMessage = "Network error. Check your connection.";
      }

      setErrorMsg(errorMessage);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" className={styles.connectSection}>
     
      <div className={styles.bgLayer}>
        <div className={styles.bgStars} />
        <div className={styles.bgGrid} />
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgOrb3} />
      </div>

      {/* ===== HEADER ===== */}
      <div className={styles.headerWrap}>
        <div className={styles.eyebrowBadge}>
          <span className={styles.eyebrowDot} />
          Let's Collaborate
        </div>

        <h1 className={styles.mainTitle}>
          Get in <span>Touch</span>
        </h1>

        <p className={styles.mainSubtitle}>
          Have a project in mind? Let's build something amazing together. I'll
          respond within 24 hours.
        </p>

        <div className={styles.titleDivider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>
      </div>

     
      {envError && (
        <div className={styles.errorBanner}>
          <span className={styles.errorIcon}></span>
          <div>
            <p>{envError}</p>
            <small>
              You can still email me directly at{" "}
              <a href="mailto:sirajabid641@gmail.com">sirajabid641@gmail.com</a>
            </small>
          </div>
        </div>
      )}

    
      <div className={styles.connectContainer}>
        <div className={styles.formContainer}>
          <div className={styles.formGlowA} />
          <div className={styles.formGlowB} />

          <div className={styles.formHeader}>
            <div className={styles.formIconWrap}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <h2>Send me a message</h2>
            <p>Fill the form below and I'll get back to you</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <span className={styles.inputIcon}>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className={styles.formInput}
                disabled={isSubmitting}
                autoComplete="name"
              />
            </div>

            <div className={styles.formGroup}>
              <span className={styles.inputIcon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
                className={styles.formInput}
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <span className={styles.inputIcon}>
                <FontAwesomeIcon icon={faTag} />
              </span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (optional)"
                className={styles.formInput}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <span className={`${styles.inputIcon} ${styles.textareaIcon}`}>
                <FontAwesomeIcon icon={faMessage} />
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows="3"
                className={styles.formTextarea}
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !isInitialized || !!envError}
            >
              <span className={styles.btnGlow} />
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className={styles.spinner}
                  />
                  <span>Sending...</span>
                </>
              ) : !isInitialized ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className={styles.spinner}
                  />
                  <span>Initializing...</span>
                </>
              ) : envError ? (
                <span>Service Unavailable</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={styles.btnPlane}
                  />
                </>
              )}
            </button>

            {!isInitialized && !envError && (
              <p className={styles.infoMessage}>
                 Email service is initializing...
              </p>
            )}
          </form>

          <div className={styles.formFooter}>
            <span className={styles.footerDot} />
            <span>Usually replies within 24 hours</span>
          </div>
        </div>
      </div>

      
      {showSuccess && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowSuccess(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalGlow} />

          
            <button
              className={styles.modalClose}
              onClick={() => setShowSuccess(false)}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

           
            <div className={styles.modalIconWrap}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={styles.modalIcon}
              />
              <div className={styles.modalIconPulse} />
            </div>

           
            <div className={styles.modalContent}>
              <span className={styles.modalLabel}>Message received</span>
              <h2 className={styles.modalTitle}>Thank you!</h2>
              <p className={styles.modalDesc}>
                Your message has been sent successfully. I'll review it and get
                back to you as soon as possible.
              </p>
            </div>

            
            <div className={styles.modalInfo}>
              <div className={styles.modalInfoIcon}>
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div>
                <span className={styles.modalInfoLabel}>Expected response</span>
                <span className={styles.modalInfoValue}>
                  Usually within 24 hours
                </span>
              </div>
            </div>

        
            <button
              className={styles.modalBtn}
              onClick={() => setShowSuccess(false)}
            >
              <span>Continue</span>
              <FontAwesomeIcon
                icon={faPaperPlane}
                className={styles.modalBtnIcon}
              />
            </button>
          </div>
        </div>
      )}

      
      {showError && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowError(false)}
        >
          <div
            className={`${styles.modalCard} ${styles.modalCardError}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalGlowError} />

            <button
              className={styles.modalClose}
              onClick={() => setShowError(false)}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div
              className={`${styles.modalIconWrap} ${styles.modalIconWrapError}`}
            >
              <span className={styles.modalErrorIcon}></span>
              <div className={styles.modalIconPulseError} />
            </div>

            <div className={styles.modalContent}>
              <span className={styles.modalLabelError}>
                Something went wrong
              </span>
              <h2 className={styles.modalTitle}>Try again</h2>
              <p className={styles.modalDesc}>{errorMsg}</p>
              <p className={styles.modalDescSmall}>
                You can also email me directly at{" "}
                <a
                  href="mailto:sirajabid641@gmail.com"
                  className={styles.modalLink}
                >
                  sirajabid641@gmail.com
                </a>
              </p>
            </div>

            <button
              className={styles.modalBtn}
              onClick={() => setShowError(false)}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Connect;
