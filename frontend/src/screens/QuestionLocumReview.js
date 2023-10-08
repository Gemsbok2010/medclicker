import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";

const QuestionLocumReview = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  ReactSession.setStoreType("sessionStorage");
  const [backDrop, setBackdrop] = useState(true);
  const [contractType, setContractType] = useState("");
  const [professions, setProfessions] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [todaysDate, setTodaysDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [monStart, setMonStart] = useState("");
  const [monFinish, setMonFinish] = useState("");
  const [tueStart, setTueStart] = useState("");
  const [tueFinish, setTueFinish] = useState("");
  const [wedStart, setWedStart] = useState("");
  const [wedFinish, setWedFinish] = useState("");
  const [thuStart, setThuStart] = useState("");
  const [thuFinish, setThuFinish] = useState("");
  const [friStart, setFriStart] = useState("");
  const [friFinish, setFriFinish] = useState("");
  const [satStart, setSatStart] = useState("");
  const [satFinish, setSatFinish] = useState("");
  const [sunStart, setSunStart] = useState("");
  const [sunFinish, setSunFinish] = useState("");
  const [airport, setAirport] = useState("");
  const [normal_rate, setNormalRate] = useState("");
  const [sat_rate, setSatRate] = useState("");
  const [sun_rate, setSunRate] = useState("");
  const [ph_rate, setPhRate] = useState("");
  const [monHr, setMonHr] = useState(0);
  const [tueHr, setTueHr] = useState(0);
  const [wedHr, setWedHr] = useState(0);
  const [thuHr, setThuHr] = useState(0);
  const [friHr, setFriHr] = useState(0);
  const [satHr, setSatHr] = useState(0);
  const [sunHr, setSunHr] = useState(0);
  const [airtravel, setAirtravel] = useState(false);
  const [roadtravel, setRoadtravel] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

  // ================= MANAGE RIGHT PANEL ================
  var media = window.matchMedia("(min-width:768px)");
  window.onscroll = function () {
    let topContainer =
      document.querySelector(".top-container").clientHeight - 60;
    let selectDateHeight =
      document.querySelector("#selectdate").clientHeight + 2;
    let y = window.pageYOffset + selectDateHeight;
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

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setContractType(ReactSession.get("contractType"));
    setProfessions(ReactSession.get("professions"));
    setAbout(ReactSession.get("about"));
    setCountry(ReactSession.get("country"));
    setState(ReactSession.get("state"));
    setPostalCode(ReactSession.get("postalCode"));
    setSuburb(ReactSession.get("suburb"));
    setStreet(ReactSession.get("street"));
    setStreetNo(ReactSession.get("streetNo"));
    setLatitude(ReactSession.get("latitude"));
    setLongitude(ReactSession.get("longitude"));
    setTodaysDate(ReactSession.get("todaysDate"));
    setStartDate(ReactSession.get("startDate"));
    setFinishDate(ReactSession.get("finishDate"));
    setMonday(ReactSession.get("monday"));
    setTuesday(ReactSession.get("tuesday"));
    setWednesday(ReactSession.get("wednesday"));
    setThursday(ReactSession.get("thursday"));
    setFriday(ReactSession.get("friday"));
    setSaturday(ReactSession.get("saturday"));
    setSunday(ReactSession.get("sunday"));
    setMonStart(ReactSession.get("monStart"));
    setTueStart(ReactSession.get("tueStart"));
    setWedStart(ReactSession.get("wedStart"));
    setThuStart(ReactSession.get("thuStart"));
    setFriStart(ReactSession.get("friStart"));
    setSatStart(ReactSession.get("satStart"));
    setSunStart(ReactSession.get("sunStart"));
    setMonFinish(ReactSession.get("monFinish"));
    setTueFinish(ReactSession.get("tueFinish"));
    setWedFinish(ReactSession.get("wedFinish"));
    setThuFinish(ReactSession.get("thuFinish"));
    setFriFinish(ReactSession.get("friFinish"));
    setSatFinish(ReactSession.get("satFinish"));
    setSunFinish(ReactSession.get("sunFinish"));
    if (!ReactSession.get("monHr")) {
      setMonHr(0);
    } else {
      setMonHr(ReactSession.get("monHr"));
    }
    if (!ReactSession.get("tueHr")) {
      setTueHr(0);
    } else {
      setTueHr(ReactSession.get("tueHr"));
    }
    if (!ReactSession.get("wedHr")) {
      setWedHr(0);
    } else {
      setWedHr(ReactSession.get("wedHr"));
    }
    if (!ReactSession.get("thuHr")) {
      setThuHr(0);
    } else {
      setThuHr(ReactSession.get("thuHr"));
    }
    if (!ReactSession.get("friHr")) {
      setFriHr(0);
    } else {
      setFriHr(ReactSession.get("friHr"));
    }
    if (!ReactSession.get("satHr")) {
      setSatHr(0);
    } else {
      setSatHr(ReactSession.get("satHr"));
    }
    if (!ReactSession.get("sunHr")) {
      setSunHr(0);
    } else {
      setSunHr(ReactSession.get("sunHr"));
    }
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

    setAirport(ReactSession.get("airport"));
    setAirtravel(ReactSession.get("airtravel"));
    setRoadtravel(ReactSession.get("roadtravel"));
    setAccommodation(ReactSession.get("accommodation"));
    setExpiryDate(ReactSession.get("expiryDate"));
  }, []);

  // ============= POST ==============
  const onSubmit = (e) => {
    e.preventDefault();
    const isActiveJob = true;

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        "api/listings/locumList?expiryDate=" +
        expiryDate,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          isActiveJob,
          contractType,
          about,
          professions,
          country,
          state,
          suburb,
          street,
          streetNo,
          latitude,
          longitude,
          postalCode,
          normal_rate,
          sun_rate,
          sat_rate,
          ph_rate,
          airport,
          roadtravel,
          airtravel,
          accommodation,
          startDate,
          finishDate,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          monStart,
          tueStart,
          wedStart,
          thuStart,
          friStart,
          satStart,
          sunStart,
          monFinish,
          tueFinish,
          wedFinish,
          thuFinish,
          friFinish,
          satFinish,
          sunFinish,
          todaysDate,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          filename: user.filename,
          payout: payout,
          monHr,
          tueHr,
          wedHr,
          thuHr,
          friHr,
          satHr,
          sunHr,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          sessionStorage.clear();
          //Question Card on Homepage
          localStorage.setItem("contractType", "");
          localStorage.setItem("professions", "");
          localStorage.removeItem("contractType");
          localStorage.removeItem("professions");
          // GA4 Event
          ReactGA.event({
            category: "Post Locum Ad",
            action: "Locum Ad Posted",
          });
          navigate("/thank_you");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ========= SALARY CALCULATIONS ==============
  let weekdayPay =
    normal_rate === ""
      ? 0
      : (monHr + tueHr + wedHr + thuHr + friHr) * parseInt(normal_rate);

  let saturdayPay = sat_rate === "" ? 0 : satHr * parseInt(sat_rate);

  let sundayPay = sun_rate === "" ? 0 : sunHr * parseInt(sun_rate);

  let payout = weekdayPay + saturdayPay + sundayPay;

  // ============ AIRPORT =============

  const [showAirport, setShowAirport] = useState(false);
  const [dummy_airport, setDummyAirport] = useState("");

  const handleShowAirport = () => {
    setShowAirport(false);
  };

  const handleSetAirport = (e) => {
    const innerHTML = e.target.innerHTML;
    setDummyAirport(innerHTML);
  };

  // ============ PAYROLL =============
  const [showPayroll, setShowPayroll] = useState(false);
  const [payroll, setPayroll] = useState("");

  const handleShowPayroll = () => {
    setShowPayroll(false);
  };

  const handleSetPayroll = (e) => {
    const innerHTML = e.target.innerHTML;
    setPayroll(innerHTML);
  };

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

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Q. Locum Ad Review | MedClicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div className="wrap">
          {backDrop ? <div className="backdrop"></div> : ""}

          {backDrop ? (
            <div className="alertCard container">
              <img
                onClick={() => {
                  setBackdrop(false);
                }}
                style={{ width: "25px", marginLeft: "0px", cursor: "pointer" }}
                src="/images/cross-black.png"
                alt=""
              />
              <h3>Notice</h3>

              <p>
                If Medclicker identies any content that is not genuine and/ or
                does not comply or abide to the rules set out in our terms and
                conditions, we may advise, delete and/ or terminate your account
                permanently. We may also take legal action against any unlawful
                behaviours.
              </p>
              <br />
              <p>
                Click on submit button on the bottom upon confirmation.
                <img
                  style={{ width: "200px", marginLeft: "20px" }}
                  src="/images/upload_button.png"
                  alt=""
                />
              </p>
              <br />
              <p>
                For further assistance, please
                <Link target="_blank" to="/contact">
                  {" "}
                  contact us.
                </Link>
              </p>
            </div>
          ) : (
            ""
          )}

          <div className="top-container">
            <div className="ad-description">
              <div
                style={{
                  fontWeight: "500",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                Posted by {user.firstName}
                <figure className="smallPhoto">
                  <img src={user.filename} alt="" />
                </figure>
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

              <div className="container-job">
                <h2>Start and Finish Dates</h2>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="chart">Start Date</p>
                  </div>
                  <div className="col-xs-5">
                    <p>{startDate}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="chart">Finish Date</p>
                  </div>
                  <div className="col-xs-5">
                    <p>{finishDate}</p>
                  </div>
                </div>
                <h2>Time Roster</h2>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">Monday</p>
                  </div>
                  <div className="col-xs-5">
                    {monday ? (
                      <p>
                        {monStart} to {monFinish}
                      </p>
                    ) : (
                      <p>Day Off</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">Tuesday</p>
                  </div>
                  <div className="col-xs-5">
                    {tuesday ? (
                      <p>
                        {tueStart} to {tueFinish}
                      </p>
                    ) : (
                      <p>Day Off</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">Wednesday</p>
                  </div>
                  <div className="col-xs-5">
                    {wednesday ? (
                      <p>
                        {wedStart} to {wedFinish}
                      </p>
                    ) : (
                      <p>Day Off</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">Thursday</p>
                  </div>
                  <div className="col-xs-5">
                    {thursday ? (
                      <p>
                        {thuStart} to {thuFinish}
                      </p>
                    ) : (
                      <p>Day Off</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">Friday</p>
                  </div>
                  <div className="col-xs-5">
                    {friday ? (
                      <p>
                        {friStart} to {friFinish}
                      </p>
                    ) : (
                      <p>Day Off</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">Saturday</p>
                  </div>
                  <div className="col-xs-5">
                    {saturday ? (
                      <p>
                        {satStart} to {satFinish}
                      </p>
                    ) : (
                      <p>Day Off</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7">
                    <p className="calendar">Sunday</p>
                  </div>
                  <div className="col-xs-5">
                    {sunday ? (
                      <p>
                        {sunStart} to {sunFinish}
                      </p>
                    ) : (
                      <p>Day Off</p>
                    )}
                  </div>
                </div>

                <br />
                <div className="container-onoffer">
                  <h2>The Offer</h2>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="pig">Weekday Rates</p>
                    </div>
                    <div className="col-xs-5">
                      {normal_rate === "" ? (
                        <p>Negotiable</p>
                      ) : (
                        <p>AUD {normal_rate}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="pig">Saturday Rates</p>
                    </div>
                    <div className="col-xs-5">
                      {sat_rate === "" ? (
                        <p>Negotiable</p>
                      ) : (
                        <p>AUD {sat_rate}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="pig">Sunday Rates</p>
                    </div>
                    <div className="col-xs-5">
                      {sun_rate === "" ? (
                        <p>Negotiable</p>
                      ) : (
                        <p>AUD {sun_rate}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="pig">Public Holiday Rates</p>
                    </div>
                    <div className="col-xs-5">
                      {ph_rate === "" ? (
                        <p>Negotiable</p>
                      ) : (
                        <p>AUD {ph_rate}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="aircraft">Air Travel Reimbursed</p>
                    </div>
                    <div className="col-xs-5">
                      {airtravel ? <p>Included</p> : <p>Not Included</p>}
                    </div>
                  </div>

                  {airport ? (
                    <div className="row">
                      <div className="col-xs-7">
                        <p className="aircraft">Air Travel Airport from</p>
                      </div>
                      <div className="col-xs-5">
                        {airport ? <p>{airport}</p> : ""}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="car">Road Transport Reimbursed</p>
                    </div>
                    <div className="col-xs-5">
                      {roadtravel ? <p>Included</p> : <p>Not Included</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="house">Accommodation Included</p>
                    </div>
                    <div className="col-xs-5">
                      {accommodation ? <p>Included</p> : <p>Not Included</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form id="selectdate">
              <div className="container-price">
                <h2>
                  {" "}
                  ${payout} + Super
                  <p>estimated weekly payout</p>
                </h2>
              </div>
              <div className="container-date">
                <div className="day_picker">
                  <label htmlFor="calstart">Start date</label>
                  <input
                    className="calstart"
                    type="text"
                    id="demo-3_1"
                    autoComplete="off"
                    defaultValue={""}
                  />
                </div>
                <div className="day_picker">
                  <label htmlFor="">Finish date</label>
                  <input
                    className="calfinish"
                    type="text"
                    id="demo-3_2"
                    autoComplete="off"
                    defaultValue={""}
                  />
                </div>
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
                    setShowAirport(false);
                    setShowPayroll(false);
                  }}
                  onChange={() => {
                    setShowAhpra(!showAhpra);
                    setShowAirport(false);
                    setShowPayroll(false);
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
              <div className="container-abn">
                <label htmlFor="payRoll">Payroll:</label>
                <input
                  id="payRoll"
                  required
                  type="text"
                  value={payroll}
                  placeholder="Select Payroll Method"
                  autoComplete="off"
                  onFocus={() => {
                    setShowPayroll(!showPayroll);
                    setShowAirport(false);
                    setShowAhpra(false);
                  }}
                  onChange={() => {
                    setShowPayroll(!showPayroll);
                    setShowAirport(false);
                    setShowAhpra(false);
                  }}
                />
                {showPayroll ? (
                  <div className="payroll">
                    <ul>
                      <li
                        onClick={(e) => {
                          handleSetPayroll(e);
                          handleShowPayroll();
                        }}
                      >
                        Yes, I have an ABN.
                      </li>
                      <li
                        onClick={(e) => {
                          handleSetPayroll(e);
                          handleShowPayroll();
                        }}
                      >
                        No, I don' t have an ABN.
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="container-airport">
                <label htmlFor="iCanFlyOutFrom">I can fly out from:</label>
                <input
                  id="iCanFlyOutFrom"
                  required
                  type="text"
                  placeholder="Select Airport"
                  autoComplete="off"
                  value={dummy_airport}
                  onFocus={() => {
                    setShowAirport(true);
                  }}
                  onChange={() => {
                    setShowAirport(true);
                    setShowAhpra(false);
                    setShowPayroll(false);
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
              <div className="container-details">
                <p>Details:</p>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="aircraft">Air Travel Reimbursed</p>
                  </div>
                  <div className="col-xs-4">
                    {airtravel ? <p>Yes</p> : <p>No</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="car">Road Transport Reimbursed</p>
                  </div>
                  <div className="col-xs-4">
                    {roadtravel ? <p>Yes</p> : <p>No</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8">
                    <p className="house">Accommodation Included</p>
                  </div>
                  <div className="col-xs-4">
                    {accommodation ? <p>Yes</p> : <p>No</p>}
                  </div>
                </div>
              </div>
              <input
                type="submit"
                disabled="disabled"
                className="btn-med"
                defaultValue="Request to Apply"
              />
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <div className="bottomBtn">
              <button className="btn-previous">
                <Link to="/question6">Previous</Link>
              </button>

              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        <style jsx="true">{`
          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            padding-top: 60px;
            padding-bottom: 60px;
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
            opacity: 0.8;
            cursor: auto;
            z-index: 4000;
          }
          .alertCard {
            position: fixed;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            padding: 28px 30px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            background: rgba(255, 255, 255, 0.9);
            z-index: 5000;
            width: 480px;
          }
          .alertCard h3 {
            color: #333;
            font-size: 42px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 900;
            margin-bottom: 40px;
            text-align: center;
          }

          .alertCard p {
            color: #333;
            font-size: 23px;
            font-family: "Noto Sans TC", sans-serif;
            text-align: left;
          }

          .alertCard a {
            color: #008489;
            text-decoration: none;
          }

          .alertCard a:focus,
          .alertCard a:active {
            text-decoration: none;
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

          .container-job {
            position: relative;
            width: 100%;
            left: 0%;
            padding-bottom: 10px;
            display: block;
            padding-top: 20px;
            border-top: 1px solid #ebebeb;
          }
          .container-onoffer {
            position: relative;
            width: 100%;
            left: 0%;
            display: block;

            padding-top: 20px;
            border-top: 1px solid #ebebeb;
          }

          .container-onoffer p,
          .container-job p {
            margin: 8px 0px;
          }
          .container-onoffer .row p,
          .container-job .row p {
            width: 100%;
            padding-left: 22px;
          }
          .container-onoffer .col-xs-5 p,
          .container-job .col-xs-5 p {
            text-align: right;
          }
          .container-job h2,
          .container-onoffer h2 {
            margin: 18px 0px 16px 0px;
            color: #484848;
            width: 100%;
            font-size: 22px;
            font-size: 800;
            color: #333;
            font-family: sans-serif;
            width: 400px;
          }
          .container-price p,
          .container-onoffer p,
          .container-job p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            font-family: sans-serif;
          }
          .container-job .row {
            display: flex;
            justify-content: space-between;
          }

          /* ========== RIGHT SMALL BANNER =========== */
          #selectdate {
            width: 470px;
            height: 650px;
            background-color: white;
            position: relative;
            margin: 30px auto 0px;
            border: 1px solid #ebebeb;
            padding: 20px 20px;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }

          /* ============ ESTIMATED PAYOUT =============== */

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

          /* ============ DATE =============== */

          .container-date {
            position: relative;
            display: flex;
            justify-content: space-between;
            width: 100%;
            z-index: 2000;
            transform: translateY(65%);
          }
          .container-date label {
            color: #777;
            position: absolute;
            transform: translateY(-110%);
            font-weight: 100;
            font-size: 14px;
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
            top: 6%;
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

          /* ============ PAYROLL =============== */
          .container-abn .form-control {
            -webkit-appearance: none;
            appearance: none;
            height: 40px;
            outline: none;
            border: 1px solid #ebebeb;
            border-radius: 0px;
          }

          .container-abn label {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }

          .container-abn {
            position: relative;
            width: 100%;
            top: 7%;
            outline: none;
            z-index: 1500;
          }
          #payRoll {
            outline: none;
            height: 40px;
            color: #2b2b2b;
            padding: 10px 10px 10px 12px;
            width: 100%;
            display: block;
            font-size: 14px;
            margin-left: 0px;
            left: 40%;
            z-index: 100;
          }

          .payroll {
            position: absolute;
            width: 100%;
            display: block;
            height: 140px;
            overflow: scroll;
            z-index: 1000;
          }
          .payroll ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .payroll ul li {
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
          .payroll ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 11px;
          }

          /* ============ AIRPORT =============== */
          .container-airport .form-control {
            -webkit-appearance: none;
            appearance: none;
            height: 40px;
            outline: none;
            border: 1px solid #ebebeb;
            border-radius: 0px;
          }

          .container-airport label {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }

          .container-airport {
            position: relative;
            width: 100%;
            top: 8%;
            left: 0%;
            outline: none;
            z-index: 1000;
          }

          #iCanFlyOutFrom {
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
          .airportList {
            position: absolute;
            width: 100%;
            display: block;
            height: 140px;
            overflow: scroll;
            z-index: 2001;
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
            padding-left: 11px;
          }

          /* ============ DETAILS =============== */

          .container-details p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }
          .container-details .row {
            display: flex;
            justify-content: space-between;
          }

          .container-details {
            position: relative;
            width: 100%;
            top: 10%;
            left: 0%;
            outline: none;
            z-index: 500;
          }
          .container-details .row p {
            width: 100%;
            padding-left: 22px;
          }
          .container-details .row {
            border-bottom: 1px solid #ebebeb;
            margin-left: 4px;
            width: 100%;
          }
          .container-details .col-xs-4 p {
            text-align: right;
          }
          .container-details .col-xs-8 {
            padding-left: 0;
            padding-right: 0;
          }
          .container-details p {
            margin: 8px auto;
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
            top: 12%;
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

          /* ========= PREVIOUS AND SUBMIT BUTTONS ========= */
          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .bottomBtn > button:active {
            border: none;
            outline: none;
          }
          .bottomBtn > button:focus {
            border: none;
            outline: none;
          }
          .bottomBtn > button:hover {
            border: none;
            outline: none;
            color: white;
            cursor: pointer;
          }

          .btn-previous,
          .btn-submit {
            position: relative;
            background-color: #14a248;
            color: white;
            border: 2px solid #fff;
            cursor: pointer;
            font-weight: 800;
            width: 160px;
            height: 58px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }
          .wrap .btn-previous:focus,
          .wrap .btn-submit:focus {
            background: #14a248;
            color: #fff;
            outline: none;
            border: 2px solid #fff;
          }
          .wrap .btn-previous:hover,
          .wrap .btn-submit:hover {
            background: #14a248;
            color: #fff;
            outline: none;
            border: 2px solid #fff;
          }
          .wrap .btn-previous:active,
          .wrap .btn-submit:active {
            background: #14a248;
            color: #fff;
            outline: none;
            border: 2px solid #fff;
          }
          .btn-previous a {
            color: white;
            font-weight: 800;
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            position: relative;
            display: block;
          }

          .wrap .bottomBtn button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #14a248;
            position: relative;
            color: white;
            border: 2px solid #fff;
            cursor: pointer;
            font-weight: 800;
            width: 160px;
            height: 58px;
            line-height: 54px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          @media only screen and (min-width: 768px) {
            .container-license {
              top: 6%;
            }
            .container-airport {
              width: 100%;
              top: 8%;
            }
            .container-abn {
              width: 100%;
            }
            .container-details .row {
              width: 100%;
            }
            .container-details {
              top: 9%;
            }
            .btn-med {
              width: 100%;
              top: 12%;
            }
            .btn-previous,
            .btn-submit {
              width: 240px;
            }
            .bottomBtn {
              justify-content: space-around;
            }
            .airportList ul li {
              font-size: 14px;
              padding-left: 18px;
            }
            .ahpra ul li {
              font-size: 14px;
              padding-left: 18px;
            }
            .payroll ul li {
              font-size: 14px;
              padding-left: 18px;
            }

            .ahpra ul li:hover {
              padding-left: 17px;
            }
            .payroll ul li:hover {
              padding-left: 17px;
            }
            .airportList ul li:hover {
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

          .car {
            background-image: url("./../../images/busmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 16px;
          }
          .aircraft {
            background-image: url("./../../images/aircraft.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .house {
            background-image: url("./../../images/housemarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .pig {
            background-image: url("./../../images/pigmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }

          .pencil {
            background-image: url("./../../images/pencil.png");
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

            .container-onoffer {
              width: 540px;
            }
            .container-job {
              width: 540px;
            }
            #selectdate {
              width: 400px;
              display: inline-block;
              margin-top: 0px;
              position: fixed;
              margin-left: 700px;
              padding: 20px 20px;
            }

            input[type="text"] {
              width: 170px;
            }

            .container-price h2 {
              width: 100%;
            }
            .container-details .row {
              width: 100%;
            }
            .alertCard {
              width: 1080px;
              z-index: 5000;
            }

            .alertCard p {
              font-size: 33px;
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

export default QuestionLocumReview;
