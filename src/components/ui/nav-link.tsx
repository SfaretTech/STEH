'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { LinkProps } from 'next/link';

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  activeClassName?: string;
  exact?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, activeClassName, exact = false, children, ...props }, ref) => {
    const pathname = usePathname();
    
    // Logic to determine if the link is active based on the current pathname
    const isActive = exact 
      ? pathname === href 
      : (href === '/' ? pathname === '/' : pathname.startsWith(href.toString()));

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = 'NavLink';

export { NavLink };
