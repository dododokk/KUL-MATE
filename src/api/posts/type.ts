export interface PostSummary {
  postId: number;
  authorId: number;
  authorNickname: string;
  gender: "MALE" | "FEMALE";
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
  status: "OPEN" | "CLOSED";
  matched: boolean;
  createdAt: string;
}

export type GetPostsResponse = PostSummary[];

export interface PostAuthor {
  authorId: number;
  nickname: string;
  gender: "MALE" | "FEMALE";
  major: string;
  studentNumberLabel: string;
  birthYear: number;
  dormitoryType: string;
  profileImageUrl: string | null;
}

export interface PostLifestyle {
  mbti: string;
  smokingStatus: "SMOKER" | "NON_SMOKER";
  dormitoryType: string;
  sleepHabit: string;
  sleepStartTime: string;
  sleepEndTime: string;
  wakeUpStartTime: string;
  wakeUpEndTime: string;
  showerTime: string;
  cleaningFrequencyScore: number;
  organizationSensitivityScore: number;
  temperatureSensitivityScore: number;
  homeVisitFrequency: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  visible: boolean;
}

export interface CreatePostResponse {
  postId: number;
}

export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  status: "OPEN" | "CLOSED";
  bookmarked: boolean;
  matchScore: number;
  author: PostAuthor;
  lifestyle: PostLifestyle;
  tags: string[];
}
