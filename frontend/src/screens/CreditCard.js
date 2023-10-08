import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState, useRef } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import ReactGA from "react-ga4";

const CreditCard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let code = params.get("accessCode");

  const nanoslug = pathname.split("/")[2];
  const [last4, setLast4] = useState("");
  const [candidate, setCandidate] = useState({});
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [noDays, setNoDays] = useState("");
  const [, setAccessCode] = useState("");
  const [close, setClose] = useState(false);
  const [isloaded, setIsloaded] = useState(false);

  // ============ PROFILE DATA ===========
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/candidate/" +
          nanoslug
      )
      .then((response) => {
        if (response.status === 200) {
          setCandidate(response.data.candidate);
          setStartDate(response.data.startDate);
          setFinishDate(response.data.finishDate);
          setNoDays(response.data.noDays);
          setAccessCode(code);
          if (code !== null) {
            ReactSession.set("accessCode", code);
          }
        }
        window.history.pushState({}, document.title, "/payment/" + nanoslug);
      });
  }, []);

  // ============ EXISTING CARD DATA ===========
  const [existingCard, setExistingCard] = useState({});
  const inputRef = useRef(null);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "api/payment/anyCard/" + user.email
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.existingCard === null) {
            setShow(false);
            setExistingCard(null);
            setLast4("");
          } else {
            setShow(true);
            setExistingCard(response.data.existingCard);
            setLast4(response.data.last4);
          }
        }
      });
  }, []);

  // ============ SAVED CREDIT CARD DATA ===========
  const displayCard = () => {
    setCardName(existingCard.cardName);
    setCardNumber(existingCard.cardNumber);
    setExpiry(existingCard.expiry);
    setShow(true);
    setState((prev) => ({ ...prev, ["number"]: existingCard.cardNumber }));
    setState((prev) => ({ ...prev, ["name"]: existingCard.cardName }));
    setState((prev) => ({ ...prev, ["expiry"]: existingCard.expiry }));
  };

  // =============== STORE CREDIT CARD =============
  const storeCard = async (e, email) => {
    e.preventDefault();

    if (show === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/payment/removeCard/${email}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            save_card: false,
            cardNumber: null,
            cardName: null,
            expiry: null,
          }),
        }
      );
      const data = await res.json();

      if (data) {
        setShow(false);
      }
    }

    if (
      show === false &&
      cardName &&
      cardNumber.length >= 18 &&
      expiry.length === 5
    ) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/payment/storeCard/${email}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            save_card: true,
            cardNumber: cardNumber,
            cardName: cardName,
            expiry: expiry,
          }),
        }
      );
      const data = await res.json();

      if (data) {
        setShow(true);
      }
    }
  };

  // =============== CREDIT CARD DETAILS =============
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [cardName, setCardName] = useState("");
  const [vanishName, setVanishName] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [vanishCard, setVanishCard] = useState(true);
  const [expiry, setExpiry] = useState("");

  const [vanishExpiry, setVanishExpiry] = useState(true);
  const [cvv, setCvv] = useState("");
  const [vanishCvv, setVanishCvv] = useState(true);
  const [show, setShow] = useState(false);

  const spaceInFour = (e) => {
    const { name, value } = e.target;
    const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
    let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

    if (inputNumbersOnly.length > 16) {
      //If entered value has a length greater than 16 then take only the first 16 digits
      inputNumbersOnly = inputNumbersOnly.substr(0, 16);
    }

    // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
    const splits = inputNumbersOnly.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
      spacedNumber = splits.join(" "); // Join all the splits with an empty space
    }
    setState((prev) => ({ ...prev, [name]: value }));
    setCardNumber(spacedNumber);
  };

  const addSlash = (e) => {
    const { name, value } = e.target;
    const slash = value.replace(/^(\d{2})(\d{2})/, "$1/$2");
    setState((prev) => ({ ...prev, [name]: value }));
    setExpiry(slash);
  };

  const addCvv = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
    setCvv(value);
  };

  const nameOnCard = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setCardName(value);
  };
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  // ============ LOCUM PLANS ===========
  const [locumPayment, setLocumPayment] = useState(false);

  const [locumMin1, setLocumMin1] = useState("");
  const [, setLocumMax1] = useState("");
  const [locumFee1, setLocumFee1] = useState("");
  const [locumDiscount1, setLocumDiscount1] = useState("");

  const [locumMin2, setLocumMin2] = useState("");
  const [, setLocumMax2] = useState("");
  const [locumFee2, setLocumFee2] = useState("");
  const [locumDiscount2, setLocumDiscount2] = useState("");

  const [locumMin3, setLocumMin3] = useState("");
  const [, setLocumMax3] = useState("");
  const [locumFee3, setLocumFee3] = useState("");
  const [locumDiscount3, setLocumDiscount3] = useState("");

  const [locumMin4, setLocumMin4] = useState("");
  const [, setLocumMax4] = useState("");
  const [locumFee4, setLocumFee4] = useState("");
  const [locumDiscount4, setLocumDiscount4] = useState("");

  const [locumMin5, setLocumMin5] = useState("");
  const [, setLocumMax5] = useState("");
  const [locumFee5, setLocumFee5] = useState("");
  const [locumDiscount5, setLocumDiscount5] = useState("");

  const [locumMin6, setLocumMin6] = useState("");
  const [, setLocumMax6] = useState("");
  const [locumFee6, setLocumFee6] = useState("");
  const [locumDiscount6, setLocumDiscount6] = useState("");

  const [locumMin7, setLocumMin7] = useState("");
  const [, setLocumMax7] = useState("");
  const [locumFee7, setLocumFee7] = useState("");
  const [locumDiscount7, setLocumDiscount7] = useState("");

  const [locumMin8, setLocumMin8] = useState("");
  const [, setLocumMax8] = useState("");
  const [locumFee8, setLocumFee8] = useState("");
  const [locumDiscount8, setLocumDiscount8] = useState("");

  const [locumMin9, setLocumMin9] = useState("");
  const [locumMax9, setLocumMax9] = useState("");
  const [locumFee9, setLocumFee9] = useState("");
  const [locumDiscount9, setLocumDiscount9] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "api/payments_plans/storedPlans")
      .then((response) => {
        if (response.status === 200) {
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
        }
      });
  }, [noDays]);

  // ============ FEE & GST CALCULATIONS ===========
  const [locumFee, setLocumFee] = useState("");
  const [gst, setGst] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    // LOCUM PLAN 1
    if (noDays >= locumMin1 && noDays < locumMin2) {
      const num = parseInt(locumFee1).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee1 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount1) {
        const dis = parseInt(locumDiscount1).toFixed(2);
        setDiscount(dis);
        const totale = locumFee1 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 2
    if (noDays >= locumMin2 && noDays < locumMin3) {
      const num = parseInt(locumFee2).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee2 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount2) {
        const dis = parseInt(locumDiscount2).toFixed(2);
        setDiscount(dis);
        const totale = locumFee2 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 3
    if (noDays >= locumMin3 && noDays < locumMin4) {
      const num = parseInt(locumFee3).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee3 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount3) {
        const dis = parseInt(locumDiscount3).toFixed(2);
        setDiscount(dis);
        const totale = num * (1 - dis / 100);
        const number = parseInt(totale).toFixed(2);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 4
    if (noDays >= locumMin4 && noDays < locumMin5) {
      const num = parseInt(locumFee4).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee4 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount4) {
        const dis = parseInt(locumDiscount4).toFixed(2);
        setDiscount(dis);
        const totale = locumFee4 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 5
    if (noDays >= locumMin5 && noDays < locumMin6) {
      const num = parseInt(locumFee5).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee5 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount5) {
        const dis = parseInt(locumDiscount5).toFixed(2);
        setDiscount(dis);
        const totale = locumFee5 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 6
    if (noDays >= locumMin6 && noDays < locumMin7) {
      const num = parseInt(locumFee6).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee6 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount6) {
        const dis = parseInt(locumDiscount6).toFixed(2);
        setDiscount(dis);
        const totale = locumFee6 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 7
    if (noDays >= locumMin7 && noDays < locumMin8) {
      const num = parseInt(locumFee7).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee7 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount7) {
        const dis = parseInt(locumDiscount7).toFixed(2);
        setDiscount(dis);
        const totale = locumFee7 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 8
    if (noDays >= locumMin8 && noDays < locumMin9) {
      const num = parseInt(locumFee8).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee8 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount8) {
        const dis = parseInt(locumDiscount8).toFixed(2);
        setDiscount(dis);
        const totale = locumFee8 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
    // LOCUM PLAN 9
    if (noDays >= locumMin9 && noDays < locumMax9) {
      const num = parseInt(locumFee9).toFixed(2);
      const xGST = (num / 1.1).toFixed(2);
      setLocumFee(xGST);
      const GST = (locumFee9 - xGST).toFixed(2);
      setGst(GST);
      if (locumDiscount8) {
        const dis = parseInt(locumDiscount9).toFixed(2);
        setDiscount(dis);
        const totale = locumFee9 * (1 - dis / 100);
        const real_discount = (totale - GST - xGST).toFixed(2);
        setDiscount(real_discount);
        setTotal(totale.toFixed(2));
      } else {
        setTotal(num);
      }
    }
  }, [
    noDays,
    locumDiscount1,
    locumDiscount2,
    locumDiscount3,
    locumDiscount4,
    locumDiscount5,
    locumDiscount6,
    locumDiscount7,
    locumDiscount8,
    locumDiscount9,
  ]);

  // =========== LOCUM PAYMENT DISABLED (FREE) =============
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloaded(true);
    try {
      fetch(process.env.REACT_APP_BACKEND_URL + "api/payment/nopayment", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          isPaidLocum: true,
          nanoslug: nanoslug,
          isSelected: true,
          isActiveJob: false,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // GA4 Event
            ReactGA.event({
              category: "Post Locum Ad",
              action: "Locum Ad No Charge",
            });
            navigate("/payment_success");
            setIsloaded(false);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Ad Payment | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
          />

          <meta name="description" content="Medclicker" />
        </Helmet>
        <nav>
          <div className="dashboard">
            <Link to="/">
              <div className="logo">
                <img src="/images/medclicker.png" className="logo" alt="" />
              </div>
            </Link>
          </div>
        </nav>

        <div className="wrap">
          <main>
            <aside className={close ? "moveback" : "movehere"}>
              {close ? (
                <button id="close-btn" onClick={() => setClose(false)}>
                  <span className="material-icons-sharp">menu_open</span>
                </button>
              ) : (
                <button id="close-btn" onClick={() => setClose(true)}>
                  <span className="material-icons-sharp">close</span>
                </button>
              )}
              <div className="sidebar">
                <Link to="/dashboard" className="active">
                  <span className="material-icons-sharp">dashboard</span>
                  <h4>Dashboard Home</h4>
                </Link>
                <Link to="/listingmanager">
                  <span className="material-symbols-outlined">undo</span>
                  <h4>Go back</h4>
                </Link>
              </div>

              {/* END OF SIDEBAR */}
            </aside>

            <section className="middle">
              <div className="myaccountbox">
                {locumPayment ? (
                  <div className="leftBox">
                    <div className="insideBox">
                      <form
                        id="payment_form"
                        method={"POST"}
                        action={`https://secure-au.sandbox.ewaypayments.com/AccessCode/${ReactSession.get(
                          "accessCode"
                        )}`}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <h2>Payment Details</h2>
                          </div>
                          <div>
                            {existingCard !== null ? (
                              existingCard.save_card === true ? (
                                <button
                                  className="previousCard"
                                  onClick={() => {
                                    displayCard();
                                    inputRef.current.focus();
                                  }}
                                  type="button"
                                >
                                  Saved card Ending{" ****"}
                                  {last4}
                                </button>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src="/images/visa.png"
                            alt="MasterCard"
                            style={{ width: "50px" }}
                          />
                          <img
                            src="/images/mc.png"
                            alt="MasterCard"
                            style={{ width: "50px" }}
                          />
                          <img
                            src="/images/amex.png"
                            alt="MasterCard"
                            style={{
                              width: "35px",
                              height: "35px",
                              alignSelf: "center",
                            }}
                          />
                        </div>
                        <Cards
                          number={state.number}
                          expiry={state.expiry}
                          cvc={state.cvc}
                          name={state.name}
                          focused={state.focus}
                          locale={{ valid: "VALID THRU" }}
                        />
                        <input
                          type="hidden"
                          id="code"
                          name="EWAY_ACCESSCODE"
                          value={ReactSession.get("accessCode")}
                        />
                        <input
                          type="hidden"
                          name="EWAY_PAYMENTTYPE"
                          value="Credit Card"
                        />
                        <input
                          type="hidden"
                          name="EWAY_CARDNAME"
                          value={cardName}
                        />
                        <input
                          type="hidden"
                          value={cardNumber}
                          name="EWAY_CARDNUMBER"
                        />
                        <input
                          type="hidden"
                          name="EWAY_CARDEXPIRYMONTH"
                          value={expiry.split("/")[0]}
                        />
                        <input
                          type="hidden"
                          name="EWAY_CARDEXPIRYYEAR"
                          value={expiry.split("/")[1]}
                        />
                        <input
                          type="hidden"
                          value={state.cvc}
                          name="EWAY_CARDCVN"
                        />
                        <div className="input-group first">
                          <input
                            type="text"
                            autoComplete="off"
                            name="name"
                            id="name"
                            onKeyPress={(event) => {
                              if (!/[a-zA-Z-' ]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            value={cardName}
                            placeholder={!vanishName ? "Name on card" : ""}
                            maxLength={50}
                            onBlur={() => {
                              setVanishName(true);
                            }}
                            onFocus={(e) => {
                              setVanishName(false);
                              handleInputFocus(e);
                            }}
                            style={{
                              borderBottom: !vanishName
                                ? "2px solid green"
                                : "2px solid #222",
                            }}
                            className={
                              vanishName && cardName !== ""
                                ? "name_on_card springbok"
                                : "name_on_card"
                            }
                            onChange={(e) => {
                              nameOnCard(e);
                            }}
                          />
                          <label htmlFor="name">Name on card</label>
                        </div>
                        <div className="input-group creditcard">
                          <div>
                            <input
                              type="text"
                              id="card_number"
                              name="number"
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              autoComplete="off"
                              value={cardNumber}
                              placeholder={
                                !vanishCard ? "Enter at least 13 digits" : ""
                              }
                              maxLength={19}
                              onBlur={() => {
                                setVanishCard(true);
                              }}
                              onFocus={(e) => {
                                setVanishCard(false);
                                handleInputFocus(e);
                              }}
                              style={{
                                borderBottom:
                                  !vanishExpiry || !vanishCvv || !vanishCard
                                    ? "2px solid green"
                                    : "2px solid #222",
                              }}
                              className={
                                vanishCard && cardNumber !== ""
                                  ? "no_on_card springbok"
                                  : "no_on_card"
                              }
                              onChange={(e) => {
                                spaceInFour(e);
                              }}
                            />
                            <label htmlFor="card_number">Card Number</label>
                          </div>
                          <div>
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              autoComplete="off"
                              maxLength={5}
                              onKeyPress={(event) => {
                                if (!/[0-9/]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder={!vanishExpiry ? "MM/YY" : ""}
                              value={expiry}
                              onChange={(e) => {
                                addSlash(e);
                              }}
                              onBlur={() => {
                                setVanishExpiry(true);
                              }}
                              onFocus={(e) => {
                                setVanishExpiry(false);
                                handleInputFocus(e);
                              }}
                              style={{
                                borderBottom:
                                  !vanishExpiry || !vanishCvv || !vanishCard
                                    ? "2px solid green"
                                    : "2px solid #222",
                              }}
                              className={
                                vanishExpiry && expiry !== ""
                                  ? "expiry springbok"
                                  : "expiry"
                              }
                            />
                            <label htmlFor="expiry">Expiry</label>
                          </div>
                          <div>
                            <input
                              type="text"
                              id="cvv"
                              name="cvc"
                              autoComplete="off"
                              maxLength={cardNumber.length === 18 ? 4 : 3}
                              ref={inputRef}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder={!vanishCvv ? "CVV" : ""}
                              value={state.cvc}
                              onChange={(e) => {
                                addCvv(e);
                              }}
                              onBlur={() => {
                                setVanishCvv(true);
                              }}
                              onFocus={(e) => {
                                setVanishCvv(false);
                                handleInputFocus(e);
                              }}
                              style={{
                                borderBottom:
                                  !vanishCvv || !vanishCard || !vanishExpiry
                                    ? "2px solid green"
                                    : "2px solid #222",
                              }}
                              className={
                                vanishCvv && cvv !== ""
                                  ? "cvv springbok"
                                  : "cvv"
                              }
                            />
                            <label htmlFor="cvv">CVV</label>
                          </div>
                        </div>
                        {show ? (
                          <>
                            <input
                              type="checkbox"
                              id="saveCard"
                              checked={show ? true : false}
                              onChange={(e) => {
                                storeCard(e, user.email);
                              }}
                            />
                            <label htmlFor="saveCard">
                              Save this card for future payments
                            </label>
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              id="saveCardB"
                              v
                              checked={show ? true : false}
                              onChange={(e) => {
                                storeCard(e, user.email);
                              }}
                            />
                            <label htmlFor="saveCardB">
                              Save this card for future payments
                            </label>
                          </>
                        )}

                        {cardName &&
                        expiry.length === 5 &&
                        cardNumber.length >= 18 &&
                        cvv.length >= 3 ? (
                          <button type="submit">Pay</button>
                        ) : (
                          <button type="button" disabled>
                            Pay
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="gridBox">
                  {!locumPayment ? (
                    <form onSubmit={onSubmit}>
                      <div className="rightBoxNoPayment">
                        <div className="insideBox">
                          <h2>
                            {candidate.firstName} {candidate.lastName}
                          </h2>

                          <h3>
                            From {candidate.suburb}, {candidate.state}
                          </h3>
                          <div className="container-date">
                            <p>Commitment dates:</p>
                            <div className="row">
                              <div className="col-xs-8">
                                <p className="calendar"> Start Date</p>
                              </div>
                              <div className="col-xs-4">
                                <p>{startDate}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xs-8">
                                <p className="calendar"> Finish Date</p>
                              </div>
                              <div className="col-xs-4">
                                <p>{finishDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="container-locum">
                            <p>Locum details:</p>
                            <div className="row">
                              <div className="col-xs-8">
                                <p className="aircraft">
                                  {" "}
                                  {candidate.locum_airport}
                                </p>
                              </div>
                              <div className="col-xs-4"></div>
                            </div>
                            <div className="row">
                              <div className="col-xs-8">
                                {candidate.locum_payroll ===
                                "Yes, I have an ABN." ? (
                                  <p className="yes"> Have ABN</p>
                                ) : (
                                  <p className="forbid"> No ABN</p>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xs-8">
                                {candidate.locum_ahpra ===
                                "I declare that I am registered with AHPRA." ? (
                                  <p className="yes"> AHPRA Registered</p>
                                ) : (
                                  <p className="forbid"> No AHPRA</p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="container-details">
                            <p>Payment details:</p>
                            <div className="row">
                              <div className="col-xs-8">
                                <p className="yes"> Recruitment Fees</p>
                              </div>
                              <div className="col-xs-4">
                                <p>No Charge</p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xs-8">
                                <p className="yes">GST</p>
                              </div>
                              <div className="col-xs-4">
                                <p>AUD ---</p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xs-8">
                                <p className="yes">Discounts</p>
                              </div>
                              <div className="col-xs-4">
                                <p>AUD ---</p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xs-8">
                                <p className="yes total">Total (incl. GST)</p>
                              </div>
                              <div className="col-xs-4">
                                <p className="price">AUD ---</p>
                              </div>
                            </div>
                          </div>

                          <div className="container-refund">
                            {!isloaded ? (
                              <input
                                type="submit"
                                className="noLocumPayment"
                                value="Confirm"
                              />
                            ) : (
                              <button type="button" className="noLocumPayment">
                                <ThreeDots
                                  type="ThreeDots"
                                  height={40}
                                  width={80}
                                  color={"white"}
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="rightBox">
                      <div className="insideBox">
                        <h2>{candidate.firstName}</h2>

                        <h3>
                          From {candidate.suburb}, {candidate.state}
                        </h3>
                        <div className="container-date">
                          <p>Commitment dates:</p>
                          <div className="row">
                            <div className="col-xs-8">
                              <p className="calendar"> Start Date</p>
                            </div>
                            <div className="col-xs-4">
                              <p>{startDate}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-8">
                              <p className="calendar"> Finish Date</p>
                            </div>
                            <div className="col-xs-4">
                              <p>{finishDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="container-locum">
                          <p>Locum details:</p>
                          <div className="row">
                            <div className="col-xs-8">
                              <p className="aircraft">
                                {" "}
                                {candidate.locum_airport}
                              </p>
                            </div>
                            <div className="col-xs-4"></div>
                          </div>
                          <div className="row">
                            <div className="col-xs-8">
                              {candidate.locum_payroll ===
                              "Yes, I have an ABN." ? (
                                <p className="yes"> Have ABN</p>
                              ) : (
                                <p className="forbid"> No ABN</p>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-8">
                              {candidate.locum_ahpra ===
                              "I declare that I am registered with AHPRA." ? (
                                <p className="yes"> AHPRA Registered</p>
                              ) : (
                                <p className="forbid"> No AHPRA</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="container-details">
                          <p>Payment details:</p>
                          <div className="row">
                            <div className="col-xs-8">
                              <p className="yes"> Recruitment Fees</p>
                            </div>
                            <div className="col-xs-4">
                              <p>AUD {locumFee}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xs-8">
                              <p className="yes">GST</p>
                            </div>
                            <div className="col-xs-4">
                              <p>AUD {gst}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xs-8">
                              <p className="yes">Discounts</p>
                            </div>
                            <div className="col-xs-4">
                              {!discount ? <p>---</p> : <p>AUD {discount}</p>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-xs-8">
                              <p className="yes total">Total (incl. GST)</p>
                            </div>
                            <div className="col-xs-4">
                              <p className="price">AUD {total}</p>
                            </div>
                          </div>
                        </div>

                        <div className="container-refund">
                          <p>
                            <b>Attention:</b> Learn more about our{" "}
                            <Link target="_blank" to="/refund_au">
                              Refund Policy
                            </Link>
                            .{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            {/* END OF MIDDLE */}
          </main>

          <Footer />
        </div>
        <style jsx="true">{`
        /* ============ RIGHT BOX =============== */
          .rightBox {
            position: relative;
            background-color: white;
            width: 380px;
            margin-right: 10px;
            border-radius: 5px;
            border-top: 5px solid #14a248;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }

           .rightBoxNoPayment {
            position: relative;
            background-color: white;
            width: 380px;
            margin-right: 10px;
            border-radius: 5px;
            border-top: 5px solid #14a248;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          } 
          }

           .rightBoxNoPayment h2 {
            font-size: 1.6rem;
            word-break: break-word;
            letter-spacing: -0.02em;
            margin-bottom: 10px;
            color: #2b2b2b;
            margin-top: 15px;
            font-weight: 800;
          }

          .rightBoxNoPayment .insideBox {
            height: 565px;
          } 
          

          .rightBox h2 {
            font-size: 1.6rem;
            word-break: break-word;
            letter-spacing: -0.02em;
            margin-bottom: 10px;
            color: #2b2b2b;
            margin-top: 15px;
            font-weight: 800;
          }

          .container-date {
            position: relative;
            width: 100%;
            top: 0%;
            left: 0%;
            outline: none;
            z-index: 1000;
          }

          .container-date p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }

          .container-date .row {
            display: flex;
            justify-content: space-between;
          }

          .container-date .row p {
            width: 100%;
            padding-left: 22px;
          }
          .container-date .row {
            margin-left: 4px;
            width: 100%;
          }
          .container-date .col-xs-4 p {
            text-align: right;
          }
          .container-date .col-xs-8 {
            padding-left: 0;
            padding-right: 0;
          }

          .container-locum {
            position: relative;
            width: 100%;
            top: 5%;
            left: 0%;
            outline: none;
            z-index: 1000;
          }
          .container-locum p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }
          .container-locum .row {
            display: flex;
            justify-content: space-between;
          }
          .container-locum .row p {
            width: 100%;
            padding-left: 22px;
          }
          .container-locum .row {
            margin-left: 4px;
            width: 100%;
          }

          .container-details {
            position: relative;
            width: 100%;
            top: 10%;
            left: 0%;
            outline: none;
            z-index: 1000;
          }

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

          .container-details .total {
            color: #333;
            font-weight: 800;
            font-size: 18px;
          }
          .container-details .price {
            color: #14a248;
            font-weight: 800;
            font-size: 18px;
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
          .calendar {
            background-image: url("./../../images/calendarmarker.png");
            background-repeat: no-repeat;
            background-position: 1px 2px;
            background-size: 18px;
          }
          .pig {
            background-image: url("./../../images/pigmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .yes {
            background-image: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-position: 0px 2px;
            background-size: 18px;
          }
          .forbid {
            background-image: url("./../../images/forbid.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .aircraft {
            background-image: url("./../../images/aircraft.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .pencil {
            background-image: url("./../../images/pencilmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }

          .container-refund {
            position: relative;
            left: 0%;
            width: 100%;
            top: 11%;
          }
          .container-refund p {
            margin: 6px auto;
            color: #777;
            width: 100%;
            font-size: 14px;
            font-weight: 100;
            font-family: sans-serif;
          }
          .container-refund .row p {
            width: 100%;
            padding-left: 22px;
          }
          .insideBox .container-refund a {
            color: #008489;
            font-weight: 700;
            display: inline;
          }

          /* ======== ROOT CSS VARIABLES ========== */

          :root {
            --color-white: white;
            --color-light: #f0eff5;
            --color-gray-light: #89848c;
            --color-gray-dark: #56555e;
            --color-dark: #27282f;
            --color-primary: #14a248;
            --color-success: rgb(34, 202, 75);
            --color-danger: rgb(255, 67, 54);
            --color-warning: rgb(234, 181, 7);
            --color-purple: rgb(160, 99, 245);

            --color-primary-light: rgba(71, 7, 234, 0.2);
            --color-success-light: rgba(34, 202, 75, 0.2);
            --color-danger-light: rgba(255, 67, 54, 0.2);
            --color-purple-light: rgba(160, 99, 245, 0.2);

            --card-padding: 1.6rem;
            --padding-1: 1rem;
            --padding-2: 8px;

            --card-border-radius: 1.6rem;
            --border-radius-1: 1rem;
            --border-radius-2: 6px;
          }

          * {
            margin: 0;
            padding: 0;
            outline: 0;
            border: 0;
            appearance: none;
            list-style: none;
            text-decoration: none;
            box-sizing: border-box;
          }
          html {
            font-size: 12px;
          }

          body {
            background-color: var(--color-light);
            font-family: "Noto Sans TC", sans-serif;
            min-height: 100vh;
            color: var(--color-dark);
          }
          h1 {
            font-size: 2.2rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          h3 {
            font-size: 1.2rem;
          }
          h4 {
            font-size: 1rem;
          }
          h5 {
            font-size: 0.86rem;
            font-weight: 500;
          }

          h6 {
            font-size: 0.76rem;
          }

          p {
            font-size: 0.86rem;
            color: var(--color-gray-dark);
          }

          /* ============== NAV BAR ============= */

          nav {
            width: 100%;
            background-color: var(--color-white);
            padding: 1rem 0;
            height: 65px;
          }

          nav .dashboard {
            position: relative;
            display: flex;
            margin: 0 auto;
            width: 96%;
            align-items: center;
            height: 35px;
            line-height: 35px;
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

          nav .profile-area .theme-btn {
            display: flex;
            background: var(--color-light);
            width: 5rem;
            height: 2rem;
            cursor: pointer;
            border-radius: var(--border-radius-2);
          }

          nav .profile-area .theme-btn span {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
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

          /* ============ ASIDE & SIDEBAR ============ */
          main {
            display: grid;
            grid-template-columns: 18rem auto 30rem;
            gap: 2rem;
            width: 96%;
            margin: 1rem auto 4rem;
            z-index: 2000;
          }

          main aside {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 88vh;
            transform: translateX(0%);
            z-index: 2000;
          }
          main .moveback {
            transform: translateX(-80%);
            transition: all 300ms ease;
          }
          main .movehere {
            transform: translateX(0%);
            transition: all 300ms ease;
            z-index: 2000;
          }
          main .sidebar .alertCircle {
            height: 20px;
            width: 20px;
            background-color: #e40000;
            color: white;
            font-size: 12px;
            border-radius: 50%;
            text-align: center;
            line-height: 18px;
            position: absolute;
            transform: translate(-450%, -20%);
          }

          /* will be shown only on mobile and tablets */
          main aside button#close-btn {
            display: none;
          }

          main aside button#close-btn:focus,
          main aside button#close-btn:active {
            outline: none;
          }

          main aside .sidebar a {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            height: 4.2rem;
            color: var(--color-gray-light);
            position: relative;
          }
          main aside .sidebar {
            background-color: white;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          main aside .sidebar a:hover {
            background-color: var(--color-light);
          }

          main aside .sidebar a span {
            font-size: 1.7rem;
            margin-left: 3rem;
            transition: all 300ms ease;
          }

          main aside .sidebar a.active {
            background: var(--color-white);
            color: var(--color-primary);
          }

          main aside .sidebar a.active:before {
            content: "";
            width: 6px;
            height: 100%;
            position: absolute;
            background: var(--color-primary);
          }

          main aside .sidebar a:hover {
            color: var(--color-primary);
          }

          main aside .sidebar a:hover span {
            margin-left: 2rem;
          }

          main aside .sidebar h4 {
            font-weight: 500;
          }
          .sidebar .disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          main aside .sidebar .disabled:hover {
            color: #888;
          }

          /* ============= MIDDLE SECTION ============= */
          .myaccountbox {
            margin-top: 30px;
            display: flex;
            justify-content: space-bewtween;
            width: 880px;
          }

          .insideBox form .previousCard {
            border: 1px solid #14a248;
            border-radius: 4px;
            background-color: #fff;
            height: 30px;
            color: #14a248;
            margin: 12px auto 15px;
            padding: 0 1px;
            width: 195px;
          }

          .leftBox {
            position: relative;
            background-color: white;
            width: 430px;
            margin-right: 10px;
            border-radius: 5px;
            border-top: 5px solid #14a248;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }

          .leftBox h2 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 400;
            letter-spacing: -0.02em;
            margin-bottom: 18px;
          }
          .leftBox h4 {
            color: rgba(99, 106, 109);
            font-weight: 100;
            font-family: "Noto Sans TC", sans-serif;
            font-size: 14px;
            margin-bottom: 16px;
          }
          .leftBox h3 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 400;
            letter-spacing: -0.02em;
            margin-bottom: 0px;
          }

          .leftBox p {
            font-size: 28px;
            font-weight: 600;
          }

          .creditcard {
            background-image: url("./../../images/creditcard.png");
            background-repeat: no-repeat;
            background-position: 5px 15px;
            background-size: 25px;
          }

          .myaccountbox .insideBox .input-group {
            display: grid;
            grid-template-columns: 50% 25% 25%;
          }

          .insideBox .input-group.first {
            display: block;
            margin: 35px 0;
          }

          main section.midde .header {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          main section.middle .header input[type="date"] {
            padding: 0.5rem 2rem;
            border-radius: var(--border-radius-2);
            background: var(--color-white);
            color: var(--color-gray-dark);
          }

          main section.middle .cards {
            margin-top: 1rem;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }

          main section.middle .cards .card {
            background: linear-gradient(#ff796f, #bd261b);
            padding: var(--card-padding);
            border-radius: var(--card-border-radius);
            color: #fff;
            height: 16rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 2rem 3rem var(--color-danger-light);
            transition: all 300ms ease;
            min-width: 22rem;
          }

          main section.middle .cards .card:nth-child(2) {
            background: linear-gradient(#7f8191, #27282f);
            box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.2);
          }

          main section.middle .cards .card:nth-child(3) {
            background: linear-gradient(#5d70ff, #5719c2);
            box-shadow: 0 2rem 3rem var(--color-primary-light);
          }
          main section.middle .cards .card:hover {
            box-shadow: none;
          }

          main section.middle .card .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          main section.middle .card .top .left {
            display: flex;
            gap: 0.5rem;
          }
          main section.middle .card .top .left h2 {
            font-weight: 200;
            font-size: 1.4rem;
          }

          main section.middle .card .top .left img {
            width: 2.3rem;
            height: 2.3rem;
            border: 1px solid white;
            border-radius: var(--border-radius-2);
            padding: 0.4rem;
          }

          main section.middle .card .top .right img.right {
            width: 3.5rem;
          }

          main section.middle .card .middle {
            display: flex;
            justify-content: space-between;
          }

          main section.middle .card .middle .chip {
            width: 3.5rem;
          }
          main section.middle .card .bottom {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          main section.middle .card .bottom .right {
            display: flex;
            gap: 2rem;
          }

          .insideBox {
            display: block;
            margin: 0;
            position: relative;
            height: 100%;
            width: 100%;
            padding: 0 16px 25px;
          }
          .insideBox h2 {
            color: #2b2b2b;
            margin-top: 15px;
            font-weight: 800;
          }

          .insideBox button {
            border-radius: 4px;
            color: #fff;
            height: 50px;
            width: 140px;
            background-color: #14a248;
            cursor: pointer;
            position: relative;
            right: 0px;
          }

          .insideBox button:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          .insideBox button:focus,
          .insideBox button:active {
            outline: none;
          }

          .insideBox .name_on_card {
            background-color: rgba(234, 234, 234, 0.5);
            opacity: 0.9;
            height: 56px;
            color: #222;
            width: 100%;
            font-weight: 400;
            font-size: 16px;
            position: relative;
            padding-left: 37px;
            padding-top: 20px;
            height: 56px;
            border-bottom: 2px solid #222;
          }

          .insideBox .no_on_card {
            background-color: rgba(234, 234, 234, 0.5);
            opacity: 0.9;
            height: 56px;
            color: #222;
            width: 100%;
            font-weight: 400;
            font-size: 16px;
            position: relative;
            padding-left: 37px;
            padding-top: 20px;
            height: 56px;
            border-bottom: 2px solid #222;
          }

          .insideBox .expiry {
            background-color: rgba(234, 234, 234, 0.5);
            opacity: 0.9;
            height: 56px;
            color: #222;
            width: 100%;
            font-weight: 400;
            font-size: 16px;
            position: relative;
            padding-left: 37px;
            padding-top: 20px;
            height: 56px;
            border-bottom: 2px solid #222;
          }

          .insideBox .cvv {
            background-color: rgba(234, 234, 234, 0.5);
            opacity: 0.9;
            height: 56px;
            color: #222;
            width: 100%;
            font-weight: 400;
            font-size: 16px;
            position: relative;
            padding-left: 37px;
            padding-top: 20px;
            height: 56px;
            border-bottom: 2px solid #222;
          }

          .insideBox .input-group {
            display: block;
            margin-right: 20px;
            position: relative;
            height: 56px;
          }
          .insideBox .input-group div {
            position: relative;
          }

          .insideBox .input-group label {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 37px;
            font-family: "Noto Sans TC", sans-serif;
            font-size: 14px;
            color: #777;
            font-weight: 500;
            padding: 0px 0px;
            pointer-events: none;
            transition: all 200ms ease-in-out 0ms;
          }

          .input-group input:focus + label {
            transform: translate(-8px, -22px) scale(0.8);
            font-size: 13px;
            color: #14a248;
            opacity: 1;
          }

          .input-group input.springbok + label {
            transform: translate(-8px, -22px) scale(0.8);
            font-size: 13px;
            color: #14a248;
            opacity: 1;
          }

          .insideBox a {
            color: white;
            height: 100%;
            width: 100%;
            display: block;
            font-size: 14px;
          }

          .gridBox {
            background-color: transparent;
            width: 420px;
            border-radius: 5px;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-row-gap: 12px;
            grid-column-gap: 12px;
            margin-top: 0px;
          }

          .container-refund .noLocumPayment {
            width: 100%;
            color: white;
            background-color: #14a248;
            border-radius: 4px;
            cursor: pointer;
            height: 42px;
            position: relative;
            top: 5%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          /* =========== CHECKBOX ========== */

          input[type="checkbox"] {
            display: none;
          }
          input[type="checkbox"] label {
            color: red;
          }
          input[type="checkbox"] + label {
            position: relative;
            cursor: pointer;
            font-size: 16px;
            font-family: sans-serif;
            font-weight: 800;
            margin: 2px 0px 8px 35px;
            width: 97%;
            display: block;
            color: #2b2b2b;
            margin-bottom: 25px;
          }

          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -33px;
            top: 21px;
            width: 24px;
            height: 24px;
            display: block;
            background: white;
            border-radius: 0px;
            border: 2px solid rgb(218, 218, 218);
          }
          input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -31px;
            top: 24px;
            width: 19px;
            height: 19px;
            display: block;
            z-index: 1;
            background: url("./../../images/tick.png");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
            outline: 3px solid #14a248;
            border: none;
          }
          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

          /* ============ MEDIA QUERIES FOR TABLETS =========*/
          @media screen and (max-width: 1024px) {
            nav .search-bar {
              display: none;
            }
            nav .profile-area {
              gap: 2rem;
            }
            .rightBox {
              width: 430px;
            }
            .rightBox .insideBox {
              height: 560px;
            } 

             
             .rightBoxNoPayment {
              width: 430px;
            }
            .rightBoxNoPayment .insideBox {
              height: 565px;
            } 
            

            .myaccountbox {
              display: flex;
              flex-direction: column;
              margin-left: 40px;
              width: 400px;
            }
            .gridBox {
              margin-top: 20px;
            }

            main {
              grid-template-columns: 1fr;
            }

            main .moveback {
              transform: translateX(-80%);
              transition: all 300ms ease;
            }
            main .movehere {
              transform: translateX(0%);
              transition: all 300ms ease;
            }
            main aside {
              position: fixed;
              top: 0;
              left: -100%;
              z-index: 3;
              background: var(--color-white);
              width: 22rem;
              height: 100vh;
              box-shadow: 2rem 0 2rem var(--color-primary-light);
              display: "none";
              animation: showSidebar 500ms ease-in forwards;
            }

            @keyframes showSidebar {
              to {
                left: 0;
              }
            }

            main aside button#close-btn {
              display: inline-block;
              width: 3rem;
              height: 3rem;
              position: absolute;
              top: 1rem;
              right: 1rem;
              z-index: 4;
              background: transparent;
              color: var(--color-dark);
            }
            button:hover {
              cursor: pointer;
            }

            main aside .sidebar {
              margin-top: 4rem;
            }

            main aside .updates {
              display: none;
            }

            main section.middle .cards {
              grid-template-columns: 1fr 1fr;
            }

            main canvas {
              margin: 3rem 0 1rem;
            }

            main section.right .recent.transactions {
              margin-top: 3rem;
            }
          }

          /*  ====== MEDIA QUERIES FOR MOBILE PHONES */

          @media screen and (max-width: 768px) {
            footer .font-weight-light-mobile {
              display: block;
              color: #212529;
            }
            footer .font-weight-light {
              display: none !important;
            }

            main .moveback {
              transform: translateX(-80%);
              transition: all 300ms ease;
            }
            main .movehere {
              transform: translateX(0%);
              transition: all 300ms ease;
            }

            nav .profile-area {
              gap: 2.6rem;
            }
            nav .profile h5,
            nav .profile span {
              display: none;
            }

            main section.middle .cards {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default CreditCard;
