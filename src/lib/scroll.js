// Shared smooth-scroll helper. Lenis is registered by App when enabled;
// otherwise we fall back to the browser's native smooth scrolling.
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export const NAV_OFFSET = 72;

export function scrollToId(id) {
  if (id === "home") {
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET + 1, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 1;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function lockScroll(locked) {
  document.documentElement.classList.toggle("no-scroll", locked);
  if (lenis) locked ? lenis.stop() : lenis.start();
}
