'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, 
  Presentation, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Briefcase, 
  GraduationCap,
  Building2,
  Handshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import BusinessInquiryForm from '@/components/business-inquiry-form';

const BusinessPageContent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const solutions = [
    {
      icon: Briefcase,
      title: 'Corporate Training',
      description: 'Customized upskilling programs for your team in Microsoft Suite, Web Tech, Graphics, and Digital Marketing.',
    },
    {
      icon: Users,
      title: 'Talent Hiring (Interns/SIWES)',
      description: 'Connect with our top-tier students for Internship and SIWES placements. We provide ready-to-work tech talent.',
    },
    {
      icon: ShieldCheck,
      title: 'Digital Consultancy',
      description: 'Expert strategic advice on technology infrastructure, digital transformation, and software adoption.',
    },
    {
      icon: Laptop,
      title: 'Custom Tech Solutions',
      description: 'Professional development of websites, enterprise applications, and brand identities for your organization.',
    },
  ];

  const highlights = [
    {
      title: "For Organizations",
      subtitle: "Professional Growth",
      icon: Building2,
      points: [
        'Staff technical skills evaluation & training',
        'Efficiency-focused workflow automation',
        'Post-training evaluation and support',
        'Digital infrastructure auditing'
      ]
    },
    {
      title: "For Institutions",
      subtitle: "Academic Integration",
      icon: GraduationCap,
      points: [
        'Seamless SIWES/Internship onboarding',
        'Mentorship-led practical experience',
        'Verified student performance reports',
        'Career-ready certification for graduates'
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-24 pb-20 pt-16">
      <BusinessInquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Business Hero */}
      <section className="relative bg-secondary py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Business office"
            fill
            className="object-cover opacity-10"
            data-ai-hint="modern office"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/5" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-semibold text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-6 border border-primary/20">
                Enterprise & Institutional Partnership
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-secondary-foreground mb-6">
                Bridging the Gap Between <span className="text-primary">Talent</span> and <span className="text-primary">Industry</span>
              </h1>
              <p className="text-xl text-secondary-foreground/70 leading-relaxed mb-10 max-w-2xl">
                STEH partners with businesses and educational institutions to deliver professional training, expert consultancy, and a pipeline of vetted tech talent.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90" onClick={() => setIsFormOpen(true)}>
                  Get a Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl font-bold border-primary/30 text-primary hover:bg-primary/5" asChild>
                  <Link href="/courses">View Curriculum</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-secondary-foreground">Our Enterprise Solutions</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-border/50 shadow-lg bg-card hover:border-primary/50 transition-all duration-300 card-hover group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="font-display text-xl leading-snug">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deep Dive Sections */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-xl relative overflow-hidden group"
              >
                <item.icon className="absolute -right-8 -bottom-8 w-40 h-40 text-primary/5 group-hover:text-primary/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs">{item.subtitle}</span>
                  <h3 className="text-3xl font-bold font-display mt-2 mb-8">{item.title}</h3>
                  <ul className="space-y-4">
                    {item.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="mt-10 p-0 h-auto text-primary font-bold text-lg group/link" onClick={() => setIsFormOpen(true)}>
                    Inquire Now <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/link:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultancy & Recruitment Callout */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary/5 rounded-[2.5rem] border border-primary/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-10 md:p-20">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <Handshake className="h-6 w-6" />
                <span className="font-bold uppercase tracking-widest text-sm">Strategic Partnership</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-8">Ready to Scale with STEH?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Whether you're looking to hire talented interns, upgrade your staff's digital capacity, or need professional tech consultancy, our team is ready to support your vision.
              </p>
              <Button size="lg" className="h-14 px-10 rounded-xl font-bold bg-primary text-white" onClick={() => setIsFormOpen(true)}>
                Schedule a Meeting
              </Button>
            </div>
            <div className="relative h-64 lg:h-full min-h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Business collaboration"
                fill
                className="object-cover"
                data-ai-hint="business meeting"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPageContent;
