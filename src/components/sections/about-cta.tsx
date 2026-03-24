'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

/**
 * @fileOverview A call-to-action section specifically for the About page.
 * Encourages user contact and points towards the FAQ.
 */

const AboutCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 bg-primary" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-primary-foreground mb-2">
              We'd love to<br />hear from you!
            </h2>
            <p className="text-primary-foreground/80 text-sm max-w-md">
              Got questions, ideas, or just want to say hello? Don't hesitate, reach out to us anytime.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/register">Get Started →</Link>
            </Button>
            <div className="flex gap-3">
              <a 
                href="mailto:info@sfarettech.com.ng" 
                className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                aria-label="Email us"
              >
                <Mail size={18} className="text-primary-foreground" />
              </a>
              <a 
                href="https://twitter.com/SfaretTech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={18} className="text-primary-foreground" />
              </a>
              <a 
                href="https://www.instagram.com/sfaret_tech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} className="text-primary-foreground" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-primary-foreground/60 text-sm mt-6"
        >
          ...or read some questions we get a lot ↓
        </motion.p>
      </div>
    </section>
  );
};

export default AboutCTASection;
