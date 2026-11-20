export default function Logo({ onClick }) {
  return (
    <a
      href="#home"
      className="logo"
      aria-label="Focus Fitness Studio home"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className="logo-mark">F</span>
      <span className="logo-text">
        FOCUS<small>FITNESS STUDIO</small>
      </span>
    </a>
  );
}
