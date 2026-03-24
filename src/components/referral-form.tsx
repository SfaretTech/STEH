
'use client';

import * as React from 'react';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitReferral } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, UserPlus, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

type ReferralFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Send className="mr-2 h-4 w-4" />
      )}
      {pending ? 'Submitting...' : 'Submit Application'}
    </Button>
  );
};

const ReferralForm = ({ isOpen, onClose }: ReferralFormProps) => {
  const [state, formAction] = useActionState(submitReferral, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    if (state.message === 'Validation failed') {
      // Let the form fields handle displaying errors
    } else if (state.message === 'Success') {
      toast({
        title: 'Application Sent!',
        description: 'Thank you for your interest. We will get back to you shortly.',
      });
      formRef.current?.reset();
      setIsSuccess(true);
    } else if (state.message && state.message !== 'Validation failed') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  const handleClose = () => {
    formRef.current?.reset();
    setIsSuccess(false);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                <UserPlus />
                Join our Affiliate Program
              </DialogTitle>
              <DialogDescription>
                Complete the form below to register as a student or affiliate referrer. We'll get in touch with your unique referral code.
              </DialogDescription>
            </DialogHeader>
            <form ref={formRef} action={formAction} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
                {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                 {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Why do you want to be an affiliate?</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="e.g., I'm a current student, I'm a blogger, etc."
                  className="min-h-[100px]"
                  required
                />
                 {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={handleClose}>
                  Cancel
                </Button>
                <SubmitButton />
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4 mb-4">
                <PartyPopper className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-headline font-bold text-primary">Registration Complete!</h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                Thank you for signing up! We've received your application and will email your unique referral code to you shortly.
            </p>
            <Button onClick={handleClose}>
                Done
            </Button>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReferralForm;
