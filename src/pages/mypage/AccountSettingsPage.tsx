import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/mypage/profile.svg";
import changePwIcon from "../../assets/mypage/change-pw.svg";
import logoutIcon from "../../assets/mypage/log-out.svg";
import withdrawlIcon from "../../assets/mypage/withdrawl.svg";
import type { AccountInfo } from "../../features/mypage/types";

const MOCK_ACCOUNT: AccountInfo = {
  userId: "kuluser01",
  studentId: "202300001",
  email: "hong@konkuk.ac.kr",
  phone: "010-1234-5678",
};

function ChevronDown() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M11 6.5L6 1.5L1 6.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WithdrawModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-[24px]"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] p-[24px] w-full max-w-[384px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center pb-[12px]">
          <div className="bg-[#fef2f2] flex items-center justify-center rounded-[16px] size-[48px]">
            <img src={withdrawlIcon} alt="" className="w-[24px] h-[24px]" />
          </div>
        </div>

        {/* Title + desc */}
        <h3 className="font-bold text-[#111827] text-[16px] leading-[24px] text-center pb-[4px]">
          정말 탈퇴하시겠어요?
        </h3>
        <p className="font-normal text-[#6b7280] text-[14px] leading-[20px] text-center pb-[16px]">
          모든 데이터가 영구 삭제되며 복구할 수 없어요.
        </p>

        {/* Password field */}
        <div className="pb-[16px]">
          <label className="font-semibold text-[#374151] text-[14px] leading-[20px] block pb-[6px]">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full h-[46px] bg-white border border-[#e5e7eb] rounded-[12px] px-[17px] text-[14px] leading-[20px] text-[#111827] placeholder-[#9ca3af] outline-none focus:border-[#7a9e82]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-[12px]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[46px] flex items-center justify-center border border-[#e5e7eb] rounded-[16px]"
          >
            <span className="font-semibold text-[#4b5563] text-[14px] leading-[20px]">취소</span>
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-[46px] flex items-center justify-center bg-[#f87171] rounded-[16px]"
          >
            <span className="font-bold text-white text-[14px] leading-[20px]">탈퇴하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountSettingsPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("초록고양이");
  const [phone, setPhone] = useState(MOCK_ACCOUNT.phone);
  const [pwExpanded, setPwExpanded] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const MAX_NICKNAME = 10;

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundImage: "linear-gradient(160deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 60%)" }}
    >
      {/* Header spacer */}
      <div className="h-[104px]" />

      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-10 h-[104px] pt-[56px] pb-[16px] px-[20px] flex items-end">
        <div className="flex items-center w-full">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-[32px] mr-[8px]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-bold text-[#111827] text-[16px] leading-[24px] flex-1">계정 설정</h1>
          <button type="button" className="font-bold text-[#7a9e82] text-[14px] leading-[20px]">
            저장
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-[20px] pb-[40px]">
        {/* Profile avatar */}
        <div className="flex flex-col items-center py-[16px]">
          <div
            className="flex items-center justify-center rounded-[16px] border-2 border-[rgba(122,158,130,0.2)] p-[2px] size-[80px] mb-[8px]"
            style={{ backgroundImage: "linear-gradient(135deg, rgb(226,238,228) 0%, rgb(209,250,229) 100%)" }}
          >
            <img src={profileIcon} alt="" className="w-[37px] h-[37px]" />
          </div>
          <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px]">기본 프로필 아이콘 사용 중</span>
        </div>

        {/* 프로필 정보 */}
        <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] rounded-[16px] p-[21px] mb-[16px]">
          <p className="font-bold text-[rgba(122,158,130,0.6)] text-[12px] leading-[16px] tracking-[0.3px] mb-[16px]">
            프로필 정보
          </p>

          {/* 닉네임 */}
          <div className="mb-[16px]">
            <label className="font-semibold text-[#374151] text-[14px] leading-[20px] block mb-[6px]">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, MAX_NICKNAME))}
              className="w-full h-[46px] bg-[rgba(255,255,255,0.8)] border border-[#e5e7eb] rounded-[12px] px-[17px] text-[14px] text-[#111827] outline-none focus:border-[#7a9e82]"
            />
            <p className="font-normal text-[#9ca3af] text-[12px] leading-[16px] mt-[4px]">
              {nickname.length}/{MAX_NICKNAME}자
            </p>
          </div>

          {/* 전화번호 */}
          <div>
            <label className="font-semibold text-[#374151] text-[14px] leading-[20px] block mb-[6px]">전화번호</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[46px] bg-[rgba(255,255,255,0.8)] border border-[#e5e7eb] rounded-[12px] px-[17px] text-[14px] text-[#111827] outline-none focus:border-[#7a9e82]"
            />
          </div>
        </div>

        {/* 계정 정보 (변경 불가) */}
        <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] rounded-[16px] p-[21px] mb-[16px]">
          <p className="font-bold text-[rgba(122,158,130,0.6)] text-[12px] leading-[16px] tracking-[0.3px] mb-[16px]">
            계정 정보 (변경 불가)
          </p>
          {[
            { label: "아이디", value: MOCK_ACCOUNT.userId },
            { label: "학번", value: MOCK_ACCOUNT.studentId },
            { label: "학교 이메일", value: MOCK_ACCOUNT.email },
          ].map((row, idx) => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-[4px] ${idx > 0 ? "mt-[12px]" : ""}`}
            >
              <span className="font-normal text-[#6b7280] text-[14px] leading-[20px]">{row.label}</span>
              <span className="font-medium text-[#374151] text-[14px] leading-[20px]">{row.value}</span>
            </div>
          ))}
        </div>

        {/* 비밀번호 변경 accordion */}
        <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] rounded-[16px] overflow-hidden mb-[16px]">
          <button
            type="button"
            onClick={() => setPwExpanded((prev) => !prev)}
            className="w-full flex items-center justify-between px-[20px] py-[16px] h-[64px]"
          >
            <div className="flex items-center gap-[12px]">
              <div className="flex items-center justify-center size-[32px]">
                <img src={changePwIcon} alt="" className="w-[18px] h-[18px]" />
              </div>
              <span className="font-medium text-[#374151] text-[14px] leading-[20px]">비밀번호 변경</span>
            </div>
            {pwExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>

          {pwExpanded && (
            <div className="border-t border-[#f9fafb] px-[20px] pt-[1px] pb-[20px]">
              {[
                { label: "현재 비밀번호", value: currentPw, setter: setCurrentPw, placeholder: "현재 비밀번호" },
                { label: "새 비밀번호", value: newPw, setter: setNewPw, placeholder: "영문+특수문자 포함 8자 이상" },
                { label: "새 비밀번호 확인", value: confirmPw, setter: setConfirmPw, placeholder: "새 비밀번호 확인" },
              ].map((field) => (
                <div key={field.label} className="mt-[12px]">
                  <label className="font-semibold text-[#374151] text-[14px] leading-[20px] block mb-[6px]">
                    {field.label}
                  </label>
                  <input
                    type="password"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full h-[46px] bg-[rgba(255,255,255,0.8)] border border-[#e5e7eb] rounded-[12px] px-[17px] text-[14px] text-[#111827] placeholder-[#9ca3af] outline-none focus:border-[#7a9e82]"
                  />
                </div>
              ))}
              <button
                type="button"
                className="w-full h-[44px] flex items-center justify-center bg-[#7a9e82] rounded-[12px] mt-[12px]"
              >
                <span className="font-bold text-white text-[14px] leading-[20px]">비밀번호 변경</span>
              </button>
            </div>
          )}
        </div>

        {/* 로그아웃 */}
        <button
          type="button"
          className="w-full flex items-center gap-[12px] backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] rounded-[16px] px-[21px] py-[17px] h-[66px] mb-[16px]"
        >
          <div className="flex items-center justify-center size-[32px]">
            <img src={logoutIcon} alt="" className="w-[18px] h-[18px]" />
          </div>
          <span className="font-medium text-[#374151] text-[14px] leading-[20px]">로그아웃</span>
        </button>

        {/* 회원 탈퇴 */}
        <button
          type="button"
          onClick={() => setShowWithdraw(true)}
          className="w-full flex items-center gap-[12px] bg-[rgba(254,242,242,0.5)] border border-[#fee2e2] rounded-[16px] px-[21px] py-[17px] h-[66px]"
        >
          <div className="flex items-center justify-center size-[32px]">
            <img src={withdrawlIcon} alt="" className="w-[18px] h-[18px]" />
          </div>
          <span className="font-medium text-[#f87171] text-[14px] leading-[20px]">회원 탈퇴</span>
        </button>
      </div>

      <WithdrawModal
        open={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        onConfirm={() => {
          setShowWithdraw(false);
          navigate("/login");
        }}
      />
    </div>
  );
}
