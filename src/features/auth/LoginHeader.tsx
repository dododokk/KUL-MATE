export default function LoginHeader() {
  return (
    <div
      className="flex w-full flex-col items-center pb-10 pt-16"
      style={{
        background:
          "linear-gradient(160deg, rgba(212,237,224,0.2) 0%, rgb(240,250,244) 71%, rgb(240,250,244) 100%)",
      }}
    >
      <div
        className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgb(122,158,130) 0%, rgb(5,150,105) 100%)",
          boxShadow: "0px 1px 1px rgba(0,0,0,0.05)",
        }}
      >
        <span
          className="text-2xl font-black tracking-[-0.6px] text-white"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          KM
        </span>
      </div>

      <h1
        className="text-2xl font-black tracking-[-0.6px] text-[#7a9e82]"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        KUL:MATE
      </h1>

      <p className="mt-1 text-sm text-[#6b7280]">
        건국대학교 기숙사 룸메이트 매칭
      </p>
    </div>
  );
}
