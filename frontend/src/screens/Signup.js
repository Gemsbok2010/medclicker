import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";
import Footer from "../components/Footer";
import {
  StyledFormSubmit,
  StyledFormSubmitting,
  StyledFormButton,
} from "../components/Styles";
import { ThreeDots } from "react-loader-spinner";
import { ExternalLink } from "react-external-link";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isloaded, setIsloaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleUrlAddress =
    process.env.REACT_APP_BACKEND_URL + `auth/google?dd=${location.pathname}`;

  // const facebookUrlAddress =
  //   process.env.REACT_APP_BACKEND_URL + `auth/facebook?dd=${location.pathname}`;

  const [tickBox, setTickBox] = useState(false);
  const [vanishfirst, setVanishfirst] = useState(true);
  const [vanishlast, setVanishlast] = useState(true);
  const [vanishemail, setVanishemail] = useState(true);
  const [vanishpwd, setVanishpwd] = useState(true);
  const [show, setShow] = useState(false);

  // ========== PASSWORD STRENGTH ===============

  const updateStrengthMeter = (password) => {
    const weaknesses = calculatePasswordStrength(password);
    weaknesses.forEach((weakness) => {
      if (weakness == null) {
        return;
      }

      const reasonsContainerA = document.getElementById("aa");
      reasonsContainerA.checked = weaknesses[0].checked;
      const reasonsContainerB = document.getElementById("bb");
      reasonsContainerB.checked = weaknesses[1].checked;
      const reasonsContainerC = document.getElementById("cc");
      reasonsContainerC.checked = weaknesses[2].checked;
      const reasonsContainerD = document.getElementById("dd");
      reasonsContainerD.checked = weaknesses[3].checked;
      return weaknesses;
    });
  };

  function calculatePasswordStrength(password) {
    const weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowerCaseWeakness(password));
    weaknesses.push(upperCaseWeakness(password));
    weaknesses.push(numberWeakness(password));
    return weaknesses;
  }

  function lowerCaseWeakness(password) {
    return characterTypeWeakness(password, /[a-z]/g, false);
  }

  function upperCaseWeakness(password) {
    return characterTypeWeakness(password, /[A-Z]/g, false);
  }

  function numberWeakness(password) {
    return characterTypeWeakness(password, /[0-9]/g, false);
  }

  function lengthWeakness(password) {
    const length = password.length;
    if (length <= 7) {
      return {
        checked: false,
      };
    } else {
      return {
        checked: true,
      };
    }
  }

  function characterTypeWeakness(password, regex, bool) {
    const matches = password.match(regex) || [];
    if (matches.length === 0) {
      return {
        checked: bool,
      };
    } else {
      return {
        checked: !bool,
      };
    }
  }

  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessagesInSignUp(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }
  // ========== POST ================
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloaded(true);
    const createdAt = new Date();
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/auth/signup?createdAt=" +
          createdAt,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        }
      );
      const data = await res.json();

      if (data.prompt) {
        outPutErrorMessagesInSignUp(data.prompt);
        setIsloaded(false);
      }
      if (data.invalid) {
        outPutErrorMessagesInSignUp(data.invalid);
        setIsloaded(false);
      }
      if (data.user) {
        localStorage.setItem("userId", data.user._id);
        setIsloaded(false);
        dispatch(
          login({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            filename: data.user.filename,
            isLocum: data.user.isLocum,
            isActive: data.user.isActive,
            isLoggedIn: true,
            nanoId: data.user.nanoId,
            isAdmin: data.user.isAdmin,
            completeAccess: false,
          })
        );
        navigate("/personal-details");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Sign up | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <div className="wrap">
          <div className="wrapposter">
            <section className="passwordCard container">
              <h4>Password Checker</h4>
              <p>
                Make sure your password is long enough and contains various
                types of characters.
              </p>
              <div id="reasons" className="reasons">
                <input type="checkbox" readOnly id="aa" />
                <label>Password needs to have minimum 8 characters</label>
                <input type="checkbox" readOnly id="bb" />
                <label>Password needs to have at least 1 lower case</label>
                <input type="checkbox" readOnly id="cc" />
                <label>Password needs to have at least 1 upper case</label>
                <input type="checkbox" readOnly id="dd" />
                <label>Password needs to have at least 1 number</label>
              </div>
            </section>
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
              <div className="container regCon">
                <h2>G'day, what's your name? </h2>
                <form id="signupForm" onSubmit={onSubmit}>
                  <div className="errorMessageHereInQuestionCard">
                    {updateNote ? (
                      <div className="updateNote">
                        <img
                          src="/images/cross-black.png"
                          style={{
                            width: "14px",
                            cursor: "pointer",
                            marginRight: "2px",
                          }}
                          onClick={() => {
                            setUpdateNote(false);
                          }}
                          alt=""
                        />
                        <span
                          dangerouslySetInnerHTML={{ __html: errorMsg }}
                        ></span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        id="firstname"
                        autoComplete="none"
                        value={firstName}
                        onBlur={() => {
                          setVanishfirst(true);
                        }}
                        className={
                          vanishfirst && firstName !== "" ? "springbok" : ""
                        }
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      <label htmlFor="firstname">First Name</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        id="lastname"
                        autoComplete="none"
                        onBlur={() => {
                          setVanishlast(true);
                        }}
                        className={
                          vanishlast && lastName !== "" ? "springbok" : ""
                        }
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                      <label htmlFor="lastname">Last Name</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        onBlur={() => {
                          setVanishemail(true);
                        }}
                        className={
                          vanishemail && email !== "" ? "springbok" : ""
                        }
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
                        onBlur={() => {
                          setVanishpwd(true);
                        }}
                        className={
                          vanishpwd && password !== "" ? "springbok" : ""
                        }
                        onChange={(e) => {
                          setPassword(e.target.value);
                          updateStrengthMeter(e.target.value);
                        }}
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

                  <div className="form-group" style={{ marginBottom: "0px" }}>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      <input
                        type="checkbox"
                        id="gridCheck"
                        checked={tickBox}
                        onChange={(e) => {
                          setTickBox(e.currentTarget.checked);
                        }}
                      />
                      <label htmlFor="gridCheck">
                        I agree to the
                        <Link to="/terms_and_conditions_au">
                          {" "}
                          terms and conditions{" "}
                        </Link>
                      </label>
                    </div>
                  </div>
                  {lastName &&
                  firstName &&
                  email &&
                  password.length >= 8 &&
                  tickBox ? (
                    !isloaded ? (
                      <StyledFormSubmit
                        type="submit"
                        value="Sign Up"
                      ></StyledFormSubmit>
                    ) : (
                      <StyledFormSubmitting>
                        <ThreeDots
                          type="ThreeDots"
                          height={40}
                          width={80}
                          color={"white"}
                        />
                      </StyledFormSubmitting>
                    )
                  ) : (
                    <StyledFormButton disabled>Sign Up</StyledFormButton>
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
                      Sign up with Facebook
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
                      Sign up with Gmail
                    </ExternalLink>
                  </button>
                </form>
              </div>
              <p>
                Already have a Medckicker account?
                <Link to="/login"> Login</Link>
              </p>
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
            display: flex;
            justifycontent: space-evenly;
          }

          @media screen and (max-width: 768px) {
            .wrapposter {
              display: block;
            }
          }

          /* ============ PASSWORD CHECKER ========== */
          .wrap .passwordCard {
            display: block;
            margin-bottom: 20px;
            background: #fcebcd;
            height: 310px;
            padding: 20px 10px;
            width: 400px;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            display: block;
          }

          .wrap .passwordCard h4 {
            font-size: 22px;
            font-weight: 800;
            text-align: center;
          }

          .wrap .passwordCard p {
            color: #777;
            text-align: center;
          }

          .wrap .reasons {
            width: 100%;
          }

          .wrap .passwordCard input[type="checkbox"] {
            display: none;
            float: left;
          }
          .wrap .passwordCard input[type="checkbox"] + label {
            position: relative;
            cursor: default;
            font-size: 15px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 500;
            margin: 0px 0px 0px 30px;
            width: 360px;
            height: 42px;
            display: block;
            color: #2b2b2b;
          }
          .wrap .passwordCard input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -35px;
            top: 16px;
            width: 20px;
            height: 20px;
            display: block;
            background: white;
            border-radius: 4px;
            background: #fcebcd;
          }
          .wrap .passwordCard input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -30px;
            top: 15px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("/images/check.png");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }
          .wrap .passwordCard input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
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
            margin: 15px auto;
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

            position: relative;
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

          @media screen and (max-width: 768px) {
            .wrap .regCon {
              width: 100%;
            }
          }
          .wrapposter .input-group {
            display: block;
            margin-right: 20px;
            position: relative;
          }

          .wrapposter .input-group label {
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
          .wrap #firstname,
          .wrap #lastname {
            background-image: url("/images/human.png");
            background-repeat: no-repeat;
            background-size: 17px;
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
            font-size: 15px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 150px;
            text-align: left;
          }

          .wrap .form-group {
            height: 52px;
          }
          .wrap .questionCard input[type="text"],
          .wrap .questionCard input[type="password"],
          .wrap .questionCard input[type="email"] {
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

          .wrap .questionCard input[type="checkbox"] {
            display: none;
            float: left;
          }
          .wrap .questionCard input[type="checkbox"] + label {
            position: relative;
            cursor: pointer;
            font-size: 15px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 500;
            margin: 0px 0px 0px 50px;
            width: 100%;
            display: block;
            color: #2b2b2b;
          }
          .wrap .questionCard input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -55px;
            top: 16px;
            width: 20px;
            height: 20px;
            display: block;
            background: white;
            border-radius: 4px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .wrap .questionCard input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -60px;
            top: 13px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("/images/check.png");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }
          .wrap .questionCard input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

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
          .wrap .updateNote {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
          }

          /* ============ MEDIA QUERIES FOR TABLET =========*/

          @media screen and (min-width: 1024px) {
            .wrap .passwordCard {
              width: 420px;
              height: 310px;
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
              background: #fcebcd;
              -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
              box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
              display: block;
            }
          }

          /* ============ MEDIA QUERIES FOR DESKTOP =========*/

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 468px;
              padding: 30px 0px;
            }
            .wrap .questionCard h2 {
              font-size: 26px;
            }
            .input-group input:focus + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            .input-group input.springbok + label {
              transform: translate(-8px, -32px) scale(0.9);
            }
            .wrap .passwordCard input[type="checkbox"] + label {
              margin: 0px 0px 0px 40px;
              height: 42px;
            }
            .wrap #firstname,
            .wrap #lastname,
            .wrap #email {
              background-position: 360px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Signup;
