import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

const QuestionContinue = () => {
  ReactSession.setStoreType("sessionStorage");

  const [contractType, setContractType] = useState("");
  const [professions, setProfessions] = useState("");
  const [normal_rate, setNormalRate] = useState("");
  const [sat_rate, setSatRate] = useState("");
  const [sun_rate, setSunRate] = useState("");
  const [ph_rate, setPhRate] = useState("");
  const [about, setAbout] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [street, setStreet] = useState("");

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setContractType(ReactSession.get("contractType"));
    setProfessions(ReactSession.get("professions"));
    setAbout(ReactSession.get("about"));
    setNormalRate(ReactSession.get("normal_rate"));
    setSatRate(ReactSession.get("sat_rate"));
    setSunRate(ReactSession.get("sun_rate"));
    setPhRate(ReactSession.get("ph_rate"));
    setFinishDate(ReactSession.get("finishDate"));
    setStreet(ReactSession.get("street"));
  }, []);

  // ========= CLEAR SESSION WHEN 重新開始 IS CLICKED =======
  const clearSession = () => {
    sessionStorage.clear();
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Q. Continue | Medclicker</title>
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

            <h2>Return where you left off?</h2>
            <div className="btnGroup">
              <button className="btn">
                {contractType === "Full-Time" && !professions ? (
                  <Link to="/question2">Continue</Link>
                ) : contractType === "Full-Time" && !about ? (
                  <Link to="/question5">Continue</Link>
                ) : contractType === "Full-Time" && !street ? (
                  <Link to="/question6">Continue</Link>
                ) : (
                  contractType === "Full-Time" && (
                    <Link to="/question-review">Continue</Link>
                  )
                )}

                {contractType === "Part-Time" && !professions ? (
                  <Link to="/question2">Continue</Link>
                ) : contractType === "Part-Time" && !about ? (
                  <Link to="/question5">Continue</Link>
                ) : contractType === "Part-Time" && !street ? (
                  <Link to="/question6">Continue</Link>
                ) : (
                  contractType === "Part-Time" && (
                    <Link to="/question-review">Continue</Link>
                  )
                )}

                {contractType === "Locum" && !professions ? (
                  <Link to="/question2">Continue</Link>
                ) : contractType === "Locum" && !finishDate ? (
                  <Link to="/question3">Continue</Link>
                ) : contractType === "Locum" && !normal_rate ? (
                  <Link to="/question4">Continue</Link>
                ) : contractType === "Locum" && !about ? (
                  <Link to="/question5">Continue</Link>
                ) : contractType === "Locum" && !street ? (
                  <Link to="/question6">Continue</Link>
                ) : (
                  contractType === "Locum" && (
                    <Link to="/question-locum-review">Continue</Link>
                  )
                )}
              </button>

              <button className="btn" onClick={clearSession}>
                <Link to="/question1">Start over</Link>
              </button>
            </div>
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

          .wrap .questionCard {
            width: 340px;
            min-height: 50vh;
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
            font-size: 22px;
            width: 100%;
            margin: 24px auto;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          .wrap .questionCard .btnGroup {
            width: 90%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }

          .wrap .questionCard .btnGroup > button {
            background: #fff;
            color: #2b2b2b;
            padding: 0;
            margin-bottom: 20px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }

          .wrap .questionCard .btnGroup > button:hover {
            background: #14a248;
            color: #fff;
          }

          .wrap .questionCard .btnGroup > button:active {
            background: #14a248;
            color: #fff;
          }

          .wrap .questionCard .btnGroup > button > a {
            display: block;
            padding: 12px 20px;
            color: #2b2b2b;
          }

          .wrap .questionCard .btnGroup > button > a:hover {
            color: #fff;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default QuestionContinue;
