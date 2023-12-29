import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import en from "date-fns/locale/en-AU";
import ReactGA from "react-ga4";

const Question3 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  const [customerId, setCustomerId] = useState("");
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

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setCustomerId(ReactSession.get("customerId"));
    if (localStorage.getItem("contractType")) {
      ReactSession.set("contractType", localStorage.getItem("contractType"));
    }
    if (localStorage.getItem("professions")) {
      ReactSession.set("professions", localStorage.getItem("professions"));
    }

    if (!ReactSession.get("startDate")) {
      setStartDate("");
    } else {
      const storedStartDate = ReactSession.get("startDate");

      const dag = storedStartDate.split(" ")[0];
      const mth = storedStartDate.split(" ")[1];
      const year = storedStartDate.split(" ")[2];
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
      const month = months.indexOf(mth);
      setStartDate(new Date(year, month, dag));
    }

    if (!ReactSession.get("finishDate")) {
      setFinishDate("");
    } else {
      setFinishDate(ReactSession.get("finishDate"));
    }

    if (!ReactSession.get("monday")) {
      setMonday(false);
    } else {
      setMonday(ReactSession.get("monday"));
    }

    if (!ReactSession.get("tuesday")) {
      setTuesday(false);
    } else {
      setTuesday(ReactSession.get("tuesday"));
    }

    if (!ReactSession.get("wednesday")) {
      setWednesday(false);
    } else {
      setWednesday(ReactSession.get("wednesday"));
    }

    if (!ReactSession.get("thursday")) {
      setThursday(false);
    } else {
      setThursday(ReactSession.get("thursday"));
    }

    if (!ReactSession.get("friday")) {
      setFriday(false);
    } else {
      setFriday(ReactSession.get("friday"));
    }

    if (!ReactSession.get("saturday")) {
      setSaturday(false);
    } else {
      setSaturday(ReactSession.get("saturday"));
    }

    if (!ReactSession.get("sunday")) {
      setSunday(false);
    } else {
      setSunday(ReactSession.get("sunday"));
    }

    if (!ReactSession.get("monStart")) {
      setMonStart("");
    } else {
      setMonStart(ReactSession.get("monStart"));
    }
    if (!ReactSession.get("tueStart")) {
      setTueStart("");
    } else {
      setTueStart(ReactSession.get("tueStart"));
    }
    if (!ReactSession.get("wedStart")) {
      setWedStart("");
    } else {
      setWedStart(ReactSession.get("wedStart"));
    }

    if (!ReactSession.get("thuStart")) {
      setThuStart("");
    } else {
      setThuStart(ReactSession.get("thuStart"));
    }

    if (!ReactSession.get("friStart")) {
      setFriStart("");
    } else {
      setFriStart(ReactSession.get("friStart"));
    }

    if (!ReactSession.get("satStart")) {
      setSatStart("");
    } else {
      setSatStart(ReactSession.get("satStart"));
    }
    if (!ReactSession.get("sunStart")) {
      setSunStart("");
    } else {
      setSunStart(ReactSession.get("sunStart"));
    }

    if (!ReactSession.get("monFinish")) {
      setMonFinish("");
    } else {
      setMonFinish(ReactSession.get("monFinish"));
    }

    if (!ReactSession.get("tueFinish")) {
      setTueFinish("");
    } else {
      setTueFinish(ReactSession.get("tueFinish"));
    }

    if (!ReactSession.get("wedFinish")) {
      setWedFinish("");
    } else {
      setWedFinish(ReactSession.get("wedFinish"));
    }
    if (!ReactSession.get("thuFinish")) {
      setThuFinish("");
    } else {
      setThuFinish(ReactSession.get("thuFinish"));
    }

    if (!ReactSession.get("friFinish")) {
      setFriFinish("");
    } else {
      setFriFinish(ReactSession.get("friFinish"));
    }

    if (!ReactSession.get("satFinish")) {
      setSatFinish("");
    } else {
      setSatFinish(ReactSession.get("satFinish"));
    }

    if (!ReactSession.get("sunFinish")) {
      setSunFinish("");
    } else {
      setSunFinish(ReactSession.get("sunFinish"));
    }

    if (!ReactSession.get("monHr")) {
      setMonHr("");
    } else {
      setMonHr(ReactSession.get("monHr"));
    }
    if (!ReactSession.get("tueHr")) {
      setTueHr("");
    } else {
      setTueHr(ReactSession.get("tueHr"));
    }
    if (!ReactSession.get("wedHr")) {
      setWedHr("");
    } else {
      setWedHr(ReactSession.get("wedHr"));
    }

    if (!ReactSession.get("thuHr")) {
      setThuHr("");
    } else {
      setThuHr(ReactSession.get("thuHr"));
    }
    if (!ReactSession.get("friHr")) {
      setFriHr("");
    } else {
      setFriHr(ReactSession.get("friHr"));
    }
    if (!ReactSession.get("satHr")) {
      setSatHr("");
    } else {
      setSatHr(ReactSession.get("satHr"));
    }
    if (!ReactSession.get("sunHr")) {
      setSunHr("");
    } else {
      setSunHr(ReactSession.get("sunHr"));
    }

    if (!ReactSession.get("selectedStartDay")) {
      setSelectedDay(today);
    } else {
      const storedStartDate = ReactSession.get("startDate");

      const dag = storedStartDate.split(" ")[0];
      const mth = storedStartDate.split(" ")[1];
      const year = storedStartDate.split(" ")[2];
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

      const month = months.indexOf(mth);

      setSelectedDay(new Date(year, month, dag));
    }

    if (!ReactSession.get("selectedFinishDay")) {
      setSelectedFinishDay("");
    } else {
      const storedFinishDate = ReactSession.get("finishDate");

      const dag = storedFinishDate.split(" ")[0];
      const mth = storedFinishDate.split(" ")[1];

      const year = storedFinishDate.split(" ")[2];
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

      const month = months.indexOf(mth);

      setSelectedFinishDay(new Date(year, month, dag));
    }
  }, []);

  const [times] = useState([
    { title: "06:00", id: 1 },
    { title: "06:15", id: 2 },
    { title: "06:30", id: 3 },
    { title: "06:45", id: 4 },
    { title: "07:00", id: 5 },
    { title: "07:15", id: 6 },
    { title: "07:30", id: 7 },
    { title: "07:45", id: 8 },
    { title: "08:00", id: 9 },
    { title: "08:15", id: 10 },
    { title: "08:30", id: 11 },
    { title: "08:45", id: 12 },
    { title: "09:00", id: 13 },
    { title: "09:15", id: 14 },
    { title: "09:30", id: 15 },
    { title: "09:45", id: 16 },
    { title: "10:00", id: 17 },
    { title: "10:15", id: 18 },
    { title: "10:30", id: 19 },
    { title: "10:45", id: 20 },
    { title: "11:00", id: 21 },
    { title: "11:15", id: 22 },
    { title: "11:30", id: 23 },
    { title: "11:45", id: 24 },
    { title: "12:00", id: 25 },
    { title: "12:15", id: 26 },
    { title: "12:30", id: 27 },
    { title: "12:45", id: 28 },
    { title: "13:00", id: 29 },
    { title: "13:15", id: 30 },
    { title: "13:30", id: 31 },
    { title: "13:45", id: 32 },
    { title: "14:00", id: 33 },
    { title: "14:15", id: 34 },
    { title: "14:30", id: 35 },
    { title: "14:45", id: 36 },
    { title: "15:00", id: 37 },
    { title: "15:15", id: 38 },
    { title: "15:30", id: 39 },
    { title: "15:45", id: 40 },
    { title: "16:00", id: 41 },
    { title: "16:15", id: 42 },
    { title: "16:30", id: 43 },
    { title: "16:45", id: 44 },
    { title: "17:00", id: 45 },
    { title: "17:15", id: 46 },
    { title: "17:30", id: 47 },
    { title: "17:45", id: 48 },
    { title: "18:00", id: 49 },
    { title: "18:15", id: 50 },
    { title: "18:30", id: 51 },
    { title: "18:45", id: 52 },
    { title: "19:00", id: 53 },
    { title: "19:15", id: 54 },
    { title: "19:30", id: 55 },
    { title: "19:45", id: 56 },
    { title: "20:00", id: 57 },
    { title: "20:15", id: 58 },
    { title: "20:30", id: 59 },
    { title: "20:45", id: 60 },
    { title: "21:00", id: 61 },
    { title: "21:15", id: 62 },
    { title: "21:30", id: 63 },
    { title: "21:45", id: 64 },
    { title: "22:00", id: 65 },
    { title: "22:15", id: 66 },
    { title: "22:30", id: 67 },
    { title: "22:45", id: 68 },
    { title: "23:00", id: 69 },
    { title: "23:15", id: 70 },
    { title: "23:30", id: 71 },
    { title: "23:45", id: 72 },
    { title: "Times Variable", id: 73 },
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("monday", monday);
    ReactSession.set("tuesday", tuesday);
    ReactSession.set("wednesday", wednesday);
    ReactSession.set("thursday", thursday);
    ReactSession.set("friday", friday);
    ReactSession.set("saturday", saturday);
    ReactSession.set("sunday", sunday);
    ReactSession.set("monStart", monStart);
    ReactSession.set("tueStart", tueStart);
    ReactSession.set("wedStart", wedStart);
    ReactSession.set("thuStart", thuStart);
    ReactSession.set("friStart", friStart);
    ReactSession.set("satStart", satStart);
    ReactSession.set("sunStart", sunStart);
    ReactSession.set("monFinish", monFinish);
    ReactSession.set("tueFinish", tueFinish);
    ReactSession.set("wedFinish", wedFinish);
    ReactSession.set("thuFinish", thuFinish);
    ReactSession.set("friFinish", friFinish);
    ReactSession.set("satFinish", satFinish);
    ReactSession.set("sunFinish", sunFinish);
    ReactSession.set("monHr", monHr);
    ReactSession.set("tueHr", tueHr);
    ReactSession.set("wedHr", wedHr);
    ReactSession.set("thuHr", thuHr);
    ReactSession.set("friHr", friHr);
    ReactSession.set("satHr", satHr);
    ReactSession.set("sunHr", sunHr);
    ReactSession.set(
      "startDate",
      `${selectedDay.getDate()} ${
        months[selectedDay.getMonth()]
      } ${selectedDay.getFullYear()}`
    );

    ReactSession.set(
      "finishDate",
      `${selectedFinishDay.getDate()} ${
        months[selectedFinishDay.getMonth()]
      } ${selectedFinishDay.getFullYear()}`
    );

    ReactSession.set("expiryDate", `${selectedFinishDay}`);

    ReactSession.set(
      "selectedStartDay",
      `${selectedDay.getDate()} ${
        months[selectedDay.getMonth()]
      } ${selectedDay.getFullYear()}`
    );

    ReactSession.set(
      "selectedFinishDay",
      `${selectedFinishDay.getDate()} ${
        months[selectedFinishDay.getMonth()]
      } ${selectedFinishDay.getFullYear()}`
    );
    ReactGA.event({
      category: "Post Locum Ad",
      action: "Question 3",
    });
    navigate("/question4");
  };

  // ============ CALENDAR ================
  const [, setFinishDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const [showCalendarStart, setShowCalendarStart] = useState(false);
  const [showCalendarFinish, setShowCalendarFinish] = useState(false);
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

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

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesTimes(day) {
    setAlert(true);
    window.scrollTo({
      top: 110,
      behavior: "smooth",
    });
    const errorMessage = `Finish Time on ${day} cannot be earlier than the Start Time. Please correct the error.`;
    setAlertMsg(errorMessage);
  }

  // ========= HOURS OF WORK CALCULATIONS ===========
  const [monHr, setMonHr] = useState("");

  const handleCalcMon = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = parseInt(monStart.split(":")[0]);

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = monStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }

    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Monday");
      setMonFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Monday");
      setMonFinish("");
    } else {
      setAlert(false);
    }
    setMonHr(hr + min);
  };

  const [tueHr, setTueHr] = useState("");

  const handleCalcTue = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = tueStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = tueStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }

    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Tuesday");
      setTueFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Tuesday");
      setTueFinish("");
    } else {
      setAlert(false);
    }
    setTueHr(hr + min);
  };

  const [wedHr, setWedHr] = useState("");

  const handleCalcWed = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = wedStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = wedStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Wednesday");
      setWedFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Wednesday");
      setWedFinish("");
    } else {
      setAlert(false);
    }
    setWedHr(hr + min);
  };

  const [thuHr, setThuHr] = useState("");

  const handleCalcThu = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = thuStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = thuStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Thursday");
      setThuFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Thursday");
      setThuFinish("");
    } else {
      setAlert(false);
    }
    setThuHr(hr + min);
  };

  const [friHr, setFriHr] = useState("");

  const handleCalcFri = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = friStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = friStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Friday");
      setFriFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Friday");
      setFriFinish("");
    } else {
      setAlert(false);
    }
    setFriHr(hr + min);
  };

  const [satHr, setSatHr] = useState("");

  const handleCalcSat = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = satStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = satStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Saturday");
      setSatFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Saturday");
      setSatFinish("");
    } else {
      setAlert(false);
    }
    setSatHr(hr + min);
  };

  const [sunHr, setSunHr] = useState("");

  const handleCalcSun = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = sunStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = sunStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Sunday");
      setSunFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Sunday");
      setSunFinish("");
    } else {
      setAlert(false);
    }
    setSunHr(hr + min);
  };

  // ============= CLEAR CUSTOMER ID ================
  const clearId = () => {
    sessionStorage.clear();
    navigate("/admin/users");
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Schedule | MedClicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div className="wrap">
          <form id="formEight" onSubmit={onSubmit}>
            <section className="questionCard container">
              <figure>
                <Link to={customerId ? "/admin/users" : "/dashboard"}>
                  <img
                    src="/images/medclicker.png"
                    alt="LOGO"
                    className="img-fluid"
                    onClick={customerId ? clearId : "#"}
                  />
                </Link>
              </figure>
              <h2>Start and Finish Dates</h2>

              <div className="btnGroup">
                <div className="selectdate">
                  <div className="contain">
                    <div className="day_picker">
                      <label htmlFor="demo-3_1">Start Date</label>
                      <input
                        className="calstart"
                        type="text"
                        readOnly
                        autoComplete="off"
                        placeholder="Start Date"
                        id="demo-3_1"
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
                          fromDate={today}
                          toDate={
                            new Date(
                              today.getFullYear(),
                              today.getMonth() + 12,
                              today.getDate()
                            )
                          }
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
                      <label htmlFor="demo-3_2">Finish Date</label>

                      <input
                        className="calfinish"
                        type="text"
                        readOnly
                        autoComplete="off"
                        placeholder="Finish Date
"
                        id="demo-3_2"
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
                          toDate={
                            new Date(
                              today.getFullYear(),
                              today.getMonth() + 12,
                              today.getDate() + 1
                            )
                          }
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
                </div>
                <div id="timetable">
                  <h2 className="intitule">
                    Working Hours (Not Opening Hours)
                  </h2>
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
                  <div
                    className="row"
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div className="col-xs-4">
                      <div className="day_flex">
                        <input
                          id="mon"
                          checked={monday ? true : false}
                          onChange={(e) => {
                            setMonday(e.target.checked);
                            setMonStart("");
                            setMonFinish("");
                            setMonHr("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="mon">Monday</label>

                        <input
                          id="tue"
                          checked={tuesday ? true : false}
                          onChange={(e) => {
                            setTuesday(e.target.checked);
                            setTueStart("");
                            setTueFinish("");
                            setTueHr("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="tue">Tuesday</label>

                        <input
                          id="wed"
                          checked={wednesday ? true : false}
                          onChange={(e) => {
                            setWednesday(e.target.checked);
                            setWedStart("");
                            setWedFinish("");
                            setWedHr("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="wed">Wednesday</label>

                        <input
                          id="thu"
                          checked={thursday ? true : false}
                          onChange={(e) => {
                            setThursday(e.target.checked);
                            setThuStart("");
                            setThuFinish("");
                            setThuHr("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="thu">Thursday</label>

                        <input
                          id="fri"
                          checked={friday ? true : false}
                          onChange={(e) => {
                            setFriday(e.target.checked);
                            setFriStart("");
                            setFriFinish("");
                            setFriHr("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="fri">Friday</label>

                        <input
                          id="sat"
                          checked={saturday ? true : false}
                          onChange={(e) => {
                            setSaturday(e.target.checked);
                            setSatStart("");
                            setSatFinish("");
                            setSatHr("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="sat">Saturday</label>

                        <input
                          id="sun"
                          checked={sunday ? true : false}
                          onChange={(e) => {
                            setSunday(e.target.checked);
                            setSunStart("");
                            setSunFinish("");
                            setSunHr("");
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="sun">Sunday</label>
                      </div>
                    </div>

                    <div className="col-xs-4">
                      <div className="time_flex">
                        <p className="clock">Start Time</p>

                        {monday ? (
                          <select
                            className="form-control"
                            value={monStart}
                            onChange={(e) => {
                              setMonStart(e.target.value);
                            }}
                            onFocus={() => {
                              setMonFinish("");
                            }}
                          >
                            <option>{monStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}

                        {tuesday ? (
                          <select
                            className="form-control"
                            value={tueStart}
                            onChange={(e) => {
                              setTueStart(e.target.value);
                            }}
                            onFocus={() => {
                              setTueFinish("");
                            }}
                          >
                            <option>{tueStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}

                        {wednesday ? (
                          <select
                            className="form-control"
                            value={wedStart}
                            onChange={(e) => {
                              setWedStart(e.target.value);
                            }}
                            onFocus={() => {
                              setWedFinish("");
                            }}
                          >
                            <option>{wedStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                        {thursday ? (
                          <select
                            value={thuStart}
                            onChange={(e) => {
                              setThuStart(e.target.value);
                            }}
                            onFocus={() => {
                              setThuFinish("");
                            }}
                            className="form-control"
                          >
                            <option>{thuStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                        {friday ? (
                          <select
                            value={friStart}
                            onChange={(e) => {
                              setFriStart(e.target.value);
                            }}
                            onFocus={() => {
                              setFriFinish("");
                            }}
                            className="form-control"
                          >
                            <option>{friStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}

                        {saturday ? (
                          <select
                            value={satStart}
                            onChange={(e) => {
                              setSatStart(e.target.value);
                            }}
                            onFocus={() => {
                              setSatFinish("");
                            }}
                            className="form-control"
                          >
                            <option>{satStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}

                        {sunday ? (
                          <select
                            value={sunStart}
                            onChange={(e) => {
                              setSunStart(e.target.value);
                            }}
                            onFocus={() => {
                              setSunFinish("");
                            }}
                            className="form-control"
                          >
                            <option>{sunStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                      </div>
                    </div>
                    <div className="col-xs-4">
                      <div className="time_flex">
                        <p className="coffee">Finish Time</p>

                        {monStart !== "" ? (
                          <select
                            value={monFinish}
                            onChange={(e) => {
                              setMonFinish(e.target.value);
                              handleCalcMon(e);
                            }}
                            className="form-control"
                          >
                            <option>{monFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                        {tueStart !== "" ? (
                          <select
                            value={tueFinish}
                            onChange={(e) => {
                              setTueFinish(e.target.value);
                              handleCalcTue(e);
                            }}
                            className="form-control"
                          >
                            <option>{tueFinish}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}

                        {wedStart !== "" ? (
                          <select
                            value={wedFinish}
                            onChange={(e) => {
                              setWedFinish(e.target.value);
                              handleCalcWed(e);
                            }}
                            className="form-control"
                          >
                            <option>{wedFinish}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                        {thuStart !== "" ? (
                          <select
                            value={thuFinish}
                            onChange={(e) => {
                              setThuFinish(e.target.value);
                              handleCalcThu(e);
                            }}
                            className="form-control"
                          >
                            <option>{thuFinish}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}

                        {friStart !== "" ? (
                          <select
                            value={friFinish}
                            onChange={(e) => {
                              setFriFinish(e.target.value);
                              handleCalcFri(e);
                            }}
                            className="form-control"
                          >
                            <option>{friFinish}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                        {satStart !== "" ? (
                          <select
                            value={satFinish}
                            onChange={(e) => {
                              setSatFinish(e.target.value);
                              handleCalcSat(e);
                            }}
                            className="form-control"
                          >
                            <option>{satFinish}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                        {sunStart !== "" ? (
                          <select
                            value={sunFinish}
                            onChange={(e) => {
                              setSunFinish(e.target.value);
                              handleCalcSun(e);
                            }}
                            className="form-control"
                          >
                            <option>{sunFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-control"></select>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bottomBtn">
                    <button className="btn-previous">
                      <Link to="/question2">Previous</Link>
                    </button>
                    {monFinish ||
                    tueFinish ||
                    wedFinish ||
                    thuFinish ||
                    friFinish ||
                    satFinish ||
                    sunFinish ? (
                      selectedFinishDay !== "" ? (
                        monday && monFinish === "" ? (
                          <button disabled className="btn-next">
                            Next
                          </button>
                        ) : tuesday && tueFinish === "" ? (
                          <button disabled className="btn-next">
                            Next
                          </button>
                        ) : wednesday && wedFinish === "" ? (
                          <button disabled className="btn-next">
                            Next
                          </button>
                        ) : thursday && thuFinish === "" ? (
                          <button disabled className="btn-next">
                            Next
                          </button>
                        ) : friday && friFinish === "" ? (
                          <button disabled className="btn-next">
                            Next
                          </button>
                        ) : saturday && satFinish === "" ? (
                          <button disabled className="btn-next">
                            Next
                          </button>
                        ) : sunday && sunFinish === "" ? (
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
                      )
                    ) : (
                      <button disabled className="btn-next">
                        Next
                      </button>
                    )}
                  </div>
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
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }

          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
          }

          .wrap .btn-next:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }
          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }
          .wrap .questionCard > figure > a {
            display: block;
            text-decoration: none;
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
          #timetable h2 {
            margin-top: 24px;
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
            text-decoration: none;
          }
          .wrap .questionCard .btnGroup > button:active {
            background: #14a248;
            color: #fff;
          }
          .wrap .questionCard .btnGroup > button > a:hover {
            color: #fff;
            text-decoration: none;
          }

          .selectdate {
            width: 100%;
            height: 240px;
            padding: 0px 20px;
            background-color: #2b2b2b;
            position: relative;
          }

          .contain {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            position: relative;
            width: 100%;
            top: 20%;
          }

          .contain label {
            color: white;
            position: relative;
            font-weight: 500;
            font-size: 14px;
            left: 0px;
          }

          input[type="text"] {
            outline: none;
            padding: 5px 5px 5px 5px;
            height: 45px;
            width: 100%;
            color: #2b2b2b;
            font-size: 12px;
            margin-right: 5px;
            display: block;
            margin-bottom: 15px;
          }
          input[type="text"]:active,
          input[type="text"]:focus {
            outline: 3px solid #14a248;
          }

          .calcontainer-start {
            background-color: #f4f5f6;
            display: none;
            position: absolute;
            height: 560px;
            width: 290px;
            transform: translateY(22%);
          }
          .calcontainer-finish {
            background-color: #f4f5f6;
            display: none;
            position: absolute;
            height: 560px;
            width: 290px;
            transform: translateY(36%);
          }

          .calstart {
            background-image: url("./../../images/calendarblack.png");
            background-repeat: no-repeat;
            background-position: 330px;
            background-size: 18px;
          }
          .calstart:hover {
            background-image: url("./../../images/calendar.png");
            background-repeat: no-repeat;
            background-position: 330px;
            background-size: 18px;
          }
          .calfinish {
            background-image: url("./../../images/calendarblack.png");
            background-repeat: no-repeat;
            background-position: 330px;
            background-size: 18px;
          }
          .calfinish:hover {
            background-image: url("./../../images/calendar.png");
            background-repeat: no-repeat;
            background-position: 330px;
            background-size: 18px;
          }

          .time_flex p {
            margin-left: 6px;
            background-color: #2b2b2b;
            color: white;
            height: 30px;
            line-height: 30px;
            text-align: center;
            width: 75px;
            font-size: 10px;
          }

          .intitule h2 {
            font-family: sans-serif;
            font-size: 20px;
            font-weight: 100;
            width: 100%;
            height: 50px;
            line-height: 50px;
          }
          .time_flex .form-control {
            margin: 23px 5px;
            display: block;
            width: 75px;
            height: 28px;
            padding: 6px 12px;
            font-size: 10px;
            color: #2b2b2b;
            border-radius: 0px;
          }

          .day_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 33px 0px 1px 0px;
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
            opacity: 0;
            float: left;
          }
          input[type="checkbox"] + label {
            position: relative;
            cursor: pointer;
            font-size: 13px;
            font-family: sans-serif;
            font-weight: 500;
            margin: 13px 0px 2px 50px;
            width: 180px;
            display: block;
            color: #2b2b2b;
          }
          input[type="checkbox"] + label::before {
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
          input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -60px;
            top: 13px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("./../../images/check.png");
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
          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

          /* ============== CALENDAR =============== */

          .selectdate .day_picker .rdp {
            position: absolute;
            z-index: 2000;
          }
          .selectdate .day_picker .rdp-month {
            background-color: white;
            padding: 10px 15px;
            border: 1px solid black;
          }
          .selectdate .day_picker .rdp-day.rdp-day_selected {
            background-color: #14a248;
            color: white;
          }

          .selectdate .day_picker .rdp-day {
            height: 40px;
            width: 40px;
            border-radius: 0%;
          }
          .selectdate .day_picker .rdp-day:hover {
            background-color: #14a248;
            color: white;
          }

          .selectdate .day_picker .rdp-day_outside {
            opacity: 0.25;
          }

          .selectdate .day_picker .rdp-day_outside:hover {
            opacity: 1;
            background-color: #14a248;
            color: white;
          }

          .rdp-button[disabled]:not(.rdp-day_selected):hover {
            color: #212529;
            opacity: 0.25;
            background-color: transparent;
          }

          .selectdate .day_picker .rdp-button_reset {
            color: #212529;
            font-size: 16px;
          }

          .selectdate button {
            outline: none;
            border: none;
            cursor: pointer;
          }

          /* ========= PREVIOUS AND NEXT BUTTONS =============*/
          .wrap .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            margin-top: 30px;
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

          .wrap .btn-previous a:hover {
            text-decoration: none;
          }

          input[type="submit"]:active,
          input[type="submit"]:focus {
            padding: 12px 20px;
            height: 50px;
            background: #fff;
            color: #2b2b2b;
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
            .calfinish:hover {
              background-position: 165px;
            }
            .calfinish {
              background-position: 165px;
            }
            .calstart {
              background-position: 165px;
            }
            .calstart:hover {
              background-position: 165px;
            }
            .selectdate {
              max-width: 900px;
              height: 140px;
              margin: 0 auto;
              width: 100%;
            }
            .wrap .questionCard {
              width: 1040px;
              padding: 30px 20px;
            }
            input[type="text"] {
              padding: 10px 10px 10px 18px;
              margin-bottom: 0px;
              width: 200px;
              display: inline;
              font-size: 16px;
              margin-right: 25px;
              left: 50%;
            }
            .intitule {
              font-size: 25px;
              margin-top: 25px;
              width: 100%;
              visibility: visible;
            }
            .wrap .questionCard h2 {
              margin-top: 24px;
            }
            input[type="checkbox"] + label::after {
              display: block;
              background-size: contain;
              left: -53px;
              top: 32px;
            }
            input[type="checkbox"] + label::before {
              display: block;
              width: 34px;
              height: 34px;
              top: 30px;
            }
            input[type="checkbox"] + label {
              font-size: 17px;
              float: left;
              margin: 1px 7px 0px;
              height: 57px;
            }
            .day_flex {
              margin: 30px 33px;
              margin-left: 6px;
              height: 30px;
              line-height: 30px;
              text-align: left;
              width: 90px;
              font-size: 10px;
              color: white;
            }

            .time_flex .form-control {
              margin: 33px 18px;
              display: block;
              width: 150px;
              height: 38px;
              font-size: 14px;
            }
            .time_flex p {
              margin-left: 18px;
              height: 38px;
              line-height: 38px;
              width: 150px;
              font-size: 14px;
            }

            .clock {
              background-image: url("./../../images/white-clock.png");
              background-position: 12px;
              background-size: 17px;
              background-repeat: no-repeat;
            }
            .coffee {
              background-image: url("./../../images/coffee_cup.png");
              background-position: 12px;
              background-size: 19px;
              background-repeat: no-repeat;
            }
            .wrap .questionCard h3 {
              font-size: 20px;
            }
            .contain label {
              transform: translate(100%, -160%);
            }
            .contain {
              justify-content: center;
              flex-direction: inherit;
              top: 35%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question3;
