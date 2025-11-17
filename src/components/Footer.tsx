import { motion } from "motion/react";

export function Footer() {
  return (
    <footer
      className="mt-20 py-8"
      style={{
        background: "rgba(10, 10, 15, 0.95)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p style={{ color: "#a0a0ab" }}>
            © 2025 SUIGEN | All Rights Reserved
          </p>
          <div className="flex gap-6">
            <motion.a
              whileHover={{ y: -2, color: "#00BFFF" }}
              href="#"
              style={{ color: "#a0a0ab" }}
              className="transition-colors"
            >
              Privacy
            </motion.a>
            <motion.a
              whileHover={{ y: -2, color: "#00BFFF" }}
              href="#"
              style={{ color: "#a0a0ab" }}
              className="transition-colors"
            >
              Terms
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
