import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import en from "date-fns/locale/zh-TW";
import { useSelector } from "react-redux";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const Alistings = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [noOfCases, setNoOfCases] = useState([]);
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/locumsonly?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&location=" +
        location +
        "&isActiveJob=" +
        checkedPay +
        "&isDeletedJob=" +
        checkedExpired +
        "&startDate=" +
        startDate +
        "&finishDate=" +
        selectedFinishDay
    );

    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListings(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/locumsonly?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&location=" +
        location +
        "&isActiveJob=" +
        checkedPay +
        "&isDeletedJob=" +
        checkedExpired +
        "&startDate=" +
        startDate +
        "&finishDate=" +
        selectedFinishDay
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListings(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // ========= PAGE INTERMEDIATE BUTTONS ==========
  const circles = [];

  for (let v = 0; v < maxPage; v++) {
    circles.push(v);
  }

  const IntermediateButtons = async (id) => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/locumsonly?page=${id + 1}` +
        "&location=" +
        location +
        "&sortBy=" +
        sort +
        "&isActiveJob=" +
        checkedPay +
        "&isDeletedJob=" +
        checkedExpired +
        "&startDate=" +
        startDate +
        "&finishDate=" +
        selectedFinishDay
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListings(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);
  const [, setReload] = useState(false);

  // =============== SORT BY ================
  const sortCases = async (e, ascDesc) => {
    const name = e.target.innerHTML;

    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `api/admin/sortlocumcase?sortBy=asc` +
          "&location=" +
          location +
          "&isActiveJob=" +
          checkedPay +
          "&isDeletedJob=" +
          checkedExpired +
          "&page=" +
          page +
          "&name=" +
          name +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setNoOfCases(data.num);
      setListings(data.adPosts);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `api/admin/sortlocumcase?sortBy=desc` +
          "&location=" +
          location +
          "&isActiveJob=" +
          checkedPay +
          "&isDeletedJob=" +
          checkedExpired +
          "&page=" +
          page +
          "&name=" +
          name +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setNoOfCases(data.num);
      setListings(data.adPosts);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

  // ========= SELECT EXCLUSION  ===============

  const [checkedPay, setCheckedPay] = useState(false);
  const [checkedExpired, setCheckedExpired] = useState(true);

  // ============== SELECT LOCATIONS ===============
  const [location, setLocation] = useState([]);
  const [checkedACT, setCheckedACT] = useState(false);
  const [checkedNSW, setCheckedNSW] = useState(false);
  const [checkedNT, setCheckedNT] = useState(false);
  const [checkedQLD, setCheckedQLD] = useState(false);
  const [checkedVIC, setCheckedVIC] = useState(false);
  const [checkedWA, setCheckedWA] = useState(false);
  const [checkedSA, setCheckedSA] = useState(false);
  const [checkedTAS, setCheckedTAS] = useState(false);

  // ========== REMOVE STATE LOCATION ===========
  const onRemoveLocation = async (event) => {
    const { value } = event.target;
    const index = location.indexOf(value);
    if (index !== -1) {
      location.splice(index, 1);
    }
    setLocation([...location]);
  };

  // ========= ADD STATE LOCATION ===========
  const onLocationChange = async (event) => {
    const { value } = event.target;
    setLocation([...location, value]);
  };

  // ========= CLEAR ALL IN FILTERCARD ===========
  const clearAll = async () => {
    setStartDate("");
    setSelectedFinishDay("");
    setFinishDate("");
    setCheckedACT(false);
    setCheckedNSW(false);
    setCheckedNT(false);
    setCheckedQLD(false);
    setCheckedSA(false);
    setCheckedVIC(false);
    setCheckedWA(false);
    setCheckedTAS(false);
    setLocation([]);
    setCheckedPay(false);
    setCheckedExpired(true);
  };

  // ============= GET USERS  ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/locumsonly?" +
          "location=" +
          location +
          "&isActiveJob=" +
          checkedPay +
          "&isDeletedJob=" +
          checkedExpired +
          "&sortBy=" +
          sort +
          "&page=" +
          page +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();

      if (isCancelled === false) {
        setReload(true);
        setNoOfCases(data.num);
        setListings(data.adPosts);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
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
  }, [location, checkedPay, checkedExpired]);
  //

  // ============ CALENDAR ================
  const [finishDate, setFinishDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const [showCalendarStart, setShowCalendarStart] = useState(false);
  const [showCalendarFinish, setShowCalendarFinish] = useState(false);
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedFinishDay, setSelectedFinishDay] = useState("");

  const selectionner = (selectedDay) => {
    setSelectedDay(selectedDay);
    setStartDate(selectedDay);
    setFinishDate("");
    setShowCalendarStart(false);
    setShowCalendarFinish(true);
  };

  const selectionnerFinit = (selectedFinishDay) => {
    setSelectedFinishDay(selectedFinishDay);
    setFinishDate(selectedFinishDay);
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

  // ============== BACKDROP ============== //
  const [backdrop, setBackdrop] = useState(false);

  // ============== PAUSE LISTING ============== //
  const activeAd = async (e, slug) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/locumSleepAd/${slug}/?sortBy=` +
        sort +
        "&location=" +
        location +
        "&page=" +
        page +
        "&isActiveJob=" +
        checkedPay +
        "&isDeletedJob=" +
        checkedExpired +
        "&startDate=" +
        startDate +
        "&finishDate=" +
        selectedFinishDay,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isActiveJob: false }),
      }
    );
    const data = await res.json();

    if (data) {
      setListings(data.listings);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  const sleepAd = async (e, slug) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/locumSleepAd/${slug}/?sortBy=` +
        sort +
        "&location=" +
        location +
        "&page=" +
        page +
        "&isActiveJob=" +
        checkedPay +
        "&isDeletedJob=" +
        checkedExpired +
        "&startDate=" +
        startDate +
        "&finishDate=" +
        selectedFinishDay,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isActiveJob: true }),
      }
    );
    const data = await res.json();

    if (data) {
      setListings(data.listings);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setBackdrop(true);
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/locumsonly?" +
          "location=" +
          location +
          "&sortBy=" +
          sort +
          "&page=" +
          page +
          "&isActiveJob=" +
          checkedPay +
          "&isDeletedJob=" +
          checkedExpired +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();

      setBackdrop(false);
      if (isCancelled === false) {
        setReload(true);
        setNoOfCases(data.num);
        setListings(data.adPosts);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
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
  };

  // ============ HIRED LOCUMS ===========

  const [hired, setHired] = useState([]);

  // Hired
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "api/admin/hired")
      .then((response) => {
        if (response.status === 200) {
          setHired(response.data.thisAd);
        }
      });
  }, []);

  // =========== CUSTOMISED CSV FILE ============
  const headers = [
    { label: "Case ID", key: "caseId" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Contract Type", key: "contractType" },
    { label: "Profession", key: "professions" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Paused", key: "isActiveJob" },
    { label: "Paid Locum", key: "isPaidLocum" },
    { label: "Deleted", key: "isDeletedJob" },
    { label: "Street No", key: "streetNo" },
    { label: "Street", key: "street" },
    { label: "Suburb", key: "suburb" },
    { label: "State", key: "state" },
    { label: "Country", key: "country" },
    { label: "Post Code", key: "postalCode" },
    { label: "Road Travel", key: "roadtravel" },
    { label: "Airport", key: "airport" },
    { label: "Flights", key: "airtravel" },
    { label: "Accommodation", key: "accommodation" },
    { label: "Start Date", key: "startDate" },
    { label: "Finish Date", key: "finishDate" },
    { label: "Rate", key: "normal_rate" },
    { label: "SAT Rate", key: "sat_rate" },
    { label: "SUN Rate", key: "sun_rate" },
    { label: "PH Rate", key: "ph_rate" },
    { label: "Monday", key: "monday" },
    { label: "Tuesday", key: "tuesday" },
    { label: "Wednesday", key: "wednesday" },
    { label: "Thursday", key: "thursday" },
    { label: "Friday", key: "friday" },
    { label: "Saturday", key: "saturday" },
    { label: "Sunday", key: "sunday" },
    { label: "Created At", key: "createdAt" },
    { label: "Updated At", key: "updatedAt" },
  ];

  const csvReport = {
    data: listings,
    headers: headers,
    filename: "Medclicker_Locums.csv",
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin Listings | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker Listings" />
        </Helmet>

        <nav>
          <div className="dashboard">
            <div className="logo"></div>

            <div className="profile-area">
              <div className="nav-box">
                <figure
                  className="smallPhoto"
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  <img src={user.filename} alt="" />
                </figure>
                {dropdown ? (
                  <div id="dropItem">
                    <div className="dropwrap">
                      <Link to="/admin/dashboard">
                        <h4>Admin Console</h4>
                      </Link>
                      <Link to="/homepage">
                        <h4>Content Management</h4>
                      </Link>
                      <Link to="/admin/users">
                        <h4>User Management</h4>
                      </Link>
                      <Link to="/admin/locums">
                        <h4>Locum Management</h4>
                      </Link>
                      <Link to="/admin/applications">
                        <h4>Application Management</h4>
                      </Link>
                      <Link to="/admin/agreements">
                        <h4>Locum Agreements Management</h4>
                      </Link>
                      <Link to="/admin/listings">
                        <h4>Listing Management (All)</h4>
                      </Link>
                      <Link to="/locumlistings">
                        <h4>Listing Management (Locum)</h4>
                      </Link>
                      <Link to="/admin/professions">
                        <h4>Profession Management</h4>
                      </Link>
                      <Link to="/admin/payconsole">
                        <h4>Payment Plans</h4>
                      </Link>
                      <Link to="/admin/payments">
                        <h4>Payment Management</h4>
                      </Link>
                      <Link to="/admin/security">
                        <h4>Change Password</h4>
                      </Link>
                      <Link to="/sms">
                        <h4>SMS</h4>
                      </Link>
                      <ExternalLink href="/signout" target="_self">
                        <h4>Log Out</h4>
                      </ExternalLink>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </nav>
        {backdrop ? (
          <div className="backdrop">
            <ThreeDots
              type="ThreeDots"
              height={40}
              width={80}
              color={"white"}
            />
          </div>
        ) : (
          ""
        )}
        <div className="wrap">
          <form onSubmit={onSubmit}>
            <div className="container-fuild">
              <div className="box box-primary">
                <div className="container-candidate">
                  <h2>Locum Listing Management</h2>
                </div>

                <div className="row">
                  <div className="col-xs-5">Date Listed</div>
                  <div className="col-xs-7 selectdate">
                    <div className="date-paid day_picker">
                      <label htmlFor="calstart"></label>
                      <input
                        className="calstart"
                        type="text"
                        readOnly
                        autoComplete="off"
                        placeholder="From"
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
                          toDate={today}
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

                      <label htmlFor="calfinish"></label>
                      <input
                        className="calfinish"
                        type="text"
                        readOnly
                        autoComplete="off"
                        placeholder="To"
                        id="demo-3_2"
                        value={
                          finishDate
                            ? `${finishDate.getDate()} ${
                                months[finishDate.getMonth()]
                              } ${finishDate.getFullYear()}`
                            : finishDate
                        }
                        onClick={() => {
                          setShowCalendarStart(false);
                          setShowCalendarFinish(!showCalendarFinish);
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
                          toDate={today}
                          onSelect={selectionnerFinit}
                          selected={finishDate}
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
                <div className="row">
                  {startDate && finishDate ? (
                    <input
                      type="submit"
                      className="btn-search"
                      value="Search"
                      readOnly
                    />
                  ) : (
                    <input
                      type="button"
                      disabled
                      className="btn-search"
                      value="Search"
                      readOnly
                    />
                  )}
                </div>

                <div className="row locationBox">
                  <div className="container-candidate">
                    <h2 style={{ margin: "0" }}>States & Territories</h2>
                  </div>
                  <div className="grid">
                    <div className="row">
                      <div className="states_flex">
                        <input
                          id="a"
                          type="checkbox"
                          checked={checkedACT ? true : false}
                          name="location"
                          onChange={(event) => {
                            !checkedACT
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedACT(!checkedACT);
                          }}
                          value="ACT"
                        />
                        <label htmlFor="a">Australian Capital Territory</label>
                        <input
                          name="location"
                          id="b"
                          checked={checkedNSW ? true : false}
                          type="checkbox"
                          onChange={(event) => {
                            !checkedNSW
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedNSW(!checkedNSW);
                          }}
                          value="NSW"
                        />
                        <label htmlFor="b">New South Wales</label>
                        <input
                          id="c"
                          type="checkbox"
                          checked={checkedNT ? true : false}
                          name="location"
                          onChange={(event) => {
                            !checkedNT
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedNT(!checkedNT);
                          }}
                          value="NT"
                        />
                        <label htmlFor="c">Northern Territory</label>
                      </div>
                    </div>
                  </div>

                  <div className="grid">
                    <div className="row">
                      <div className="states_flex">
                        <input
                          id="d"
                          type="checkbox"
                          name="location"
                          checked={checkedQLD ? true : false}
                          onChange={(event) => {
                            !checkedQLD
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedQLD(!checkedQLD);
                          }}
                          value="QLD"
                        />
                        <label htmlFor="d">Queensland</label>
                        <input
                          id="e"
                          type="checkbox"
                          name="location"
                          checked={checkedSA ? true : false}
                          onChange={(event) => {
                            !checkedSA
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedSA(!checkedSA);
                          }}
                          value="SA"
                        />
                        <label htmlFor="e">South Australia</label>
                        <input
                          id="f"
                          type="checkbox"
                          name="location"
                          checked={checkedTAS ? true : false}
                          onChange={(event) => {
                            !checkedTAS
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedTAS(!checkedTAS);
                          }}
                          value="TAS"
                        />
                        <label htmlFor="f">Tasmania</label>
                      </div>
                    </div>
                  </div>
                  <div className="grid">
                    <div className="row">
                      <div className="states_flex">
                        <input
                          id="g"
                          type="checkbox"
                          checked={checkedVIC ? true : false}
                          name="location"
                          onChange={(event) => {
                            !checkedVIC
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedVIC(!checkedVIC);
                          }}
                          value="VIC"
                        />
                        <label htmlFor="g">Victoria</label>
                        <input
                          id="h"
                          type="checkbox"
                          checked={checkedWA ? true : false}
                          name="location"
                          onChange={(event) => {
                            !checkedWA
                              ? onLocationChange(event)
                              : onRemoveLocation(event);
                          }}
                          onClick={() => {
                            setCheckedWA(!checkedWA);
                          }}
                          value="WA"
                        />
                        <label htmlFor="h">Western Australia</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row locationBox">
                  <div className="container-candidate">
                    <h2 style={{ margin: "0" }}>Exclusions</h2>
                  </div>
                  <div className="row">
                    <div className="contract_flex">
                      <input
                        id="paused"
                        type="checkbox"
                        name="exclusion"
                        checked={checkedPay ? true : false}
                        onChange={() => {
                          setCheckedPay(!checkedPay);
                        }}
                        onClick={() => {
                          setCheckedPay(!checkedPay);
                        }}
                        value="isActiveJob"
                      />
                      <label htmlFor="paused">Exclude Paused</label>
                    </div>
                    <div className="contract_flex">
                      <input
                        id="expired"
                        type="checkbox"
                        name="exclusion"
                        checked={checkedExpired ? false : true}
                        onChange={() => {
                          setCheckedExpired(!checkedExpired);
                        }}
                        onClick={() => {
                          setCheckedExpired(!checkedExpired);
                        }}
                        value="isDeletedJob"
                      />
                      <label htmlFor="expired">Exclude Expired</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <input
                    type="button"
                    className="btn-search"
                    defaultValue="Clear All"
                    onClick={clearAll}
                  />
                </div>
                <button>
                  <CSVLink {...csvReport}>Download</CSVLink>
                </button>
              </div>
            </div>
          </form>
          <form>
            <div className="container-members">
              <div className="box">
                <div className="container-candidate">
                  {noOfCases === 0 ? (
                    <h2>No Locum Cases</h2>
                  ) : noOfCases > 1 ? (
                    <h2>{noOfCases} Locum Cases</h2>
                  ) : (
                    <h2>{noOfCases} Locum Case</h2>
                  )}
                </div>
                <table>
                  <thead>
                    <tr>
                      <th
                        className="head caseId"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Case ID</div>
                      </th>

                      <th
                        className="head professions"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Professions</div>
                      </th>
                      <th
                        className="head cell-v rate"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Rate</div>
                      </th>
                      <th
                        className="head house"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Stay</div>
                      </th>
                      <th
                        className="head flight"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Flight</div>
                      </th>
                      <th
                        className="head road"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Road</div>
                      </th>
                      <th
                        className="head start"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Start Date</div>
                      </th>

                      <th
                        className="head finish"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Finish Date</div>
                      </th>

                      <th
                        className="head cell-v rest"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Live | Pause</div>
                      </th>
                      <th
                        className="head expired"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Status</div>
                      </th>

                      <th className="head locum">
                        <div>Locum Name</div>
                      </th>
                      <th
                        className="head createdAt"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortCases(e, ascDesc);
                        }}
                      >
                        <div>Date Listed</div>
                      </th>

                      <th className="head edit">
                        <div></div>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table>
                  <tbody>
                    {listings.map((list) => {
                      return (
                        <tr key={list._id}>
                          <td className="cell caseId">
                            <div>{list.caseId}</div>
                          </td>

                          <td className="cell professions">
                            <div>{list.professions}</div>
                          </td>
                          <td className="cell cell-v rate">
                            <div>AUD {list.normal_rate}</div>
                          </td>
                          <td className="cell  house">
                            <div>{list.accommodation ? "Yes" : "No"}</div>
                          </td>
                          <td className="cell  flight">
                            <div>{list.airtravel ? "Yes" : "No"}</div>
                          </td>
                          <td className="cell  road">
                            <div>{list.roadtravel ? "Yes" : "No"}</div>
                          </td>
                          <td className="cell start">
                            <div>{list.startDate}</div>
                          </td>
                          <td className="cell finish">
                            <div>{list.finishDate}</div>
                          </td>

                          <td className="cell cell-v rest">
                            <div>
                              {list.isDeletedJob === false ? (
                                list.isPaidLocum === false ? (
                                  list.isActiveJob ? (
                                    <div className="checkbox-btn">
                                      <input
                                        type="checkbox"
                                        checked={true}
                                        className="form-check-input"
                                        onClick={(e) => {
                                          activeAd(e, list.slug);
                                        }}
                                        onChange={(e) => {
                                          activeAd(e, list.slug);
                                        }}
                                      />
                                      <div>
                                        <span className="slidekey"></span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="checkbox-btn">
                                      <input
                                        type="checkbox"
                                        checked={false}
                                        className="form-check-input"
                                        onClick={(e) => {
                                          sleepAd(e, list.slug);
                                        }}
                                        onChange={(e) => {
                                          sleepAd(e, list.slug);
                                        }}
                                      />
                                      <div>
                                        <span className="slidekey"></span>
                                      </div>
                                    </div>
                                  )
                                ) : (
                                  <div className="checkbox-btn">
                                    <input
                                      style={{ cursor: "default" }}
                                      type="checkbox"
                                      checked={false}
                                      readOnly
                                      className="form-check-input"
                                    />
                                    <div>
                                      <span
                                        style={{ cursor: "default" }}
                                        className="slidekey"
                                      ></span>
                                    </div>
                                  </div>
                                )
                              ) : (
                                <div className="checkbox-btn">
                                  <input
                                    style={{ cursor: "default" }}
                                    type="checkbox"
                                    checked={false}
                                    readOnly
                                    className="form-check-input"
                                  />
                                  <div>
                                    <span
                                      style={{ cursor: "default" }}
                                      className="slidekey"
                                    ></span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="cell expired">
                            <div>
                              {list.isDeletedJob === false
                                ? list.isPaidLocum === true
                                  ? list.isActiveJob === true
                                    ? "Active"
                                    : "Progress"
                                  : "Active"
                                : list.isPaidLocum === true
                                ? "Expired"
                                : "No locum"}
                            </div>
                          </td>
                          <td className="cell locum">
                            <div>
                              {hired.map((appId) => {
                                return (
                                  appId.slugId === list.slug && (
                                    <span
                                      key={appId._id}
                                      style={{ fontWeight: "900" }}
                                    >
                                      {appId.firstName} {appId.lastName}
                                    </span>
                                  )
                                );
                              })}
                            </div>
                          </td>

                          <td className="cell createdAt">
                            <div>{list.todaysDate}</div>
                          </td>
                          <td className="cell edit">
                            <div>
                              <ExternalLink
                                href={
                                  process.env.REACT_APP_BACKEND_URL +
                                  `api/admin/listingedit/${list.slug}`
                                }
                                target="_self"
                              >
                                <input type="button" defaultValue="Edit" />
                              </ExternalLink>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          <div className="buttonSegment">
            <nav className="paginate">
              <ul>
                {maxPage >= 2 ? (
                  page > 1 ? (
                    <li
                      key={1}
                      className="previous"
                      onClick={pagePrevious}
                    ></li>
                  ) : (
                    <li
                      style={{ opacity: "0.2", cursor: "default" }}
                      className="previous"
                      key={2}
                    ></li>
                  )
                ) : (
                  <span></span>
                )}
                {circles.map((circle) => {
                  return (
                    <li
                      key={circle}
                      className={page === circle + 1 ? "active" : ""}
                      onClick={() => IntermediateButtons(circle)}
                    >
                      {circle + 1}
                    </li>
                  );
                })}

                {maxPage >= 2 ? (
                  page < maxPage ? (
                    <li key={1} className="next" onClick={pageNext}></li>
                  ) : (
                    <li
                      style={{ opacity: "0.2", cursor: "default" }}
                      className="next"
                      key={2}
                    ></li>
                  )
                ) : (
                  <span></span>
                )}
              </ul>
            </nav>
          </div>
        </div>

        <style jsx="true">{`
          body {
            background: linear-gradient(180deg, #006098, rgba(0, 96, 152, 0));
            background-color: #2ed9c3;
          }
          /* ============== NAV BAR ============= */

          nav {
            width: 100%;
            background-color: var(--color-white);
            padding: 1rem 0;
            height: 65px;
          }

          nav .dashboard {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 96%;
            margin: 0 auto;
          }

          nav img.logo {
            width: 10rem;
            display: block;
          }

          nav .logo.active {
            display: block;
          }

          nav .profile-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
          }

          nav .profile-area .theme-btn .active {
            background: var(--color-dark);
            border-radius: var(--border-radius-2);
            color: var(--color-white);
          }

          nav .profile-area .profile {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }

          .nav-box > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          .nav-box .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
          }
          .nav-box .smallPhoto img {
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

          .nav-box #dropItem {
            width: 280px;
            background: white;
            position: absolute;
            border: 1px solid #ebebeb;
            border-top: none;
            transform: translateX(-84%);
            display: block;
          }

          .nav-box #dropItem.open {
            display: block;
          }

          .nav-box .dropwrap {
            padding-bottom: 0px;
            width: 88%;
            background: var(--color-white);
            margin-top: 3%;
            margin-left: 6%;
          }

          .nav-box .dropwrap a {
            color: #777;
            font-weight: 500;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            height: 45px;
            line-height: 45px;
            width: 100%;
            position: relative;
            display: block;
          }

          .nav-box .dropwrap a h4 {
            margin-bottom: 0px;
            width: 100%;
            position: relative;
            display: block;
            height: 45px;
            line-height: 45px;
            font-size: 12px;
            font-weight: 500;
            color: rgb(119, 119, 119);
          }

          .nav-box .dropwrap a:hover {
            border-bottom: 1px solid #484848;
          }

          nav .profile-area .profile-photo {
            display: block;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
          }

          nav .profile-area button {
            display: none;
          }
          /* ============ CELLS ========== */
          td {
            height: 40px;
            text-align: left;
            font-size: 13px;
            font-weight: 900;
            color: white;
            font-family: sans-serif;
            white-space: nowrap;
          }
          th {
            padding-left: 10px;
            height: 40px;
            text-align: left;
            font-size: 13px;
            font-weight: 900;
            color: white;
            font-family: sans-serif;
            cursor: pointer;
            white-space: nowrap;
          }

          .head {
            padding: 0px;
          }
          .head div {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-weight: 900;
          }
          .cell {
            padding: 0px 0px 4px;
          }
          .cell div {
            background-color: rgba(35, 35, 35, 0.3);
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-weight: 900;

            position: relative;
            overflow: hidden;
          }
          .cell-v {
            background-color: rgba(35, 35, 35, 0.3);
            height: 100%;
          }
          thead .caseId div {
            width: 110px;
            padding-left: 10px;
          }
          tbody .caseId div {
            width: 110px;
            padding-left: 10px;
          }
          thead .caseId {
            width: 110px;
          }
          tbody .caseId {
            width: 110px;
          }

          tbody .professions div {
            width: 130px;
            padding-left: 10px;
          }
          thead .professions div {
            width: 130px;
            padding-left: 10px;
          }
          tbody .professions {
            width: 130px;
          }
          thead .professions {
            width: 130px;
          }
          thead .rate div {
            width: 75px;
            padding-left: 10px;
          }
          tbody .rate div {
            width: 75px;
            padding-left: 10px;
          }
          thead .rate {
            width: 75px;
          }
          tbody .rate {
            width: 75px;
          }

          thead .house div {
            width: 60px;
            padding-left: 10px;
          }
          tbody .house div {
            width: 60px;
            padding-left: 10px;
          }
          thead .house {
            width: 60px;
          }
          tbody .house {
            width: 60px;
          }
          thead .flight div {
            width: 60px;
            padding-left: 10px;
          }
          tbody .flight div {
            width: 60px;
            padding-left: 10px;
          }
          thead .flight {
            width: 60px;
          }
          tbody .flight {
            width: 60px;
          }
          thead .road div {
            width: 60px;
            padding-left: 10px;
          }
          tbody .road div {
            width: 60px;
            padding-left: 10px;
          }
          thead .road {
            width: 60px;
          }
          tbody .road {
            width: 65px;
          }

          thead .start div {
            width: 100px;
            padding-left: 10px;
          }
          tbody .start div {
            width: 100px;
            padding-left: 10px;
          }
          thead .start {
            width: 100px;
          }
          tbody .start {
            width: 100px;
          }

          thead .finish div {
            width: 100px;
            padding-left: 10px;
          }
          tbody .finish div {
            width: 100px;
            padding-left: 10px;
          }
          thead .finish {
            width: 100px;
          }
          tbody .finish {
            width: 100px;
          }

          thead .rest div {
            width: 100px;
          }
          .rest div {
            padding-left: 0px;
          }
          tbody .rest div {
            width: 110px;
          }
          thead .rest {
            width: 110px;
            padding-left: 10px;
          }
          tbody .rest {
            width: 110px;
          }

          thead .locum div {
            width: 190px;
            padding-left: 10px;
          }
          tbody .locum div {
            width: 190px;
            padding-left: 10px;
          }
          thead .locum {
            width: 190px;
          }
          tbody .locum {
            width: 190px;
          }

          thead .expired div {
            width: 95px;
            padding-left: 10px;
          }
          tbody .expired div {
            width: 95px;
            padding-left: 10px;
          }
          thead .expired {
            width: 95px;
          }
          tbody .expired {
            width: 95px;
          }

          thead .createdAt div {
            width: 90px;
            padding-left: 10px;
          }
          tbody .createdAt div {
            width: 90px;
            padding-left: 10px;
          }
          thead .createdAt {
            width: 90px;
          }
          tbody .createdAt {
            width: 90px;
          }
          thead .edit div {
            width: 100px;
            padding-left: 10px;
          }
          tbody .edit div {
            width: 100px;
            padding-left: 10px;
          }
          thead .edit {
            width: 100px;
          }
          tbody .edit {
            width: 100px;
          }
          @media only screen and (max-width: 768px) {
            tbody div,
            thead div {
              font-size: 11px;
            }
            tbody,
            table,
            .box,
            .container-member {
              width: 485px;
              margin: 0 auto;
            }

            thead .caseId {
              width: 90px;
            }
            tbody .caseId {
              width: 90px;
            }
            thead .caseId div {
              width: 90px;
            }
            tbody .caseId div {
              width: 90px;
            }

            thead .expired {
              width: 75px;
            }
            tbody .expired {
              width: 75px;
            }
            thead .expired div {
              width: 75px;
            }
            tbody .expired div {
              width: 75px;
            }

            thead .professions {
              width: 90px;
            }
            tbody .professions {
              width: 90px;
            }
            thead .professions div {
              width: 90px;
            }
            tbody .professions div {
              width: 90px;
            }

            thead .cell-v {
              width: 60px;
            }
            tbody .cell-v {
              width: 60px;
            }

            thead .locum {
              display: none;
            }
            tbody .locum {
              display: none;
            }
            thead .locum div {
              display: none;
            }
            tbody .locum div {
              display: none;
            }
            thead .house {
              display: none;
            }
            tbody .house {
              display: none;
            }
            thead .house div {
              display: none;
            }
            tbody .house div {
              display: none;
            }

            thead .flight {
              display: none;
            }
            tbody .flight {
              display: none;
            }
            thead .flight div {
              display: none;
            }
            tbody .flight div {
              display: none;
            }
            thead .road {
              display: none;
            }
            tbody .road {
              display: none;
            }
            thead .road div {
              display: none;
            }
            tbody .road div {
              display: none;
            }

            thead .start {
              display: none;
            }
            tbody .start {
              display: none;
            }
            thead .start div {
              display: none;
            }
            tbody .start div {
              display: none;
            }
            thead .finish {
              display: none;
            }
            tbody .finish {
              display: none;
            }
            thead .finish div {
              display: none;
            }
            tbody .finish div {
              display: none;
            }

            thead .rate {
              width: 75px;
            }
            tbody .rate {
              width: 75px;
            }
            thead .rate div {
              width: 75px;
            }
            tbody .rate div {
              width: 75px;
            }

            thead .email {
              display: none;
            }
            tbody .email {
              display: none;
            }
            thead .email div {
              display: none;
            }
            tbody .email div {
              display: none;
            }
            thead .rest {
              display: none;
            }
            tbody .rest {
              display: none;
            }
            thead .rest div {
              display: none;
            }
            tbody .rest div {
              display: none;
            }
            thead .createdAt {
              width: 85px;
            }
            tbody .createdAt {
              width: 85px;
            }
            thead .createdAt div {
              width: 85px;
            }
            tbody .createdAt div {
              width: 85px;
            }
            thead .edit {
              width: 70px;
            }
            tbody .edit {
              width: 70px;
            }
            thead .edit div {
              width: 70px;
            }
            tbody .edit div {
              width: 70px;
            }
            tbody input[type="button"],
            thead input[type="button"] {
              width: 50px;
            }
          }

          /* ============== CALENDAR =============== */

          .selectdate .day_picker .rdp {
            position: absolute;
            z-index: 2000;
            margin: 0;
          }

          .rdp-button:not([disabled]).rdp-day_selected,
          .rdp-day_disabled,
          .rdp-button {
            color: white;
          }

          .rdp-nav .rdp-button {
            width: 30px;
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

          .selectdate .day_picker .rdp-button_reset {
            color: #212529;
            font-size: 16px;
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
          .backdrop {
            position: fixed;
            display: block;
            background-color: rgba(33, 40, 46, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2500;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
          .date-paid select {
            width: 100%;
            height: 35px;
            border-radius: 0px;
            border: 1px solid #ebebeb;
            outline: 0;
            display: block;
            font-size: 15px;
            padding: 5px 8px;
            -webkit-appearance: none;
            -moz-appearance: textfield;
            appearance: none;
          }
          .date-paid {
            position: relative;
            width: 100%;
          }
          .date-paid label {
            display: none;
            font-weight: 900;
            color: white;
            position: absolute;
            transform: translate(-130%, 30%);
            font-size: 15px;
            text-align: left;
          }

          .date-paid input[type="text"] {
            margin-bottom: 15px;
            margin-right: 0px;
          }
          @media only screen and (min-width: 768px) {
            .date-paid input[type="text"] {
              margin-right: 100px;
            }
            .date-paid label {
              display: block;
            }
            .date-paid select {
              width: 200px;
              max-width: 300px;
              margin: 0px auto;
              display: inline-block;
            }
          }

          /* ============ BOX PRIMARY =========== */
          .box.box-primary {
            padding: 15px 10px;
            box-shadow: none;
            position: relative;
          }
          .box-primary .locationBox {
            display: flex;
            justify-content: space-between;
            background-color: transparent;
            width: 100%;
            position: relative;
          }
          .container-fuild {
            margin: 40px auto;
            width: 390px;

            border-radius: 0px;
            background-color: transparent;
            border: 1px solid white;
            position: relative;
          }
          .container-members {
            margin: 60px auto;
            width: 485px;
            height: 100%;
            border-radius: 0px;
            background-color: transparent;
          }

          .col-xs-5 {
            font-weight: 900;
            text-align: left;
            color: #fff;
            font-size: 18px;
            height: 30px;
            line-height: 30px;
            padding: 0px;
            margin-left: 0px;
            width: 250px;
          }
          .col-xs-7 {
            padding: 0px;
            margin: 0px;
            position: relative;
            width: 100%;
          }
          .col-xs-7 p {
            margin-top: 10px;
          }

          .box .row {
            margin: 15px auto 0px;
            text-align: center;
            width: 100%;
          }

          .states_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
            width: 200px;
          }
          .contract_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
          }

          .checkboxes {
            background-color: #14a248;
            cursor: pointer;
            color: white;
            border: 1px solid #14a248;
            position: relative;
            width: 250px;
            font-size: 16px;
            text-align: center;
            height: 40px;
            margin-top: 18px;
            border-radius: 4px;
            transform: translateX(19%);
            outline: none;
          }

          .checkboxes:focus,
          .checkboxes:active {
            outline: none;
          }

          input::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #555 !important;
            font-weight: bold;
          }
          input::-moz-placeholder {
            /* Firefox 19+ */
            color: #555 !important;
            font-weight: bold;
          }
          input :-ms-input-placeholder {
            /* IE 10+ */
            color: #555 !important;
            font-weight: bold;
          }
          input:-moz-placeholder {
            /* Firefox 18- */
            color: #555 !important;
            font-weight: bold;
          }
          input[type="checkbox"] {
            opacity: 0;
            float: left;
          }
          input[type="checkbox"] + label {
            margin: 0 0 0 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 200;
            float: left;
            margin: 0px;
            width: 100%;
            color: white;
            font-weight: 600;
          }
          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -45px;
            top: 19px;
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
            left: -50px;
            top: 15px;
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
          .container-candidate {
            position: relative;
            width: 100%;
            top: 7%;
            left: 0%;
          }
          .container-candidate h2 {
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            padding-top: 8px;
            padding-bottom: 12px;
            color: #fff;
            border-bottom: 1px solid #ebebeb;
          }
          input[type="button"],
          input[type="submit"] {
            color: white;
            background-color: #f4436c;
            border: 1px solid #f4436c;
            outline: none;
            cursor: pointer;
            width: 60px;
            height: 32px;
            line-height: 30px;
            font-weight: 900;
            margin-top: 4px;
          }
          input[type="text"] {
            width: 100%;
            height: 35px;
            outline: 0;
            display: block;
            padding: 5px 8px;
            border: 1px solid #ebebeb;
            border-radius: 0px;
            font-size: 15px;
          }

          .box button {
            margin-top: 8px;
            outline: none;
            width: 100%;
            height: 32px;
            border: none;
            cursor: pointer;
            padding: 0;
          }
          .box a {
            color: white;
            background-color: #f4436c;
            border: none;
            outline: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            line-height: 32px;
            font-weight: 900;
            display: block;
          }

          .box table a {
            color: white;
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            width: 80px;
            height: 32px;
            line-height: 30px;
            font-weight: 900;
            display: block;
          }

          .box .row button a {
            color: #fff;
            background-color: #f4436c;
            border: 1px solid #f4436c;
            outline: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            line-height: 28px;
            font-weight: 900;
            display: block;
          }

          input[type="button"]:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          @keyframes myframes {
            from {
              opacity: 1;
              transform: translateY(-40%);
            }
            to {
              opacity: 1;
              transform: translateY(0%);
            }
          }
          @media only screen and (max-width: 768px) {
            input[type="button"] {
              width: 100%;
            }
            .box,
            .box-primary {
              width: 100%;
            }

            .contract_flex {
              height: 40%;
            }
          }

          /* ============ PAGINATION ON BOTTOM ========== */
          .paginate {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            border: none;
            z-index: 500;
            margin: 22px auto;
          }
          .paginate ul li,
          .paginate ul li a {
            width: 35px;
            height: 35px;
            background-color: #fff;
            color: #2b2b2b;
            font-weight: 700;
            float: left;
            border-radius: 50%;
            line-height: 35px;
            text-align: center;
            margin: 0px 10px;
            list-style-type: none;
            cursor: pointer;
          }
          .paginate .active {
            background-color: #2b2b2b;
            color: #fff;
          }

          .paginate .next {
            background-image: url("./../../images/arrow-down.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            background-color: #fff;
            transform: rotate(-90deg);
          }
          .paginate .previous {
            background-image: url("./../../images/left.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            background-color: #fff;
          }

          .pagination ul li:hover {
            cursor: pointer;
          }
          .buttonSegment {
            display: block;
            width: 100%;
            padding-bottom: 15px;
          }
          @media only screen and (min-width: 768px) {
            .container-fuild {
              margin: 20px auto;
              width: 1280px;
            }
            .col-xs-7 {
              width: 580px;
            }

            input[type="text"] {
              width: 200px;
              max-width: 300px;
              margin: 0px auto;
              display: inline-block;
            }

            input[type="button"],
            input[type="submit"] {
              width: 80px;
            }
            .box button {
              width: 80px;
            }

            .container-members {
              width: 1280px;
            }
            .box.box-primary {
              padding: 15px 40px;
            }
            .col-xs-5 {
              font-size: 14px;
            }

            .box .row {
              text-align: left;
            }
          }
          /* ============== SLIDE KEY ================= */
          .checkbox-btn {
            position: relative;
            width: 130px;
            height: 36px;
            transform: translate(0%, 0%);
            border: 3px solid transparent;
            overflow: hidden;
            border-radius: 0px;
          }
          .checkbox-btn input {
            height: 100%;
            width: 100%;
            position: relative;
            cursor: pointer;
            opacity: 0;
            top: 0;
            left: 0;
            z-index: 3;
          }
          .checkbox-btn div {
            top: 0;
            left: 0;
            position: absolute;
            height: 36px;
            background-color: transparent;
            border-radius: 0px;
          }
          .checkbox-btn div .slidekey {
            position: absolute;
            width: 50px;
            height: 36px;
            top: 0;
            left: 0;
            text-align: center;
            background-color: transparent;
            transition: 0.5s ease-in-out 0ms;
          }
          .checkbox-btn input:checked + div .slidekey {
            transform: translateX(107px);
          }
          .checkbox-btn .slidekey:before {
            content: "Live";
            position: absolute;
            height: 100%;
            width: 107px;
            text-align: center;
            top: 0;
            left: -107px;
            line-height: 36px;
            background-color: #2ed9c3;
            color: white;
            font-size: 14px;
            font-weight: 500;
          }
          .checkbox-btn .slidekey:after {
            content: "Paused";
            background-color: transparent;
            color: white;
            position: absolute;
            height: 100%;
            width: 107px;
            text-align: center;
            top: 0;
            right: -56px;
            line-height: 36px;
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Alistings;
