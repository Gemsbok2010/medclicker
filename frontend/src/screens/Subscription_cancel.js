import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Subscription_cancel = () => {
  const user = useSelector((state) => state.userInfo.value);

  const [email, setEmail] = useState("");

  const [hideSIBerror, setHideSIBerror] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setHideSIBerror(true);
    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/comm/mysubscription?" +
          "email=" +
          user.email
      );
      const data = await res.json();

      if (isCancelled === false) {
        setEmail(data.email);
      }
      setHideSIBerror(false);
    };
    if (isCancelled === false) {
      setHideSIBerror(false);
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Cancel Subscription | Medclicker</title>
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
            {hideSIBerror === true ? (
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
                  display: "none",
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
                    Your Unsubscription could not be validated. Please try
                    again.
                  </span>
                </div>
              </div>
            ) : (
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
                    Your Unsubscription could not be validated. Please try
                    again.
                  </span>
                </div>
              </div>
            )}
            <div></div>
            {hideSIBerror === true ? (
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
                  display: "none",
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
                    Your un-subscription is successful.
                  </span>
                </div>
              </div>
            ) : (
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
                    Your un-subscription is successful.
                  </span>
                </div>
              </div>
            )}
            <div></div>
            <div
              id="sib-container"
              className="sib-container--large sib-container--vertical"
              style={{
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,1)",
                maxWidth: "540px",
                borderRadius: "0px",
                borderWidth: "1px",
                borderColor: "#C0CCD9",
                borderStyle: "solid",
                direction: "ltr",
              }}
            >
              <form
                id="sib-form"
                method="POST"
                action="https://3a193a88.sibforms.com/serve/MUIFAKmMMTbMsTlH-lae894tbDJUjQi_hCx0zXAzThtm9utzGQMQDQImK1ONmS4tftzeAWPadvOp7zYIqpjOrPPmOSmsyOsRVCoST_SajvgEB8bBe97LCJ2SWdqsVh898cHXS5WKLJs8u0PGe9WRn0Ix_Y9-LaqRAcmO6EgOf5EpZI_115V_JKppSlLwigzwsd2MWRbxpt_2VHrO"
                data-type="unsubscription"
              >
                <div style={{ padding: "8px 0" }}>
                  <div
                    className="sib-form-block"
                    style={{
                      fontSize: "32px",
                      textAlign: "left",
                      fontWeight: "700",
                      fontFamily: "Helvetica, sans-serif",
                      color: "#3C4858",
                      backgroundColor: "transparent",
                    }}
                  >
                    <p>Unsubscribe</p>
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
                      <p>
                        We're sorry to see you go. Click on 'Unsubscribe' to
                        stop receiving emails from Medclicker to this email
                        address:
                      </p>
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
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "700",
                            fontFamily: "Helvetica, sans-serif",
                            color: "#3c4858",
                            borderRadius: "0px",
                            display: "block",
                          }}
                          htmlFor="EMAIL"
                          data-required="*"
                        >
                          Enter your email address to unsubscribe
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
                            value={user.isLoggedIn ? user.email : email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <label
                        className="entry__error entry__error--primary"
                        style={{
                          textAlign: "left",
                          fontSize: "16px",
                          fontWeight: "700",
                          fontFamily: "Helvetica, sans-serif",
                          color: "#661d1d",
                          backgroundColor: "#ffeded",
                          display: "none",
                          borderColor: "#ff4949",
                        }}
                      ></label>
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
                      UNSUBSCRIBE
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  name="email_address_check"
                  value=""
                  className="input--hidden"
                />
                <input type="hidden" name="locale" value="en" />
              </form>
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

          #sib-container textarea::placeholder {
            text-align: left;
            font-family: "Helvetica", sans-serif;
            color: #c0ccda;
          }

          #sib-form .entry__choice label {
            display: block;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

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

export default Subscription_cancel;
