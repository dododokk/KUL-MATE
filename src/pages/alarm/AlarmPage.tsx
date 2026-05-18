import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlarmItem from "../../features/alarm/AlarmItem";
import type { AlarmType } from "../../features/alarm/AlarmItem";

type Alarm = {
  id: string;
  type: AlarmType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
};

const INITIAL_ALARMS: Alarm[] = [
  {
    id: "1",
    type: "request",
    title: "룸메이트 신청이 왔어요!",
    description: "코딩고수민준님이 룸메이트 신청을 보냈습니다.",
    time: "5분 전",
    isRead: false,
  },
  {
    id: "2",
    type: "accept",
    title: "신청이 수락됐어요!",
    description: "밝은서연이님이 룸메이트 신청을 수락했습니다.",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: "3",
    type: "recommendation",
    title: "새로운 추천 룸메이트!",
    description: "회원님과 92% 일치하는 룸메이트가 있어요.",
    time: "3시간 전",
    isRead: true,
  },
  {
    id: "4",
    type: "approval",
    title: "기숙사 합격증 승인 완료",
    description:
      "제출하신 기숙사 합격증이 승인되었습니다. 이제 모든 기능을 이용하실 수 있어요!",
    time: "어제",
    isRead: true,
  },
];

export default function AlarmPage() {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState<Alarm[]>(INITIAL_ALARMS);

  const unreadCount = alarms.filter((a) => !a.isRead).length;

  function markAllRead() {
    setAlarms((prev) => prev.map((a) => ({ ...a, isRead: true })));
  }

  function markRead(id: string) {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{
        backgroundImage:
          "linear-gradient(160deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)",
      }}
    >
      {/* Header spacer */}
      <div className="h-[113px] shrink-0" />

      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-[6px] bg-[rgba(255,255,255,0.92)] border-b border-[rgba(122,158,130,0.1)] h-[113px] pt-[56px] pb-[17px] px-[20px] z-10">
        <div className="flex items-center justify-between h-[40px]">
          <div className="flex items-center gap-[12px]">
            <button
              className="flex items-center justify-center size-[32px]"
              onClick={() => navigate(-1)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="#111827"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex flex-col">
              <h1 className="font-bold text-[#111827] text-[16px] leading-[24px]">
                알림
              </h1>
              <p className="font-normal text-[#7a9e82] text-[12px] leading-[16px]">
                {unreadCount}개 읽지 않음
              </p>
            </div>
          </div>

          <button onClick={markAllRead}>
            <span className="font-semibold text-[#7a9e82] text-[12px] leading-[16px]">
              모두 읽기
            </span>
          </button>
        </div>
      </div>

      {/* Alarm list */}
      <div className="flex flex-col px-[20px] py-[16px] gap-[8px]">
        {alarms.map((alarm) => (
          <AlarmItem
            key={alarm.id}
            type={alarm.type}
            title={alarm.title}
            description={alarm.description}
            time={alarm.time}
            isRead={alarm.isRead}
            onAccept={() => markRead(alarm.id)}
            onDecline={() => markRead(alarm.id)}
            onViewProfile={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
