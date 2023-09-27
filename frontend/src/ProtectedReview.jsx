import { Outlet, Navigate } from "react-router";
import { ReactSession } from "react-client-session";

const questionReview = () => {
  ReactSession.setStoreType("sessionStorage");
  const street = ReactSession.get("street");
  const contractType = ReactSession.get("contractType");

  const user = { access: street, contractType: contractType };

  return user && user;
};

const ProtectedReview = () => {
  const isAuth = questionReview();

  return isAuth.contractType != "Locum" && isAuth.access ? (
    <Outlet />
  ) : (
    <Navigate to={-1} />
  );
};

export default ProtectedReview;
