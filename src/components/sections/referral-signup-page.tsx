
'use client';

import * as React from 'react';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitReferral } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, UserPlus, PartyPopper, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? 'Submitting...' : 'Submit Application'}
    </Button>
  );
}

const ReferralSignupPageContent = () => {
  const [state, formAction] = useActionState(submitReferral, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Validation failed' && state.errors) {
      // Let the form fields handle displaying errors
    } else if (state.message === 'Success' && state.data) {
      toast({
        title: 'Application Sent!',
        description: 'Thank you for your interest. We will get back to you shortly.',
      });
      formRef.current?.reset();
    } else if (state.message && state.message !== 'Validation failed' && !state.data) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Your referral code has been copied to the clipboard.',
    });
  };

  return (
    <section id="referral-signup" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {state.message === 'Success' && state.data?.uniqueReferralCode ? (
            <Card className="bg-secondary/30 border-border/50 shadow-lg text-center">
              <CardContent className="pt-12 pb-12">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4">
                    <PartyPopper className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-headline font-bold text-primary">Registration Complete!</h2>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
                  Thank you for signing up! Here is your unique referral code. You can start sharing it right away.
                </p>
                <div className="bg-background/50 border-2 border-dashed border-primary rounded-lg p-4 max-w-sm mx-auto flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-primary">{state.data.uniqueReferralCode}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(state.data.uniqueReferralCode)}>
                        <Copy className="h-5 w-5" />
                        <span className="sr-only">Copy code</span>
                    </Button>
                </div>
                 <p className="text-muted-foreground text-sm mt-4 mb-8">We've also sent this code to your email.</p>
                <Button asChild>
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-secondary/30 border-border/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl text-primary flex items-center justify-center gap-2">
                  <UserPlus />
                  Join our Affiliate Program
                </CardTitle>
                <CardDescription className="pt-2 text-base">
                  Complete the form below to register as a student or affiliate referrer. We'll get in touch with your unique referral code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} action={formAction} className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Your Name" required className="bg-background" />
                    {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="your.email@example.com" required className="bg-background" />
                    {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label>Are you a student at STEH?</Label>
                    <RadioGroup name="studentStatus" required className="flex gap-4 pt-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="student-yes" />
                            <Label htmlFor="student-yes">Yes, I am a current student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="student-no" />
                            <Label htmlFor="student-no">No, I am an external affiliate</Label>
                        </div>
                    </RadioGroup>
                    {state.errors?.studentStatus && <p className="text-sm text-destructive">{state.errors.studentStatus[0]}</p>}
                  </div>

                   <div className="space-y-2">
                    <Label htmlFor="referralId">Preferred Referral ID</Label>
                    <Input id="referralId" name="referralId" placeholder="e.g., yourname123" required className="bg-background" />
                     <p className="text-xs text-muted-foreground pt-1">This will be used to create your unique referral link (e.g., STEH/.../yourname123). Min 3 characters.</p>
                    {state.errors?.referralId && <p className="text-sm text-destructive">{state.errors.referralId[0]}</p>}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="message">Why do you want to be an affiliate?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="e.g., I'm a current student who loves the program, I'm a blogger in the tech space, etc."
                      className="min-h-[120px] bg-background"
                      required
                    />
                    {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
                  </div>
                  <div className="flex justify-end pt-4">
                    <SubmitButton />
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReferralSignupPageContent;
