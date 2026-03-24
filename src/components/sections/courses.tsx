'use client';

import * as React from 'react';
import { useState } from 'react';
import { courseData, Grade, Course } from '@/app/course-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Info, CheckCircle, Code, Palette, Cpu, Monitor, Sparkles, Clock, Wallet, ShieldCheck, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import EnrollmentForm from '@/components/enrollment-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const homepageCourses = [
  {
    icon: Code,
    title: "Web Technologies",
    description: "Web Development",
    color: "text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    description: "Ethical Hacking",
    color: "text-accent",
  },
  {
    icon: Palette,
    title: "Graphics Design",
    description: "Digital Design & Branding",
    color: "text-primary",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Digital Strategy & Growth",
    color: "text-accent",
  },
  {
    icon: Cpu,
    title: "IoT & Smart Systems",
    description: "IoT & Smart Automation",
    color: "text-primary",
  },
  {
    icon: Monitor,
    title: "Microsoft Packages",
    description: "Productivity Suite",
    color: "text-accent",
  },
];

const CourseGrade = ({ grade, onClick }: { grade: Grade; onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="w-full text-left group/grade transition-all hover:bg-primary/5 rounded-lg p-1"
  >
    <div className="flex justify-between items-center py-3 px-4">
        <div>
          <h4 className="font-semibold text-foreground group-hover/grade:text-primary transition-colors">{grade.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider h-5">{grade.level}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {grade.duration}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-primary flex items-center gap-1 justify-end">
            <Wallet className="w-3 h-3" /> {grade.price}
          </p>
          <span className="text-[10px] text-muted-foreground uppercase">One-time fee</span>
        </div>
    </div>
  </button>
);

const CourseListItem = ({ course, onEnroll, onGradeSelect }: { course: Course; onEnroll: (course: Course) => void; onGradeSelect: (grade: Grade) => void; }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group"
  >
    <Card className="overflow-hidden border-none shadow-2xl bg-card/50 backdrop-blur-sm ring-1 ring-border/50 hover:ring-primary/30 transition-all duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            data-ai-hint={course.aiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-6 left-6 right-6 lg:hidden">
            <Badge className="bg-primary text-white mb-2">Enrollment Open</Badge>
            <h3 className="text-white font-display text-2xl font-bold">{course.title}</h3>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 lg:p-10 flex flex-col">
          <div className="hidden lg:block mb-6">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                Professional Track
              </Badge>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Sparkles key={s} className="w-3 h-3 text-accent" />
                ))}
              </div>
            </div>
            <CardTitle className="font-display text-3xl text-foreground mt-4">{course.title}</CardTitle>
            <CardDescription className="text-lg mt-2 leading-relaxed">
              {course.description}
            </CardDescription>
          </div>

          <div className="space-y-8 flex-grow">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-grow bg-border" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">Specialties & Skills</span>
                <div className="h-px flex-grow bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {course.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2 group/skill">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/skill:bg-primary transition-colors">
                      <CheckCircle className="w-3 h-3 text-primary group-hover/skill:text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium group-hover/skill:text-foreground transition-colors">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-4 lg:p-6 border border-border/50">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pricing" className="border-none">
                  <AccordionTrigger className="font-display font-bold text-lg hover:no-underline py-0 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                        <Monitor className="w-5 h-5 text-primary" />
                      </div>
                      <span>Select Your Training Level</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <div className="grid gap-2">
                      {course.grades.map((grade) => (
                        <CourseGrade key={grade.level} grade={grade} onClick={() => onGradeSelect(grade)} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 group/btn"
              onClick={() => onEnroll(course)}
            >
              Start Enrollment 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Join 500+ successful alumni. <br />
              <span className="font-semibold text-foreground">Flexible payment plans available.</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const CoursesHomepage = () => {
  return (
    <section id="courses" className="py-24 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">Our Expertise</Badge>
            <h2 className="section-heading">
              Our Courses & <span className="text-primary">Skill Focus</span>
            </h2>
            <p className="section-subheading mt-4">
              From fundamentals to expert-level, our courses are designed to provide you
              with career-ready expertise.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {homepageCourses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href="/courses">
                <Card className="group p-8 border-none shadow-xl bg-card hover:bg-primary transition-all duration-300 card-hover overflow-hidden relative h-full">
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary-foreground/5 rounded-full group-hover:bg-white/10 transition-colors" />
                  <div className="relative z-10">
                    <div className={`p-4 rounded-2xl bg-muted group-hover:bg-white/20 transition-colors w-fit ${course.color} group-hover:text-white`}>
                      <course.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display font-bold text-xl mt-6 group-hover:text-white">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 group-hover:text-white/80 leading-relaxed">
                      Explore our path in {course.description} and master the tools of the trade.
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="h-14 px-10 rounded-xl font-bold group">
            <Link href="/courses">
              View All Career Tracks <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const CourseDetailsDialog = ({ isOpen, onClose, course, grade }: { isOpen: boolean; onClose: () => void; course: Course | null; grade: Grade | null; }) => {
    if (!isOpen || !course || !grade) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-card">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Level Breakdown</span>
                    </div>
                    <DialogTitle className="font-display text-3xl text-foreground">{course.title}: {grade.level}</DialogTitle>
                    <DialogDescription className="text-base pt-2">{course.description}</DialogDescription>
                </DialogHeader>
                <div className="py-6 space-y-8">
                    <Card className="bg-primary/5 border-primary/20 shadow-none">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-display font-bold text-xl text-primary">{grade.name}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                      <Clock className="w-3 h-3" /> Duration: {grade.duration}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-display font-bold text-2xl text-foreground">{grade.price}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tuition Fee</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div>
                        <h3 className="font-display font-bold text-lg mb-4 text-foreground flex items-center gap-2">
                          <Code className="w-5 h-5 text-accent" />
                          Curriculum Highlights
                        </h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {course.details.map((detail, index) => (
                            <div key={index} className="flex items-start bg-secondary/30 p-3 rounded-lg border border-border/50">
                              <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground font-medium">{detail}</span>
                            </div>
                          ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const CoursesPageClient = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setIsConfirmModalOpen(true);
  };
  
  const handleConfirmEnroll = () => {
    setIsConfirmModalOpen(false);
    setIsEnrollModalOpen(true);
  };

  const handleCloseEnrollModal = () => {
    setIsEnrollModalOpen(false);
    setSelectedCourse(null);
  };

  const handleGradeSelect = (course: Course, grade: Grade) => {
      setSelectedCourse(course);
      setSelectedGrade(grade);
      setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
      setIsDetailsModalOpen(false);
  };
  
  return (
     <div className="bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <section id="courses-page" className="py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 py-1.5 px-4 rounded-full uppercase tracking-widest text-[10px] font-bold">
                Elite Tech Training
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold font-display tracking-tight text-foreground">
                Your Career Path, <span className="text-primary">Defined</span>
              </h2>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                We've built specialized tracks to take you from a curious beginner to a professional leader in the tech industry. Pick your specialty and start your journey.
              </p>
            </motion.div>
          </div>

          <div className="space-y-24">
            {courseData.map((category, idx) => (
              <div key={category.name}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-12"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                    <category.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Track 0{idx + 1}</span>
                    <h3 className="text-3xl font-bold font-display text-foreground">{category.name}</h3>
                  </div>
                </motion.div>
                
                <div className="space-y-12">
                  {category.courses.map((course) => (
                    <CourseListItem 
                      key={course.title} 
                      course={course} 
                      onEnroll={handleEnrollClick} 
                      onGradeSelect={(grade) => handleGradeSelect(course, grade)} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourseDetailsDialog 
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        course={selectedCourse}
        grade={selectedGrade}
      />

      {selectedCourse && (
        <>
          <AlertDialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
            <AlertDialogContent className="bg-card">
              <AlertDialogHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <AlertDialogTitle className="font-display text-2xl">
                  Confirm Your Enrollment
                </AlertDialogTitle>
                <AlertDialogDescription className="pt-2 text-base">
                  You are about to start your professional journey in <strong className="text-foreground">{selectedCourse.title}</strong>. 
                  <br /><br />
                  Please ensure you have read our <Link href="/terms" className="text-primary font-semibold hover:underline decoration-2">Terms and Conditions</Link> regarding attendance and certification before proceeding.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-8 gap-3">
                <AlertDialogCancel className="border-border hover:bg-muted text-muted-foreground">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmEnroll} className="bg-primary hover:bg-primary/90 text-white font-bold px-8">
                  I Accept & Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <EnrollmentForm
            isOpen={isEnrollModalOpen}
            onClose={handleCloseEnrollModal}
            course={selectedCourse}
          />
        </>
      )}
    </div>
  );
}

export default function Courses({ isHomepage = false }: { isHomepage?: boolean }) {
  return isHomepage ? <CoursesHomepage /> : <CoursesPageClient />;
}
