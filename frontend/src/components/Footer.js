import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
import { login } from "../redux/userInfo";

// Three dots
import { ThreeDots } from "react-loader-spinner";

const Footer = ({ asx }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.value);
  const [email, setEmail] = useState("");
  const [thisyear, setThisyear] = useState(null);

  const googleUrlAddress = `http://localhost:4000/auth/google?dd=${location.pathname}`;

  const facebookUrlAddress = `http://localhost:4000/auth/facebook?dd=${location.pathname}`;

  // ============ GET CURRENT YEAR ===============
  useEffect(() => {
    const dt = new Date();
    const year = dt.getFullYear();
    setThisyear(year);
  }, []);

  // ======= TAKE OUT DUPLICATE PROFESSIONS ======
  const [listOfProfessions, setListOfProfessions] = useState([]);

  // ============= GET APPLICATIONSMANAGER ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/admin/footer");
      const data = await res.json();

      if (isCancelled === false) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setListOfProfessions(data.professions);
      }
    };
    if (isCancelled === false) {
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const noDuplicates = [
    ...new Map(
      listOfProfessions.map((list) => [list.professionName, list])
    ).values(),
  ];

  // ========== ERROR MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessagesInQuestionCard(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }

  // ============= LOGIN QUESTION CARD =================
  const [questionCard, setQuestionCard] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [password, setPassword] = useState("");
  const [isloaded, setIsloaded] = useState(false);
  const [vanishemail, setVanishemail] = useState(true);
  const [vanishpwd, setVanishpwd] = useState(true);

  const onLoginForm = async (e) => {
    e.preventDefault();
    setIsloaded(true);
    fetch("http://localhost:4000/api/auth/login", {
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
          localStorage.setItem("userId", data.user._id);
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
          localStorage.setItem("userId", data.user._id);
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
          setBackdrop(false);
          setQuestionCard(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {/* BACKDROP */}
      {backdrop ? (
        <div
          className="backdrop"
          onClick={() => {
            setBackdrop(false);
            setQuestionCard(false);
          }}
        ></div>
      ) : (
        ""
      )}
      {/* QUESTION CARD */}
      {questionCard ? (
        <div className="loginQuestionCard container">
          <img
            onClick={() => {
              setQuestionCard(false);
              setBackdrop(false);
            }}
            style={{ width: "15px", marginLeft: "20px", cursor: "pointer" }}
            src="/images/cross-black.png"
            alt=""
          />

          <figure>
            {" "}
            <Link to="/">
              <img
                className="img-fluid"
                src="/images/medclicker.png"
                alt="LOGO"
              />
            </Link>{" "}
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
                  <span dangerouslySetInnerHTML={{ __html: errorMsg }}></span>
                </div>
              ) : (
                ""
              )}
            </div>

            <form id="createLoginForm" onSubmit={onLoginForm}>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onBlur={() => {
                      setVanishemail(true);
                    }}
                    className={vanishemail && email !== "" ? "springbok" : ""}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onBlur={() => {
                      setVanishpwd(true);
                    }}
                    className={vanishpwd && password !== "" ? "springbok" : ""}
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                    }}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: "0" }}>
                <p>
                  {" "}
                  <Link to="/forgotpassword"> Forgot Password?</Link>{" "}
                </p>
              </div>
              {!isloaded ? (
                <input type="submit" className="btn btn-login" value="Login" />
              ) : (
                <button className="btn-login">
                  <ThreeDots
                    type="ThreeDots"
                    height={40}
                    width={80}
                    color={"white"}
                  />
                </button>
              )}

              <p>OR</p>
              <button id="facebook-login">
                <ExternalLink href={facebookUrlAddress} target="_self">
                  <img src="/images/fb.png" alt="" style={{ width: "28px" }} />
                  Login with Facebook
                </ExternalLink>
              </button>
              <p>OR</p>
              <button id="google-login">
                <ExternalLink href={googleUrlAddress} target="_self">
                  <img
                    src="/images/googlelogin.png"
                    alt=""
                    style={{ width: "22px" }}
                  />{" "}
                  Login with Gmail
                </ExternalLink>
              </button>
            </form>

            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>{" "}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="wrap">
        <div className="pageBottom container-fluid">
          <div className="container">
            <div className="mainTitle">
              <figure>
                <img
                  src="/images/medclicker.png"
                  alt=""
                  width="150px"
                  className="pageBottom-logo"
                />
              </figure>
              <div className="tonBtn">
                <Link to="/contact">Contact us</Link>

                {user.isLoggedIn ? (
                  user.isActive === true && user.completeAccess === true ? (
                    <>
                      <ExternalLink href="/logout" target="_self">
                        Log out
                      </ExternalLink>
                      <Link to="/searchlist">Search positions</Link>
                      <Link to="/dashboard">Hi, {user.firstName}</Link>
                    </>
                  ) : (
                    <>
                      <ExternalLink href="/logout" target="_self">
                        Log out
                      </ExternalLink>

                      <Link to="/dashboard">Hi, {user.firstName}</Link>
                    </>
                  )
                ) : (
                  <>
                    <Link to="/signup">Sign up</Link>
                    <Link to="/login">Log in</Link>
                  </>
                )}
              </div>
            </div>
            <p className="title mb-4">Positions by profession</p>
            <div
              style={{ borderBottom: "1px solid #fff" }}
              className="container pb-4"
            >
              <div className="row">
                <div className="col-md-3">
                  <div className="bigClass">
                    {noDuplicates.slice(0, 6).map((profession) => {
                      return user.isLoggedIn ? (
                        <Link
                          to={`/searchlist?professions=${profession.professionName}&index=${profession._id}`}
                          key={profession._id}
                          onClick={(e) => {
                            asx(e, profession._id);
                          }}
                        >
                          {profession.professionName}
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          onClick={() => {
                            setQuestionCard(true);
                            setBackdrop(true);
                          }}
                        >
                          {" "}
                          {profession.professionName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bigClass">
                    {noDuplicates.slice(5, 11).map((profession) => {
                      return user.isLoggedIn ? (
                        <Link
                          to={`/searchlist?professions=${profession.professionName}&index=${profession._id}`}
                          key={profession._id}
                          onClick={(e) => {
                            asx(e, profession._id);
                          }}
                        >
                          {profession.professionName}
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          onClick={() => {
                            setQuestionCard(true);
                            setBackdrop(true);
                          }}
                        >
                          {" "}
                          {profession.professionName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bigClass">
                    {noDuplicates.slice(10, 16).map((profession) => {
                      return user.isLoggedIn ? (
                        <Link
                          to={`/searchlist?professions=${profession.professionName}&index=${profession._id}`}
                          key={profession._id}
                          onClick={(e) => {
                            asx(e, profession._id);
                          }}
                        >
                          {profession.professionName}
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          onClick={() => {
                            setQuestionCard(true);
                            setBackdrop(true);
                          }}
                        >
                          {" "}
                          {profession.professionName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bigClass last">
                    {noDuplicates.slice(15, 21).map((profession) => {
                      return (
                        <Link
                          to={`/searchlist?professions=${profession.professionName}`}
                          key={profession._id}
                          onClick={(e) => {
                            asx(e, profession._id);
                          }}
                        >
                          {profession.professionName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <p className="title my-4">Positions by location</p>
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div className="bigClass">
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=NewSouthWales"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Sydney
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn ? "/searchlist?location=Victoria" : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Melbourne
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=Queensland"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Brisbane
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=WesternAustralia"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Perth
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=SouthAustralia"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Adelaide
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bigClass">
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=AustralianCapitalTerritory"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Canberra
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=Queensland"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Gold Coast
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=NewSouthWales"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Newcastle
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=NewSouthWales"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      New South Wales
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=Queensland"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Queensland
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bigClass">
                    <Link
                      to={
                        user.isLoggedIn ? "/searchlist?location=Victoria" : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Victoria
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn ? "/searchlist?location=Tasmania" : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Tasmania
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=NorthernTerritory"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Northern Territory
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=SouthAustralia"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      South Australia
                    </Link>
                    <Link
                      to={
                        user.isLoggedIn
                          ? "/searchlist?location=WesternAustralia"
                          : "#"
                      }
                      onClick={(e) => {
                        user.isLoggedIn ? asx(e) : setQuestionCard(true);
                        setBackdrop(true);
                      }}
                    >
                      Western Australia
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bigClass last">
                    <Link to="searchlist?location=New Zealand">Auckland</Link>
                    <Link to="searchlist?location=New Zealand">Hamilton</Link>
                    <Link to="searchlist?location=New Zealand">Wellington</Link>
                    <Link to="searchlist?location=New Zealand">
                      Christchurch
                    </Link>
                    <Link to="searchlist?location=New Zealand">Dunedin</Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ borderBottom: "1px solid #fff" }}
              className="container pb-4"
            ></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="container title my-2">
                <span
                  className="mr-3 text-white"
                  style={{ fontWeight: "200", fontSize: "12px" }}
                >
                  <span style={{ fontWeight: "200" }}>{thisyear}</span> © Orange
                  Tech Pty Limited ABN 49 649 839 609{" "}
                </span>
                <p
                  style={{
                    marginBottom: "0",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  All right reserved.
                </p>
              </div>

              <div className="container title my-2">
                <span
                  className="mr-3 text-white"
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    marginBottom: "2px",
                    marginRight: "10px",
                  }}
                >
                  Subscribe to our newsletter
                </span>
                <button className="subscribe-btn">
                  <Link to="/subscription">Subscribe</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="container-fluid">
          <div
            className="container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link to="/terms_and_conditions_au">Terms & Conditions</Link>{" "}
            <Link to="/privacy_au">Privacy</Link>{" "}
            <Link to="/refund_au">Refund Policy</Link>{" "}
            <ExternalLink
              id="fbicon"
              href="https://www.facebook.com"
              target="_blank"
            >
              <img src="/images/facebook.png" alt="" width="18px" /> Facebook
            </ExternalLink>
          </div>
        </footer>
      </div>
      <style jsx="true">{`
        .wrap .pageBottom {
          padding: 50px 0 25px;
          background: #eeebeb;
        }
        .wrap .pageBottom a {
          text-decoration: none;
          color: #777;
          padding: 5px 10px;
          margin-right: 15px;
          font-family: 13px;
        }
        .wrap .pageBottom a:hover {
          color: #14a248;
        }
        .wrap .pageBottom .mainTitle {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
        .wrap .pageBottom .title {
          font-size: 14px;
          color: #777;
          padding: 0 9px;
        }
        .wrap .pageBottom .bigClass {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }
        .wrap .pageBottom .bigClass > a {
          padding: 0;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 3px;
          color: #777;
          z-index: 100;
        }
        .wrap .pageBottom .bigClass > a:hover {
          color: #14a248;
        }
        .wrap .container-fluid {
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          padding-left: 0;
          padding-right: 0;
        }
        .wrap .pageBottom-logo {
          margin-left: 9px;
          margin-bottom: 20px;
        }
        footer {
          padding: 30px 0;
          font-size: 14px;
          background: #fff;
        }
        footer a {
          text-decoration: none !important;
          color: #777;
          margin-right: 15px;
        }
        footer a:hover {
          color: #14a248;
        }
        footer a {
          text-align: center;
          display: inline-block;
          color: #777;
          width: 170px;
          font-weight: 500;
        }
        footer #fbicon:hover {
          text-decoration: none;
          color: #3b5998;
        }
        footer img {
          margin: 0 3px;
          filter: grayscale(100%);
          transition: all 200ms linear 0ms;
        }
        footer a:hover img {
          text-decoration: none;
          filter: grayscale(0%);
        }

        .wrap .pageBottom .subscribe-btn {
          background-color: #2b2b2b;
          font-size: 14px;
          letter-spacing: normal;
          font-weight: 500;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          height: 35px;
          width: 100px;
          border: none;
          outline: none;
        }

        .wrap .subscribe-btn a:hover {
          color: white;
        }
        .wrap .subscribe-btn a {
          height: 100%;
          width: 100%;
          display: block;
          color: white;
          line-height: 25px;
        }

        @media screen and (max-width: 768px) {
          .wrap .pageBottom a {
            margin-right: 0;
          }
          .wrap .pageBottom .mainTitle {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
          }
          .wrap .pageBottom .mainTitle .tonBtn {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            font-family: "amplitude";
            font-weight: 100;
          }
          .wrap .pageBottom .mainTitle .tonBtn > a {
            min-width: 35px;
            margin-bottom: 10px;
            margin-right: 15px;
            font-size: 13px;
          }

          .wrap .pageBottom p {
            text-align: center;
          }
          .wrap .pageBottom .bigClass {
            text-align: center;
          }
          .wrap footer > .container {
            text-align: center;
          }
          .wrap footer span {
            display: block;
            margin-bottom: 10px;
            text-align: center;
          }
        }

        /* ========== LOGIN QUESTION CARD ============= */

        .backdrop {
          position: fixed;
          background-color: rgba(33, 40, 46, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 4500;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .wrap .loginQuestionCard {
          width: 340px;
          min-height: 80vh;
          padding: 20px 10px;
          align-items: center;
          border-radius: 0px;
          background: #fff;
          -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          z-index: 3000;
          transform: translate(-50%, -50%);
          top: 52%;
          left: 50%;
          position: fixed;
          display: block;
          animation: mailframe 500ms ease-in 0ms;
        }
        @keyframes mailframe {
          from {
            transform: translate(-50%, -30%);
            opacity: 0;
          }
          to {
            transform: translateY(-50%, -50%);
            opacity: 1;
          }
        }

        .wrap .loginQuestionCard > figure {
          width: 200px;
          margin: 0px auto 16px;
        }
        .wrap .loginQuestionCard > figure > a {
          display: block;
        }

        .wrap .loginQuestionCard .regCon {
          margin: 0px auto;
          width: 90%;
        }
        @media screen and (max-width: 768px) {
          .wrap .loginQuestionCard .regCon {
            width: 100%;
          }
        }
        .wrap .loginQuestionCard #email {
          background-image: url(./../../images/mail.png);
          background-repeat: no-repeat;
          background-size: 16px;
          background-position: 360px;
        }
        .wrap .loginQuestionCard #password {
          background-image: url(./../../images/lock.png);
          background-repeat: no-repeat;
          background-size: 15px;
          background-position: 360px;
        }

        .wrap .loginQuestionCard .input-group input:focus + label {
          transform: translate(-8px, -32px) scale(0.9);
          font-size: 14px;
          opacity: 1;
        }
        .wrap .loginQuestionCard .input-group input.springbok + label {
          transform: translate(-8px, -32px) scale(0.9);
          font-size: 14px;
          opacity: 0;
        }

        .wrap .loginQuestionCard .input-group {
          display: block;
          margin-right: 20px;
          position: relative;
        }

        .wrap .loginQuestionCard .input-group label {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          left: 0%;
          font-family: sans-serif;
          font-size: 14px;
          color: #777;
          font-weight: 500;
          padding: 0px 0px;
          pointer-events: none;
          transition: all 300ms ease-in-out 0ms;
        }
        .wrap .loginQuestionCard h2 {
          font-family: sans-serif;
          text-align: center;
          font-weight: 400;
          font-size: 28px;
          width: 100%;
          margin: 10px auto;
          padding-top: 8px;
          padding-bottom: 8px;
          color: #2b2b2b;
        }
        .wrap .loginQuestionCard p {
          margin: 10px auto;
          text-align: center;
          color: #777;
          width: 100%;
          font-size: 15px;
          font-weight: 500;
          font-family: sans-serif;
        }
        .wrap .loginQuestionCard a {
          margin-bottom: 0;
          width: 100%;
          font-size: 15px;
          font-weight: 700;
          font-family: sans-serif;
          color: #14a248;
        }
        .loginQuestionCard .btn-login,
        #facebook-login,
        #google-login {
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
        .wrap .loginQuestionCard .btn-login {
          line-height: 32px;
          color: #fff;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #14a248;
          border-color: #14a248;
        }

        .wrap .loginQuestionCard #facebook-login {
          background-color: #3a5ba0;
          border: 2px solid #3a5ba0;
          position: relative;
          cursor: pointer;
          color: white;
        }
        .wrap .loginQuestionCard #facebook-login a {
          font-weight: 800;
          font-size: 20px;
          color: #fff;
          position: relative;
          display: block;
          width: 100%;
        }
        .wrap .loginQuestionCard #google-login {
          background-color: #fff;
          border: 1px solid #333;
          position: relative;
          cursor: pointer;
        }
        .wrap .loginQuestionCard #google-login a {
          font-weight: 800;
          font-size: 20px;
          color: #333;
          position: relative;
          display: block;
          width: 100%;
        }
        .wrap .loginQuestionCard .form-group {
          height: 52px;
        }
        .wrap .loginQuestionCard input[type="text"],
        .wrap .loginQuestionCard input[type="password"],
        .wrap .loginQuestionCard input[type="email"] {
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
          font-family: sans-serif;
        }

        .wrap .loginQuestionCard .form-check-input {
          position: absolute;
          margin-top: 0.3rem;
          margin-left: 0.5rem;
        }
        .wrap .loginQuestionCard .form-check-label {
          margin-bottom: 10px;
          color: #777;
          width: 100%;
          font-size: 15px;
          font-weight: 500;
          font-family: sans-serif;
        }

        input[type="password"]:active,
        input[type="password"]:focus,
        input[type="email"]:focus,
        input[type="email"]:active {
          outline: 3px solid #14a248;
          border: none;
        }
        .input-group label {
          display: block;
        }
        form .row {
          margin: 0px;
        }

        input[type="checkbox"] {
          display: none;
        }

        .container {
          text-align: center;
        }

        @media only screen and (min-width: 768px) {
          .container {
            text-align: left;
          }

          .backdrop {
            display: block;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: #3f3f3f;
            z-index: 100;
            opacity: 0.8;
            cursor: auto;
          }

          .wrap .loginQuestionCard {
            width: 468px;
            padding: 30px 0px;
            z-index: 2500;
          }

          .wrap .content4 > .comment {
            padding: 20px 40px;
          }
          .content5 .btn-med {
            top: 75%;
            left: 12%;
          }

          .form-check-input {
            margin-left: -1.25rem;
          }
          .form-check-label {
            margin-left: 0px;
            font-size: 16px;
          }
          .loginQuestionCard .input-group input:focus + label {
            transform: translate(-8px, -32px) scale(0.9);
          }
          .loginQuestionCard .input-group input.springbok + label {
            transform: translate(-8px, -32px) scale(0.9);
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
