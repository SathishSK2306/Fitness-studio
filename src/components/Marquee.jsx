import { MARQUEE } from "../data";

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
