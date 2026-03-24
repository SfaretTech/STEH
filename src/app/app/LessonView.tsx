'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Youtube, Code, FileText, Download, BookOpen, Zap, Globe, ChevronRight, HelpCircle, Trophy, Archive } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface ReflectionQuestion {
  q: string;
  a: string;
}

interface LessonProps {
  moduleName: string;
  onClose: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const reflectionData: ReflectionQuestion[] = [
  { q: "Why does the instructor recommend Visual Studio Code over other text editors?", a: "It is currently the most popular and best free web development tool available." },
  { q: "What is the significance of naming your main file index.html?", a: "It is the file a website automatically looks for and opens as the home page when someone visits your URL." },
  { q: "What keyboard shortcut is used to generate a basic HTML template instantly in VS Code?", a: "Type an exclamation mark (!) and then press the Tab key." },
  { q: "Why is the 'Live Server' extension considered a 'great development experience'?", a: "It performs 'Live Reloading', which allows you to see your code changes in the browser immediately after saving, without manual refreshing." },
  { q: "According to the video, what are the three core technologies you must learn to be a web developer?", a: "HTML, CSS, and JavaScript." }
];

const quizData = [
  { q: "Which software is recommended in the video as the 'best web development tool out there that is free'?", options: ["Sublime Text", "Visual Studio Code", "Notepad++", "Adobe Dreamweaver"], a: 1 },
  { q: "What is the primary purpose of the 'Live Server' extension in Visual Studio Code?", options: ["To host your website permanently on the internet.", "To check your code for spelling errors and bugs.", "To automatically refresh the browser whenever you save your code.", "To allow multiple developers to code simultaneously."], a: 2 },
  { q: "Why should the first file of your website be named 'index.html'?", options: ["Because 'index' is the only filename HTML supports.", "It is the default file a web server looks for.", "It automatically makes the website rank higher.", "It is a requirement for Live Server."], a: 1 },
  { q: "Which browser is preferred by the instructor and most web developers?", options: ["Safari", "Microsoft Edge", "Firefox", "Google Chrome"], a: 3 },
  { q: "In VS Code, typing '!' followed by 'Tab' is a shortcut for what?", options: ["Deleting the current line.", "Saving the document.", "Generating a standard HTML boilerplate.", "Opening the Live Server."], a: 2 },
  { q: "Where should you place your visible content in the HTML file?", options: ["Inside the <head> tags.", "Between the <body> tags.", "Before any tags.", "Inside the <title> tag."], a: 1 },
  { q: "What is the keyboard shortcut mentioned for saving a file on a Mac?", options: ["Command + S", "Control + S", "Shift + S", "Option + S"], a: 0 },
  { q: "If you just need a simple website for a small business without learning code, what is suggested?", options: ["Hire an expensive agency.", "Use an AI-powered tool like Wix ADI.", "Write code in Notepad.", "Wait until you learn JS fully."], a: 1 },
  { q: "True or False: Most professional tools used in this tutorial cost a monthly fee.", options: ["True", "False"], a: 1 },
  { q: "What are the three pillars of web development?", options: ["HTML, Python, and SQL", "Java, PHP, and CSS", "HTML, CSS, and JavaScript", "Design, Marketing, and Coding"], a: 2 }
];

export const LessonView = ({ moduleName, onClose, onComplete, isCompleted }: LessonProps) => {
  const [currentStep, setCurrentStep] = useState(isCompleted ? 5 : 1);
  const [isVideoFinished, setIsVideoFinished] = useState(isCompleted);
  const [showAnswers, setShowAnswers] = useState(isCompleted);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(isCompleted ? 100 : null);
  const [docsReviewed, setDocsReviewed] = useState(isCompleted);

  const isModule1 = moduleName.includes("Web Dev Introduction & Setup");

  const handleQuizSubmit = () => {
    let correct = 0;
    quizData.forEach((item, idx) => {
      if (quizAnswers[idx] === item.a) correct++;
    });
    setQuizScore(Math.round((correct / quizData.length) * 100));
  };

  const isQuizPassed = quizScore !== null && quizScore >= 80;

  if (!isModule1) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="flex items-center gap-4 border-b pb-6">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold font-display">{moduleName}</h1>
        </header>
        <div className="text-center py-20 bg-card rounded-[2rem] border border-dashed">
          <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold">Content Locked / Placeholder</h3>
          <p className="text-muted-foreground mt-2">The immersive view for this module is not yet published.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onClose} className="rounded-full shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <Badge variant="outline" className="mb-1 text-[10px] tracking-widest uppercase border-primary/20 text-primary">Interactive Module</Badge>
            <h1 className="text-xl md:text-2xl font-bold font-display">{moduleName}</h1>
          </div>
        </div>
        
        {/* Step Progress Bar Header */}
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-muted-foreground bg-secondary/50 p-2 px-4 rounded-full border">
          <span className={currentStep >= 1 ? "text-primary" : ""}>1. Overview</span>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className={currentStep >= 2 ? "text-primary" : ""}>2. Video</span>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className={currentStep >= 3 ? "text-primary" : ""}>3. Reflect</span>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className={currentStep >= 4 ? "text-primary" : ""}>4. Quiz</span>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className={currentStep >= 5 ? "text-primary" : ""}>5. Docs</span>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {/* STEP 1: Overview */}
        {currentStep === 1 && (
          <motion.div 
            key="step1" 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <section className="bg-card p-6 md:p-8 rounded-[2rem] border shadow-sm h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h3 className="text-2xl md:text-3xl font-bold font-display flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                Course Overview
              </h3>
              <div className="prose prose-sm md:prose-base dark:prose-invert relative z-10">
                <p className="text-lg leading-relaxed text-muted-foreground">In this introductory lesson, the focus is on setting up a professional environment using free, industry-standard tools before diving into code.</p>
                <div className="bg-secondary/50 p-6 rounded-2xl mt-8 border border-border/50">
                  <h4 className="font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Key Takeaways</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center shrink-0 mt-0.5 shadow-sm border text-[10px] font-bold">1</div>
                      <span><strong>The Goal:</strong> Moving beyond simple website builders to learn the core technologies: HTML, CSS, and JavaScript.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center shrink-0 mt-0.5 shadow-sm border text-[10px] font-bold">2</div>
                      <span><strong>Workflow:</strong> Professionals use text editors to write code and local servers to preview their work in real-time.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center shrink-0 mt-0.5 shadow-sm border text-[10px] font-bold">3</div>
                      <span><strong>Milestone:</strong> Creating an <code>index.html</code> file.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setCurrentStep(2)} size="lg" className="rounded-xl font-bold px-10 h-14 shadow-lg shadow-primary/20 text-md gap-3">
                Mark Overview Done <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Video */}
        {currentStep === 2 && (
          <motion.div 
            key="step2" 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <section className="bg-card p-4 md:p-6 rounded-[2rem] border shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <Youtube className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display">Video Tutorial</h3>
                    <p className="text-sm text-muted-foreground">Watch until the end to unlock the reflection exercise.</p>
                  </div>
                </div>
                {isVideoFinished && (
                  <Badge className="bg-green-500 hover:bg-green-600 border-none px-4 py-1 gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Video Completed
                  </Badge>
                )}
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border bg-black shadow-inner">
                <ReactPlayer 
                  url="https://www.youtube.com/watch?v=gQojMIhELvM"
                  width="100%"
                  height="100%"
                  controls={true}
                  config={{
                    youtube: {
                      playerVars: {
                        rel: 0,
                        modestbranding: 1,
                        origin: typeof window !== 'undefined' ? window.location.origin : ''
                      }
                    }
                  }}
                  onEnded={() => {
                    setIsVideoFinished(true);
                    setTimeout(() => setCurrentStep(3), 1500); // Auto proceed after 1.5s
                  }}
                />
              </div>
            </section>
            <div className="flex justify-between items-center pt-4 px-2">
              <Button variant="ghost" onClick={() => setCurrentStep(1)} className="rounded-xl text-muted-foreground font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Overview
              </Button>
              <Button 
                onClick={() => setCurrentStep(3)} 
                disabled={!isVideoFinished}
                size="lg" 
                className={cn("rounded-xl font-bold px-10 h-14 gap-3 transition-all", isVideoFinished ? "shadow-lg shadow-primary/20" : "")}
              >
                Proceed to Reflections <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Reflections */}
        {currentStep === 3 && (
          <motion.div 
            key="step3" 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <section className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display">Reflection Questions</h3>
                    <p className="text-sm text-muted-foreground mt-1">Review these key concepts from the video.</p>
                  </div>
                </div>
                <Button 
                  variant={showAnswers ? "outline" : "default"} 
                  onClick={() => setShowAnswers(true)}
                  disabled={showAnswers}
                  className="rounded-xl shrink-0 font-bold h-12 px-6 shadow-sm"
                >
                  {showAnswers ? "Answers Revealed" : "Click to Reveal Answers"}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reflectionData.map((item, idx) => (
                  <div key={idx} className="bg-secondary/30 border border-primary/10 rounded-2xl p-5 hover:bg-secondary/50 transition-colors">
                    <p className="font-semibold text-sm leading-relaxed">
                      <span className="text-primary font-black mr-2 tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">Q{idx + 1}.</span> 
                      {item.q}
                    </p>
                    <AnimatePresence>
                      {showAnswers && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-border/50 text-sm font-medium text-muted-foreground"
                        >
                          <span className="font-bold text-green-600 dark:text-green-500 mr-2 uppercase tracking-wider text-[10px]">Answer</span>
                          <span className="leading-relaxed block mt-1">{item.a}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="flex justify-between items-center pt-4 px-2">
              <Button variant="ghost" onClick={() => setCurrentStep(2)} className="rounded-xl text-muted-foreground font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Video
              </Button>
              <AnimatePresence>
                {showAnswers && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <Button 
                      onClick={() => setCurrentStep(4)} 
                      size="lg" 
                      className="rounded-xl font-bold px-10 h-14 shadow-lg shadow-primary/20 gap-3"
                    >
                      Continue to Quiz <ChevronRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Quizzes */}
        {currentStep === 4 && (
          <motion.div 
            key="step4" 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <section className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display">Knowledge Check</h3>
                    <p className="text-sm text-muted-foreground mt-1">Pass this 10-question quiz (80% minimum) to proceed.</p>
                  </div>
                </div>
                {(quizScore !== null && quizStarted) && (
                  <div className="flex items-center gap-3 bg-secondary/50 px-5 py-3 rounded-2xl border">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Score</span>
                    <span className={cn("text-3xl font-black font-display tracking-tighter", isQuizPassed ? "text-green-500" : "text-destructive")}>{quizScore}%</span>
                  </div>
                )}
              </div>

              {!quizStarted ? (
                <div className="text-center py-16 bg-muted/20 border-dashed border-2 rounded-3xl mx-auto max-w-2xl">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-accent" />
                  </div>
                  <h4 className="font-bold text-xl font-display mb-2">Ready to test your knowledge?</h4>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">You must correctly answer at least 8 out of the 10 questions to unlock the final documentation.</p>
                  <Button onClick={() => setQuizStarted(true)} size="lg" className="rounded-xl font-bold px-12 h-14 shadow-accent/20 shadow-lg text-lg">Start Assessment</Button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {quizData.map((q, qIndex) => (
                      <div key={qIndex} className="bg-secondary/20 p-6 rounded-[1.5rem] border shadow-sm">
                        <p className="font-bold text-sm mb-5 leading-relaxed">
                          <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-md mr-3 text-[10px] font-black uppercase tracking-wider shadow-sm">Q{qIndex + 1}</span>
                          {q.q}
                        </p>
                        <RadioGroup 
                          value={quizAnswers[qIndex]?.toString()} 
                          onValueChange={(val) => setQuizAnswers(prev => ({ ...prev, [qIndex]: parseInt(val) }))}
                          className="space-y-3"
                          disabled={quizScore !== null && isQuizPassed}
                        >
                          {q.options.map((opt, oIndex) => {
                            const isCorrect = quizScore !== null && oIndex === q.a;
                            const isWrong = quizScore !== null && quizAnswers[qIndex] === oIndex && oIndex !== q.a;
                            
                            return (
                              <div key={oIndex} className={cn(
                                "flex items-center space-x-3 bg-background border p-3.5 rounded-xl transition-all duration-300",
                                isCorrect ? "bg-green-500/10 border-green-500/40 shadow-sm" : 
                                isWrong ? "bg-destructive/10 border-destructive/40 shadow-sm" : 
                                "hover:border-primary/40 hover:shadow-md cursor-pointer"
                              )}>
                                <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} className={cn(isCorrect && "text-green-600 border-green-600")} />
                                <Label htmlFor={`q${qIndex}-o${oIndex}`} className={cn(
                                  "text-sm font-medium leading-relaxed w-full cursor-pointer",
                                  isCorrect ? "text-green-700 dark:text-green-400 font-bold" : isWrong ? "text-destructive font-bold" : ""
                                )}>
                                  {opt}
                                </Label>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>

                  {!isQuizPassed && (
                    <div className="flex flex-col items-end pt-8 border-t border-border/50">
                      {quizScore !== null && quizScore < 80 && (
                        <p className="text-destructive font-bold mb-4 flex items-center gap-2 bg-destructive/10 px-4 py-2 rounded-lg text-sm">
                          You scored {quizScore}%. You need 80% to pass. Please review and try again.
                        </p>
                      )}
                      <Button 
                        onClick={handleQuizSubmit} 
                        disabled={Object.keys(quizAnswers).length < quizData.length}
                        size="lg"
                        className="rounded-xl font-bold px-12 h-14 shadow-lg"
                      >
                        {quizScore !== null ? "Retake Exam" : "Submit Answers"}
                      </Button>
                      {Object.keys(quizAnswers).length < quizData.length && quizScore === null && (
                        <p className="text-xs text-muted-foreground mt-3 font-medium">Please answer all {quizData.length} questions to submit.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>
            
            <div className="flex justify-between items-center pt-4 px-2">
              <Button variant="ghost" onClick={() => setCurrentStep(3)} className="rounded-xl text-muted-foreground font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Reflections
              </Button>
              <AnimatePresence>
                {isQuizPassed && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <Button 
                      onClick={() => setCurrentStep(5)} 
                      size="lg" 
                      className="rounded-xl font-bold px-10 h-14 shadow-lg shadow-primary/20 gap-3"
                    >
                      Proceed to Documentation <ChevronRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Documentation */}
        {currentStep === 5 && (
          <motion.div 
            key="step5" 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <section className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display">Required Setup Documentation</h3>
                  <p className="text-sm text-muted-foreground mt-1">Download and prepare these tools for upcoming lab sessions.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-background border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent flex items-start justify-end p-4 rounded-bl-[3rem]">
                    <Globe className="w-6 h-6 text-primary opacity-50 shadow-sm" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-inner">
                    <Globe className="w-7 h-7" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Web Browser</h4>
                  <p className="text-xl font-bold font-display tracking-tight mb-3">Google Chrome</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Preferred choice for most web developers due to its robust developer tools and industry-standard rendering engine.</p>
                </div>

                <div className="bg-background border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent flex items-start justify-end p-4 rounded-bl-[3rem]">
                    <Code className="w-6 h-6 text-blue-500 opacity-50 shadow-sm" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 shadow-inner">
                    <Code className="w-7 h-7" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Code Editor</h4>
                  <p className="text-xl font-bold font-display tracking-tight mb-3">Visual Studio Code</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">The undisputed market-leader text editor. Completely free, customizable, and exceptionally powerful for modern web development.</p>
                </div>

                <div className="bg-background border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent flex items-start justify-end p-4 rounded-bl-[3rem]">
                    <Zap className="w-6 h-6 text-accent opacity-50 shadow-sm" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 shadow-inner">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">VS Extension</h4>
                  <p className="text-xl font-bold font-display tracking-tight mb-3">Live Server</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">A crucial quality-of-life extension that runs a local development server with a live reload feature for static and dynamic pages.</p>
                </div>
              </div>

              {!isCompleted ? (
                <div className="flex justify-center mt-12 pt-8 border-t border-border/50">
                  <Button 
                    onClick={() => {
                      setDocsReviewed(true);
                      onComplete();
                      onClose();
                    }} 
                    size="lg" 
                    className="rounded-2xl font-bold px-12 h-16 bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20 text-lg gap-3 w-full sm:w-auto"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    Complete Lesson & Exit
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center mt-12 flex-col items-center">
                   <div className="bg-green-500/10 text-green-600 font-bold px-6 py-3 rounded-full flex items-center gap-2 mb-6">
                      <CheckCircle2 className="w-5 h-5" />
                      Lesson Already Completed
                   </div>
                   <Button onClick={onClose} variant="outline" className="rounded-xl font-bold h-12 px-8">Return to Dashboard</Button>
                </div>
              )}
            </section>
            
            <div className="flex justify-between items-center pt-4 px-2">
              <Button variant="ghost" onClick={() => setCurrentStep(4)} className="rounded-xl text-muted-foreground font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Quizzes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
