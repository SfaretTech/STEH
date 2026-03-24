'use client';

import { motion } from "framer-motion";
import { Lightbulb, Target, TrendingUp, Heart } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Hands-On Learning",
    description: "No boring lectures. Build real projects from day one with mentorship at every step.",
  },
  {
    icon: Target,
    title: "Career-Focused",
    description: "Every course is designed to give you skills employers actually want, with portfolio projects.",
  },
  {
    icon: TrendingUp,
    title: "Earn While Learning",
    description: "Start freelancing and earning income even before completing your program.",
  },
  {
    icon: Heart,
    title: "Community & Support",
    description: "Join a network of learners, mentors, and industry professionals who lift each other up.",
  },
];

const WhyJoinSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 rounded-full px-4 py-1 mb-4">
            Why Us
          </span>
          <h2 className="section-heading">
            Why Join <span className="text-primary">STEH</span>?
          </h2>
          <p className="section-subheading mt-4">
            We don't just teach — we transform careers. Here's what makes us different.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="bg-card rounded-lg border border-border p-6 text-center shadow-sm"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4"
              >
                <reason.icon className="h-7 w-7" />
              </motion.div>
              <h3 className="font-display font-bold text-card-foreground mb-2 text-lg">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
