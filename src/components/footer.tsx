'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Careers', href: '#' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '#' },
    ],
    programs: [
      { label: 'Tech Edu Hub', href: '/courses' },
      { label: 'Innovation Hub (SIH)', href: '/sih' },
      { label: 'Business Solutions', href: '/business' },
    ],
    resources: [
      { label: 'Student Handbook', href: '#' },
      { label: 'FAQs', href: '/about' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Contact Support', href: '/#contact' },
      { label: 'Login', href: '/login' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  };

  const socials = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/SfaretTech', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/sfaret_tech/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/SfaretTechnologies', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground relative">
      {/* Back to top */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Newsletter Banner */}
      <div className="bg-primary/5 border-b border-secondary-foreground/5">
        <div className="section-container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-xl">Stay in the Loop</h3>
              <p className="text-secondary-foreground/60 text-sm mt-1">
                Subscribe to get the latest updates, courses, and tech insights.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-secondary/50 border-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/40 min-w-[260px]"
              />
              <Button className="shrink-0 gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="section-container py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-base">S</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">STEH</span>
            </div>
            <p className="text-sm text-secondary-foreground/60 leading-relaxed max-w-xs mb-6">
              Empowering the next generation of African tech
            </p>
            <div className="space-y-3 text-sm text-secondary-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <span>620 Ikwerre Road, Port Harcourt, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+2347049515934" className="hover:text-primary transition-colors">+234 704 951 5934</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@sfarettech.com.ng" className="hover:text-primary transition-colors">info@sfarettech.com.ng</a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/80">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/55 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/80">Programs</h4>
            <ul className="space-y-2.5">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/55 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/80">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/55 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/80">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/55 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-secondary-foreground/10" />

      {/* Bottom Bar */}
      <div className="section-container py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/50">
            © {year} STEH. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-secondary-foreground/5 flex items-center justify-center text-secondary-foreground/40 hover:text-primary hover:bg-primary/10 transition-all hover:-translate-y-1"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;