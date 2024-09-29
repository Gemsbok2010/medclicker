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
              <Link to="/dashboard">
                <img
                  src="/images/medclicker-white.png"
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
            padding-top: 60px;
            background: #14a248;
          }

          /* =========== MODAL ============= */

          .wrap .img-fluid {
            transform: translateX(0%);
          }

          .wrap .brief {
            width: 400px;
            height: 150px;
            background-image: url("./../../images/sanofi-ipad.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            margin-bottom: 30px;
          }

          .wrap .questionCard {
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
            border-radius: 7px;
            border: 1px solid #ebebeb;

            background: #14a248;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }
          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 20px;
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
            color: #fff;
          }
          .questionCard p {
            margin: 10px auto;
            text-align: center;
            color: #fff;
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
            margin-bottom: 60px;
          }

          @media only screen and (min-width: 768px) {
            .questionCard p {
              width: 500px;
            }
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .wrap .brief {
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
            font-size: 18px;
            border-radius: 4px;
            padding: 0;
            margin-top: 20px;
            border: 1px solid white;
          }

          button {
            cursor: pointer;
            border: 1px solid white;
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ApplicationSent;
