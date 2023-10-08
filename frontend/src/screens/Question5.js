import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import ReactGA from "react-ga4";

const Question5 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");

  const [about, setAbout] = useState("");
  const [contractType, setContractType] = useState("");
  const [professions, setProfessions] = useState("");

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInQuestionFive(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    setAbout(ReactSession.get("about"));
    setProfessions(ReactSession.get("professions"));
    setContractType(ReactSession.get("contractType"));
    if (localStorage.getItem("contractType")) {
      ReactSession.set("contractType", localStorage.getItem("contractType"));
      setContractType(ReactSession.get("contractType"));
    }
    if (localStorage.getItem("professions")) {
      ReactSession.set("professions", localStorage.getItem("professions"));
      setProfessions(ReactSession.get("professions"));
    }
  }, []);

  function outPutErrorMessagesInAllusers() {}

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_BACKEND_URL + "api/listings/question5", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ about }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInQuestionFive(data.invalid);
        } else {
          ReactSession.set("about", data.about);
          if (ReactSession.get("contractType") === "Locum") {
            ReactGA.event({
              category: "Post Locum Ad",
              action: "Question 5",
            });
            navigate("/question6");
          } else {
            ReactGA.event({
              category: "Post Std Ad",
              action: "Question 5",
            });
            navigate("/question6");
          }
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          const errorMessage = `You need to write at least 50 characters.`;
          outPutErrorMessagesInAllusers(errorMessage);
        }
      });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Q. About the Role | MedClicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <div className="wrap">
          <form action="" id="formSeven" onSubmit={onSubmit}>
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

              <h2>About the Role & Work Place</h2>
              <div className="errorMessageHere">
                {alert ? (
                  <div className="alert">
                    <img
                      src="/images/cross-black.png"
                      style={{ width: "12px" }}
                      alt=""
                    />
                    <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <textarea
                id="about"
                maxLength={2000}
                placeholder="Maximum 2000 words"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
              <br />
              <h2>Template Example</h2>
              {ReactSession.get("contractType") === "Locum" ? (
                <textarea
                  placeholder=""
                  disabled
                  value={`Locum Pharmacist needed to cover 4 week or longer from Monday 18th February. The pharmacy is located in a friendly community town, approx 2 1/2 hours drive or 190km NW from Sydney. The customers in the pharmacy are very friendly, supportive and patient.

Dates/Times:
Monday 18th February - Saturday 16th March
* Monday to Friday 8.30am - 6.00pm
* Saturday 8.30am - 6.30pm
* Sunday 8.30am - 6.00pm

Job Specifications: 
Minfos Disp, 120 scripts, webster packs, 20 pharmacotherapy patients (Methadone and Subutex). Weekdays $45/hr, Saturday $50/hr, Sunday $60/hr + Super. 
	
Travel and accommodation covered. Vehicle provided.
Must have ABN.`}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              ) : (
                <textarea
                  placeholder=""
                  disabled
                  value={`About the Role:

We are seeking a ${contractType} ${professions} in charge to join our team from Monday-Friday on a permanent basis. You will be joining a friendly and experienced team who are passionate about providing the best health solutions to its patients along with exceptional customer service. As Pharmacist, you will be responsible for dispensing and checking prescriptions, counselling on medications and OTC products,dispensing OTP, vaccinations, Medschecks and much more.

About our Ideal Candidate:
* You hold a current unrestricted Pharmacist Registration with AHPRA
* You have excellent communication and interpersonal skills
* You have excellent customer service skills
* You are able to build rapport with customers, staff, as well as other healthcare professionals
* You are flexible, hardworking, and reliable
* You are friendly and approachable
* You are able work independently as well as in a busy team environment
* You hold a current vaccination certificate or are willing to obtain one.
* Newly registered Pharmacists are encouraged to apply.

About the Location:
Located mid way between Melbourne and Ballarat. Surrounded by a rich collection of state parks, national parks and waterways which offer bush walking tracks and the opportunity to explore the scenic gorges and ranges in the area.

The Offer:
Attractive rate of $60 per hour + super on offer for the right candidate depending on experience. You will be required to work a minimum of 38 hours a week from Monday to Friday, with the possibility of working weekend shifts if desired. Additionally, relocation assistance and short-term accommodation assistance are available for the right candidate.
`}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              )}

              <div className="bottomBtn">
                <button className="btn-previous">
                  {ReactSession.get("contractType") === "Locum" ? (
                    <Link to="/question4">Previous</Link>
                  ) : (
                    <Link to="/question2">Previous</Link>
                  )}
                </button>

                {about ? (
                  <button type="submit" className=" btn-next">
                    Next
                  </button>
                ) : (
                  <button disabled className=" btn-next">
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
          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 100%;
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
          }
          .wrap .questionCard .btnGroup > button > a {
            display: block;
            padding: 12px 20px;
            color: #6b7c93;
          }
          .wrap .questionCard .btnGroup > button > a:hover {
            color: #fff;
          }
          textarea {
            height: 200px !important;
            color: #2b2b2b;
            width: 100%;
            padding: 10px;
            border: 1px solid rgb(238, 238, 238);
            margin-bottom: 15px;
            white-space: pre-wrap;
          }

          textarea:focus,
          textarea:active {
            outline: none;
          }

          span {
            font-size: 14px;
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

          .wrap .btn-next:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
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
          button:focus,
          input[type="submit"]:active,
          input[type="submit"]:focus {
            padding: 12px 20px;
            height: 50px;
            background: #fff;
            color: #2b2b2b;
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
            .btn-volg,
            .btn-vori {
              width: 200px;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Question5;
