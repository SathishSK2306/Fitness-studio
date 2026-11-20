import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Counter from "./Counter";
import SectionHead from "./SectionHead";
import { IMAGES, BUSINESS } from "../data";

const STATS = [
  { to: BUSINESS.reviews, suffix: "+", label: "Google Reviews" },
  { to: 12, suffix: "+", label: "Training Programs" },
  { to: 100, suffix: "%", label: "Personalised Plans" },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <Reveal from="left" className="about-media">
          <div className="img-frame main">
            <img src={IMAGES.aboutMain} alt="Gym floor with training equipment" loading="lazy" />
          </div>
          <Reveal from="zoom" delay={0.3} className="img-frame small">
            <img src={IMAGES.aboutSmall} alt="Trainer guiding a workout" loading="lazy" />
          </Reveal>
          <motion.div
            className="floating-card"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="fc-num">
              <Counter to={BUSINESS.rating} decimals={1} />★
            </span>
            <span className="fc-label">Google Rating</span>
          </motion.div>
        </Reveal>

        <div className="about-text">
          <SectionHead
            eyebrow="About Us"
            title={<>More than a gym.<br /><span className="accent">A place to stay focused.</span></>}
          />
          <Reveal as="p">
            Focus Fitness Studio is a unisex gym in the heart of Taramani. Whether it's your first workout or you're
            training for a goal, our trainers build a plan around your body, your schedule and your progress.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            Members talk about our <strong>well-maintained equipment</strong>, a <strong>clean, hygienic space</strong>{" "}
            and trainers who are <strong>enthusiastic and motivating</strong>.
          </Reveal>
          <div className="stats">
            {STATS.map((s, i) => (
              <Reveal key={s.label} className="stat" delay={i * 0.12} whileHover={{ y: -6 }}>
                <span className="stat-num">
                  <Counter to={s.to} />
                  {s.suffix}
                </span>
                <span className="stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
