import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
import { RotatingLines } from "react-loader-spinner";

const Resume = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [readyToShow, setReadyToShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [, setLongitude] = useState("");
  const [, setLatitude] = useState("");
  const [idPhoto, setIdPhoto] = useState("");

  useEffect(() => {
    setReadyToShow(false);
    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/locums/profileResume/" +
          user.email
      )
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          setCountry(response.data.country);
          setPostalCode(response.data.postalCode);
          setState(response.data.state);
          setSuburb(response.data.suburb);
          setStreet(response.data.street);
          setStreetNo(response.data.streetNo);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          setIdPhoto(response.data.filename);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setReadyToShow(true);
        }
      });
  }, []);

  if (readyToShow === false)
    return (
      <div
        style={{
          backgroundColor: "#14a248",
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
          <RotatingLines
            strokeColor="white"
            strokeWidth="4"
            animationDuration="1.25"
            width="100"
            visible={true}
          />
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Preview | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />
        <div className="locum_details">
          <Link to="/dashboard">Back to my Dashboard</Link>
          <h2>Resume Preview</h2>
        </div>
        <div className="wrap">
          <div className="top-container">
            <div className="divider">
              <div className="personContent">
                <div className="threeItem">
                  <div>
                    <Link to="/locum_profile"> My Locum Profile</Link>
                  </div>
                  <div>
                    <Link to="/locum_cv">My Skills & Experiences</Link>
                  </div>
                  <div>
                    <ExternalLink
                      style={{ color: "#14a248" }}
                      href={
                        process.env.REACT_APP_BACKEND_URL +
                        `api/locums/resume/${userInfo.locumId}`
                      }
                      target="_self"
                    >
                      Preview CV
                    </ExternalLink>
                  </div>
                </div>
              </div>
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
                  {idPhoto ? (
                    <div className="candidate-photo">
                      <figure className="smallPhoto">
                        <img src={idPhoto} alt="" name="image-File" />
                      </figure>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="candidate-name">
                    <h2>
                      {firstName} {lastName}
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

                    <p>Mobile: {userInfo.phone}</p>
                    <p>Email: {user.email}</p>
                  </div>

                  <div className="candidate-dl">
                    {userInfo.driverslicense === "I don't drive" ? (
                      ""
                    ) : (
                      <>
                        <h2>DRIVER'S LICENSE</h2>
                        <p>{userInfo.driverslicense}</p>
                      </>
                    )}
                  </div>

                  {userInfo.skillOne1 ||
                  userInfo.skillOne2 ||
                  userInfo.skillOne3 ? (
                    <div className="candidate-skills">
                      <h2>{userInfo.skillOne}</h2>

                      <p>{userInfo.skillOne1}</p>

                      {userInfo.skillProf1 ? (
                        userInfo.skillProf1 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillProf1 === "Experienced" ? (
                          <div className="bar">
                            <div className="level-int"></div>
                          </div>
                        ) : (
                          <div className="bar">
                            <div className="level-deb"></div>
                          </div>
                        )
                      ) : (
                        ""
                      )}

                      <p>{userInfo.skillOne2}</p>
                      {userInfo.skillProf2 ? (
                        userInfo.skillProf2 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillProf2 === "Experienced" ? (
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
                      <p>{userInfo.skillOne3}</p>
                      {userInfo.skillProf3 ? (
                        userInfo.skillProf3 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillProf3 === "Experienced" ? (
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
                  ) : (
                    ""
                  )}

                  {userInfo.skillTwo1 ||
                  userInfo.skillTwo2 ||
                  userInfo.skillTwo3 ? (
                    <div className="candidate-computer">
                      <h2>{userInfo.skillTwo}</h2>

                      <p>{userInfo.skillTwo1}</p>

                      {userInfo.skillComp1 ? (
                        userInfo.skillComp1 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillComp1 === "Experienced" ? (
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

                      <p>{userInfo.skillTwo2}</p>
                      {userInfo.skillComp2 ? (
                        userInfo.skillComp2 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillComp2 === "Experienced" ? (
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

                      <p>{userInfo.skillTwo3}</p>
                      {userInfo.skillComp3 ? (
                        userInfo.skillComp3 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillComp3 === "Experienced" ? (
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
                  ) : (
                    ""
                  )}

                  {userInfo.skillThree1 ||
                  userInfo.skillThree2 ||
                  userInfo.skillThree3 ? (
                    <div className="candidate-pharmacoth">
                      <h2>{userInfo.skillThree}</h2>

                      <p>{userInfo.skillThree1}</p>
                      {userInfo.skillPharma1 ? (
                        userInfo.skillPharma1 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillPharma1 === "Experienced" ? (
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

                      <p>{userInfo.skillThree2}</p>
                      {userInfo.skillPharma2 ? (
                        userInfo.skillPharma2 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillPharma2 === "Experienced" ? (
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
                      <p>{userInfo.skillThree3}</p>
                      {userInfo.skillPharma3 ? (
                        userInfo.skillPharma3 === "Specialised" ? (
                          <div className="bar">
                            <div className="level-excellent"></div>
                          </div>
                        ) : userInfo.skillPharma3 === "Experienced" ? (
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
                  ) : (
                    ""
                  )}

                  <div className="candidate-languages">
                    {userInfo.whichlanguage0 ||
                    userInfo.whichlanguage1 ||
                    userInfo.whichlanguage2 ? (
                      <h2>{userInfo.languages}</h2>
                    ) : (
                      <h2></h2>
                    )}

                    <p>{userInfo.whichlanguage0}</p>
                    {userInfo.languageLvl0 ? (
                      userInfo.languageLvl0 === "Advanced or mother tongue" ? (
                        <div className="bar">
                          <div className="level-excellent"></div>
                        </div>
                      ) : userInfo.languageLvl0 === "Intermediate" ? (
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

                    <p>{userInfo.whichlanguage1}</p>

                    {userInfo.languageLvl1 ? (
                      userInfo.languageLvl1 === "Advanced or mother tongue" ? (
                        <div className="bar">
                          <div className="level-excellent"></div>
                        </div>
                      ) : userInfo.languageLvl1 === "Intermediate" ? (
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

                    <p>{userInfo.whichlanguage2}</p>
                    {userInfo.languageLvl2 ? (
                      userInfo.languageLvl2 === "Advanced or mother tongue" ? (
                        <div className="bar">
                          <div className="level-excellent"></div>
                        </div>
                      ) : userInfo.languageLvl2 === "Intermediate" ? (
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
                    <h2>{userInfo.education}</h2>
                    {userInfo.university1 ? (
                      <>
                        <p className="uni">
                          {userInfo.degree1} at {userInfo.university1}
                        </p>
                        <p className="uni-dates">
                          From {userInfo.start1} to {userInfo.finish1}
                        </p>
                      </>
                    ) : (
                      <p></p>
                    )}

                    {userInfo.university2 ? (
                      <>
                        <p className="uni">
                          {userInfo.degree2} at {userInfo.university2}
                        </p>
                        <p className="uni-dates">
                          From {userInfo.start2} to {userInfo.finish2}
                        </p>
                      </>
                    ) : (
                      <p></p>
                    )}

                    {userInfo.university3 ? (
                      <>
                        <p className="uni">
                          {userInfo.degree3} at {userInfo.university3}
                        </p>
                        <p className="uni-dates">
                          From {userInfo.start3} to {userInfo.finish3}
                        </p>
                      </>
                    ) : (
                      <p></p>
                    )}
                  </div>

                  <div className="main-experiences">
                    <h2>{userInfo.workhistory}</h2>
                    <p style={{ whiteSpace: "pre-line" }}>{userInfo.resume}</p>
                  </div>

                  <div className="main-honor-awards">
                    {userInfo.honourAwards !== "" ? (
                      <h2>{userInfo.honourTitle}</h2>
                    ) : (
                      <p></p>
                    )}

                    <p style={{ whiteSpace: "pre-line" }}>
                      {userInfo.honourAwards}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            padding-top: 60px;
            background-color: #f0eff5;
          }
          .wrap .divider {
            display: grid;
            grid-template-columns: 30% 70%;
          }

          /* =========== LEFT RAIL ========== */
          .wrap .personContent {
            width: 350px;
            margin: 0 20px;
          }
          .wrap .personContent .threeItem:last-child {
            height: 135px;
          }
          .wrap .personContent .threeItem > div {
            padding: 10px 30px;
            width: 100%;
          }
          .wrap .personContent .threeItem > div:last-child {
            padding: 0px 30px;
            margin-top: 20px;
            border: 1px solid #14a248;
            height: 38px;
            border-radius: 4px;
            line-height: 38px;
            text-align: center;
          }
          .wrap .personContent .threeItem > div:last-child:hover {
            border: 1px solid #777;
          }
          .wrap .personContent .threeItem > div a:hover {
            color: #777;
          }
          .wrap .personContent .threeItem > div a {
            color: #2b2b2b;
            font-weight: 800;
            font-size: 22px;
            font-family: sans-serif;
          }
          .wrap .personContent .threeItem > div:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 768px) {
            .wrap .personContent {
              display: block;
              width: 420px;
              margin: 0 auto 30px;
              height: 200px;
            }
            .wrap .divider {
              display: block;
            }
            .wrap .personContent .threeItem {
              margin: 0;
              width: 420px;
              margin-bottom: 20px;
              text-align: center;
            }
            .wrap .personContent .threeItem > div {
              width: 100%;
            }
          }

          /* ============= PERSONAL DETAILS ============== */

          .locum_details {
            margin: 15px auto 25px;
            padding: 10px 440px;
          }

          .locum_details h2 {
            color: #323232;
            font-weight: 500;
            font-size: 32px;
          }
          .locum_details a {
            color: #14a248;
            display: block;
            margin-bottom: 10px;
          }

          .locum_details a:hover {
            color: #0e7132;
          }

          @media screen and (max-width: 768px) {
            .locum_details {
              margin: 25px auto;
              padding: 10px 100px;
              text-align: center;
            }
          }

          /* ============== RESUME ============== */
          .top-container {
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }

          .ad-description {
            width: 460px;
            margin: 0 auto;
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
            font-size: 12px;
            font-weight: 400;
            font-family: sans-serif;
            width: 100%;
          }

          .sidebar {
            position: relative;
            display: inline;
            width: 190px;
            background-color: #193659;
          }
          .sidebarlogo {
            position: relative;
            text-align: center;
            width: 100%;
          }
          .img-fluid {
            transform: translateX(0%);
          }

          .candidate-photo .smallPhoto {
            overflow: hidden;
            position: relative;
            text-align: center;
            border-radius: 50%;
            width: 65px;
            height: 65px;
            background: #eee;
            border: 2px solid white;
            margin: 0;
            left: 50%;
            transform: translate(-50%, 55%);
          }
          .candidate-photo .smallPhoto img {
            position: absolute;
            width: 61px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
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
            font-size: 14px;
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
            font-size: 14px;
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

          .candidate-skills {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 13%;
            text-align: left;
          }
          .candidate-skills h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }
          .candidate-skills p {
            margin-top: 12px;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 5px;
            color: white;
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

          .candidate-computer {
            position: relative;
            padding: 5px 26px 0px 30px;
            top: 16%;
            text-align: left;
          }

          .candidate-computer h2 {
            color: #fff;
            font-size: 16px;
            font-family: sans-serif;
            margin-bottom: 12px;
          }
          .candidate-computer p {
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
            font-size: 14px;
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
            font-size: 14px;
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
            font-size: 14px;
            margin-bottom: 12px;
            font-family: sans-serif;
          }
          .container {
            text-align: center;
          }
          @media only screen and (min-width: 768px) {
            .container {
              text-align: left;
            }
            .top-container {
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
            .ad-description {
              width: 1000px;
              margin: 0;
            }
            .ad-description p {
              font-size: 15px;
            }
            .candidate-name h2 {
              font-size: 23px;
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
            .main-experiences h2 {
              font-size: 23px;
            }
            .main-honor-awards h2 {
              font-size: 23px;
            }
            .candidate-dl {
              padding: 5px 46px 0px 50px;
            }
            .main-education h2 {
              font-size: 23px;
            }
            .candidate-skills {
              padding: 5px 46px 10px 50px;
            }
            .candidate-skills h2 {
              font-size: 20px;
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
            .candidate-computer {
              padding: 5px 46px 10px 50px;
            }
            .candidate-computer h2 {
              font-size: 20px;
            }

            .main {
              padding: 80px 50px 60px;
            }

            .sidebar {
              height: 100%;
              width: 350px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Resume;
