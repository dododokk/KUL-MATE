import { useRef, useState } from "react";
import uploadIcon from "../../assets/signUp/upload.svg";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

type Props = { onComplete: () => void };

type Gender = "male" | "female" | null;

type Errors = {
  userId?: string;
  nickname?: string;
  studentId?: string;
  phone?: string;
  password?: string;
  passwordConfirm?: string;
};

function validate(fields: {
  userId: string;
  nickname: string;
  studentId: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}): Errors {
  const errors: Errors = {};
  if (!/[a-zA-Z]/.test(fields.userId) || fields.userId.length < 6) {
    errors.userId = "아이디에 영문이 포함되어야 합니다.";
  }
  if (fields.nickname.length < 2) {
    errors.nickname = "닉네임은 최소 2자 이상이어야 합니다.";
  }
  if (!fields.studentId) {
    errors.studentId = "학번을 입력해주세요.";
  }
  if (!fields.phone) {
    errors.phone = "전화번호를 입력해주세요.";
  }
  if (!/[!@#$%^&*]/.test(fields.password) || fields.password.length < 8) {
    errors.password = "비밀번호에 특수문자(!@#$%^&*)가 포함되어야 합니다.";
  }
  if (fields.password !== fields.passwordConfirm && fields.passwordConfirm) {
    errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  }
  return errors;
}

export default function SignUpStep3Account({ onComplete }: Props) {
  const [gender, setGender] = useState<Gender>(null);
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [dormFile, setDormFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const newErrors = validate({
      userId,
      nickname,
      studentId,
      phone,
      password,
      passwordConfirm,
    });
    setErrors(newErrors);
    setSubmitted(true);
    if (Object.keys(newErrors).length === 0) {
      onComplete();
    }
  };

  const handleRevalidate = (field: keyof Errors) => {
    if (!submitted) return;
    const newErrors = validate({
      userId,
      nickname,
      studentId,
      phone,
      password,
      passwordConfirm,
    });
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <h2 className="mb-4 text-base font-bold text-[#111827]">
          계정 정보 입력
        </h2>

        {/* 성별 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="flex items-center gap-0.5 text-sm font-semibold text-[#374151]">
            성별 <span className="text-xs text-[#f87171]">*</span>
          </label>
          <div className="flex gap-3">
            {(
              [
                { value: "male", label: "남성" },
                { value: "female", label: "여성" },
              ] as const
            ).map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setGender(value)}
                className={`h-14 flex-1 rounded-xl border-2 text-sm font-bold transition-colors ${
                  gender === value
                    ? "border-[#7a9e82] bg-[rgba(122,158,130,0.1)] text-[#7a9e82]"
                    : "border-[#e5e7eb] bg-white/80 text-[#9ca3af]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 아이디 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">
            아이디
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              handleRevalidate("userId");
            }}
            placeholder="영문 포함 6자 이상"
            className={`h-[46px] w-full rounded-xl border bg-white/80 px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:outline-none ${
              errors.userId
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e5e7eb] focus:border-[#7a9e82]"
            }`}
          />
          {errors.userId && (
            <p className="text-xs text-[#ef4444]">{errors.userId}</p>
          )}
        </div>

        {/* 닉네임 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="flex flex-wrap items-center gap-x-1 text-sm font-semibold text-[#374151]">
            닉네임{" "}
            <span className="text-xs font-normal text-[#9ca3af]">
              서비스에서 사용할 이름 (2~10자)
            </span>
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value.slice(0, 10));
              handleRevalidate("nickname");
            }}
            placeholder="예: 초록고양이, 꿀잠요정"
            className={`h-[46px] w-full rounded-xl border bg-white/80 px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:outline-none ${
              errors.nickname
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e5e7eb] focus:border-[#7a9e82]"
            }`}
          />
          <p className="text-xs text-[#9ca3af]">
            {nickname.length}/10자 · 실명 대신 닉네임으로 표시돼요
          </p>
          {errors.nickname && (
            <p className="text-xs text-[#ef4444]">{errors.nickname}</p>
          )}
        </div>

        {/* 학번 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">학번</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => {
              setStudentId(e.target.value);
              handleRevalidate("studentId");
            }}
            placeholder="202300000"
            className={`h-[46px] w-full rounded-xl border bg-white/80 px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:outline-none ${
              errors.studentId
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e5e7eb] focus:border-[#7a9e82]"
            }`}
          />
          {errors.studentId && (
            <p className="text-xs text-[#ef4444]">{errors.studentId}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">
            전화번호
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              handleRevalidate("phone");
            }}
            placeholder="010-0000-0000"
            className={`h-[46px] w-full rounded-xl border bg-white/80 px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:outline-none ${
              errors.phone
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e5e7eb] focus:border-[#7a9e82]"
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-[#ef4444]">{errors.phone}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleRevalidate("password");
            }}
            placeholder="영문+특수문자 포함 8자 이상"
            className={`h-[46px] w-full rounded-xl border bg-white/80 px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:outline-none ${
              errors.password
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e5e7eb] focus:border-[#7a9e82]"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-[#ef4444]">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              handleRevalidate("passwordConfirm");
            }}
            placeholder="비밀번호를 다시 입력하세요"
            className={`h-[46px] w-full rounded-xl border bg-white/80 px-[17px] text-sm text-black placeholder:text-[#9ca3af] focus:outline-none ${
              errors.passwordConfirm
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e5e7eb] focus:border-[#7a9e82]"
            }`}
          />
          {errors.passwordConfirm && (
            <p className="text-xs text-[#ef4444]">{errors.passwordConfirm}</p>
          )}
        </div>

        {/* 기숙사 합격증 */}
        <div className="flex flex-col gap-1.5">
          <label className="flex flex-wrap items-center gap-x-1 text-sm font-semibold text-[#374151]">
            기숙사 합격증{" "}
            <span className="text-xs font-normal text-[#9ca3af]">
              (선택, 승인 후 모든 기능 이용)
            </span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => setDormFile(e.target.files?.[0] ?? null)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-[120px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[rgba(122,158,130,0.3)] bg-white/50"
          >
            {dormFile ? (
              <p className="text-sm text-[#6b7280]">{dormFile.name}</p>
            ) : (
              <>
                <img src={uploadIcon} alt="" className="h-8 w-8" />
                <p className="text-sm text-[#6b7280]">파일을 클릭하여 업로드</p>
                <p className="text-xs text-[#9ca3af]">
                  JPG, PNG, PDF (최대 5MB)
                </p>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-[#f3f4f6] bg-white/90 px-6 pb-8 pt-[17px] backdrop-blur-sm">
        <button
          type="button"
          onClick={handleSubmit}
          className="h-[52px] w-full rounded-xl text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, rgb(122,158,130) 0%, rgb(5,150,105) 100%)",
          }}
        >
          가입 완료
        </button>
      </div>
    </div>
  );
}
