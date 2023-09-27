import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { FiEyeOff, FiEye } from "react-icons/fi";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../redux/userInfo";

// Three dots
import { ThreeDots } from "react-loader-spinner";
import { HiOutlineXCircle } from "react-icons/hi";

const HomeNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const user = useSelector((state) => state.userInfo.value);
  console.log(user);
  ReactSession.setStoreType("localStorage");
  const [listOfProfessions, setListOfProfessions] = useState([]);
  const [showemp, setShowEmp] = useState(false);
  const [showprofession, setShowProfession] = useState(false);
  const [contractType, setContractType] = useState("");
  const [profession, setProfession] = useState("");

  const onNext = (e) => {
    e.preventDefault();

    localStorage.setItem("professions", profession);
    localStorage.setItem("contractType", contractType);
    if (localStorage.getItem("contractType") === "Locum") {
      navigate("/question3");
    } else {
      navigate("/question5");
    }
  };

  // ============= POPULATE SESSION DATA =================

  const setSession = (e) => {
    setContractType(e.target.innerHTML);
    localStorage.setItem("contractType", e.target.innerHTML);
    setProfession("");
    localStorage.setItem("professions", "");
  };

  useEffect(() => {
    let isCancelled = false;

    if (!localStorage.getItem("professions")) {
      setProfession("");
    } else {
      setProfession(localStorage.getItem("professions"));
    }

    if (!localStorage.getItem("contractType")) {
      setContractType("");
    } else {
      setContractType(localStorage.getItem("contractType"));
    }

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:4000/api/listings/homenavlist?" +
          "contract=" +
          contractType
      );
      const data = await res.json();

      if (isCancelled === false) {
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
  }, [contractType]);

  // ========== ERROR MESSAGE ===============

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

  // ============= GOOGLE AND FACEBOOK LOGIN ===============
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  let token = params.get("token");
  let access = params.get("access");
  access = access === "true";

  // ========= GOOGLE & FACEBOOK LOGIN DATA ===========
  useEffect(() => {
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);
      window.history.pushState({}, document.title, "/");
    }

    // ============ PROFILE DATA ===========
    if (id) {
      axios
        .get(
          "http://localhost:4000/api/users/allusers/" +
            localStorage.getItem("userId")
        )
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("userId", response.data._id);
            dispatch(
              login({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                filename: response.data.filename,
                isLoggedIn: true,
                isLocum: response.data.isLocum,
                isActive: response.data.isActive,
                nanoId: response.data.nanoId,
                isAdmin: response.data.isAdmin,
                completeAccess: access,
              })
            );
          }
        });
    }
  }, [id]);

  const googleUrlAddress = `http://localhost:4000/auth/google?dd=${location.pathname}`;

  const facebookUrlAddress = `http://localhost:4000/auth/facebook?dd=${location.pathname}`;

  // ================ POST ===================
  const [, setFirstName] = useState("");
  const [, setLastName] = useState("");
  const [, setState] = useState("");

  const onSubmit = (values, { setSubmitting }) => {
    ReactSession.set("remember", rememberMe);
    if (ReactSession.get("remember") === true) {
      ReactSession.set("email", email);
    } else {
      ReactSession.set("email", "");
      ReactSession.remove("email");
    }
    setTimeout(() => {
      fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email, password: values.password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.invalid) {
            outPutErrorMessages(data.invalid);
          }
          if (
            data.user.survey === "" ||
            data.user.phone === "" ||
            data.user.profession === "" ||
            data.user.street === ""
          ) {
            ReactSession.set("displayName", data.user.firstName);
            localStorage.setItem("userId", data.user._id);
            setState(data.user.state);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
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
          } else {
            ReactSession.set("displayName", data.user.firstName);
            localStorage.setItem("userId", data.user._id);
            setState(data.user.state);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
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
                completeAccess: true,
              })
            );
            navigate("/");
          }
        })
        .catch((err) => {
          if (err) {
            console.error(err);
          }
          setSubmitting(false);
        });
    }, 300);
  };

  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessages(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }

  // ========= DISPLAY NAME in NAV DROPDOWN BUTTON =======
  const [, setDisplayName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");

  // =========== POPULATE LOCAL STORAGE DATA =============
  useEffect(() => {
    setRememberMe(ReactSession.get("remember"));
    if (ReactSession.get("remember") === true) {
      setEmail(ReactSession.get("email"));
      setDisplayName(ReactSession.get("displayName"));
    } else {
      ReactSession.set("displayName", "");
      ReactSession.remove("displayName");
    }
  }, []);

  return (
    <>
      <section className="content1 container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="#">
            <img
              className="img-fluid"
              src="/images/medclicker-white.png"
              width="180px"
              alt=""
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item4">
                <a className="nav-link" href="/contact">
                  Contact us
                </a>
              </li>

              {user.isActive === true && user.completeAccess === true ? (
                <li className="nav-item3">
                  <Link className="nav-link" to="/searchlist">
                    Search positions
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item2">
                {user.isLoggedIn ? (
                  <ExternalLink
                    className="nav-link"
                    target="_self"
                    href="/logout"
                  >
                    Log Out
                  </ExternalLink>
                ) : (
                  <Link className="nav-link" to="/signup">
                    Sign up
                  </Link>
                )}
              </li>
              {user.isLoggedIn ? (
                <li className="nav-item5">
                  <Link to="/dashboard">
                    <figure className="smallPhoto">
                      <img src={user.filename} alt="" />
                    </figure>
                  </Link>
                </li>
              ) : (
                <li className="nav-item1">
                  <Link
                    className="nav-link"
                    to="#"
                    onClick={() => {
                      setOpenDropDown(!openDropDown);
                      setUpdateNote(false);
                    }}
                  >
                    Log in
                  </Link>

                  <div id="dropItem" className={openDropDown ? "open" : ""}>
                    {/* FORMIK IS HERE */}
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      onSubmit={onSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form id="loginForm">
                          <h2 className="nonselect">Login</h2>
                          <div className="container-fluid errorMessageHere">
                            {updateNote ? (
                              <div className="updateNote">
                                <img
                                  onClick={() => {
                                    setUpdateNote(false);
                                  }}
                                  src="/images/cross-black.png"
                                  style={{ width: "12px", cursor: "pointer" }}
                                  alt=""
                                />{" "}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: errorMsg,
                                  }}
                                ></span>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="input-group">
                            <button className="nonselect" id="facebook-login">
                              <img
                                src="/images/fb.png"
                                alt=""
                                style={{ width: "24px" }}
                              />
                              <ExternalLink
                                href={facebookUrlAddress}
                                target="_self"
                              >
                                Facebook Login
                              </ExternalLink>
                            </button>
                            <p className="nonselect">or</p>
                            <button className="nonselect" id="google-login">
                              <img
                                src="/images/googlelogin.png"
                                alt=""
                                width="20px"
                              />
                              <ExternalLink
                                href={googleUrlAddress}
                                target="_self"
                              >
                                Google Login
                              </ExternalLink>
                            </button>
                            <p className="nonselect">or</p>
                          </div>
                          <div className="form-group row">
                            <div className="input-group">
                              <label className="nonselect" htmlFor="email">
                                Email
                              </label>
                              <Field
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.currentTarget.value);
                                }}
                              />
                              <ErrorMessage name="email" component="div" />
                              <span
                                onClick={() => {
                                  setEmail("");
                                }}
                                style={{
                                  position: "absolute",
                                  top: "43px",
                                  right: "12px",
                                }}
                              >
                                <HiOutlineXCircle
                                  style={{
                                    color: "#888",
                                    fontSize: "21px",
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="input-group">
                              <label className="nonselect" htmlFor="password">
                                Password
                              </label>
                              <Field
                                type={show ? "text" : "password"}
                                name="password"
                                id="password"
                                autoComplete="off"
                              />
                              <ErrorMessage name="password" component="div" />
                              <span
                                onClick={() => {
                                  setShow(!show);
                                }}
                                style={{
                                  position: "absolute",
                                  top: "43px",
                                  right: "12px",
                                }}
                              >
                                {show ? (
                                  <FiEye
                                    style={{
                                      color: "#888",
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                  />
                                ) : (
                                  <FiEyeOff
                                    style={{
                                      color: "#888",
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                  />
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            {rememberMe ? (
                              <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={rememberMe}
                                onChange={(e) => {
                                  setRememberMe(e.target.checked);
                                }}
                              />
                            ) : (
                              <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={rememberMe}
                                onChange={(e) => {
                                  setRememberMe(e.target.checked);
                                }}
                              />
                            )}

                            <label htmlFor="remember" className="nonselect">
                              Remember details
                            </label>
                          </div>

                          <div
                            className="form-group"
                            style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <p className="nonselect">
                              <Link
                                to="/forgotpassword"
                                style={{ fontSize: "14px" }}
                              >
                                Forgot Password?
                              </Link>
                            </p>
                          </div>

                          <div className="form-group row">
                            <div className="input-group">
                              {!isSubmitting && (
                                <button
                                  type="submit"
                                  id="login"
                                  disabled={isSubmitting}
                                >
                                  Login
                                </button>
                              )}
                              {isSubmitting && (
                                <button
                                  id="login"
                                  style={{
                                    justifyContent: "space-around",
                                    display: "flex",
                                  }}
                                >
                                  <ThreeDots
                                    type="ThreeDots"
                                    height={40}
                                    width={80}
                                    color={"#fff"}
                                  />
                                </button>
                              )}
                            </div>
                          </div>

                          <p
                            style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                              fontSize: "14px",
                            }}
                            className="nonselect"
                          >
                            Don't have an account?{" "}
                            <Link to="/signup" style={{ fontSize: "14px" }}>
                              Sign up
                            </Link>
                          </p>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <form style={{ display: "none" }} className="loginForm">
            <input type="email" style={{ display: "none" }} />
            <input type="checkbox" name="remember" />
          </form>
          <i
            className="nonselect"
            style={{ display: "none" }}
            id="show-more"
          ></i>
          <div
            id="hamburger"
            onClick={() => {
              setOpenHamburger(!openHamburger);
            }}
          ></div>
          <div className="questionCard container">
            <div className="btnGroup">
              <div className="createAListing">
                <p>Create a Listing</p>
                <form id="listingEngine" onSubmit={onNext}>
                  <div className="container2">
                    <label htmlFor="empType">Employment Type</label>
                    <input
                      autoComplete="off"
                      id="empType"
                      type="text"
                      placeholder="I want to employ in ..."
                      value={contractType ? contractType : ""}
                      onFocus={() => {
                        setShowProfession(false);
                        setShowEmp(true);
                      }}
                      onChange={() => {
                        setShowProfession(false);
                        setShowEmp(true);
                      }}
                    />
                    {showemp ? (
                      <div className="employmentType">
                        <ul>
                          <li
                            onClick={(e) => {
                              setShowEmp(false);
                              setSession(e);
                            }}
                          >
                            Full-Time
                          </li>
                          <li
                            onClick={(e) => {
                              setShowEmp(false);
                              setSession(e);
                            }}
                          >
                            Part-Time
                          </li>
                          <li
                            onClick={(e) => {
                              setShowEmp(false);
                              setSession(e);
                            }}
                          >
                            Locum
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="container1">
                    <label htmlFor="prof">Select Profession</label>
                    <input
                      autoComplete="off"
                      id="prof"
                      type="text"
                      placeholder="I need a ..."
                      value={profession ? profession : ""}
                      onFocus={() => {
                        setShowProfession(true);
                        setShowEmp(false);
                      }}
                      onChange={() => {
                        setShowProfession(true);
                        setShowEmp(false);
                      }}
                    />
                    {showprofession ? (
                      <div className="professionalList">
                        <ul>
                          {listOfProfessions.map((profession) => {
                            return (
                              <li
                                key={profession._id}
                                onClick={(e) => {
                                  setProfession(e.target.innerText);
                                  setShowProfession(false);
                                  localStorage.setItem(
                                    "professions",
                                    e.target.innerHTML
                                  );
                                }}
                              >
                                {profession.professionName}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {profession && contractType ? (
                    user.isLoggedIn ? (
                      <div className="container3">
                        <input id="create" value="Next" type="submit" />
                      </div>
                    ) : (
                      <div className="container3">
                        <input
                          id="create"
                          value="Create Listing"
                          type="button"
                          onClick={() => {
                            setQuestionCard(true);
                            setBackdrop(true);
                          }}
                        />
                      </div>
                    )
                  ) : (
                    <div className="container3">
                      <input
                        id="create"
                        disabled="disabled"
                        value="Create Listing"
                        type="button"
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </nav>
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
                      className={
                        vanishpwd && password !== "" ? "springbok" : ""
                      }
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
                  <input
                    type="submit"
                    className="btn btn-login"
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
                )}

                <p>OR</p>
                <button id="facebook-login">
                  <ExternalLink href={facebookUrlAddress} target="_self">
                    <img
                      src="/images/fb.png"
                      alt=""
                      style={{ width: "28px" }}
                    />
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

        {openHamburger && (
          <div id="ham-menu">
            <ul>
              {user.isLoggedIn ? (
                user.isActive === false ? (
                  <>
                    <li className="nonselect">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>

                    <li className="nonselect">
                      <Link to="/securitySettings">Security Settings</Link>
                    </li>
                    <li className="nonselect">
                      <ExternalLink href="/logout" target="_self">
                        Log Out
                      </ExternalLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nonselect">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nonselect">
                      <Link to="/personal-details">Personal Details</Link>
                    </li>
                    <li className="nonselect">
                      <Link to="/searchlist">Search Positions</Link>
                    </li>
                    <li className="nonselect">
                      <Link to="/applicationsManage">Applications Manager</Link>
                    </li>
                    <li className="nonselect">
                      <Link to="/question1">Create Listing</Link>
                    </li>
                    <li className="nonselect">
                      <Link to="/listingmanager">Listing Manager</Link>
                    </li>
                    <li className="nonselect">
                      <Link to="/securitySettings">Security Settings</Link>
                    </li>
                    <li className="nonselect">
                      <ExternalLink href="/logout" target="_self">
                        Log Out
                      </ExternalLink>
                    </li>
                  </>
                )
              ) : (
                <>
                  <li className="nonselect">
                    <Link to="/contact">Contact us</Link>
                  </li>
                  <li className="nonselect">
                    <Link to="/signup">Sign up</Link>
                  </li>
                  <li className="nonselect">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </section>
      <style jsx="true">{`
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

        /* ========== NAVBAR SELECTIONS ============= */

        nav .nav-link {
          font-weight: 800;
          font-size: 14px;
        }

        nav .nav-item1::after,
        nav .nav-item2::after,
        nav .nav-item3::after,
        nav .nav-item4::after {
          content: "";
          height: 2px;
          background-color: white;
          width: 100%;
          transform: scaleX(0);
          display: block;
        }
        nav .nav-item1:hover::after,
        nav .nav-item2:hover::after,
        nav .nav-item3:hover::after,
        nav .nav-item4:hover::after {
          transform: scaleX(1);
        }
        nav .nav-item1:hover::after {
          width: 42%;
          transform: translateX(70%);
        }

        nav .nav-item2:hover::after {
          width: 50%;
          transform: translateX(50%);
        }
        nav .nav-item3:hover::after {
          width: 67%;
          transform: translateX(25%);
        }
        nav .nav-item4:hover::after {
          width: 57%;
          transform: translateX(37%);
        }

        /* =========== DROPDOWN ================ */
        #dropItem {
          width: 280px;
          background-color: #f4f5f6;
          position: absolute;
          top: 70px;
          left: 78%;
          border: 1px solid #ebebeb;
          border-top: none;
          display: none;
          padding: 8px 12px;
          z-index: 2500;
        }

        #dropItem.open {
          display: block;
        }
        .nonselect {
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */
        }

        #dropItem h2,
        #dropItem label {
          text-align: left;
        }

        #dropItem p {
          margin: 6px auto;
          font-size: 12px;
        }

        .nav-item5 .smallPhoto {
          overflow: hidden;
          position: relative;
          border-radius: 50%;
          width: 39px;
          height: 39px;
          background: #eee;
          border: 2px solid white;
          cursor: pointer;
        }
        .nav-item5 .smallPhoto img {
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

        .nav-item5 .smallPhoto .blankImage {
          position: relative;
          height: 40px;
          width: 40px;
        }

        #loginForm input[type="email"] {
          border: 2px solid rgb(218, 218, 218);
          width: 100%;
          height: 46px;
          outline: none;
          display: block;
          padding: 5px 15px;
          margin-bottom: 16px;
          font-size: 13px;
          font-weight: 500;
        }

        #loginForm input[type="password"],
        #loginForm input[type="text"] {
          border: 2px solid rgb(218, 218, 218);
          width: 100%;
          height: 46px;
          outline: none;
          display: block;
          padding: 5px 15px;
          font-size: 13px;
          font-weight: 500;
        }

        .updateNote {
          background-color: #fcebcd;
          margin: 5px auto 12px;
          padding: 7px;
        }
        .navbar-nav ul li .updateNote {
          font-size: 12px;
          line-height: 22px;
        }

        #dropItem #login,
        #dropItem #facebook-login,
        #dropItem #google-login {
          color: #fff;
          width: 100%;
          height: 46px;
          line-height: 40px;
          outline: none;
          display: block;
          font-weight: 800;
          border-radius: 4px;
        }

        #dropItem #facebook-login {
          background-color: #3a5ba0;
          border: 2px solid #3a5ba0;
          position: relative;
        }
        #dropItem #facebook-login a {
          font-size: 14px;
          font-weight: 700;
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 42px;
          color: white;
        }

        #dropItem #facebook-login img {
          float: left;
          margin-right: 10px;
          position: absolute;
          transform: translate(-90px, 7px);
        }

        #dropItem #google-login {
          background-color: #fff;
          color: #333;
          border: 1px solid #333;
          position: relative;
        }
        #dropItem #google-login a {
          font-size: 14px;
          font-weight: 700;
          color: #333;
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 42px;
        }
        #dropItem #google-login img {
          float: left;
          margin-right: 10px;
          position: absolute;
          transform: translate(-85px, 11px);
        }

        #loginForm .input-group label {
          display: block;
          line-height: 24px;
        }
        nav form h2 {
          font-family: "Noto Sans TC", sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin: 20px auto;
        }
        nav form a {
          color: #14a248;
          text-decoration: none;
          font-weight: 700;
        }
        nav form p {
          font-weight: 500;
          color: #484848;
          margin: 13px auto;
        }
        nav form a:hover {
          color: #14a248;
        }

        nav input[type="checkbox"] + label {
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-family: sans-serif;
          font-weight: 500;
          margin: 2px 0px 8px 35px;
          width: 100%;
          display: block;
          color: #2b2b2b;
        }
        nav input[type="checkbox"] + label::before {
          content: " ";
          position: relative;
          left: -33px;
          top: 21px;
          width: 24px;
          height: 24px;
          display: block;
          background: white;
          border-radius: 0px;
          border: 2px solid rgb(218, 218, 218);
        }
        nav input[type="checkbox"] + label::after {
          content: " ";
          position: absolute;
          left: -31px;
          top: 24px;
          width: 19px;
          height: 19px;
          display: block;
          z-index: 1;
          background: url("./../../images/tick.png");
          background-repeat: no-repeat;
          background-size: 15px;
          background-position: center;
          -webkit-transform: scale(0);
          transform: scale(0);
          opacity: 0;
          outline: 3px solid #14a248;
          border: none;
        }
        nav input[type="checkbox"]:checked + label::after {
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 1;
        }

        nav #login {
          border: 2px solid #14a248;
          color: #fff;
          background-color: #14a248;
          width: 100%;
          height: 46px;
          outline: none;
          display: block;
          font-weight: 800;
          border-radius: 4px;
        }
        nav #login:hover {
          cursor: pointer;
        }

        #hamburger {
          background: url("./../../images/menu.png");
          background-repeat: no-repeat;
          background-size: 45%;
          background-position: center;
          cursor: pointer;
          position: absolute;
          height: 85px;
          width: 80px;
          display: block;
          transform: translate(-50%, -50%);
          top: 55%;
          left: 90%;
        }

        #ham-menu ul li a {
          color: white;
          position: relative;
          display: block;
          width: 100%;
        }
        #ham-menu ul {
          padding: 0px 0px 0px 0px;
          margin: 0px 1em 1em;
        }
        #ham-menu ul li {
          list-style: none;
          color: white;
          background-color: #2b2b2b;
          opacity: 0.8;
          height: 50px;
          line-height: 50px;
          width: 100%;
          padding-left: 30px;
          border-bottom: 1px solid #777;
          border-left: 3px solid transparent;
        }

        #ham-menu ul li:hover {
          border-left: 3px solid #14a248;
          cursor: pointer;
        }
        #ham-menu ul li {
          display: block;
        }
        @media screen and (min-width: 768px) {
          #hamburger {
            display: none;
          }
          #ham-menu {
            display: none;
          }
        }
        /* =========== EMPLOYMENT AND CONTRACT TYPE ================ */

        input[type="text"] {
          outline: none;
          height: 45px;
          color: #2b2b2b;
          padding: 10px 10px 10px 18px;
          margin-bottom: 0px;
          width: 100%;
          display: inline-block;
          font-size: 16px;
          left: 50%;
        }

        .container1,
        .container2 {
          display: inline-block;
          position: relative;
          width: 100%;
        }

        .container3 {
          display: inline-block;
          position: relative;
          width: 100%;
        }
        .container1 ul,
        .container2 ul {
          width: 100%;
        }

        .container1 ul li,
        .container2 ul li {
          background-color: #f4f5f6;
          text-decoration: none;
          cursor: pointer;
          list-style-type: none;
          display: inline-block;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #dadada;
          border-left: 2px solid #dadada;
          border-right: 2px solid #dadada;
          padding-left: 18px;
          z-index: 2000;
          position: relative;
          display: block;
        }

        .container1 ul,
        .container2 ul {
          position: absolute;
          margin: 0;
          padding: 0;
        }
        @media only screen and (min-width: 768px) {
          .container1,
          .container2,
          .container3 {
            width: 321px;
            position: relative;
          }
        }

        /* =========== QUESTION CARD ================ */
        .wrap .questionCard {
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 605px;
          padding-bottom: 26px;
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
          background: #2b2b2b;
          -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          z-index: 1000;
        }

        .wrap .questionCard .btnGroup {
          width: 90%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }
        .wrap .questionCard .btnGroup > button {
          background: #fff;
          color: #6b7c93;
          padding: 0;
          margin-bottom: 20px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .wrap .questionCard .btnGroup > button:hover {
          background: #14a248;
          color: #fff;
        }
        .wrap .questionCard .btnGroup > button:active {
          background: #14a248;
          color: #fff;
        }
        .wrap .questionCard .btnGroup > button > a {
          display: block;
          padding: 12px 20px;
          color: #6b7c93;
        }
        .wrap .questionCard .btnGroup > button > a:hover {
          color: #fff;
        }
        .createAListing p {
          width: 120px;
          height: 30px;
          margin-bottom: 10px;
          font-size: 15px;
          color: #fff;
        }
        .createAListing p::after {
          content: "";
          height: 2px;
          background-color: #14a248;
          display: block;
          width: 88%;
        }

        .createAListing {
          width: 100%;
          height: 250px;
          background-color: #2b2b2b;
          position: relative;
        }

        #prof {
          outline: none;
          height: 45px;
          color: #2b2b2b;
          background-color: white;
          padding: 10px 10px 10px 18px;
          width: 100%;
          display: block;
          font-size: 16px;
          margin-left: 0px;
          left: 50%;
        }
        #empType {
          outline: none;
          height: 45px;
          color: #2b2b2b;
          background-color: white;
          padding: 10px 10px 10px 18px;
          width: 100%;
          display: block;
          font-size: 16px;
          margin-left: 0px;
          left: 50%;
        }
        #listingEngine {
          position: relative;
          width: 100%;
          left: 0%;
        }

        #listingEngine label {
          color: white;
          position: relative;
          transform: translateY(10%);
          width: 100%;
          font-weight: 100;
          font-size: 14px;
          display: block;
          margin-bottom: 4px;
        }
        #prof:active,
        #prof:focus,
        #empType:active,
        #empType:focus {
          outline: none;
        }
        input[type="submit"] {
          text-align: center;
          height: 45px;
          line-height: 45px;
          width: 100%;
          display: inline-block;
          font-size: 16px;
          color: white;
          background-color: #14a248;
          border-radius: 4px;
          border: none;
          outline: none;
          cursor: pointer;
        }

        .professionalList {
          position: absolute;
          z-index: 2000;
          width: 100%;
          display: block;
        }
        .professionalList ul {
          position: relative;
          margin: 0px;
          padding: 0;
          width: 100%;
        }

        .professionalList ul li {
          background-color: #f4f5f6;
          text-decoration: none;
          cursor: pointer;
          list-style-type: none;
          display: inline-block;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #dadada;
          border-left: 2px solid #dadada;
          border-right: 2px solid #dadada;
          padding-left: 18px;
          position: relative;
          width: 99%;
        }
        .professionalList ul li:hover {
          background-color: white;
          border-left: 3px solid #14a248;
          padding-left: 17px;
        }
        .employmentType {
          position: absolute;
          z-index: 2000;
          width: 100%;
          display: block;
        }
        .employmentType ul {
          position: relative;
          margin: 0px;
          padding: 0;
          width: 100%;
        }
        .employmentType ul li {
          background-color: #f4f5f6;
          text-decoration: none;
          cursor: pointer;
          list-style-type: none;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #dadada;
          border-left: 2px solid #dadada;
          border-right: 2px solid #dadada;
          padding-left: 18px;
          position: relative;
          width: 99%;
        }
        .employmentType ul li:hover {
          background-color: white;
          border-left: 3px solid #14a248;
          padding-left: 17px;
        }

        .wrap .questionCard #create {
          color: #fff;
          background-color: #14a248;
          text-align: center;
          height: 45px;
          line-height: 45px;
          width: 100%;
          display: inline-block;
          font-size: 16px;
          border-radius: 4px;
          border: none;
          outline: none;
          cursor: pointer;
          margin-top: 12px;
        }
        .wrap .questionCard #create:disabled {
          background-color: #ddd;
          color: #888;
          cursor: auto;
          margin-top: 12px;
        }

        @media only screen and (min-width: 768px) {
          .createAListing {
            height: 150px;
            margin: 0 auto;
            width: 100%;
            padding-bottom: 10px;
          }

          #listingEngine label {
            position: relative;
            width: 100%;
          }

          #empType:hover {
            background-position: 165px;
          }

          #empType {
            background-position: 165px;
            margin-bottom: 0px;
            width: 300px;
            display: inline-block;
            font-size: 16px;
            margin-right: 25px;
            border-left: none;
            border-right: none;
            border-top: none;
          }
          #prof {
            background-position: 165px;
            margin-bottom: 0px;
            width: 300px;
            display: inline-block;
            font-size: 16px;
            margin-right: 25px;
            border-left: none;
            border-right: none;
            border-top: none;
          }
          #prfo:hover {
            background-position: 165px;
          }
          #listingEngine input[type="submit"] {
            width: 300px;
            margin-top: 0px;
          }

          .questionCard {
            top: 600px;
          }

          .nav-box {
            left: 96%;
          }

          .professionalList {
            width: 94%;
          }
          .employmentType {
            width: 94%;
          }
        }
      `}</style>
    </>
  );
};

export default HomeNav;
