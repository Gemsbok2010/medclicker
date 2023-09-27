import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionThree = () => {
  ReactSession.setStoreType("sessionStorage");
  const professions = ReactSession.get("professions");

  const user = { accessThree: professions };
  return user && user.accessThree;
};

const ProtectedThree = () => {
  const isAuth = questionThree();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedThree;
