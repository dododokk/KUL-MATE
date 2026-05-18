import { useState } from "react";
import type { EventCategory } from "./CalendarGrid";

type Props = {
  open: boolean;
  defaultDate: string;
  onClose: () => void;
  onSave: (event: { date: string; title: string; category: EventCategory }) => void;
};

const CATEGORIES: { label: EventCategory; color: string; active: string }[] = [
  { label: "내 일정", color: "border-[#a78bfa] text-[#a78bfa]", active: "bg-[#a78bfa] text-white border-[#a78bfa]" },
  { label: "룸메이트", color: "border-[#38bdf8] text-[#38bdf8]", active: "bg-[#38bdf8] text-white border-[#38bdf8]" },
  { label: "점검/행사", color: "border-[#fbbf24] text-[#fbbf24]", active: "bg-[#fbbf24] text-white border-[#fbbf24]" },
  { label: "입사일", color: "border-[#7a9e82] text-[#7a9e82]", active: "bg-[#7a9e82] text-white border-[#7a9e82]" },
  { label: "퇴사일", color: "border-[#f87171] text-[#f87171]", active: "bg-[#f87171] text-white border-[#f87171]" },
];

export default function AddEventSheet({ open, defaultDate, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>("내 일정");

  function handleSave() {
    if (!title.trim()) return;
    onSave({ date: defaultDate, title: title.trim(), category });
    setTitle("");
    setCategory("내 일정");
    onClose();
  }

  function handleClose() {
    setTitle("");
    setCategory("내 일정");
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={handleClose}
    >
      <div
        className="w-full rounded-t-[24px] bg-white px-[20px] pt-[20px] pb-[40px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pb-[20px]">
          <div className="h-[4px] w-[40px] rounded-full bg-[#e5e7eb]" />
        </div>

        <h2 className="font-bold text-[#111827] text-[16px] leading-[24px] pb-[20px]">
          일정 추가
        </h2>

        {/* Date display */}
        <div className="pb-[12px]">
          <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px]">날짜</span>
          <p className="font-semibold text-[#374151] text-[14px] leading-[20px] pt-[4px]">
            {defaultDate}
          </p>
        </div>

        {/* Title input */}
        <div className="pb-[16px]">
          <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px]">제목</span>
          <input
            className="mt-[8px] w-full rounded-[12px] border border-[rgba(122,158,130,0.2)] bg-[rgba(243,247,244,0.4)] px-[16px] py-[12px] text-[14px] leading-[20px] text-[#111827] placeholder-[#d1d5db] outline-none focus:border-[#7a9e82]"
            placeholder="일정 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category selector */}
        <div className="pb-[24px]">
          <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px]">카테고리</span>
          <div className="flex flex-wrap gap-[8px] pt-[8px]">
            {CATEGORIES.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setCategory(c.label)}
                className={`rounded-full border px-[12px] py-[5px] text-[12px] font-medium leading-[16px] ${
                  category === c.label ? c.active : c.color
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-[8px]">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 h-[48px] flex items-center justify-center rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb]"
          >
            <span className="font-bold text-[#6b7280] text-[14px] leading-[20px]">취소</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim()}
            className={`flex-1 h-[48px] flex items-center justify-center rounded-[14px] bg-[#7a9e82] ${
              !title.trim() ? "opacity-40" : ""
            }`}
          >
            <span className="font-bold text-white text-[14px] leading-[20px]">저장</span>
          </button>
        </div>
      </div>
    </div>
  );
}
