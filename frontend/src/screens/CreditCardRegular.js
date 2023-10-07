import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState, useRef } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useSelector } from "react-redux";

const CreditCardRegular = () => {
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);
  const [last4, setLast4] = useState("");
  // const today = new Date();
  // const [startDate, setStartDate] = useState("");
  // const [finishDate, setFinishDate] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const [close, setClose] = useState(false);
  const [regFee1, setRegFee1] = useState("");
  const [regFee2, setRegFee2] = useState("");
  const [regFee3, setRegFee3] = useState("");
  const [regDiscount1, setRegDiscount1] = useState("");
  const [regDiscount2, setRegDiscount2] = useState("");
  const [regDiscount3, setRegDiscount3] = useState("");
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

  // ============ STANDARD PLANS ===========
  const [regularPayment, setRegularPayment] = useState(false);
  const [start, setStart] = useState("");
  const [finish1, setFinish1] = useState("");
  const [finish2, setFinish2] = useState("");
  const [finish3, setFinish3] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "api/payments_plans/storedPlans")
      .then((response) => {
        if (response.status === 200) {
          setStart(response.data.start);
          setFinish1(response.data.finish1);
          setFinish2(response.data.finish2);
          setFinish3(response.data.finish3);
          setRegFee1(response.data.plans.regFee1.toFixed(2));
          setRegFee2(response.data.plans.regFee2.toFixed(2));
          setRegFee3(response.data.plans.regFee3.toFixed(2));
          setExpDays1(response.data.plans.expDays1);
          setExpDays2(response.data.plans.expDays2);
          setExpDays3(response.data.plans.expDays3);
          setRegDiscount1(response.data.plans.regDiscount1);
          setRegDiscount2(response.data.plans.regDiscount2);
          setRegDiscount3(response.data.plans.regDiscount3);
          setRegPlan1(response.data.plans.regPlan1);
          setRegPlan2(response.data.plans.regPlan2);
          setRegPlan3(response.data.plans.regPlan3);
          setNewsletter1(response.data.plans.newsletter1);
          setNewsletter2(response.data.plans.newsletter2);
          setNewsletter3(response.data.plans.newsletter3);
          setSocialMed1(response.data.plans.socialMed1);
          setSocialMed2(response.data.plans.socialMed2);
          setSocialMed3(response.data.plans.socialMed3);
          setRegularPayment(response.data.plans.regularPayment);
        }
      });
  }, []);

  // ============ FEE & GST CALCULATIONS ===========
  const [regFeeA, setRegFeeA] = useState("");
  const [regFeeB, setRegFeeB] = useState("");
  const [regFeeC, setRegFeeC] = useState("");
  const [gstA, setGstA] = useState("");
  const [gstB, setGstB] = useState("");
  const [gstC, setGstC] = useState("");
  const [discount1, setDiscount1] = useState("");
  const [discount2, setDiscount2] = useState("");
  const [discount3, setDiscount3] = useState("");
  const [regTotal1, setRegTotal1] = useState("");
  const [regTotal2, setRegTotal2] = useState("");
  const [regTotal3, setRegTotal3] = useState("");

  useEffect(() => {
    // PLAN A
    const num1 = parseInt(regFee1).toFixed(2);
    const xGST1 = (num1 / 1.1).toFixed(2);
    setRegFeeA(xGST1);
    const GST1 = (regFee1 - xGST1).toFixed(2);
    setGstA(GST1);
    if (regDiscount1) {
      const dis = parseInt(regDiscount1).toFixed(2);
      const totale = regFee1 * (1 - dis / 100);
      const real_discount = (totale - GST1 - xGST1).toFixed(2);
      setDiscount1(real_discount);
      setRegTotal1(totale.toFixed(2));
    } else {
      setRegTotal1(num1);
    }

    // PLAN B
    const num2 = parseInt(regFee2).toFixed(2);
    const xGST2 = (num2 / 1.1).toFixed(2);
    setRegFeeB(xGST2);
    const GST2 = (regFee2 - xGST2).toFixed(2);
    setGstB(GST2);
    if (regDiscount2) {
      const dis = parseInt(regDiscount2).toFixed(2);
      const totale = regFee2 * (1 - dis / 100);
      const real_discount = (totale - GST2 - xGST2).toFixed(2);
      setDiscount2(real_discount);
      setRegTotal2(totale.toFixed(2));
    } else {
      setRegTotal2(num2);
    }

    // PLAN C
    const num3 = parseInt(regFee3).toFixed(2);
    const xGST3 = (num3 / 1.1).toFixed(2);
    setRegFeeC(xGST3);
    const GST3 = (regFee3 - xGST3).toFixed(2);
    setGstC(GST3);
    if (regDiscount3) {
      const dis = parseInt(regDiscount3).toFixed(2);
      const totale = regFee3 * (1 - dis / 100);
      const real_discount = (totale - GST3 - xGST3).toFixed(2);
      setDiscount3(real_discount);
      setRegTotal3(totale.toFixed(2));
    } else {
      setRegTotal3(num3);
    }
  }, [regFee1, regFee2, regFee3]);

  // ========= SELECT PLANS TO GET ACCESS CODE ==========

  const [selectOne, setSelectOne] = useState(false);
  const [selectTwo, setSelectTwo] = useState(false);
  const [selectThree, setSelectThree] = useState(false);
  const [expireIn, setExpireIn] = useState("");

  const getAccessCode = async (e, regTotal, expireIn) => {
    e.preventDefault();
    const email = user.email;
    const { name } = e.target;
    if (name === "One") {
      setSelectOne(true);
      ReactSession.set("expireIn", expireIn);
    }
    if (name === "Two") {
      setSelectTwo(true);
      ReactSession.set("expireIn", expireIn);
    }
    if (name === "Three") {
      setSelectThree(true);
      ReactSession.set("expireIn", expireIn);
    }

    fetch(process.env.REACT_APP_BACKEND_URL + "api/payment/regularList", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        total: regTotal,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessCode) {
          setAccessCode(data.accessCode);
          ReactSession.set("accessCode", data.accessCode);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Std Ad Payment | Medclicker</title>
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
                <Link to="/question-review">
                  <span className="material-symbols-outlined">undo</span>
                  <h4>Go back</h4>
                </Link>
              </div>

              {/* END OF SIDEBAR */}
            </aside>

            <section className="middle">
              {regularPayment ? (
                <div
                  className={
                    selectThree || selectTwo || selectOne
                      ? "leftBox open"
                      : "leftBox"
                  }
                >
                  <div className="insideBox">
                    <form
                      id="payment_form"
                      method={"POST"}
                      action={`https://secure-au.sandbox.ewaypayments.com/AccessCode/${accessCode}`}
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
                        value={accessCode}
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
                              vanishCvv && cvv !== "" ? "cvv springbok" : "cvv"
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
                      cardNumber.length >= 18 &&
                      expiry.length === 5 &&
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

              {regPlan1 ? (
                <div
                  id={"selectdate-1"}
                  key={1}
                  className={
                    selectThree || selectTwo || selectOne
                      ? "rightBox open"
                      : "rightBox"
                  }
                  style={{
                    visibility: selectThree || selectTwo ? "hidden" : "visible",
                    transform:
                      (selectThree && "translate(180%,0%)") ||
                      (selectTwo && "translate(180%,0%)"),

                    animation:
                      selectThree || selectTwo
                        ? "keyframes 1200ms ease-in 0ms"
                        : "",
                  }}
                >
                  <div className="insideBox">
                    <h2>Click Lite</h2>
                    <div className="container-date">
                      <p>Listing dates:</p>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="calendar"> Start Date</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{start}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="calendar"> Finish Date</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{finish1}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container-regular">
                      <p>Details:</p>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="online"> Duration on-live</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{expDays1} days</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="pencil"> Listing changes</p>
                        </div>
                        <div className="col-xs-4">
                          <p>Unlimited</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="fb"> Social Media Exposure</p>
                        </div>
                        <div className="col-xs-4">
                          {socialMed1 ? <p>Included</p> : <p>Not included</p>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="email"> Newsletter</p>
                        </div>
                        <div className="col-xs-4">
                          {newsletter1 ? <p>Included</p> : <p>Not included</p>}
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="container-details">
                      <p>Payment details:</p>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes"> Click Lite</p>
                        </div>
                        <div className="col-xs-4">
                          <p>AUD {regFeeA}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes">GST</p>
                        </div>
                        <div className="col-xs-4">
                          <p>AUD {gstA}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes">Discounts (-{regDiscount1}%)</p>
                        </div>
                        <div className="col-xs-4">
                          {!discount1 ? <p>---</p> : <p>AUD {discount1}</p>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes total">Total (incl. GST)</p>
                        </div>
                        <div className="col-xs-4">
                          <p className="price">AUD {regTotal1}</p>
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
                    <div className="container-select">
                      {!selectOne ? (
                        <input
                          type="button"
                          className="selectPayment"
                          value="Select"
                          name="One"
                          onClick={(e) => {
                            getAccessCode(e, regTotal1, expDays1);
                          }}
                        />
                      ) : (
                        <input
                          type="button"
                          className="selectPayment"
                          value="Change Plan"
                          onClick={() => {
                            setSelectOne(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {regPlan2 ? (
                <div
                  id="selectdate-2"
                  className={
                    selectThree || selectTwo || selectOne
                      ? "rightBox open"
                      : "rightBox"
                  }
                  style={{
                    visibility: selectThree || selectOne ? "hidden" : "visible",
                    transform:
                      (selectThree && "translate(180%,0%)") ||
                      (selectOne && "translate(180%,0%)"),
                    animation:
                      selectThree || selectOne
                        ? "keyframes 1200ms ease-in 0ms"
                        : "",
                  }}
                >
                  <div className="insideBox">
                    <h2>Click Works</h2>

                    <div className="container-date">
                      <p>Listing dates:</p>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="calendar"> Start Date</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{start}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="calendar"> Finish Date</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{finish2}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container-regular">
                      <p>Details:</p>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="online"> Duration on-live</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{expDays2} days</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="pencil"> Listing changes</p>
                        </div>
                        <div className="col-xs-4">
                          <p>Unlimited</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="fb"> Social Media Exposure</p>
                        </div>
                        <div className="col-xs-4">
                          {socialMed2 ? <p>Included</p> : <p>Not included</p>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="email"> Newsletter</p>
                        </div>
                        <div className="col-xs-4">
                          {newsletter2 ? <p>Included</p> : <p>Not included</p>}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container-details">
                      <p>Payment details:</p>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes"> Click Works</p>
                        </div>
                        <div className="col-xs-4">
                          <p>AUD {regFeeB}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes">GST</p>
                        </div>
                        <div className="col-xs-4">
                          <p>AUD {gstB}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes">Discounts (-{regDiscount2}%)</p>
                        </div>
                        <div className="col-xs-4">
                          {!discount2 ? <p>---</p> : <p>AUD {discount2}</p>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes total">Total (incl. GST)</p>
                        </div>
                        <div className="col-xs-4">
                          <p className="price">AUD {regTotal2}</p>
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
                    <div className="container-select">
                      {!selectTwo ? (
                        <input
                          type="button"
                          className="selectPayment"
                          value="Select"
                          name="Two"
                          onClick={(e) => {
                            getAccessCode(e, regTotal2, expDays2);
                          }}
                        />
                      ) : (
                        <input
                          type="button"
                          className="selectPayment"
                          value="Change Plan"
                          onClick={() => {
                            setSelectTwo(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {regPlan3 ? (
                <div
                  className={
                    selectThree || selectTwo || selectOne
                      ? "rightBox open"
                      : "rightBox"
                  }
                  style={{
                    visibility: selectTwo || selectOne ? "hidden" : "visible",
                    transform:
                      (selectTwo && "translate(180%,0%)") ||
                      (selectOne && "translate(180%,0%)"),
                    animation:
                      selectTwo || selectOne
                        ? "keyframes 1200ms ease-in 0ms"
                        : "",
                  }}
                  id="selectdate-3"
                >
                  <div className="insideBox">
                    <h2>Click Power</h2>

                    <div className="container-date">
                      <p>Listing dates:</p>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="calendar"> Start Date</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{start}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="calendar"> Finish Date</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{finish3}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container-regular">
                      <p>Details:</p>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="online"> Duration on-live</p>
                        </div>
                        <div className="col-xs-4">
                          <p>{expDays3} days</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="pencil"> Listing changes</p>
                        </div>
                        <div className="col-xs-4">
                          <p>Unlimited</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="fb"> Social Media Exposure</p>
                        </div>
                        <div className="col-xs-4">
                          {socialMed3 ? <p>Included</p> : <p>Not included</p>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="email"> Newsletter</p>
                        </div>
                        <div className="col-xs-4">
                          {newsletter3 ? <p>Included</p> : <p>Not included</p>}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container-details">
                      <p>Payment details:</p>
                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes"> Click Power</p>
                        </div>
                        <div className="col-xs-4">
                          <p>AUD {regFeeC}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes">GST</p>
                        </div>
                        <div className="col-xs-4">
                          <p>AUD {gstC}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes">Discounts (-{regDiscount3}%)</p>
                        </div>
                        <div className="col-xs-4">
                          {!discount3 ? <p>---</p> : <p>AUD {discount3}</p>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">
                          <p className="yes total">Total (incl. GST)</p>
                        </div>
                        <div className="col-xs-4">
                          <p className="price">AUD {regTotal3}</p>
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
                    <div className="container-select">
                      {!selectThree ? (
                        <input
                          type="button"
                          className="selectPayment"
                          value="Select"
                          name="Three"
                          onClick={(e) => {
                            getAccessCode(e, regTotal3, expDays3);
                          }}
                        />
                      ) : (
                        <input
                          type="button"
                          className="selectPayment"
                          value="Change Plan"
                          onClick={() => {
                            setSelectThree(false);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
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
    width: 315px;
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

.container-regular {
    position: relative;
    width: 100%;
    top: 2%;
    left: 0%;
    outline: none;
    z-index: 1000;
}

.container-regular p {
    margin: 6px auto;
    color: #777;
    width: 100%;
    font-size: 14px;
    font-weight: 100;
    font-family: sans-serif;
}

.container-regular .row {
    display: flex;
    justify-content: space-between;
}

.container-regular .row p {
    width: 100%;
    padding-left: 22px;
}

.container-regular .row {
    margin-left: 4px;
    width: 100%;
}

.container-details {
    position: relative;
    width: 100%;
    top: 2%;
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
    background-image: url(./../../Images/calendarmarker.png);
    background-repeat: no-repeat;
    background-position: 1px 2px;
    background-size: 18px;
}

.yes {
    background-image: url(./../../images/check.png);
    background-repeat: no-repeat;
    background-position: 0px 2px;
    background-size: 18px;
}

.fb {
    background-image: url(./../../images/fb.png);
    background-repeat: no-repeat;
    background-position: 0px 2px;
    background-size: 18px;
}



.online {
    background-image: url(./../../Images/online.png);
    background-repeat: no-repeat;
    background-position: 2px 2px;
    background-size: 16px;
}

.email {
    background-image: url(./../../Images/email.png);
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 20px;
}

.pencil {
    background-image: url(./../../Images/pencilmarker.png);
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 17px;
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

.container-select {
    position: relative;
    left: 0%;
    width: 100%;
    top: 11%;
}

.container-select .selectPayment {
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

section {
    display: inherit;
}

.leftBox {
    position: relative;
    background-color: white;
    width: 430px;
    height: 612px;
    margin-top: 20px;
    margin-right: 10px;
    border-radius: 5px;
    visibility: visible;
    border-top: 5px solid #14a248;
    -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.28);
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.28);
}

#selectdate-1,
#selectdate-2,
#selectdate-3 {
    background-color: white;
    position: relative;
    display: block;
    transition: all 1200ms ease-in-out 0ms;
    margin: 20px auto 10px;
}

.gridBox {
    background-color: transparent;
    width: 420px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-row-gap: 12px;
    grid-column-gap: 12px;
    margin-top: 0px;
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
    background-image: url(./../../images/creditcard.png);
    background-repeat: no-repeat;
    background-position: 5px 15px;
    background-size: 25px;
}

.leftBox .insideBox .input-group {
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

    width: 100%;
    padding: 0 16px 10px;
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

.input-group input:focus+label {
    transform: translate(-8px, -22px) scale(0.8);
    font-size: 13px;
    color: #14a248;
    opacity: 1;
}

.input-group input.springbok+label {
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

@media only screen and (max-width: 768px) {
    #selectdate-1.open {
        position: relative;
        margin: 0px auto;
        transform: translate(0%, 10%);

    }

    #selectdate-2.open {
        position: relative;
        margin: 0px auto;
        transform: translate(0%, -90%);

    }

    #selectdate-3.open {
        position: relative;
        margin: 0px auto;
        transform: translate(0%, -190%);
    }

    .wrap .rightBox .insideBox {
        height: 670px
    }

    .leftBox {
        margin: 0px auto;
        width: 380px;
    }

}


@media only screen and (min-width: 768px) {
    #selectdate-1 {
        position: absolute;
        margin-left: 0px;
        transform: translate(10%, 0%);
    }

    #selectdate-2 {
        position: absolute;
        margin-left: 0px;
        transform: translate(115%, 0%);
    }

    #selectdate-3 {
        position: absolute;
        margin-left: 0px;
        transform: translate(220%, 0%);
    }

    #selectdate-1.open {
        transform: translate(180%, 0%);
    }

    #selectdate-2.open {
        transform: translate(180%, 0%);
    }

    #selectdate-3.open {
        transform: translate(180%, 0%);
    }


    .gridBox {

        display: none;

    }

    .leftBox {

        transform: translate(-200%, 0%) !important;
        transition: all 1200ms ease-in-out 0ms;
        width: 430px;
        height: 612px;
        margin-top: 20px;
    }

    .leftBox.open {
        transform: translate(20%) !important;
        transition: all 1200ms ease-in-out 0ms;

    }

    @keyframes keyframes {
        0% {
            opacity: 1;
        }

        60% {
            opacity: 0;
        }

        100% {
            opacity: 0;
        }
    }
}

/* =========== CHECKBOX ========== */

input[type="checkbox"] {
    display: none;
}

input[type="checkbox"] label {
    color: red;
}

input[type="checkbox"]+label {
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

input[type="checkbox"]+label::before {
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

input[type="checkbox"]+label::after {
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

input[type="checkbox"]:checked+label::after {
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
        width: 380px;
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

export default CreditCardRegular;
