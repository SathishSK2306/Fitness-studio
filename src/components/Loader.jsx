import { motion } from "framer-motion";
import { EASE } from "./Reveal";

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE }}
      aria-hidden="true"
    >
      <motion.span
        className="loader-word"
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, letterSpacing: "0.08em" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        FOCUS
      </motion.span>
      <div className="loader-bar">
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: EASE }} />
      </div>
    </motion.div>
  );
}
