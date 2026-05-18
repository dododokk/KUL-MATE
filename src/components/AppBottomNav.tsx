import { Link, useLocation } from "react-router-dom";
import {
  navCalendar,
  navChat,
  navHome,
  navMy,
  navPlus,
} from "../assets/figma/home";

type NavKey = "home" | "chat" | "write" | "calendar" | "my";

const ACTIVE_FILTER =
  "brightness(0) saturate(100%) invert(59%) sepia(19%) saturate(451%) hue-rotate(99deg) brightness(0.95) contrast(0.95)";
const INACTIVE_FILTER =
  "brightness(0) saturate(100%) invert(71%) sepia(8%) saturate(344%) hue-rotate(200deg)";

function NavIcon({ src, alt, active }: { src: string; alt: string; active: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      className="block h-full w-full"
      style={{ filter: active ? ACTIVE_FILTER : INACTIVE_FILTER }}
      draggable={false}
    />
  );
}

function labelClass(active: boolean) {
  return `whitespace-nowrap text-[12px] font-medium leading-[16px] ${active ? "text-[#7a9e82]" : "text-[#9ca3af]"}`;
}

export type AppBottomNavProps = {
  active?: NavKey | null;
};

export default function AppBottomNav({ active: activeProp }: AppBottomNavProps) {
  const { pathname } = useLocation();

  const inferred: NavKey | null =
    pathname === "/" || pathname.startsWith("/home")
      ? "home"
      : pathname.startsWith("/chat")
        ? "chat"
        : pathname.startsWith("/post/create")
          ? "write"
          : pathname.startsWith("/calendar")
            ? "calendar"
            : pathname.startsWith("/my")
              ? "my"
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
            <NavIcon src={navHome} alt="" active={active === "home"} />
          </div>
          <span className={labelClass(active === "home")}>홈</span>
        </Link>

        <Link
          to="/chat"
          className="flex h-[54px] w-[48px] flex-col items-center justify-center gap-[2px] rounded-[12px] px-[12px] py-[6px]"
        >
          <div className="h-[20px] w-[20.828px]">
            <NavIcon src={navChat} alt="" active={active === "chat"} />
          </div>
          <span className={labelClass(active === "chat")}>채팅</span>
        </Link>

        <Link
          to="/post/create"
          className="flex h-[60px] w-[72px] flex-col items-center justify-center gap-[2px] px-[12px] py-[4px]"
        >
          <div className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[16px] bg-[#7a9e82] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="h-[24px] w-[25px]">
              <img src={navPlus} alt="" className="block h-full w-full" draggable={false} />
            </div>
          </div>
          <span className={`pt-[2px] ${labelClass(active === "write")}`}>글쓰기</span>
        </Link>

        <Link
          to="/calendar"
          className="flex h-[54px] w-[57.125px] flex-col items-center justify-center gap-[2px] rounded-[12px] px-[12px] py-[6px]"
        >
          <div className="h-[20px] w-[20.828px]">
            <NavIcon src={navCalendar} alt="" active={active === "calendar"} />
          </div>
          <span className={labelClass(active === "calendar")}>캘린더</span>
        </Link>

        <Link
          to="/my"
          className="flex h-[54px] w-[48px] flex-col items-center justify-center gap-[2px] rounded-[12px] px-[12px] py-[6px]"
        >
          <div className="h-[20px] w-[20.828px]">
            <NavIcon src={navMy} alt="" active={active === "my"} />
          </div>
          <span className={labelClass(active === "my")}>마이</span>
        </Link>
      </div>
    </nav>
  );
}
