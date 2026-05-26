export type ScoreTone = "primary" | "mint";

export function getMatchScoreTone(score: number): ScoreTone {
  return score >= 80 ? "primary" : "mint";
}

function dormLabel(type: string): string {
  if (type === "LAKE") return "레이크홀";
  return type;
}

export interface MiniPostSummary {
  postId: number;
  authorNickname: string;
  major: string;
  studentNumberLabel: string;
  birthYear: number;
  dormitoryType: string;
  title: string;
  sleepStartTime: string;
  sleepEndTime: string;
  wakeUpStartTime: string;
  wakeUpEndTime: string;
  tags: string[];
  bookmarked: boolean;
  matchScore: number;
  createdAt: string;
}

export interface MiniPostCard {
  id: string;
  nickname: string;
  majorYear: string;
  dormLabel: string;
  title: string;
  sleepTime: string;
  wakeTime: string;
  score?: string;
  scoreTone: ScoreTone;
  date: string;
  tags: string[];
}

export function apiPostToCard(p: MiniPostSummary): MiniPostCard {
  return {
    id: String(p.postId),
    nickname: p.authorNickname,
    majorYear: `${p.major} ${p.studentNumberLabel} ${String(p.birthYear).slice(-2)}년생`,
    dormLabel: dormLabel(p.dormitoryType),
    title: p.title,
    sleepTime: `${p.sleepStartTime.slice(0, 5)} - ${p.sleepEndTime.slice(0, 5)}`,
    wakeTime: `${p.wakeUpStartTime.slice(0, 5)} - ${p.wakeUpEndTime.slice(0, 5)}`,
    date: p.createdAt.slice(0, 10),
    score: p.matchScore > 0 ? `${p.matchScore}점` : undefined,
    scoreTone: getMatchScoreTone(p.matchScore),
    tags: p.tags,
  };
}
