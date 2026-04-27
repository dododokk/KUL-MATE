import { useState } from "react";
import { useNavigate } from "react-router-dom";
import idIcon from "../../assets/login/id.svg";
import passwordIcon from "../../assets/login/password.svg";
import eyeIcon from "../../assets/login/eye.svg";
import eyeOffIcon from "../../assets/login/eye-off.svg";
import mailIcon from "../../assets/login/mail.svg";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex w-full flex-col px-6 pb-10 pt-8">
      <h2
        className="mb-6 text-xl font-bold text-[#111827]"
        style={{ fontFamily: "'Roboto', 'Noto Sans KR', sans-serif" }}
      >
        로그인
      </h2>

      <div className="flex flex-col gap-4">
        {/* ID field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">아이디</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src={idIcon} alt="" width={19} height={18} />
            </span>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-white/80 pl-10 pr-4 text-sm text-black placeholder:text-[#9ca3af] focus:border-[#7a9e82] focus:outline-none"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#374151]">
            비밀번호
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src={passwordIcon} alt="" width={19} height={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-white/80 pl-10 pr-10 text-sm text-black placeholder:text-[#9ca3af] focus:border-[#7a9e82] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <img src={showPassword ? eyeIcon : eyeOffIcon} alt="" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Login button */}
        <button
          type="button"
          onClick={() => navigate("/onboarding")}
          className="mt-2 h-12 w-full rounded-xl text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, rgb(122,158,130) 0%, rgb(5,150,105) 100%)",
          }}
        >
          로그인
        </button>
      </div>

      {/* Find ID / Reset password */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" className="text-sm text-[#6b7280]">
          아이디 찾기
        </button>
        <span className="text-sm text-[#e5e7eb]">|</span>
        <button type="button" className="text-sm text-[#6b7280]">
          비밀번호 초기화
        </button>
      </div>

      {/* Sign up */}
      <div className="mt-8 border-t border-[#f3f4f6] pt-6 text-center text-sm">
        <span className="text-[#6b7280]">아직 계정이 없으신가요? </span>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="font-bold text-[#7a9e82]"
        >
          회원가입
        </button>
      </div>

      {/* Email notice */}
      <div
        className="mt-4 flex gap-3 rounded-xl border border-[rgba(122,158,130,0.15)] p-[17px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(240,250,244,0.8) 0%, rgba(255,255,255,0.9) 100%)",
        }}
      >
        <div className="mt-0.5 shrink-0">
          <img src={mailIcon} alt="" width={17} height={16} />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-semibold text-[#7a9e82]">
            건국대학교 이메일 필요
          </p>
          <p className="text-xs text-[#6b7280]">
            @konkuk.ac.kr 이메일로 인증 후 이용 가능합니다
          </p>
        </div>
      </div>
    </div>
  );
}
