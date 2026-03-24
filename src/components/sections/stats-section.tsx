'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, BookOpen, Award, Briefcase } from 'lucide-react';

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Students Trained' },
  { icon: BookOpen, value: 20, suffix: '+', label: 'Courses Available' },
  { icon: Award, value: 95, suffix: '%', label: 'Completion Rate' },
  { icon: Briefcase, value: 80, suffix: '%', label: 'Job Placement' },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-secondary relative overflow-hidden">
      {/* Subtle animated background */}
      <motion.div
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-3"
              >
                <stat.icon className="h-6 w-6" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-extrabold text-secondary-foreground font-display">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-secondary-foreground/60 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
