import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Magnetic from "./Magnetic";
import { IMAGES, WHY } from "../data";
import { scrollToId } from "../lib/scroll";

export default function WhyUs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section className="section why" id="why" ref={ref}>
      <motion.div className="why-bg" style={{ y }}>
        <img src={IMAGES.why} alt="" loading="lazy" />
      </motion.div>
      <div className="why-overlay" />
      <div className="container why-grid">
        <div>
          <SectionHead
            eyebrow="Why Focus"
            title={<>Everything you need.<br /><span className="accent">Nothing you don't.</span></>}
            lead="We keep the basics excellent: good equipment, a clean space and coaches who show up for you."
          />
          <Reveal delay={0.2}>
            <Magnetic>
              <button className="btn btn-primary" onClick={() => scrollToId("contact")}>
                Book a Free Visit <ArrowRight size={18} className="arrow" />
              </button>
            </Magnetic>
          </Reveal>
        </div>
        <ul className="why-list">
          {WHY.map((w, i) => (
            <Reveal as="li" from="right" key={w.title} delay={i * 0.12} className="why-item" whileHover={{ x: -8 }}>
              <span className="why-num">0{i + 1}</span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
