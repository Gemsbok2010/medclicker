import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionTwo = () => {
  ReactSession.setStoreType("sessionStorage");
  const contractType = ReactSession.get("contractType");

  const user = { accessTwo: contractType };
  return user && user.accessTwo;
};

const ProtectedTwo = () => {
  const isAuth = questionTwo();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedTwo;
