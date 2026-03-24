'use client';

import { motion } from 'framer-motion';
import { Gift, Share2, Copy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const steps = [
  {
    icon: Share2,
    title: 'Share Your Link',
    description: 'Get your unique referral link and share it with friends.',
  },
  {
    icon: Users,
    title: 'They Enroll',
    description: 'When your friend signs up and enrolls in any course.',
  },
  {
    icon: Gift,
    title: 'Earn Rewards',
    description: 'Both you and your friend get discounts and bonuses!',
  },
];

const ReferSection = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    const link = 'https://steh.edu.ng/refer/your-unique-code';
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast({
      title: 'Link Copied!',
      description: 'You can now share your referral link.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="refer-program" className="py-20 bg-secondary overflow-hidden relative">
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-accent bg-accent/10 rounded-full px-4 py-1 mb-4">
            Earn Rewards
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-secondary-foreground">
            Refer a Friend, <span className="text-primary">Get Rewarded</span>
          </h2>
          <p className="text-base md:text-lg text-secondary-foreground/60 max-w-2xl mx-auto mt-4">
            Know someone who wants to learn tech skills? Refer them and both of you earn amazing rewards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4"
              >
                <step.icon className="h-7 w-7" />
              </motion.div>
              <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Step {i + 1}</div>
              <h3 className="font-display font-bold text-secondary-foreground mb-2 text-lg">{step.title}</h3>
              <p className="text-sm text-secondary-foreground/60 leading-relaxed px-4">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl p-6 text-center backdrop-blur-sm"
        >
          <p className="text-sm text-secondary-foreground/70 mb-3 font-medium">Your referral link</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary rounded-md px-4 py-2.5 text-sm text-secondary-foreground/50 text-left truncate border border-secondary-foreground/10">
              steh.edu.ng/refer/your-unique-code
            </div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                onClick={handleCopy}
                variant={copied ? 'default' : 'outline'}
                className={
                  copied
                    ? 'bg-primary text-primary-foreground'
                    : 'border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10'
                }
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferSection;
