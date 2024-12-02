import create from "zustand";

interface OnboardingState {
  currentStep: number;
  flowCompleted: boolean;
  setCurrentStep: (step: number) => void;
  setFlowCompleted: (completed: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0, // Починаємо з першого етапу
  flowCompleted: false, // Чи завершено флоу
  setCurrentStep: (step) => set({ currentStep: step }),
  setFlowCompleted: (completed) => set({ flowCompleted: completed }),
}));
