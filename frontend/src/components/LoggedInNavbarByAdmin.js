import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactSession } from "react-client-session";

import { useNavigate } from "react-router-dom";
import { ExternalLink } from "react-external-link";

const LoggedInNavbar = ({ photo }) => {
  ReactSession.setStoreType("sessionStorage");
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);

  // ============= CLEAR CUSTOMER ID ================
  const clearId = () => {
    sessionStorage.clear();
    navigate("/admin/users");
  };

  return (
    <>
      <nav>
        <figure>
          <Link to={"/admin/users"}>
            <img
              src="/images/medclicker.png"
              alt="Medclicker LOGO"
              className="img-fluid"
              onClick={clearId}
            />
          </Link>
        </figure>
        <div
          className="nav-box"
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          <figure className="smallPhoto">
            <img src={photo} alt="" />
          </figure>

          {dropDown ? (
            <div id="dropItem">
              <div className="dropwrap">
                <div>
                  <Link to={"/question1"}>Create Listing</Link>
                </div>
                <div>
                  <Link to={"/admin/searchlist"}>Search Positions</Link>
                </div>
                <div>
                  <ExternalLink href="/signout" target="_self">
                    Log Out
                  </ExternalLink>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      <style jsx="true">
        {`
          nav {
            background-color: #fff;
            width: 100%;
            height: 85px;
            margin: 0 auto;
            padding: 0;
            border-bottom: 1px solid #ebebeb;
            position: relative;
          }

          .navbar-nav {
            float: right;
            position: absolute;
            display: block;
          }

          .navbar-nav ul {
            padding: 0;
            margin: 0;
          }

          .navbar-nav ul li {
            text-decoration: none;
            list-style: none;
          }

          .navbar-nav ul li a {
            font-weight: 800;
            font-size: 14px;
            color: #2b2b2b;
          }

          nav .nav-box {
            width: 35px;
            height: 35px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }

          nav > figure > a {
            display: block;
          }
          nav h2 {
            font-weight: bold;
          }
          nav > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          nav .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
          }
          nav .smallPhoto img {
            position: absolute;
            max-width: 48px;
            height: auto;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }
          @media only screen and (min-width: 768px) {
            nav .nav-box {
              left: 96%;
            }
            nav figure .img-fluid {
              transform: translateX(0%);
            }
          }
          #dropItem {
            width: 280px;
            background-color: white;
            position: absolute;
            margin-top: 6px;
            transform: translateX(-75%);
            border: 1px solid #ebebeb;
            border-top: none;
            display: block;
          }

          #dropItem.open {
            display: block;
          }

          #dropItem .disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }
          .dropwrap {
            padding-bottom: 0px;
            width: 88%;
            background-color: #fff;
            margin-top: 3%;
            margin-left: 6%;
          }
          .dropwrap div {
            border-bottom: 1px solid #ebebeb;
            height: 45px;
            line-height: 45px;
            font-weight: 500;
            color: #777;
            font-size: 13px;
            padding-left: 3px;
          }
          .dropwrap div a {
            color: #777;
            font-weight: 500;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            height: 100%;
            width: 100%;
            position: relative;
            display: block;
          }
          .dropwrap div:hover {
            border-bottom: 1px solid #484848;
          }

          nav .img-fluid {
            transform: translateX(36%);
          }

          .dropwrap .locumActivated {
            background-color: #14a248;
            animation: mailframe 500ms ease-in 0ms;
            animation-fill-mode: forwards;
          }

          .dropwrap .locumActivated a {
            color: #fff;
            animation: textframe 500ms ease-in-out 0ms;
          }

          @keyframes mailframe {
            0% {
              opacity: 0;
              transform: translateX(8%);
            }

            100% {
              opacity: 1;
              transform: translateX(0%);
            }
          }
          @keyframes textframe {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default LoggedInNavbar;
