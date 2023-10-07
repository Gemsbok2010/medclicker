import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { useSelector } from "react-redux";
import "react-day-picker/dist/style.css";
import en from "date-fns/locale/en-AU";
import { ExternalLink } from "react-external-link";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const Invoices = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [noOfInvoices, setNoOfInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const email = user.email;

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/payment/invoices?page=${page <= 0 ? 0 : page - 1}` +
        "sortBy=" +
        sort +
        "&email=" +
        email +
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
    setNoOfInvoices(data.num);
    setInvoices(data.invoices);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/payment/invoices?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "sortBy=" +
        sort +
        "&email=" +
        email +
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
    setNoOfInvoices(data.num);
    setInvoices(data.invoices);
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
        `api/payment/invoices?page=${id + 1}` +
        "&sortBy=" +
        sort +
        "&email=" +
        email +
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
    setNoOfInvoices(data.num);
    setInvoices(data.invoices);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // =============== SORT BY INVOICE # ================
  const [, setReload] = useState(false);
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);

  const sortInvoices = async (e, ascDesc) => {
    setReload(false);
    const name = e.target.innerHTML;
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/payment/sortinvoices?sortBy=asc" +
          "&contract=" +
          contract +
          "&page=" +
          page +
          "&email=" +
          email +
          "&name=" +
          name +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setNoOfInvoices(data.num);
      setInvoices(data.invoices);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setReload(true);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/payment/sortinvoices?sortBy=desc" +
          "&contract=" +
          contract +
          "&page=" +
          page +
          "&email=" +
          email +
          "&name=" +
          name +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setNoOfInvoices(data.num);
      setInvoices(data.invoices);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setReload(true);
    }
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
    setCheckedft(false);
    setCheckedpt(false);
    setCheckedLocum(false);
    setContract([]);
  };

  // ============= GET INVOICES  ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/payment/invoices?" +
          "contract=" +
          contract +
          "&sortBy=" +
          sort +
          "&page=" +
          page +
          "&email=" +
          email +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();

      if (isCancelled === false) {
        setReload(true);
        setNoOfInvoices(data.num);
        setInvoices(data.invoices);
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
  }, [contract]);

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

  // ============== CALENDAR FILTER CARD ============== //
  const onSubmit = (e) => {
    e.preventDefault();
    setBackdrop(true);
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/payment/invoices?" +
          "sortBy=" +
          sort +
          "&page=" +
          page +
          "&contract=" +
          contract +
          "&email=" +
          email +
          "&startDate=" +
          startDate +
          "&finishDate=" +
          selectedFinishDay
      );
      const data = await res.json();
      setInvoices(data.invoices);
      setBackdrop(false);
      if (isCancelled === false) {
        setReload(true);
        setNoOfInvoices(data.num);
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

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Invoices | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <LoggedInNavbar />
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
                  <h2>Search Invoice</h2>
                </div>

                <div className="row">
                  <div className="col-xs-5">Date Issued</div>
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

                <div className="row">
                  <input
                    type="button"
                    className="btn-search"
                    defaultValue="Clear All"
                    onClick={clearAll}
                  />
                </div>
              </div>
            </div>
          </form>
          <form>
            <div className="container-members">
              <div className="box">
                <div className="container-candidate">
                  {noOfInvoices === 0 ? (
                    <h2>No Invoices found</h2>
                  ) : noOfInvoices > 1 ? (
                    <h2>{noOfInvoices} Invoices</h2>
                  ) : (
                    <h2>{noOfInvoices} Invoice</h2>
                  )}
                </div>
                {noOfInvoices === 0 ? (
                  ""
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th
                          className="head cell-v invoices"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>Invoice No.</div>
                        </th>

                        <th
                          className="head caseId"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>Case Id</div>
                        </th>

                        <th
                          className="head contractType"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>Contract Type</div>
                        </th>

                        <th
                          className="head paid"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>Total Paid</div>
                        </th>
                        <th
                          className="head gst"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>GST</div>
                        </th>

                        <th
                          className="head cell-v rest"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>Status</div>
                        </th>
                        <th
                          className="head datePaid"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>Date Paid</div>
                        </th>
                        <th
                          className="head createdAt"
                          onClick={(e) => {
                            setAscDesc(!ascDesc);
                            sortInvoices(e, ascDesc);
                          }}
                        >
                          <div>Date Issued</div>
                        </th>
                        <th className="head edit">
                          <div></div>
                        </th>
                      </tr>
                    </thead>
                  </table>
                )}

                <table>
                  <tbody>
                    {invoices.map((invoice) => {
                      return (
                        <tr key={invoice._id}>
                          <td className="cell cell-v invoices">
                            <div>{invoice.invoiceNumber}</div>
                          </td>
                          <td className="cell caseId">
                            <div>{invoice.caseId}</div>
                          </td>
                          <td className="cell contractType">
                            <div>{invoice.contractType}</div>
                          </td>
                          <td className="cell paid">
                            <div>AUD {invoice.totalAmount.toFixed(2)}</div>
                          </td>
                          <td className="cell gst">
                            <div>AUD {invoice.gst.toFixed(2)}</div>
                          </td>
                          <td className="cell cell-v rest">
                            <div>
                              {invoice.totalAmount === 0 ? "No Charge" : "Paid"}
                            </div>
                          </td>
                          <td className="cell datePaid">
                            <div> {invoice.dateIssued}</div>
                          </td>
                          <td className="cell createdAt">
                            <div> {invoice.dateIssued}</div>
                          </td>
                          <td className="cell edit">
                            <div>
                              <ExternalLink
                                href={
                                  process.env.REACT_APP_BACKEND_URL +
                                  `api/payment/invoice/${invoice.invoiceNumber}`
                                }
                                target="_self"
                              >
                                <input type="button" value="View Invoice" />
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
          <Footer />
        </div>

        <style jsx="true">{`
          body {
            background-color: #f4f5f6;
          }
          /* ============== NAV BAR ============= */

          nav .dashboard {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 96%;
            margin: 0 auto;
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
            color: #2b2b2b;
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
            background-color: rgba(35, 35, 35, 0.6);
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

          tbody .contractType div {
            width: 150px;
            padding-left: 10px;
          }
          thead .contractType div {
            width: 150px;
            padding-left: 10px;
          }
          tbody .contractType {
            width: 150px;
          }
          thead .contractType {
            width: 150px;
          }
          thead .invoices div {
            width: 200px;
            padding-left: 10px;
          }
          tbody .invoices div {
            width: 200px;
            padding-left: 10px;
          }
          thead .invoices {
            width: 200px;
          }
          tbody .invoices {
            width: 200px;
          }

          thead .paid div {
            width: 120px;
            padding-left: 10px;
          }
          tbody .paid div {
            width: 120px;
            padding-left: 10px;
          }
          thead .paid {
            width: 120px;
          }
          tbody .paid {
            width: 120px;
          }
          thead .gst div {
            width: 120px;
            padding-left: 10px;
          }
          tbody .gst div {
            width: 120px;
            padding-left: 10px;
          }
          thead .gst {
            width: 120px;
          }
          tbody .gst {
            width: 120px;
          }

          thead .caseId div {
            width: 150px;
            padding-left: 10px;
          }
          tbody .caseId div {
            width: 150px;
            padding-left: 10px;
          }
          thead .caseId {
            width: 150px;
          }
          tbody .caseId {
            width: 150px;
          }

          thead .rest div {
            width: 100px;
            padding-left: 10px;
          }
          tbody .rest div {
            width: 110px;
            padding-left: 10px;
          }

          thead .rest {
            width: 110px;
          }
          tbody .rest {
            width: 110px;
          }

          thead .datePaid div {
            width: 130px;
            padding-left: 10px;
          }
          tbody .datePaid div {
            width: 130px;
            padding-left: 10px;
          }
          thead .datePaid {
            width: 130px;
          }
          tbody .datePaid {
            width: 130px;
          }

          thead .createdAt div {
            width: 130px;
            padding-left: 10px;
          }
          tbody .createdAt div {
            width: 130px;
            padding-left: 10px;
          }
          thead .createdAt {
            width: 130px;
          }
          tbody .createdAt {
            width: 130px;
          }
          thead .edit div {
            width: 170px;
            padding-left: 10px;
          }
          tbody .edit div {
            width: 170px;
            padding-left: 10px;
          }
          thead .edit {
            width: 170px;
          }
          tbody .edit {
            width: 170px;
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

            thead .contractType {
              display: none;
            }
            thead .contractType div {
              display: none;
            }
            tbody .contractType {
              display: none;
            }
            tbody .contractType div {
              display: none;
            }
            thead .invoices {
              width: 110px;
            }
            tbody .invoices {
              width: 110px;
            }
            thead .invoices div {
              width: 110px;
            }
            tbody .invoices div {
              width: 110px;
            }
            thead .caseId {
              width: 110px;
            }
            tbody .caseId {
              width: 110px;
            }
            thead .caseId div {
              width: 110px;
            }
            tbody .caseId div {
              width: 110px;
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

            thead .cell-v {
              width: 80px;
            }
            tbody .cell-v {
              width: 80px;
            }

            thead .datePaid {
              width: 85px;
            }
            tbody .datePaid {
              width: 85px;
            }
            thead .datePaid div {
              width: 85px;
            }
            tbody .datePaid div {
              width: 85px;
            }

            thead .createdAt {
              display: none;
            }
            tbody .createdAt {
              display: none;
            }
            thead .createdAt div {
              display: none;
            }
            tbody .createdAt div {
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

            thead .edit {
              width: 90px;
            }
            tbody .edit {
              width: 90px;
            }
            thead .edit div {
              width: 90px;
            }
            tbody .edit div {
              width: 90px;
            }
            .box table tbody input[type="button"],
            .box table thead input[type="button"] {
              width: 75px;
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

          .box-primary .prof-type {
            width: 200px;
            margin-bottom: 16px;
          }

          .box-primary .btn-search {
            width: 100%;
            height: 32px;
            color: white;
            background-color: #f4436c;
            line-height: 30px;
            border: 1px solid #f4436c;
            font-weight: 900;
            margin-top: 4px;
          }

          .box-primary .btn-search:hover {
            cursor: pointer;
          }

          .prof-type .contractList {
            position: absolute;
            z-index: 2000;
            width: 34%;
            margin-top: 1px;
            display: block;
          }
          .prof-type .contractList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .prof-type .contractList ul li {
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
            padding-left: 18px;
            position: relative;
            width: 100%;
          }

          .prof-type .contractList ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 17px;
          }
          .prof-type .prof-types {
            margin: 0;
            width: 100%;
          }

          .container-fuild {
            margin: 40px auto;
            width: 390px;

            border-radius: 0px;
            background-color: transparent;
            border: 1px solid #2b2b2b;
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
            color: #2b2b2b;
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
            color: #2b2b2b;
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
            color: #2b2b2b;
            border-bottom: 1px solid #2b2b2b;
          }
          .box input[type="button"] {
            color: white;
            background-color: #f4436c;
            border: none;
            outline: none;
            cursor: pointer;
            width: 100%;
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

          .box .row a {
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
            .box-primary .prof-type {
              width: 100%;
              margin-bottom: 16px;
            }

            .prof-type .contractList {
              width: 100%;
            }

            .prof-type .contractList ul li {
              padding: 0;
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
            background-color: transparent;
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

            .box table input[type="button"] {
              width: 120px;
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

            .box-primary .btn-search,
            .box-primary input[type="button"] {
              width: 80px;
            }
            .box-primary input[type="button"]:disabled {
              width: 80px;
              cursor: default;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Invoices;
