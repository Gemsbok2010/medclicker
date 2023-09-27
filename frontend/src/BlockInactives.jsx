import { Outlet, Navigate } from "react-router";
// useSelector is accessing value of states
import { useSelector } from "react-redux";

const useAuth = () => {
  const redu = useSelector((state) => state.userInfo.value);

  const user = { access: redu.isActive };

  return user && user.access;
};

const BlockInactives = () => {
  const isAuth = useAuth();
  return isAuth === true || isAuth === null ? <Outlet /> : <Navigate to={-1} />;
};

export default BlockInactives;
