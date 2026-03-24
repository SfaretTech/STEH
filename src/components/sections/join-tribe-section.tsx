'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * @fileOverview A high-impact closing section for the About page.
 * Encourages final conversion to registration or partnership.
 */

const JoinTribeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 bg-secondary" ref={ref}>
      <div className="section-container text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold font-display text-primary mb-8"
        >
          Join the tribe.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/register">Start Learning Today</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/40 text-primary hover:bg-primary/10 bg-background/50" 
            asChild
          >
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary/40 text-primary hover:bg-primary/10 bg-background/50" 
            asChild
          >
            <Link href="/business">Partner with Us</Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-secondary-foreground/60 text-sm mt-6"
        >
          Apply for free. Join 500+ students already learning with STEH.
        </motion.p>
      </div>
    </section>
  );
};

export default JoinTribeSection;