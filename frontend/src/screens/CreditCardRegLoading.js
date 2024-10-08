import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

const CreditCardRegLoading = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let accessCode = params.get("AccessCode");

  const paymentOutcome = async (InvoiceNumber, TotalAmount, Email) => {
    try {
      fetch(process.env.REACT_APP_BACKEND_URL + "api/payment/regFinalise", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          isPaid: true,
          isActiveJob: true,
          email: Email,
          invoiceNumber: InvoiceNumber,
          totalAmount: TotalAmount,
          contractType: ReactSession.get("contractType"),
          professions: ReactSession.get("professions"),
          about: ReactSession.get("about"),
          suburb: ReactSession.get("suburb"),
          postalCode: ReactSession.get("postalCode"),
          state: ReactSession.get("state"),
          streetNo: ReactSession.get("streetNo"),
          street: ReactSession.get("street"),
          country: ReactSession.get("country"),
          longitude: ReactSession.get("longitude"),
          latitude: ReactSession.get("latitude"),
          todaysDate: ReactSession.get("todaysDate"),
          expireIn: ReactSession.get("expireIn"),
          expiryDate: ReactSession.get("expiryDate"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isPaid === true) {
            setTimeout(function () {
              sessionStorage.clear();
              ReactGA.event({
                category: "Post Std Ad",
                action: "Std Ad Payment Completed",
                value: TotalAmount,
              });
              navigate("/payment_success");
            }, 3000);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/payment/check?accessCode=" +
          accessCode
      )
      .then((response) => {
        console.log(response);
        if (
          response.data.response.attributes.Transactions[0]
            .TransactionStatus === true
        ) {
          paymentOutcome(
            response.data.response.attributes.Transactions[0].InvoiceNumber,
            response.data.response.attributes.Transactions[0].TotalAmount,
            response.data.response.attributes.Transactions[0].Customer.Email
          );

          window.history.pushState(
            {},
            document.title,
            "/payment_standard_loading"
          );
        } else {
          setTimeout(function () {
            ReactGA.event({
              category: "Post Std Ad",
              action: "Std Ad Payment failed",
            });
            navigate("/payment_failed");
          }, 3000);
        }
      });
  }, [accessCode]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Standard Payment Loading... | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div className="container-car">
          <div className="car-wrapper">
            <div className="car-wrapper_inner">
              <div className="message">
                <p>
                  Transaction processing... Please do not refresh your
                  browser...
                </p>
              </div>
              <div className="car_outter">
                <div className="car">
                  <div className="body">
                    <div></div>
                  </div>
                  <div className="decos">
                    <div className="line-bot"></div>
                    <div className="door">
                      <div className="handle"></div>
                      <div className="bottom"></div>
                    </div>
                    <div className="window"></div>
                    <div className="light"></div>
                    <div className="light-front"></div>
                    <div className="antenna"></div>
                    <div className="medclicker">
                      <div className="cone"></div>
                    </div>
                  </div>
                  <div>
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                  </div>
                  <div className="wind">
                    <div className="p p1"></div>
                    <div className="p p2"></div>
                    <div className="p p3"></div>
                    <div className="p p4"></div>
                    <div className="p p5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="background-stuff">
            <div className="bg"></div>
            <div className="bg bg-2"></div>
            <div className="bg bg-3"></div>
            <div className="ground"></div>
          </div>
        </div>

        <style jsx="true">
          {`
            html,
            body {
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
            }

            .background-stuff {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              background: #444492;
              animation: wrapperIn 2s;
            }
            .background-stuff .bg {
              position: absolute;
              top: 0%;
              left: -100%;
              width: 50%;
              height: 100%;
              background: #636ed1;
              -webkit-animation: bgIn 4s 0s linear infinite;
              -moz-animation: bgIn 4s 0s linear infinite;
              -ms-animation: bgIn 4s 0s linear infinite;
              -o-animation: bgIn 4s 0s linear infinite;
              animation: bgIn 4s 0s linear infinite;
              -webkit-transform: skewX(10deg);
              -moz-transform: skewX(10deg);
              -ms-transform: skewX(10deg);
              -o-transform: skewX(10deg);
              transform: skewX(10deg);
              z-index: 1;
            }
            .background-stuff .bg-2 {
              background: #8faaff;
              -webkit-animation: bgIn 4s 1s linear infinite;
              -moz-animation: bgIn 4s 1s linear infinite;
              -ms-animation: bgIn 4s 1s linear infinite;
              -o-animation: bgIn 4s 1s linear infinite;
              animation: bgIn 4s 1s linear infinite;
            }
            .background-stuff .bg-3 {
              background: #5a73da;
              -webkit-animation: bgIn 4s 2s linear infinite;
              -moz-animation: bgIn 4s 2s linear infinite;
              -ms-animation: bgIn 4s 2s linear infinite;
              -o-animation: bgIn 4s 2s linear infinite;
              animation: bgIn 4s 2s linear infinite;
            }
            .background-stuff .ground {
              position: absolute;
              bottom: 0;
              margin-bottom: -1.875em;
              height: 50%;
              width: 100%;
              background: #14a248;
              z-index: 2;
            }
            .container-car {
              height: 790px;
              width: 100%;
              display: table;
              overflow: hidden;
            }
            .container-car .car-wrapper {
              display: table-cell;
              vertical-align: middle;
              width: 100%;
            }
            .car {
              width: 20em;
              height: 12.5em;
              position: relative;
              opacity: 1;
              margin-left: auto;
              margin-right: auto;
              z-index: 4;
              -webkit-animation: carMove 0.3s infinite;
              -moz-animation: carMove 0.3s infinite;
              -ms-animation: carMove 0.3s infinite;
              -o-animation: carMove 0.3s infinite;
              animation: carMove 0.3s infinite;
            }
            .car .body {
              position: absolute;
              top: 0;
              left: 0.875em;
              width: 14.375em;
              height: 10em;
              background: #fff;
            }
            .car .body:before {
              content: "";
              position: absolute;
              left: -0.875em;
              border-radius: 10px 10px 0 0;
              width: 15.875em;
              z-index: 2;
              height: 0.75em;
              background: #3190dd;
            }
            .car .body div {
              position: absolute;
              background: #fff;
              width: 18.125em;
              height: 3.75em;
              bottom: -0.625em;
              border-radius: 0 0 10px 10px;
            }
            .car .body div:before {
              content: "";
              background: #fff;
              position: absolute;
              top: -1.8125em;
              right: 0px;
              width: 5em;
              height: 2.5em;
              z-index: 1;
              border-radius: 0 14px 0 0;
              -webkit-transform: rotate(17deg);
              -moz-transform: rotate(17deg);
              -ms-transform: rotate(17deg);
              -o-transform: rotate(17deg);
              transform: rotate(17deg);
            }
            .car .body div:after {
              content: "";
              background: #fff;
              position: absolute;
              top: -5.125em;
              right: 1.0625em;
              width: 5.625em;
              height: 2.5em;
              z-index: 1;
              border-radius: 10px 0 0 0;
              -webkit-transform: rotate(75deg);
              -moz-transform: rotate(75deg);
              -ms-transform: rotate(75deg);
              -o-transform: rotate(75deg);
              transform: rotate(75deg);
            }

            .message p {
              font-weight: 800;
              font-size: 20px;
              color: white;
              display: block;
              position: absolute;
              transform: translate(-50%, -50%);
              top: -50%;
              left: 50%;
            }
            .car .wheel {
              position: absolute;
              width: 3.75em;
              height: 3.75em;
              background: #3c464c;
              border-radius: 50%;
              bottom: 0;
              left: 3em;
              z-index: 14;
              -webkit-animation: carMove 0.3s 0.2s;
              -moz-animation: carMove 0.3s 0.2s;
              -ms-animation: carMove 0.3s 0.2s;
              -o-animation: carMove 0.3s 0.2s;
              animation: carMove 0.3s 0.2s;
            }
            .car .wheel:before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              background: #fff;
              width: 1.5em;
              height: 1.5em;
              border-radius: 50%;
              -webkit-transform: translate(-50%, -50%);
              -moz-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              -o-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
            }
            .car .wheel:nth-of-type(2) {
              left: 13.125em;
            }
            .car .decos {
              width: 18.125em;
              height: 10.5em;
              position: absolute;
              z-index: 12;
              top: 0;
              left: 0.875em;
            }
            .car .line-bot {
              position: absolute;
              bottom: 0.5625em;
              height: 3px;
              width: 100%;
              background: #e1e8ef;
            }
            .car .door {
              position: absolute;
              left: 7.5em;
              bottom: 0;
              width: 3.75em;
              height: 8.8125em;
              border-radius: 10px 10px 0 0;
              border: 3px solid #e1e8ef;
              border-bottom: 0;
              background: #fff;
            }
            .car .door:after {
              content: "";
              position: absolute;
              top: 0.375em;
              left: 0.4375em;
              width: 2.875em;
              height: 2.5em;
              border-radius: 4px;
              background: #5bc2ef;
            }
            .car .door .handle {
              position: absolute;
              right: 0.625em;
              top: 4.375em;
              width: 0.625em;
              height: 0.625em;
              background: #e1e8ef;
              border-radius: 50%;
            }
            .car .door .handle:after {
              content: "";
              width: 1.25em;
              height: 0.25em;
              border-radius: 10px;
              background: #e1e8ef;
              position: absolute;
              top: 50%;
              left: -0.3125em;
              margin-top: -0.125em;
            }
            .car .door .bottom {
              position: absolute;
              bottom: 0.375em;
              left: 0.6875em;
              width: 2.375em;
              height: 0.75em;
            }
            .car .door .bottom:before,
            .car .door .bottom:after {
              content: "";
              display: block;
              width: 100%;
              height: 0.1875em;
              background: #e1e8ef;
              height: 0.25em;
              border-radius: 10px;
              margin-bottom: 0.25em;
            }
            .car .window {
              position: absolute;
              top: 1.125em;
              left: 12.5em;
              width: 2em;
              background: #5bc2ef;
              height: 4.5em;
              border-radius: 10px 10px 0 10px;
            }
            .car .window:before {
              content: "";
              width: 100%;
              height: 1.25em;
              background: #5bc2ef;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 2.9375em;
              border-radius: 0 10px 10px 10px;
            }
            .car .window:after {
              content: "";
              height: 1.25em;
              background: #5bc2ef;
              position: absolute;
              top: 1.0625em;
              left: -0.8125em;
              width: 4.1875em;
              transform-origin: bottom;
              -webkit-transform: rotate(74deg);
              -moz-transform: rotate(74deg);
              -ms-transform: rotate(74deg);
              -o-transform: rotate(74deg);
              transform: rotate(74deg);
              border-radius: 10px 10px 10px 10px;
            }
            .car .light {
              position: absolute;
              width: 0.625em;
              height: 0.625em;
              background: #ff8c40;
              right: 3.75em;
              bottom: 3.125em;
              border-radius: 3px;
            }
            .car .light-front {
              position: absolute;
              width: 0.5em;
              height: 0.5em;
              background: #ff8c40;
              right: -0.1875em;
              bottom: 3.5625em;
              border-radius: 3px;
            }
            .car .light-front:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              background: #ff8c40;
              top: 100%;
              height: 0.9375em;
              border-radius: 3px;
              margin-top: 2px;
            }
            .car .antenna {
              position: absolute;
              width: 1.625em;
              height: 0.625em;
              background: #fff;
              bottom: 100%;
              left: 1.0625em;
              border-radius: 4px 4px 0 0;
            }
            .car .antenna:before {
              content: "";
              position: absolute;
              width: 2.375em;
              height: 0.25em;
              background: #fff;
              bottom: 0;
              left: -1.375em;
              -webkit-transform: rotate(55deg);
              -moz-transform: rotate(55deg);
              -ms-transform: rotate(55deg);
              -o-transform: rotate(55deg);
              transform: rotate(55deg);
              -webkit-transform-origin: right;
              -moz-transform-origin: right;
              -ms-transform-origin: right;
              -o-transform-origin: right;
              transform-origin: right;
              border-radius: 4px;
            }
            .car .medclicker {
              position: absolute;
              background: #fff;
              background-image: url("https://i.ibb.co/1KgVNwJ/medclicker.png");
              background-position: center;
              background-repeat: no-repeat;
              background-size: 75px;
              left: 1.075em;
              top: 1.875em;
              width: 5.375em;
              height: 5.375em;
              border: none;
              border-radius: 30%;
              -webkit-transform: rotate(0deg);
              -moz-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              -o-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            .wind {
              position: absolute;
              z-index: -1;
              right: 100%;
              height: 100%;
              margin-right: -1.25em;
            }
            .wind .p {
              position: absolute;
              background: #fff;
              border-radius: 0.625em;
              height: 0.625em;
            }
            .wind .p1 {
              width: 4.375em;
              position: absolute;
              right: 0;
              top: 1.5625em;
              animation: wind 1s -1s linear infinite;
            }
            .wind .p2 {
              width: 6.25em;
              right: 2.5em;
              top: 3.75em;
              animation: wind 1s -2s linear infinite;
            }
            .wind .p3 {
              width: 3.125em;
              right: 0em;
              top: 6.5625em;
              animation: wind 1s -1s linear infinite;
            }
            .wind .p4 {
              width: 3.75em;
              right: 6.25em;
              top: 8.4375em;
              animation: wind 1s 1s linear infinite;
            }
            .wind .p5 {
              width: 4.375em;
              right: 1.875em;
              top: 9.0625em;
              animation: wind 1s -1.5s linear infinite;
            }
            .car-wrapper_inner {
              position: relative;
              z-index: 4;
            }
            @keyframes carMove {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-1px);
              }
              100% {
                transform: translateY(0px);
              }
            }
            @keyframes wind {
              0% {
                transform: translateX(100%);
                opacity: 1;
              }
              100% {
                transform: translateX(-400%);
                opacity: 0;
              }
            }
            .car_outter {
              -webkit-transform: translateX(-100%);
              -moz-transform: translateX(-100%);
              -ms-transform: translateX(-100%);
              -o-transform: translateX(-100%);
              transform: translateX(-100%);
              position: relative;
              animation: carDrive 5s 1s cubic-bezier(0.88, 0.08, 0.16, 1.1)
                infinite;
            }
            @keyframes carDrive {
              0% {
                transform: translateX(-100%);
              }
              25% {
                transform: translateX(0%);
              }
              70% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            @keyframes bgIn {
              0% {
                left: 100%;
              }
              100% {
                left: -100%;
              }
            }
            @keyframes wrapperIn {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
      </HelmetProvider>
    </>
  );
};

export default CreditCardRegLoading;
