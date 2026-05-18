import type { MyPost } from "./types";

type Props = {
  posts: MyPost[];
  onTogglePublic: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function MyPostList({ posts, onTogglePublic, onEdit, onDelete }: Props) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-[48px]">
        <p className="font-normal text-[#9ca3af] text-[14px] leading-[20px]">작성한 글이 없어요</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[12px]">
      {posts.map((post) => (
        <div
          key={post.id}
          className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] rounded-[16px] p-[17px]"
        >
          {/* Title + visibility badge */}
          <div className="flex items-start justify-between pb-[8px]">
            <h3 className="font-bold text-[#111827] text-[14px] leading-[20px] flex-1 pr-[8px]">
              {post.title}
            </h3>
            <span
              className={`shrink-0 px-[8px] py-[2px] rounded-full font-bold text-[12px] leading-[16px] ${
                post.isPublic
                  ? "bg-[rgba(122,158,130,0.1)] text-[#7a9e82]"
                  : "bg-[#f9fafb] text-[#9ca3af]"
              }`}
            >
              {post.isPublic ? "공개" : "비공개"}
            </span>
          </div>

          {/* Meta */}
          <p className="font-normal text-[#9ca3af] text-[12px] leading-[16px] pb-[12px]">
            {post.dorm} · {post.date}
          </p>

          {/* Action buttons */}
          <div className="flex gap-[8px]">
            <button
              type="button"
              onClick={() => onTogglePublic(post.id)}
              className="flex-1 h-[34px] flex items-center justify-center border border-[rgba(122,158,130,0.2)] bg-[rgba(122,158,130,0.05)] rounded-[12px]"
            >
              <span className="font-semibold text-[#7a9e82] text-[12px] leading-[16px]">
                {post.isPublic ? "비공개 전환" : "공개 전환"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onEdit(post.id)}
              className="flex-1 h-[34px] flex items-center justify-center border border-[#e5e7eb] rounded-[12px]"
            >
              <span className="font-semibold text-[#4b5563] text-[12px] leading-[16px]">수정</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(post.id)}
              className="flex-1 h-[34px] flex items-center justify-center border border-[#fee2e2] rounded-[12px]"
            >
              <span className="font-semibold text-[#f87171] text-[12px] leading-[16px]">삭제</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
