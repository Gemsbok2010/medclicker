import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Question_Thank_You = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Thank You | MedClicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
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
            <h2>Listing Processed</h2>
            <p>
              Your listing is now "live". <br /> <br /> We may or may not audit
              your listing. If we find your listing is not genuine or fails to
              comply to any stipulations outlined in our terms and conditions,
              we may take actions against you. <br /> <br />
              Penalties include the deletion of the listing, the deactivation of
              your account permanently and/ or report you to the authorities.
              <br />
              <br />
              Thank you for your co-operation.
            </p>
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question_Thank_You;
