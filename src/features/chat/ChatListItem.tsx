type Props = {
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  showReadIcon?: boolean;
  hasUnread?: boolean;
  isLast?: boolean;
  onClick?: () => void;
};

export default function ChatListItem({
  name,
  lastMessage,
  time,
  unreadCount,
  showReadIcon,
  hasUnread,
  isLast,
  onClick,
}: Props) {
  return (
    <div
      className={`flex gap-[14px] h-[89px] items-center pb-[17px] pt-[16px] px-[20px] w-full cursor-pointer ${
        !isLast ? "border-b border-[rgba(243,244,246,0.8)]" : ""
      } ${hasUnread ? "bg-[rgba(255,255,255,0.6)]" : ""}`}
      onClick={onClick}
    >
      <div className="bg-[#7a9e82] flex items-center justify-center rounded-full shrink-0 size-[56px]">
        <span className="font-black text-[20px] text-white leading-[28px]">
          {name.charAt(0)}
        </span>
      </div>

      <div className="flex flex-col flex-1 min-w-0 h-[46px]">
        <div className="flex items-center justify-between pb-[4px]">
          <p
            className={`font-bold text-[14px] leading-[20px] truncate ${
              hasUnread ? "text-[#111827]" : "text-[#374151]"
            }`}
          >
            {name}
          </p>
          <span className="font-medium text-[12px] leading-[16px] text-[#d1d5db] pl-[8px] shrink-0">
            {time}
          </span>
        </div>

        <div className="flex items-center justify-between h-[20px]">
          <p
            className={`text-[14px] leading-[20px] truncate ${
              hasUnread
                ? "font-medium text-[#4b5563]"
                : "font-normal text-[#9ca3af]"
            }`}
          >
            {lastMessage}
          </p>
          {unreadCount != null && unreadCount > 0 ? (
            <span className="bg-[#7a9e82] flex items-center justify-center rounded-full size-[20px] shrink-0 text-[12px] font-bold text-white ml-[8px]">
              {unreadCount}
            </span>
          ) : showReadIcon ? (
            <span className="shrink-0 ml-[8px] flex items-center">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path
                  d="M1 5L4 8.5L9.5 1"
                  stroke="#9ca3af"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 5L8 8.5L13.5 1"
                  stroke="#9ca3af"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
