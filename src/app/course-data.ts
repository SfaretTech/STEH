import type { LucideIcon } from 'lucide-react';
import { Code, Palette, Cpu, Presentation, ShieldCheck, Megaphone } from 'lucide-react';

export type Grade = {
  level: string;
  name: string;
  price: string;
  duration: string;
};

export type Course = {
  title: string;
  description: string;
  details: string[];
  grades: Grade[];
  image: string;
  aiHint: string;
};

export type CourseCategory = {
  name: string;
  icon: LucideIcon;
  courses: Course[];
};

export const courseData: CourseCategory[] = [
  {
    name: 'Web Technologies',
    icon: Code,
    courses: [
      {
        title: 'Web Development',
        description: 'Build modern, responsive websites and applications from the ground up.',
        details: [
          'HTML, CSS, JavaScript, TypeScript',
          'Frontend Development',
          'Backend Development',
          'Fullstack Developer',
          'PHP, Python, Drupal',
          'No code Development',
          'AI in Coding',
          'UI/UX Design',
          'Git/GitHub',
        ],
        grades: [
          { level: 'Introduction / Basic', name: 'Intro to Web', price: '₦15,000', duration: '1 Month' },
          { level: 'Fundamental', name: 'Web Technologies', price: '₦30,000', duration: '2 Months' },
          { level: 'Master', name: 'Web Development', price: '₦70,000', duration: '3 Months' },
        ],
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8d2ViJTIwdGVjaG5vbG9naWVzJTIwfGVufDB8fHx8MTc1NDE3MzIwNnww&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'web development',
      },
    ],
  },
  {
    name: 'Cyber Security',
    icon: ShieldCheck,
    courses: [
      {
        title: 'Cybersecurity & Ethical Hacking',
        description: 'Protect digital assets, understand threats, and master the tools used by security professionals.',
        details: ['Network Security', 'Ethical Hacking', 'Digital Forensics', 'Cryptography', 'Cloud Security', 'Threat Intelligence'],
        grades: [
          { level: 'Introduction / Basic', name: 'Intro to Security', price: '₦20,000', duration: '1 Month' },
          { level: 'Fundamental', name: 'Cyber Fundamentals', price: '₦45,000', duration: '2 Months' },
          { level: 'Master', name: 'Security & Penetration Testing', price: '₦90,000', duration: '3 Months' },
        ],
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjeWJlciUyMHNlY3VyaXR5fGVufDB8fHx8MTc1NDE3MzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'cyber security',
      },
    ],
  },
  {
    name: 'Graphics Design',
    icon: Palette,
    courses: [
      {
        title: 'Digital Design & Branding',
        description: 'Master the art of visual communication and create stunning graphics for digital and print.',
        details: ['CorelDRAW, Adobe Photoshop', 'Canva, Figma', 'Branding, Typography', 'Color Theory'],
        grades: [
          { level: 'Introduction / Basic', name: 'Intro to Graphics', price: '₦15,000', duration: '1 Month' },
          { level: 'Fundamental', name: 'Graphics Design', price: '₦30,000', duration: '1.5 Months' },
          { level: 'Master', name: 'Graphics & Branding', price: '₦50,000', duration: '2 Months' },
          { level: 'Pro / Expert', name: 'UI/UX & Design Mastery', price: '₦75,000', duration: '3 Months' },
        ],
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxncmFwaGljJTIwZGVzaWdufGVufDB8fHx8MTc1NDE3MzI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'graphic design',
      },
    ],
  },
  {
    name: 'Digital Marketing',
    icon: Megaphone,
    courses: [
      {
        title: 'Digital Marketing & Strategy',
        description: 'Master the tools and strategies to grow brands and businesses online.',
        details: ['Social Media Marketing', 'SEO & SEM', 'Content Strategy', 'Email Marketing', 'Analytics & Data', 'AI in Marketing'],
        grades: [
          { level: 'Introduction / Basic', name: 'Intro to Marketing', price: '₦15,000', duration: '1 Month' },
          { level: 'Fundamental', name: 'Digital Strategy', price: '₦30,000', duration: '2 Months' },
          { level: 'Master', name: 'Advanced Marketing', price: '₦60,000', duration: '3 Months' },
        ],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fHx8MTc1NjQ4NDQwNHww&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'digital marketing',
      },
    ],
  },
  {
    name: 'IoT & Digital Skills',
    icon: Cpu,
    courses: [
      {
        title: 'IoT & Smart Automation',
        description: 'Learn to build and program smart devices and explore the world of the Internet of Things.',
        details: ['IoT (Arduino, sensors)', 'Embedded Systems', 'Smart Automation Projects'],
        grades: [
          { level: 'Introduction / Basic', name: 'Intro to IoT', price: '₦15,000', duration: '1 Month' },
          { level: 'Fundamental', name: 'IoT Fundamentals', price: '₦30,000', duration: '1.5 Months' },
          { level: 'Master', name: 'IoT Projects', price: '₦50,000', duration: '2.5 Months' },
          { level: 'Pro / Expert', name: 'IoT System Deployment', price: '₦75,000', duration: '3 Months' },
        ],
        image: 'https://images.unsplash.com/photo-1488229297570-58520851e868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8SU9UfGVufDB8fHx8MTc1NDE3MzMzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'smart device',
      },
    ],
  },
  {
    name: 'Microsoft Packages',
    icon: Presentation,
    courses: [
      {
        title: 'Productivity Suite',
        description: 'Gain expertise in essential Microsoft Office tools for professional and personal productivity.',
        details: ['Microsoft Word, Excel, PowerPoint', 'Access, Outlook, Teams', 'Basic Graphic Design (Canva)'],
        grades: [
          { level: 'Introduction / Basic', name: 'Microsoft Packages', price: '₦10,000', duration: '1 Month' },
          { level: 'Fundamental', name: 'Microsoft Suite', price: '₦15,000', duration: '1.5 Months' },
          { level: 'Master', name: 'Advanced Microsoft', price: '₦20,000', duration: '2 Months' },
          { level: 'Pro / Expert', name: 'Microsoft Automation & Analysis', price: '₦30,000', duration: '2 Months' },
        ],
        image: '/course-microsoft.jpg',
        aiHint: 'office productivity',
      },
    ],
  },
];