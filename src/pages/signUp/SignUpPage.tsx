import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpStep1Terms from "../../features/auth/SignUpStep1Terms";
import SignUpStep2Email from "../../features/auth/SignUpStep2Email";
import SignUpStep3Account from "../../features/auth/SignUpStep3Account";
import SignUpStepIndicator from "../../features/auth/SignUpStepIndicator";

type Step = 1 | 2 | 3;

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 5L7.5 10L12.5 15"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  const handleBack = () => {
    if (step === 1) navigate("/login");
    else setStep((s) => (s - 1) as Step);
  };

  return (
    <div
      className="flex h-screen w-full flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgb(240,250,244) 0%, rgb(255,255,255) 60%)",
      }}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center px-4 pb-4 pt-14">
        <button
          type="button"
          onClick={handleBack}
          className="mr-2 flex h-8 w-8 items-center justify-center"
        >
          <BackArrow />
        </button>
        <h1 className="text-lg font-bold text-[#111827]">회원가입</h1>
      </div>

      {/* Step indicator */}
      <SignUpStepIndicator currentStep={step} />

      {/* Step content */}
      {step === 1 && <SignUpStep1Terms onNext={() => setStep(2)} />}
      {step === 2 && <SignUpStep2Email onNext={() => setStep(3)} />}
      {step === 3 && (
        <SignUpStep3Account onComplete={() => navigate("/login")} />
      )}
    </div>
  );
}
