import { WizardProvider } from "@/context/WizardContext";
import PhoneFrame from "@/components/layout/PhoneFrame";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <WizardProvider>
      <PhoneFrame>{children}</PhoneFrame>
    </WizardProvider>
  );
}
