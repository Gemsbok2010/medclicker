import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import ReactGA from "react-ga4";

const Question4 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  const [normal_rate, setNormalRate] = useState("");
  const [sat_rate, setSatRate] = useState("");
  const [sun_rate, setSunRate] = useState("");
  const [ph_rate, setPhRate] = useState("");
  const [airtravel, setAirtravel] = useState(false);
  const [roadtravel, setRoadtravel] = useState(false);
  const [accommodation, setAccommodation] = useState(false);

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    if (!ReactSession.get("normal_rate")) {
      setNormalRate("");
    } else {
      setNormalRate(ReactSession.get("normal_rate"));
    }

    if (!ReactSession.get("sat_rate")) {
      setSatRate("");
    } else {
      setSatRate(ReactSession.get("sat_rate"));
    }

    if (!ReactSession.get("sun_rate")) {
      setSunRate("");
    } else {
      setSunRate(ReactSession.get("sun_rate"));
    }
    if (!ReactSession.get("ph_rate")) {
      setPhRate("");
    } else {
      setPhRate(ReactSession.get("ph_rate"));
    }

    if (!ReactSession.get("roadtravel")) {
      setRoadtravel(false);
    } else {
      setRoadtravel(ReactSession.get("roadtravel"));
    }

    if (!ReactSession.get("airtravel")) {
      setAirtravel(false);
    } else {
      setAirtravel(ReactSession.get("airtravel"));
    }

    if (!ReactSession.get("accommodation")) {
      setAccommodation(false);
    } else {
      setAccommodation(ReactSession.get("accommodation"));
    }
    if (!ReactSession.get("airport")) {
      setAirport("");
    } else {
      setAirport(ReactSession.get("airport"));
    }
  }, []);

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInQuestionFour(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ============ AIRPORT =============

  const [showAirport, setShowAirport] = useState(false);
  const [airport, setAirport] = useState("");

  const handleShowAirport = () => {
    setShowAirport(false);
  };

  const handleSetAirport = (e) => {
    const innerHTML = e.target.innerHTML;
    setAirport(innerHTML);
  };

  // ============= POST ==============
  const onSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/listings/question4", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        normal_rate,
        sat_rate,
        sun_rate,
        ph_rate,
        airport,
        airtravel,
        roadtravel,
        accommodation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInQuestionFour(data.invalid);
        } else {
          if (ReactSession.get("monHr") !== "" && !normal_rate) {
            outPutErrorMessagesInQuestionFour(
              "You have selected a <b>Monday</b> as a working day. Hence, a weekday hourly rate is mandatory."
            );
          } else if (ReactSession.get("tueHr") !== "" && !normal_rate) {
            outPutErrorMessagesInQuestionFour(
              "You have selected a <b>Tuesday</b> as a working day. Hence, a weekday hourly rate is mandatory."
            );
          } else if (ReactSession.get("wedHr") !== "" && !normal_rate) {
            outPutErrorMessagesInQuestionFour(
              "You have selected a <b>Wednesday</b> as a working day. Hence, a weekday hourly rate is mandatory."
            );
          } else if (ReactSession.get("thuHr") !== "" && !normal_rate) {
            outPutErrorMessagesInQuestionFour(
              "You have selected a <b>Thursday</b> as a working day. Hence, a weekday hourly rate is mandatory."
            );
          } else if (ReactSession.get("friHr") !== "" && !normal_rate) {
            outPutErrorMessagesInQuestionFour(
              "You have selected a <b>Friday</b> as a working day. Hence, a weekday hourly rate is mandatory."
            );
          } else if (ReactSession.get("satHr") !== "" && !sat_rate) {
            outPutErrorMessagesInQuestionFour(
              "You have selected <b>Saturday</b> as a working day. Hence, a Saturday hourly rate is mandatory."
            );
          } else if (ReactSession.get("sunHr") !== "" && !sun_rate) {
            outPutErrorMessagesInQuestionFour(
              "You have selected <b>Sunday</b> as a working day. Hence, a Sunday hourly rate is mandatory."
            );
          } else {
            ReactSession.set("normal_rate", normal_rate);
            ReactSession.set("sat_rate", sat_rate);
            ReactSession.set("sun_rate", sun_rate);
            ReactSession.set("ph_rate", ph_rate);
            ReactSession.set("airport", airport);
            ReactSession.set("airtravel", airtravel);
            ReactSession.set("roadtravel", roadtravel);
            ReactSession.set("accommodation", accommodation);
            ReactGA.event({
              category: "Post Locum Ad",
              action: "Question 4",
            });
            navigate("/question5");
          }
        }
      })
      .catch((err) => {
        if (err) {
          const errorMessage = `Hourly Rate needs to be at least  $20.`;
          outPutErrorMessagesInQuestionFour(errorMessage);
        }
      });
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Q. Locum on Offer | MedClicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <div className="wrap">
          <form action="" onSubmit={onSubmit}>
            <section className="questionCard container">
              <figure>
                <Link to="/dashboard">
                  <img
                    src="/images/medclicker.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>

              <h2>On Offer</h2>
              <div className="btnGroup">
                <div className="errorMessageHere">
                  {alert ? (
                    <div className="alert">
                      <img
                        src="/images/cross-black.png"
                        style={{ width: "12px" }}
                        alt=""
                      />{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: alertMsg }}
                      ></span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <h2 className="intitule" id="vark">
                  Hourly Rates
                </h2>

                <div className="align">
                  <input
                    type="text"
                    id="normal_rate"
                    className="form-control5"
                    placeholder="Weekday hourly rate"
                    autoComplete="off"
                    maxLength="4"
                    minLength="1"
                    value={normal_rate}
                    onChange={(e) => {
                      setNormalRate(e.target.value);
                    }}
                  />
                </div>
                <div className="align">
                  <input
                    type="text"
                    id="sat_rate"
                    className="form-control5"
                    placeholder="Saturday hourly rate"
                    maxLength="4"
                    minLength="1"
                    autoComplete="off"
                    value={sat_rate}
                    onChange={(e) => {
                      setSatRate(e.target.value);
                    }}
                  />
                </div>
                <div className="align">
                  <input
                    type="text"
                    id="sun_rate"
                    className="form-control5"
                    placeholder="Sunday hourly rate"
                    maxLength="4"
                    minLength="1"
                    autoComplete="off"
                    value={sun_rate}
                    onChange={(e) => {
                      setSunRate(e.target.value);
                    }}
                  />
                </div>
                <div className="align">
                  <input
                    type="text"
                    id="ph_rate"
                    className="form-control5"
                    placeholder="Public Holiday hourly rate"
                    maxLength="4"
                    minLength="1"
                    autoComplete="off"
                    value={ph_rate}
                    onChange={(e) => {
                      setPhRate(e.target.value);
                    }}
                  />
                </div>

                <h2 className="intitule" id="bussuit">
                  Reimbursements
                </h2>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="align-other">
                    {airtravel ? (
                      <>
                        <input
                          id="a"
                          type="checkbox"
                          checked={airtravel}
                          onChange={(e) => {
                            setAirtravel(e.target.checked);
                          }}
                        />
                        <label htmlFor="a">Air Travel Included</label>
                      </>
                    ) : (
                      <>
                        <input
                          id="a"
                          type="checkbox"
                          checked={airtravel}
                          onChange={(e) => {
                            setAirtravel(e.target.checked);
                            setAirport("");
                          }}
                        />
                        <label htmlFor="a">Air Travel Included</label>
                      </>
                    )}

                    {roadtravel ? (
                      <>
                        <input
                          id="b"
                          type="checkbox"
                          checked={roadtravel}
                          onChange={(e) => {
                            setRoadtravel(e.target.checked);
                          }}
                        />
                        <label htmlFor="b">Road Transport Included</label>
                      </>
                    ) : (
                      <>
                        <input
                          id="b"
                          type="checkbox"
                          checked={false}
                          onChange={(e) => {
                            setRoadtravel(e.target.checked);
                          }}
                        />
                        <label htmlFor="b">Road Transport Included</label>
                      </>
                    )}

                    {accommodation ? (
                      <>
                        <input
                          id="c"
                          type="checkbox"
                          checked={accommodation}
                          onChange={(e) => {
                            setAccommodation(e.target.checked);
                          }}
                        />
                        <label htmlFor="c">Accommodation Included</label>
                      </>
                    ) : (
                      <>
                        <input
                          id="c"
                          type="checkbox"
                          checked={false}
                          onChange={(e) => {
                            setAccommodation(e.target.checked);
                          }}
                        />
                        <label htmlFor="c">Accommodation Included</label>
                      </>
                    )}
                  </div>
                  {airtravel ? (
                    <div id="container">
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control-lg"
                        id="whichAirport"
                        name="profession"
                        placeholder="Select Airport"
                        value={airport ? airport : ""}
                        onFocus={() => {
                          setShowAirport(true);
                        }}
                        onChange={() => {
                          setShowAirport(true);
                        }}
                      />
                      {showAirport ? (
                        <div className="airportList">
                          <ul>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in AU
                            </li>

                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in NSW
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in QLD
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in VIC
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in VIC and TAS
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in TAS
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in NT
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in SA
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              anywhere in WA
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Adelaide (ADL) Only
                            </li>

                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Brisbane (BNE) Only
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Cairns (CNS) Only
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Canberra (CBR) Only
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Darwin (DRW) Only
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Hobart (HBA) Only
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Melbourne (MEL) Only
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Perth (PER) Only
                            </li>
                            <li
                              onClick={(e) => {
                                handleSetAirport(e);
                                handleShowAirport();
                              }}
                            >
                              from Sydney (SYD) Only
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="bottomBtn">
                  <button className="btn-previous">
                    {ReactSession.get("contractType") === "Locum" ? (
                      <Link to="/question3">Previous</Link>
                    ) : (
                      <Link to="/question2">Previous</Link>
                    )}
                  </button>

                  {normal_rate || sat_rate || sun_rate || ph_rate ? (
                    airtravel && airport === "" ? (
                      <button disabled className="btn-next">
                        Next
                      </button>
                    ) : (
                      <button type="submit" className="btn-next">
                        Next
                      </button>
                    )
                  ) : (
                    <button disabled className="btn-next">
                      Next
                    </button>
                  )}
                </div>
              </div>
            </section>
          </form>
        </div>

        <style jsx="true">{`
          .wrap {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            padding-bottom: 60px;
            padding-top: 60px;
            background-image: url("./../../images/main-image.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .wrap .questionCard {
            width: 475px;
            padding-bottom: 30px;
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
            border: 1px solid #ebebeb;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          button:active,
          button:focus {
            height: 50px;
            display: block;
          }

          .wrap .btn-next:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          /* =========== LOGO AND BAR ============ */
          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }

          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: sans-serif;
            text-align: center;
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            margin: 24px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
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
            background: #14a248;
            color: white;
            padding: 0;
            margin-bottom: 20px;
          }
          .wrap .questionCard .btnGroup > button:hover {
            background: #14a248;
            color: #fff;
          }
          .wrap .questionCard .btnGroup > button:active {
            background: #a4cd0f;
            color: #fff;
          }
          .wrap .questionCard .btnGroup > button > a:hover {
            color: #fff;
          }
          input[type="text"] {
            outline: none;
            padding: 10px 10px 10px 18px;
            height: 45px;
            width: 200px;
            color: #2b2b2b;
            font-size: 16px;
            margin-right: 25px;
            left: 50%;
          }

          #vark {
            background-image: url(./../../images/pig-black.png);
            background-repeat: no-repeat;
            background-position: 140px;
            background-size: 40px;
          }
          #bussuit {
            background-image: url(./../../images/airplane-black.png);
            background-repeat: no-repeat;
            background-position: 184px;
            background-size: 40px;
          }
          .intitule {
            font-family: sans-serif;
            font-size: 25px;
            font-weight: 100;
            margin-top: 25px;
            width: 600px;
            height: 50px;
            line-height: 50px;
            padding-left: 0px;
          }
          .wrap .btnGroup h2 {
            text-align: left;
            margin-top: 0px;
          }
          input::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input::-moz-placeholder {
            /* Firefox 19+ */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input :-ms-input-placeholder {
            /* IE 10+ */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input:-moz-placeholder {
            /* Firefox 18- */
            color: #2b2b2b !important;
            font-weight: bold;
          }
          input[type="checkbox"] {
            visibility: hidden;
          }
          input[type="checkbox"] + label {
            height: 52px;
            position: relative;
            cursor: pointer;
            font-size: 16px;
            font-family: sans-serif;
            font-weight: 500;
            float: left;
            width: 210px;
            margin-left: 60px;
            color: #2b2b2b;
            font-weight: 500;
            transform: translateY(-50px);
          }
          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -55px;
            top: 22px;
            width: 32px;
            height: 32px;
            display: block;
            background: white;
            border-radius: 4px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }

          input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -53px;
            top: 26px;
            width: 29px;
            height: 29px;
            display: block;
            z-index: 1;
            background: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }
          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
          .btnGroup .form-control5 {
            display: inline-block;
            width: 250px;
            outline: none;
            height: 40px;
            padding: 0.375rem 0.75rem;
            font-size: 12px;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            -webkit-transition: border-color 0.15s ease-in-out,
              -webkit-box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out,
              -webkit-box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            margin-bottom: 10px;
          }
          .align input[type="text"] {
            display: inline-block;
            margin-bottom: 20px;
            margin-left: 0px auto;
            width: 290px;
            border-radius: 0px;
          }
          .align-other {
            margin: 0px;
            width: 150px;
          }

          /* ========= AIRPORT DROPDOWN =============*/

          #container {
            display: inline-block;
            position: relative;
            width: 200px;
            margin-bottom: 10px;
          }

          #container input[type="text"] {
            left: 0px;
          }

          #whichAirport {
            margin: 0px;
            display: inline-block;
            width: 200px !important;
            height: 40px;
            padding: 3px 6px;
            font-size: 16px;
            font-family: sans-serif;
            border-radius: 0px;
            outline: none;
            background-color: white;
            position: relative;
            display: block;
            border: 1px solid #ccc;
          }

          .airportList {
            position: absolute;
            z-index: 2000;
            width: 100%;
            display: block;
            height: 140px;
            overflow: scroll;
            z-index: 5000;
          }
          .airportList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .airportList ul li {
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
          .airportList ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 17px;
          }

          @media only screen and (min-width: 768px) {
            #container {
              position: relative;
              width: 280px;
            }
            #whichAirport {
              width: 280px !important;
            }

            .airportList ul li {
              font-size: 14px;
              padding-left: 18px;
            }
          }

          /* ========= PREVIOUS AND NEXT BUTTONS =============*/

          .wrap .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .wrap .btn-next {
            position: relative;
            background-color: #14a248;
            color: white;
            border: 1px solid #14a248;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }
          .wrap .btn-previous {
            position: relative;
            background-color: #14a248;
            color: white;
            border: 1px solid #14a248;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          .wrap .btn-previous a,
          .wrap .btn-next a {
            display: block;
            height: 100%;
            width: 100%;
            color: #fff;
            font-weight: 800;
          }

          button,
          button:active,
          button:focus {
            padding: 12px 20px;
            height: 50px;
            background: #fff;
            color: #2b2b2b;
            margin-bottom: 20px;
            border: none;
            outline: none;
            border-radius: 0px;
            cursor: pointer;
            font-size: 16px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .btnGroup .form-control5 {
              margin-bottom: 0px;
              width: 160px;
            }
            .align input[type="number"] {
              margin-left: 10px;
              width: 300px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question4;
