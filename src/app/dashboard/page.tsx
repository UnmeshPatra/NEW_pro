"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboardingData, getOnboardingStatus, clearOnboardingData } from "@/lib/onboarding";
import type { OnboardingData } from "@/types";
import UserInfoCard from "@/components/dashboard/UserInfoCard";
import MetricCard from "@/components/dashboard/MetricCard";
import WeeklyProgressChart from "@/components/dashboard/WeeklyProgressChart";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Users, Briefcase, Bell } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const [teamMembersCount, setTeamMembersCount] = useState<string | number>("0");
  const [activeProjects, setActiveProjects] = useState<number>(0);
  const [notifications, setNotifications] = useState<number>(0);


  useEffect(() => {
    setIsMounted(true);
    if (!getOnboardingStatus()) {
      router.replace("/");
    } else {
      const data = getOnboardingData() as OnboardingData | null; // Assuming full data by now
      setUserData(data);
      if (data?.businessInfo?.size) {
        setTeamMembersCount(data.businessInfo.size);
      }
       // Generate dynamic data client-side
      setActiveProjects(Math.floor(Math.random() * 10) + 1);
      setNotifications(Math.floor(Math.random() * 5));
    }
  }, [router]);


  const handleResetOnboarding = () => {
    clearOnboardingData();
    router.replace("/");
  };

  if (!isMounted || !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
        <p>Loading Dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Button onClick={handleResetOnboarding} variant="outline" size="sm">
            Reset Onboarding
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-headline">
            Welcome back, {userData.personalInfo?.name?.split(' ')[0] || "User"}!
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your business.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <UserInfoCard 
            name={userData.personalInfo?.name} 
            email={userData.personalInfo?.email}
            companyName={userData.businessInfo?.companyName}
          />
          <MetricCard title="Team Members" value={teamMembersCount} icon={Users} description="Current team size" />
          <MetricCard title="Active Projects" value={activeProjects} icon={Briefcase} description="Projects currently in progress" />
          <MetricCard title="Notifications" value={notifications} icon={Bell} description="Unread notifications" />
        </div>

        <div>
          <WeeklyProgressChart />
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} BizSetup. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
