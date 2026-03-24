'use client';

import { motion } from 'framer-motion';
import { Globe, Smartphone, PenTool, Search, ShieldCheck, Cloud } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Custom responsive websites built with modern technologies for businesses and individuals.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps to bring your ideas to life on any device.',
  },
  {
    icon: PenTool,
    title: 'Brand & Logo Design',
    description: 'Professional visual identities including logos, brand guides, and marketing materials.',
  },
  {
    icon: Search,
    title: 'SEO & Digital Marketing',
    description: 'Drive traffic and grow your online presence with strategic SEO and marketing campaigns.',
  },
  {
    icon: ShieldCheck,
    title: 'IT Consulting',
    description: 'Expert guidance on technology decisions, infrastructure, and digital transformation.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Hosting',
    description: 'Reliable hosting, deployment, and cloud infrastructure management for your projects.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 rounded-full px-4 py-1 mb-4">
            What We Offer
          </span>
          <h2 className="section-heading">
            Digital <span className="text-primary">Services</span>
          </h2>
          <p className="section-subheading mt-4">
            Beyond education, we provide professional digital services to help businesses
            and individuals thrive in the digital economy.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              whileHover={{ y: -6, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.15)' }}
              className="bg-card rounded-lg border border-border p-6 cursor-pointer transition-all group"
            >
              <div className="p-3 rounded-xl bg-muted text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
