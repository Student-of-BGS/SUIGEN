import { motion } from "motion/react";
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div
              className="px-6 py-2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0, 191, 255, 0.2), rgba(57, 255, 20, 0.2))",
                border: "1px solid rgba(0, 191, 255, 0.3)",
              }}
            >
              <span style={{ color: "#00BFFF" }}>
                AI-Powered Investigation Tool
              </span>
            </div>
          </motion.div>

          <h1
            className="mb-6 tracking-tight"
            style={{
              fontSize: "4.5rem",
              fontWeight: 800,
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg, #f5f5f7 0%, #00BFFF 50%, #39FF14 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SUIGEN
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
            style={{
              fontSize: "1.75rem",
              color: "#00BFFF",
              fontWeight: 600,
              textShadow: "0 0 20px rgba(0, 191, 255, 0.3)",
            }}
          >
            Describe. Generate. Detect.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", color: "#a0a0ab" }}
          >
            SUIGEN is an advanced AI-powered system designed to
transform textual suspect descriptions into accurate
visual representations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => onNavigate("generate")}
              className="group relative overflow-hidden rounded-2xl px-8 py-6"
              style={{
                background:
                  "linear-gradient(135deg, #00BFFF 0%, #0099CC 100%)",
                fontSize: "1.125rem",
                fontWeight: 600,
                border: "none",
              }}
            >
              <motion.span
                className="relative z-10 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity glow-blue"
                style={{
                  background:
                    "linear-gradient(135deg, #0099CC 0%, #00BFFF 100%)",
                }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #00BFFF 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #39FF14 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >
          {[
            {
              icon: Sparkles,
              title: "AI-Powered Generation",
              description:
                "Advanced Stable Diffusion models create realistic facial reconstructions from text descriptions.",
              color: "#00BFFF",
            },
            {
              icon: Zap,
              title: "Instant Results",
              description:
                "Generate suspect images in seconds. Fast, accurate, and ready for investigative use.",
              color: "#39FF14",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description:
                "All data processed securely. Designed for law enforcement and investigative professionals.",
              color: "#00BFFF",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 group cursor-pointer"
              style={{
                background: "rgba(26, 26, 36, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-block p-4 rounded-2xl"
                style={{
                  background: `rgba(${
                    feature.color === "#00BFFF" ? "0, 191, 255" : "57, 255, 20"
                  }, 0.1)`,
                  border: `1px solid ${feature.color}30`,
                }}
              >
                <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
              </motion.div>
              <h3
                className="mb-3"
                style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f5f5f7" }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "#a0a0ab", lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-32 relative"
        >
          <div className="glass-card p-12 text-center overflow-hidden">
            <h2
              className="mb-4"
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#f5f5f7",
              }}
            >
              How It Works
            </h2>
            <p className="max-w-3xl mx-auto mb-12" style={{ color: "#a0a0ab" }}>
              SUIGEN uses state-of-the-art AI to transform textual descriptions
              into photorealistic facial images, providing investigators with a
              powerful tool for suspect identification.
            </p>

            {/* Abstract Neural Lines */}
            <svg
              className="w-full h-64 opacity-30"
              viewBox="0 0 800 200"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#00BFFF", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#39FF14", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <motion.path
                d="M 0 100 Q 200 50 400 100 T 800 100"
                stroke="url(#grad1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M 0 120 Q 200 170 400 120 T 800 120"
                stroke="url(#grad1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
