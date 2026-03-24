'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Send, Rocket, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { submitIncubationApplication } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 font-bold text-lg">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? 'Submitting...' : 'Submit Application'}
    </Button>
  );
}

export default function IncubationApplyPage() {
  const [state, formAction] = useActionState(submitIncubationApplication, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Validation failed') {
      const errorKeys = Object.keys(state.errors || {}) as (keyof typeof state.errors)[];
      errorKeys.forEach(key => {
        const errorMessages = state.errors?.[key];
        if (errorMessages && errorMessages.length > 0) {
          toast({
            title: 'Invalid Input',
            description: `${key}: ${errorMessages[0]}`,
            variant: 'destructive',
          });
        }
      });
    } else if (state.message === 'Success') {
      toast({
        title: 'Application Received!',
        description: 'Our venture builders will review your idea and contact you.',
      });
      formRef.current?.reset();
    } else if (state.message && state.message !== 'Success' && state.message !== 'Validation failed') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  if (state.message === 'Success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold font-display mb-4">Application Submitted!</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Thank you for applying to the SFARET INNOVATION HUB. Your idea has been queued for screening. Your Application is proressing and wait for you to get notified on the next stage if you are selected.
        </p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/sih">Return to Hub</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col py-12 px-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container max-w-3xl mx-auto relative z-10">
        <Link href="/sih" className="inline-flex items-center text-sm font-bold text-primary mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to SIH Hub
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-10 text-center md:text-left">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-6 shadow-xl shadow-primary/20 mx-auto md:mx-0">
              <Rocket className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold font-display tracking-tight text-foreground mb-4">
              Apply for <span className="text-primary">Incubation</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Source raw ideas. Refine them. Scale them. Tell us about your startup vision.
            </p>
          </div>

          <Card className="border-border/50 shadow-2xl bg-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Incubation Details</CardTitle>
              <CardDescription>
                Provide detailed information about your project or early-stage company.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Founder Full Name</Label>
                    <Input id="name" name="name" placeholder="Contact person" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work/Founder Email</Label>
                    <Input id="email" name="email" type="email" placeholder="email@startup.com" required className="rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startupName">Startup/Project Name</Label>
                    <Input id="startupName" name="startupName" placeholder="e.g. AgriFlow" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Select name="sector" required>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI & Automation">AI & Automation</SelectItem>
                        <SelectItem value="EduTech">EduTech</SelectItem>
                        <SelectItem value="FinTech">FinTech</SelectItem>
                        <SelectItem value="AgricTech">AgricTech</SelectItem>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label htmlFor="stage">Current Stage</Label>
                    <Select name="stage" required>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Current progress" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                        <SelectItem value="MVP/Prototype">MVP/Prototype</SelectItem>
                        <SelectItem value="Early Revenue">Early Revenue</SelectItem>
                        <SelectItem value="Scaling">Scaling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Select name="teamSize" required>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Solo Founder">Solo Founder</SelectItem>
                        <SelectItem value="2-4 members">2-4 members</SelectItem>
                        <SelectItem value="5-10 members">5-10 members</SelectItem>
                        <SelectItem value="10+ members">10+ members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem">What problem are you solving?</Label>
                  <Textarea 
                    id="problem" 
                    name="problem" 
                    placeholder="Describe the pain point clearly..." 
                    required 
                    className="min-h-[100px] rounded-xl resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">What is your proposed solution?</Label>
                  <Textarea 
                    id="solution" 
                    name="solution" 
                    placeholder="Describe how your tech solves the problem..." 
                    required 
                    className="min-h-[100px] rounded-xl resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitchLink">Pitch Deck / Business Plan Link</Label>
                  <Input id="pitchLink" name="pitchLink" placeholder="Google Drive, Dropbox, or Website link" required className="rounded-xl" />
                </div>

                <div className="pt-4">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
