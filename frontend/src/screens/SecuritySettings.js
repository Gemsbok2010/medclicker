import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

const SecuritySettings = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show2nd, setShow2nd] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const user = useSelector((state) => state.userInfo.value);

  // ================= PUT ===================
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/secure/securitySettings/" +
          user.email,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.invalid) {
            outPutErrorMessagesInSecuritySettings(data.invalid);
            setIsloading(false);
          }
          if (data.user) {
            outPutSuccessMessageInSecuritySettings(data.user);
            setIsloading(false);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInSecuritySettings(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(function () {
      setUpdateNote(false);
    }, 5000);
    setAlertMsg(errorMessage);
  }

  function outPutSuccessMessageInSecuritySettings() {
    setUpdateNote(true);
    setPassword("");
    setConfirmPassword("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(function () {
      setUpdateNote(false);
    }, 5000);
    setAlertMsg("");
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Change Password | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker Change Password" />
        </Helmet>
        <LoggedInNavbar />
        <div className="wrap">
          <section className="questionCard container">
            <div className="container regCon">
              <div className="errorMessageHere">
                {alert ? (
                  <div className="alert">
                    <img
                      src="/images/cross-black.png"
                      style={{ width: "12px", cursor: "pointer" }}
                      alt=""
                      onClick={() => {
                        setAlert(false);
                      }}
                    />{" "}
                    <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
                  </div>
                ) : null}
                {updateNote ? (
                  <section className="updateNote container-fluid">
                    <div className="container-fluid ">
                      <img
                        src="/images/tick.png"
                        style={{ width: "12px" }}
                        alt=""
                      />
                      <span>Password updated.</span>
                    </div>
                  </section>
                ) : null}
              </div>
              <h2 className="mt-5 mb-4">Change Password</h2>
              <form id="passwordChange" onSubmit={onSubmit}>
                <div className="contain">
                  <div className="container1">
                    <label htmlFor="password">New Password</label>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      value={password}
                      autoComplete="off"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <span
                      onClick={() => {
                        setShow(!show);
                      }}
                      className="eye"
                    >
                      {show ? (
                        <FiEye
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <FiEyeOff
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </span>
                  </div>
                  <div className="container2">
                    <label htmlFor="passwordConfirmation">
                      {" "}
                      Re-enter new Password
                    </label>
                    <input
                      id="passwordConfirmation"
                      autoComplete="off"
                      type={show2nd ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <span
                      onClick={() => {
                        setShow2nd(!show2nd);
                      }}
                      className="eye"
                    >
                      {show2nd ? (
                        <FiEye
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <FiEyeOff
                          style={{
                            color: "#777",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </span>
                  </div>
                  <div className="container1"></div>
                  <div className="container2">
                    {password === confirmPassword ? (
                      password && confirmPassword ? (
                        !isloading ? (
                          <input type="submit" value="Confirm" />
                        ) : (
                          <button className="btn-vori">
                            <ThreeDots
                              type="ThreeDots"
                              height={40}
                              width={80}
                              color={"white"}
                            />
                          </button>
                        )
                      ) : (
                        <input
                          type="button"
                          value="Confirm"
                          disabled="disabled"
                        />
                      )
                    ) : (
                      <input
                        type="button"
                        value="Confirm"
                        disabled="disabled"
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </section>
          <Footer />
        </div>

        <style jsx="true">{`
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .wrap .updateSuccess {
            width: 100%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .wrap .updateSuccess span {
            margin-left: 5px;
          }
          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-top: 60px;
            background-color: #f4f5f6;
          }
          .wrap .questionCard {
            width: 380px;
            padding: 20px 10px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            margin-bottom: 60px;
            border: 1px solid #ebebeb;
            background: #fff;
          }
          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }
          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: sans-serif;
            text-align: left;
            font-weight: 800;
            font-size: 28px;
            width: 100%;
            margin: 0px auto 24px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          label {
            display: block;
            font-size: 14px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 250px;
            text-align: left;
            position: relative;
            transform: translateY(20%);
            width: 260px;
          }

          .contain {
            position: relative;
            width: 100%;
            left: 0%;
          }

          .container1,
          .container2 {
            display: inline-block;
            position: relative;
            width: 100%;
          }

          .container2 .btn-vori {
            height: 48px;
            background-color: #14a248;
            color: white;
            cursor: pointer;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            outline: none;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          input[type="text"],
          input[type="password"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: 1px solid #dadada;
            padding: 12px 10px;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #777;
            font-family: sans-serif;
            display: inline-block;
            border-radius: 7px;
          }

          input[type="text"]:focus,
          input[type="password"]:focus,
          input[type="text"]:active,
          input[type="password"]:active {
            outline: none;
          }

          .container1 .eye,
          .container2 .eye {
            position: absolute;
            top: 41px;
            right: 20px;
          }

          input[type="button"] {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            color: #888;
            background-color: #dddddd;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            outline: none;
          }

          input[type="submit"] {
            height: 48px;
            background-color: #14a248;
            color: white;
            cursor: pointer;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            outline: none;
            border-radius: 4px;
          }

          .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
          }
          .questionCard a {
            margin-bottom: 0;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
          }
          .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
          }
          .wrap .updateNote {
            width: 100%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .wrap .updateNote span {
            margin-left: 5px;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .nav-box {
              left: 96%;
            }
            .container1 .eye,
            .container2 .eye {
              top: 41px;
              right: 58px;
            }
            .container2 .btn-vori {
              width: 260px;
            }
            input[type="text"],
            input[type="password"] {
              width: 260px;
            }
            input[type="button"],
            input[type="submit"] {
              width: 260px;
            }
            .container1,
            .container2 {
              width: 305px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default SecuritySettings;
