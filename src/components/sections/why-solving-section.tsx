'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const problems = [
  {
    title: 'Bridging the Skills Gap',
    description: 'Many talented individuals are shut out from tech because they lack access to quality, affordable education and mentorship.',
    highlight: false,
  },
  {
    title: 'Bridging Education and Employment',
    description: "Traditional education doesn't always prepare students for the demands of the tech industry.",
    highlight: false,
  },
  {
    title: 'Empowering African Talent',
    description: 'Africa has unlimited potential, but young innovators need the right tools, training, and community to compete globally.',
    highlight: true,
  },
  {
    title: 'No More Dead Ends',
    description: "Online courses alone aren't enough. Real learning requires hands-on projects, mentorship, and career support.",
    highlight: false,
  },
];

const WhySolvingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold font-display text-foreground mb-12"
        >
          Why we are <span className="text-primary">solving</span> this problem:
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`p-6 rounded-xl border transition-shadow duration-300 ${
                problem.highlight
                  ? 'bg-primary/10 border-primary/30 shadow-md'
                  : 'bg-card border-border hover:shadow-md'
              }`}
            >
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground text-sm mt-8 italic"
        >
          Dive deeper to see how we do it ↓
        </motion.p>
      </div>
    </section>
  );
};

export default WhySolvingSection;
