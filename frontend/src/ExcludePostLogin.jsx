import { Outlet, Navigate } from "react-router";
import { Cookies } from "react-cookie";

// set up cookies
const cookies = new Cookies();

const useAuth = () => {
  const cookie = cookies.get("authToken");
  const user = { token: cookie };
  return user && user.token;
};

const ExcludePostLogin = () => {
  const isAuth = useAuth();

  return isAuth ? <Navigate to={-1} /> : <Outlet />;
};

export default ExcludePostLogin;
