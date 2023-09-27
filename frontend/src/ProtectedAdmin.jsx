import { Outlet, Navigate } from "react-router";
import { Cookies } from "react-cookie";
import Idle from "./components/IdleTimerContainer";
// set up cookies
const cookies = new Cookies();

const useAuth = () => {
  const cookie = cookies.get("adminToken");

  const admin = { token: cookie };
  return admin && admin.token;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet Idle={Idle} /> : <Navigate to="/admin" />;
};

export default ProtectedRoutes;
