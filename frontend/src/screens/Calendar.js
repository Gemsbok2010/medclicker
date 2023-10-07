import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Calendar = () => {
  const user = useSelector((state) => state.userInfo.value);
  const email = user.email;
  const [applications, setApplications] = useState([]);
  const [listingInfo, setListingInfo] = useState([]);

  // Which month we currently in

  let [nav, setNav] = useState(0);

  // The entire calendar
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  // Get today's date
  const dt = new Date();
  //get the current month
  const maand = dt.getMonth();

  // Use nav as a pointer to go next or previous
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  // get today's date day, month and year
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  // First day of current month
  const firstDayOfMonth = new Date(year, month, 1);

  // Get the number of days this month. If Jan now, month+1 is Feb, but the 0 gets the last day of previous month of Feb, which is 31 for Jan
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const previousDaysInMonth = new Date(year, month, 0).getDate();

  // Get which weekday eg: Mo, Tu, We
  const dateString = firstDayOfMonth.toLocaleDateString("en-au", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // gets the padding days (last days in previous month) in numeric
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  const squares = [];
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    squares.push(<div key={i}></div>);
  }

  const nextMonth = (e) => {
    if (nav < 10) {
      setNav(nav++);
      setNav(nav++);
    }
  };

  const previousMonth = (e) => {
    if (nav > 0) {
      setNav(nav--);
      setNav(nav--);
    }
  };

  useEffect(() => {
    setNav(nav);
  }, [nav]);

  // ============= GET CALENDAR ===============

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/calendar?" +
          "email=" +
          email
      );
      const data = await res.json();

      if (isCancelled === false) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
     
        setListingInfo(data.adPosts);
        setApplications(data.applications);
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

  // ============= GET DISPLAY PANEL AFTER CLICK ON START ===============
  const [showInfo, setShowInfo] = useState(false);
  const [thisId, setThisId] = useState("");
  const [available_start, setAvailable_start] = useState("");
  const [available_finish, setAvailable_finish] = useState("");
  const [caseId, setCaseId] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [airtravel, setAirtravel] = useState("");
  const [roadtravel, setRoadtravel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [owner_email, setOwner_email] = useState("");
  const [owner_phone, setOwner_phone] = useState("");
  const [normal_rate, setNormal_rate] = useState("");
  const [sat_rate, setSat_rate] = useState("");
  const [sun_rate, setSun_rate] = useState("");

  const panelDisplay = (e, app, list) => {
    setShowInfo(false);
    setThisId(app._id);
    setAvailable_start(app.available_start);
    setAvailable_finish(app.available_finish);
    setCaseId(list.caseId);
    setAccommodation(list.accommodation);
    setAirtravel(list.airtravel);
    setRoadtravel(list.roadtravel);
    setFirstName(list.firstName);
    setLastName(list.lastName);
    setState(list.state);
    setPostalCode(list.postalCode);
    setSuburb(list.suburb);
    setStreet(list.street);
    setStreetNo(list.streetNo);
    setOwner_email(list.email);
    setOwner_phone(list.phone);
    setNormal_rate(list.normal_rate);
    setSat_rate(list.sat_rate);
    setSun_rate(list.sun_rate);
    setTimeout(function () {
      setShowInfo(true);
    }, 200);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>My Calendar | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div id="container">
            <div id="header">
              <div id="monthDisplay">
                {dt.toLocaleDateString("en-au", {
                  month: "long",
                })}{" "}
                {year}
              </div>
              <div>
                <button
                  className="backButton"
                  onClick={(e) => {
                    previousMonth(e);
                    setShowInfo(false);
                    setThisId("");
                  }}
                ></button>
                <button
                  className="nextButton"
                  onClick={(e) => {
                    nextMonth(e);
                    setShowInfo(false);
                    setThisId("");
                  }}
                ></button>
              </div>
            </div>
            <div id="weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div id="calendar">
              {squares.map((square) => {
                return (
                  <div
                    style={{ paddingLeft: "3px" }}
                    className={
                      parseInt(square.key) < day + paddingDays &&
                      month === maand
                        ? "inactive day"
                        : parseInt(square.key) === day + paddingDays &&
                          month === maand
                        ? "today day"
                        : parseInt(square.key) <= paddingDays
                        ? "padding day"
                        : "day"
                    }
                    key={square.key}
                  >
                    {parseInt(square.key) <= paddingDays &&
                      previousDaysInMonth - paddingDays + parseInt(square.key)}

                    {parseInt(square.key) > paddingDays && (
                      <>
                        <span style={{ paddingLeft: "3px" }}>
                          {parseInt(square.key) - paddingDays}
                        </span>

                        {applications.map((app) => {
                          return parseInt(square.key) -
                            paddingDays +
                            " " +
                            dt
                              .toLocaleDateString("en-au", {
                                month: "long",
                              })
                              .substring(0, 3) +
                            " " +
                            year ===
                            app.available_start
                            ? listingInfo.map((list) => {
                                return (
                                  list.slug === app.slugId && (
                                    <div
                                      key={app._id}
                                      className="worm-head"
                                      style={{
                                        backgroundColor:
                                          app._id === thisId ? "#e40000" : "",
                                      }}
                                      onClick={(e) => {
                                        panelDisplay(e, app, list);
                                      }}
                                    >
                                      <div
                                        className="ball"
                                        style={{
                                          backgroundColor:
                                            app._id === thisId ? "#e40000" : "",
                                        }}
                                      >
                                        <figure className="smallPhoto">
                                          <img
                                            src={`${list.filename}`}
                                            alt=""
                                          />
                                        </figure>
                                      </div>
                                      <span>
                                        {app._id === thisId ? "INFO" : "START"}
                                      </span>
                                    </div>
                                  )
                                );
                              })
                            : "";
                        })}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {showInfo === true ? (
            <div className="wrapper">
              <div className="wrapper-ads">
                <div className="ads">
                  <div className="rightmessage">
                    <h2>
                      Case ID: {caseId}
                      <span className="seen">Hired</span>
                      <span className="can-do">
                        I can do:{" "}
                        <span className="highlight">{available_start}</span> to{" "}
                        <span className="highlight">{available_finish}</span>
                      </span>
                    </h2>
                    <div className="selected-parentfirstSecond">
                      <div className="selected-firstBox">
                        <p className="owner">
                          {firstName} {lastName}
                        </p>
                        <p className="home">
                          {accommodation === true
                            ? "Accom. included"
                            : "Not included"}
                        </p>
                        <p className="aircraft">
                          {airtravel === true
                            ? "Flights included"
                            : `Flights not included`}
                        </p>
                        <p className="car">
                          {roadtravel === true
                            ? "Road travel included"
                            : "Road travel not included"}
                        </p>
                      </div>
                      <div className="selected-secondBox">
                        <p className="hospital">
                          {streetNo} {street} {suburb} {state} {postalCode}
                        </p>
                        <p className="email">{owner_email}</p>
                        <p className="phone">{owner_phone}</p>
                        <p className="pig">
                          AUD{" "}
                          {normal_rate
                            ? normal_rate
                            : sat_rate
                            ? sat_rate
                            : sun_rate
                            ? sun_rate
                            : "Negotiable"}{" "}
                          /hr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

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
            background-color: #f0eff5;
          }
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .backButton,
          .nextButton {
            margin-left: 6px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            outline: none;
            border: none;
            background-color: #fff;
            background-image: url(./../../Images/left.png);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 22px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            display: inline-block;
          }
          .nextButton {
            background-image: url(./../../Images/right.png);
          }

          .backButton:active,
          .backButton:focus,
          .nextButton:active,
          .nextButton:focus {
            outline: none;
          }

          #header {
            padding: 10px;
            color: #777;
            font-size: 26px;
            font-family: sans-serif;
            display: flex;
            justify-content: space-between;
            background-color: #fff;
          }
          #header button {
            background-color: #fff;
            border: 1px solid #777;
          }
          #container {
            width: 910px;
            background-color: #f4f5f6;
            border-radius: 8px;
            margin: 0 auto;
          }

          #weekdays {
            width: 100%;
            display: flex;
            text-align: center;
            color: #767676;
          }
          #weekdays div {
            width: 130px;
            padding: 10px;
          }
          #calendar {
            width: 100%;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
          }
          .day {
            width: 130px;
            padding: 0px;
            height: 100px;
            font-size: 14px;
            cursor: pointer;
            box-sizing: border-box;
            background-color: white;
            margin: 0px;
            box-shadow: 0px 0px 3px #cbd4c2;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid transparent;
          }

          .invisible {
            visibility: hidden;
          }

          .day + #currentDay {
            background-color: #e8f4fa;
          }
          .event {
            font-size: 10px;
            padding: 3px;
            background-color: #58bae4;
            color: white;
            border-radius: 5px;
            max-height: 55px;
            overflow: hidden;
          }
          .padding {
            background-color: #f4f5f6;
            color: black;
            opacity: 0.38;
          }

          .today {
            color: #e40000;
            font-weight: 800;
          }
          .inactive {
            background-color: #f4f5f6;
            color: black;
            opacity: 0.38;
            cursor: default;
          }

          .padding:hover,
          .inactive:hover {
            opacity: 0.38;
            cursor: not-allowed;
          }
          .worm {
            height: 33px;
            width: 105%;
            background-color: #14a248;
            position: relative;
            top: 0%;
            transform: translate(-3%, -35%);
            z-index: 2000;
          }

          .worm-head {
            height: 33px;
            width: 80%;
            background-color: #14a248;
            position: relative;
            top: 0%;
            transform: translate(29%, -35%);
            text-align: center;
          }
          .worm-head span {
            line-height: 33px;
            font-weight: 900;
            color: white;
          }

          .ball {
            height: 33px;
            width: 33px;
            background-color: #14a248;
            border-radius: 50%;
            position: absolute;
            left: -12%;
          }

          .ball .smallPhoto {
            display: inline-block;
            margin: 0px;
            width: 31px;
            height: 31px;
            left: 1px;
            top: 1px;
          }

          @media screen and (max-width: 768px) {
            #container {
              margin: 0 auto;
              width: 420px;
            }
            #calendar .day {
              width: 60px;
              height: 60px;
            }

            .worm-head {
              height: 23px;
              width: 85%;
              transform: translate(20%, -34%);
            }
            .worm-head span {
              line-height: 23px;
              font-size: 12px;
            }
            .ball {
              display: none;
            }

            .ball .smallPhoto {
              display: none;
            }
            .ball .smallPhoto img {
              display: none;
            }
          }

          /* ========= CANDIDATE BOX (RIGHT) ======== */
          .wrapper {
            display: block;
            animation: myframes 500ms ease-in-out 0ms;

            margin: 0 auto;
          }

          .wrapper .ads {
            height: 245px;
            width: 420px;
            border-radius: 4px;
            border: 1px solid #333;
            background-color: white;
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
            display: block;
            padding: 10px 10px 0px;
            margin: 25px auto 0px;
          }

          .wrapper .rightmessage {
            margin-left: 0px;
            cursor: default;
            height: 140px;
            position: relative;
            height: 100%;
          }

          .wrapper .ads .rightmessage {
            width: 100%;
          }

          .wrapper .rightmessage h2,
          .wrapper .rightmessage h2 a {
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 600;
            color: #2b2b2b;
            margin: 0px 0px 3px 0px;
          }

          .wrapper .ads .rightmessage p {
            margin: 9px 2px 0px;
            color: #777;
            padding-left: 25px;
            font-size: 14px;
            font-weight: 300;
            font-family: sans-serif;
            height: 30px;
            position: relative;
          }

          .bookdateBar {
            position: absolute;
            display: flex;
            justify-content: right;
            width: 90px;
            height: 100%;
            flex-direction: column;
            left: 84%;
          }

          .wrapper .rightmessage .withdraw {
            width: 80px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: absolute;
            left: 78%;
            top: 50%;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
          }

          .wrapper .rightmessage .bookdateBar .withdraw {
            width: 80px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 0%;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
          }

          .wrapper .rightmessage .withdraw:hover {
            color: white;
            background-color: #e40000;
            border: 1px solid #353f47;
          }

          .parentfirstSecond {
            display: flex;
            justify-content: space-between;
            width: 350px;
          }
          .selected-parentfirstSecond {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }

          .selected-parentfirstSecond .selected-firstBox {
            width: 285px;
          }
          .parentfirstSecond .secondBox {
            width: 165px;
          }
          .selected-parentfirstSecond .selected-secondBox {
            width: 340px;
          }

          .bookdateBar {
            position: absolute;
            display: flex;
            justify-content: right;
            width: 90px;
            height: 100%;
            flex-direction: column;
            left: 82%;
          }

          .no-applications {
            text-align: center;
            margin-top: 20px;
            padding: 0px auto;
          }
          .no-applications h2 {
            color: #333;
            font-weight: 800;
            margin: 0;
            font-size: 18px;
          }
          .can-do {
            font-size: 14px;
            margin-left: 8px;
          }
          .highlight {
            color: white;
            background: deeppink;
            border-radius: 4px;
            line-height: 24px;
            text-align: center;
            padding: 0px 3px;
            display: inline-block;
          }
          .rightmessage .seen {
            color: green;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-left: 10px;
            display: none;
          }

          .home {
            background-image: url(./../../images/housemarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .pig {
            background-image: url(./../../images/pigmarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .phone {
            background-image: url(./../../images/phone.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .aircraft {
            background-image: url(./../../Images/aircraft.png);
            background-repeat: no-repeat;
            background-position: -1px 0px;
            background-size: 20px;
          }
          .owner {
            background-image: url(./../../Images/boy.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .email {
            background-image: url(./../../Images/email.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .hospital {
            background-image: url(./../../Images/hospital.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .car {
            background-image: url(./../../Images/busmarker.png);
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 16px;
          }
          @keyframes myframes {
            from {
              opacity: 1;
              transform: translateY(-6%);
            }
            to {
              opacity: 1;
              transform: translateY(0%);
            }
          }

          @media only screen and (min-width: 768px) {
            .wrapper {
              grid-template-columns: 56% 44%;
              padding: 0px 50px 0px 25px;
            }
            .wrapper-ads .leftmessage {
              margin-left: 0px;
              width: 100%;
            }
            .wrapper .ads {
              height: 175px;
            }
            .container {
              text-align: left;
            }
            .parentfirstSecond {
              width: 420px;
            }
            .selected-parentfirstSecond {
              width: 100%;
            }

            .wrapper .ads .rightmessage p {
              margin: 9px 2px 0px;

              height: 22px;
            }

            .wrapper .rightmessage .withdraw {
              left: 82%;
            }

            .wrapper .rightmessage .bookdateBar .withdraw {
              left: 0%;
            }
            .wrapper .rightmessage h2,
            .wrapper .rightmessage h2 a {
              font-size: 18px;
            }

            .wrapper-ads .leftmessage h3 {
              font-size: 15px;
            }
            .wrapper .closed {
              font-size: 26px;
              fontweight: 700;
              height: 38px;
              line-height: 34px;
            }
            .wrapper .ads {
              width: 675px;
            }
            .wrapper .rightmessage .seen {
              display: inline;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Calendar;
