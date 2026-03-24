'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/app/lib/placeholder-images.json';

const missions = [
  'Equip youth with in-demand tech skills',
  'Foster career development and entrepreneurship',
  'Offer training that leads to earning potential',
  'Build a supportive community for lifelong learning and innovation',
];

const AboutSection = () => {
  const { aboutImage } = placeholderImages;

  return (
    <section id="about" className="py-20 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 rounded-full px-4 py-1 mb-4">
            Who We Are
          </span>
          <h2 className="section-heading">
            About <span className="text-primary">SFARET TECH EDU HUB</span> (STEH)
          </h2>
          <p className="section-subheading mt-4">
            A technology-driven learning and support center focused on empowering
            young people with practical digital skills and career-ready expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-lg shadow-xl">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                width={aboutImage.width}
                height={aboutImage.height}
                className="w-full h-auto object-cover aspect-[4/3]"
                data-ai-hint={aboutImage.aiHint}
              />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-lg px-4 py-2 font-display font-bold text-sm shadow-lg"
            >
              Since 2024
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-muted-foreground mb-2 font-display">Our Mission</h3>
            <p className="text-foreground/80 mb-6">
              We provide teaching, hands-on training, mentorship, and ongoing
              support to help learners not only master key technologies but also turn
              their skills into real income and professional growth.
            </p>
            <ul className="space-y-3">
              {missions.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;