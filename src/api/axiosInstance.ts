import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("kul_accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/reissue")
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("kul_refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("kul_accessToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // 인터셉터 재귀 방지를 위해 axios 직접 호출
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/reissue`,
          { refreshToken },
        );
        const { accessToken, refreshToken: newRefreshToken } = data.data;
        localStorage.setItem("kul_accessToken", accessToken);
        localStorage.setItem("kul_refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem("kul_accessToken");
        localStorage.removeItem("kul_refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
