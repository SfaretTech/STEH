'use client';

import { motion } from 'framer-motion';
import { Zap, Globe, Award } from 'lucide-react';

const partners = ['GitHub', 'Google', 'HP', 'Netlify'];

const goals = [
  {
    icon: Zap,
    text: "Access to student packs, cloud credits, and professional software to accelerate learning.",
  },
  {
    icon: Globe,
    text: "Project testing and CI/CD tools to build and showcase a professional portfolio to the world.",
  },
  {
    icon: Award,
    text: "Official certifications, mentorship from industry experts, and connections to career opportunities.",
  },
];

const Partners = () => {
  return (
    <section id="partners" className="py-20 bg-muted">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4">Partnership Goals</h2>
            <p className="text-foreground/80 mb-8">
              We aim to collaborate with global tech companies to enhance our
              learners&apos; experience, providing them with access to premium
              ecosystems, tools, resources, and career pathways.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {partners.map((p) => (
                <div
                  key={p}
                  className="bg-card border border-border rounded-md px-4 py-3 text-center font-display font-semibold text-card-foreground text-sm"
                >
                  {p}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {goals.map((goal, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <goal.icon className="h-5 w-5" />
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">{goal.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
