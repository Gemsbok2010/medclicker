import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

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
                  src="/images/medclicker.png"
                  alt="LOGO"
                  className="img-fluid"
                />
              </Link>
            </figure>
            <div className="plane"></div>

            <h2 className="mt-3 mb-2">Listing Processed </h2>
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

            <button className="btn-med">
              <Link to="/dashboard">Return to Dashboard</Link>
            </button>
          </section>
        </div>
        <style jsx="true">{`
          .wrap {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            background-image: url("./../../images/main-image.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .plane {
            width: 300px;
            height: 80px;
            background-image: url("./../../images/paperairplane.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          }
          .wrap .questionCard {
            width: 475px;

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
            background: #fff;
            border: 1px solid #ebebeb;
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
          .btn-med {
            border-radius: 4px;
            font-weight: 800;
            font-size: 20px;
            border: none;
            outline: none;
            width: 220px;
            height: 50px;
            line-height: 50px;
            background: #14a248;
            color: white;
          }

          .btn-med a {
            display: block;
            color: white;
            width: 100%;
            height: 100%;
            letter-spacing: 0;
          }

          .btn-med a:active,
          .btn-med a:focus,
          .btn-med:active,
          .btn-med:focus {
            outline: none;
          }

          .questionCard figure {
            margin-bottom: 80px !important;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .questionCard p {
              width: 500px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question_Thank_You;
