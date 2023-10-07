import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import en from "date-fns/locale/en-AU";
import { useSelector } from "react-redux";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const Alistings = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [noOfPayments, setNoOfPayments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/payments?page=${page <= 0 ? 0 : page - 1}` +
        "sortBy=" +
        sort +
        "&location=" +
        location +
        "&contract=" +
        contract +
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
    setNoOfPayments(data.num);
    setPayments(data.payments);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/admin/payments?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "sortBy=" +
        sort +
        "&location=" +
        location +
        "&contract=" +
        contract +
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
    setNoOfPayments(data.num);
    setPayments(data.payments);
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
        `api/admin/payments?page=${id + 1}` +
        "&location=" +
        location +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
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
    setNoOfPayments(data.num);
    setPayments(data.payments);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);
  const [, setReload] = useState(false);

  const sortPayments = async (e, ascDesc) => {
    const name = e.target.innerHTML;

    if (ascDesc === false) {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `api/admin/sortpayments?sortBy=asc` +
          "&location=" +
          location +
          "&page=" +
          page +
          "&name=" +
          name +
          "&contract=" +
          contract +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setReload(true);
      setNoOfPayments(data.num);
      setPayments(data.payments);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }

    if (ascDesc === true) {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `api/admin/sortpayments?sortBy=desc` +
          "&location=" +
          location +
          "&page=" +
          page +
          "&name=" +
          name +
          "&contract=" +
          contract +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setReload(true);
      setNoOfPayments(data.num);
      setPayments(data.payments);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
    }
  };

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

  // ========= SELECT CONTRACT TYPE (FT PT & LOCUM) ==========
  const [contract, setContract] = useState([]);
  const [checkedft, setCheckedft] = useState(false);
  const [checkedpt, setCheckedpt] = useState(false);
  const [checkedLocum, setCheckedLocum] = useState(false);

  // ========= ADD CONTRACT TYPE (FT PT & LOCUM) ==========
  const onContractChange = async (event) => {
    const { value } = event.target;
    setContract([...contract, value]);
  };

  // ========== REMOVE CONTRACT TYPE (FT PT & LOCUM) =========
  const onRemoveLevel = async (event) => {
    const { value } = event.target;
    const index = contract.indexOf(value);
    if (index !== -1) {
      contract.splice(index, 1);
    }
    setContract([...contract]);
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
    setCheckedft(false);
    setCheckedpt(false);
    setCheckedLocum(false);
    setContract([]);
    setLocation([]);
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
          "api/admin/payments?" +
          "location=" +
          location +
          "&contract=" +
          contract +
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
        setNoOfPayments(data.num);
        setPayments(data.payments);
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
  }, [location, contract]);
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

  const onSubmit = (e) => {
    e.preventDefault();
    setBackdrop(true);
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/admin/payments?" +
          "location=" +
          location +
          "&sortBy=" +
          sort +
          "&contract=" +
          contract +
          "&page=" +
          page +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();

      setBackdrop(false);
      if (isCancelled === false) {
        setReload(true);
        setNoOfPayments(data.num);
        setPayments(data.payments);
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

  // =========== CUSTOMISED CSV FILE ============
  const headers = [
    { label: "Invoice No.", key: "invoiceNumber" },
    { label: "Case ID", key: "caseId" },
    { label: "Contract Type", key: "contractType" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Total Paid", key: "subjects" },
    { label: "GST", key: "gst" },
    { label: "Street No.", key: "streetNo" },
    { label: "Street", key: "street" },
    { label: "Suburb", key: "suburb" },
    { label: "State", key: "state" },
    { label: "Post Code", key: "postalCode" },
    { label: "Country", key: "country" },
    { label: "Date Paid", key: "dateIssued" },
    { label: "Standard", key: "isPaid" },
    { label: "Locum", key: "isPaidLocum" },
    { label: "Job Seeker First Name", key: "jobSeekerFirstName" },
    { label: "Job Seeker Last Name", key: "jobSeekerLastName" },
    { label: "Job Seeker Email", key: "jobSeekerEmail" },
  ];

  const csvReport = {
    data: payments,
    headers: headers,
    filename: "Medclicker_Payments.csv",
  };

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);

  // ========== SEND INVOICE ===============
  const sendInvoice = (e, invoiceNumber) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BACKEND_URL + "api/admin/sendinvoice", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ invoiceNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateNote(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTimeout(function () {
          setUpdateNote(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin Payments | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker Payments" />
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
                        <h4>Security Settings</h4>
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

        {updateNote ? (
          <div className="container-payment">
            <section className="updateNote container-fluid">
              <div className="container-fluid ">
                <img src="/images/tick.png" style={{ width: "12px" }} alt="" />
                <span>Invoice Sent.</span>
              </div>
            </section>
          </div>
        ) : null}

        <div className="wrap">
          <form onSubmit={onSubmit}>
            <div className="container-fuild">
              <div className="box box-primary">
                <div className="container-candidate">
                  <h2>Payment Management</h2>
                </div>

                <div className="row">
                  <div className="col-xs-5">Date Paid</div>
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
                    <h2 style={{ margin: "0" }}>Contract Type</h2>
                  </div>
                  <div className="row">
                    <div className="contract_flex">
                      <input
                        id="fulltime"
                        type="checkbox"
                        checked={checkedft ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedft
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedft(!checkedft);
                        }}
                        value="Full-Time"
                      />
                      <label htmlFor="fulltime">Full-Time</label>

                      <input
                        id="parttime"
                        type="checkbox"
                        checked={checkedpt ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedpt
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedpt(!checkedpt);
                        }}
                        value="Part-Time"
                      />

                      <label htmlFor="parttime">Part-Time</label>

                      <input
                        id="locum"
                        type="checkbox"
                        name="contract"
                        checked={checkedLocum ? true : false}
                        onChange={(event) => {
                          !checkedLocum
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedLocum(!checkedLocum);
                        }}
                        value="Locum"
                      />
                      <label htmlFor="locum">Locum</label>
                    </div>
                  </div>
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
                  {noOfPayments === 0 ? (
                    <h2>No Payments</h2>
                  ) : noOfPayments > 1 ? (
                    <h2>{noOfPayments} Payments</h2>
                  ) : (
                    <h2>{noOfPayments} Payment</h2>
                  )}
                </div>
                <table>
                  <thead>
                    <tr>
                      <th
                        className="head cell-v invoices"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>Invoice No.</div>
                      </th>
                      <th
                        className="head caseId"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>Case ID</div>
                      </th>
                      <th
                        className="head contractType"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>Contract Type</div>
                      </th>
                      <th
                        className="head paid"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>Total Paid</div>
                      </th>
                      <th
                        className="head gst"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>GST</div>
                      </th>
                      <th
                        className="head cell-v name"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>Payer Name</div>
                      </th>
                      <th
                        className="head location"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>Job Location</div>
                      </th>
                      <th
                        className="head datePaid"
                        onClick={(e) => {
                          setAscDesc(!ascDesc);
                          sortPayments(e, ascDesc);
                        }}
                      >
                        <div>Date Paid</div>
                      </th>

                      <th className="head edit">
                        <div></div>
                      </th>
                      <th className="head send">
                        <div></div>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table>
                  <tbody>
                    {payments.map((payment) => {
                      return (
                        <tr key={payment._id}>
                          <td className="cell cell-v invoices">
                            <div>{payment.invoiceNumber}</div>
                          </td>
                          <td className="cell caseId">
                            <div>{payment.caseId}</div>
                          </td>
                          <td className="cell contractType">
                            <div>{payment.contractType}</div>
                          </td>
                          <td className="cell paid">
                            <div>AUD {payment.totalAmount.toFixed(2)}</div>
                          </td>
                          <td className="cell gst">
                            <div>AUD {payment.gst.toFixed(2)}</div>
                          </td>
                          <td className="cell cell-v name">
                            <div>
                              {payment.firstName} {payment.lastName}
                            </div>
                          </td>

                          <td className="cell location">
                            <div>
                              {payment.suburb} {payment.state}{" "}
                              {payment.postalCode}
                            </div>
                          </td>
                          <td className="cell datePaid">
                            <div>{payment.dateIssued}</div>
                          </td>

                          <td className="cell edit">
                            <div>
                              <ExternalLink
                                href={
                                  process.env.REACT_APP_BACKEND_URL +
                                  `api/payment/invoice/${payment.invoiceNumber}`
                                }
                                target="_self"
                              >
                                <input type="button" value="View Invoice" />
                              </ExternalLink>
                            </div>
                          </td>

                          <td className="cell send">
                            <div>
                              <input
                                type="submit"
                                value="Send Invoice"
                                onClick={(e) => {
                                  sendInvoice(e, payment.invoiceNumber);
                                }}
                              />
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
            background: linear-gradient(180deg, #490e67, rgba(73, 14, 103, 0));
            background-color: #f4436c;
          }
          .container-payment {
            margin: 80px 120px;
            width: 1280px;
            height: 100%;
            border: none;
            border-radius: 0px;
            margin: 40px auto;
            border-radius: 0px;
            background-color: transparent;
            position: relative;
          }

          .container-payment .updateNote {
            width: 100%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .container-payment .updateNote span {
            margin-left: 5px;
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

          thead .invoices div {
            width: 120px;
            padding-left: 10px;
          }
          tbody .invoices div {
            width: 120px;
            padding-left: 10px;
          }
          thead .invoices {
            width: 120px;
          }
          tbody .invoices {
            width: 120px;
          }

          thead .caseId div {
            width: 120px;
            padding-left: 10px;
          }
          tbody .caseId div {
            width: 120px;
            padding-left: 10px;
          }
          thead .caseId {
            width: 120px;
          }
          tbody .caseId {
            width: 120px;
          }
          tbody .contractType div {
            width: 110px;
            padding-left: 10px;
          }
          thead .contractType div {
            width: 110px;
            padding-left: 10px;
          }
          tbody .contractType {
            width: 110px;
          }
          thead .contractType {
            width: 110px;
          }

          thead .paid div {
            width: 100px;
            padding-left: 10px;
          }
          tbody .paid div {
            width: 100px;
            padding-left: 10px;
          }
          thead .paid {
            width: 100px;
          }
          tbody .paid {
            width: 100px;
          }
          thead .gst div {
            width: 100px;
            padding-left: 10px;
          }
          tbody .gst div {
            width: 100px;
            padding-left: 10px;
          }
          thead .gst {
            width: 100px;
          }
          tbody .gst {
            width: 100px;
          }
          thead .name div {
            width: 170px;
            padding-left: 10px;
          }
          tbody .name div {
            width: 170px;
            padding-left: 10px;
          }
          thead .name {
            width: 170px;
          }
          tbody .name {
            width: 170px;
          }

          thead .datePaid div {
            width: 110px;
            padding-left: 10px;
          }
          tbody .datePaid div {
            width: 110px;
            padding-left: 10px;
          }
          thead .datePaid {
            width: 110px;
          }
          tbody .datePaid {
            width: 110px;
          }

          thead .location div {
            width: 190px;
            padding-left: 10px;
          }
          tbody .location div {
            width: 190px;
            padding-left: 10px;
          }
          thead .location {
            width: 190px;
          }
          tbody .location {
            width: 190px;
          }
          thead .edit div {
            width: 130px;
            padding-left: 10px;
          }
          tbody .edit div {
            width: 130px;
            padding-left: 10px;
          }
          thead .edit {
            width: 130px;
          }
          tbody .edit {
            width: 130px;
          }

          thead .send div {
            width: 130px;
            padding-left: 10px;
          }
          tbody .send div {
            width: 130px;
            padding-left: 10px;
          }
          thead .send {
            width: 130px;
          }
          tbody .send {
            width: 130px;
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

            thead .invoices {
              width: 105px;
            }
            tbody .invoices {
              width: 105px;
            }
            thead .invoices div {
              width: 105px;
            }
            tbody .invoices div {
              width: 105px;
            }

            thead .caseId {
              width: 105px;
            }
            tbody .caseId {
              width: 105px;
            }
            thead .caseId div {
              width: 105px;
            }
            tbody .caseId div {
              width: 105px;
            }
            thead .paid {
              width: 90px;
            }
            tbody .paid {
              width: 90px;
            }
            thead .paid div {
              width: 90px;
            }
            tbody .paid div {
              width: 90px;
            }

            thead .datePaid {
              width: 90px;
            }
            tbody .datePaid {
              width: 90px;
            }
            thead .datePaid div {
              width: 90px;
            }
            tbody .datePaid div {
              width: 90px;
            }
            thead .contractType {
              display: none;
            }
            tbody .contractType {
              display: none;
            }
            thead .contractType div {
              display: none;
            }
            tbody .contractType div {
              display: none;
            }
            thead .gst {
              display: none;
            }
            tbody .gst {
              display: none;
            }
            thead .gst div {
              display: none;
            }
            tbody .gst div {
              display: none;
            }
            thead .name {
              display: none;
            }
            tbody .name {
              display: none;
            }
            thead .name div {
              display: none;
            }
            tbody .name div {
              display: none;
            }
            thead .cell-v {
              width: 60px;
            }
            tbody .cell-v {
              width: 60px;
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

            thead .location {
              display: none;
            }
            tbody .location {
              display: none;
            }
            thead .location div {
              display: none;
            }
            tbody .location div {
              display: none;
            }
            thead .edit {
              width: 95px;
            }
            tbody .edit {
              width: 95px;
            }
            thead .edit div {
              width: 95px;
            }
            tbody .edit div {
              width: 95px;
            }

            thead .send {
              display: none;
            }
            tbody .send {
              display: none;
            }
            thead .send div {
              display: none;
            }
            tbody .send div {
              display: none;
            }
            tbody input[type="button"],
            thead input[type="button"] {
              width: 80px;
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
            width: 100%;
            height: 32px;
            line-height: 30px;
            font-weight: 900;
            margin-top: 4px;
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

          .box button a {
            color: #fff;
            font-weight: 900;
            display: block;
            width: 100%;
            height: 100%;
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
            background-image: url(./../../images/arrow-down.png);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            background-color: #fff;
            transform: rotate(-90deg);
          }
          .paginate .previous {
            background-image: url(./../../images/left.png);
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

            .edit input[type="button"] {
              width: 100px;
            }
            .send input[type="submit"] {
              width: 100px;
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
            content: "刊登中";
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
            content: "關閉中";
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
