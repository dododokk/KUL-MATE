import { useState } from "react";

type Props = { onNext: () => void };
type EmailStep = "input" | "codeSent" | "verified";

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

export default function SignUpStep2Email({ onNext }: Props) {
  const [emailStep, setEmailStep] = useState<EmailStep>("input");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [code, setCode] = useState("");

  const handleSend = () => {
    if (!email.endsWith("@konkuk.ac.kr")) {
      setEmailError("건국대학교 이메일(@konkuk.ac.kr)만 사용 가능합니다.");
      return;
    }
    setEmailError("");
    setEmailStep("codeSent");
  };

  const handleResend = () => {
    setCode("");
    setEmailStep("codeSent");
  };

  const handleVerify = () => {
    if (code === "123456") {
      setEmailStep("verified");
    }
  };

  const verified = emailStep === "verified";

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#111827]">
            건국대 이메일 인증
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            @konkuk.ac.kr 이메일로 인증번호를 발송합니다.
          </p>
        </div>

        {/* 학교 이메일 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">
            학교 이메일
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="example@konkuk.ac.kr"
              disabled={verified}
              className={`h-[46px] flex-1 rounded-xl border border-[#e5e7eb] px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:border-[#7a9e82] focus:outline-none ${
                verified ? "bg-[#f9fafb]" : "bg-white/80"
              }`}
            />
            <button
              type="button"
              onClick={emailStep === "codeSent" ? handleResend : handleSend}
              disabled={verified}
              className={`h-[46px] rounded-xl px-4 text-sm font-bold text-white transition-opacity ${
                verified ? "opacity-50" : "opacity-100"
              }`}
              style={{ background: "#7a9e82" }}
            >
              {emailStep === "codeSent" ? "재발송" : "발송"}
            </button>
          </div>
          {emailError && (
            <p className="text-xs text-[#ef4444]">{emailError}</p>
          )}
        </div>

        {/* 인증번호 입력 (이메일 발송 후) */}
        {emailStep === "codeSent" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#374151]">
              인증번호
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="인증번호 6자리 입력"
                maxLength={6}
                className="h-[46px] flex-1 rounded-xl border border-[#e5e7eb] bg-white/80 px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:border-[#7a9e82] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleVerify}
                className="h-[46px] rounded-xl bg-[#f3f7f4] px-4 text-sm font-bold text-[#7a9e82]"
              >
                확인
              </button>
            </div>
            <p className="text-xs text-[#9ca3af]">테스트: 123456</p>
          </div>
        )}

        {/* 인증 완료 배너 */}
        {verified && (
          <div
            className="mt-4 flex items-center gap-3 rounded-xl border border-[rgba(122,158,130,0.2)] p-[17px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(122,158,130,0.08) 0%, rgba(255,255,255,0.9) 100%)",
            }}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7a9e82]">
              <CheckIcon />
            </div>
            <span className="text-sm font-semibold text-[#7a9e82]">
              이메일 인증 완료!
            </span>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-[#f3f4f6] bg-white/90 px-6 pb-8 pt-[17px] backdrop-blur-sm">
        <button
          type="button"
          onClick={onNext}
          disabled={!verified}
          className={`h-[52px] w-full rounded-xl text-sm font-bold text-white transition-opacity ${
            verified ? "opacity-100" : "opacity-50"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgb(122,158,130) 0%, rgb(5,150,105) 100%)",
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
