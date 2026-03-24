'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import placeholderImages from '@/app/lib/placeholder-images.json';

const floatingCards = [
  { label: "Web Dev", delay: 0.8 },
  { label: "UI/UX", delay: 1.1 },
  { label: "IoT", delay: 1.4 },
];

const Hero = () => {
  const { heroImage } = placeholderImages;

  return (
    <section id="hero" className="relative min-h-[650px] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImage.src} 
          alt={heroImage.alt} 
          fill
          priority
          className="object-cover" 
          data-ai-hint={heroImage.aiHint}
        />
        <div className="absolute inset-0 bg-secondary/80" />
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-secondary-foreground/80 font-medium">Now Enrolling — 2026 Cohort</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground leading-tight mb-6">
              Unlock Your Future with{" "}
              <span className="text-primary">In-Demand</span> Tech Skills
            </h1>
            <p className="text-lg text-secondary-foreground/70 mb-8 max-w-lg">
              STEH provides hands-on training, mentorship, and support to empower you
              with practical digital skills and turn your passion into a profession.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild>
                  <Link href="/courses">Explore Courses</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/40 text-primary hover:bg-primary/10 bg-background/50 backdrop-blur-sm"
                  onClick={() => {
                    const advisorEl = document.querySelector('#advisor');
                    if (advisorEl) advisorEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get AI Advice <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating skill cards */}
          <div className="hidden md:block relative h-80">
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay, duration: 0.5 }}
                className="absolute"
                style={{ right: i * 30, top: 40 + i * 80 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="bg-card/10 backdrop-blur-md border border-secondary-foreground/20 rounded-lg px-5 py-3 shadow-lg"
                >
                  <span className="text-secondary-foreground font-display font-semibold text-sm">{card.label}</span>
                </motion.div>
              </motion.div>
            ))}

            {/* Glowing orb */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;