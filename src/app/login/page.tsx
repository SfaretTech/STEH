'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { LogIn, Github, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

/**
 * @fileOverview Login page for STEH.
 * Handles student authentication and redirects to the LMS portal.
 */
export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock authentication logic
    // In a real app, this would verify credentials against a database
    if (email && password) {
      const mockUser = {
        fullName: "Existing Student",
        email: email,
        course: "Web Technologies",
        level: "Fundamental",
        specialties: ["Frontend Development"],
      };

      // Persist session locally for prototype purposes
      localStorage.setItem('steh_user', JSON.stringify(mockUser));
      localStorage.setItem('steh_isPaid', 'true');

      toast({
        title: "Login Successful",
        description: "Welcome back to your STEH learning dashboard!",
      });

      // Redirect to the LMS portal
      router.push('/app');
    } else {
      setIsLoading(false);
      toast({
        title: "Authentication Failed",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border/50 shadow-xl bg-card">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl text-primary">Login to STEH</CardTitle>
              <CardDescription>
                Access your dashboard and continue your tech journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full gap-2 border-secondary-foreground/10 hover:bg-secondary-foreground/5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full gap-2 border-secondary-foreground/10 hover:bg-secondary-foreground/5">
                  <Github className="h-4 w-4" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}