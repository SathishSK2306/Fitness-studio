import Reveal from "./Reveal";

export default function SectionHead({ eyebrow, title, lead, center = false, children }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`}>
      <Reveal as="span" className="eyebrow">{eyebrow}</Reveal>
      <Reveal as="h2" className="section-title" delay={0.08}>{title}</Reveal>
      {lead && <Reveal as="p" className="section-lead" delay={0.16}>{lead}</Reveal>}
      {children}
    </div>
  );
}
