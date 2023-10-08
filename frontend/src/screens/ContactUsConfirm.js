import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactUsConfirm = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contact us Message Sent | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <div className="wrapper">
          <section className="questionCard container">
            <figure>
              <Link to="/">
                <img
                  src="/images/medclicker.png"
                  alt="LOGO"
                  className="img-fluid"
                />
              </Link>
            </figure>
            <div className="email"></div>
            <h2>We got your message</h2>
            <p>
              Your message is important to us. We will get back to you within 2
              to 3 business days. Thanks again!
            </p>

            <button>
              <Link to="/contact">Return to Contact us</Link>
            </button>
          </section>
          <Footer />
        </div>
        <style jsx="true">{`
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .wrapper {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-top: 60px;
            background-image: url("./../../images/main-image.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          /* ======== MODAL ========= */
          .wrapper .img-fluid {
            transform: translateX(0%);
          }

          .wrapper .questionCard {
            width: 450px;
            padding: 20px 10px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            border: 1px solid #ebebeb;
            background: #fff;
            margin-bottom: 60px;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }

          .wrapper .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }
          .wrapper .questionCard > figure > a {
            display: block;
          }

          .wrapper .questionCard h2 {
            font-family: sans-serif;
            text-align: center;
            font-weight: 800;
            font-size: 23px;
            width: 100%;
            margin: 0px auto 24px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }
          .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #777;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
            width: 300px;
          }

          .questionCard {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .questionCard figure {
            margin-bottom: 80px !important;
          }

          @media only screen and (min-width: 768px) {
            .questionCard p {
              width: 500px;
            }
            .wrapper .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .wrapper .tutor {
              width: 500px;
              height: 200px;
            }
          }

          /* ========== BUTTON =========== */

          button {
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            position: relative;
            background-color: #14a248;
            outline: none;
            border: none;
            border-radius: 4px;
            width: 200px;
            height: 50px;
            line-height: 50px;
          }
          button a {
            display: block;
            position: relative;
            color: white;
            height: 100%;
            width: 100%;
          }

          button a:hover {
            color: white;
            cursor: pointer;
          }

          button:focus,
          button:active {
            outline: none;
            border: none;
          }
          @media only screen and (min-width: 768px) {
            button a {
              width: 100%;
            }
          }

          .wrapper .location h2 {
            font-weight: 800;
            font-size: 28px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 40px;
            color: #2b2b2b;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ContactUsConfirm;
