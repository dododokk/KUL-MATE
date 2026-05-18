export type DormStatus = "pending" | "approved" | "rejected";
export type MyPageTab = "info" | "posts" | "saved";

export type UserProfile = {
  nickname: string;
  department: string;
  year: string;
  dorm: string;
  gender: string;
  dormStatus: DormStatus;
};

export type AccountInfo = {
  userId: string;
  studentId: string;
  email: string;
  phone: string;
};

export type RoommateInfo = {
  nickname: string;
  department: string;
  year: string;
  dorm: string;
  matchDate: string;
  score: number;
};

export type MyPost = {
  id: string;
  title: string;
  dorm: string;
  date: string;
  isPublic: boolean;
};

export type SavedPost = {
  id: string;
  authorNickname: string;
  authorDepartment: string;
  title: string;
  dorm: string;
  date: string;
  tags: string[];
  isBookmarked: boolean;
};
