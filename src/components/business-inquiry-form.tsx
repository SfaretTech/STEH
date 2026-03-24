'use client';

import * as React from 'react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitBusinessInquiry } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Send, Building2, Briefcase, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

type BusinessInquiryFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 font-bold">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? 'Processing...' : 'Send Inquiry'}
    </Button>
  );
};

const BusinessInquiryForm = ({ isOpen, onClose }: BusinessInquiryFormProps) => {
  const [state, formAction] = useActionState(submitBusinessInquiry, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state.message === 'Validation failed') {
      const errorKeys = Object.keys(state.errors || {}) as (keyof typeof state.errors)[];
      errorKeys.forEach(key => {
        const errorMessages = state.errors?.[key];
        if (errorMessages && errorMessages.length > 0) {
          toast({
            title: `Invalid ${key}`,
            description: errorMessages[0],
            variant: 'destructive',
          });
        }
      });
    } else if (state.message === 'Success') {
      toast({
        title: 'Inquiry Sent',
        description: 'Our team will contact you within 24 hours.',
      });
      setIsSuccess(true);
      formRef.current?.reset();
    } else if (state.message && state.message !== 'Validation failed') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary p-6 text-primary-foreground">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-display text-2xl">Enterprise Inquiry</DialogTitle>
                <DialogDescription className="text-primary-foreground/80 font-medium">
                  Partner with STEH for professional digital solutions.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-8">
          {!isSuccess ? (
            <form ref={formRef} action={formAction} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  <Input id="name" name="name" placeholder="Contact Person" required className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email</Label>
                  <Input id="email" name="email" type="email" placeholder="email@company.com" required className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Organization</Label>
                  <Input id="organization" name="organization" placeholder="Company Name" required className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry</Label>
                  <Input id="industry" name="industry" placeholder="e.g. Finance, Education" required className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Service of Interest</Label>
                <Select name="service" required>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Choose a partnership track" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporate Training">Corporate Upskilling</SelectItem>
                    <SelectItem value="Talent Hiring">Talent Hiring (Interns/SIWES)</SelectItem>
                    <SelectItem value="Digital Consultancy">Digital Consultancy</SelectItem>
                    <SelectItem value="Custom Solutions">Custom Tech Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Details / Message</Label>
                <Textarea id="message" name="message" placeholder="How can we help your organization grow?" className="min-h-[120px] rounded-xl resize-none" required />
              </div>

              <div className="pt-4">
                <SubmitButton />
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6">
                <PartyPopper className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">Request Received!</h3>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Thank you for reaching out. A partnership lead will review your request and get back to you shortly.
              </p>
              <Button onClick={handleClose} variant="outline" className="h-12 px-10 rounded-xl font-bold">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessInquiryForm;
