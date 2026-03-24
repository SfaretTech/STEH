'use client';

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Animated shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-60 h-60 border border-primary-foreground/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-16 -left-16 w-48 h-48 border border-primary-foreground/10 rounded-full"
      />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex mb-6"
          >
            <Sparkles className="h-10 w-10 text-primary-foreground/80" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-primary-foreground mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Join hundreds of learners already building their futures with STEH. Your first step starts here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/courses">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-background text-primary border-background hover:bg-background/90 transition-colors"
                onClick={() => {
                  const advisorEl = document.querySelector('#advisor');
                  if (advisorEl) advisorEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Talk to Advisor
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;