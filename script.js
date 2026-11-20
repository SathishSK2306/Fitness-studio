/* =========================================================
   Focus Fitness Studio – interactions & animations
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;

  document.body.classList.add("loading");

  /* ---------- Loader ---------- */
  const finishLoading = () => {
    const loader = $("#loader");
    if (!loader || loader.classList.contains("done")) return;
    loader.classList.add("done");
    document.body.classList.remove("loading");
    setTimeout(() => document.body.classList.add("ready"), 250);
    setTimeout(() => loader.remove(), 1200);
  };
  window.addEventListener("load", () => setTimeout(finishLoading, reduceMotion ? 0 : 900));
  setTimeout(finishLoading, 3500); // fallback if an image is slow

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Nav: scroll state, hide on scroll down ---------- */
  const nav = $("#nav");
  const progress = $(".scroll-progress");
  let lastY = 0;
  let ticking = false;

  const parallaxEls = $$("[data-parallax]");

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    const menuOpen = $("#navLinks").classList.contains("open");
    nav.classList.toggle("hide", !menuOpen && y > lastY && y > 500);
    lastY = y;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (!reduceMotion) {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax);
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        el.style.transform = `translate3d(0, ${-rect.top * speed}px, 0)`;
      });
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const navLinks = $("#navLinks");
  const toggleMenu = (open) => {
    navLinks.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu(!navLinks.classList.contains("open")));
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  /* ---------- Active link on scroll ---------- */
  const sections = $$("section[id]");
  const linkFor = (id) => $(`.nav-links a[href="#${id}"]`);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = linkFor(entry.target.id);
      if (link && entry.isIntersecting) {
        $$(".nav-links a").forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
  revealEls.forEach((el) => { if (el.dataset.delay) el.style.setProperty("--d", `${el.dataset.delay}ms`); });
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => revealer.observe(el));

  /* ---------- Counters ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = reduceMotion ? 0 : 1800;
    const start = performance.now();
    const step = (now) => {
      const t = duration ? Math.min((now - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { animateCount(entry.target); counter.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counter.observe(el));

  /* ---------- Cursor glow ---------- */
  const glow = $(".cursor-glow");
  if (canHover && !reduceMotion && glow) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => { gx = e.clientX; gy = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx - 210}px, ${cy - 210}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Magnetic buttons ---------- */
  if (canHover && !reduceMotion) {
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });

    /* ---------- 3D tilt + spotlight on service cards ---------- */
    $$(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- Review slider ---------- */
  const slider = $("#reviewSlider");
  if (slider) {
    const track = $(".review-track", slider);
    const slides = $$(".review-card", slider);
    const dotsWrap = $(".slider-dots", slider);
    let index = 0;
    let timer;

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      $$("button", dotsWrap).forEach((d, di) => {
        d.classList.toggle("active", di === index);
        d.setAttribute("aria-selected", String(di === index));
      });
    };
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Review ${i + 1}`);
      dot.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    const restart = () => {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(() => go(index + 1), 5000);
    };
    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", restart);

    // swipe support
    let startX = null;
    slider.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
    slider.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
      restart();
    });

    go(0);
    restart();
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const goal = form.goal.value;
      const note = $("#formNote");
      $$(".field", form).forEach((f) => f.classList.remove("error"));

      if (!name || !goal) {
        if (!name) form.name.closest(".field").classList.add("error");
        if (!goal) form.goal.closest(".field").classList.add("error");
        note.textContent = "Please fill in your name and goal.";
        note.style.color = "#ef4444";
        return;
      }
      const msg = `Hi Focus Fitness Studio! I'm ${name}. I'm interested in ${goal.toLowerCase()}. Could you share membership details?`;
      window.open(`https://wa.me/919176443433?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      note.textContent = "Opening WhatsApp…";
      note.style.color = "var(--accent)";
      form.reset();
    });
  }
})();
