export type StepName =
  | "email"
  | "otp"
  | "username"
  | "name"
  | "dob"
  | "pronouns"
  | "review"
  | "invite"
  | "success";

export interface DobValue {
  day: string;
  month: string;
  year: string;
}

export interface WizardState {
  email: string;
  newsletter: boolean;
  otp: string;
  isVerified: boolean;
  username: string;
  name: string;
  nameLocked: boolean;
  dob: DobValue;
  pronouns: string;
  inviteCode: string | null;
  completedSteps: StepName[];
  termsAccepted: boolean;
}

export type WizardAction =
  | { type: "SET_FIELD"; field: keyof WizardState; value: unknown }
  | { type: "COMPLETE_STEP"; step: StepName }
  | { type: "RESET" };

/** Ordered list of the 4 "GETTING READY" wizard steps for the progress indicator */
export const WIZARD_STEPS: StepName[] = ["username", "name", "dob", "pronouns"];
