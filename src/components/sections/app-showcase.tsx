'use client';

import { motion } from 'framer-motion';
import { Smartphone, Monitor, Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AppShowcase = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="apps">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 transition-colors uppercase tracking-widest text-xs px-3 py-1">
              Available Now
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display text-foreground mb-6 leading-tight">
              Take STEH Anywhere with Our <span className="text-primary">Native Apps</span>
            </h2>
            <p className="text-lg text-secondary-foreground/70 mb-8 max-w-xl">
              Experience seamless learning on the go or right from your desktop. Our specialized mobile and Windows applications bring the ultimate STEH LMS dashboard to your fingertips with a unified, premium experience.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg mb-1">Mobile App</h4>
                  <p className="text-secondary-foreground/60 text-sm">
                    Access your courses, track your learning streak, and connect with peers anytime, anywhere on iOS and Android.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg mb-1">Windows App</h4>
                  <p className="text-secondary-foreground/60 text-sm">
                    A dedicated desktop environment for distraction-free coding, lab exercises, and immersive study sessions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-14 px-8">
                <Download className="h-5 w-5" /> Download for Windows
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-14 px-6 border-secondary-foreground/20 hover:bg-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5 fill-current">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg> App Store
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-14 px-6 border-secondary-foreground/20 hover:bg-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 fill-current">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg> Google Play
              </Button>
            </div>
          </motion.div>

          {/* Images Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[650px] w-full mt-10 lg:mt-0 flex items-center justify-center"
          >
            {/* Background glow for images */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 blur-3xl -z-10 rounded-full" />

            {/* Desktop App Mockup - placed in background */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-10 md:left-20 top-20 w-[90%] md:w-[85%] rounded-xl overflow-hidden shadow-2xl border border-secondary"
            >
              <div className="relative aspect-[16/10] bg-secondary/50 flex">
                <Image
                  src="/Web App.png"
                  alt="STEH LMS Windows App Dashboard"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </motion.div>

            {/* Mobile App Mockup - placed in foreground overlapping desktop */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 md:right-10 bottom-10 w-[45%] md:w-[35%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-secondary/50"
            >
              <div className="relative aspect-[1/2] bg-background">
                <Image
                  src="/mobile App.png"
                  alt="STEH LMS Mobile App Dashboard"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
