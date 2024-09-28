import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import en from "date-fns/locale/en-AU";

// Three dots
import { ThreeDots } from "react-loader-spinner";

const Ad_details = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const slug = pathname.split("/")[2];
  const [list, setList] = useState({});

  const user = useSelector((state) => state.userInfo.value);

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
  const [startDateInCode, setStartDateInCode] = useState("");
  const [finishDateInCode, setFinishDateInCode] = useState("");
  const [payout, setPayout] = useState("");

  useEffect(() => {
    setIsshow(false);

    // ============ LISTINGS DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "api/listings/Ad_details/" + slug
      )
      .then((response) => {
        if (response.status === 200) {
          setList(response.data.listing);
          setVerifyEmail(response.data.listing.email);
          setIsshow(true);
          if (response.data.listing.payout !== null) {
            setPayout(response.data.listing.payout.toFixed(2));
          } else {
            setPayout(0.0);
          }
          setStartDateInCode(new Date(response.data.startDateInCode));
          setFinishDateInCode(new Date(response.data.finishDateInCode));
        }
      });
  }, []);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");

  const [isloaded, setIsloaded] = useState(false);
  const [isShow, setIsshow] = useState(false);
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [idPhoto, setIdPhoto] = useState("");

  // ============= FACEBOOK & GOOGLE LOGIN DATA ==============
  useEffect(() => {
    if (id) {
      window.history.pushState({}, document.title, "/Ad_details/" + slug);
    }
  }, [id]);

  // ============ PROFILE DATA ===========
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "api/locums/candidate/" + user.email
      )
      .then((response) => {
        if (response.status === 200) {
          setCountry(response.data.country);
          setState(response.data.state);
          setPostalCode(response.data.postalCode);
          setSuburb(response.data.suburb);
          setStreet(response.data.street);
          setStreetNo(response.data.streetNo);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          setIdPhoto(response.data.filename);
          setPhone(response.data.phone);
        }
      });
  }, []);

  // ========== ERROR MESSAGE ===============

  const [updateNote, setUpdateNote] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function outPutErrorMessage(errorMessage) {
    setUpdateNote(true);
    setErrorMsg(errorMessage);
  }

  // ============= POST ==============
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloaded(true);
    const expiryDate = new Date();

    fetch(
      process.env.REACT_APP_BACKEND_URL +
        "api/applications/applications?expiryDate=" +
        expiryDate,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          // applicant (12)
          firstName: user.firstName,
          lastName: user.lastName,
          nanoId: user.nanoId,
          photo: idPhoto,
          phone: phone,
          isLocum: user.isLocum,
          email: user.email,
          locum_ahpra: ahpra,
          locum_payroll: payroll,
          locum_airport: airport,
          locum_startDate: startDate,
          locum_finishDate: selectedFinishDay,
          available_start: `${selectedDay.getDate()} ${
            months[selectedDay.getMonth()]
          } ${selectedDay.getFullYear()}`,
          available_finish: `${selectedFinishDay.getDate()} ${
            months[selectedFinishDay.getMonth()]
          } ${selectedFinishDay.getFullYear()}`,
          //employer (10)
          caseId: list.caseId,
          slugId: list.slug,
          contractType: list.contractType,
          professions: list.professions,
          dateAdListed: list.todaysDate,
          latitude: latitude,
          longitude: longitude,
          streetNo: streetNo,
          street: street,
          suburb: suburb,
          postalCode: postalCode,
          state: state,
          country: country,
          //on Offer (8)
          airport: list.airport,
          accommodation: list.accommodation,
          airtravel: list.airtravel,
          roadtravel: list.roadtravel,
          normal_rate: list.normal_rate,
          sat_rate: list.sat_rate,
          sun_rate: list.sun_rate,
          ph_rate: list.ph_rate,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessage(data.invalid);
          setIsloaded(false);
        } else {
          setIsloaded(false);
          navigate("/applicationSent");
        }
      })
      .catch((err) => {
        console.error(err);
        setIsloaded(false);
      });
  };

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

  // ============ CALENDAR ================

  const [startDate, setStartDate] = useState("");

  const [showCalendarStart, setShowCalendarStart] = useState(false);
  const [showCalendarFinish, setShowCalendarFinish] = useState(false);

  const [selectedDay, setSelectedDay] = useState(startDateInCode);

  const [selectedFinishDay, setSelectedFinishDay] = useState("");

  const selectionner = (selectedDay) => {
    setSelectedDay(selectedDay);
    setStartDate(selectedDay);
    setSelectedFinishDay("");
    setShowCalendarStart(false);
    setShowCalendarFinish(true);
  };

  const selectionnerFinit = (selectedFinishDay) => {
    setSelectedFinishDay(selectedFinishDay);
    setShowCalendarFinish(false);
  };

  // ========= MONTHS ===========
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
          <title>Locum Ad | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div className="top-container">
            {!isShow ? (
              ""
            ) : (
              <div className="ad-description">
                <div style={{ fontWeight: "300" }}>Case ID: {list.caseId}</div>

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
                  {list.professions}{" "}
                  {list.contractType === "Full-Time" ? (
                    <span className="highlight_fulltime">
                      {list.contractType}
                    </span>
                  ) : list.contractType === "Part-Time" ? (
                    <span className="highlight_parttime">
                      {list.contractType}
                    </span>
                  ) : list.contractType === "Locum" ? (
                    <span className="highlight_locum">{list.contractType}</span>
                  ) : (
                    <span className="highlight_other">{list.contractType}</span>
                  )}
                </h2>
                <p style={{ fontWeight: "900" }}>
                  Location:{" "}
                  <b>
                    {list.suburb}, {list.state} {list.postalCode}
                  </b>
                </p>

                <p style={{ fontWeight: "900" }}>
                  <b>Posted: {list.todaysDate} </b>
                </p>

                <br />
                <p style={{ whiteSpace: "pre-wrap" }}> {list.about} </p>
                <br />

                <div className="container-job">
                  <h2>Start and Finish Dates</h2>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="chart">Start Date</p>
                    </div>
                    <div className="col-xs-5">
                      <p>{list.startDate}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="chart">Finish Date</p>
                    </div>
                    <div className="col-xs-5">
                      <p>{list.finishDate}</p>
                    </div>
                  </div>

                  <h2>Time Roster</h2>
                  <div className="row">
                    <div className="col-xs-7">
                      <p className="calendar">Monday</p>
                    </div>
                    <div className="col-xs-5">
                      {list.monday ? (
                        <p>
                          {list.monStart} to {list.monFinish}
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
                      {list.tuesday ? (
                        <p>
                          {list.tueStart} to {list.tueFinish}
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
                      {list.wednesday ? (
                        <p>
                          {list.wedStart} to {list.wedFinish}
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
                      {list.thursday ? (
                        <p>
                          {list.thuStart} to {list.thuFinish}
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
                      {list.friday ? (
                        <p>
                          {list.friStart} to {list.friFinish}
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
                      {list.saturday ? (
                        <p>
                          {list.satStart} to {list.satFinish}
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
                      {list.sunday ? (
                        <p>
                          {list.sunStart} to {list.sunFinish}
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
                        {list.normal_rate === "" ? (
                          <p>Negotiable</p>
                        ) : (
                          <p>AUD {list.normal_rate}</p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-7">
                        <p className="pig">Saturday Rates</p>
                      </div>
                      <div className="col-xs-5">
                        {list.sat_rate === "" ? (
                          <p>Negotiable</p>
                        ) : (
                          <p>AUD {list.sat_rate}</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-7">
                        <p className="pig">Sunday Rates</p>
                      </div>
                      <div className="col-xs-5">
                        {list.sun_rate === "" ? (
                          <p>Negotiable</p>
                        ) : (
                          <p>AUD {list.sun_rate}</p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-7">
                        <p className="pig">Public Holiday Rates</p>
                      </div>
                      <div className="col-xs-5">
                        {list.ph_rate === "" ? (
                          <p>Negotiable</p>
                        ) : (
                          <p>AUD {list.ph_rate}</p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-7">
                        <p className="aircraft">Air Travel Reimbursed</p>
                      </div>
                      <div className="col-xs-5">
                        {list.airtravel ? <p>Included</p> : <p>Not Included</p>}
                      </div>
                    </div>
                    {list.airport ? (
                      <div className="row">
                        <div className="col-xs-7">
                          <p className="aircraft">Air Travel Airport from</p>
                        </div>
                        <div className="col-xs-5">
                          {list.airport ? <p>{list.airport}</p> : ""}
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
                        {list.roadtravel ? (
                          <p>Included</p>
                        ) : (
                          <p>Not Included</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-7">
                        <p className="house">Accommodation Included</p>
                      </div>
                      <div className="col-xs-5">
                        {list.accommodation ? (
                          <p>Included</p>
                        ) : (
                          <p>Not Included</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isShow ? (
              ""
            ) : (
              <form id="selectdate" onSubmit={onSubmit}>
                {updateNote ? (
                  ""
                ) : (
                  <div className="container-price">
                    <h2>
                      {" "}
                      ${payout} + Super
                      <p>estimated weekly payout</p>
                    </h2>
                  </div>
                )}
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
                <div className="container-date">
                  <div className="day_picker">
                    <label htmlFor="calstart">Start date</label>
                    <input
                      className="calstart"
                      type="text"
                      id="demo-3_1"
                      autoComplete="off"
                      value={
                        startDate
                          ? `${selectedDay.getDate()} ${
                              months[selectedDay.getMonth()]
                            } ${selectedDay.getFullYear()}`
                          : startDate
                      }
                      onClick={() => {
                        setShowCalendarStart(!showCalendarStart);
                        setShowCalendarFinish(false);
                        setSelectedFinishDay("");
                        setStartDate("");
                      }}
                      onChange={() => {
                        setShowCalendarStart(!showCalendarStart);
                        setShowCalendarFinish(false);
                        setSelectedFinishDay("");
                        setStartDate("");
                      }}
                    />
                    {showCalendarStart ? (
                      <DayPicker
                        defaultMonth={
                          startDate
                            ? new Date(
                                startDate.getFullYear(),
                                startDate.getMonth()
                              )
                            : new Date()
                        }
                        fromDate={
                          new Date() > startDateInCode
                            ? new Date()
                            : startDateInCode
                        }
                        toDate={finishDateInCode}
                        onSelect={selectionner}
                        selected={startDate}
                        showOutsideDays
                        fixedWeeks
                        numberOfMonths={1}
                        locale={en}
                        mode="single"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="day_picker">
                    <label htmlFor="">Finish date</label>
                    <input
                      className="calfinish"
                      type="text"
                      id="demo-3_2"
                      autoComplete="off"
                      value={
                        selectedFinishDay
                          ? `${selectedFinishDay.getDate()} ${
                              months[selectedFinishDay.getMonth()]
                            } ${selectedFinishDay.getFullYear()}`
                          : ""
                      }
                      onClick={() => {
                        setShowCalendarStart(false);
                        setShowCalendarFinish(!showCalendarFinish);
                        setSelectedFinishDay("");
                      }}
                      onChange={() => {
                        setShowCalendarStart(false);
                        setShowCalendarFinish(!showCalendarFinish);
                        setSelectedFinishDay("");
                      }}
                    />
                    {showCalendarFinish ? (
                      <DayPicker
                        fromDate={startDate}
                        defaultMonth={
                          startDate
                            ? new Date(
                                startDate.getFullYear(),
                                startDate.getMonth()
                              )
                            : new Date()
                        }
                        toDate={finishDateInCode}
                        onSelect={selectionnerFinit}
                        selected={selectedFinishDay}
                        showOutsideDays
                        fixedWeeks
                        numberOfMonths={1}
                        locale={en}
                        mode="single"
                      />
                    ) : (
                      ""
                    )}
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
                          I declare that I am registered with AHPRA.
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
                    value={airport}
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
                          Adelaide (ADL)
                        </li>

                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Brisbane (BNE)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Cairns (CNS)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Canberra (CBR)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Darwin (DRW)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Gold Coast (OOL)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Hobart (HBA)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Launceston (LST)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Melbourne (MEL)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Newcastle (NTL)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Perth (PER)
                        </li>
                        <li
                          onClick={(e) => {
                            handleSetAirport(e);
                            handleShowAirport();
                          }}
                        >
                          Sydney (SYD)
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
                      {list.airtravel ? <p>Yes</p> : <p>No</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-8">
                      <p className="car">Road Transport Reimbursed</p>
                    </div>
                    <div className="col-xs-4">
                      {list.roadtravel ? <p>Yes</p> : <p>No</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-8">
                      <p className="house">Accommodation Included</p>
                    </div>
                    <div className="col-xs-4">
                      {list.accommodation ? <p>Yes</p> : <p>No</p>}
                    </div>
                  </div>
                </div>

                {applied.slice(0, 1).map((appId) => {
                  return (
                    appId.caseId === list.caseId && (
                      <input
                        type="button"
                        className="appliedbefore"
                        value="Applied Already"
                        key={list.caseId}
                      />
                    )
                  );
                })}
                {applied.length === 0 ? (
                  user.isLoggedIn ? (
                    verifyEmail !== user.email ? (
                      user.isLocum ? (
                        startDate &&
                        selectedFinishDay &&
                        ahpra &&
                        airport &&
                        payroll ? (
                          !isloaded ? (
                            <input
                              type="submit"
                              className="btn-med"
                              value="Apply"
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
                          <input
                            type="button"
                            className="btn-inactive"
                            value="Apply"
                          />
                        )
                      ) : (
                        <input
                          type="button"
                          className="btn-inactiveLoggedIn"
                          id="loginFirst"
                          value="Only registered locums can apply"
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
            )}
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

          .wrap .alert {
            background-color: #fcebcd;
            margin: 0px auto 0px;
            padding: 7px;
            width: 100%;
          }
          .top-container {
            height: 100%;
            width: 100%;
            display: block;
            padding-bottom: 60px;
          }
          @media only screen and (min-width: 768px) {
            .top-container {
              display: flex;
              justify-content: center;
              flex-direction: row;
              padding-bottom: 60px;
            }
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
          /* ============ LEFT BIG BANNER =============== */
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
            font-weight: 800;
            font-family: sans-serif;
            width: 400px;
          }

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
            height: 655px;
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
          .container-price p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            font-family: sans-serif;
          }

          /* ============ DATE =============== */

          .wrap .updateNote {
            background-color: #fcebcd;
            margin: 5px auto;
            padding: 7px;
          }
          .wrap .updateNote a {
            font-weight: 700;
            color: #14a248;
          }

          .wrap .container-date {
            position: relative;
            display: flex;
            justify-content: space-between;
            width: 100%;
            z-index: 6000;
            transform: translateY(65%);
          }
          .container-date label {
            color: #777;
            position: absolute;
            transform: translateY(-110%);
            font-weight: 100;
            font-size: 14px;
          }

          /* ============== CALENDAR =============== */

          .wrap .container-date .rdp button:hover {
            color: #fff;
            background: #14a248;
            text-decoration: none;
            border-radius: 0px;
          }

          .container-date .rdp,
          .rdp {
            position: absolute;
            z-index: 6000;

            background: #fff;
          }
          .container-date .day_picker .rdp {
            position: absolute;
            z-index: 6000;
          }
          .container-date .day_picker .rdp-month {
            background-color: white;
            padding: 10px 15px;
            border: 1px solid black;
            z-index: 6000;
          }
          .container-date .day_picker .rdp-day.rdp-day_selected {
            background-color: #14a248;
            color: white;
            z-index: 6000;
          }

          .container-date .day_picker .rdp-day {
            height: 40px;
            width: 40px;
            border-radius: 0%;
            z-index: 6000;
          }
          .container-date .day_picker .rdp-day:hover {
            background-color: #14a248;
            color: white;
            z-index: 6000;
          }

          .container-date .day_picker .rdp-day_outside {
            opacity: 0.25;
            z-index: 6000;
          }

          .container-date .day_picker .rdp-day_outside:hover {
            opacity: 1;
            background-color: #14a248;
            color: white;
            z-index: 6000;
          }

          .container-date .rdp-button[disabled]:not(.rdp-day_selected):hover {
            color: #212529;
            opacity: 0.25;
            background-color: transparent;
            z-index: 6000;
          }

          .container-date .day_picker .rdp-button_reset {
            color: #212529;
            font-size: 16px;
            z-index: 6000;
          }

          .container-date button {
            outline: none;
            border: none;
            cursor: pointer;
            z-index: 6000;
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
            z-index: 3000;
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
          }

          .payroll {
            position: absolute;
            width: 100%;
            display: block;
            height: 140px;
            overflow: scroll;
            z-index: 3001;
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
            z-index: 2000;
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
            z-index: 1000;
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

          .btn-login {
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
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .btn-login:active,
          .btn-login:focus {
            outline: none;
          }

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

          .btn-notself {
            height: 48px;
            border-radius: 4px;
            color: white;
            background-color: #e40000;
            text-align: center;
            border: 1px solid #e40000;
            position: relative;
            width: 100%;
            top: 12%;
            outline: none;
          }

          .btn-notself a:hover {
            cursor: not-allowed;
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
            top: 12%;
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
            margin-top: 10px;
            top: 9%;
            outline: none;
          }

          .container-signup {
            position: relative;
            top: 9%;
            left: 0%;
            width: 100%;
          }
          .container-signup a {
            color: #008489;
            font-weight: 700;
            font-family: sans-serif;
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Ad_details;
