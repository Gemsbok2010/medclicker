import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ExternalLink } from "react-external-link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Subscription = () => {
  const user = useSelector((state) => state.userInfo.value);

  window.REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
  window.LOCALE = "en";
  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
    "The information provided is invalid. Please review the field format and try again.";

  window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";

  window.GENERIC_INVALID_MESSAGE =
    "The information provided is invalid. Please review the field format and try again.";

  window.translation = {
    common: {
      selectedList: "{quantity} list selected",
      selectedLists: "{quantity} lists selected",
    },
  };

  var AUTOHIDE = Boolean(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:4000/api/comm/mysubscription?" + "email=" + user.email
      );
      const data = await res.json();

      if (data.email) {
        setFirstName(data.attributes.FIRSTNAME);
        setLastName(data.attributes.LASTNAME);
        setEmail(data.email);
        setState(data.attributes.STATES);
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

  // ========== HIDE LOADING EXCLAMATION MARK ==============
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setHide(true);
    }, 5000);
    setHide(false);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Subscription | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
          <link
            rel="stylesheet"
            href="https://sibforms.com/forms/end-form/build/sib-styles.css"
          />

          <script
            defer
            src="https://sibforms.com/forms/end-form/build/main.js"
          ></script>
        </Helmet>
        <Navbar />

        <div
          className="sib-form"
          style={{ textAlign: "center", backgroundColor: "#EFF2F7" }}
        >
          <div id="sib-form-container" className="sib-form-container">
            <div
              id="error-message"
              className="sib-form-message-panel"
              style={{
                fontSize: "16px",
                textAlign: "left",
                fontFamily: "Helvetica, sans-serif",
                color: "#661d1d",
                backgroundColor: "#ffeded",
                borderRadius: "3px",
                borderColor: "#ff4949",
                maxWidth: "540px",
                display: hide === false && "none",
              }}
            >
              <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg
                  viewBox="0 0 512 512"
                  className="sib-icon sib-notification__icon"
                >
                  <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
                </svg>
                <span className="sib-form-message-panel__inner-text">
                  Your subscription could not be saved. Please try again.
                </span>
              </div>
            </div>

            <div></div>

            <div
              id="success-message"
              className="sib-form-message-panel"
              style={{
                fontSize: "16px",
                textAlign: "left",
                fontFamily: "Helvetica, sans-serif",
                color: "#085229",
                backgroundColor: "#e7faf0",
                borderRadius: "3px",
                borderColor: "#13ce66",
                maxWidth: "540px",
                display: hide === false && "none",
              }}
            >
              <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg
                  viewBox="0 0 512 512"
                  className="sib-icon sib-notification__icon"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
                </svg>
                <span className="sib-form-message-panel__inner-text">
                  Your subscription has been successful.
                </span>
              </div>
            </div>

            <div></div>

            <div
              id="sib-container"
              className="sib-container--large sib-container--vertical"
              style={{
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,1)",
                maxWidth: "540px",
                borderRadius: "3px",
                borderWidth: "1px",
                borderColor: "#C0CCD9",
                borderStyle: "solid",
                direction: "ltr",
              }}
            >
              <form
                id="sib-form"
                method={"POST"}
                action="https://3a193a88.sibforms.com/serve/MUIFAIqpdufN8quTSqaaApCl094H_rjgjXJpnKhrAV4-J5CtaiE579Zety0Mj0yGnCUmJAUWa_037nWdwQQwqJb6f1ziAVZLxc069E89jU2IdQmRb3m2b1sAuJpPZt-tkBEZYUofLfoqDVMupTITOCDZQOuRsVO4k9Q3YVvhE_ra_rdDFafudaWKhLGLcO7_3Rv3Af-__il1PocA"
                data-type="subscription"
              >
                <div style={{ padding: "8px 0" }}>
                  <div
                    className="sib-form-block"
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      fontFamily: "Helvetica, sans-serif",
                      color: "#3C4858",
                      backgroundColor: "transparent",
                      textAlign: "left",
                    }}
                  >
                    <p>Sign Up for Newsletters</p>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row ">
                        <label
                          className="entry__label"
                          style={{
                            fontSize: "16px",
                            textAlign: "left",
                            fontWeight: "700",
                            fontFamily: "Helvetica, sans-serif",
                            color: "#3c4858",
                            borderRadius: "0px",
                            display: "block",
                          }}
                          htmlFor="FIRSTNAME"
                          data-required="*"
                        >
                          Enter your FIRSTNAME
                        </label>

                        <div className="entry__field">
                          <input
                            className="input"
                            maxLength="200"
                            type="text"
                            id="FIRSTNAME"
                            name="FIRSTNAME"
                            autoComplete="off"
                            placeholder="FIRSTNAME"
                            data-required="true"
                            required
                            value={firstName ? firstName : ""}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <label
                        className="entry__error entry__error--primary"
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          fontFamily: "Helvetica, sans-serif",
                          color: "rgb(60, 72, 88)",
                          backgroundColor: "#ffeded",
                          borderRadius: "0px",
                          borderColor: "#ff4949",
                          display: "none",
                        }}
                      ></label>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row ">
                        <label
                          className="entry__label"
                          style={{
                            fontSize: "16px",
                            textAlign: "left",
                            fontWeight: "700",
                            fontFamily: "Helvetica, sans-serif",
                            color: "#3c4858",
                            borderRadius: "0px",
                            display: "block",
                          }}
                          htmlFor="LASTNAME"
                          data-required="*"
                        >
                          Enter your LASTNAME
                        </label>

                        <div className="entry__field">
                          <input
                            className="input "
                            maxLength="200"
                            type="text"
                            id="LASTNAME"
                            name="LASTNAME"
                            autoComplete="off"
                            placeholder="LASTNAME"
                            data-required="true"
                            required
                            value={lastName ? lastName : ""}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <label
                        className="entry__error entry__error--primary"
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          fontFamily: "Helvetica, sans-serif",
                          color: "#661d1d",
                          backgroundColor: "#ffeded",
                          borderColor: "#ff4949",
                          borderRadius: "0px",
                          display: "none",
                        }}
                      ></label>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row ">
                        <label
                          className="entry__label"
                          style={{
                            fontSize: "16px",
                            textAlign: "left",
                            fontWeight: "700",
                            fontFamily: "Helvetica, sans-serif",
                            color: "#3c4858",
                            display: "block",
                            borderRadius: "0px",
                          }}
                          htmlFor="EMAIL"
                          data-required="*"
                        >
                          Enter your EMAIL address to subscribe
                        </label>

                        <div className="entry__field">
                          <input
                            className="input "
                            type="text"
                            id="EMAIL"
                            name="EMAIL"
                            autoComplete="off"
                            placeholder="EMAIL"
                            data-required="true"
                            required
                            value={email ? email : ""}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <label
                        className="entry__error entry__error--primary"
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          fontFamily: "Helvetica, sans-serif",
                          color: "#661d1d",
                          backgroundColor: "#ffeded",
                          borderColor: "#ff4949",
                          borderRadius: "0px",
                          display: "none",
                        }}
                      ></label>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div
                    className="sib-radiobutton-group sib-form-block"
                    data-required="true"
                  >
                    <div className="form__entry entry_mcq">
                      <div className="form__label-row ">
                        <label
                          className="entry__label"
                          style={{
                            fontWeight: "700",
                            fontSize: "16px",
                            textAlign: "left",
                            fontFamily: "Helvetica, sans-serif",
                            color: "#3c4858",
                          }}
                          htmlFor="STATES"
                          data-required="*"
                        >
                          You want to receive newsletters in which state or
                          territory? (Select One only)
                        </label>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "left",
                            }}
                          >
                            <div
                              className="group-left"
                              style={{ width: "50%" }}
                            >
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="9"
                                  required
                                  id="radio-aus"
                                  checked={state === "9" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-aus"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  AUSTRALIA WIDE
                                </label>
                              </div>
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="4"
                                  required
                                  id="radio-act"
                                  checked={state === "4" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-act"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  ACT
                                </label>
                              </div>
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="1"
                                  required
                                  id="radio-nsw"
                                  checked={state === "1" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-nsw"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  NSW
                                </label>
                              </div>
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="5"
                                  required
                                  id="radio-nt"
                                  checked={state === "5" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-nt"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  NT
                                </label>
                              </div>
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="8"
                                  required
                                  id="radio-qld"
                                  checked={state === "8" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-qld"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  QLD
                                </label>
                              </div>
                            </div>
                            <div
                              className="group-right"
                              style={{ width: "50%" }}
                            >
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="7"
                                  required
                                  id="radio-sa"
                                  checked={state === "7" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-sa"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  SA
                                </label>
                              </div>
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="3"
                                  required
                                  id="radio-tas"
                                  checked={state === "3" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-tas"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  TAS
                                </label>
                              </div>
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="2"
                                  required
                                  id="radio-vic"
                                  checked={state === "2" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-vic"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  VIC
                                </label>
                              </div>
                              <div className="entry__choice">
                                <input
                                  type="radio"
                                  name="STATES"
                                  className="input_replaced states"
                                  value="6"
                                  required
                                  id="radio-wa"
                                  checked={state === "6" ? true : false}
                                  onChange={(e) => setState(e.target.value)}
                                />
                                <label
                                  htmlFor="radio-wa"
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontFamily: "Helvetica, sans-serif",
                                    color: "#3C4858",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  WA
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <label
                        className="entry__error entry__error--primary"
                        style={{
                          fontSize: "16px",
                          textAlign: "left",
                          fontFamily: "Helvetica, sans-serif",
                          color: "#661d1d",
                          backgroundColor: "#ffeded",
                          borderRadius: "0px",
                          borderColor: "#ff4949",
                          display: "none",
                        }}
                      ></label>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div
                    className="sib-form-block"
                    style={{
                      fontSize: "16px",
                      textAlign: "left",
                      fontFamily: "Helvetica, sans-serif",
                      color: "#3C4858",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="sib-text-form-block">
                      <p>Subscribe to our newsletter and stay updated.</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div className="sib-form-block" style={{ textAlign: "left" }}>
                    <button
                      className="sib-form-block__button sib-form-block__button-with-loader"
                      style={{
                        fontSize: "16px",
                        textAlign: "left",
                        fontWeight: "700",
                        fontFamily: "Helvetica, sans-serif",
                        color: "#FFFFFF",
                        backgroundColor: "#14a248",
                        borderRadius: "3px",
                        borderWidth: "0px",
                      }}
                      form="sib-form"
                      type="submit"
                    >
                      <svg
                        className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                        viewBox="0 0 512 512"
                      >
                        <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                      </svg>
                      SUBSCRIBE
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  name="email_address_check"
                  value=""
                  className="input--hidden"
                  readOnly
                />
                <input type="hidden" name="locale" value="en" readOnly />
              </form>
              <div style={{ padding: "8px 0px", textAlign: "left" }}>
                <p
                  style={{
                    paddingLeft: "16px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  If you no longer wish to receive our newsletters, please click
                  here to{" "}
                  <ExternalLink
                    target="_self"
                    href="/unsubscribe"
                    style={{
                      color: "#14a248",
                      textDecoration: "none",
                      fontWeight: "700",
                    }}
                  >
                    unsubscribe
                  </ExternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <style jsx="true">{`
          @font-face {
            font-display: block;
            font-family: Roboto;
            src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2)
                format("woff2"),
              url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff)
                format("woff");
          }

          @font-face {
            font-display: fallback;
            font-family: Roboto;
            font-weight: 600;
            src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2)
                format("woff2"),
              url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff)
                format("woff");
          }

          @font-face {
            font-display: fallback;
            font-family: Roboto;
            font-weight: 700;
            src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2)
                format("woff2"),
              url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff)
                format("woff");
          }

          #sib-container input:-ms-input-placeholder {
            text-align: left;
            font-family: "Helvetica", sans-serif;
            color: #c0ccda;
          }

          #sib-container input::placeholder {
            text-align: left;
            font-family: "Helvetica", sans-serif;
            color: #c0ccda;
          }
          #sib-form .entry__choice label {
            display: block;
          }

          #sib-form .sib-form-block button:active,
          #sib-form .sib-form-block button:focus {
            outline: none;
          }

          /* States radio box in newsletter subscription */
          input[type="radio"] {
            display: none;
          }
          .entry__label input[type="radio"] {
            display: none;
          }

          input[type="radio"] + label {
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
            margin: 2px 0px 8px 35px;
            width: 100%;
            display: block;
            color: #2b2b2b;
          }
          input[type="radio"] + label::before {
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
          input[type="radio"] + label::after {
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
          input[type="radio"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Subscription;
