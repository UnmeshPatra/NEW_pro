"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/onboarding/ProgressBar";
import Step1Personal from "@/components/onboarding/Step1Personal";
import Step2Business from "@/components/onboarding/Step2Business";
import Step3Preferences from "@/components/onboarding/Step3Preferences";
import type { PartialOnboardingData, PersonalInfo, BusinessInfo, Preferences, OnboardingData } from "@/types";
import { getOnboardingData, savePartialOnboardingData, completeOnboarding, getOnboardingStatus } from "@/lib/onboarding";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PartialOnboardingData>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const existingData = getOnboardingData();
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  useEffect(() => {
    if (isMounted && getOnboardingStatus()) {
      router.replace('/dashboard');
    }
  }, [isMounted, router]);


  const handleNextStep1 = (data: PersonalInfo) => {
    const updatedData = { ...formData, personalInfo: data };
    setFormData(updatedData);
    savePartialOnboardingData(updatedData);
    setCurrentStep(2);
  };

  const handleNextStep2 = (data: BusinessInfo) => {
    const updatedData = { ...formData, businessInfo: data };
    setFormData(updatedData);
    savePartialOnboardingData(updatedData);
    setCurrentStep(3);
  };

  const handleSubmitStep3 = (data: Preferences) => {
    const finalData = { 
      ...formData, 
      preferences: data 
    } as OnboardingData; // Type assertion after all parts are filled
    
    // Validate if all parts are present before calling completeOnboarding
    if (finalData.personalInfo && finalData.businessInfo && finalData.preferences) {
      setFormData(finalData);
      completeOnboarding(finalData);
      toast({
        title: "Onboarding Complete!",
        description: "Welcome to BizSetup. Redirecting to your dashboard...",
        variant: "default", // Use "default" which will map to accent due to CSS variable setup
      });
      router.push("/dashboard");
    } else {
      // This case should ideally not be reached if forms are structured correctly
      toast({
        title: "Error",
        description: "Some information is missing. Please review your entries.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };
  
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
        {/* Optional: Add a loading spinner here */}
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Welcome to BizSetup!</CardTitle>
          <CardDescription className="text-center">Let's get your business details configured.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          <div className="mt-6">
            {currentStep === 1 && (
              <Step1Personal data={formData.personalInfo} onNext={handleNextStep1} />
            )}
            {currentStep === 2 && (
              <Step2Business data={formData.businessInfo} onNext={handleNextStep2} onBack={handleBack} />
            )}
            {currentStep === 3 && (
              <Step3Preferences data={formData.preferences} onSubmit={handleSubmitStep3} onBack={handleBack} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
