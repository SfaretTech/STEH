'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitInquiry } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
      Send Message
    </Button>
  );
}

const ContactSection = () => {
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
        title: 'Message Sent!',
        description: 'Thank you for your inquiry. We will get back to you shortly.',
      });
      formRef.current?.reset();
    } else if (state.message && state.message !== 'Validation failed') {
       toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-heading">
            <span className="text-primary">Contact</span> Us
          </h2>
          <p className="section-subheading mt-4">
            Have a question or want to learn more? Send us a message and we'll get back to you.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-card border border-border rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold text-card-foreground">Send us an Inquiry</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Fill out the form below and our team will respond as soon as possible.
          </p>

          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-card-foreground">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-card-foreground">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-sm font-medium text-card-foreground">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                className="min-h-[120px] bg-background resize-none"
                required
              />
            </div>
            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
