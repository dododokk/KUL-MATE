import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../api/mypage/mypageApi";
import type { UserProfileResponse } from "../../api/mypage/type";
import UserProfileCard from "../../features/mypage/UserProfileCard";
import profileIcon from "../../assets/chat/profile.svg";
import reportIcon from "../../assets/mypage/report.svg";

const DORMITORY_LABEL: Record<string, string> = {
  LAKE: "레이크홀",
  HAENGDANG: "행당홀",
};
const GENDER_LABEL: Record<string, string> = { MALE: "남성", FEMALE: "여성" };

function dormLabel(val: string): string {
  return DORMITORY_LABEL[val] ?? val;
}

export default function UserProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    getUserProfile(Number(userId))
      .then(setProfile)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundImage: "linear-gradient(156deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)" }}
    >
      {/* 헤더 */}
      <div
        className="flex-none h-[192px] pt-[56px] px-[20px] pb-[20px] relative"
        style={{ backgroundImage: "linear-gradient(167deg, rgb(232, 245, 238) 0%, rgb(255, 255, 255) 100%)" }}
      >
        {/* 타이틀 */}
        <div className="flex items-center justify-center h-[32px]">
          <span className="font-bold text-[#111827] text-[16px] leading-[24px]">프로필 조회</span>
        </div>

        {/* 뒤로가기 */}
        <button
          className="absolute left-[16px] top-[54px] flex items-center justify-center size-[36px]"
          onClick={() => navigate(-1)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* 신고 버튼 */}
        <button className="absolute right-[19px] top-[54px] flex items-center justify-center size-[36px]">
          <img src={reportIcon} alt="신고" className="w-[20px] h-[20px]" />
        </button>

        {/* 프로필 정보 */}
        {profile && (
          <div className="flex gap-[16px] items-center mt-[12px]">
            <div
              className="border-2 border-[rgba(122,158,130,0.15)] flex items-center justify-center p-[2px] rounded-[16px] shrink-0 size-[64px]"
              style={{ backgroundImage: "linear-gradient(135deg, rgba(122,158,130,0.2) 0%, rgb(209,250,229) 100%)" }}
            >
              {profile.profileImageUrl ? (
                <img src={profile.profileImageUrl} alt="프로필" className="size-full rounded-[14px] object-cover" />
              ) : (
                <img src={profileIcon} alt="프로필" className="w-[32px] h-[32px]" />
              )}
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="font-black text-[#111827] text-[16px] leading-[24px]">{profile.nickname}</span>
              <span className="font-normal text-[#6b7280] text-[14px] leading-[20px]">
                {profile.department} {profile.grade}학년
              </span>
              <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px]">
                {dormLabel(profile.dormitoryType)} · {GENDER_LABEL[profile.gender] ?? profile.gender}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-[20px] pt-[20px] pb-[32px]">
          {isLoading ? (
            <div className="flex justify-center py-[48px]">
              <div className="h-[24px] w-[24px] animate-spin rounded-full border-2 border-[#7a9e82] border-t-transparent" />
            </div>
          ) : profile ? (
            <UserProfileCard profile={profile} />
          ) : (
            <div className="flex justify-center py-[48px]">
              <p className="text-[14px] text-[#9ca3af]">프로필을 불러올 수 없어요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
