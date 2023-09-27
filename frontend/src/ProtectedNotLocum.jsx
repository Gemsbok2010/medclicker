import { Outlet, Navigate } from "react-router";
// useSelector is accessing value of states
import { useSelector } from "react-redux";

const useAuth = () => {
  const redu = useSelector((state) => state.userInfo.value);
  const user = { isLocum: redu.isLocum };

  return user && user.isLocum;
};

const ProtectedNotLocum = () => {
  const isAuth = useAuth();
  return isAuth === false ? <Navigate to={-1} /> : <Outlet />;
};

export default ProtectedNotLocum;
