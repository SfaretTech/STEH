'use client';

import * as React from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavLink } from '@/components/ui/nav-link';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Business', href: '/business' },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNav = (href: string) => {
    setIsMobileMenuOpen(false);
    const isHomepage = pathname === '/';
    if (href.startsWith('/#')) {
      if (isHomepage) {
        const selector = href.substring(1);
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  const NavLinkItem = ({ link, isMobile }: { link: typeof navLinks[0], isMobile: boolean }) => {
    if (link.href.startsWith('/#')) {
      return (
        <Button
          variant="ghost"
          onClick={() => handleNav(link.href)}
          className={cn(
            "justify-start text-sm font-bold transition-colors text-foreground/70 hover:text-primary hover:bg-primary/5",
            isMobile ? "w-full text-lg py-6" : "rounded-full px-4"
          )}
        >
          {link.name}
        </Button>
      );
    }

    return (
      <NavLink
        href={link.href}
        exact={link.href === '/'}
        className={cn(
          "flex items-center text-sm font-bold transition-colors text-foreground/70 hover:text-primary hover:bg-primary/5",
          isMobile ? "w-full px-3 py-6 text-lg rounded-xl" : "rounded-full px-4 py-2"
        )}
        activeClassName="text-primary bg-primary/10"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.name}
      </NavLink>
    );
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <header className="container mx-auto max-w-5xl h-16 bg-background/90 backdrop-blur-xl border border-border/50 rounded-full flex items-center justify-between px-4 sm:px-8 shadow-2xl pointer-events-auto">
        <div className="flex items-center">
           <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-110 shadow-sm animate-logo-spin group-hover:animate-none">
                <Image src="/stehlogo.png" alt="STEH Logo" fill className="object-cover" />
              </div>
              <span className="text-lg font-bold font-headline text-foreground tracking-tight hidden xs:block">
                STEH
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLinkItem key={link.name} link={link} isMobile={false} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="text-foreground hover:bg-secondary border-border/50" />
          
          <Button 
            onClick={() => handleNav('/login')} 
            variant="default" 
            size="sm"
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 h-9 font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20"
          >
            Login
          </Button>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm bg-background border-l border-border text-foreground">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                  <SheetDescription className="text-left">
                    Explore SFARET TECH ecosystem.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <NavLinkItem key={link.name} link={link} isMobile={true} />
                    ))}
                    <Button 
                      onClick={() => handleNav('/login')} 
                      variant="default" 
                      className="w-full text-lg py-6 mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold"
                    >
                      Login
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
