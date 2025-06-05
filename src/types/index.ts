export interface PersonalInfo {
  name: string;
  email: string;
}

export interface BusinessInfo {
  companyName: string;
  industry: string;
  size: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
}

export interface Preferences {
  theme: 'light' | 'dark' | 'system';
  defaultDashboardLayout: 'compact' | 'spacious' | 'widgets';
}

export interface OnboardingData {
  personalInfo: PersonalInfo;
  businessInfo: BusinessInfo;
  preferences: Preferences;
}

export interface PartialOnboardingData {
  personalInfo?: PersonalInfo;
  businessInfo?: BusinessInfo;
  preferences?: Preferences;
}
