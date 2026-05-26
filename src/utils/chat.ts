export function formatMessageTime(isoString: string | undefined): string {
  if (!isoString) return "";
  const normalized = isoString.replace(" ", "T");
  const date = new Date(normalized);
  const target = isNaN(date.getTime()) ? new Date() : date;
  const h = target.getHours();
  const m = target.getMinutes().toString().padStart(2, "0");
  return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${m}`;
}

export function formatChatListTime(isoString: string, now: Date = new Date()): string {
  const date = new Date(isoString);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${m}`;
  }
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  return `${date.getMonth() + 1}/${date.getDate()}`;
}
