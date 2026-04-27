import { useState } from "react";
import { useNavigate } from "react-router-dom";
import illust1 from "../../assets/onboarding/onboarding1.svg";
import illust2 from "../../assets/onboarding/onboarding2.svg";
import illust3 from "../../assets/onboarding/onboarding3.svg";
import illust4 from "../../assets/onboarding/onboarding4.svg";

const SLIDES = [
  {
    illust: illust1,
    title: "KUL:MATE에 오신 걸 환영해요!",
    desc: "건국대학교 기숙사 룸메이트 매칭 서비스입니다. 생활 패턴을 등록하고 최적의 룸메이트를 찾아보세요.",
    button: "다음",
  },
  {
    illust: illust2,
    title: "설문으로 나를 표현해요",
    desc: "취침 시간, 청결도, 공부 스타일 등 생활 패턴 설문을 작성하면 나와 잘 맞는 룸메이트를 추천해드려요.",
    button: "다음",
  },
  {
    illust: illust3,
    title: "매칭 점수로 한눈에!",
    desc: "설문 결과 일치율을 점수(0-100)로 제공해요. 70점 이상이면 추천 탭에서 볼 수 있어요.",
    button: "다음",
  },
  {
    illust: illust4,
    title: "기숙사 합격증 인증",
    desc: "기숙사 합격증을 업로드하고 관리자 승인을 받으면 구인글 작성 및 룸메이트 신청이 가능해요.",
    button: "설문 작성하기",
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) navigate("/survey");
    else setCurrent((c) => c + 1);
  };

  const handleSkip = () => navigate("/survey");

  return (
    <div className="flex min-h-screen flex-col bg-white px-6 py-12">
      {/* 건너뛰기 */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm text-[#9ca3af]"
        >
          건너뛰기
        </button>
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* 일러스트 */}
        <div className="flex shrink-0 items-center justify-center">
          <img src={slide.illust} alt="" className="h-[320px] w-auto" />
        </div>

        {/* 텍스트 */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <h2 className="text-xl font-black text-[#111827]">{slide.title}</h2>
          <p className="text-sm leading-relaxed text-[#6b7280]">{slide.desc}</p>
        </div>

        {/* 페이지 인디케이터 */}
        <div className="mt-10 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#7a9e82]" : "w-2 bg-[#e5e7eb]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <button
        type="button"
        onClick={handleNext}
        className="h-[52px] w-full rounded-xl bg-[#7a9e82] text-sm font-bold text-white"
      >
        {slide.button}
      </button>
    </div>
  );
}
