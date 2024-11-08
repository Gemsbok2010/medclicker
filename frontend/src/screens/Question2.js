import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import ReactGA from "react-ga4";

const Question2 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const [listOfProfessions, setListOfProfessions] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState([]);
  const [readyToShow, setReadyToShow] = useState(false);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/question2?page=${page <= 0 ? 0 : page - 1}` +
        "&professions=" +
        listOfProfessions +
        "&contract=" +
        ReactSession.get("contractType")
    );

    const data = await res.json();

    setPage(data.page);
    setMaxPage(data.maxPage);
    setListOfProfessions(data.professions);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/question2?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&professions=" +
        listOfProfessions +
        "&contract=" +
        ReactSession.get("contractType")
    );
    const data = await res.json();

    setPage(data.page);
    setMaxPage(data.maxPage);
    setListOfProfessions(data.professions);
  };

  // ========= PAGE INTERMEDIATE BUTTONS ==========
  const circles = [];

  for (let v = 0; v < maxPage; v++) {
    circles.push(v);
  }

  const IntermediateButtons = async (id) => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/question2?page=${id + 1}` +
        "&professions=" +
        listOfProfessions +
        "&contract=" +
        ReactSession.get("contractType")
    );
    const data = await res.json();

    setPage(data.page);
    setMaxPage(data.maxPage);
    setListOfProfessions(data.professions);
  };

  // ============= POPULATE SESSION DATA =================

  useEffect(() => {
    let isCancelled = false;
    setReadyToShow(false);
    setCustomerId(ReactSession.get("customerId"));
    if (!ReactSession.get("professions")) {
      setProfession("");
    } else {
      setProfession(ReactSession.get("professions"));
    }

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/question2?" +
          "page=" +
          page +
          "&contract=" +
          ReactSession.get("contractType")
      );
      const data = await res.json();
      if (isCancelled === false) {
        setPage(data.page);
        setMaxPage(data.maxPage);
        setListOfProfessions(data.professions);
        setReadyToShow(true);
      }
    };
    if (isCancelled === false) {
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
    return () => {
      isCancelled = true;
    };
  }, [maxPage, page]);

  const [professions, setProfession] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [, setActive] = useState("");

  const handleActive = (e, id) => {
    setActive(e.target.classList.add("active"));

    setListOfProfessions(
      listOfProfessions.filter((profession) => {
        if (profession.id === id) {
          setActive(e.target.classList.add("active"));
        }
        return profession.id === id;
      })
    );
  };

  // ============= POST ================
  const onSubmit = (e) => {
    e.preventDefault();
    ReactSession.set("professions", professions);
    if (ReactSession.get("contractType") === "Locum") {
      ReactGA.event({
        category: "Post Locum Ad",
        action: "Question 2",
      });
      navigate("/question3");
    } else {
      ReactGA.event({
        category: "Post Std Ad",
        action: "Question 2",
      });
      navigate("/question5");
    }
  };

  if (readyToShow === false)
    return (
      <div
        style={{
          backgroundColor: "#fff",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          zIndex: "2500",
          display: "block",
          position: "fixed",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            display: "block",
            height: "100%",
            width: "100%",
            top: "90%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <img
            style={{
              animation: "loadingframe 1000ms infinite",
              animationDirection: "alternate-reverse",
            }}
            src="/images/medclicker.png"
            width="120px"
            alt="Medclicker logo"
          />
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Select Profession | MedClicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div className="wrap">
          <form id="formThree" onSubmit={onSubmit}>
            <section className="questionCard">
              <figure>
                <Link to={customerId ? "/admin/users" : "/dashboard"}>
                  <img
                    src="/images/medclicker.png"
                    alt="LOGO"
                    className="img-fluid"
                  />
                </Link>
              </figure>

              <h2>I need a...</h2>
              <div className="btnGroup">
                <input
                  type="text"
                  placeholder="Search a Profession here"
                  id="professions"
                  value={professions}
                  readOnly
                  autoComplete="off"
                />
              </div>

              <div className="btnGroup">
                {listOfProfessions.map((profession) => {
                  return (
                    <button
                      type="button"
                      key={profession._id}
                      name={profession.professionName}
                      onClick={(e) => {
                        setProfession(e.target.innerText);
                        handleActive(e, profession._id);
                      }}
                    >
                      {profession.professionName}
                    </button>
                  );
                })}
              </div>
              <div className="buttonSegment">
                <div
                  style={{
                    height: "70px",
                    width: "100%",
                  }}
                >
                  <nav className="paginate">
                    <ul>
                      {maxPage >= 2 ? (
                        page > 1 ? (
                          <li
                            key={1}
                            className="previous"
                            onClick={pagePrevious}
                          ></li>
                        ) : (
                          <li
                            style={{ opacity: "0.2", cursor: "default" }}
                            className="previous"
                            key={2}
                          ></li>
                        )
                      ) : (
                        <span></span>
                      )}
                      {circles.map((circle) => {
                        return (
                          <li
                            key={circle}
                            className={page === circle + 1 ? "active" : ""}
                            onClick={() => IntermediateButtons(circle)}
                          >
                            {circle + 1}
                          </li>
                        );
                      })}

                      {maxPage >= 2 ? (
                        page < maxPage ? (
                          <li key={1} className="next" onClick={pageNext}></li>
                        ) : (
                          <li
                            style={{ opacity: "0.2", cursor: "default" }}
                            className="next"
                            key={2}
                          ></li>
                        )
                      ) : (
                        <span></span>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="bottomBtn">
                <button
                  className="btn-previous"
                  onClick={() => ReactSession.set("professions", "")}
                >
                  <Link to="/question1">Previous</Link>
                </button>

                {professions !== "" ? (
                  <button type="submit" className="btn-next">
                    Next
                  </button>
                ) : (
                  <button disabled className="btn-next">
                    Next
                  </button>
                )}
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
            padding-bottom: 60px;
            padding-top: 60px;
            background-image: url("./../../images/main-image.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
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

          button:active,
          button:focus {
            height: 50px;
            display: block;
          }

          .wrap .btn-next:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }
          /* ============ PAGINATION ON BOTTOM ========== */
          .paginate {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            border: none;
            z-index: 500;
            margin: 22px auto;
          }
          .paginate ul li,
          .paginate ul li a {
            width: 35px;
            height: 35px;
            background-color: #fff;
            color: #2b2b2b;
            font-weight: 700;
            float: left;
            border-radius: 50%;
            line-height: 35px;
            text-align: center;
            margin: 0px 10px;
            list-style-type: none;
            cursor: pointer;
          }
          .paginate .active {
            background-color: #2b2b2b;
            color: #fff;
          }

          .paginate .next {
            background-image: url("./../../images/arrow-down.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            background-color: #fff;
            transform: rotate(-90deg);
          }
          .paginate .previous {
            background-image: url("./../../images/left.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            background-color: #fff;
          }

          .pagination ul li:hover {
            cursor: pointer;
          }
          .buttonSegment {
            display: grid;
            grid-template-columns: 100%;
            margin: 0px 40px 0px 0px;
          }

          /* =========== LOGO AND BAR ============ */
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

          /* ======== SEARCH BAR ========= */
          .wrap .btnGroup > input {
            padding: 25px 20px;
            margin-bottom: 20px;
          }

          .wrap input[type="text"] {
            outline: none;
            padding: 4px 10px 4px 13px;
            height: 50px;
            width: 100%;
            color: #2b2b2b;
            font-size: 16px;
            font-weight: 500;
            font-family: sans-serif;
            margin-right: 15px;
            border: 1px solid #ebebeb;
          }

          /* ======== ANSWER BAR ========== */

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
            display: block;
            padding: 12px 20px;
            font-weight: 900;
            height: 50px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }

          .wrap .questionCard .btnGroup > button:hover {
            background: #14a248;
            color: #fff;
            width: 100%;
            height: 50px;
          }
          .wrap .questionCard .btnGroup > button.active {
            background: #14a248;
            color: #fff;
            width: 100%;
            height: 50px;
          }

          /* ========= PREVIOUS AND NEXT BUTTONS =============*/

          .wrap .bottomBtn {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            justify-content: space-around;
          }
          .wrap .btn-next {
            position: relative;
            background-color: #14a248;
            color: white;
            border: 1px solid #14a248;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }
          .wrap .btn-previous {
            position: relative;
            background-color: #14a248;
            color: white;
            border: 1px solid #14a248;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          .wrap .btn-previous a,
          .wrap .btn-next a {
            display: block;
            height: 100%;
            width: 100%;
            color: #fff;
            font-weight: 800;
          }

          button,
          button:active,
          button:focus {
            padding: 12px 20px;
            height: 50px;
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

          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .btn-previous,
            .btn-next {
              width: 200px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question2;
