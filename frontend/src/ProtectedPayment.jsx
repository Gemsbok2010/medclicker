import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const pay_locum = () => {
  ReactSession.setStoreType("sessionStorage");
  const professions = ReactSession.get("accessCode");

  const user = { access: professions };
  return user && user.access;
};

const ProtectedPayment = () => {
  const isAuth = pay_locum();
  return isAuth ? <Outlet /> : <Navigate to={-1} />;
};

export default ProtectedPayment;
