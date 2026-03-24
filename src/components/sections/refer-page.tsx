
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Users, DollarSign, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ReferPageContent = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'You Earn',
      description: 'Receive a cash reward or a discount on your next course for every friend who successfully enrolls and pays their fees.'
    },
    {
      icon: Gift,
      title: 'Your Friend Gets a Bonus',
      description: 'Your friend will receive a special welcome discount on their tuition fee when they sign up using your referral code.'
    },
    {
      icon: Users,
      title: 'Build Our Community',
      description: 'Help us grow our vibrant community of learners and innovators. The more we grow, the more opportunities for everyone.'
    },
  ];

  return (
    <>
      <section id="refer-hero" className="relative bg-background py-24 sm:py-32 overflow-hidden">
         <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxyZWZlcnJhbCUyMGJvbnVzfGVufDB8fHx8MTc1NjQ4NDQwNHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="People happily collaborating on a project"
            fill
            className="object-cover"
            data-ai-hint="referral bonus"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
              Refer a Friend, Get Rewarded
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-foreground/80">
              Love learning with STEH? Share the experience with your friends and earn rewards for both of you!
            </p>
          </div>
        </div>
      </section>
      
      <section id="how-it-works" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-foreground">
              How It Works
            </h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                It's as easy as 1, 2, 3.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">1</div>
              <h3 className="text-xl font-headline font-semibold mb-2">Register & Share</h3>
              <p className="text-muted-foreground">Sign up for the program to get your unique referral code, then share it with your friends.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">2</div>
              <h3 className="text-xl font-headline font-semibold mb-2">They Enroll</h3>
              <p className="text-muted-foreground">Your friend signs up for any course using your referral code and successfully completes their payment.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">3</div>
              <h3 className="text-xl font-headline font-semibold mb-2">You Both Win!</h3>
              <p className="text-muted-foreground">You receive your reward, and your friend gets their discount. It's a win-win!</p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 sm:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-primary">
                The Perks of Sharing
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Referring is more than just getting a discount. It's about sharing opportunity.
            </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                    <Card key={index} className="bg-background/50 border-border/50 shadow-md hover:shadow-primary/10 transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <benefit.icon className="h-10 w-10 text-primary" />
                            <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

       <section id="cta" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground">
                Ready to Start Referring?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Register as a student or affiliate to get your unique code. Start sharing today and earn rewards!
            </p>
            <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/referral-signup">
                    <UserPlus className="mr-2" />
                    Register as an Affiliate
                  </Link>
                </Button>
            </div>
        </div>
      </section>
    </>
  );
};

export default ReferPageContent;
