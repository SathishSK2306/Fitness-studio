import { Phone, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { BUSINESS, waLink } from "../data";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <Reveal as="h2">
          Your first step starts <span className="outline-dark">today.</span>
        </Reveal>
        <Reveal className="cta-actions" delay={0.15}>
          <Magnetic>
            <a href={BUSINESS.phoneHref} className="btn btn-dark">
              <Phone size={18} /> Call Now
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={waLink("Hi Focus Fitness Studio, I'd like to know about membership.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark-outline"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
