import { useState } from "react";
import AppBottomNav from "../../components/AppBottomNav";
import AddEventSheet from "../../features/calendar/AddEventSheet";
import CalendarGrid, { type CalendarEvent, type EventCategory } from "../../features/calendar/CalendarGrid";

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "e1", date: todayStr, title: "오늘 일정", category: "내 일정" },
  { id: "e2", date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-05`, title: "입사일", category: "입사일" },
  { id: "e3", date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-20`, title: "기숙사 점검", category: "점검/행사" },
];

export default function CalendarPage() {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function prevMonth() {
    if (month === 1) { setYear((y) => y - 1); setMonth(12); }
    else setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 12) { setYear((y) => y + 1); setMonth(1); }
    else setMonth((m) => m + 1);
  }

  function handleDateClick(dateStr: string) {
    setSelectedDate(dateStr);
  }

  function handleSaveEvent(event: { date: string; title: string; category: EventCategory }) {
    setEvents((prev) => [...prev, { id: `e-${Date.now()}`, ...event }]);
  }

  const selectedEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: "linear-gradient(160deg, rgb(240, 250, 244) 0%, rgb(255, 255, 255) 50%)",
      }}
    >
      {/* Header spacer */}
      <div className="h-[105px] shrink-0" />

      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-10 h-[105px] pt-[56px] pb-[17px] px-[20px] backdrop-blur-[6px] bg-[rgba(255,255,255,0.92)] border-b border-[rgba(122,158,130,0.1)]">
        <div className="flex items-center justify-between h-[32px]">
          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              className="flex items-center justify-center size-[32px]"
              onClick={prevMonth}
            >
              <ChevronLeft />
            </button>
            <span className="font-bold text-[#111827] text-[16px] leading-[24px] min-w-[96px] text-center">
              {year}년 {month}월
            </span>
            <button
              type="button"
              className="flex items-center justify-center size-[32px]"
              onClick={nextMonth}
            >
              <ChevronRight />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="flex h-[32px] items-center gap-[4px] rounded-[12px] border border-[rgba(122,158,130,0.2)] bg-[rgba(122,158,130,0.05)] px-[12px]"
          >
            <span className="font-semibold text-[#7a9e82] text-[12px] leading-[16px]">+ 일정 추가</span>
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <CalendarGrid
        year={year}
        month={month}
        events={events}
        today={todayStr}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
      />

      {/* Selected date event list */}
      {selectedDate && (
        <div className="px-[16px] pt-[8px] pb-[100px]">
          <div className="bg-[rgba(255,255,255,0.8)] border border-[rgba(122,158,130,0.1)] rounded-[16px] p-[17px]">
            <p className="font-bold text-[#374151] text-[13px] leading-[18px] pb-[12px]">
              {selectedDate}
            </p>
            {selectedEvents.length === 0 ? (
              <p className="font-normal text-[#9ca3af] text-[13px] leading-[18px]">
                이 날의 일정이 없어요
              </p>
            ) : (
              <div className="flex flex-col gap-[8px]">
                {selectedEvents.map((e) => (
                  <div key={e.id} className="flex items-center gap-[10px]">
                    <span
                      className={`shrink-0 size-[8px] rounded-full ${
                        e.category === "입사일" ? "bg-[#7a9e82]" :
                        e.category === "퇴사일" ? "bg-[#f87171]" :
                        e.category === "점검/행사" ? "bg-[#fbbf24]" :
                        e.category === "내 일정" ? "bg-[#a78bfa]" :
                        "bg-[#38bdf8]"
                      }`}
                    />
                    <span className="font-normal text-[#374151] text-[13px] leading-[18px]">{e.title}</span>
                    <span className="ml-auto font-normal text-[#9ca3af] text-[11px] leading-[16px]">{e.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <AppBottomNav />

      <AddEventSheet
        open={isSheetOpen}
        defaultDate={selectedDate}
        onClose={() => setIsSheetOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
