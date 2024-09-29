import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components/Footer";
import { ExternalLink } from "react-external-link";
import { ThreeDots } from "react-loader-spinner";
import { StyledFormButton } from "../components/Styles";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isloaded, setIsloaded] = useState(false);

  const googleUrlAddress =
    process.env.REACT_APP_BACKEND_URL + `auth/google?dd=${location.pathname}`;

  // const facebookUrlAddress =
  //   process.env.REACT_APP_BACKEND_URL + `auth/facebook?dd=${location.pathname}`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vanishemail, setVanishemail] = useState(true);
  const [vanishpwd, setVanishpwd] = useState(true);
  const [show, setShow] = useState(false);

  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessagesInQuestionCard(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }

  // ========== POST ================
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloaded(true);
    fetch(process.env.REACT_APP_BACKEND_URL + "api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInQuestionCard(data.invalid);
          setIsloaded(false);
        }
        if (
          data.user.survey === "" ||
          data.user.phone === "" ||
          data.user.profession === "" ||
          data.user.street === ""
        ) {
          setIsloaded(false);
          dispatch(
            login({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              filename: data.user.filename,
              isLoggedIn: true,
              isLocum: data.user.isLocum,
              isActive: data.user.isActive,
              nanoId: data.user.nanoId,
              isAdmin: data.user.isAdmin,
              completeAccess: false,
            })
          );

          navigate("/personal-details");
        } else {
          setIsloaded(false);
          dispatch(
            login({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              filename: data.user.filename,
              isLoggedIn: true,
              isLocum: data.user.isLocum,
              isActive: data.user.isActive,
              nanoId: data.user.nanoId,
              isAdmin: data.user.isAdmin,
              completeAccess: true,
            })
          );
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Login | Medclicker</title>

          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <div className="wrap">
          <div className="wrapposter">
            <section className="questionCard container">
              <figure>
                <Link to="/">
                  <img
                    src="/images/medclicker.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>

              <h2>Login</h2>
              <div className="container regCon">
                <div className="errorMessageHereInQuestionCard">
                  {updateNote ? (
                    <div className="updateNote">
                      <img
                        src="/images/cross-black.png"
                        alt=""
                        style={{
                          width: "14px",
                          cursor: "pointer",
                          marginRight: "2px",
                        }}
                        onClick={() => {
                          setUpdateNote(false);
                        }}
                      />
                      <span
                        dangerouslySetInnerHTML={{ __html: errorMsg }}
                      ></span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <form id="loginForm" onSubmit={onSubmit}>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onBlur={() => {
                          setVanishemail(true);
                        }}
                        className={
                          vanishemail && email !== "" ? "springbok" : ""
                        }
                        autoComplete="off"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type={show ? "text" : "password"}
                        id="password"
                        maxLength={35}
                        autoComplete="off"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        onBlur={() => {
                          setVanishpwd(true);
                        }}
                        className={
                          vanishpwd && password !== "" ? "springbok" : ""
                        }
                      />
                      <label htmlFor="password">Password</label>
                      <span
                        onClick={() => {
                          setShow(!show);
                        }}
                        style={{
                          position: "absolute",
                          top: "9px",
                          right: "12px",
                        }}
                      >
                        {show ? (
                          <FiEye style={{ color: "#888", fontSize: "20px" }} />
                        ) : (
                          <FiEyeOff
                            style={{ color: "#888", fontSize: "20px" }}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "0" }}>
                    <p>
                      <Link to="/forgotpassword">Forgot Password?</Link>
                    </p>
                  </div>
                  {password.length >= 8 && email ? (
                    !isloaded ? (
                      <input
                        type="submit"
                        className="btn-login"
                        value="Login"
                      />
                    ) : (
                      <button className="btn-login">
                        <ThreeDots
                          type="ThreeDots"
                          height={40}
                          width={80}
                          color={"white"}
                        />
                      </button>
                    )
                  ) : (
                    <StyledFormButton style={{ marginTop: "0px" }}>
                      Login
                    </StyledFormButton>
                  )}

                  <hr />
                  {/* <p>OR</p>
                  <button id="facebook-login">
                    <ExternalLink href={facebookUrlAddress} target="_self">
                      <img
                        src="/images/fb.png"
                        alt=""
                        width="30px"
                        style={{ marginRight: "5px" }}
                      />
                      Login with Facebook
                    </ExternalLink>
                  </button> */}
                  <p>OR</p>
                  <button id="google-login">
                    <ExternalLink href={googleUrlAddress} target="_self">
                      <img
                        src="/images/googlelogin.png"
                        alt=""
                        width="20px"
                        style={{ marginRight: "6px", marginTop: "-4px" }}
                      />
                      Login with Gmail
                    </ExternalLink>
                  </button>
                </form>
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </section>
          </div>

          <Footer />
        </div>
        <style jsx="true">{`
          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }
          .wrapposter {
            background-image: url("./../../images/main-image.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            padding-bottom: 60px;
            padding-top: 60px;
          }

          .wrap .questionCard {
            width: 400px;
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
            background: #fff;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .wrap .questionCard > figure {
            width: 200px;
            margin: 0px auto 16px;
          }
          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: "Noto Sans TC", sans-serif;
            text-align: center;
            font-weight: 400;
            font-size: 22px;
            width: 100%;
            margin: 10px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }
          .wrap .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: "Noto Sans TC", sans-serif;
          }
          .wrap .questionCard a {
            margin-bottom: 0;
            width: 100%;
            font-size: 15px;
            font-weight: 700;
            font-family: "Noto Sans TC", sans-serif;
            color: #14a248;
          }

          .wrap .regCon {
            margin: 0px auto;
            width: 90%;
          }
          .wrap .updateNote {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
          }

          @media screen and (max-width: 768px) {
            .wrap .regCon {
              width: 100%;
            }
          }
          .input-group {
            display: block;
            margin-right: 20px;
            position: relative;
          }

          .input-group label {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 0%;
            font-family: "Noto Sans TC", sans-serif;
            font-size: 14px;
            color: #777;
            font-weight: 500;
            padding: 0px 0px;
            pointer-events: none;
            transition: all 300ms ease-in-out 0ms;
          }
          .wrap #email {
            background-image: url("/images/mail.png");
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 320px;
          }

          .input-group input:focus + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 14px;
            opacity: 1;
          }
          .input-group input.springbok + label {
            transform: translate(-8px, -32px) scale(0.9);
            font-size: 14px;
            opacity: 0;
          }
          label {
            display: inline-block;
            font-size: 16px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 150px;
            text-align: left;
          }
          .wrap .questionCard .btn-login,
          .wrap #facebook-login,
          .wrap #google-login {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            font-weight: 800;
            font-size: 20px;
            text-align: center;
            box-sizing: border-box;
            margin-top: 0px;
            cursor: pointer;
            padding: 1px auto;
          }
          .wrap .questionCard .btn-login {
            line-height: 32px;
            color: #fff;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #14a248;
            border-color: #14a248;
          }

          .wrap #facebook-login {
            background-color: #3a5ba0;
            border: 2px solid #3a5ba0;
            position: relative;
            cursor: pointer;
            color: white;
          }
          .wrap #facebook-login a {
            font-weight: 800;
            font-size: 20px;
            color: #fff;
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 42px;
          }
          .wrap #google-login {
            background-color: #fff;
            border: 1px solid #333;
            position: relative;
            cursor: pointer;
          }
          .wrap #google-login a {
            font-weight: 800;
            font-size: 20px;
            color: #333;
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 44px;
          }
          .form-group {
            height: 52px;
          }
          .wrap input[type="text"],
          .wrap input[type="password"],
          .wrap input[type="email"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: none;
            border-bottom: 2px solid #dadada;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #2b2b2b;
            font-family: "Noto Sans TC", sans-serif;
          }

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 468px;
              padding: 30px 0px;
            }

            .input-group input:focus + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            .input-group input.springbok + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            .wrap #email {
              background-position: 360px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Login;
