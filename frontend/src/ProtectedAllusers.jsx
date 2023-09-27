import { Outlet, Navigate } from "react-router";
// useSelector is accessing value of states
import { useSelector } from "react-redux";

const useAuth = () => {
  const redu = useSelector((state) => state.userInfo.value);

  const user = { access: redu.completeAccess };
  return user && user.access;
};

const ProtectedAllusers = () => {
  const isAuth = useAuth();

  return isAuth === true ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default ProtectedAllusers;
