import { motion } from "motion/react";
import { Brain, Cpu, Zap, Shield, Users, Target } from "lucide-react";

export function AboutPage() {
  const technologies = [
    {
      icon: Brain,
      title: "Stable Diffusion",
      description:
        "State-of-the-art text-to-image AI model for photorealistic generation",
      color: "#00BFFF",
    },
    {
      icon: Cpu,
      title: "Neural Networks",
      description:
        "Deep learning architecture trained on millions of facial images",
      color: "#39FF14",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description:
        "Optimized inference pipeline for fast image generation",
      color: "#00BFFF",
    },
    {
      icon: Shield,
      title: "Secure Infrastructure",
      description:
        "Enterprise-grade security for sensitive investigative data",
      color: "#39FF14",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "For Investigators",
      description:
        "Built specifically for law enforcement and investigative professionals to aid in suspect identification.",
    },
    {
      icon: Target,
      title: "High Accuracy",
      description:
        "Advanced AI models ensure realistic and accurate facial reconstructions based on witness descriptions.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1
            className="mb-6"
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #f5f5f7 0%, #39FF14 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About SUIGEN
          </h1>
          <p
            className="max-w-3xl mx-auto"
            style={{ color: "#a0a0ab", fontSize: "1.125rem", lineHeight: 1.8 }}
          >
            SUIGEN is an AI-powered suspect image generation platform designed
            for investigative intelligence. Using cutting-edge Stable Diffusion
            technology, we transform textual descriptions of suspects into
            photorealistic facial reconstructions, providing law enforcement and
            investigators with a powerful tool for identification and case
            resolution.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-12 mb-16"
          style={{
            background: "rgba(26, 26, 36, 0.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="text-center">
            <h2
              className="mb-6"
              style={{
                fontSize: "2rem",
                fontWeight: 600,
                color: "#00BFFF",
              }}
            >
              Our Mission
            </h2>
            <p
              className="max-w-4xl mx-auto"
              style={{
                color: "#f5f5f7",
                fontSize: "1.125rem",
                lineHeight: 1.8,
              }}
            >
              To empower investigative professionals with advanced AI technology
              that bridges the gap between witness testimony and visual
              identification. We believe in leveraging artificial intelligence
              responsibly to enhance public safety and support the pursuit of
              justice.
            </p>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="mb-10 text-center"
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#f5f5f7",
            }}
          >
            Technologies We Use
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-8"
                style={{
                  background: "rgba(26, 26, 36, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${tech.color}20`,
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block p-4 rounded-2xl mb-4"
                  style={{
                    background: `${tech.color}15`,
                    border: `1px solid ${tech.color}30`,
                  }}
                >
                  <tech.icon className="w-8 h-8" style={{ color: tech.color }} />
                </motion.div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: tech.color,
                  }}
                >
                  {tech.title}
                </h3>
                <p style={{ color: "#a0a0ab", lineHeight: 1.6 }}>
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="mb-10 text-center"
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#f5f5f7",
            }}
          >
            Built for Professionals
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-10 text-center"
                style={{
                  background: "rgba(26, 26, 36, 0.6)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 191, 255, 0.2), rgba(57, 255, 20, 0.2))",
                    border: "2px solid rgba(0, 191, 255, 0.4)",
                  }}
                >
                  <feature.icon
                    className="w-10 h-10"
                    style={{ color: "#00BFFF" }}
                  />
                </motion.div>
                <h3
                  className="mb-4"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#f5f5f7",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "#a0a0ab",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="glass-card p-12"
          style={{
            background: "rgba(26, 26, 36, 0.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2
            className="mb-10 text-center"
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#f5f5f7",
            }}
          >
            How SUIGEN Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Input Description",
                description:
                  "Investigators provide detailed textual descriptions of the suspect's facial features and characteristics.",
              },
              {
                step: "02",
                title: "AI Processing",
                description:
                  "Our Stable Diffusion model processes the input and generates a photorealistic facial reconstruction.",
              },
              {
                step: "03",
                title: "Review & Export",
                description:
                  "The generated image can be reviewed, refined, and exported for investigative use.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="text-center"
              >
                <div
                  className="inline-block mb-6 px-6 py-3 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 191, 255, 0.2), rgba(57, 255, 20, 0.2))",
                    border: "1px solid rgba(0, 191, 255, 0.3)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#00BFFF",
                      textShadow: "0 0 10px rgba(0, 191, 255, 0.5)",
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#f5f5f7",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "#a0a0ab", lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 p-6 rounded-2xl text-center"
          style={{
            background: "rgba(0, 191, 255, 0.05)",
            border: "1px solid rgba(0, 191, 255, 0.2)",
          }}
        >
          <p style={{ color: "#a0a0ab", fontSize: "0.875rem" }}>
            <strong style={{ color: "#00BFFF" }}>Disclaimer:</strong> SUIGEN is
            designed as an investigative tool and should be used in conjunction
            with other identification methods. Generated images are AI-created
            reconstructions and may not exactly match the actual suspect.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
