import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";

const Step4 = () => {
  const dispatch = useDispatch();

  // ============ PROFILE DATA ===========
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/users/allusers/" +
          localStorage.getItem("userId")
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            login({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              filename: response.data.filename,
              isLoggedIn: true,
              isLocum: response.data.isLocum,
              isActive: response.data.isActive,
              nanoId: response.data.nanoId,
              isAdmin: response.data.isAdmin,
              completeAccess: true,
            })
          );
        }
      });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Registration Step 4 | Medclicker</title>
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
            <h2>Thank you for registering as a Locum.</h2>
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Step4;
