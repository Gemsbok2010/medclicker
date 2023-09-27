import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionSix = () => {
  ReactSession.setStoreType("sessionStorage");
  const about = ReactSession.get("about");

  const user = { accessSix: about };
  return user && user.accessSix;
};

const ProtectedSix = () => {
  const isAuth = questionSix();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedSix;
