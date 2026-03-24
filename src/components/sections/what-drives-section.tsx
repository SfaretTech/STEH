'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Target, Heart } from 'lucide-react';

const drives = [
  {
    icon: Eye,
    title: 'Vision',
    color: 'bg-primary',
    description:
      "To become Africa's leading tech education hub, a place where every young person, regardless of background, gains digital skills, builds a world-class portfolio, and competes globally.",
  },
  {
    icon: Target,
    title: 'Mission',
    color: 'bg-accent',
    description:
      'At STEH, we provide hands-on tech training, mentorship, and project-based learning. We help students master in-demand skills, build real-world projects, and transition from learners to industry-ready professionals.',
  },
  {
    icon: Heart,
    title: 'Core Values',
    color: 'bg-primary',
    items: ['Excellence', 'Innovation', 'Community', 'Accessibility', 'Integrity'],
  },
];

const WhatDrivesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-muted" ref={ref}>
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-muted-foreground text-sm mb-2"
        >
          Dive deeper as we share...
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold font-display text-foreground mb-12"
        >
          What Drives <span className="text-primary">Us?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {drives.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
            >
              <motion.div
                className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <item.icon className="text-primary-foreground" size={24} />
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">{item.title}</h3>
              {item.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              )}
              {item.items && (
                <ul className="space-y-2 mt-2">
                  {item.items.map((val) => (
                    <li key={val} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {val}
                    </li>
                  ))}
                </ul>
              )}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-muted-foreground text-sm mt-8 italic"
        >
          These beliefs drive the faces you see →
        </motion.p>
      </div>
    </section>
  );
};

export default WhatDrivesSection;
