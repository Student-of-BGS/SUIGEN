import { motion } from "motion/react";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function ContactPage() {
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
                "linear-gradient(135deg, #f5f5f7 0%, #00BFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Us
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: "#a0a0ab", fontSize: "1.125rem" }}
          >
            Have questions or need support? We're here to help investigative
            professionals get the most out of SUIGEN.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card p-8"
            style={{
              background: "rgba(26, 26, 36, 0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h2
              className="mb-6"
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#00BFFF",
              }}
            >
              Send us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className="rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <div>
                <Label htmlFor="subject" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  className="rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <div>
                <Label htmlFor="message" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  className="rounded-xl min-h-[150px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl py-6 group relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #00BFFF 0%, #0099CC 100%)",
                  border: "none",
                }}
              >
                <motion.span
                  className="relative z-10 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <MessageSquare className="w-5 h-5" />
                  Send Message
                </motion.span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity glow-blue"
                  style={{
                    background:
                      "linear-gradient(135deg, #0099CC 0%, #00BFFF 100%)",
                  }}
                />
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            {[
              {
                icon: Mail,
                title: "Email",
                content: "support@suigen.ai",
                color: "#00BFFF",
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+1 (555) 123-4567",
                color: "#39FF14",
              },
              {
                icon: MapPin,
                title: "Address",
                content: "123 Innovation Drive, Tech City, TC 12345",
                color: "#00BFFF",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 flex items-start gap-4"
                style={{
                  background: "rgba(26, 26, 36, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${item.color}20`,
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 rounded-xl"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </motion.div>
                <div>
                  <h3
                    className="mb-1"
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#f5f5f7",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "#a0a0ab" }}>{item.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card p-8"
              style={{
                background: "rgba(26, 26, 36, 0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3
                className="mb-4"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#39FF14",
                }}
              >
                Support Hours
              </h3>
              <p style={{ color: "#a0a0ab", lineHeight: 1.8 }}>
                Monday - Friday: 9:00 AM - 6:00 PM EST
                <br />
                Saturday - Sunday: Closed
                <br />
                <br />
                For urgent inquiries, please contact our emergency support line.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
