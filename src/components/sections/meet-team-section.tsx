
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import placeholderImages from '@/app/lib/placeholder-images.json';

const teamMembers = [
  { name: 'Fatima Bello', role: 'Head of Programs', image: placeholderImages.teamMember2 },
  { name: 'Dike Paul', role: 'Founder & Lead Instructor', image: placeholderImages.teamMember1 },
  { name: 'Chidi Nwosu', role: 'Senior Developer', image: placeholderImages.teamMember3 },
];

const MeetTeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold font-display text-foreground text-center mb-12"
        >
          Meet the <span className="text-primary">Team</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="text-center group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={member.image.aiHint}
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
              <h3 className="font-display font-bold text-foreground">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTeamSection;
