'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from '@monaco-editor/react';
import { submitCodeForVerification } from "@/app/actions";
import { processCommand } from './terminalLogic';
import { AppProvider, useAppState } from './useAppState';
import { getCourseContent } from "../data/courses";
import { LessonView } from './LessonView';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Rocket, 
  BookOpen, 
  Users, 
  Zap, 
  GraduationCap, 
  CheckCircle2, 
  LayoutDashboard,
  LogOut,
  Target,
  Award,
  Clock,
  CreditCard,
  Ticket,
  Check,
  Search,
  Settings,
  User,
  MessageSquare,
  Trophy,
  Flame,
  Star,
  Bell,
  Shield,
  Palette,
  Compass,
  Library,
  Code,
  Lock,
  Unlock,
  FileCheck,
  ClipboardCheck,
  FlaskConical,
  Download,
  FileText,
  Archive,
  Calendar as CalendarIcon,
  Sparkles,
  History,
  Timer,
  Video,
  MessagesSquare,
  Menu,
  AlertCircle,
  Beaker
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { courseData } from "@/app/course-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
} from 'recharts';
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const splashScreens = [
  {
    tagline: "Empowering the Next Generation of Tech Leaders",
    icon: Rocket,
    gradient: "from-primary to-accent",
  },
  {
    tagline: "Learn. Build. Innovate. Repeat.",
    icon: BookOpen,
    gradient: "from-accent to-primary",
  },
  {
    tagline: "Join a Community of 500+ Tech Enthusiasts",
    icon: Users,
    gradient: "from-primary via-accent to-primary",
  },
  {
    tagline: "Your Tech Career Starts Here",
    icon: Zap,
    gradient: "from-accent via-primary to-accent",
  },
];


const upcomingSessions = [
  { 
    title: "Tooling & IDE Setup", 
    time: "Tomorrow, 10:00 AM", 
    type: "Live Workshop", 
    level: "Introduction / Basic",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
    icon: Video
  },
  { 
    title: "Support Q&A Session", 
    time: "Friday, 4:00 PM", 
    type: "Community", 
    level: "Introduction / Basic",
    platform: "WhatsApp",
    link: "https://chat.whatsapp.com/invite/intro",
    icon: MessagesSquare
  },
  { 
    title: "Framework Deep Dive", 
    time: "Wednesday, 2:00 PM", 
    type: "Expert Track", 
    level: "Fundamental",
    platform: "Google Meet",
    link: "https://meet.google.com/fun-dame-ntal",
    icon: Video
  },
  { 
    title: "Project Review Panel", 
    time: "Saturday, 11:00 AM", 
    type: "Critique", 
    level: "Master",
    platform: "Google Meet",
    link: "https://meet.google.com/mas-ter-view",
    icon: Video
  },
  { 
    title: "Industry Workflow Lab", 
    time: "Monday, 9:00 AM", 
    type: "Specialization", 
    level: "Pro / Expert",
    platform: "Google Meet",
    link: "https://meet.google.com/pro-exp-ert",
    icon: Video
  }
];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current < splashScreens.length - 1) {
      const timer = setTimeout(() => setCurrent((p) => p + 1), 2500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 2500);
      return () => clearTimeout(timer);
    }
  }, [current, onComplete]);

  const screen = splashScreens[current];
  const Icon = screen.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center gap-8 px-6 text-center"
        >
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${screen.gradient} flex items-center justify-center shadow-2xl overflow-hidden`}
          >
            <div className="relative w-12 h-12">
              <Image src="/stehlogo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display text-5xl md:text-6xl font-bold text-secondary-foreground tracking-tight"
          >
            STEH
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl text-secondary-foreground/70 max-w-md font-medium"
          >
            {screen.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xs text-secondary-foreground/40 uppercase tracking-[0.3em]"
          >
            Sfaret Tech Edu Hub
          </motion.p>

          <div className="flex gap-2 mt-4">
            {splashScreens.map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-primary"
                    : i < current
                    ? "w-2 bg-accent/60"
                    : "w-2 bg-secondary-foreground/20"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={onComplete}
        className="absolute bottom-10 text-secondary-foreground/40 text-sm hover:text-secondary-foreground/70 transition-colors"
      >
        Skip →
      </button>
    </div>
  );
};

const AIObserver = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMonitoring) {
        setSessionTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-[100] group"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-primary rounded-full blur-xl"
        />
        
        <div className="relative w-16 h-16 bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-primary rounded-full"
          />
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>

        <div className="absolute bottom-full right-0 mb-4 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <Card className="p-4 bg-background/95 backdrop-blur-md border-primary/20 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <p className="text-[10px] font-bold uppercase tracking-widest">STEH AI Mentor</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Active Session Tracking</p>
                <p className="text-xl font-mono font-bold text-primary tabular-nums">{formatTime(sessionTime)}</p>
              </div>
              <Separator />
              <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">LMS Activity Audit</p>
                <p className="text-[10px] leading-relaxed text-muted-foreground mt-1">
                  Monitoring course engagement, assessment timing, and lab execution. Progress is being synchronized with your Skill Audit.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

const DashboardView = ({ user }: { user: any, selectedCourseObj: any, selectedGradeObj: any }) => {
  const { totalProgress, achievements, labSessionsHours, streakDays, lastSessionDuration, weeklyActivity } = useAppState();

  const filteredSessions = useMemo(() => {
    return upcomingSessions.filter(s => s.level === user.level);
  }, [user.level]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Welcome back, <span className="text-primary">{user.fullName.split(' ')[0]}</span>! 👋</h1>
          <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1">
            Pick up right where you left off in your <span className="text-foreground font-bold">{user.course}</span> 
            <Badge variant="outline" className="ml-2 border-primary/20 text-primary bg-primary/5">
              {user.level}
            </Badge> track.
          </div>
        </div>
        <div className="flex items-center gap-3 bg-card p-2 rounded-2xl border shadow-sm w-fit group hover:border-primary/30 transition-colors">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden">
                <img src={`https://picsum.photos/seed/${i + 10}/32/32`} alt="user" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pr-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
              <span className="text-foreground">12</span> online
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <Badge className="bg-white/20 text-white border-none">
                Streak Logic
              </Badge>
            </div>
            <p className="text-sm opacity-80 mb-1">Learning Streak</p>
            <h3 className="text-3xl font-bold font-display">{streakDays} Days</h3>
            <p className="text-[10px] mt-2 opacity-60">Connected to Achievement badges</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-card group">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-accent/10 text-accent rounded-xl">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Weighting</p>
                <p className="text-[10px] text-muted-foreground">90% Core | 10% Spec</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Journey Progress</p>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold font-display">{totalProgress}%</h3>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-card">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <History className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="text-[9px] uppercase border-primary/20 text-primary animate-pulse">
                Live Audit
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">AI Session Audit</p>
            <h3 className="text-2xl font-bold font-display flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              {String(Math.floor(labSessionsHours)).padStart(2, '0')}:{String(Math.floor((labSessionsHours % 1) * 60)).padStart(2, '0')} <span className="text-sm font-medium text-muted-foreground">hrs</span>
            </h3>
            <p className="text-[10px] text-muted-foreground mt-2 italic">Last session: {Math.floor(lastSessionDuration * 60)}m</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-card">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-500/10 text-orange-600 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Credentials</p>
            <h3 className="text-3xl font-bold font-display">{achievements.length}</h3>
            <p className="text-[10px] text-muted-foreground mt-2">Unlocked upon 100% completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Weekly Session Activity
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full w-fit">
                <Clock className="w-3 h-3" /> Updated 5m ago
              </div>
            </CardTitle>
            <CardDescription>Duration spent in active learning sessions per day (Hours).</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                <YAxis hide />
                <RechartsTooltip 
                  cursor={{fill: 'hsl(var(--primary)/0.05)'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  formatter={(value) => [`${value} hrs`, 'Session Time']}
                />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>Live events matching your {user.level} track.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow overflow-y-auto max-h-[400px]">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <session.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{session.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          {session.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[9px] uppercase h-5 font-bold shrink-0">{session.platform}</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full rounded-xl h-9 text-xs font-bold gap-2 hover:bg-primary hover:text-white"
                    onClick={() => window.open(session.link, '_blank')}
                  >
                    Join on {session.platform}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">No sessions scheduled for your track this week.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" className="w-full text-xs font-bold text-muted-foreground hover:text-primary">
              View Academic Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const CourseView = ({ user }: { user: any, selectedCourseObj: any }) => {
  const { moduleProgress, markModuleComplete } = useAppState();
  const [selectedLesson, setSelectedLesson] = useState<{id: string, name: string} | null>(null);
  const courseData = useMemo(() => getCourseContent(user?.course || ""), [user?.course]);
  const curriculumModules = courseData?.levels[user?.level || ""]?.modules.length ? courseData.levels[user.level].modules : [
    "Digital Literacy & System Tooling",
    "Computational Thinking & Logic",
    "Technical Documentation & Communication",
    "Industry Standard Workflows (Git/CI/CD)",
    "Cyber Hygiene & Privacy Frameworks",
    "Algorithmic Fundamentals",
    "Product Lifecycle & Methodology",
    "Database & Information Architecture",
    "Ethical Computing & Accessibility",
    "Resource Optimization & Scale",
    "System Troubleshooting & Debugging",
    "Professional Portfolio Construction",
  ];

  if (selectedLesson) {
    return (
      <LessonView
        moduleName={selectedLesson.name}
        isCompleted={moduleProgress[selectedLesson.id] === 'completed'}
        onClose={() => setSelectedLesson(null)}
        onComplete={() => {
          markModuleComplete(selectedLesson.id);
          setSelectedLesson(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Your <span className="text-primary">Curriculum</span></h1>
          <p className="text-muted-foreground mt-1">12 Mandatory modules required to unlock advanced Specialization tracks.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 px-4 py-2 rounded-full w-fit">
          <GraduationCap className="w-3 h-3 text-primary" />
          Core Requirement
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {curriculumModules.map((title, i) => {
          const moduleId = `Module ${String(i + 1).padStart(2, '0')}`;
          const status = moduleProgress[moduleId] || 'locked';
          const isCompleted = status === 'completed';
          const isInProgress = status === 'active';
          const isLocked = status === 'locked';

          return (
            <Card key={i} className={cn(
              "group relative overflow-hidden border-none transition-all duration-500 flex flex-col",
              isLocked ? "bg-muted/30 opacity-70" : "bg-card shadow-xl hover:shadow-2xl hover:-translate-y-1"
            )}>
              <div className="absolute top-0 left-0 w-full h-1 bg-muted">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? '100%' : isInProgress ? '45%' : '0%' }}
                  className="h-full bg-primary"
                />
              </div>

              <CardHeader className="pt-8 flex-grow px-6">
                <div className="flex justify-between items-start">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                    isCompleted ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : 
                    isInProgress ? "bg-primary text-white shadow-lg shadow-primary/20 animate-pulse" : 
                    "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted ? <Check className="w-6 h-6" /> : isLocked ? <Lock className="w-5 h-5" /> : <BookOpen className="w-6 h-6" />}
                  </div>
                  <Badge variant={isLocked ? "outline" : isCompleted ? "default" : "secondary"} className={cn(
                    "uppercase text-[10px] tracking-widest font-bold",
                    isCompleted && "bg-green-500/10 text-green-600 border-none"
                  )}>
                    {isCompleted ? "Completed" : isInProgress ? "Active" : "Locked"}
                  </Badge>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Module {String(i + 1).padStart(2, '0')}</p>
                  <CardTitle className="text-xl font-bold font-display group-hover:text-primary transition-colors line-clamp-2">{title}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pb-6 px-6">
                {[
                  { label: "Weekly Assessment", icon: ClipboardCheck },
                  { label: "Practical Reflection", icon: FileCheck },
                  { label: "Laboratory Session", icon: FlaskConical },
                ].map((task, idx) => {
                  const TaskIcon = task.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 text-[9px] font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TaskIcon className="w-3 h-3" />
                        {task.label}
                      </div>
                      {isCompleted ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Clock className="w-3 h-3 text-muted-foreground/30" />
                      )}
                    </div>
                  );
                })}
              </CardContent>

              <CardFooter className="pt-4 pb-8 border-t border-border/50 bg-muted/10 mt-auto px-6">
                <Button 
                  className={cn(
                    "w-full h-12 rounded-xl font-bold transition-all",
                    isLocked ? "bg-muted text-muted-foreground hover:bg-muted" : "shadow-lg shadow-primary/10"
                  )} 
                  variant={isLocked ? "ghost" : isCompleted ? "outline" : "default"}
                  disabled={isLocked}
                  onClick={() => {
                    if (!isLocked) setSelectedLesson({ id: moduleId, name: title });
                  }}
                >
                  {isCompleted ? "Review Material" : isInProgress ? "Launch Lesson" : "Locked"}
                  {!isLocked && <ArrowRight className="ml-2 w-4 h-4" />}
                  {isLocked && <Lock className="ml-2 w-4 h-4 opacity-50" />}
                </Button>
              </CardFooter>
            </Card>
          );
        })}

        <Card className="col-span-full border-2 border-dashed border-primary/20 bg-primary/5 p-6 md:p-10 text-center rounded-[2.5rem]">
           <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/5">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-primary" />
           </div>
           <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">Track Certification Examination</h3>
           <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
             Complete all 12 modules, assessments, and labs to unlock the Certification Exam for your <span className="text-foreground font-bold">{user.level}</span> level. 
             Passing this exam is required to graduate to your chosen <span className="text-foreground font-bold">Specialization</span> track.
           </p>
           <Button disabled className="mt-8 rounded-xl h-14 px-12 bg-muted text-muted-foreground font-bold w-full sm:w-auto">
             <Lock className="mr-2 w-5 h-5" /> Locked until Week 12
           </Button>
        </Card>
      </div>
    </div>
  );
};

// Language List
const SUPPORTED_LANGUAGES = [
  { id: 'html', name: 'HTML5', icon: '🌐' },
  { id: 'javascript', name: 'JavaScript', icon: 'JS' },
  { id: 'typescript', name: 'TypeScript', icon: 'TS' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: 'C+' },
  { id: 'go', name: 'Go', icon: 'GO' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'sql', name: 'SQL', icon: '💾' },
  { id: 'shell', name: 'Bash', icon: '⌨️' },
];

const XtermTerminal = ({ language, onAiHint, terminalHistoryRef }: { language: string, onAiHint?: (hint: string) => void, terminalHistoryRef?: React.MutableRefObject<string[]> }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [termInstance, setTermInstance] = useState<any>(null);
  const currentInput = useRef('');
  
  useEffect(() => {
    if (typeof window === 'undefined' || !terminalRef.current) return;
    
    let term: any = null;
    let isMounted = true;
    
    const initTerminal = async () => {
      try {
        const { Terminal } = await import('@xterm/xterm');
        // @ts-ignore
        await import('@xterm/xterm/css/xterm.css');
        if (!isMounted) return;
        
        term = new Terminal({
          theme: { background: '#1e1e1e', foreground: '#00ff00' },
          fontFamily: 'Consolas, Courier New, monospace',
          fontSize: 13,
          cursorBlink: true,
        });
        
        term.open(terminalRef.current!);
        term.write(`\\r\\nWelcome to Tech-Lab Cybersecurity Simulation v1.0\\r\\n`);
        term.write(`user@tech-lab:~$ `);
        
        term.onData((data: string) => {
          const code = data.charCodeAt(0);
          
          if (code === 13) { // Enter
            const input = currentInput.current;
            if (terminalHistoryRef) terminalHistoryRef.current.push(input);
            term.write('\\r\\n');
            const results = processCommand(input, 'cyber-lab');
            
            results.forEach((res: any) => {
              if (res.type === 'error') term.write(`\\x1b[31m${res.text}\\x1b[0m\\r\\n`);
              else if (res.type === 'ai-hint') {
                term.write(`\\x1b[36m${res.text}\\x1b[0m\\r\\n`);
                if (onAiHint) onAiHint(res.text);
              }
              else if (res.text === 'CLEAR_TERMINAL') { term.clear(); }
              else if (res.type !== 'command') term.write(`${res.text}\\r\\n`);
            });
            
            term.write('user@tech-lab:~$ ');
            currentInput.current = '';
          } else if (code === 127) { // Backspace
            if (currentInput.current.length > 0) {
               currentInput.current = currentInput.current.slice(0, -1);
               term.write('\\b \\b');
            }
          } else {
            currentInput.current += data;
            term.write(data);
          }
        });
        
        setTermInstance(term);
      } catch (err) {
        console.error("Failed to load xterm", err);
      }
    };
    
    initTerminal();
    
    return () => {
      isMounted = false;
      if (term) term.dispose();
      if (terminalRef.current) terminalRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;
};

const LabView = ({ user }: { user?: any }) => {
  const { unlockAchievement, addLabSession } = useAppState();
  const isCyberSecurity = user?.course?.toLowerCase().includes('cyber') ?? false;
  const [language, setLanguage] = useState('html');
  const [code, setCode] = useState('');
  const [aiHint, setAiHint] = useState('AI: Ready to assist. Start typing to get suggestions.');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{ analysis: string, isCorrect: boolean } | null>(null);
  const terminalHistoryRef = useRef<string[]>([]);
  
  const handleVerifyTerminal = () => {
    setIsVerifying(true);
    setAiHint("Analyzing your terminal session...");
    setVerificationResult(null);
    
    setTimeout(() => {
      const commands = terminalHistoryRef.current;
      const hasNmap = commands.some(c => c.trim().startsWith('nmap'));
      const hasCatSecrets = commands.some(c => c.trim() === 'cat secrets.txt');
      
      if (hasNmap && hasCatSecrets) {
        setVerificationResult({
          analysis: "Excellent work! You successfully scanned the network and found the hidden secrets file.",
          isCorrect: true
        });
        setAiHint("Great job! Terminal session looks perfect.");
        unlockAchievement('First Code');
        addLabSession(0.5);
      } else if (!hasNmap) {
        setVerificationResult({
          analysis: "You haven't scanned the network yet. Try using 'nmap'.",
          isCorrect: false
        });
        setAiHint("Found some missing steps. Review the analysis.");
      } else {
        setVerificationResult({
          analysis: "Network scanned, but you missed discovering the flag in the secrets file. Keep exploring!",
          isCorrect: false
        });
        setAiHint("Found some missing steps. Review the analysis.");
      }
      setIsVerifying(false);
    }, 1500);
  };
  
  const handleVerifyCode = async () => {
    if (!code.trim()) {
      setAiHint("Please write some code before verifying.");
      return;
    }
    setIsVerifying(true);
    setAiHint("Analyzing your code...");
    setVerificationResult(null);
    
    try {
      const formData = new FormData();
      formData.append('code', code);
      formData.append('language', language);
      const res = await submitCodeForVerification(null, formData);
      
      if (res.isCorrect !== undefined) {
        setVerificationResult({ analysis: res.analysis || '', isCorrect: res.isCorrect });
        setAiHint(res.isCorrect ? "Great job! Code looks correct." : "Found some issues in your code.");
        if (res.isCorrect) {
          unlockAchievement('First Code');
          addLabSession(0.5);
        }
      } else {
        setAiHint("Verification failed.");
      }
    } catch (error) {
      setAiHint("Error communicating with AI.");
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleLanguageChange = (id: string) => {
    setLanguage(id);
    // Optional: Reset code template based on language
    if (id === 'python') setCode('# Start Python script\\nprint("Hello AI")');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold font-display">Practical <span className="text-primary">Lab</span></h1>
        <p className="text-muted-foreground mt-1 text-sm">Experimental space for hands-on technical stimulation.</p>
      </header>
      
      <div style={{ display: 'flex', height: '75vh', minHeight: '600px', backgroundColor: '#181818', color: '#cccccc', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #333' }}>
        
        {isCyberSecurity ? (
          // TERMINAL LAYOUT FOR CYBERSECURITY WITH AI PANEL
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '35px', backgroundColor: '#2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '15px', paddingRight: '15px', fontSize: '12px', borderBottom: '1px solid #000', color: '#aaa', fontWeight: 'bold' }}>
              <span>Terminal Simulation - {user?.course || 'Cybersecurity Lab'}</span>
              <Button 
                size="sm" 
                className="h-6 text-[10px] bg-primary/20 text-primary hover:bg-primary hover:text-white"
                onClick={handleVerifyTerminal}
                disabled={isVerifying}
              >
                {isVerifying ? 'Running...' : 'Run Lab Verification'}
              </Button>
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
              <XtermTerminal language="bash" onAiHint={setAiHint} terminalHistoryRef={terminalHistoryRef} />
            </div>
            
            {/* TERMINAL AI PANEL */}
            <div style={{ height: '30%', borderTop: '1px solid #444', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', zIndex: 20 }}>
                <div style={{ display: 'flex', gap: '20px', padding: '5px 20px', fontSize: '11px', borderBottom: '1px solid #333' }}>
                  <span style={{ borderBottom: '1px solid #fff', cursor: 'pointer', paddingBottom: '2px' }}>TERMINAL ASSESSMENT</span>
                </div>
                <div style={{ flex: 1, padding: '10px', fontFamily: 'Consolas, monospace', fontSize: '13px', overflowY: 'auto' }}>
                  <div style={{ color: '#00ff00', marginBottom: '10px' }}>[AI Hint]: {aiHint}</div>
                  {verificationResult && (
                    <div style={{ color: verificationResult.isCorrect ? '#4ade80' : '#f87171', marginTop: '10px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        [Analysis Result - {verificationResult.isCorrect ? 'PASSED' : 'NEEDS FIXING'}]
                      </div>
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {verificationResult.analysis}
                      </div>
                    </div>
                  )}
                </div>
            </div>
          </div>
        ) : (
          // WEB DEV / OTHER TRACKS LAYOUT with Editor & Bottom Panel
          <>
            {/* 1. ACTIVITY BAR (Thin icon strip on the left) */}
            <div style={{ width: '50px', backgroundColor: '#333333', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px', gap: '20px' }}>
              <div title="Explorer" style={{ cursor: 'pointer', fontSize: '20px' }}>📁</div>
              <div title="Search" style={{ cursor: 'pointer', fontSize: '20px', opacity: 0.5 }}>🔍</div>
              <div title="AI Assistant" style={{ cursor: 'pointer', fontSize: '20px', color: '#007acc' }}>🤖</div>
            </div>

            {/* 2. SIDEBAR (Language Selection) */}
            <div style={{ width: '200px', backgroundColor: '#252526', borderRight: '1px solid #444', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '10px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Languages</div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <div 
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    style={{
                      padding: '8px 15px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      backgroundColor: language === lang.id ? '#37373d' : 'transparent',
                      borderLeft: language === lang.id ? '2px solid #007acc' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <span style={{ fontSize: '10px' }}>{lang.icon}</span> {lang.name}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. MAIN EDITOR AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              
              {/* Editor Header / Tabs */}
              <div style={{ height: '35px', backgroundColor: '#2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '15px' }}>
                <div style={{ backgroundColor: '#1e1e1e', height: '100%', padding: '0 20px', display: 'flex', alignItems: 'center', fontSize: '12px', borderTop: '1px solid #007acc' }}>
                  main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'typescript' ? 'ts' : language === 'cpp' ? 'cpp' : language === 'rust' ? 'rs' : language === 'go' ? 'go' : language === 'java' ? 'java' : language === 'shell' ? 'sh' : language}
                </div>
                <Button 
                  size="sm" 
                  className="h-6 text-[10px] bg-primary/20 text-primary hover:bg-primary hover:text-white"
                  onClick={handleVerifyCode}
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Running...' : 'Run & Verify with AI'}
                </Button>
              </div>

              {/* Monaco Editor */}
              <div style={{ flex: 1, position: 'relative' }}>
                <Editor
                  theme="vs-dark"
                  language={language}
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              {/* 4. TERMINAL & AI PANEL (Bottom) */}
              <div style={{ height: '30%', borderTop: '1px solid #444', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', zIndex: 20 }}>
                <div style={{ display: 'flex', gap: '20px', padding: '5px 20px', fontSize: '11px', borderBottom: '1px solid #333' }}>
                  <span style={{ borderBottom: '1px solid #fff', cursor: 'pointer', paddingBottom: '2px' }}>OUTPUT</span>
                  <span style={{ opacity: 0.6, cursor: 'pointer', paddingBottom: '2px' }}>AI ASSESSMENT</span>
                </div>
                <div style={{ flex: 1, padding: '10px', fontFamily: 'Consolas, monospace', fontSize: '13px', overflowY: 'auto' }}>
                  <div style={{ color: '#00ff00', marginBottom: '10px' }}>[AI Hint]: {aiHint}</div>
                  {verificationResult ? (
                    <div style={{ color: verificationResult.isCorrect ? '#4ade80' : '#f87171', marginTop: '10px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        [Analysis Result - {verificationResult.isCorrect ? 'PASSED' : 'NEEDS FIXING'}]
                      </div>
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {verificationResult.analysis}
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: '#fff' }}>
                      user@tech-lab:~$ <span style={{ color: '#aaa' }}># Running {language} environment...</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 5. STATUS BAR */}
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '22px', backgroundColor: '#007acc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', fontSize: '12px', color: '#fff', zIndex: 30 }}>
                <div>Ready</div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <span>UTF-8</span>
                  <span>{language.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const LibraryView = ({ user }: { user: any }) => {
  const resourceCategories = [
    {
      id: "curriculum",
      name: "Core Curriculum",
      icon: BookOpen,
      description: "Mandatory guides, handbooks, and academic schedules.",
      resources: [
        { name: "Full Curriculum Guide 2026.pdf", size: "2.4 MB", type: "PDF", icon: FileText },
        { name: "Student Handbook.pdf", size: "1.8 MB", type: "PDF", icon: FileText },
        { name: "Academic Calendar.ics", size: "12 KB", type: "Calendar", icon: CalendarIcon },
      ]
    },
    {
      id: "assets",
      name: "Technical Assets",
      icon: Code,
      description: "Code snippets, configuration files, and software templates.",
      resources: [
        { name: "VS Code Configuration.json", size: "4 KB", type: "Config", icon: Code },
        { name: "Starter Project Template.zip", size: "15.2 MB", type: "Archive", icon: Archive },
        { name: "Common Code Snippets.txt", size: "45 KB", type: "Text", icon: FileText },
      ]
    },
    {
      id: "materials",
      name: "Learning Materials",
      icon: Rocket,
      description: "Study cheatsheets, workflow guides, and interview prep.",
      resources: [
        { name: "Industry Workflow Guide.pdf", size: "3.1 MB", type: "PDF", icon: FileText },
        { name: "Cloud Deployment Cheatsheet.pdf", size: "1.2 MB", type: "PDF", icon: FileText },
        { name: "Technical Interview Prep.zip", size: "5.5 MB", type: "Archive", icon: Archive },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Knowledge <span className="text-primary">Repository</span></h1>
          <p className="text-muted-foreground mt-1">The official STEH library for all course-related assets.</p>
        </div>
        <div className="bg-primary/5 px-4 py-2 rounded-full border border-primary/10 flex items-center gap-2 w-fit">
          <Search className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Search Library</span>
        </div>
      </header>

      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-2xl h-auto grid grid-cols-1 sm:grid-cols-3 gap-2 mb-10 border border-border/50">
          {resourceCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="py-3 px-4 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all text-xs md:text-sm font-bold"
              >
                <Icon className="w-4 h-4 mr-2 hidden xs:inline-block" />
                {cat.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {resourceCategories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold font-display">{cat.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.resources.map((res, idx) => {
                const ResIcon = res.icon;
                return (
                  <Card key={idx} className="group hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[4rem] group-hover:from-primary/10 transition-colors" />
                    
                    <CardHeader className="pb-4 relative z-10 px-6 pt-6">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                          <ResIcon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground bg-background/50 backdrop-blur-sm">
                          {res.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-base font-bold mt-4 line-clamp-1 group-hover:text-primary transition-colors">{res.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 relative z-10 px-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Archive className="w-3 h-3" />
                        <span>Size: {res.size}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/10 pt-4 pb-4 border-t border-border/50 relative z-10 px-6">
                      <Button className="w-full h-10 rounded-lg font-bold text-xs gap-2 group/btn transition-all" variant="outline">
                        <Download className="w-3 h-3 group-hover/btn:translate-y-0.5 transition-transform" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const AchievementsView = () => {
  const { achievements } = useAppState();
  const badgesData = [
    { 
      id: "Early Bird",
      name: "Early Bird", 
      icon: Rocket, 
      color: "bg-blue-500",
      requirement: "Start Module 01 ahead of schedule to unlock this badge.",
      pattern: "bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from),transparent_70%)] from-blue-500/10"
    },
    { 
      id: "First Code",
      name: "First Code", 
      icon: Code, 
      color: "bg-primary",
      requirement: "Submit your first lab code to prove technical initiation.",
      pattern: "bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from),transparent_70%)] from-primary/10"
    },
    { 
      id: "7 Day Streak",
      name: "7 Day Streak", 
      icon: Flame, 
      color: "bg-orange-500",
      requirement: "Complete 7 consecutive days of consistent learning activity.",
      pattern: "bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from),transparent_70%)] from-orange-500/10"
    },
    { 
      id: "Skill Master",
      name: "Skill Master", 
      icon: Trophy, 
      color: "bg-yellow-500",
      requirement: "Submit all 12 module assessments and get them fully marked.",
      pattern: ""
    },
    { 
      id: "Expert Mentor",
      name: "Expert Mentor", 
      icon: Users, 
      color: "bg-purple-500",
      requirement: "Granted a professional mentor to work with you as you begin your speciality courses.",
      pattern: ""
    },
    { 
      id: "Course Graduate",
      name: "Course Graduate", 
      icon: GraduationCap, 
      color: "bg-green-500",
      requirement: "Finish your speciality track and final graduation projects.",
      pattern: ""
    },
  ];

  const badges = badgesData.map(b => ({
    ...b,
    unlocked: achievements.includes(b.id),
    status: achievements.includes(b.id) ? "Unlocked" : "Locked"
  }));

  return (
    <div className="space-y-8 relative">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold font-display">Your Achievements</h1>
        <p className="text-muted-foreground mt-1 text-sm">Earn professional badges by hitting key learning milestones.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div 
              key={i} 
              whileHover={{ y: -5, scale: 1.02 }}
              className={cn(
                "p-6 rounded-[2.5rem] md:rounded-[2.5rem] flex flex-col gap-4 transition-all relative overflow-hidden group",
                badge.unlocked 
                  ? "bg-card shadow-xl border-primary/20 border" 
                  : "bg-muted/20 border border-dashed grayscale opacity-80"
              )}
            >
              {badge.unlocked && (
                <div className={cn("absolute inset-0 -z-10 transition-opacity duration-500 opacity-50 group-hover:opacity-100", badge.pattern)} />
              )}
              
              <div className="flex items-start justify-between relative z-10">
                <div className={cn(
                  "w-14 h-14 md:w-16 md:h-14 rounded-[1.25rem] md:rounded-[1.5rem] flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-6 shadow-lg",
                  badge.unlocked ? badge.color : 'bg-muted text-muted-foreground'
                )}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <Badge variant={badge.unlocked ? "default" : "outline"} className={cn(
                  "text-[9px] uppercase tracking-tighter px-3",
                  badge.unlocked ? "bg-green-500 hover:bg-green-600 border-none shadow-sm" : "opacity-50"
                )}>
                  {badge.unlocked ? "Achieved" : "In Progress"}
                </Badge>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-bold text-lg md:text-xl group-hover:text-primary transition-colors">{badge.name}</h3>
                <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed mt-2 min-h-[3rem]">
                  {badge.requirement}
                </p>
              </div>

              <div className="pt-4 mt-auto border-t border-border/50 flex items-center justify-between relative z-10">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{badge.status}</span>
                {!badge.unlocked && <Lock size={12} className="text-muted-foreground/40" />}
                {badge.unlocked && <Star size={12} className="text-yellow-500 animate-pulse" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const SpecialitiesView = ({ user }: { user: any, selectedCourseObj: any }) => {
  const isCurriculumPassed = false; 
  const [isEnvSetup, setIsEnvSetup] = useState(false);

  const roadmapSteps = [
    { 
      id: 1,
      title: "Basics & Concepts", 
      desc: "Core terminology and theoretical frameworks mastered in technical track.", 
      status: isCurriculumPassed ? "Done" : "Locked" 
    },
    { 
      id: 2,
      title: "Environment Setup", 
      desc: "Configuring local development environment, specialized IDEs, and lab tools.", 
      status: !isCurriculumPassed ? "Locked" : (isEnvSetup ? "Done" : "Active") 
    },
    { 
      id: 3,
      title: "Practical Application", 
      desc: "Building your first mini-projects using specialized toolchains.", 
      status: !isEnvSetup ? "Locked" : "Active" 
    },
    { 
      id: 4,
      title: "Advanced Mastery", 
      desc: "Optimizing for performance, security, and enterprise standards.", 
      status: "Locked" 
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Speciality <span className="text-primary">Focus</span></h1>
          <p className="text-muted-foreground mt-1 text-sm">Deep-dive into your chosen track: <span className="text-primary font-bold">{user.specialties[0]}</span></p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 px-4 py-2 rounded-full w-fit">
          <Target className="w-3 h-3 text-primary" />
          Advanced Track
        </div>
      </header>

      <Card className={cn(
        "border-2 transition-all duration-500 overflow-hidden relative rounded-[2rem] md:rounded-[2.5rem]",
        isCurriculumPassed ? "border-primary/20 bg-primary/5" : "border-dashed border-muted-foreground/20 bg-muted/5"
      )}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
        
        <CardContent className="pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 px-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className={cn(
              "w-16 h-16 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-xl transition-all duration-500",
              isCurriculumPassed ? "bg-primary text-white shadow-primary/20" : "bg-muted text-muted-foreground shadow-none"
            )}>
              {isCurriculumPassed ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            </div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl font-display">Activate Specialization</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-md">
                Begin your advanced technical training in <span className="text-foreground font-bold">{user.specialties[0]}</span>. 
                Full track activation requires completion of the core curriculum.
              </p>
            </div>
          </div>
          <Button 
            disabled={!isCurriculumPassed} 
            className={cn(
              "rounded-xl h-14 px-8 font-bold text-base transition-all w-full md:w-auto",
              isCurriculumPassed ? "shadow-xl shadow-primary/20" : "bg-muted text-muted-foreground"
            )}
          >
            {isCurriculumPassed ? "Begin Specialization" : "Locked"}
            {!isCurriculumPassed && <Lock className="ml-2 w-4 h-4 opacity-50" />}
            {isCurriculumPassed && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-border/50 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-muted/10 px-6 py-6">
            <CardTitle className="font-display text-xl md:text-2xl">Technical Roadmap</CardTitle>
            <CardDescription className="text-xs md:text-sm">Progressive milestones for your {user.specialties[0]} mastery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-8 px-6 pb-10">
            {roadmapSteps.map((step, i) => {
              const StepIcon = step.status === 'Done' ? Check : (step.status === 'Active' ? FlaskConical : Lock);
              return (
                <div key={i} className="flex gap-4 items-start relative group">
                  {i < 3 && (
                    <div className={cn(
                      "absolute left-[19px] top-10 w-0.5 h-10 transition-colors duration-500",
                      step.status === 'Done' ? 'bg-primary' : 'bg-border'
                    )} />
                  )}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-background transition-all duration-500 text-xs",
                    step.status === 'Done' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 
                    step.status === 'Active' ? 'bg-accent text-white animate-pulse shadow-lg shadow-accent/20' : 
                    'bg-muted text-muted-foreground'
                  )}>
                    {step.status === 'Done' ? <Check className="w-5 h-5" /> : <span>{i + 1}</span>}
                  </div>
                  <div className="pt-1 flex-grow">
                    <div className="flex items-center justify-between">
                      <p className={cn(
                        "font-bold text-sm md:text-base transition-colors",
                        step.status === 'Locked' ? 'text-muted-foreground' : 'text-foreground'
                      )}>{step.title}</p>
                      {step.status === 'Done' && <Badge variant="secondary" className="text-[8px] bg-green-500/10 text-green-600 h-4 py-0 uppercase font-bold">Verified</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{step.desc}</p>
                    
                    {step.id === 2 && step.status === 'Active' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-primary/5 rounded-xl border border-dashed border-primary/20 space-y-3 shadow-inner"
                      >
                        <div className="flex items-start gap-2">
                          <FlaskConical className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium leading-tight">Have you completed the setup of your local development environment and laboratory tools?</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => setIsEnvSetup(true)} 
                            className="h-8 rounded-lg text-[10px] font-bold shadow-sm shadow-primary/10 flex-1"
                          >
                            Yes, ready to build
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 rounded-lg text-[10px] font-bold bg-background flex-1"
                          >
                            No, view instructions
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ProfileView = ({ user }: { user: any }) => {
  const { achievements, skillAudit } = useAppState();
  const badges = [
    { id: "Early Bird", name: "Early Bird", icon: Rocket, unlocked: achievements.includes("Early Bird") },
    { id: "First Code", name: "First Code", icon: Code, unlocked: achievements.includes("First Code") },
    { id: "7 Day Streak", name: "7 Day Streak", icon: Flame, unlocked: achievements.includes("7 Day Streak") },
    { id: "Skill Master", name: "Skill Master", icon: Trophy, unlocked: achievements.includes("Skill Master") },
    { id: "Expert Mentor", name: "Expert Mentor", icon: Users, unlocked: achievements.includes("Expert Mentor") },
    { id: "Course Graduate", name: "Course Graduate", icon: GraduationCap, unlocked: achievements.includes("Course Graduate") },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold font-display">Your Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your student identity and view your progress.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-md overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          <div className="h-24 bg-primary relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
          <CardContent className="flex flex-col items-center -mt-12 relative z-10 px-6 pb-8">
            <div className="w-24 h-24 rounded-[1.5rem] md:rounded-[2rem] border-4 border-background bg-muted flex items-center justify-center shadow-xl overflow-hidden mb-4">
              <img src="https://picsum.photos/seed/profile/150/150" alt="Avatar" />
            </div>
            <h2 className="text-xl font-bold font-display text-center">{user.fullName}</h2>
            <p className="text-sm text-muted-foreground text-center break-all">{user.email}</p>
            <Badge className="mt-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              STEH Student
            </Badge>
            
            <div className="w-full mt-8 space-y-4">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Account Status</span>
                <span className="text-green-600">Active</span>
              </div>
              <Separator />
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Current Level</span>
                <span className="text-primary text-right">{user.level}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Primary Specialty</span>
                <span className="text-accent text-right">
                  {user.level === 'Introduction / Basic' ? 'Core Track Only' : (user.specialties?.[0] || 'Pending')}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Joined</span>
                <span>Jun 2026</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2rem] md:rounded-[2.5rem]">
            <CardHeader className="px-6 pt-6">
              <div className="flex items-center gap-2">
                <span className="relative w-5 h-5 overflow-hidden rounded-md shrink-0">
                  <Image src="/stehlogo.png" alt="AI" fill className="object-cover" />
                </span>
                <CardTitle className="text-xl md:text-2xl">AI Skill Audit</CardTitle>
              </div>
              <CardDescription className="text-xs md:text-sm">Real-time performance analysis by the STEH AI Mentor.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-6 pb-8">
              {[
                { 
                  label: "Fundamentals", 
                  value: skillAudit.fundamentals, 
                  remark: skillAudit.fundamentals > 50 ? "Excellent retention of course knowledge and quiz performance. Foundation modules are being completed ahead of schedule." : "Needs more core module completions to improve fundamental understanding.",
                  desc: "Course knowledge, quizzes, and completion rate." 
                },
                { 
                  label: "Problem Solving", 
                  value: skillAudit.solving, 
                  remark: skillAudit.solving > 40 ? "Steady progress in lab work execution. Problem-solving skills are developing well." : "Engage in more terminal lab verifications to boost practical problem-solving metrics.",
                  desc: "Assessment and lab work execution." 
                },
                { 
                  label: "Project Execution", 
                  value: skillAudit.execution, 
                  remark: skillAudit.execution > 30 ? "Simulation projects are advancing steadily. High proficiency in executing technical steps." : "Simulation projects are in initial stages. AI is awaiting more data from mid-lab project task submissions.",
                  desc: "Mid-lab simulation project tasks." 
                },
                { 
                  label: "Collaboration", 
                  value: skillAudit.collaboration, 
                  remark: "Proactive engagement detected in AI-driven collaboration surveys and peer peer-reflection activities.",
                  desc: "Peer interaction and learning surveys." 
                },
              ].map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-bold text-sm block">{skill.label}</span>
                      <span className="text-[10px] text-muted-foreground italic">{skill.desc}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      <span className="font-bold text-primary mr-1 underline">AI Remark:</span> {skill.remark}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] md:rounded-[2.5rem]">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl md:text-2xl">Badges & Awards</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3 md:gap-4 px-6 pb-8">
              {badges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div 
                    key={i} 
                    title={badge.name}
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border shadow-sm transition-all",
                      badge.unlocked 
                        ? "bg-primary/10 text-primary border-primary/20" 
                        : "bg-muted/30 text-muted-foreground border-dashed grayscale opacity-50"
                    )}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SettingsView = ({ onLogout }: { onLogout: () => void }) => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [notifications, setNotifications] = useState({
    announcements: true,
    sessions: true,
    mentions: false
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    const newVal = !notifications[key];
    setNotifications(prev => ({ ...prev, [key]: newVal }));
    toast({
      title: "Preference Updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${newVal ? 'enabled' : 'disabled'}.`
    });
  };

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    toast({
      title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: `Interface style updated successfully.`
    });
  };

  const handleMotionToggle = (checked: boolean) => {
    setReduceMotion(checked);
    toast({
      title: checked ? "Reduced Motion On" : "Reduced Motion Off",
      description: `Accessibility preference updated.`
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold font-display">Account Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Personalize your learning experience.</p>
      </header>

      <div className="grid grid-cols-1 max-w-3xl gap-6">
        <Card className="border-border/50 rounded-[2rem] md:rounded-[2.5rem]">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-8">
            {[
              { id: 'announcements', label: "Course Announcements", desc: "New lessons and module releases.", checked: notifications.announcements },
              { id: 'sessions', label: "Live Session Reminders", desc: "Alerts for upcoming workshops.", checked: notifications.sessions },
              { id: 'mentions', label: "Peer Mentions", desc: "When someone replies to your discussions.", checked: notifications.mentions },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <Switch 
                  checked={item.checked} 
                  onCheckedChange={() => toggleNotification(item.id as any)} 
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 rounded-[2rem] md:rounded-[2.5rem]">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-8">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-bold">Dark Mode</p>
                <p className="text-[11px] text-muted-foreground">Toggle between light and dark theme.</p>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={handleThemeToggle} 
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-bold">Reduce Motion</p>
                <p className="text-[11px] text-muted-foreground">Minimize animations for better performance.</p>
              </div>
              <Switch 
                checked={reduceMotion}
                onCheckedChange={handleMotionToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5 rounded-[2rem] md:rounded-[2.5rem]">
          <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 px-6 pb-6">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-destructive">Deactivate Enrollment</h3>
              <p className="text-xs text-muted-foreground mt-1">This will pause your access to all STEH resources.</p>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="rounded-xl font-bold w-full md:w-auto">Deactivate</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[2rem]">
                <AlertDialogHeader>
                  <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <AlertDialogTitle className="font-display text-2xl">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    This action will pause your student enrollment and restrict access to the LMS modules and sessions. You will need to contact administration to reactivate your profile.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-6">
                  <AlertDialogCancel className="rounded-xl font-bold h-12">Keep Learning</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onLogout}
                    className="bg-destructive hover:bg-destructive/90 rounded-xl font-bold h-12"
                  >
                    Confirm Deactivation
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedCourseObj = useMemo(() => {
    return courseData.flatMap(cat => cat.courses).find(c => c.title === user.course);
  }, [user.course]);

  const selectedGradeObj = useMemo(() => {
    return selectedCourseObj?.grades.find(g => g.level === user.level);
  }, [selectedCourseObj, user.level]);

  const durationDays = useMemo(() => {
    if (!selectedGradeObj?.duration) return 30;
    const value = parseFloat(selectedGradeObj.duration.split(' ')[0]);
    return Math.round(value * 30);
  }, [selectedGradeObj]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "lab", label: "Lab", icon: FlaskConical },
    { id: "library", label: "Library", icon: Library },
    { id: "achievements", label: "Achievements", icon: Trophy },
    ...(user.level !== 'Introduction / Basic' ? [{ id: "specialties", label: "Specialities", icon: Target }] : []),
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-primary/20">
          <Image src="/stehlogo.png" alt="Logo" fill className="object-cover" />
        </div>
        <div>
          <span className="font-display font-bold text-xl block">STEH LMS</span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sfaret Tech Hub</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-secondary/50 rounded-3xl p-4 mb-4 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Star size={16} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest">Pro Member</p>
          </div>
          <Progress value={75} className="h-1.5 mb-2" />
          <p className="text-[10px] text-muted-foreground">Subscription: {durationDays} days remaining.</p>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 px-4"
          onClick={onLogout}
        >
          <LogOut size={20} />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      <AIObserver />
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-card border-r flex-col shrink-0 z-20">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-4 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-none">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image src="/stehlogo.png" alt="Logo" fill className="object-cover" />
              </div>
              <span className="font-display font-bold text-sm">STEH LMS</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border shadow-sm">
            <img src="https://picsum.photos/seed/profile/32/32" alt="Avatar" />
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex h-16 bg-background/80 backdrop-blur-md border-b items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-6 font-bold text-[10px] tracking-widest uppercase border-primary/30 text-primary">
              Cohort 2026
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <p className="text-xs font-bold">{user.fullName}</p>
              <p className="text-[10px] text-muted-foreground">{user.course} | {user.level}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-muted overflow-hidden border shadow-sm">
              <img src="https://picsum.photos/seed/profile/40/40" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <DashboardView user={user} selectedCourseObj={selectedCourseObj} selectedGradeObj={selectedGradeObj} />}
                {activeTab === 'courses' && <CourseView user={user} selectedCourseObj={selectedCourseObj} />}
                {activeTab === 'lab' && <LabView user={user} />}
                {activeTab === 'library' && <LibraryView user={user} />}
                {activeTab === 'achievements' && <AchievementsView />}
                {activeTab === 'specialties' && <SpecialitiesView user={user} selectedCourseObj={selectedCourseObj} />}
                {activeTab === 'profile' && <ProfileView user={user} />}
                {activeTab === 'settings' && <SettingsView onLogout={onLogout} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

const AuthForm = ({ onAuthSuccess }: { onAuthSuccess: (user: any) => void }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    course: "",
    level: "",
    specialties: [] as string[],
  });

  const allCourses = useMemo(() => courseData.flatMap(cat => cat.courses), []);
  const selectedCourse = useMemo(() => allCourses.find(c => c.title === formData.course), [allCourses, formData.course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-secondary flex items-center justify-center p-4 py-20"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 shadow-xl"
          >
            <Image src="/stehlogo.png" alt="Logo" fill className="object-cover" />
          </motion.div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary-foreground">
            {isLogin ? "Welcome Back" : "Start Your Journey"}
          </h1>
          <p className="text-sm md:text-base text-secondary-foreground/60 mt-2">
            {isLogin
              ? "Sign in to your STEH member account"
              : "Create your student profile and pick your path"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-[2rem] p-6 sm:p-10 space-y-6 shadow-2xl shadow-primary/5 border border-border/50">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary mb-2">
                <Users size={18} />
                <h3 className="font-bold text-xs md:text-sm uppercase tracking-widest">Personal Account</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2 col-span-full sm:col-span-1"
                    >
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="bg-secondary/50 border-border h-11 rounded-xl"
                        required
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`space-y-2 ${isLogin ? 'col-span-full' : 'col-span-full sm:col-span-1'}`}>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary/50 border-border h-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-secondary/50 border-border h-11 rounded-xl pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="bg-secondary/50 border-border h-11 rounded-xl"
                        required
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pt-4 border-t border-border/50"
              >
                <div className="flex items-center gap-3 text-accent mb-2">
                  <Target size={18} />
                  <h3 className="font-bold text-xs md:text-sm uppercase tracking-widest">Enrollment Selection</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Select Your Course</Label>
                    <Select onValueChange={(val) => setFormData({...formData, course: val, level: "", specialties: []})} required>
                      <SelectTrigger className="h-11 rounded-xl bg-secondary/50">
                        <SelectValue placeholder="Pick a track" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCourses.map(c => (
                          <SelectItem key={c.title} value={c.title}>{c.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Training Level</Label>
                    <Select 
                      disabled={!formData.course} 
                      onValueChange={(val) => setFormData({...formData, level: val, specialties: []})}
                      required
                    >
                      <SelectTrigger className="h-11 rounded-xl bg-secondary/50">
                        <SelectValue placeholder={formData.course ? "Choose level" : "Select course first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCourse?.grades.map(g => (
                          <SelectItem key={g.level} value={g.level}>{g.level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedCourse && formData.level && formData.level !== 'Introduction / Basic' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 size={12} /> Select Your Primary Specialization
                      </Label>
                      <RadioGroup 
                        className="grid grid-cols-1 gap-3 bg-secondary/20 p-4 rounded-2xl"
                        value={formData.specialties[0] || ""}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, specialties: [val] }))}
                      >
                        {selectedCourse.details.map(skill => (
                          <div key={skill} className="flex items-center space-x-3">
                            <RadioGroupItem value={skill} id={skill} />
                            <Label htmlFor={skill} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold gap-2 rounded-2xl shadow-xl shadow-primary/20">
            {isLogin ? "Sign In to Member Area" : "Proceed to Enrollment Fee"}
            <ArrowRight size={20} />
          </Button>
        </form>

        <p className="text-center mt-8 text-secondary-foreground/50 text-sm">
          {isLogin ? "Don't have an account yet?" : "Already a member at STEH?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? "Sign Up Now" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

const PaymentStep = ({ user, onPaymentSuccess }: { user: any, onPaymentSuccess: () => void }) => {
  const [coupon, setCoupon] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const selectedCourseObj = useMemo(() => {
    return courseData.flatMap(cat => cat.courses).find(c => c.title === user.course);
  }, [user.course]);

  const selectedGradeObj = useMemo(() => {
    return selectedCourseObj?.grades.find(g => g.level === user.level);
  }, [selectedCourseObj, user.level]);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  const handleApplyCoupon = () => {
    const validCoupons = ["SFARETSTEH1", "SFARETSTEH2"];
    if (validCoupons.includes(coupon.trim().toUpperCase())) {
      toast({
        title: "Coupon Applied!",
        description: "Your course access is now free. Welcome aboard!",
      });
      onPaymentSuccess();
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please check the code and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-secondary flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-xl border-none shadow-2xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
        <div className="bg-primary p-6 md:p-8 text-primary-foreground text-center relative">
          <div className="absolute top-4 right-4 opacity-20 hidden xs:block">
            <CreditCard size={80} />
          </div>
          <Badge className="bg-white/20 text-white mb-4 border-none px-4 py-1">
            Enrollment Fee
          </Badge>
          <h2 className="text-2xl md:text-3xl font-display font-bold">Secure Your Seat</h2>
          <p className="text-primary-foreground/70 mt-2 text-sm">Finish enrollment for {user.course}</p>
        </div>

        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col xs:flex-row justify-between items-center xs:items-end bg-secondary/30 p-6 rounded-2xl border border-border/50 text-center xs:text-left gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Tuition Fee</p>
              <p className="text-sm font-medium text-foreground">{user.level}</p>
            </div>
            <p className="text-3xl md:text-4xl font-display font-bold text-primary">{selectedGradeObj?.price || "TBD"}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-accent mb-2">
              <Ticket size={18} />
              <h3 className="font-bold text-xs md:text-sm uppercase tracking-widest">Apply Coupon</h3>
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter code" 
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="h-12 rounded-xl bg-secondary/50"
              />
              <Button onClick={handleApplyCoupon} variant="outline" className="h-12 px-6 rounded-xl font-bold border-primary/20 text-primary">
                Apply
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground italic px-2">Enter your unique coupon code for free access if provided.</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="w-full h-14 text-lg font-bold gap-3 rounded-2xl shadow-xl shadow-primary/20"
            >
              {isProcessing ? "Processing..." : "Pay with Flutterwave"}
              {!isProcessing && <CreditCard size={20} />}
            </Button>
            <div className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500" /> Secure encrypted transaction
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function AppPortal() {
  const [splashDone, setSplashDone] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check for existing mock session
    const savedUser = localStorage.getItem('steh_user');
    const savedPaid = localStorage.getItem('steh_isPaid');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsPaid(savedPaid === 'true');
      setSplashDone(true); // Skip splash for authenticated users
    }
    setIsHydrated(true);
  }, []);

  const handleSplashComplete = useCallback(() => setSplashDone(true), []);
  
  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('steh_user', JSON.stringify(userData));
    if (userData.fullName === "") {
      setIsPaid(true);
      localStorage.setItem('steh_isPaid', 'true');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('steh_user');
    localStorage.removeItem('steh_isPaid');
    setUser(null);
    setIsPaid(false);
  };

  if (!isHydrated) return null;

  if (!splashDone) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (user && isPaid) {
    return (
      <AppProvider initialUser={user}>
        <Dashboard user={user} onLogout={handleLogout} />
      </AppProvider>
    );
  }

  if (user && !isPaid) {
    return <PaymentStep user={user} onPaymentSuccess={() => {
      setIsPaid(true);
      localStorage.setItem('steh_isPaid', 'true');
    }} />;
  }

  return <AuthForm onAuthSuccess={handleAuthSuccess} />;
}
