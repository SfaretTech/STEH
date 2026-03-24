'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitInquiry } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? 'Submitting...' : 'Submit Registration'}
    </Button>
  );
}

const RegisterPageContent = () => {
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Validation failed') {
      const errorKeys = Object.keys(state.errors || {}) as (keyof typeof state.errors)[];
      errorKeys.forEach(key => {
        const errorMessages = state.errors?.[key];
        if (errorMessages && errorMessages.length > 0) {
          toast({
            title: 'Error',
            description: errorMessages[0],
            variant: 'destructive',
          });
        }
      });
    } else if (state.message === 'Success') {
      toast({
        title: 'Registration Submitted!',
        description: 'Thank you for choosing STEH. We will contact you shortly.',
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
      <div className="container mx-auto px-4 py-24 sm:py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 p-4 rounded-full mb-6"
        >
          <CheckCircle2 className="h-16 w-16 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-bold font-headline text-primary mb-4">Registration Received!</h2>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          Thank you for registering with SFARET TECH EDU HUB. A career advisor will review your details and reach out via email or phone within 24 hours.
        </p>
        <Button asChild variant="outline">
          <a href="/">Return to Homepage</a>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl mb-4">
              Register with STEH
            </h1>
            <p className="text-lg text-muted-foreground">
              Join SFARET TECH EDU HUB and start your tech journey today. 
              Fill out the form below to get started.
            </p>
          </div>

          <Card className="border-border/50 shadow-xl bg-card">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Student Application</CardTitle>
              <CardDescription>
                Provide your details and we&apos;ll help you select the best track for your goals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="080 1234 5678" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course of Interest</Label>
                  <Select name="course">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-dev">Web Technologies</SelectItem>
                      <SelectItem value="graphics">Graphics Design</SelectItem>
                      <SelectItem value="iot">IoT & Smart Automation</SelectItem>
                      <SelectItem value="microsoft">Microsoft Packages</SelectItem>
                      <SelectItem value="undecided">Not sure yet (Talk to Advisor)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Any additional information?</Label>
                  <Input 
                    id="message" 
                    name="message" 
                    placeholder="Tell us about your background or goals..." 
                    required 
                  />
                </div>

                <div className="pt-4">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterPageContent;
