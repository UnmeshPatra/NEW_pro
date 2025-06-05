"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getOnboardingStatus } from '@/lib/onboarding';

export default function ClientRedirector({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window !== 'undefined') {
      const isOnboarded = getOnboardingStatus();

      if (isOnboarded) {
        if (pathname === '/') { // Assuming '/' is the onboarding page
          router.replace('/dashboard');
        }
      } else {
        // If not onboarded and trying to access dashboard, redirect to onboarding
        if (pathname === '/dashboard') {
          router.replace('/');
        }
        // Allow access to '/' (onboarding page) if not onboarded
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
