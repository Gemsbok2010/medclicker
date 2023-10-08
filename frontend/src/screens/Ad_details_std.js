import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Ad_details_std = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2];
  const [list, setList] = useState({});

  const user = useSelector((state) => state.userInfo.value);

  // ============ AHPRA =============
  const [showAhpra, setShowAhpra] = useState(false);
  const [ahpra, setAhpra] = useState("");

  const handleShowAhpra = () => {
    setShowAhpra(false);
  };

  const handleSetAhpra = (e) => {
    const innerHTML = e.target.innerHTML;
    setAhpra(innerHTML);
  };

  // ============ ELIGIBILITY STATUS =============
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState("");

  const handleShowStatus = () => {
    setShowStatus(false);
  };

  const handleSetStatus = (e) => {
    const innerHTML = e.target.innerHTML;
    setStatus(innerHTML);
  };

  // ====== MANAGE SELECTDATE (right booking engine) ======
  var media = window.matchMedia("(min-width:768px)");
  window.onscroll = function () {
    var topContainer =
      document.querySelector(".top-container").clientHeight - 60;
    var selectDateHeight =
      document.querySelector("#selectdate").clientHeight + 2;
    var y = window.pageYOffset + selectDateHeight;
    if (media.matches) {
      if (y <= topContainer) {
        document.querySelector("#selectdate").style.cssText =
          "margin-left:700px;";
      } else {
        document.querySelector("#selectdate").style.cssText =
          "position:sticky; top:3000px; margin-left:-27px";
      }
    } else {
      document.querySelector("#selectdate").style.cssText =
        "background-color:white";
    }
  };
  const [verifyEmail, setVerifyEmail] = useState("");

  useEffect(() => {
    // ============ LISTINGS DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/Ad_details_std/" +
          slug
      )
      .then((response) => {
        if (response.status === 200) {
          setList(response.data.listing);
          setVerifyEmail(response.data.listing.email);
          setTodaysDate(response.data.listing.todaysDate);
          setAbout(response.data.listing.about);
          setCountry(response.data.listing.country);
          setState(response.data.listing.state);
          setPostalCode(response.data.listing.postalCode);
          setSuburb(response.data.listing.suburb);
          setStreet(response.data.listing.street);
          setStreetNo(response.data.listing.streetNo);
          setLatitude(response.data.listing.latitude);
          setLongitude(response.data.listing.longitude);
          setProfessions(response.data.listing.professions);
          setContractType(response.data.listing.contractType);
        }
      });
  }, []);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");

  const [contractType, setContractType] = useState("");
  const [professions, setProfessions] = useState("");
  const [about, setAbout] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [, setCountry] = useState("");
  const [, setStreet] = useState("");
  const [, setStreetNo] = useState("");
  const [, setLongitude] = useState("");
  const [, setLatitude] = useState("");
  const [todaysDate, setTodaysDate] = useState("");

  // ============= FACEBOOK & GOOGLE LOGIN DATA ==============
  useEffect(() => {
    if (id) {
      window.history.pushState({}, document.title, "/Ad_details_std/" + slug);
    }
  }, [id]);

  // ============ LOGGEDIN APPLICANT APPLIED ===========
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          `api/applications/Ad_details/${slug}?nanoId=` +
          user.nanoId
      )
      .then((response) => {
        if (response.status === 200) {
          setApplied(response.data.applied);
        }
      });
  }, []);

  // ============ UPLOAD FILE ===========
  const [selectedFile, setSelectedFile] = useState(false);
  const [selectedCover, setSelectedCover] = useState(false);

  const resumeUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(true);
    }
  };

  const coverUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedCover(true);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Std Ad | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div className="top-container">
            <div className="ad-description">
              <div
                style={{
                  fontWeight: "500",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                Posted by {list.firstName}
                {verifyEmail === user.email ? (
                  <figure className="smallPhoto">
                    <img src={list.filename} alt="" />
                  </figure>
                ) : (
                  ""
                )}
              </div>

              <h2 className="mt-3 mb-4">
                {professions}{" "}
                {contractType === "Full-Time" ? (
                  <span className="highlight_fulltime">{contractType}</span>
                ) : contractType === "Part-Time" ? (
                  <span className="highlight_parttime">{contractType}</span>
                ) : contractType === "Locum" ? (
                  <span className="highlight_locum">{contractType}</span>
                ) : (
                  <span className="highlight_other">{contractType}</span>
                )}
              </h2>
              <p style={{ fontWeight: "900" }}>
                Location:{" "}
                <b>
                  {suburb}, {state} {postalCode}
                </b>
              </p>
              <p style={{ fontWeight: "900" }}>
                <b>Posted on: {todaysDate} </b>
              </p>
              <br />
              <p style={{ whiteSpace: "pre-wrap" }}> {about}</p>
              <br />

              <div className="container-job"></div>
            </div>

            <form
              id="selectdate"
              action={
                selectedFile && selectedCover
                  ? process.env.REACT_APP_BACKEND_URL +
                    `api/applications/upload?email=${user.email}&caseId=${list.caseId}&ahpra=${ahpra}&status=${status}`
                  : process.env.REACT_APP_BACKEND_URL +
                    `api/applications/singleUpload?email=${user.email}&caseId=${list.caseId}&ahpra=${ahpra}&status=${status}`
              }
              method="POST"
              encType="multipart/form-data"
            >
              <div className="container-price">
                <h2>
                  Application
                  <p></p>
                </h2>
              </div>

              <div className="container-license">
                <label htmlFor="ahpra">Are you registered with AHPRA?</label>
                <input
                  id="ahpra"
                  required
                  type="text"
                  value={ahpra}
                  autoComplete="off"
                  onFocus={() => {
                    setShowAhpra(!showAhpra);
                    setShowStatus(false);
                  }}
                  onChange={() => {
                    setShowAhpra(!showAhpra);
                    setShowStatus(false);
                  }}
                />
                {showAhpra ? (
                  <div className="ahpra">
                    <ul>
                      <li
                        onClick={(e) => {
                          handleSetAhpra(e);
                          handleShowAhpra();
                        }}
                      >
                        Yes, I declare that I am registered with AHPRA.
                      </li>
                      <li
                        onClick={(e) => {
                          handleSetAhpra(e);
                          handleShowAhpra();
                        }}
                      >
                        No, I am not registered with AHPRA.
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="container-status">
                <label htmlFor="status">Work Eligbility:</label>
                <input
                  id="status"
                  required
                  type="text"
                  value={status}
                  placeholder="Select work right status"
                  autoComplete="off"
                  onFocus={() => {
                    setShowStatus(!showStatus);
                    setShowAhpra(false);
                  }}
                  onChange={() => {
                    setShowStatus(!showStatus);
                    setShowAhpra(false);
                  }}
                />
                {showStatus ? (
                  <div className="status">
                    <ul>
                      <li
                        onClick={(e) => {
                          handleSetStatus(e);
                          handleShowStatus();
                        }}
                      >
                        I am an Australian Citizen/ Permanent Resident
                      </li>
                      <li
                        onClick={(e) => {
                          handleSetStatus(e);
                          handleShowStatus();
                        }}
                      >
                        I am a New Zealand Citizen
                      </li>
                      <li
                        onClick={(e) => {
                          handleSetStatus(e);
                          handleShowStatus();
                        }}
                      >
                        I need work visa sponsorship
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="container-resume">
                <p>Resume</p>
                <input
                  type="file"
                  required
                  id="resume"
                  name="resumeFile"
                  multiple="multiple"
                  accept=".doc,.docx, application/pdf"
                  onChange={(e) => {
                    resumeUpload(e);
                  }}
                />
                <label htmlFor="resume">
                  {selectedFile ? "File Attached" : "Upload File"}
                </label>
              </div>
              <div className="container-coverletter">
                <p>Cover Letter (Optional)</p>
                <input
                  type="file"
                  id="cover-letter"
                  name="resumeFile"
                  multiple="multiple"
                  accept=".doc,.docx, application/pdf"
                  onChange={(e) => {
                    coverUpload(e);
                  }}
                />
                <label htmlFor="cover-letter">
                  {selectedCover ? "File Attached" : "Upload File"}
                </label>
              </div>
              {applied.slice(0, 1).map((appId) => {
                return (
                  appId.caseId === list.caseId && (
                    <input
                      type="button"
                      className="appliedbefore"
                      value="Applied Already"
                    />
                  )
                );
              })}
              {applied.length === 0 ? (
                user.isLoggedIn ? (
                  verifyEmail !== user.email ? (
                    status && ahpra && selectedFile ? (
                      <input type="submit" className="btn-med" value="Apply" />
                    ) : (
                      <input
                        type="button"
                        className="btn-inactive"
                        value="Apply"
                      />
                    )
                  ) : (
                    <input
                      type="button"
                      className="btn-notself"
                      value="Cannot apply to your own listing"
                    />
                  )
                ) : (
                  <input
                    type="button"
                    className="btn-inactive"
                    id="loginFirst"
                    value="Apply"
                  />
                )
              ) : (
                ""
              )}
              {user.isLoggedIn ? (
                ""
              ) : (
                <div className="container-signup">
                  <p>
                    You need to login or sign up.
                    <Link target="_blank" to="/login">
                      {" "}
                      Login here
                    </Link>
                  </p>
                </div>
              )}
            </form>
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
            padding-top: 60px;
            background-color: #f4f5f6;
          }

          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .top-container {
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }

          input[type="text"] {
            outline: none;
            padding: 6px 10px 6px 13px;
            height: 40px;
            width: 170px;
            color: #2b2b2b;
            font-size: 13px;
            font-weight: 100;
            font-family: "roboto";
            margin-right: 15px;
            left: 50%;
            border: 1px solid #ebebeb;
          }

          /* ============ ALERT NOTICE =============== */
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
            z-index: 2000;
          }

          /* ============ LEFT BIG BANNER =============== */

          .wrap .ad-description figure {
            position: relative;
            display: block;
            margin: 0 auto;
          }

          .wrap .top-container .smallPhoto {
            position: absolute;
            display: inline-block;
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
            top: 10px;
            left: 8px;
          }

          .wrap .top-container .smallPhoto img {
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

          .ad-description {
            width: 470px;
            margin: 0px auto;
            background-color: white;
            position: relative;
            border: 1px solid #ebebeb;
            padding: 20px 30px 20px;
            display: block;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .ad-description h2 {
            font-size: 22px;
            color: #333;
            font-weight: 800;
          }
          .ad-description p {
            color: rgb(51, 51, 51);
            line-height: 20px;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
            width: 100%;
          }
          .highlight_locum {
            color: white;
            background: #14a248;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .highlight_fulltime {
            color: white;
            background: #54c8e8;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }
          .highlight_parttime {
            color: white;
            background: #a020f0;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .highlight_other {
            color: white;
            background: deeppink;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .container-price p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            font-family: sans-serif;
          }

          /* ========== RIGHT SMALL BANNER =========== */

          #selectdate {
            width: 470px;
            height: 485px;
            background-color: white;
            position: relative;
            margin: 30px auto 0px;
            border: 1px solid #ebebeb;
            padding: 5px 20px 15px;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }

          .container-price {
            position: relative;
            width: 100%;
          }
          .container-price h2 {
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            padding-top: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #ebebeb;
          }

          /* ============== COVER LETTER & CV =============== */

          #cover-letter,
          #resume {
            display: none;
          }

          .container-coverletter label,
          .container-resume label {
            border: 1px solid #ebebeb;
            color: #777;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
            text-align: center;
            width: 100%;
            height: 40px;
            line-height: 40px;
            cursor: default;
          }

          .container-resume {
            position: relative;
            width: 100%;
            top: 6%;
            outline: none;
          }
          .container-coverletter {
            position: relative;
            width: 100%;
            top: 6%;
            outline: none;
          }

          .container-resume .form-control,
          .container-coverletter .form-control {
            -webkit-appearance: none;
            appearance: none;
            height: 40px;
            outline: none;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
          }

          .container-resume p,
          .container-coverletter p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
            width: 400px;
          }

          /* ============ AHPRA =============== */
          .container-license label {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }

          .container-license .form-control {
            -webkit-appearance: none;
            appearance: none;
            height: 40px;
            outline: none;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            font-size: 14px;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            outline: none;
          }

          .container-license select:active,
          .container-license select:focus {
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            outline: none;
          }

          .container-license {
            position: relative;
            width: 100%;

            outline: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
          }

          #ahpra {
            outline: none;
            height: 40px;
            color: #2b2b2b;
            padding: 10px 10px 10px 12px;
            width: 100%;
            display: block;
            font-size: 14px;
            margin-left: 0px;
            left: 40%;
          }
          .ahpra {
            position: absolute;
            width: 100%;
            display: block;
            height: 140px;
            overflow: scroll;
            z-index: 3001;
          }
          .ahpra ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .ahpra ul li {
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
            padding-left: 12px;
            position: relative;
            width: 100%;
            font-size: 12px;
          }
          .ahpra ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 11px;
          }

          /* ============ ELIGIBILITY STATUS =============== */
          .container-status .form-control {
            -webkit-appearance: none;
            appearance: none;
            height: 40px;
            outline: none;
            border: 1px solid #ebebeb;
            border-radius: 0px;
          }

          .container-status label {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }

          .container-status {
            position: relative;
            width: 100%;
            top: 2%;
            outline: none;
            z-index: 3000;
          }
          #status {
            outline: none;
            height: 40px;
            color: #2b2b2b;
            padding: 10px 10px 10px 12px;
            width: 100%;
            display: block;
            font-size: 14px;
            margin-left: 0px;
            left: 40%;
          }

          .status {
            position: absolute;
            width: 100%;
            display: block;
            height: 140px;
            overflow: scroll;
            z-index: 3001;
          }
          .status ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .status ul li {
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
            padding-left: 12px;
            position: relative;
            width: 100%;
            font-size: 12px;
          }
          .status ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 11px;
          }

          /* =========== REQUEST TO APPLY BUTTON ======== */

          .btn-med {
            height: 48px;
            border-radius: 4px;
            color: white;
            background-color: #14a248;
            text-align: center;
            border: 1px solid #14a248;
            position: relative;
            width: 100%;
            top: 6%;
            outline: none;
          }

          .btn-med:hover {
            cursor: pointer;
          }

          .wrap .btn-med:focus,
          .wrap .btn-med:active,
          .wrap .btn-med:hover {
            color: white;
            outline: none;
            border: none;
          }

          .btn-inactiveLoggedIn,
          .appliedbefore {
            height: 48px;
            border-radius: 4px;
            color: #888;
            background-color: #ddd;
            text-align: center;
            border: 1px solid #ddd;
            position: relative;
            width: 100%;
            top: 6%;
            outline: none;
          }
          .btn-inactive {
            height: 48px;
            border-radius: 4px;
            color: #888;
            background-color: #ddd;
            text-align: center;
            border: 1px solid #ddd;
            position: relative;
            width: 100%;
            top: 6%;
            outline: none;
          }
          .btn-notself {
            height: 48px;
            border-radius: 4px;
            color: white;
            background-color: #e40000;
            text-align: center;
            border: 1px solid #e40000;
            position: relative;
            width: 100%;
            top: 6%;
            outline: none;
          }

          .btn-notself a:hover {
            cursor: not-allowed;
          }

          .container-signup {
            position: relative;
            top: 7%;
            left: 0%;
            width: 100%;
          }
          .container-signup a {
            color: #008489;
            font-weight: 700;
            font-family: sans-serif;
          }

          @media only screen and (min-width: 768px) {
            .btn-med {
              width: 100%;
              top: 5%;
            }

            .bottomBtn {
              justify-content: space-around;
            }
            .container-coverletter {
              top: 4%;
              width: 100%;
            }
            .container-resume {
              width: 100%;
              top: 4%;
            }
            .ahpra ul li {
              font-size: 14px;
              padding-left: 18px;
            }
            .status ul li {
              font-size: 14px;
              padding-left: 18px;
            }

            .ahpra ul li:hover {
              padding-left: 17px;
            }
            .status ul li:hover {
              padding-left: 17px;
            }
          }

          input[type="text"]:disabled {
            background-color: #fff;
          }
          select:disabled,
          .form-control:disabled {
            background-color: #fff;
            cursor: default;
          }

          ::-webkit-input-placeholder {
            color: #555;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
          }
          ::-moz-placeholder {
            color: #555;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
          }
          :-ms-input-placeholder {
            color: #555;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
          }

          .calendar {
            background-image: url("./../../images/calendarmarker.png");
            background-repeat: no-repeat;
            background-position: 1px 2px;
            background-size: 18px;
          }

          .chart {
            background-image: url("./../../images/pencilmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }

          @media only screen and (min-width: 768px) {
            .top-container {
              display: flex;
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
            .ad-description {
              width: 600px;
              margin-left: 126px;
              display: inline-block;
            }

            #selectdate {
              width: 400px;
              height: 485px;
              display: inline-block;
              margin-top: 0px;
              position: fixed;
              margin-left: 700px;
              padding: 5px 20px 15px;
            }

            input[type="text"] {
              width: 170px;
            }

            .container-price h2 {
              width: 100%;
            }

            .btn-previous,
            .btn-submit {
              width: 240px;
            }
            .bottomBtn {
              justify-content: space-around;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Ad_details_std;
