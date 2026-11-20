import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, Instagram, Clock, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { BUSINESS, GOALS, waLink } from "../data";

const INFO = [
  { icon: MapPin, label: "Address", value: BUSINESS.address, href: BUSINESS.mapsLink, external: true },
  { icon: Phone, label: "Phone", value: BUSINESS.phoneDisplay, href: BUSINESS.phoneHref },
  { icon: Instagram, label: "Instagram", value: BUSINESS.instagramHandle, href: BUSINESS.instagram, external: true },
  { icon: Clock, label: "Timings", value: `Open today · Closes at ${BUSINESS.closes}`, note: "Call us to confirm timings" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = { name: !name.trim(), goal: !goal };
    setErrors(errs);
    if (errs.name || errs.goal) return;
    const msg = `Hi Focus Fitness Studio! I'm ${name.trim()}. I'm interested in ${goal.toLowerCase()}. Could you share membership details?`;
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
    setName("");
    setGoal("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <SectionHead eyebrow="Visit Us" title={<>Come <span className="accent">train</span> with us</>} />

          <div className="info-list">
            {INFO.map(({ icon: Icon, label, value, href, external, note }, i) => {
              const Tag = href ? motion.a : motion.div;
              return (
                <Reveal key={label} delay={i * 0.08}>
                  <Tag
                    className="info-item"
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    whileHover={href ? { x: 6 } : undefined}
                  >
                    <span className="ii-icon"><Icon size={20} /></span>
                    <span>
                      <strong>{label}</strong>
                      {value}
                      {note && <><br /><small>{note}</small></>}
                    </span>
                  </Tag>
                </Reveal>
              );
            })}
          </div>

          <Reveal as="form" className="contact-form" onSubmit={submit} noValidate>
            <h3>Enquire on WhatsApp</h3>
            <div className={`field ${errors.name ? "error" : ""}`}>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder=" " autoComplete="name" />
              <label htmlFor="name">Your name</label>
            </div>
            <div className={`field ${errors.goal ? "error" : ""} ${goal ? "filled" : ""}`}>
              <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="" disabled hidden />
                {GOALS.map((g) => <option key={g}>{g}</option>)}
              </select>
              <label htmlFor="goal">Your goal</label>
            </div>
            <motion.button type="submit" className="btn btn-primary btn-block" whileTap={{ scale: 0.97 }}>
              Send Enquiry <ArrowRight size={18} className="arrow" />
            </motion.button>
            <AnimatePresence mode="wait">
              {(errors.name || errors.goal || sent) && (
                <motion.p
                  key={sent ? "sent" : "err"}
                  className={`form-note ${sent ? "ok" : "bad"}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                >
                  {sent ? "Opening WhatsApp…" : "Please fill in your name and goal."}
                </motion.p>
              )}
            </AnimatePresence>
          </Reveal>
        </div>

        <Reveal from="right" className="map-wrap">
          <iframe
            title="Map showing Focus Fitness Studio location"
            src={BUSINESS.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
