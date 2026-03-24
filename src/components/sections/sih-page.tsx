'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Zap, 
  Target, 
  Microscope,
  Code2,
  Trophy,
  ArrowRight,
  Sparkles,
  Search,
  Layers,
  PieChart,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const SIHPageContent = () => {
  const coreUnits = [
    {
      id: 'A',
      title: 'Idea Intake & Screening',
      icon: Search,
      description: 'We announce public calls for tech innovators and screen applications based on problem clarity, market size, and technical possibility.',
      details: ['Public calls for innovators', 'Idea screening & interviews', 'Feasibility evaluation']
    },
    {
      id: 'B',
      title: 'Validation & Structuring',
      icon: Layers,
      description: 'We convert vague ideas into structured business frameworks using Lean Canvas, GTM plans, and professional concept notes.',
      details: ['Revenue & Business modeling', 'Competitor analysis', 'Value proposition design']
    },
    {
      id: 'C',
      title: 'Venture Formation',
      icon: Code2,
      description: 'The real studio work. We help with CAC registration, equity split, MVP roadmaps, and assembing technical teams.',
      details: ['Legal & Equity structuring', 'MVP Development', 'Team Assembly']
    },
    {
      id: 'D',
      title: 'Funding & Capital Alignment',
      icon: TrendingUp,
      description: 'We prepare founders for investor pitches, valuations, and term sheets, aligning them with local VCs and global accelerators like YC.',
      details: ['Pitch training', 'Financial projections', 'VC & Angel networking']
    },
    {
      id: 'E',
      title: 'Growth & Strategic Advisory',
      icon: Network,
      description: 'We remain board-level mentors and strategic advisors, staying involved until profitability to ensure aligned incentives.',
      details: ['Post-launch advisory', 'Board-level mentorship', 'Network connection']
    }
  ];

  const cohortPhases = [
    { name: 'Validation', period: 'Month 1', color: 'bg-blue-500' },
    { name: 'Structuring & MVP', period: 'Month 2-3', color: 'bg-primary' },
    { name: 'Capital Readiness', period: 'Month 4-5', color: 'bg-purple-500' },
    { name: 'Demo Day', period: 'Month 6', color: 'bg-accent' },
  ];

  const specializations = [
    { icon: Sparkles, name: 'AI & Automation' },
    { icon: Trophy, name: 'EduTech' },
    { icon: PieChart, name: 'FinTech' },
    { icon: Target, name: 'AgricTech' },
    { icon: Microscope, name: 'Healthcare Tech' }
  ];

  return (
    <div className="flex flex-col gap-24 pb-20 pt-16">
      {/* SIH Hero - Updated to Light Theme */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
            alt="Innovation Hub Lab"
            fill
            className="object-cover opacity-10"
            data-ai-hint="innovation laboratory"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="text-primary border-primary/40 mb-8 uppercase tracking-[0.4em] font-bold">
                Sfaret Innovation Hub
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-foreground mb-8">
                Turning Ideas into <span className="text-primary italic">Venture Capital</span>.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl font-light">
                SIH is a high-performance venture studio. We source raw ideas, validate them, and guide them through team building and capital alignment to create investment-ready companies.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button size="lg" className="h-16 px-10 rounded-2xl font-bold bg-primary text-primary-foreground text-lg hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all" asChild>
                  <Link href="/sih/apply">Apply for Incubation</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl font-bold text-foreground border-border hover:bg-secondary text-lg" onClick={() => {
                  document.getElementById('venture-model')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Venture Studio Model */}
      <section id="venture-model" className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mb-20">
          <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">The Process</span>
          <h2 className="text-4xl md:text-6xl font-bold font-display text-foreground leading-tight">Our 5 Core <span className="text-primary italic">Units</span></h2>
          <p className="text-lg text-muted-foreground mt-6 font-medium">
            We operate as a co-founder for your idea. From the first interview to formal incorporation and global funding alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {coreUnits.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col md:flex-row gap-8 items-start bg-secondary/50 p-8 md:p-12 rounded-[3rem] border border-border/40 hover:border-primary/40 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0 shadow-xl shadow-primary/20">
                {unit.id}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <unit.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl md:text-3xl font-bold font-display">{unit.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg mb-8 max-w-3xl leading-relaxed">
                  {unit.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {unit.details.map((detail, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-background text-foreground/70 border-border/50 px-4 py-1">
                      {detail}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Operational & Business Model - Updated to Light Theme */}
      <section className="bg-secondary py-32 text-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Execution Strategy</span>
                <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight">Cohorts & <span className="text-primary">Incentives</span></h2>
              </div>
              
              <div className="space-y-10">
                <div className="bg-background border border-border p-8 rounded-[2rem] space-y-6 shadow-sm">
                  <h4 className="text-2xl font-bold flex items-center gap-3">
                    <PieChart className="text-primary" /> Performance-Based Model
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe in skin in the game. Our model is simple: <span className="text-foreground font-bold">No upfront fees</span>. We take 5–10% equity upon formal incorporation, ensuring our incentives are 100% aligned with your success.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-2xl font-bold flex items-center gap-3">
                    <Zap className="text-primary" /> 6-Month Program Cycles
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {cohortPhases.map((phase) => (
                      <div key={phase.name} className="bg-background border border-border p-4 rounded-xl shadow-sm">
                        <div className={`w-2 h-2 rounded-full ${phase.color} mb-3`} />
                        <p className="font-bold text-sm uppercase tracking-wider">{phase.name}</p>
                        <p className="text-muted-foreground text-xs">{phase.period}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs italic">2 cohorts per year | 20–30 startups per cohort</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-background p-10 md:p-16 rounded-[4rem] border border-border shadow-xl backdrop-blur-md">
                <h3 className="text-3xl font-bold font-display mb-8">Strategic Specialization</h3>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  To avoid being generic, we focus our venture building expertise on sectors where we can provide the most leverage:
                </p>
                <div className="space-y-6">
                  {specializations.map((spec, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <spec.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xl font-medium text-foreground">{spec.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-primary rounded-[4rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="relative z-10 max-w-4xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-primary-foreground leading-tight">From Raw Idea to <span className="text-secondary-foreground italic">Investment</span>.</h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 font-light leading-relaxed">
              We don't just incubate; we build ventures. We are looking for founders with daring ideas and the grit to execute.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Button size="lg" className="h-16 px-12 rounded-2xl font-bold bg-background text-primary hover:bg-secondary text-lg shadow-xl border-none" asChild>
                <Link href="/sih/apply">Start Your Journey <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl font-bold border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-lg">
                Partner as VC/Angel
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SIHPageContent;
