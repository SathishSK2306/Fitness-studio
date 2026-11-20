import { Instagram, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import { BUSINESS, NAV_LINKS } from "../data";
import { scrollToId } from "../lib/scroll";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo onClick={() => scrollToId("home")} />
        <nav className="footer-links" aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.id);
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="socials">
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
          <a href={BUSINESS.phoneHref} aria-label="Call"><Phone size={20} /></a>
          <a href={BUSINESS.mapsLink} target="_blank" rel="noopener noreferrer" aria-label="Directions"><MapPin size={20} /></a>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Focus Fitness Studio, Taramani, Chennai. All rights reserved.</p>
    </footer>
  );
}
