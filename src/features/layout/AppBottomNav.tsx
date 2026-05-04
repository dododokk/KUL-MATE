import { Link, useLocation } from "react-router-dom";
import { navCalendar, navChat, navHome, navMy, navPlus } from "../../assets/figma/home";

type NavKey = "home" | "chat" | "write" | "calendar" | "my";

function NavIcon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="block h-full w-full" draggable={false} />;
}

function labelClass(active: boolean) {
  return `text-[12px] font-medium leading-[16px] ${active ? "text-[#7a9e82]" : "text-[#9ca3af]"}`;
}

export type AppBottomNavProps = {
  /** 지정하지 않으면 현재 경로로 활성 탭을 추론합니다. */
  active?: NavKey | null;
};

export default function AppBottomNav({ active: activeProp }: AppBottomNavProps) {
  const { pathname } = useLocation();

  const inferred: NavKey | null =
    pathname === "/home" || pathname.startsWith("/home")
      ? "home"
      : pathname.startsWith("/post/create")
        ? "write"
        : null;

  const active = activeProp !== undefined ? activeProp : inferred;

  return (
    <nav className="fixed bottom-0 left-0 z-10 h-[77px] w-full border-t border-[rgba(122,158,130,0.1)] bg-[rgba(255,255,255,0.92)] pt-px backdrop-blur-[6px]">
      <div className="flex h-[76px] w-full items-center justify-between px-[16.6px] py-[8px]">
        <Link
          to="/home"
          className="flex h-[54px] w-[48px] flex-col items-center justify-center gap-[2px] rounded-[12px] px-[12px] py-[6px]"
        >
          <div className="h-[20px] w-[20.828px]">
            <NavIcon src={navHome} alt="" />
          </div>
          <span className={labelClass(active === "home")}>홈</span>
        </Link>

        <button type="button" className="flex h-[54px] w-[48px] flex-col items-center justify-center gap-[2px] rounded-[12px] px-[12px] py-[6px]">
          <div className="h-[20px] w-[20.828px]">
            <NavIcon src={navChat} alt="" />
          </div>
          <span className={labelClass(active === "chat")}>채팅</span>
        </button>

        <Link
          to="/post/create"
          className="flex h-[60px] w-[72px] flex-col items-center justify-center gap-[2px] px-[12px] py-[4px]"
        >
          <div className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[16px] bg-[#7a9e82] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="h-[24px] w-[25px]">
              <NavIcon src={navPlus} alt="" />
            </div>
          </div>
          <span className={`pt-[2px] ${labelClass(active === "write")}`}>글쓰기</span>
        </Link>

        <button type="button" className="flex h-[54px] w-[57.125px] flex-col items-center justify-center gap-[2px] rounded-[12px] px-[12px] py-[6px]">
          <div className="h-[20px] w-[20.828px]">
            <NavIcon src={navCalendar} alt="" />
          </div>
          <span className={labelClass(active === "calendar")}>캘린더</span>
        </button>

        <button type="button" className="flex h-[54px] w-[48px] flex-col items-center justify-center gap-[2px] rounded-[12px] px-[12px] py-[6px]">
          <div className="h-[20px] w-[20.828px]">
            <NavIcon src={navMy} alt="" />
          </div>
          <span className={labelClass(active === "my")}>마이</span>
        </button>
      </div>
    </nav>
  );
}
