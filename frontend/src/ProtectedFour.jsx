import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionFour = () => {
  ReactSession.setStoreType("sessionStorage");
  const finishDate = ReactSession.get("finishDate");

  const user = { accessFour: finishDate };
  return user && user.accessFour;
};

const ProtectedFour = () => {
  const isAuth = questionFour();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedFour;
