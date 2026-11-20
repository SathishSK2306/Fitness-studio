import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionHead from "./SectionHead";
import { SERVICES } from "../data";
import { EASE } from "./Reveal";

function ServiceCard({ icon: Icon, title, text, index }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const bg = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgba(198,255,0,0.13), transparent 45%)`
  );

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: EASE }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={{ y: -8 }}
    >
      <motion.div className="sc-spot" style={{ background: bg }} />
      <div className="sc-icon">
        <Icon size={28} strokeWidth={1.8} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHead
          center
          eyebrow="What We Offer"
          title={<>Programs built for <span className="accent">every goal</span></>}
          lead="From fat loss to strength and mobility, find the training that fits you."
        />
        <div className="service-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
