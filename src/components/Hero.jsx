import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ShowerHead, Users, Star } from "lucide-react";
import { BUSINESS, IMAGES } from "../data";
import { scrollToId } from "../lib/scroll";
import { EASE } from "./Reveal";
import Magnetic from "./Magnetic";

const LINES = [
  { text: "TRAIN WITH" },
  { text: "FOCUS.", cls: "accent" },
  { text: "TRANSFORM", cls: "outline" },
  { text: "FOR LIFE." },
];

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const state = ready ? "show" : "hidden";
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <motion.img
          src={IMAGES.hero}
          alt=""
          fetchpriority="high"
          initial={{ scale: 1.2 }}
          animate={{ scale: ready ? 1 : 1.2 }}
          transition={{ duration: 2.4, ease: EASE }}
        />
      </motion.div>
      <div className="hero-overlay" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <motion.div className="container hero-content" style={{ y: contentY, opacity: fade }}>
        <motion.div className="badge" {...fadeUp(0.1)}>
          <span className="stars" aria-label="5 stars">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
          </span>
          <span>
            <strong>{BUSINESS.rating}</strong> on Google · {BUSINESS.reviews}+ reviews
          </span>
        </motion.div>

        <h1 className="hero-title">
          {LINES.map((l, i) => (
            <span className="line" key={l.text}>
              <motion.span
                className={`word ${l.cls ?? ""}`}
                initial={{ y: "110%" }}
                animate={state === "show" ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: EASE }}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero-sub" {...fadeUp(0.6)}>
          A well-equipped unisex gym in Taramani, Chennai with personalised training and diet plans, and trainers who
          keep you going.
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(0.75)}>
          <Magnetic>
            <button className="btn btn-primary" onClick={() => scrollToId("contact")}>
              Start Your Journey <ArrowRight size={18} className="arrow" />
            </button>
          </Magnetic>
          <Magnetic>
            <a href={BUSINESS.phoneHref} className="btn btn-ghost">
              <Phone size={18} /> {BUSINESS.phoneDisplay}
            </a>
          </Magnetic>
        </motion.div>

        <motion.ul className="hero-meta" {...fadeUp(0.9)}>
          <li><span className="dot live" /> Open today · Closes 9 PM</li>
          <li><ShowerHead size={16} /> Showers &amp; Restrooms</li>
          <li><Users size={16} /> Unisex Gym</li>
        </motion.ul>
      </motion.div>

      <button className="scroll-hint" onClick={() => scrollToId("about")} aria-label="Scroll down">
        <span className="mouse"><span className="wheel" /></span>
      </button>
    </section>
  );
}
