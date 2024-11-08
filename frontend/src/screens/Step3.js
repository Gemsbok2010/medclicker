import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

const Step3 = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  const [isloading, setIsloading] = useState(false);
  const [readyToShow, setReadyToShow] = useState(false);
  ReactSession.setStoreType("sessionStorage");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [ahpra, setAhpra] = useState("");
  const [driverslicense, setDriverslicense] = useState("");
  const [workhistory, setWorkhistory] = useState("");
  const [resume, setResume] = useState("");
  const [honourTitle, setHonourTitle] = useState("");
  const [honourAwards, setHonourAwards] = useState("");
  const [languages, setLanguages] = useState("");
  const [linguistics, setLinguistics] = useState({});
  const [row, setRow] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [education, setEducation] = useState("");
  const [degree1, setDegree1] = useState("");
  const [university1, setUniversity1] = useState("");
  const [start1, setStart1] = useState("");
  const [finish1, setFinish1] = useState("");
  const [degree2, setDegree2] = useState("");
  const [university2, setUniversity2] = useState("");
  const [start2, setStart2] = useState("");
  const [finish2, setFinish2] = useState("");
  const [degree3, setDegree3] = useState("");
  const [university3, setUniversity3] = useState("");
  const [start3, setStart3] = useState("");
  const [finish3, setFinish3] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // =========== POPULATE SESSION DATA ==============
  useEffect(() => {
    setCountry(ReactSession.get("locum_country"));
    setState(ReactSession.get("locum_state"));
    setSuburb(ReactSession.get("locum_suburb"));
    setStreet(ReactSession.get("locum_street"));
    setStreetNo(ReactSession.get("locum_streetNo"));
    setLatitude(ReactSession.get("locum_latitude"));
    setLongitude(ReactSession.get("locum_longitude"));
    setPostalCode(ReactSession.get("locum_postalCode"));
    setWorkhistory(ReactSession.get("workhistory"));
    setResume(ReactSession.get("resume"));
    setHonourAwards(ReactSession.get("honourAwards"));
    setHonourTitle(ReactSession.get("honourTitle"));
    if (!ReactSession.get("locum_phone")) {
      setPhone("");
    } else {
      setPhone(ReactSession.get("locum_phone"));
    }
    if (!ReactSession.get("locum_profession")) {
      setProfession("");
    } else {
      setProfession(ReactSession.get("locum_profession"));
    }
    if (!ReactSession.get("locum_drivers")) {
      setDriverslicense("");
    } else {
      setDriverslicense(ReactSession.get("locum_drivers"));
    }
    if (!ReactSession.get("locum_ahpra")) {
      setAhpra("");
    } else {
      setAhpra(ReactSession.get("locum_ahpra"));
    }

    setLanguages(ReactSession.get("languages"));
    setRow(ReactSession.get("row"));
    setActiveButton(ReactSession.get("activeButton"));
    setLinguistics({
      ...linguistics,
      whichlanguage0: ReactSession.get("whichlanguage0"),
      whichlanguage1: ReactSession.get("whichlanguage1"),
      whichlanguage2: ReactSession.get("whichlanguage2"),
      languageLvl0: ReactSession.get("languageLvl0"),
      languageLvl1: ReactSession.get("languageLvl1"),
      languageLvl2: ReactSession.get("languageLvl2"),
    });
    setEducation(ReactSession.get("education"));
    setDegree1(ReactSession.get("degree1"));
    setDegree2(ReactSession.get("degree2"));
    setDegree3(ReactSession.get("degree3"));
    setUniversity1(ReactSession.get("university1"));
    setUniversity2(ReactSession.get("university2"));
    setUniversity3(ReactSession.get("university3"));
    setStart1(ReactSession.get("start1"));
    setStart2(ReactSession.get("start2"));
    setStart3(ReactSession.get("start3"));
    setFinish1(ReactSession.get("finish1"));
    setFinish2(ReactSession.get("finish2"));
    setFinish3(ReactSession.get("finish3"));
    setReadyToShow(true);
  }, []);

  // ======= CLEAR SESSION STORAGE ========= //
  const clearLocumData = () => {
    ReactSession.remove("finish3");
    ReactSession.remove("finish2");
    ReactSession.remove("finish1");
    ReactSession.remove("start1");
    ReactSession.remove("start2");
    ReactSession.remove("start3");
    ReactSession.remove("university1");
    ReactSession.remove("university2");
    ReactSession.remove("university3");
    ReactSession.remove("degree1");
    ReactSession.remove("degree2");
    ReactSession.remove("degree3");
    ReactSession.remove("education");
    ReactSession.remove("activeButton");
    ReactSession.remove("row");
    ReactSession.remove("languages");
    ReactSession.remove("locum_firstName");
    ReactSession.remove("locum_lastName");
    ReactSession.remove("locum_country");
    ReactSession.remove("locum_state");
    ReactSession.remove("locum_suburb");
    ReactSession.remove("locum_street");
    ReactSession.remove("locum_streetNo");
    ReactSession.remove("locum_postalCode");
    ReactSession.remove("locum_latitude");
    ReactSession.remove("locum_longitude");
    ReactSession.remove("resume");
    ReactSession.remove("locum_phone");
    ReactSession.remove("locum_drivers");
    ReactSession.remove("locum_profession");
    ReactSession.remove("locum_ahpra");
    ReactSession.remove("honourTitle");
    ReactSession.remove("workhistory");
    ReactSession.remove("whichlanguage0");
    ReactSession.remove("whichlanguage1");
    ReactSession.remove("whichlanguage2");
    ReactSession.remove("languageLvl0");
    ReactSession.remove("languageLvl1");
    ReactSession.remove("languageLvl2");
    ReactSession.remove("honourAwards");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    fetch(process.env.REACT_APP_BACKEND_URL + "api/locums/step3", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        isLocum: true,
        nanoId: user.nanoId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        resume: resume,
        workhistory: workhistory,
        honourAwards: honourAwards,
        honourTitle: honourTitle,
        phone: phone,
        profession: profession,
        driverslicense: driverslicense,
        ahpra: ahpra,
        country: country,
        state: state,
        suburb: suburb,
        street: street,
        streetNo: streetNo,
        latitude: latitude,
        longitude: longitude,
        postalCode: postalCode,
        education: education,
        degree1: degree1,
        university1: university1,
        start1: start1,
        finish1: finish1,
        degree2: degree2,
        university2: university2,
        start2: start2,
        finish2: finish2,
        degree3: degree3,
        university3: university3,
        start3: start3,
        finish3: finish3,
        row: row,
        activeButton: activeButton,
        languages: languages,
        whichlanguage0: linguistics.whichlanguage0
          ? linguistics.whichlanguage0
          : "",
        whichlanguage1: linguistics.whichlanguage1
          ? linguistics.whichlanguage1
          : "",
        whichlanguage2: linguistics.whichlanguage2
          ? linguistics.whichlanguage2
          : "",
        languageLvl0: linguistics.languageLvl0 ? linguistics.languageLvl0 : "",
        languageLvl1: linguistics.languageLvl1 ? linguistics.languageLvl1 : "",
        languageLvl2: linguistics.languageLvl2 ? linguistics.languageLvl2 : "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsloading(false);
        clearLocumData();
        navigate("/step4");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (readyToShow === false)
    return (
      <div
        style={{
          backgroundColor: "#fff",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          zIndex: "2500",
          display: "block",
          position: "fixed",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            display: "block",
            height: "100%",
            width: "100%",
            top: "90%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <img
            style={{
              animation: "loadingframe 1000ms infinite",
              animationDirection: "alternate-reverse",
            }}
            src="/images/medclicker.png"
            width="120px"
            alt="Medclicker logo"
          />
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Registration Step 3 | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />
        <div className="wrap">
          <div className="Q1title">
            <ul className="stepNav threeWide">
              <li>
                <Link style={{ fontWeight: "bold" }} to="/step1">
                  <span className="badge">1</span>
                  <span>My Details</span>
                </Link>
              </li>

              <li>
                <Link style={{ fontWeight: "bold" }} to="/step2">
                  <span className="badge">2</span>
                  <span className="active">My Experiences</span>
                </Link>
              </li>
              <li>
                <Link className="active" style={{ fontWeight: "bold" }} to="#">
                  <span className="badge-highlight">3</span>
                  <span className="active">Review</span>
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: "default",
                  }}
                  to={"#"}
                >
                  <span className="badge">4</span>
                  <span>Complete</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="top-container">
            <div className="ad-description">
              <div className="sidebar">
                <div className="sidebarlogo">
                  <img
                    className="img-fluid"
                    src="/images/mainLogo_white.png"
                    width="180px"
                    alt=""
                  />
                </div>
                <div className="candidate-name">
                  <h2>
                    {ReactSession.get("locum_firstName")}{" "}
                    {ReactSession.get("locum_lastName")}
                  </h2>
                </div>

                <div className="candidate-address">
                  <h2>Contact Details</h2>

                  {streetNo ? (
                    <>
                      <p>{streetNo + " " + street}</p>
                      <p>{suburb + " " + state + " " + postalCode}</p>
                      <p>{country}</p>
                      <br />
                    </>
                  ) : (
                    <>
                      <p>{street}</p>
                      <p>{suburb + " " + state + " " + postalCode}</p>
                      <p>{country}</p>
                      <br />
                    </>
                  )}

                  <p>Mobile: {ReactSession.get("locum_phone")}</p>
                  <p>Email: {user.email}</p>
                </div>
                <div className="candidate-dl">
                  {driverslicense === "I don't drive" ? (
                    ""
                  ) : (
                    <>
                      <h2>DRIVER'S LICENSE</h2>
                      <p>{driverslicense}</p>
                    </>
                  )}
                </div>

                <div className="candidate-languages">
                  {!ReactSession.get("whichlanguage0") ? (
                    ""
                  ) : (
                    <h2>{ReactSession.get("languages")}</h2>
                  )}

                  <p>{ReactSession.get("whichlanguage0")}</p>
                  {ReactSession.get("languageLvl0") ? (
                    ReactSession.get("languageLvl0") ===
                    "Advanced or mother tongue" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("languageLvl0") === "Intermediate" ? (
                      <div className="bar">
                        <div className="level-int"></div>
                      </div>
                    ) : (
                      <div className="bar">
                        <div className="level-deb"></div>
                      </div>
                    )
                  ) : (
                    <p></p>
                  )}

                  <p>{ReactSession.get("whichlanguage1")}</p>

                  {ReactSession.get("languageLvl1") ? (
                    ReactSession.get("languageLvl1") ===
                    "Advanced or mother tongue" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("languageLvl1") === "Intermediate" ? (
                      <div className="bar">
                        <div className="level-int"></div>
                      </div>
                    ) : (
                      <div className="bar">
                        <div className="level-deb"></div>
                      </div>
                    )
                  ) : (
                    <p></p>
                  )}

                  <p>{ReactSession.get("whichlanguage2")}</p>
                  {ReactSession.get("languageLvl2") ? (
                    ReactSession.get("languageLvl2") ===
                    "Advanced or mother tongue" ? (
                      <div className="bar">
                        <div className="level-excellent"></div>
                      </div>
                    ) : ReactSession.get("languageLvl2") === "Intermediate" ? (
                      <div className="bar">
                        <div className="level-int"></div>
                      </div>
                    ) : (
                      <div className="bar">
                        <div className="level-deb"></div>
                      </div>
                    )
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>

              <div className="main">
                <div className="main-education">
                  {ReactSession.get("university1") ||
                  ReactSession.get("university2") ||
                  ReactSession.get("university3") ? (
                    <h2>{ReactSession.get("education")}</h2>
                  ) : (
                    ""
                  )}

                  {ReactSession.get("university1") ? (
                    <>
                      <p className="uni">
                        {ReactSession.get("degree1")} at{" "}
                        {ReactSession.get("university1")}
                      </p>
                      <p className="uni-dates">
                        From {ReactSession.get("start1")} to{" "}
                        {ReactSession.get("finish1")}
                      </p>
                    </>
                  ) : (
                    <p></p>
                  )}

                  {ReactSession.get("university2") ? (
                    <>
                      <p className="uni">
                        {ReactSession.get("degree2")} at{" "}
                        {ReactSession.get("university2")}
                      </p>
                      <p className="uni-dates">
                        From {ReactSession.get("start2")} to{" "}
                        {ReactSession.get("finish2")}
                      </p>
                    </>
                  ) : (
                    <p></p>
                  )}

                  {ReactSession.get("university3") ? (
                    <>
                      <p className="uni">
                        {ReactSession.get("degree3")} at{" "}
                        {ReactSession.get("university3")}
                      </p>
                      <p className="uni-dates">
                        From {ReactSession.get("start3")} to{" "}
                        {ReactSession.get("finish3")}
                      </p>
                    </>
                  ) : (
                    <p></p>
                  )}
                </div>

                <div className="main-experiences">
                  <h2>{ReactSession.get("workhistory")}</h2>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {ReactSession.get("resume")}
                  </p>
                </div>

                <div className="main-honor-awards">
                  {ReactSession.get("honourAwards") !== "" ? (
                    <h2>{ReactSession.get("honourTitle")}</h2>
                  ) : (
                    <p></p>
                  )}

                  <p style={{ whiteSpace: "pre-line" }}>
                    {ReactSession.get("honourAwards")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form id="formThree" onSubmit={onSubmit}>
            <div className="bottomBtn">
              <button className="btn-previous">
                <Link to="/step2">Go Back</Link>
              </button>
              {!isloading ? (
                <button className="btn-next" type="submit">
                  Confirm
                </button>
              ) : (
                <button className="btn-next">
                  <ThreeDots
                    type="ThreeDots"
                    height={30}
                    width={80}
                    color={"white"}
                  />
                </button>
              )}
            </div>
          </form>
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

          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 0;
            background-color: #f4f5f6;
          }
          @media screen and (max-width: 768px) {
            .wrap {
              padding: 0;
            }
          }

          /* ============== 履歷表 ============== */
          .top-container {
            display: flex;
            /* justify-content: center; */
            /* flex-direction: column; */
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }

          .ad-description {
            width: 460px;
            margin: 0px auto;
            background-color: white;
            position: relative;
            border: none;
            padding: 0px;
            display: flex;
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
            font-weight: 100;
            font-family: sans-serif;
            width: 100%;
          }

          .sidebar {
            position: relative;
            display: inline-block;
            width: 190px;
            background-color: #193659;
          }

          .sidebarlogo {
            position: relative;
            text-align: center;
            width: 60%;
            top: 95%;
          }
          .img-fluid {
            transform: translateX(0%);
          }
          .candidate-name {
            position: relative;
            top: 5%;
            text-align: center;
            width: 100%;
          }

          .candidate-name h2 {
            color: #fff;
            width: 100%;
            font-size: 20px;
            font-family: sans-serif;
          }

          .candidate-address {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 9%;
            text-align: left;
          }
          .candidate-address h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
          }

          .candidate-address p {
            color: #fff;
            margin-bottom: 7px;
            font-family: sans-serif;
          }
          .candidate-dl {
            position: relative;
            top: 11%;
            padding: 5px 26px 0px 30px;
            text-align: left;
          }

          .candidate-dl h2 {
            color: #6382a5;
            font-size: 12px;
          }

          .candidate-dl p {
            color: #fff;
            font-family: sans-serif;
          }

          .sidebar .bar {
            margin-top: 4px;
            height: 6px;
            width: 100%;
            background-color: #6382a5;
          }
          .sidebar .level-deb {
            position: relative;
            height: 6px;
            width: 30%;
            background-color: white;
            border: none;
          }
          .sidebar .level-excellent {
            position: relative;
            height: 6px;
            width: 100%;
            background-color: white;
            border: none;
          }
          .sidebar .level-int {
            position: relative;
            height: 6px;
            width: 66%;
            background-color: white;
            border: none;
          }
          .sidebar .level-excellent {
            position: relative;
            height: 6px;
            width: 100%;
            background-color: white;
            border: none;
          }

          .candidate-clinical {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 16%;
            text-align: left;
          }

          .candidate-clinical h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }
          .candidate-clinical p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 5px;
            color: white;
          }
          .candidate-pharmacoth {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 19%;
            text-align: left;
          }

          .candidate-pharmacoth h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }

          .candidate-pharmacoth p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 5px;
            color: white;
          }

          .candidate-languages {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 21%;
            text-align: left;
            height: 450px;
          }

          .candidate-languages h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }

          .candidate-languages p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 5px;
            color: white;
          }

          .main {
            display: inline-block;
            width: 650px;
            padding: 80px 20px 60px;
          }
          .main-education {
            position: relative;
            top: 0%;
            text-align: left;
          }
          .main-education h2 {
            font-size: 23px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }
          .main-education .uni {
            position: relative;
            font-weight: 800;
            margin-bottom: 0px;
          }
          .main-education .uni-dates {
            font-size: 11px;
            color: #777;
          }

          .main-experiences {
            position: relative;
            top: 1%;
            text-align: left;
          }

          .main-experiences h2 {
            font-size: 23px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }
          .main-experiences .work-title {
            margin-top: 12px;
            position: relative;
            font-weight: 800;
            margin-bottom: 0px;
          }
          .main-experiences .work-dates {
            font-size: 11px;
            color: #777;
          }

          .main-honor-awards {
            position: relative;
            top: 1%;
            text-align: left;
          }

          .main-honor-awards h2 {
            font-size: 23px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }

          @media only screen and (min-width: 768px) {
            .top-container {
              display: flex;
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
            .ad-description {
              width: 1000px;
            }

            .sidebar {
              padding: 80px 0px 60px;
              width: 350px;
            }
            .candidate-address {
              padding: 5px 46px 0px 50px;
            }
            .candidate-address h2 {
              font-size: 20px;
            }
            .candidate-dl {
              padding: 5px 46px 0px 50px;
            }

            .candidate-languages {
              padding: 5px 46px 10px 50px;
            }
            .candidate-languages h2 {
              font-size: 20px;
            }
            .candidate-pharmacoth {
              padding: 5px 46px 10px 50px;
            }
            .candidate-pharmacoth h2 {
              font-size: 20px;
            }
            .candidate-clinical {
              padding: 5px 46px 10px 50px;
            }
            .candidate-clinical h2 {
              font-size: 20px;
            }
            .main {
              padding: 80px 50px 60px;
            }
            .sidebarlogo {
              width: 100%;
              top: 0px;
            }
          }

          /* ========== BOTTOM BUTTONS ============ */
          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .btn-previous,
          .btn-next {
            position: relative;
            background-color: #14a248;
            color: white;
            border: 1px solid #14a248;
            cursor: pointer;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            margin: 0px auto 30px;
            box-shadow: none;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .btn-previous a,
          .btn-next a {
            color: white;
            font-weight: 800;
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            position: relative;
            display: block;
          }
          .btn-previous:hover,
          .btn-next:hover,
          .btn-previous:active,
          .btn-next:active,
          .btn-previous:focus,
          .btn-next:focus {
            color: white;
            border: 1px solid #14a248;
            outline: none;
          }

          @media only screen and (min-width: 768px) {
            .btn-previous,
            .btn-next {
              width: 200px;
            }
          }

          /* ============== PROCESS BAR ON TOP ============== */
          .wrap .Q1title {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height: auto;
            font-size: 16px;
            color: #484848;
            padding: 0px;
            text-align: center;
            margin: 0px auto;
          }

          .wrap .Q1title > ul {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
          }
          .wrap .Q1title > ul > li {
            list-style: none;
          }

          .stepNav {
            margin: 30px 20px;
            height: auto;
            padding-right: 20px;
            position: relative;
            z-index: 0;
          }

          .badge {
            display: block;
            font-size: 12px;
            width: 20px;
            height: 20px;
            line-height: 12px;
            background: #777;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
          }
          .badge-highlight {
            display: block;
            font-size: 12px;
            width: 22px;
            border: 1px solid white;
            height: 22px;
            line-height: 20px;
            background: #14a248;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            font-weight: 700;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav li {
            float: left;
            position: relative;
            z-index: 3;
          }

          .stepNav li:first-child {
            border-radius: 0px 0 0 0px;
          }

          .stepNav li:nth-child(2) {
            z-index: 2;
          }

          .stepNav li:nth-child(3) {
            z-index: 1;
          }

          .stepNav li:nth-child(4) {
            z-index: 0;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav a,
          .stepNav a:visited {
            display: block;
            width: 100%;
            height: 43px;
            padding: 0 0 0 25px;
            color: #999;
            text-align: center;
            text-shadow: 0 1px 0 #fff;
            line-height: 43px;
            white-space: nowrap;
            border: none;
            text-decoration: none;
            border-right: 0;
            background-color: #ededed;
            position: relative;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          .stepNav a {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }

          .stepNav a:before {
            content: "";
            width: 30px;
            height: 30px;
            background: #ededed;
            display: block;
            position: absolute;
            top: 6px;
            right: -16px;
            z-index: -1;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }

          .stepNav a.active {
            text-shadow: none;
            color: #fff;
            background: #14a248;
          }
          .stepNav a.active::before {
            border-right: 1px solid #14a248;
            border-bottom: 1px solid #14a248;
            background: #14a248;
          }

          @media screen and (max-width: 768px) {
            .wrap .Q1title {
              width: 100%;
              padding: 0px 0px 0px 0px;
            }
            .wrap .Q1title > ul {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
              padding-left: 10px;
            }
            .wrap .Q1title > ul > li {
              width: 100%;
              margin-bottom: 10px;
              list-style: none;
            }
            .wrap .Q1title > ul > li a {
              text-align: left !important;
            }
            .stepNav a {
              -webkit-box-pack: left;
              -ms-flex-pack: left;
              justify-content: left;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Step3;
