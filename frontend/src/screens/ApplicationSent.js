import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useSelector } from "react-redux";

const ApplicationSent = () => {
  const user = useSelector((state) => state.userInfo.value);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Application Sent | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />
        <div className="wrap">
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
            <div className="plane"></div>

            <h2 className="mt-5 mb-4">Application Sent Successfully!</h2>
            <p>
              <b>
                Thank you, {user.firstName}. The employer has received your
                application.
              </b>
            </p>
            <p>
              <b>Good luck!</b>
            </p>

            <button className="btn-med">
              <Link to="/applicationsmanager">Go to Application Manager</Link>
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

          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            padding-top: 60px;

            background-color: #333;
          }
          /* ======== MODAL ========= */
          .wrap .img-fluid {
            transform: translateX(0%);
          }
          .plane {
            width: 300px;
            height: 80px;
            background-image: url("../../../images/paperairplane.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          }

          .wrap .questionCard {
            width: 450px;
            /* min-height: 80vh; */
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

          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }
          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: sans-serif;
            text-align: center;
            font-weight: 800;
            font-size: 28px;
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
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .wrap .tutor {
              width: 500px;
              height: 200px;
            }
          }

          /* ========== BUTTON =========== */
          .btn-med {
            position: relative;
            background-color: #14a248;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 800;
            width: 280px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            margin-top: 20px;
          }

          button {
            cursor: pointer;
          }
          button a {
            display: block;
            position: relative;
            color: white;
            height: 100%;
            width: 100%;
            letter-spacing: 0;
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

          .wrap .location h2 {
            font-weight: 800;
            font-size: 28px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 40px;
            color: #2b2b2b;
          }

          input[type="text"]:invalid,
          input[type="date"]:invalid,
          input[type="tel"]:invalid {
            border: 3px solid #14a248;
          }

          .noDetails_block {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: white;
            z-index: 3000;
            display: block;
            opacity: 0;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ApplicationSent;
