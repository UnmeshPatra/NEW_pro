import type { PartialOnboardingData, OnboardingData } from '@/types';

const ONBOARDING_DATA_KEY = 'bizSetupOnboardingData';
const ONBOARDING_STATUS_KEY = 'bizSetupOnboardingStatus';

export const savePartialOnboardingData = (data: PartialOnboardingData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(data));
  }
};

export const getOnboardingData = (): PartialOnboardingData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(ONBOARDING_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const completeOnboarding = (data: OnboardingData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(data));
    localStorage.setItem(ONBOARDING_STATUS_KEY, 'true');
  }
};

export const getOnboardingStatus = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ONBOARDING_STATUS_KEY) === 'true';
  }
  return false;
};

export const clearOnboardingData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ONBOARDING_DATA_KEY);
    localStorage.removeItem(ONBOARDING_STATUS_KEY);
  }
};
