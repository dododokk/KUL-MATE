import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = { onNext: () => void };

function CheckboxIcon() {
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

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
        checked ? "border-[#7a9e82] bg-[#7a9e82]" : "border-[#d1d5db]"
      }`}
    >
      {checked && <CheckboxIcon />}
    </button>
  );
}

export default function SignUpStep1Terms({ onNext }: Props) {
  const navigate = useNavigate();
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const agreeAll = agreePrivacy && agreeTerms;

  const handleToggleAll = () => {
    const next = !agreeAll;
    setAgreePrivacy(next);
    setAgreeTerms(next);
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <h2 className="mb-4 text-base font-bold text-[#111827]">
          서비스 이용약관
        </h2>

        {/* 전체 동의 */}
        <div className="mb-4 rounded-xl border border-[rgba(122,158,130,0.15)] bg-white/80 p-[17px]">
          <label className="flex cursor-pointer items-center gap-3">
            <Checkbox checked={agreeAll} onChange={handleToggleAll} />
            <span className="text-sm font-bold text-[#111827]">전체 동의</span>
          </label>
        </div>

        {/* 개별 약관 */}
        <div className="flex flex-col gap-3 pl-2">
          {/* 개인정보 처리방침 */}
          <div className="rounded-xl border border-[#f3f4f6] bg-white/70 p-[17px]">
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={agreePrivacy}
                onChange={() => setAgreePrivacy((v) => !v)}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-[#1f2937]">
                  [필수] 개인정보 처리방침
                </span>
                <p className="text-xs text-[#9ca3af]">
                  기숙사 합격증 등 주요 개인정보는 관리자 승인 후 즉시
                  폐기됩니다.
                </p>
              </div>
            </label>
          </div>

          {/* 서비스 이용약관 */}
          <div className="rounded-xl border border-[#f3f4f6] bg-white/70 p-[17px]">
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={agreeTerms}
                onChange={() => setAgreeTerms((v) => !v)}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-[#1f2937]">
                  [필수] 서비스 이용약관
                </span>
                <p className="text-xs text-[#9ca3af]">
                  KUL:MATE 서비스 이용에 관한 약관입니다.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-[#f3f4f6] bg-white/90 px-6 pb-8 pt-[17px] backdrop-blur-sm">
        <button
          type="button"
          onClick={onNext}
          disabled={!agreeAll}
          className={`h-[52px] w-full rounded-xl text-sm font-bold text-white transition-opacity ${
            agreeAll ? "opacity-100" : "opacity-50"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgb(122,158,130) 0%, rgb(5,150,105) 100%)",
          }}
        >
          다음
        </button>
        <p className="mt-3 text-center text-sm">
          <span className="text-[#6b7280]">이미 계정이 있으신가요? </span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-bold text-[#7a9e82]"
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}
