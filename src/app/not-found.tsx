'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * @fileOverview Custom 404 Not Found page for Next.js App Router.
 * Handles non-existent routes and provides a user-friendly way to return home.
 */

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    // Log the error for development/monitoring purposes
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center space-y-4">
        <h1 className="text-7xl md:text-9xl font-extrabold font-headline text-primary/80">404</h1>
        <div className="space-y-2">
          <p className="text-2xl md:text-3xl font-bold font-headline text-foreground">Oops! Page not found</p>
          <p className="text-muted-foreground max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
