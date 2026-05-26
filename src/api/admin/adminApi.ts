import api from "../axiosInstance";

export const adminApi = {
  // 1. 승인 대기 사용자 목록 조회
  getPendingUsers: () => api.get("/api/admin/users/pending"),
  
  // 2. 기숙사 합격증 파일 조회 (이미지/PDF 등을 위한 blob 처리)
  getCertificate: (userId: number) => 
    api.get(`/api/admin/users/${userId}/dorm-certificate`, { responseType: 'blob' }),
  
  // 3. 사용자 승인
  approveUser: (userId: number) => api.patch(`/api/admin/users/${userId}/approve`),
  
  // 4. 사용자 반려
  rejectUser: (userId: number, rejectReason: string) => 
    api.patch(`/api/admin/users/${userId}/reject`, { rejectReason }),
  
  // 5. 신고 목록 조회
  getReports: () => api.get("/api/admin/reports"),
  
  // 6. 신고 무혐의 처리
  rejectReport: (reportId: number) => api.patch(`/api/admin/reports/${reportId}/reject`),
  
  // 7. 글 삭제 처리
  deletePost: (postId: number) => api.delete(`/api/admin/posts/${postId}`),
  
  // 8. 사용자 계정 정지
  suspendUser: (userId: number) => api.patch(`/api/admin/users/${userId}/suspend`),
}; 