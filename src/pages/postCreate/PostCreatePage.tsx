import { Link } from "react-router-dom";

export default function PostCreatePage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] pb-24">
      <header className="sticky top-0 z-10 flex h-[113px] items-end gap-3 border-b border-[#f3f4f6] bg-white px-5 pb-[17px]">
        <Link to="/home" className="h-9 w-9 text-center leading-9 text-[#6b7280]">←</Link>
        <div>
          <h1 className="text-[16px] font-bold text-[#111827]">룸메이트 구인글 작성</h1>
          <p className="text-[12px] text-[#9ca3af]">1인당 1개의 구인글만 작성할 수 있어요</p>
        </div>
      </header>

      <main className="space-y-4 px-5 py-4">
        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[17px]">
          <p className="text-[12px] font-bold tracking-[0.3px] text-[#9ca3af]">공개 설정</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="rounded-[16px] border-2 border-[#7a9e82] bg-[#f3f7f4] p-[14px] text-left">
              <p className="text-[14px] font-bold text-[#7a9e82]">공개</p>
              <p className="text-[12px] text-[#9ca3af]">모든 사용자가 볼 수 있어요</p>
            </button>
            <button className="rounded-[16px] border-2 border-[#f3f4f6] bg-[#f9fafb] p-[14px] text-left">
              <p className="text-[14px] font-bold text-[#4b5563]">비공개</p>
              <p className="text-[12px] text-[#9ca3af]">나만 볼 수 있어요</p>
            </button>
          </div>
        </section>

        <section className="rounded-[16px] bg-[#f3f7f4] p-4">
          <p className="text-[12px] font-bold text-[#7a9e82]">나의 생활 스타일 설문이 자동 첨부돼요</p>
          <p className="mt-0.5 text-[12px] text-[#7a9e82]/70">
            구인글에는 마이페이지에서 작성한 설문 정보가 자동으로 포함됩니다.
          </p>
        </section>

        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[17px]">
          <label className="text-[14px] font-semibold text-[#374151]">제목</label>
          <input
            className="mt-2 h-[42px] w-full rounded-[12px] border border-[#e5e7eb] px-4 text-[14px] placeholder:text-[#9ca3af]"
            placeholder="예: 조용하고 깔끔한 룸메이트 구해요!"
          />
          <p className="pt-1 text-right text-[12px] text-[#9ca3af]">0/50</p>
        </section>

        <section className="rounded-[16px] border border-[#f3f4f6] bg-white p-[17px]">
          <label className="text-[14px] font-semibold text-[#374151]">
            추가 내용 <span className="font-normal text-[#9ca3af]">(선택)</span>
          </label>
          <textarea
            className="mt-2 h-[122px] w-full resize-none rounded-[12px] border border-[#e5e7eb] px-4 py-3 text-[14px] placeholder:text-[#9ca3af]"
            placeholder="설문 외에 추가적으로 전달하고 싶은 내용을 작성해주세요."
          />
          <p className="pt-1 text-right text-[12px] text-[#9ca3af]">0/500</p>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full border-t border-[#f3f4f6] bg-white px-4 pb-4 pt-[17px]">
        <button className="mx-auto block h-12 w-[155.5px] rounded-[16px] bg-[#7a9e82] text-[14px] font-bold text-white">
          구인글 등록하기
        </button>
      </footer>
    </div>
  );
}

