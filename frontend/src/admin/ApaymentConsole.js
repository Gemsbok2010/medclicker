import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";
import axios from "axios";
// Three dots
import { ThreeDots } from "react-loader-spinner";

const ApaymentConsole = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [dropdown, setDropdown] = useState(false);

  // ============== BACKDROP ============== //
  const [backdrop, setBackdrop] = useState(false);

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);

  // ============== REGULAR ============== //
  const [regFee1, setRegFee1] = useState("");
  const [regFee2, setRegFee2] = useState("");
  const [regFee3, setRegFee3] = useState("");
  const [regDiscount1, setRegDiscount1] = useState("");
  const [regDiscount2, setRegDiscount2] = useState("");
  const [regDiscount3, setRegDiscount3] = useState("");
  const [freeDays, setFreeDays] = useState("");
  const [expDays1, setExpDays1] = useState("");
  const [expDays2, setExpDays2] = useState("");
  const [expDays3, setExpDays3] = useState("");
  const [regPlan1, setRegPlan1] = useState(false);
  const [regPlan2, setRegPlan2] = useState(false);
  const [regPlan3, setRegPlan3] = useState(false);
  const [socialMed1, setSocialMed1] = useState(false);
  const [socialMed2, setSocialMed2] = useState(false);
  const [socialMed3, setSocialMed3] = useState(false);
  const [newsletter1, setNewsletter1] = useState(false);
  const [newsletter2, setNewsletter2] = useState(false);
  const [newsletter3, setNewsletter3] = useState(false);

  const onStore = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/payments_plans/plans", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        freeDays,
        expDays1,
        expDays2,
        expDays3,
        regFee1,
        regFee2,
        regFee3,
        regDiscount1,
        regDiscount2,
        regDiscount3,
        regPlan1,
        regPlan2,
        regPlan3,
        newsletter1,
        newsletter2,
        newsletter3,
        socialMed1,
        socialMed2,
        socialMed3,
        locumMin1,
        locumMax1,
        locumFee1,
        locumDiscount1,
        locumMin2,
        locumMax2,
        locumFee2,
        locumDiscount2,
        locumMin3,
        locumMax3,
        locumFee3,
        locumDiscount3,
        locumMin4,
        locumMax4,
        locumFee4,
        locumDiscount4,
        locumMin5,
        locumMax5,
        locumFee5,
        locumDiscount5,
        locumMin6,
        locumMax6,
        locumFee6,
        locumDiscount6,
        locumMin7,
        locumMax7,
        locumFee7,
        locumDiscount7,
        locumMin8,
        locumMax8,
        locumFee8,
        locumDiscount8,
        locumMin9,
        locumMax9,
        locumFee9,
        locumDiscount9,
        locumPayment,
        regularPayment,
        isAdmin: true,
        _id: userInfo ? userInfo._id : "",
      }),
    });
    const data = await res.json();
    if (data) {
      setUpdateNote(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setTimeout(function () {
      setUpdateNote(false);
    }, 2000);
  };

  // ============== LOCUM ============== //

  const [locumMin1, setLocumMin1] = useState("");
  const [locumMax1, setLocumMax1] = useState("");
  const [locumFee1, setLocumFee1] = useState("");
  const [locumDiscount1, setLocumDiscount1] = useState("");

  const [locumMin2, setLocumMin2] = useState("");
  const [locumMax2, setLocumMax2] = useState("");
  const [locumFee2, setLocumFee2] = useState("");
  const [locumDiscount2, setLocumDiscount2] = useState("");

  const [locumMin3, setLocumMin3] = useState("");
  const [locumMax3, setLocumMax3] = useState("");
  const [locumFee3, setLocumFee3] = useState("");
  const [locumDiscount3, setLocumDiscount3] = useState("");

  const [locumMin4, setLocumMin4] = useState("");
  const [locumMax4, setLocumMax4] = useState("");
  const [locumFee4, setLocumFee4] = useState("");
  const [locumDiscount4, setLocumDiscount4] = useState("");

  const [locumMin5, setLocumMin5] = useState("");
  const [locumMax5, setLocumMax5] = useState("");
  const [locumFee5, setLocumFee5] = useState("");
  const [locumDiscount5, setLocumDiscount5] = useState("");

  const [locumMin6, setLocumMin6] = useState("");
  const [locumMax6, setLocumMax6] = useState("");
  const [locumFee6, setLocumFee6] = useState("");
  const [locumDiscount6, setLocumDiscount6] = useState("");

  const [locumMin7, setLocumMin7] = useState("");
  const [locumMax7, setLocumMax7] = useState("");
  const [locumFee7, setLocumFee7] = useState("");
  const [locumDiscount7, setLocumDiscount7] = useState("");

  const [locumMin8, setLocumMin8] = useState("");
  const [locumMax8, setLocumMax8] = useState("");
  const [locumFee8, setLocumFee8] = useState("");
  const [locumDiscount8, setLocumDiscount8] = useState("");

  const [locumMin9, setLocumMin9] = useState("");
  const [locumMax9, setLocumMax9] = useState("");
  const [locumFee9, setLocumFee9] = useState("");
  const [locumDiscount9, setLocumDiscount9] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/payments_plans/plans", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        freeDays,
        expDays1,
        expDays2,
        expDays3,
        regFee1,
        regFee2,
        regFee3,
        regDiscount1,
        regDiscount2,
        regDiscount3,
        regPlan1,
        regPlan2,
        regPlan3,
        newsletter1,
        newsletter2,
        newsletter3,
        socialMed1,
        socialMed2,
        socialMed3,
        locumMin1,
        locumMax1,
        locumFee1,
        locumDiscount1,
        locumMin2,
        locumMax2,
        locumFee2,
        locumDiscount2,
        locumMin3,
        locumMax3,
        locumFee3,
        locumDiscount3,
        locumMin4,
        locumMax4,
        locumFee4,
        locumDiscount4,
        locumMin5,
        locumMax5,
        locumFee5,
        locumDiscount5,
        locumMin6,
        locumMax6,
        locumFee6,
        locumDiscount6,
        locumMin7,
        locumMax7,
        locumFee7,
        locumDiscount7,
        locumMin8,
        locumMax8,
        locumFee8,
        locumDiscount8,
        locumMin9,
        locumMax9,
        locumFee9,
        locumDiscount9,
        locumPayment,
        regularPayment,
        isAdmin: true,
        _id: userInfo ? userInfo._id : "",
      }),
    });
    const data = await res.json();
    if (data) {
      setUpdateNote(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setTimeout(function () {
      setUpdateNote(false);
    }, 2000);
  };

  // ============ LOCUM PAYMENT DATA ===========
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:4000/api/payments_plans/paymentPlans")
        .then((response) => {
          if (response.status === 200) {
            setUserInfo(response.data);
            setRegFee1(response.data.regFee1);
            setRegFee2(response.data.regFee2);
            setRegFee3(response.data.regFee3);
            setFreeDays(response.data.freeDays);
            setExpDays1(response.data.expDays1);
            setExpDays2(response.data.expDays2);
            setExpDays3(response.data.expDays3);
            setRegDiscount1(response.data.regDiscount1);
            setRegDiscount2(response.data.regDiscount2);
            setRegDiscount3(response.data.regDiscount3);
            setRegPlan1(response.data.regPlan1);
            setRegPlan2(response.data.regPlan2);
            setRegPlan3(response.data.regPlan3);
            setNewsletter1(response.data.newsletter1);
            setNewsletter2(response.data.newsletter2);
            setNewsletter3(response.data.newsletter3);
            setSocialMed1(response.data.socialMed1);
            setSocialMed2(response.data.socialMed2);
            setSocialMed3(response.data.socialMed3);
            setLocumMin1(response.data.locumMin1);
            setLocumMax1(response.data.locumMax1);
            setLocumFee1(response.data.locumFee1);
            setLocumDiscount1(response.data.locumDiscount1);
            setLocumMin2(response.data.locumMin2);
            setLocumMax2(response.data.locumMax2);
            setLocumFee2(response.data.locumFee2);
            setLocumDiscount2(response.data.locumDiscount2);
            setLocumMin3(response.data.locumMin3);
            setLocumMax3(response.data.locumMax3);
            setLocumFee3(response.data.locumFee3);
            setLocumDiscount3(response.data.locumDiscount3);
            setLocumMin4(response.data.locumMin4);
            setLocumMax4(response.data.locumMax4);
            setLocumFee4(response.data.locumFee4);
            setLocumDiscount4(response.data.locumDiscount4);
            setLocumMin5(response.data.locumMin5);
            setLocumMax5(response.data.locumMax5);
            setLocumFee5(response.data.locumFee5);
            setLocumDiscount5(response.data.locumDiscount5);
            setLocumMin6(response.data.locumMin6);
            setLocumMax6(response.data.locumMax6);
            setLocumFee6(response.data.locumFee6);
            setLocumDiscount6(response.data.locumDiscount6);
            setLocumMin7(response.data.locumMin7);
            setLocumMax7(response.data.locumMax7);
            setLocumFee7(response.data.locumFee7);
            setLocumDiscount7(response.data.locumDiscount7);
            setLocumMin8(response.data.locumMin8);
            setLocumMax8(response.data.locumMax8);
            setLocumFee8(response.data.locumFee8);
            setLocumDiscount8(response.data.locumDiscount8);
            setLocumMin9(response.data.locumMin9);
            setLocumMax9(response.data.locumMax9);
            setLocumFee9(response.data.locumFee9);
            setLocumDiscount9(response.data.locumDiscount9);
            setLocumPayment(response.data.locumPayment);
            setRegularPayment(response.data.regularPayment);
          }
        });
    };
    fetchData();
  }, []);

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesTimes(plan) {
    setAlert(true);
    window.scrollTo({
      top: 490,
      behavior: "smooth",
    });
    const errorMessage = `Max. Days for <b> ${plan} </b> cannot be less than the Min. Days. Please correct the error.`;
    setAlertMsg(errorMessage);
  }

  // ============ MIN & MAX DAYS CHECK ============
  const handleLocumPlan1 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin1);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 1");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan2 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin2);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 2");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan3 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin3);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 3");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan4 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin4);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 4");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan5 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin5);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 5");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan6 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin6);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 6");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan7 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin7);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 7");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan8 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin8);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 8");
    } else {
      setAlert(false);
    }
  };

  const handleLocumPlan9 = (e) => {
    const { value } = e.target;
    const finishDay = parseInt(value);
    const startDay = parseInt(locumMin9);

    const differenceDays = finishDay - startDay;

    if (differenceDays < 0) {
      outPutErrorMessagesTimes("Plan 9");
    } else {
      setAlert(false);
    }
  };

  // =============== ENABLE LOCUM SWITCH ===============
  const [locumPayment, setLocumPayment] = useState(false);

  const enableLocum = async (e) => {
    e.preventDefault();
    if (locumPayment === true) {
      setBackdrop(true);
      const res = await fetch(
        "http://localhost:4000/api/payments_plans/enableLocum",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ locumPayment: false }),
        }
      );
      const data = await res.json();
      if (data) {
        setBackdrop(false);
      }
    }
    if (locumPayment === false) {
      setBackdrop(true);
      const res = await fetch(
        "http://localhost:4000/api/payments_plans/enableLocum",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ locumPayment: true }),
        }
      );
      const data = await res.json();
      if (data) {
        setBackdrop(false);
      }
    }
  };

  // =============== ENABLE PAYMENT SWITCH ===============
  const [regularPayment, setRegularPayment] = useState(false);

  const enablePayment = async (e) => {
    e.preventDefault();
    if (regularPayment === true) {
      setBackdrop(true);
      const res = await fetch(
        "http://localhost:4000/api/payments_plans/enablePayment",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            regularPayment: false,
            regPlan1: false,
            regPlan2: false,
            regPlan3: false,
            _id: userInfo ? userInfo._id : "",
          }),
        }
      );
      const data = await res.json();
      if (data) {
        setBackdrop(false);
        setRegPlan1(false);
        setRegPlan2(false);
        setRegPlan3(false);
      }
    }
    if (regularPayment === false) {
      setBackdrop(true);
      const res = await fetch(
        "http://localhost:4000/api/payments_plans/enablePayment",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            regularPayment: true,
            regPlan1: true,
            regPlan2: true,
            regPlan3: true,
            _id: userInfo ? userInfo._id : "",
          }),
        }
      );
      const data = await res.json();
      if (data) {
        setBackdrop(false);
        setRegPlan1(true);
        setRegPlan2(true);
        setRegPlan3(true);
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin Payment Plans | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker Payment Plans" />
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
                <span>Updated successfully.</span>
              </div>
            </section>
          </div>
        ) : null}

        <form>
          <div className="container-payment">
            <div className="box box-primary">
              <div className="container-candidate">
                <h2>Functions </h2>
              </div>
              <div className="row">
                <div className="col-xs-5">Enable Regular Payment</div>
                <div className="col-xs-7">
                  <div className="checkbox-btn">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={regularPayment ? true : false}
                      onChange={(e) => {
                        enablePayment(e);
                        setRegularPayment(!regularPayment);
                      }}
                    />
                    <div>
                      <span id="span_slide" className="slidekey"></span>
                    </div>
                  </div>
                  <p>
                    {" "}
                    Selecting ENABLE will enable the payment plans for the job
                    seeker. DISABLE will give allow free application of jobs.
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-5">Enable Locum Payment</div>
                <div className="col-xs-7">
                  <div className="checkbox-btn">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={locumPayment ? true : false}
                      onChange={(e) => {
                        enableLocum(e);
                        setLocumPayment(!locumPayment);
                      }}
                    />
                    <div>
                      <span className="slidekey"></span>
                    </div>
                  </div>
                  <p>
                    {" "}
                    Selecting ENABLE will enable the payment plans for the
                    advertiser. DISABLE will give allow free application of
                    jobs.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-5">Enable Reviews</div>
                <div className="col-xs-7">
                  <div className="checkbox-btn">
                    <input
                      type="checkbox"
                      checked={false}
                      className="form-check-input"
                      disabled
                    />
                    <div>
                      <span className="slidekey"></span>
                    </div>
                  </div>
                  <p> Selecting ENABLE will enable the reviews system.</p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form onSubmit={onStore}>
          <div className="container-payment">
            <div className="box box-primary">
              <div className="container-candidate">
                <h2>Payment Plans Regular</h2>
              </div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Expiry days</th>
                    <th>Service Fee</th>
                    <th>Discount (%)</th>
                    <th>Social Media</th>
                    <th>Newsletter</th>
                    <th>Switch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Free Days</td>
                    <td>
                      <input
                        type="number"
                        value={freeDays ? freeDays : null}
                        onChange={(e) => {
                          setFreeDays(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan A</td>
                    <td>
                      <input
                        type="number"
                        value={expDays1 ? expDays1 : ""}
                        onChange={(e) => {
                          setExpDays1(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={regFee1 ? regFee1 : ""}
                        onChange={(e) => {
                          setRegFee1(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={regDiscount1 ? regDiscount1 : ""}
                        onChange={(e) => {
                          setRegDiscount1(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <div className="social">
                        <input
                          id="sm1"
                          type="checkbox"
                          checked={socialMed1 ? true : false}
                          onChange={() => {
                            setSocialMed1(!socialMed1);
                          }}
                        />
                        <label htmlFor="sm1"></label>
                      </div>
                    </td>
                    <td>
                      <div className="highlight">
                        <input
                          id="hl1"
                          type="checkbox"
                          checked={newsletter1 ? true : false}
                          onChange={() => {
                            setNewsletter1(!newsletter1);
                          }}
                        />
                        <label htmlFor="hl1"></label>
                      </div>
                    </td>
                    <td>
                      <div className="checkbox-btn">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="plan1"
                          checked={regPlan1 ? true : false}
                          onChange={(e) => {
                            setRegPlan1(!regPlan1);
                          }}
                        />
                        <div>
                          <span className="slidekey"></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Plan B</td>
                    <td>
                      <input
                        type="number"
                        value={expDays2 ? expDays2 : ""}
                        onChange={(e) => {
                          setExpDays2(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={regFee2 ? regFee2 : ""}
                        onChange={(e) => {
                          setRegFee2(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={regDiscount2 ? regDiscount2 : ""}
                        onChange={(e) => {
                          setRegDiscount2(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <div className="social">
                        <input
                          id="sm2"
                          type="checkbox"
                          checked={socialMed2 ? true : false}
                          onChange={() => {
                            setSocialMed2(!socialMed2);
                          }}
                        />
                        <label htmlFor="sm2"></label>
                      </div>
                    </td>
                    <td>
                      <div className="highlight">
                        <input
                          id="hl2"
                          type="checkbox"
                          checked={newsletter2 ? true : false}
                          onChange={() => {
                            setNewsletter2(!newsletter2);
                          }}
                        />
                        <label htmlFor="hl2"></label>
                      </div>
                    </td>
                    <td>
                      <div className="checkbox-btn">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="plan2"
                          checked={regPlan2 ? true : false}
                          onChange={() => {
                            setRegPlan2(!regPlan2);
                          }}
                        />
                        <div>
                          <span className="slidekey"></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Plan C</td>
                    <td>
                      <input
                        type="number"
                        value={expDays3 ? expDays3 : ""}
                        onChange={(e) => {
                          setExpDays3(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={regFee3 ? regFee3 : ""}
                        onChange={(e) => {
                          setRegFee3(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={regDiscount3 ? regDiscount3 : ""}
                        onChange={(e) => {
                          setRegDiscount3(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <div className="social">
                        <input
                          id="sm3"
                          type="checkbox"
                          checked={socialMed3 ? true : false}
                          onChange={() => {
                            setSocialMed3(!socialMed3);
                          }}
                        />
                        <label htmlFor="sm3"></label>
                      </div>
                    </td>
                    <td>
                      <div className="highlight">
                        <input
                          id="hl3"
                          type="checkbox"
                          checked={newsletter3 ? true : false}
                          onChange={() => {
                            setNewsletter3(!newsletter3);
                          }}
                        />
                        <label htmlFor="hl3"></label>
                      </div>
                    </td>
                    <td>
                      <div className="checkbox-btn">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="plan3"
                          checked={regPlan3 ? true : false}
                          onChange={() => {
                            setRegPlan3(!regPlan3);
                          }}
                        />
                        <div>
                          <span className="slidekey"></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <input type="submit" style={{ border: "none" }} value="Save" />
            </div>
          </div>
        </form>

        <div className="errorMessagesHere">
          {alert ? (
            <div className="alert">
              <img
                src="/images/cross-black.png"
                style={{ width: "12px" }}
                alt=""
              />{" "}
              <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
            </div>
          ) : (
            ""
          )}
        </div>

        <form onSubmit={onSubmit}>
          <div className="container-locums">
            <div className="box box-primary">
              <div className="container-candidate">
                <h2>Payment Plans Locums</h2>
              </div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Min days</th>
                    <th>Max days</th>
                    <th>Service Fee ($)</th>
                    <th>Discount (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Plan 1</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin1 ? locumMin1 : ""}
                        onChange={(e) => {
                          setLocumMin1(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax1 ? locumMax1 : ""}
                        onChange={(e) => {
                          setLocumMax1(e.target.value);
                          handleLocumPlan1(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee1 ? locumFee1 : ""}
                        onChange={(e) => {
                          setLocumFee1(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount1 ? locumDiscount1 : ""}
                        onChange={(e) => {
                          setLocumDiscount1(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 2</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin2 ? locumMin2 : ""}
                        onChange={(e) => {
                          setLocumMin2(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax2 ? locumMax2 : ""}
                        onChange={(e) => {
                          setLocumMax2(e.target.value);
                          handleLocumPlan2(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee2 ? locumFee2 : ""}
                        onChange={(e) => {
                          setLocumFee2(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount2 ? locumDiscount2 : ""}
                        onChange={(e) => {
                          setLocumDiscount2(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 3</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin3 ? locumMin3 : ""}
                        onChange={(e) => {
                          setLocumMin3(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax3 ? locumMax3 : ""}
                        onChange={(e) => {
                          setLocumMax3(e.target.value);
                          handleLocumPlan3(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee3 ? locumFee3 : ""}
                        onChange={(e) => {
                          setLocumFee3(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount3 ? locumDiscount3 : ""}
                        onChange={(e) => {
                          setLocumDiscount3(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 4</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin4 ? locumMin4 : ""}
                        onChange={(e) => {
                          setLocumMin4(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax4 ? locumMax4 : ""}
                        onChange={(e) => {
                          setLocumMax4(e.target.value);
                          handleLocumPlan4(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee4 ? locumFee4 : ""}
                        onChange={(e) => {
                          setLocumFee4(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount4 ? locumDiscount4 : ""}
                        onChange={(e) => {
                          setLocumDiscount4(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 5</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin5 ? locumMin5 : ""}
                        onChange={(e) => {
                          setLocumMin5(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax5 ? locumMax5 : ""}
                        onChange={(e) => {
                          setLocumMax5(e.target.value);
                          handleLocumPlan5(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee5 ? locumFee5 : ""}
                        onChange={(e) => {
                          setLocumFee5(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount5 ? locumDiscount5 : ""}
                        onChange={(e) => {
                          setLocumDiscount5(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 6</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin6 ? locumMin6 : ""}
                        onChange={(e) => {
                          setLocumMin6(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax6 ? locumMax6 : ""}
                        onChange={(e) => {
                          setLocumMax6(e.target.value);
                          handleLocumPlan6(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee6 ? locumFee6 : ""}
                        onChange={(e) => {
                          setLocumFee6(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount6 ? locumDiscount6 : ""}
                        onChange={(e) => {
                          setLocumDiscount6(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 7</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin7 ? locumMin7 : ""}
                        onChange={(e) => {
                          setLocumMin7(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax7 ? locumMax7 : ""}
                        onChange={(e) => {
                          setLocumMax7(e.target.value);
                          handleLocumPlan7(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee7 ? locumFee7 : ""}
                        onChange={(e) => {
                          setLocumFee7(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount7 ? locumDiscount7 : ""}
                        onChange={(e) => {
                          setLocumDiscount7(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 8</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin8 ? locumMin8 : ""}
                        onChange={(e) => {
                          setLocumMin8(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax8 ? locumMax8 : ""}
                        onChange={(e) => {
                          setLocumMax8(e.target.value);
                          handleLocumPlan8(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee8 ? locumFee8 : ""}
                        onChange={(e) => {
                          setLocumFee8(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount8 ? locumDiscount8 : ""}
                        onChange={(e) => {
                          setLocumDiscount8(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Plan 9</td>
                    <td>
                      <input
                        type="number"
                        value={locumMin9 ? locumMin9 : ""}
                        onChange={(e) => {
                          setLocumMin9(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumMax9 ? locumMax9 : ""}
                        onChange={(e) => {
                          setLocumMax9(e.target.value);
                          handleLocumPlan9(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumFee9 ? locumFee9 : ""}
                        onChange={(e) => {
                          setLocumFee9(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={locumDiscount9 ? locumDiscount9 : ""}
                        onChange={(e) => {
                          setLocumDiscount9(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <input type="submit" style={{ border: "none" }} value="Save" />
            </div>
          </div>
        </form>
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

          .errorMessagesHere {
            margin: 30px 120px;
            width: 980px;
            height: 100%;
            border: none;
            border-radius: 0px;
          }

          .errorMessagesHere .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 100%;
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
            border-bottom: 1px solid #ebebeb;
            color: #fff;
          }
          .box.box-primary {
            padding: 15px 40px;
            height: 100%;
            box-shadow: none;
          }

          .container-fuild {
            margin: 80px 120px;
            width: 700px;
            height: 100%;
            border: 1px solid #ebebeb;
            border-radius: 0px;
          }
          .container-payment {
            margin: 80px 120px;
            width: 980px;
            height: 100%;
            border: none;
            border-radius: 0px;
            background-color: rgba(35, 35, 35, 0.3);
          }
          .container-locums {
            margin: 80px 120px;
            width: 980px;
            height: 100%;
            border: none;
            border-radius: 0px;
            background-color: rgba(35, 35, 35, 0.3);
          }
          .col-xs-5 {
            font-weight: 500;
            color: #fff;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            padding: 0px;
            margin: 0px;
            width: 250px;
          }
          .col-xs-7 {
            padding: 0px;
            margin: 0px;
            width: 380px;
          }
          .col-xs-7 p {
            margin-top: 10px;
            color: white;
          }
          .box .row {
            margin-top: 15px;
          }
          td,
          td,
          th {
            padding: 8px;
            height: 40px;
            width: 142px;
            text-align: center;
            color: white;
          }

          table {
            width: 100%;
          }
          input[type="number"] {
            outline: none;
            height: 40px;
            width: 80px;
            padding: 4px 8px;
            font-size: 18px;
            font-weight: 800;
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            appearance: none;
          }

          input[type="submit"] {
            height: 48px;
            border-radius: 4px;
            color: white;
            background-color: #2ed9c3;
            text-align: center;
            border-color: #2ed9c3;
            box-sizing: border-box;
            margin-top: 20px;
            width: 200px;
            cursor: pointer;
            line-height: 48px;
            outline: none;
            font-weight: 800;
            padding: 0;
            font-size: 20px;
          }
          /*Social media checkbox*/
          .social input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
          }
          .social input[type="checkbox"] + label {
            margin: 0 0 0 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 200;
            float: left;
            margin: 0px;
            width: 100%;
          }
          .social input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: 50px;
            top: 0px;
            width: 25px;
            height: 25px;
            display: block;
            background: white;
            border-radius: 4px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .social input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: 48px;
            top: -2px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }

          /*Highlightcheckbox*/
          .highlight input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
          }
          .highlight input[type="checkbox"] + label {
            margin: 0 0 0 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 200;
            float: left;
            margin: 0px;
            width: 100%;
          }
          .highlight input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: 50px;
            top: 0px;
            width: 25px;
            height: 25px;
            display: block;
            background: white;
            border-radius: 4px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .highlight input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: 48px;
            top: -2px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-size: 20px;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }
          /*Slidekey*/

          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
          .checkbox-btn {
            position: relative;
            width: 130px;
            height: 30px;
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
            width: 100%;
            height: 100%;
            background-color: transparent;
            border-radius: 4px;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
          }
          .checkbox-btn div .slidekey {
            position: absolute;
            width: 50px;
            height: 30px;
            top: 0;
            left: 0;
            text-align: center;
            background-color: #000;
            transition: 0.5s ease-in-out 0ms;
          }
          .checkbox-btn input:checked + div .slidekey {
            transform: translateX(76px);
          }
          .checkbox-btn .slidekey:before {
            content: "Enabled";
            position: absolute;
            height: 100%;
            width: 76px;
            text-align: center;
            top: 0;
            left: -76px;
            line-height: 26px;
            background-color: #2ed9c3;
            color: white;
            font-size: 14px;
            font-weight: 500;
          }
          .checkbox-btn .slidekey:after {
            content: "Disabled";
            background-color: #2b2b2b;
            color: white;
            position: absolute;
            height: 100%;
            width: 76px;
            text-align: center;
            top: 0;
            right: -76px;
            line-height: 26px;
            font-size: 14px;
            font-weight: 500;
          }

          @media only screen and (max-width: 768px) {
            .container-payment {
              margin: 40px auto;
              width: 430px;
            }
            .container-locums {
              margin: 40px auto;
              width: 430px;
            }

            input[type="number"] {
              width: 60px;
            }
            input[type="submit"] {
              width: 100%;
            }
            .container-payment .box-primary table tr th:nth-child(5) {
              display: none;
            }
            .container-payment .box-primary table tr td:nth-child(5) {
              display: none;
            }
            .container-payment .box-primary table tr th:nth-child(6) {
              display: none;
            }
            .container-payment .box-primary table tr td:nth-child(6) {
              display: none;
            }
            .container-payment .box-primary .checkbox-btn {
              width: 100px;
            }
            .checkbox-btn .slidekey:before {
              content: "Enabled";
              width: 76px;
            }
            .checkbox-btn .slidekey:after {
              content: "Disabled";
              width: 130px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ApaymentConsole;
