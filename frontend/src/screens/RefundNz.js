import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RefundNz = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Refund Policy | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div className="refund">
            <h2 className="nonselect">Refund Policy - New Zealand</h2>
          </div>
          <section className="agreeContent container nonselect">
            <p>
              <Link to="/refund_au">See Refund Policy for Australia</Link>
            </p>
            <br />

            <ul>
              <li>
                A full refund will be provided to either account credit or
                returned to the original payment method, if the order was placed
                within forty-five (45) days of the date that the refund was
                requested for any of the following cause:
                <ul>
                  <li>
                    MedClicker Website has been interrupted, experienced server
                    down-time or unforeseen error that results in the website
                    unavailable for users for a period of more than forty-eight
                    (48) consecutive hours;
                  </li>
                </ul>
              </li>
              <li>
                We will notify you by email once we have processed your refund.
                It will then take an additional of 4–5 business days for the
                refund to show in your account. Refunds may take longer to
                process during sales periods or for international returns.
              </li>
              <li>
                The customer will not be entitled to a refund if any of
                MedClicker's Terms, Policies and Agreements have been breached
                by the Advertiser.
              </li>
              <li>
                All other refunds will be processed at the sole discretion of
                MedClicker, in-line with the New Zealand Consumer Guarantees Act
                1993.
              </li>
            </ul>
          </section>
          <Footer />
        </div>
        <style jsx="true">{`
          .refund h2 {
            font-weight: bold;
            font-size: 2.5em;
            margin-bottom: 30px;
            color: #fff;
            background-color: #323232;
            padding: 10px 0px;
            text-align: center;
            border: none;
            z-index: -1;
          }

          .wrap .agreeContent {
            padding: 40px 10px;
          }

          .wrap .agreeContent h2 {
            font-weight: bold;
            font-size: 2.5em;
            margin-bottom: 30px;
          }
          .wrap .agreeContent a {
            color: #14a248;
            text-decoration: none;
            font-weight: 700;
          }

          .wrap .agreeContent h3 {
            font-weight: bold;
            margin: 30px 0 10px 0;
          }

          .wrap .agreeContent h4 {
            font-weight: bold;
            margin: 30px 0 10px 0;
          }

          .wrap .agreeContent p {
            font-size: 14px;
            margin-bottom: 0;
          }
          .nonselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default RefundNz;
