import { Outlet, Navigate } from "react-router";
import { Cookies } from "react-cookie";

// set up cookies
const cookies = new Cookies();

const useAuth = () => {
  const adminToken = cookies.get("adminToken");
  const cookie = cookies.get("authToken");
  const user = { token: cookie || adminToken };
  return user && user.token;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
