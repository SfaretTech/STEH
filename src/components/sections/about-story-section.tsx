'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import placeholderImages from '@/app/lib/placeholder-images.json';

const AboutStorySection = () => {
  const { aboutImage } = placeholderImages;

  return (
    <section className="pt-24 pb-16 bg-secondary overflow-hidden">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold font-headline text-secondary-foreground mb-4">
              Our <span className="text-primary">Story</span>
            </h1>
            <p className="text-secondary-foreground/70 leading-relaxed mb-4 text-lg">
              STEH (Sfaret Tech Edu Hub) was born out of a deep passion for bridging the digital skills gap among young Africans. We noticed that many talented individuals lacked access to quality, affordable tech education, so we built a platform to change that.
            </p>
            <p className="text-secondary-foreground/70 leading-relaxed mb-4 text-lg">
              At STEH, we believe every young person deserves the opportunity to learn in-demand tech skills, build real-world projects, and connect with a global community of innovators.
            </p>
            <p className="text-secondary-foreground/70 leading-relaxed text-lg">
              From web development to IoT, graphics design to Microsoft packages, we provide hands-on, practical training that turns beginners into professionals ready for the digital economy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.aiHint}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg max-w-[220px]"
            >
              <p className="text-sm font-medium italic">
                "Our mission is to empower youth with the tech skills to build their future."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStorySection;
