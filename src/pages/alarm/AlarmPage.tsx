// src/pages/alarm/AlarmPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlarmItem from "../../features/alarm/AlarmItem";
import { getNotifications, readNotification, type NotificationResponse } from "../../api/notification/notificationApi";
import { acceptRequest, rejectRequest } from "../../api/request/requestApi";

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

  useEffect(() => {
    getNotifications()
      .then((data) => {
        setAlarms(data);
      })
      .catch((err) => {
        console.error("알림 목록 불러오기 실패:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleReadAlarm = async (id: number) => {
    const target = alarms.find((a) => a.notificationId === id);
    if (!target || target.isRead) return;

    try {
      await readNotification(id);
      setAlarms((prev) =>
        prev.map((alarm) =>
          alarm.notificationId === id ? { ...alarm, isRead: true } : alarm
        )
      );
    } catch (err) {
      console.error("알림 읽음 처리 실패:", err);
    }
  };

  const markAllRead = async () => {
    const unreadAlarms = alarms.filter((a) => !a.isRead);
    if (unreadAlarms.length === 0) return;

    try {
      await Promise.all(
        unreadAlarms.map((alarm) => readNotification(alarm.notificationId))
      );
      setAlarms((prev) => prev.map((alarm) => ({ ...alarm, isRead: true })));
    } catch (err) {
      console.error("전체 알림 읽음 처리 중 일부 실패:", err);
    }
  };

  // 🌟 실제 백엔드 룸메이트 신청 수락 API 연동 (requestId 사용)
  const handleAcceptRequest = async (requestId: number) => {
    try {
      await acceptRequest(requestId); 
      alert("룸메이트 신청을 수락했습니다! 🎉");
      // 수락 후 성공 시 뒤로가기나 화면 갱신 등 추가 동작을 넣으셔도 됩니다.
    } catch (err: any) {
      console.error("수락 실패:", err);
      alert(err.response?.data?.message || "수락 처리에 실패했습니다.");
    }
  };

  // 🌟 실제 백엔드 룸메이트 신청 거절 API 연동 (requestId 사용)
  const handleDeclineRequest = async (requestId: number) => {
    try {
      await rejectRequest(requestId);
      alert("룸메이트 신청을 거절했습니다.");
    } catch (err: any) {
      console.error("거절 실패:", err);
      alert(err.response?.data?.message || "거절 처리에 실패했습니다.");
    }
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

      <div className="flex flex-col px-[20px] py-[16px] gap-[8px]">
        {alarms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[80px]">
            <p className="text-[14px] text-[#9ca3af]">새로운 알림이 없습니다.</p>
          </div>
        ) : (
          alarms.map((alarm) => (
            <AlarmItem
              key={alarm.notificationId}
              id={alarm.notificationId} // 알림 읽음 처리를 위한 ID
              type={alarm.type}
              content={alarm.content}
              time={formatTime(alarm.createdAt)}
              isRead={alarm.isRead}
              onRead={handleReadAlarm}
              
              // 🌟 수락 버튼 클릭 시 (백엔드에서 받은 requestId를 넘김)
              onAccept={() => {
                if (alarm.requestId) {
                  handleAcceptRequest(alarm.requestId);
                  handleReadAlarm(alarm.notificationId); // 알림 읽음 처리
                } else {
                  alert("신청 정보를 찾을 수 없습니다. (백엔드 연동 전이라면 임시로 테스트 해보세요!)");
                  // 백엔드 연동 전 임시 테스트용 (네트워크 탭에서 확인한 requestId를 숫자로 직접 입력)
                  // handleAcceptRequest(7); 
                }
              }}

              // 🌟 거절 버튼 클릭 시
              onDecline={() => {
                if (alarm.requestId) {
                  handleDeclineRequest(alarm.requestId);
                  handleReadAlarm(alarm.notificationId); // 알림 읽음 처리
                } else {
                  alert("신청 정보를 찾을 수 없습니다.");
                  // 백엔드 연동 전 임시 테스트용
                  // handleDeclineRequest(7); 
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}