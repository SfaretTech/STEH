'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  { q: "What is STEH? How can it help?", a: "STEH (Sfaret Tech Edu Hub) is a tech education platform that provides hands-on training in web development, graphics design, IoT, and digital skills. We help you gain practical skills to launch your tech career." },
  { q: "Who is STEH for?", a: "STEH is for anyone — students, graduates, career changers, and self-learners who want to build in-demand tech skills, regardless of their background or experience level." },
  { q: "How does STEH help build my career?", a: "Through project-based learning, mentorship, portfolio building, and career support. We don't just teach — we prepare you for real-world jobs and freelance opportunities." },
  { q: "Is the platform free?", a: "We offer both free introductory courses and premium programs. Our goal is to keep education accessible while providing high-quality mentorship and resources." },
  { q: "Do I need to be a tech expert to join?", a: "Not at all! Our courses range from beginner to advanced. Whether you're starting from scratch or leveling up, we have a path for you." },
  { q: "What kind of projects will I work on?", a: "Real-world projects — from building websites and apps to designing brand identities and IoT prototypes. Every course includes portfolio-ready project work." },
  { q: "Can STEH help me land a tech job?", a: "Yes! We offer career guidance, portfolio reviews, and connect top students with internship and job opportunities through our partner network." },
  { q: "Can I use my portfolio from STEH for job applications?", a: "Absolutely. All projects you build during the program are yours to showcase in your portfolio, GitHub, and job applications." },
  { q: "How do I sign up?", a: "Click the 'STEH Registration Now' button in the navigation or visit our registration page to get started in minutes." },
  { q: "Does STEH offer tech courses?", a: "Yes — we offer courses in Web Technologies, Graphics Design, IoT, Microsoft Packages, and more. New courses are added regularly." },
  { q: "Can I bring my friends or team to STEH?", a: "Definitely! We have a referral program and group enrollment options. Learn together and grow together." },
  { q: "Can I suggest new features or courses?", a: "We love feedback! Reach out to us via our contact page or social media — your suggestions help us improve and grow." },
  { q: "What is SIH?", a: "SIH (Sfaret Innovation Hub) is our venture studio where ideas are turned into real products and scalable companies through incubation, mentorship, and technical support." },
  { q: "How does the SIH Venture Studio model work?", a: "We act as a co-founder, providing validation, structuring, venture formation, and capital alignment. We run 6-month cohorts to prepare startups for investment." },
  { q: "Who can apply for incubation at SIH?", a: "We look for founders with daring tech-driven ideas, whether you are a STEH graduate or an external innovator with a scalable solution." },
  { q: "Does SIH provide direct funding?", a: "We don't promise direct funding; instead, we prepare your venture to qualify for investment and connect you with our network of local VCs, angel investors, and global accelerators." },
  { q: "What is the equity requirement for joining SIH?", a: "We operate on a performance-based model. We typically take 5-10% equity upon formal incorporation, aligning our success directly with yours." },
];

const AboutFAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="section-container max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold font-display text-foreground text-center mb-12"
        >
          Frequently Asked <span className="text-primary">Questions</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/50"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFAQSection;