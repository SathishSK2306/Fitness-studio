import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { setLenis } from "./lib/scroll";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import CtaBand from "./components/CtaBand";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });

  // Buttery smooth scrolling (desktop wheel); touch devices keep native scroll.
  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), reduceMotion ? 0 : 1400);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Services />
        <WhyUs />
        <Gallery />
        <Reviews />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
