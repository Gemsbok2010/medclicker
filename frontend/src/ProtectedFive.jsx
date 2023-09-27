import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionFive = () => {
  ReactSession.setStoreType("sessionStorage");
  const normal_rate = ReactSession.get("normal_rate");
  const sat_rate = ReactSession.get("sat_rate");
  const sun_rate = ReactSession.get("sun_rate");
  const professions = ReactSession.get("professions");

  const user = {
    accessFive: normal_rate || sat_rate || sun_rate || professions,
  };
  return user && user.accessFive;
};

const ProtectedFive = () => {
  const isAuth = questionFive();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedFive;
