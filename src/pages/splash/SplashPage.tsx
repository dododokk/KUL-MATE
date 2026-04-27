import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeartIcon() {
  return (
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 10.5L5.175 9.75C2.1 6.975 0 5.07 0 2.75C0 0.845 1.485 0 3 0C4.005 0 4.92 0.51 5.505 1.05C5.595 1.125 5.85 1.35 6 1.5C6.15 1.35 6.405 1.125 6.495 1.05C7.08 0.51 7.995 0 9 0C10.515 0 12 0.845 12 2.75C12 5.07 9.9 6.975 6.825 9.75L6 10.5Z"
        fill="#7EB89A"
      />
    </svg>
  );
}

export default function SplashPage() {
  const navigate = useNavigate();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000);
    return () => clearTimeout(fadeTimer);
  }, []);

  useEffect(() => {
    if (!fading) return;
    const navTimer = setTimeout(() => navigate("/login"), 300);
    return () => clearTimeout(navTimer);
  }, [fading, navigate]);

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center transition-opacity duration-500"
      style={{
        background:
          "linear-gradient(160deg, rgb(230, 244, 236) 0%, rgb(248, 250, 248) 60%, rgb(255, 255, 255) 100%)",
        opacity: fading ? 0 : 1,
      }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="relative h-[88px] w-[88px]">
          <div
            className="absolute inset-0 rounded-[24px]"
            style={{
              background:
                "linear-gradient(145deg, rgb(126, 184, 154) 0%, rgb(74, 158, 114) 100%)",
              boxShadow: "0px 12px 40px 0px rgba(126, 184, 154, 0.35)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[35px] font-black leading-none tracking-[-2px] text-white"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              KM
            </span>
          </div>
          {/* Heart badge */}
          <div
            className="absolute -top-2 left-[64px] flex h-6 w-6 items-center justify-center rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <HeartIcon />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <h1
            className="whitespace-nowrap text-[30px] font-extrabold leading-[45px] tracking-[-0.5px] text-[#2D6649]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            KUL:MATE
          </h1>
          <p
            className="whitespace-nowrap text-[14px] font-medium leading-5 text-[#7eb89a]"
            style={{ fontFamily: "'Roboto', 'Noto Sans KR', sans-serif" }}
          >
            건국대학교 룸메이트 매칭
          </p>
        </div>
      </div>

      {/* Page dots */}
      <div className="absolute bottom-[88px] flex gap-2">
        <div className="h-2 w-2 rounded-full bg-[#7eb89a] opacity-60" />
        <div className="h-2 w-2 rounded-full bg-[#7eb89a] opacity-60" />
        <div className="h-2 w-2 rounded-full bg-[#7eb89a] opacity-60" />
      </div>
    </div>
  );
}
