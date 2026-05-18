import { useState } from "react";
import bookmarkOnIcon from "../../assets/mypage/bookmark-on.svg";
import bookmarkOffIcon from "../../assets/mypage/bookmark-off.svg";
import roommateProfileIcon from "../../assets/mypage/roommate-profile.svg";
import type { SavedPost } from "./types";

type Props = {
  posts: SavedPost[];
  onToggleBookmark: (id: string) => void;
};

export default function SavedPostList({ posts, onToggleBookmark }: Props) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-[48px]">
        <p className="font-normal text-[#9ca3af] text-[14px] leading-[20px]">저장한 글이 없어요</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[12px]">
      {posts.map((post) => (
        <SavedPostCard key={post.id} post={post} onToggleBookmark={onToggleBookmark} />
      ))}
    </div>
  );
}

function SavedPostCard({
  post,
  onToggleBookmark,
}: {
  post: SavedPost;
  onToggleBookmark: (id: string) => void;
}) {
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
    onToggleBookmark(post.id);
  }

  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.7)] border border-[rgba(122,158,130,0.1)] rounded-[16px] p-[17px]">
      {/* Author row */}
      <div className="flex items-center gap-[10px] pb-[8px] relative">
        <div className="bg-[rgba(122,158,130,0.1)] flex items-center justify-center rounded-full shrink-0 size-[32px]">
          <img src={roommateProfileIcon} alt="" className="w-[14px] h-[14px]" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[#111827] text-[12px] leading-[16px]">{post.authorNickname}</span>
          <span className="font-normal text-[#9ca3af] text-[12px] leading-[16px]">{post.authorDepartment}</span>
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className="absolute right-0 top-0 flex items-center justify-center size-[32px]"
          aria-label="북마크"
        >
          <img src={bookmarked ? bookmarkOnIcon : bookmarkOffIcon} alt="" className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* Title */}
      <p className="font-semibold text-[#111827] text-[14px] leading-[20px] pb-[4px]">
        {post.title}
      </p>

      {/* Meta */}
      <p className="font-normal text-[#9ca3af] text-[12px] leading-[16px] pb-[8px]">
        {post.dorm} · {post.date}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-[4px]">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-[rgba(122,158,130,0.1)] px-[8px] py-[2px] rounded-full font-normal text-[#7a9e82] text-[12px] leading-[16px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
