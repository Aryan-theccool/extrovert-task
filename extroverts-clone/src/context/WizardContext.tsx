"use client";

import React, { createContext, useContext, useReducer, useMemo } from "react";
import type { WizardState, WizardAction, StepName } from "@/types/wizard";

const initialState: WizardState = {
  email: "",
  newsletter: false,
  otp: "",
  isVerified: false,
  username: "",
  name: "",
  nameLocked: false,
  dob: { day: "", month: "", year: "" },
  pronouns: "",
  inviteCode: null,
  completedSteps: [],
  termsAccepted: false,
};

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "COMPLETE_STEP":
      return state.completedSteps.includes(action.step)
        ? state
        : { ...state, completedSteps: [...state.completedSteps, action.step] };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface WizardContextValue {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  setField: <K extends keyof WizardState>(field: K, value: WizardState[K]) => void;
  isStepAllowed: (step: StepName) => boolean;
}

const WizardContext = createContext<WizardContextValue | null>(null);

/** The gate each step requires before it may render (linear, one-directional). */
const GATES: Record<StepName, (s: WizardState) => boolean> = {
  email: () => true,
  otp: (s) => s.email.length > 0,
  username: (s) => s.isVerified,
  name: (s) => s.isVerified && s.completedSteps.includes("username"),
  dob: (s) => s.isVerified && s.completedSteps.includes("name"),
  pronouns: (s) => s.isVerified && s.completedSteps.includes("dob"),
  invite: (s) => s.isVerified && s.completedSteps.includes("pronouns"),
  success: (s) => s.isVerified && s.completedSteps.includes("pronouns"),
};

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<WizardContextValue>(
    () => ({
      state,
      dispatch,
      setField: (field, value) => dispatch({ type: "SET_FIELD", field, value }),
      isStepAllowed: (step) => GATES[step](state),
    }),
    [state]
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside WizardProvider");
  return ctx;
}
