
'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CheckCircle, X, Users, BrainCircuit, Gift } from 'lucide-react';
import { Badge } from './ui/badge';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Link from 'next/link';

const CareerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // Delay popup by 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 23000); // 23 seconds

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);


  const slides = [
    {
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx0ZWNoJTIwY2FyZWVyfGVufDB8fHx8MTc1NDgzMjA3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      aiHint: "tech career",
      title: "Unlock Your Tech Career!",
      description: "Join STEH and gain the skills and support needed to launch a successful career in technology.",
      content: (
        <>
          <h4 className="font-semibold mb-3 text-foreground">Career Incentives:</h4>
          <ul className="space-y-2">
            {[
              'Hands-on practical tech skills',
              'Access to a career support network',
              'Monetization and income opportunities',
              'Build a professional work portfolio',
              'Receive a verified STEH certification',
              'Ongoing mentorship and support',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </>
      ),
      footer: (
        <div className="flex justify-between items-center">
            <div>
                <span className="text-sm font-semibold">Deadline: </span>
                <Badge variant="secondary">Ongoing</Badge>
            </div>
             <Button asChild onClick={() => setIsOpen(false)} size="sm">
                <Link href="/courses">Explore Courses</Link>
            </Button>
        </div>
      ),
    },
    {
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzdHVkZW50JTIwbGVhcm5pbmd8ZW58MHx8fHwxNzU1NTY2OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      aiHint: "student learning",
      title: "Registration is Ongoing!",
      description: "Onboarding: Get yourself a skill in demand and use our AI advisor to find the perfect fit for you.",
      content: (
        <ul className="space-y-3">
            <li className="flex items-start">
                <BrainCircuit className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold">Acquire In-Demand Skills</h4>
                    <p className="text-muted-foreground text-sm">Choose from web development, design, IoT, and more.</p>
                </div>
            </li>
             <li className="flex items-start">
                <Users className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold">15 Spaces Available Per Month</h4>
                    <p className="text-muted-foreground text-sm">We keep classes small for personalized attention.</p>
                </div>
            </li>
        </ul>
      ),
      footer: (
        <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Maybe Later
            </Button>
            <Button onClick={() => {
                const advisorEl = document.querySelector('#advisor');
                if (advisorEl) advisorEl.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
            }}>
                Try AI Advisor
            </Button>
        </div>
      ),
    },
    {
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxyZWZlcnJhbCUyMGJvbnVzfGVufDB8fHx8MTc1NjQ4NDQwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      aiHint: "referral bonus",
      title: "Refer a Friend, Earn Rewards!",
      description: "Love learning with us? Share the experience with your friends and you both get rewarded.",
      content: (
         <ul className="space-y-3">
            <li className="flex items-start">
                <Gift className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold">You Earn, They Save</h4>
                    <p className="text-muted-foreground text-sm">You get a cash reward for every friend who enrolls, and they get a discount on their fees.</p>
                </div>
            </li>
             <li className="flex items-start">
                <Users className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold">Build the Community</h4>
                    <p className="text-muted-foreground text-sm">Help us grow our vibrant network of tech learners and innovators.</p>
                </div>
            </li>
        </ul>
      ),
      footer: (
        <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Not Now
            </Button>
            <Button asChild onClick={() => setIsOpen(false)}>
                <Link href="/refer">Learn More</Link>
            </Button>
        </div>
      ),
    },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
         <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
                {slides.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative h-48 md:h-full w-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    data-ai-hint={slide.aiHint}
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="p-6">
                                    <DialogHeader className="mb-4 text-left">
                                        <DialogTitle className="font-headline text-2xl text-primary">{slide.title}</DialogTitle>
                                        <DialogDescription className="pt-2">
                                            {slide.description}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div>
                                        {slide.content}
                                    </div>
                                </div>
                                <div className="p-6 pt-0 mt-auto">
                                    {slide.footer}
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
         </Carousel>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 w-2 rounded-full ${current === index ? 'bg-primary' : 'bg-muted'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
         <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full h-8 w-8 z-10"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CareerPopup;
