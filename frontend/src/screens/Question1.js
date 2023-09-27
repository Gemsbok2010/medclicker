import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import ReactGA from "react-ga4";

const Question1 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setContractType(ReactSession.get("contractType"));
  }, []);

  function clearSession() {
    sessionStorage.clear();
  }

  const [contractType, setContractType] = useState("");
  const [, setActive] = useState("");

  const handleActive = (e) => {
    setActive(e.target.setAttribute("class", "active"));
  };

  // ========== POST ================
  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("contractType", contractType);
    ReactGA.event({
      category: "Post Ad",
      action: "Question 1",
    });
    navigate("/question2");
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Q. Contract Type | MedClicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div className="wrap">
          <form id="formOne" action="" onSubmit={onSubmit}>
            <section className="questionCard">
              <figure>
                <Link to="/dashboard">
                  <img
                    src="/images/medclicker.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>
              <h2>Type of Employment</h2>
              <div className="btnGroup">
                {ReactSession.get("contractType") === "Full-Time" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    Full-Time
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    Full-Time
                  </button>
                )}

                {ReactSession.get("contractType") === "Part-Time" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    Part-Time
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    Part-Time
                  </button>
                )}

                {ReactSession.get("contractType") === "Locum" ? (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                    className="active"
                  >
                    Locum
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setContractType(e.currentTarget.innerText);
                      handleActive(e);
                    }}
                    type="submit"
                  >
                    Locum
                  </button>
                )}
              </div>
              <div className="bottomBtn">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    clearSession();
                  }}
                >
                  <Link to="/dashboard">Cancel</Link>
                </button>
              </div>
            </section>
          </form>
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
            padding-bottom: 60px;
            padding-top: 60px;
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
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          }

          .active,
          button {
            padding: 12px 20px;
            height: 50px;
            font-weight: 900;
            background: #fff;
            color: #2b2b2b;
            margin-bottom: 20px;
            border: none;
            outline: none;
            border-radius: 0px;
            cursor: pointer;
            font-size: 16px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .wrap .questionCard .btnGroup > button.active {
            background: #14a248;
            color: #fff;
            width: 100%;
            height: 50px;
          }

          .wrap .questionCard > figure {
            width: 200px;
            margin-bottom: 40px;
          }

          .wrap .questionCard > figure > a {
            display: block;
          }

          .wrap .questionCard h2 {
            font-family: "Noto Sans TC", sans-serif;
            text-align: center;
            font-weight: 800;
            font-size: 22px;
            width: 100%;
            margin: 0px auto 24px;
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

          .wrap .questionCard .btnGroup > button:hover {
            background: #14a248;
            color: #fff;
          }

          .wrap .questionCard .btnGroup > button:active {
            background: #14a248;
            color: #fff;
            border: none;
            outline: none;
          }
          .wrap .questionCard .btnGroup > button:focus {
            background: #14a248;
            color: #fff;
            border: none;
            outline: none;
          }

          .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .btn-cancel {
            position: relative;
            background-color: #e40000;
            color: white;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            margin-top: 20px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .btn-cancel:focus,
          .btn-cancel:active {
            outline: none;
            border: none;
          }
          .btn-cancel a {
            color: white;
            font-weight: 800;
            width: 100%;
            height: 100%;
            font-family: "Noto Sans TC", sans-serif;
            position: relative;
            display: block;
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

export default Question1;
