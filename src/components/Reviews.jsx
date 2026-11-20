import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { BUSINESS, REVIEWS } from "../data";
import { EASE } from "./Reveal";

const Stars = ({ size = 16 }) => (
  <span className="stars" aria-label="5 stars">
    {[...Array(5)].map((_, i) => <Star key={i} size={size} fill="currentColor" strokeWidth={0} />)}
  </span>
);

export default function Reviews() {
  const [[index, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((next, d) => {
    setState(([i]) => [((next ?? i + d) + REVIEWS.length) % REVIEWS.length, d]);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(null, 1), 5500);
    return () => clearInterval(t);
  }, [paused, reduce, go, index]);

  const r = REVIEWS[index];

  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <SectionHead center eyebrow="Testimonials" title={<>What our <span className="accent">members say</span></>}>
          <Reveal className="rating-big" delay={0.2}>
            <span className="rb-num">{BUSINESS.rating}</span>
            <div>
              <Stars size={20} />
              <span className="rb-sub">Based on {BUSINESS.reviews} Google reviews</span>
            </div>
          </Reveal>
        </SectionHead>

        <Reveal className="review-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="review-stage">
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.blockquote
                key={index}
                className="review-card"
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 80 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -80 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(null, 1);
                  else if (info.offset.x > 60) go(null, -1);
                }}
              >
                <Quote className="review-quote" size={56} />
                <Stars />
                <p>“{r.text}”</p>
                <footer>— {r.by}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="slider-controls">
            <button className="slider-arrow" onClick={() => go(null, -1)} aria-label="Previous review">
              <ChevronLeft size={20} />
            </button>
            <div className="slider-dots" role="tablist">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Review ${i + 1}`}
                  className={i === index ? "active" : ""}
                  onClick={() => go(i, i > index ? 1 : -1)}
                />
              ))}
            </div>
            <button className="slider-arrow" onClick={() => go(null, 1)} aria-label="Next review">
              <ChevronRight size={20} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
