import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <Progress value={progressPercentage} className="w-full h-2" />
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
