import { Instagram } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Magnetic from "./Magnetic";
import { BUSINESS, IMAGES } from "../data";

export default function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <SectionHead center eyebrow="Inside The Studio" title={<>Where the <span className="accent">work</span> happens</>} />
        <div className="gallery-grid">
          {IMAGES.gallery.map((g, i) => (
            <Reveal as="figure" from="zoom" key={g.src} delay={i * 0.1} className={`g-item ${g.cls ?? ""}`}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </Reveal>
          ))}
        </div>
        <Reveal className="center insta-cta">
          <Magnetic>
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Instagram size={18} /> See more on Instagram
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
