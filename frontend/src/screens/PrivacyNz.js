import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyNz = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Privacy Policy | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <div className="wrap">
          <div className="privacy">
            <h2 className="nonselect">Privacy Policy - New Zealand</h2>
          </div>

          <section className="agreeContent container nonselect">
            <p>
              <Link to="/privacy_au">See Privacy Policy for Australia</Link>
            </p>
            <br />
            <p>
              This Privacy Policy explains how information about you is
              collected, used and disclosed by MedClicker. This Privacy Policy
              applies to information MedClicker collects when you message the
              MedClicker via email, voice notes or visit our website and use
              other services that link to this Privacy Policy.
            </p>
            <br />
            <p>
              MedClicker shall take all reasonable steps to protect all personal
              information of users and for the purpose of this clause “personal
              information” shall be defined as detailed in the Privacy Act 1993.
            </p>
            <h3>Collection of Information</h3>
            <h4>Information You Provide to Us</h4>
            <p>
              MedClicker collects information you provide directly to us. The
              types of information MedClicker may collect is your name, age,
              email address, photographs, videos, voice notes and any other
              information or content you choose to provide.
            </p>
            <h4>Use of Information:</h4>
            <p>
              MedClicker may use information about you for various purposes,
              including to:
            </p>
            <ul>
              <li>Provide, maintain and improve the services;</li>
              <li>
                Provide and deliver the products and services that you request;
              </li>
              <li>
                Send you technical updates, security alerts and support and
                administrative messages;
              </li>
              <li>
                Respond to your comments, questions and requests and provide
                customer service;
              </li>
              <li>
                Communicate with you about our products, services, offers,
                promotions, rewards and events offered by MedClicker and others,
                and provide news and information that MedClicker thinks will be
                of interest to you;
              </li>
              <li>
                Monitor and analyse trends, usage and activities in connection
                with our services;
              </li>
              <li>
                Personalize and improve our services, and provide content,
                features and recommendations;
              </li>
              <li>Process and deliver contest entries and rewards;</li>
              <li>
                Compile non-personal statistical information about browsing
                habits and access to the MedClicker website and
              </li>
              <li>
                Carry out any other purpose for which the information was
                collected.
              </li>
            </ul>
            <h4>Storage and Disclosure of Information:</h4>
            <p>
              Information detailed about is collected either electronically by
              using cookies or is provided voluntarily by the user. MedClicker
              may collect, maintain, save, compile, share, disclose and sell any
              information collected from users subject to the following
              provisions:
            </p>
            <ul>
              <li>
                MedClicker shall not disclose personal information from the
                users unless the user consents thereto;
              </li>
              <li>
                MedClicker shall disclose information without the user’s consent
                only through due legal process; and
              </li>
              <li>
                MedClicker may compile, use and share any information that does
                not relate to any specific individual
              </li>
            </ul>
            <p>
              MedClicker owns and retains all rights to non-personal statistical
              information collected and compiled by MedClicker.
            </p>
            <h4>Privacy and Site Changes:</h4>
            <p>
              From time to time, MedClicker may review and update its Privacy
              Statement. Revised versions will be updated on the Site with or
              without notice.
            </p>
            <h4>Security:</h4>
            <p>
              MedClicker takes reasonable measures to help protect information
              about you from loss, theft, misuse and unauthorized disclosure,
              alteration and destruction.
            </p>
            <h4>Contact from MedClicker:</h4>
            <p>
              MedClicker or our sub-contractors may contact you by email or
              telephone to ask you for your feedback and comments on our
              services. We may also wish to provide you with information about
              special features of our website or any other service or products,
              which we think, may be of interest to you. If you would rather not
              receive this information, please send an email to
              <Link to="#">info@medclicker.com.au</Link> confirming your
              request.
            </p>
            <br />
            <p>
              By submitting your information, you consent to the use of that
              information as set out in this policy. If we change our privacy
              policy we will post the changes on this page, and may place
              notices on other pages of the website, so that you may be aware of
              the information we collect and how we use it at all times.
              Continued use of the service will signify that you agree to any
              such changes.
            </p>

            <h4>Contact us:</h4>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at <Link to="#">info@medclicker.com.au</Link>.
            </p>
          </section>
          <Footer />
        </div>
        <style jsx="true">{`
          .privacy h2 {
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
            color: #fff;
            background-color: #a5ce0f;
            padding: 10px 20px;
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
            font-family: "Noto Sans TC", sans-serif;
          }
          .wrap .container {
            text-align: left;
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

export default PrivacyNz;
