
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faHeart,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "./Footer.module.css";

function Footer() {
  const [year] = useState(new Date().getFullYear());

  const scrollToTop = () => {
    const lenis = window.lenis;

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
     
      <div className={styles.bgLayer}>
        <div className={styles.bgStars} />
        <div className={styles.bgGrid} />
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgOrb3} />
      </div>

      <div className={styles.container}>
       
        <div className={styles.brandCol}>
          <div className={styles.brandLogo}>
            <div className={styles.logoMark}>
              <span className={styles.logoText}>SA</span>
              <div className={styles.logoGlow} />
            </div>

            <div className={styles.brandText}>
              <h2 className={styles.brandName}>Siraj Abid</h2>

              <p className={styles.brandTagline}>
                Full Stack Developer{" "}
                <span className={styles.dot}>·</span> AI Engineer
              </p>
            </div>
          </div>

          <p className={styles.brandBio}>
            Building intelligent, scalable, and beautiful digital experiences by combining modern web technologies, Generative AI, and thoughtful user-centered design to create powerful solutions for the modern web.

          </p>
        </div>

       
        <div className={styles.socialsCol}>
          <h3 className={styles.colTitle}>Connect</h3>

          <p className={styles.socialSubtitle}>
            Stay connected.
          </p>
       <p className={styles.socialDescription}>

Let’s create something amazing.
</p>

          <div className={styles.socialIcons}>
            <a
              href="https://github.com/SirajAbid17"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span className={styles.socialTooltip}>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sirajabid17/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span className={styles.socialTooltip}>LinkedIn</span>
            </a>

            <a
              href="https://www.instagram.com/sirajabid17/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
              <span className={styles.socialTooltip}>Instagram</span>
            </a>

            <a
              href="https://web.facebook.com/siraj.abbasi.7106"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
              <span className={styles.socialTooltip}>Facebook</span>
            </a>
          </div>
        </div>

        
        <div className={styles.contactCol}>
          <h3 className={styles.colTitle}>Get in Touch</h3>

          <div className={styles.contactList}>
            <a
              href="mailto:sirajabid641@gmail.com"
              className={styles.contactLink}
            >
              <span className={styles.contactIconWrap}>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>

              <span className={styles.contactText}>
                sirajabid641@gmail.com
              </span>
            </a>

            <a
              href="tel:+923287303593"
              className={styles.contactLink}
            >
              <span className={styles.contactIconWrap}>
                <FontAwesomeIcon icon={faPhone} />
              </span>

              <span className={styles.contactText}>
                +92 328 7303593
              </span>
            </a>
          </div>
        </div>
      </div>

    
      <div className={styles.dividerWrap}>
        <span className={styles.dividerLine} />

        <span className={styles.dividerHeart}>
          <FontAwesomeIcon icon={faHeart} />
        </span>

        <span className={styles.dividerLine} />
      </div>

    
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {year}{" "}
          <span className={styles.nameHighlight}>Siraj Abid</span>

          <span className={styles.sep}>·</span>

          Crafted with{" "}
          <span className={styles.heartIcon}>❤️</span> and passion
        </p>

        <button
          className={styles.scrollTopBtn}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;



