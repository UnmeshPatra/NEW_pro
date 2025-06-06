
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ClientRedirector from '@/components/ClientRedirector';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'BizSetup',
  description: 'Onboarding and Dashboard for Your Business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <ClientRedirector>
          {children}
        </ClientRedirector>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
