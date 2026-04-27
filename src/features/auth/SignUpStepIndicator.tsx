import React from "react";

type Props = { currentStep: 1 | 2 | 3 };

const STEPS = ["약관 동의", "이메일 인증", "계정 정보"];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 6l3 3 5-5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignUpStepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center px-6 pb-6">
      {STEPS.map((label, i) => {
        const num = (i + 1) as 1 | 2 | 3;
        const done = num < currentStep;
        const active = num === currentStep;

        return (
          <React.Fragment key={i}>
            <div className="flex shrink-0 items-center gap-1.5">
              {done ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7a9e82]">
                  <CheckIcon />
                </div>
              ) : active ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#7a9e82] bg-white">
                  <span className="text-xs font-bold text-[#7a9e82]">{num}</span>
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#e5e7eb]">
                  <span className="text-xs font-bold text-[#d1d5db]">{num}</span>
                </div>
              )}
              <span
                className={`text-xs font-semibold ${
                  done || active ? "text-[#7a9e82]" : "text-[#d1d5db]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-1 h-0.5 flex-1 rounded-full ${
                  done ? "bg-[#7a9e82]" : "bg-[#e5e7eb]"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
