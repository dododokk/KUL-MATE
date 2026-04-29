import type { AdminStats } from "./adminDummyData";
import matchingIcon from "../../assets/admin/matching.svg";
import weekMatchingIcon from "../../assets/admin/week_matching.svg";
import statsAvgIcon from "../../assets/admin/stats-avg.svg";
import postIcon from "../../assets/admin/post.svg";

interface AdminStatsSectionProps {
  stats: AdminStats;
}

const RANK_STYLES = [
  { bg: "bg-[#7a9e82]", text: "text-white" },
  { bg: "bg-[#e2eee4]", text: "text-[#7a9e82]" },
  { bg: "bg-[#ecfdf5]", text: "text-[#059669]" },
  { bg: "bg-[#f9fafb]", text: "text-[#9ca3af]" },
  { bg: "bg-[#f9fafb]", text: "text-[#9ca3af]" },
];

export default function AdminStatsSection({ stats }: AdminStatsSectionProps) {
  const maxDept = Math.max(...stats.topDepartments.map((d) => d.count));
  const approvedPct = (stats.approvedMembers / stats.totalMembers) * 100;
  const pendingPct =
    ((stats.totalMembers - stats.approvedMembers) / stats.totalMembers) * 100;

  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      {/* 매칭 통계 */}
      <div className="backdrop-blur-sm bg-white/70 border border-[rgba(122,158,130,0.1)] rounded-2xl p-[17px]">
        <p className="text-xs font-bold text-[rgba(122,158,130,0.6)] tracking-wide mb-4">
          매칭 통계
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#fff1f2] rounded-xl p-3 flex flex-col items-center">
            <img src={matchingIcon} alt="" className="w-6 h-6 mb-1" />
            <p className="text-xl font-black text-[#f43f5e] leading-7">
              {stats.totalMatches}건
            </p>
            <p className="text-xs text-[#6b7280]">전체 매칭</p>
          </div>
          <div className="bg-[#f3f7f4] rounded-xl p-3 flex flex-col items-center">
            <img src={weekMatchingIcon} alt="" className="w-6 h-6 mb-1" />
            <p className="text-xl font-black text-[#7a9e82] leading-7">
              {stats.weeklyMatches}건
            </p>
            <p className="text-xs text-[#6b7280]">이번 주 매칭</p>
          </div>
          <div className="bg-[#ecfdf5] rounded-xl p-3 flex flex-col items-center">
            <img src={statsAvgIcon} alt="" className="w-6 h-6 mb-1" />
            <p className="text-xl font-black text-[#059669] leading-7">
              {stats.avgMatchScore}점
            </p>
            <p className="text-xs text-[#6b7280]">평균 매칭 점수</p>
          </div>
          <div className="bg-[#fffbeb] rounded-xl p-3 flex flex-col items-center">
            <img src={postIcon} alt="" className="w-6 h-6 mb-1" />
            <p className="text-xl font-black text-[#d97706] leading-7">
              {stats.activePostings}개
            </p>
            <p className="text-xs text-[#6b7280]">활성 구인글</p>
          </div>
        </div>
      </div>

      {/* 회원 현황 */}
      <div className="backdrop-blur-sm bg-white/70 border border-[rgba(122,158,130,0.1)] rounded-2xl p-[17px]">
        <p className="text-xs font-bold text-[rgba(122,158,130,0.6)] tracking-wide mb-4">
          회원 현황
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-[#4b5563]">
                전체 가입자
              </span>
              <span className="text-xs font-bold text-[#374151]">
                {stats.totalMembers}명
              </span>
            </div>
            <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
              <div className="h-full bg-[#7a9e82] rounded-full w-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-[#4b5563]">
                승인 완료
              </span>
              <span className="text-xs font-bold text-[#374151]">
                {stats.approvedMembers}명
              </span>
            </div>
            <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#34d399] rounded-full"
                style={{ width: `${approvedPct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-[#4b5563]">
                승인 대기
              </span>
              <span className="text-xs font-bold text-[#374151]">
                {stats.totalMembers - stats.approvedMembers}명
              </span>
            </div>
            <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#fbbf24] rounded-full"
                style={{ width: `${pendingPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 학과별 TOP 5 */}
      <div className="backdrop-blur-sm bg-white/70 border border-[rgba(122,158,130,0.1)] rounded-2xl p-[17px]">
        <p className="text-xs font-bold text-[rgba(122,158,130,0.6)] tracking-wide mb-4">
          학과별 TOP 5
        </p>
        <div className="flex flex-col gap-2">
          {stats.topDepartments.map((dept, idx) => {
            const { bg, text } = RANK_STYLES[idx];
            const barPct = (dept.count / maxDept) * 100;
            return (
              <div key={dept.name} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${bg}`}
                >
                  <span className={`text-xs font-black ${text}`}>
                    {idx + 1}
                  </span>
                </div>
                <span className="text-sm text-[#374151] w-[100px] shrink-0">
                  {dept.name}
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7a9e82] rounded-full"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#7a9e82] w-6 text-right shrink-0">
                    {dept.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
