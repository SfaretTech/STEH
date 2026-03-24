'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getCourseRecommendation } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const initialState = {
  message: '',
  errors: null,
  recommendation: null,
};

function SubmitButton({ isDisabled }: { isDisabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || isDisabled} className="mt-4">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      {pending ? 'Thinking...' : 'Get Recommendation'}
    </Button>
  );
}

const Advisor = () => {
  const [state, formAction] = useActionState(getCourseRecommendation, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (state.message === 'Validation failed' && state.errors?.interests) {
      toast({
        title: 'Error',
        description: state.errors.interests[0],
        variant: 'destructive',
      });
    } else if (state.message === 'Success') {
      toast({
        title: 'Recommendation Ready!',
        description: 'See the results below.',
      });
    } else if (state.message !== '' && state.message !== 'Success' && state.message !== 'Validation failed') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <section id="advisor" className="py-20 bg-background">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">
            AI <span className="text-primary">Course Advisor</span>
          </h2>
          <p className="section-subheading mt-4">
            Not sure where to start? Describe your interests and goals, and our AI will
            suggest the perfect course for you.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card rounded-lg border border-border p-8 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold text-card-foreground text-lg">
              Tell us what you're passionate about
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            For example: "I love designing beautiful interfaces and want to learn how to build them" or "I want to build
            smart home devices."
          </p>
          
          <form ref={formRef} action={formAction}>
            <textarea
              name="interests"
              className="w-full border border-input rounded-md p-4 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none min-h-[120px]"
              placeholder="Enter your interests and career goals here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <SubmitButton isDisabled={!input.trim()} />
          </form>

          <AnimatePresence>
            {state.recommendation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 p-6 border border-primary/20 rounded-lg bg-primary/5 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h4 className="font-display font-bold text-primary">Our Recommendation:</h4>
                </div>
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {state.recommendation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Advisor;
