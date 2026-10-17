import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [statusText, setStatusText] = useState("Initializing...");
  const [particles, setParticles] = useState([]);

 
  useEffect(() => {
    const arr = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (360 / 8) * i,
      delay: Math.random() * 0.6,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(arr);
  }, []);


  useEffect(() => {
    let mounted = true;

    const tick = () => {
      if (!mounted) return;

      setProgress((prev) => {
        let increment;
        if (prev < 30) increment = Math.random() * 6 + 3;
        else if (prev < 70) increment = Math.random() * 4 + 2;
        else if (prev < 92) increment = Math.random() * 2.5 + 1;
        else increment = Math.random() * 1.5 + 0.5;

        const next = Math.min(prev + increment, 100);

        if (next >= 100) {
          setTimeout(() => mounted && setIsVisible(false), 500);
          return 100;
        }
        return next;
      });

      const delay = progress > 85 ? 180 : 100;
      setTimeout(tick, delay);
    };

    const timeoutId = setTimeout(tick, 100);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (progress < 20) setStatusText("Initializing...");
    else if (progress < 45) setStatusText("Loading Assets...");
    else if (progress < 70) setStatusText("Preparing Interface...");
    else if (progress < 92) setStatusText("Almost Ready...");
    else setStatusText("Welcome!");
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className={styles.loader}>
    
      <div className={styles.bgStars} />
      <div className={styles.bgGrid} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

     
      <div className={styles.loaderContent}>
       
        <div className={styles.logoWrapper}>
          <div className={styles.logoRingOuter} />
          <div className={styles.logoRingMiddle} />
          <div className={styles.logoRingInner} />
          <div className={styles.logoGlow} />

          <div className={styles.orbitContainer}>
            {particles.map((p) => (
              <span
                key={p.id}
                className={styles.orbitParticle}
                style={{
                  "--angle": `${p.angle}deg`,
                  "--delay": `${p.delay}s`,
                  "--duration": `${p.duration}s`,
                }}
              />
            ))}
          </div>

          <div className={styles.logoText}>SA</div>
          <div className={styles.logoPulse} />
        </div>

     
        <h1 className={styles.brandName}>
          Siraj <span>Abid</span>
        </h1>

       
        <p className={styles.statusText}>
          <span className={styles.statusDot} />
          {statusText}
        </p>

        
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            >
              <div className={styles.progressShine} />
            </div>
          </div>

          <div className={styles.progressInfo}>
            <span className={styles.progressText}>
              {Math.round(progress)}%
            </span>
            <span className={styles.progressLabel}>Loading</span>
          </div>
        </div>

        
        <div className={styles.dotsIndicator}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>

    
      <div className={styles.bottomBranding}>
        <span className={styles.brandingLine} />
        <span className={styles.brandingText}>
          Portfolio • {new Date().getFullYear()}
        </span>
        <span className={styles.brandingLine} />
      </div>
    </div>
  );
}

export default LoadingScreen;