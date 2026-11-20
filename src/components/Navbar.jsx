import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Phone, MapPin, Instagram, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, BUSINESS } from "../data";
import { scrollToId, lockScroll } from "../lib/scroll";
import { EASE } from "./Reveal";

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const ids = NAV_LINKS.map((l) => l.id);

const drawer = {
  closed: { x: "100%", transition: { duration: 0.5, ease: EASE } },
  open: { x: 0, transition: { duration: 0.6, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 } },
};
const item = {
  closed: { opacity: 0, x: 40 },
  open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection(ids);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 600);
  });

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  // close on Escape / when resized to desktop
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 901px)");
    const onMq = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const go = (id) => {
    setOpen(false);
    // wait one frame so scroll unlocks before scrolling
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "scrolled" : ""}`}
        animate={{ y: hidden && !open ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="container nav-inner">
          <Logo onClick={() => go("home")} />

          <nav className="nav-links" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={active === l.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
              >
                {l.label}
                {active === l.id && <motion.span layoutId="nav-underline" className="nav-underline" />}
              </a>
            ))}
          </nav>

          <a href={BUSINESS.phoneHref} className="btn btn-primary btn-sm nav-cta">
            <Phone size={16} /> Call Now
          </a>

          <button
            className="burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid" }}
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer: rendered outside the header so header effects can't clip it */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-menu"
              className="drawer"
              variants={drawer}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <nav className="drawer-links">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.id}
                    variants={item}
                    href={`#${l.id}`}
                    className={active === l.id ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                  >
                    <span className="drawer-num">0{i + 1}</span>
                    {l.label}
                    <ArrowUpRight className="drawer-arrow" size={22} />
                  </motion.a>
                ))}
              </nav>

              <motion.div className="drawer-footer" variants={item}>
                <a href={BUSINESS.phoneHref} className="btn btn-primary btn-block">
                  <Phone size={18} /> {BUSINESS.phoneDisplay}
                </a>
                <div className="drawer-meta">
                  <a href={BUSINESS.mapsLink} target="_blank" rel="noopener noreferrer">
                    <MapPin size={16} /> Taramani, Chennai
                  </a>
                  <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram size={16} /> Instagram
                  </a>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
