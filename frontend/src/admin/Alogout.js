import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../redux/userInfo";

// set up cookies
const cookies = new Cookies();

const Alogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    cookies.remove("authToken", { path: "/" });
    cookies.remove("adminToken", { path: "/" });
    cookies.remove("connect.sid", { path: "/" });
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    sessionStorage.clear();
    dispatch(logout());
    navigate("/admin");
  }, [navigate]);

  return <div></div>;
};
export default Alogout;
