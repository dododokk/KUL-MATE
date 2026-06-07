import { Navigate, Outlet } from "react-router-dom";

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function PrivateRoute() {
  const token = localStorage.getItem("kul_accessToken");

  if (!token || !isTokenValid(token)) {
    localStorage.removeItem("kul_accessToken");
    localStorage.removeItem("kul_refreshToken");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
