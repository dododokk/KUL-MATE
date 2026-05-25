// src/pages/alarm/AlarmPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlarmItem from "../../features/alarm/AlarmItem";
import { getNotifications, readNotification, type NotificationResponse } from "../../api/notification/notificationApi";

// ISO 시간 문자열을 간단한 날짜/시간으로 포맷팅해주는 헬퍼 함수
function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 1) return "방금 전";
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  } catch {
    return "";
  }
}

export default function AlarmPage() {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState<NotificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 컴포넌트 마운트 시 알림 목록 API 호출
  useEffect(() => {
    getNotifications()
      .then((data) => {
        // 최근 알림이 위로 오도록 정렬되어 오지 않는다면 프론트에서 정렬 처리 가능
        setAlarms(data);
      })
      .catch((err) => {
        console.error("알림 목록 불러오기 실패:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // 2. 알림 단건 읽음 처리 기능
  const handleReadAlarm = async (id: number) => {
    // 이미 읽은 알림이면 API 요청 안 함
    const target = alarms.find((a) => a.notificationId === id);
    if (!target || target.isRead) return;

    try {
      await readNotification(id);
      // 화면 UI 상태 업데이트
      setAlarms((prev) =>
        prev.map((alarm) =>
          alarm.notificationId === id ? { ...alarm, isRead: true } : alarm
        )
      );
    } catch (err) {
      console.error("알림 읽음 처리 실패:", err);
    }
  };

  // 3. 모두 읽기 기능 (백엔드 전체 읽기 API가 없으므로 현재 안 읽은 알림들을 순회하며 처리)
  const markAllRead = async () => {
    const unreadAlarms = alarms.filter((a) => !a.isRead);
    if (unreadAlarms.length === 0) return;

    try {
      // 모든 안 읽은 알림의 PATCH API를 병렬로 실행
      await Promise.all(
        unreadAlarms.map((alarm) => readNotification(alarm.notificationId))
      );
      // 전체 상태를 읽음으로 업데이트
      setAlarms((prev) => prev.map((alarm) => ({ ...alarm, isRead: true })));
    } catch (err) {
      console.error("전체 알림 읽음 처리 중 일부 실패:", err);
    }
  };

  // 룸메이트 신청 수락/거절 핸들러 (추후 매칭 관련 API 연동 시 살을 붙이시면 됩니다!)
  const handleAcceptRequest = (id: number) => {
    alert(`신청을 수락했습니다. (알림 ID: ${id})`);
    handleReadAlarm(id);
  };

  const handleDeclineRequest = (id: number) => {
    alert(`신청을 거절했습니다. (알림 ID: ${id})`);
    handleReadAlarm(id);
  };

  const unreadCount = alarms.filter((alarm) => !alarm.isRead).length;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf8]">
        <p className="text-[14px] text-[#6b7280]">알림을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] pb-10">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[#f3f4f6] bg-white px-[20px] pb-[16px] pt-[60px]">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-[8px]">
            <button 
              type="button"
              onClick={() => navigate(-1)} 
              className="flex items-center justify-center"
              aria-label="뒤로가기"
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

          <button type="button" onClick={markAllRead}>
            <span className="font-semibold text-[#7a9e82] text-[12px] leading-[16px]">
              모두 읽기
            </span>
          </button>
        </div>
      </div>

      {/* Alarm list */}
      <div className="flex flex-col px-[20px] py-[16px] gap-[8px]">
        {alarms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[80px]">
            <p className="text-[14px] text-[#9ca3af]">새로운 알림이 없습니다.</p>
          </div>
        ) : (
          alarms.map((alarm) => (
            <AlarmItem
              key={alarm.notificationId}
              id={alarm.notificationId}
              type={alarm.type}
              content={alarm.content}
              time={formatTime(alarm.createdAt)}
              isRead={alarm.isRead}
              onRead={handleReadAlarm}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
            />
          ))
        )}
      </div>
    </div>
  );
}