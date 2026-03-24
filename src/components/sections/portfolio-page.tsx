'use client';

import { motion } from 'framer-motion';
import { Layout, Code, Palette, Cpu, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const PortfolioPageContent = () => {
  const categories = [
    {
      icon: Code,
      title: 'Web Applications',
      desc: 'Full-stack and frontend projects built by our top students using React, Next.js, and Node.js.',
    },
    {
      icon: Palette,
      title: 'Visual Identity',
      desc: 'Branding projects, logo designs, and UI/UX case studies from our Creative Arts track.',
    },
    {
      icon: Cpu,
      title: 'IoT Prototypes',
      desc: 'Smart home solutions and industrial automation prototypes built with Arduino and ESP32.',
    },
  ];

  return (
    <div className="flex flex-col gap-24 pb-20 pt-16">
      {/* Portfolio Hero */}
      <section className="relative bg-secondary py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt="Portfolio background"
            fill
            className="object-cover opacity-15"
            data-ai-hint="digital portfolio"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block text-sm font-semibold text-primary bg-primary/10 rounded-full px-4 py-1 mb-4">
              Student Showcases
            </span>
            <h1 className="text-4xl font-bold font-headline tracking-tight text-secondary-foreground sm:text-6xl mb-6">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-secondary-foreground/80 leading-relaxed">
              Explore the innovative projects and practical solutions developed by the STEH community. 
              Real skills, real projects, real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories / Coming Soon Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-headline text-primary">What We&apos;re Building</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our students work on industry-standard projects that solve real-world problems. 
            Detailed case studies and project links are coming soon.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-none shadow-md bg-muted/50 card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Placeholder */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                alt="Students working on projects"
                fill
                className="object-cover"
                data-ai-hint="developer team"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-headline text-primary mb-6">Gallery Coming Soon</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We are currently curating the best works from our latest cohort. 
                Soon, you will be able to browse through:
              </p>
              <ul className="space-y-4">
                {[
                  'Live student web deployments',
                  'Brand identity design packages',
                  'IoT dashboard demonstrations',
                  'Enterprise automation case studies'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPageContent;
