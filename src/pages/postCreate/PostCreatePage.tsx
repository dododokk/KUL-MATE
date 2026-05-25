import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { createPost, getPost, updatePost, togglePostVisibility } from "../../api/posts/postsApi";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = !!editId;
  const postId = isEditMode ? Number(editId) : null;

  const initialVisible = (location.state as { visible?: boolean } | null)?.visible ?? true;
  const [isPublic, setIsPublic] = useState(initialVisible);
  const [originalVisible] = useState(initialVisible);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useEffect(() => {
    if (!postId) return;
    setIsFetching(true);
    getPost(postId)
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(() => alert("게시글 정보를 불러오지 못했습니다."))
      .finally(() => setIsFetching(false));
  }, [postId]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditMode && postId) {
        await updatePost(postId, { title, content, visible: isPublic });
        if (isPublic !== originalVisible) {
          await togglePostVisibility(postId, isPublic);
        }
      } else {
        await createPost({ title, content, visible: isPublic });
      }
      navigate(-1);
    } catch (error: unknown) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (!isEditMode && status === 409) {
        alert("구인글은 1인 1개만 작성할 수 있어요.");
      } else {
        alert(isEditMode ? "수정에 실패했습니다. 다시 시도해주세요." : "구인글 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-24">
      <header className="sticky top-0 z-10 flex h-[113px] items-end gap-3 border-b border-[#f3f4f6] bg-white px-5 pb-[17px]">
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 text-center leading-9 text-[#6b7280]"
        >
          ←
        </button>
        <div>
          <h1 className="text-[16px] font-bold text-[#111827]">
            {isEditMode ? "룸메이트 구인글 수정" : "룸메이트 구인글 작성"}
          </h1>
          {!isEditMode && (
            <p className="text-[12px] text-[#9ca3af]">1인당 1개의 구인글만 작성할 수 있어요</p>
          )}
        </div>
      </header>

      {isFetching ? (
        <div className="flex items-center justify-center py-20 text-[14px] text-[#9ca3af]">
          불러오는 중...
        </div>
      ) : (
        <main className="space-y-4 px-5 py-4">
          {/* 공개 설정 섹션 */}
          <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[17px]">
            <p className="text-[12px] font-bold tracking-[0.3px] text-[#9ca3af]">공개 설정</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsPublic(true)}
                className={`rounded-[16px] border-2 p-[14px] text-left transition-colors ${
                  isPublic
                    ? "border-[#7a9e82] bg-[#f3f7f4]"
                    : "border-[#f3f4f6] bg-[#f9fafb]"
                }`}
              >
                <p className={`text-[14px] font-bold ${isPublic ? "text-[#7a9e82]" : "text-[#4b5563]"}`}>
                  공개
                </p>
                <p className="text-[12px] text-[#9ca3af]">모든 사용자가 볼 수 있어요</p>
              </button>

              <button
                onClick={() => setIsPublic(false)}
                className={`rounded-[16px] border-2 p-[14px] text-left transition-colors ${
                  !isPublic
                    ? "border-[#7a9e82] bg-[#f3f7f4]"
                    : "border-[#f3f4f6] bg-[#f9fafb]"
                }`}
              >
                <p className={`text-[14px] font-bold ${!isPublic ? "text-[#7a9e82]" : "text-[#4b5563]"}`}>
                  비공개
                </p>
                <p className="text-[12px] text-[#9ca3af]">나만 볼 수 있어요</p>
              </button>
            </div>
          </section>

          {!isEditMode && (
            <section className="rounded-[16px] bg-[#f3f7f4] p-4">
              <p className="text-[12px] font-bold text-[#7a9e82]">나의 생활 스타일 설문이 자동 첨부돼요</p>
              <p className="mt-0.5 text-[12px] text-[#7a9e82]/70">
                구인글에는 마이페이지에서 작성한 설문 정보가 자동으로 포함됩니다.
              </p>
            </section>
          )}

          {/* 제목 입력 섹션 */}
          <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[17px]">
            <label className="text-[14px] font-semibold text-[#374151]">제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              className="mt-2 h-[42px] w-full rounded-[12px] border border-[#e5e7eb] px-4 text-[14px] placeholder:text-[#9ca3af] focus:border-[#7a9e82] focus:outline-none"
              placeholder="예: 조용하고 깔끔한 룸메이트 구해요!"
            />
            <p className="pt-1 text-right text-[12px] text-[#9ca3af]">{title.length}/50</p>
          </section>

          {/* 추가 내용 입력 섹션 */}
          <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[17px]">
            <label className="text-[14px] font-semibold text-[#374151]">
              추가 내용 <span className="font-normal text-[#9ca3af]">(선택)</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              className="mt-2 h-[122px] w-full resize-none rounded-[12px] border border-[#e5e7eb] px-4 py-3 text-[14px] placeholder:text-[#9ca3af] focus:border-[#7a9e82] focus:outline-none"
              placeholder="설문 외에 추가적으로 전달하고 싶은 내용을 작성해주세요."
            />
            <p className="pt-1 text-right text-[12px] text-[#9ca3af]">{content.length}/500</p>
          </section>
        </main>
      )}

      <footer className="fixed bottom-0 left-0 w-full border-t border-[#f3f4f6] bg-white px-4 pb-4 pt-[17px]">
        <button
          onClick={handleSubmit}
          disabled={isLoading || isFetching}
          className="mx-auto block h-12 w-[155.5px] rounded-[16px] bg-[#7a9e82] text-[14px] font-bold text-white transition-opacity hover:opacity-90 active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (isEditMode ? "수정 중..." : "등록 중...") : (isEditMode ? "수정하기" : "구인글 등록하기")}
        </button>
      </footer>
    </div>
  );
}
