import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";

const CreditCardSuccess = () => {
  const [close, setClose] = useState(false);
  const [newApply, setNewApply] = useState("");
  const [isloaded, setIsloaded] = useState(false);
  const user = useSelector((state) => state.userInfo.value);

  // ============ LOCUM DATA ===========
  useEffect(() => {
    setIsloaded(false);
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/dashboard/dashboard/" +
          user.email
      )
      .then((response) => {
        if (response.status === 200) {
          setNewApply(response.data.newApply);
          setIsloaded(true);
        }
      });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Payment Confirmation | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700&family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
          />
        </Helmet>
        <nav>
          <div className="dashboard">
            <Link to="/">
              <div className="logo">
                <img src="/images/medclicker.png" className="logo" alt="" />
              </div>
            </Link>
          </div>
        </nav>

        <div className="wrap">
          <main>
            <aside className={close ? "moveback" : "movehere"}>
              {close ? (
                <button id="close-btn" onClick={() => setClose(false)}>
                  <span className="material-icons-sharp">menu_open</span>
                </button>
              ) : (
                <button id="close-btn" onClick={() => setClose(true)}>
                  <span className="material-icons-sharp">close</span>
                </button>
              )}
              <div className="sidebar">
                <Link to="/dashboard" className="active">
                  <span className="material-icons-sharp">dashboard</span>
                  <h4>Dashboard Home</h4>
                </Link>
                <Link to="/listingManager">
                  <span className="material-icons-sharp">person_search</span>

                  <h4>
                    {newApply === 0 ? (
                      ""
                    ) : !isloaded ? (
                      ""
                    ) : (
                      <span className={newApply !== 0 ? "alertCircle" : ""}>
                        {newApply}
                      </span>
                    )}
                    Listing Manager
                  </h4>
                </Link>
                <Link to="/invoices">
                  <span className="material-symbols-outlined">fact_check</span>
                  <h4>Invoices</h4>
                </Link>
                <Link to="/contact">
                  <span className="material-icons-sharp">help_outline</span>
                  <h4>Contact us</h4>
                </Link>
                <ExternalLink href="/logout" target="_self">
                  <span className="material-icons-sharp">logout</span>
                  <h4>Log Out</h4>
                </ExternalLink>
              </div>

              {/* END OF SIDEBAR */}
            </aside>

            <section className="middle">
              <div className="myaccountbox">
                <div className="leftBox yes">
                  <p>Success. Payment completed.</p>
                  <p>
                    Your listing should be live within 2 minutes, and you will
                    also be notified via email.
                  </p>
                </div>
              </div>
            </section>
            {/* END OF MIDDLE */}
          </main>

          <Footer />
        </div>
        <style jsx="true">{`
          /* ============ RIGHT BOX =============== */
          .rightBox {
            position: relative;
            background-color: white;
            width: 380px;
            margin-right: 10px;
            border-radius: 5px;
            border-top: 5px solid #14a248;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          .rightBox h2 {
            font-size: 1.6rem;
            word-break: break-word;
            letter-spacing: -0.02em;
            margin-bottom: 10px;
            color: #2b2b2b;
            margin-top: 15px;
            font-weight: 800;
          }

          .yes {
            background-image: url(./../../images/check.png);
            background-repeat: no-repeat;
            background-position: 15px 7px;
            background-size: 18px;
          }

          /* ======== ROOT CSS VARIABLES ========== */

          :root {
            --color-white: white;
            --color-light: #f0eff5;
            --color-gray-light: #89848c;
            --color-gray-dark: #56555e;
            --color-dark: #27282f;
            --color-primary: #14a248;
            --color-success: rgb(34, 202, 75);
            --color-danger: rgb(255, 67, 54);
            --color-warning: rgb(234, 181, 7);
            --color-purple: rgb(160, 99, 245);

            --color-primary-light: rgba(71, 7, 234, 0.2);
            --color-success-light: rgba(34, 202, 75, 0.2);
            --color-danger-light: rgba(255, 67, 54, 0.2);
            --color-purple-light: rgba(160, 99, 245, 0.2);

            --card-padding: 1.6rem;
            --padding-1: 1rem;
            --padding-2: 8px;

            --card-border-radius: 1.6rem;
            --border-radius-1: 1rem;
            --border-radius-2: 6px;
          }

          * {
            margin: 0;
            padding: 0;
            outline: 0;
            border: 0;
            appearance: none;
            list-style: none;
            text-decoration: none;
            box-sizing: border-box;
          }
          html {
            font-size: 12px;
          }

          body {
            background-color: var(--color-light);
            font-family: "Noto Sans TC", sans-serif;
            min-height: 100vh;
            color: var(--color-dark);
          }
          h1 {
            font-size: 2.2rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          h3 {
            font-size: 1.2rem;
          }
          h4 {
            font-size: 1rem;
          }
          h5 {
            font-size: 0.86rem;
            font-weight: 500;
          }

          h6 {
            font-size: 0.76rem;
          }

          p {
            font-size: 0.86rem;
            color: var(--color-gray-dark);
          }

          /* ============== NAV BAR ============= */

          nav {
            width: 100%;
            background-color: var(--color-white);
            padding: 1rem 0;
            height: 65px;
          }

          nav .dashboard {
            position: relative;
            display: flex;
            margin: 0 auto;
            width: 96%;
            align-items: center;
            height: 35px;
            line-height: 35px;
          }

          nav img.logo {
            width: 10rem;
            display: block;
          }

          nav .logo.active {
            display: block;
          }

          /* ============ ASIDE & SIDEBAR ============ */
          main {
            display: grid;
            grid-template-columns: 18rem auto 30rem;
            gap: 2rem;
            width: 96%;
            margin: 1rem auto 4rem;
          }

          main aside {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 88vh;
            transform: translateX(0%);
          }
          main aside button#close-btn:focus,
          main aside button#close-btn:active {
            outline: none;
          }

          main .sidebar .alertCircle {
            height: 20px;
            width: 20px;
            background-color: #e40000;
            color: white;
            font-size: 12px;
            border-radius: 50%;
            text-align: center;
            line-height: 18px;
            position: absolute;
            transform: translate(-450%, -20%);
          }

          /* will be shown only on mobile and tablets */
          main aside button#close-btn {
            display: none;
          }

          main aside .sidebar a {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            height: 4.2rem;
            color: var(--color-gray-light);
            position: relative;
          }
          main aside .sidebar {
            background-color: white;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          main aside .sidebar a:hover {
            background-color: var(--color-light);
          }

          main aside .sidebar a span {
            font-size: 1.7rem;
            margin-left: 3rem;
            transition: all 300ms ease;
          }

          main aside .sidebar a.active {
            background: var(--color-white);
            color: var(--color-primary);
          }

          main aside .sidebar a.active:before {
            content: "";
            width: 6px;
            height: 100%;
            position: absolute;
            background: var(--color-primary);
          }

          main aside .sidebar a:hover {
            color: var(--color-primary);
          }

          main aside .sidebar a:hover span {
            margin-left: 2rem;
          }

          main aside .sidebar h4 {
            font-weight: 500;
          }
          .sidebar .disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          main aside .sidebar .disabled:hover {
            color: #888;
          }

          /* ============= MIDDLE SECTION ============= */
          .myaccountbox {
            margin-top: 30px;
            display: block;

            width: 880px;
          }

          .leftBox {
            position: relative;
            background-color: white;
            width: 100%;
            margin-right: 10px;
            border-radius: 5px;
            padding: 5px 25px;
            border-top: 5px solid #14a248;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }

          .leftBox p {
            font-size: 14px;
            font-weight: 600;
            margin-left: 15px;
            margin-bottom: 0px;
          }

          .creditcard {
            background-image: url(./../../images/creditcard.png);
            background-repeat: no-repeat;
            background-position: 5px 15px;
            background-size: 25px;
          }

          main section.midde .header {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          main section.middle .header input[type="date"] {
            padding: 0.5rem 2rem;
            border-radius: var(--border-radius-2);
            background: var(--color-white);
            color: var(--color-gray-dark);
          }

          main section.middle .cards {
            margin-top: 1rem;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }

          main section.middle .cards .card {
            background: linear-gradient(#ff796f, #bd261b);
            padding: var(--card-padding);
            border-radius: var(--card-border-radius);
            color: #fff;
            height: 16rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 2rem 3rem var(--color-danger-light);
            transition: all 300ms ease;
            min-width: 22rem;
          }

          main section.middle .cards .card:nth-child(2) {
            background: linear-gradient(#7f8191, #27282f);
            box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.2);
          }

          main section.middle .cards .card:nth-child(3) {
            background: linear-gradient(#5d70ff, #5719c2);
            box-shadow: 0 2rem 3rem var(--color-primary-light);
          }
          main section.middle .cards .card:hover {
            box-shadow: none;
          }

          main section.middle .card .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          main section.middle .card .top .left {
            display: flex;
            gap: 0.5rem;
          }
          main section.middle .card .top .left h2 {
            font-weight: 200;
            font-size: 1.4rem;
          }

          main section.middle .card .top .left img {
            width: 2.3rem;
            height: 2.3rem;
            border: 1px solid white;
            border-radius: var(--border-radius-2);
            padding: 0.4rem;
          }

          main section.middle .card .top .right img.right {
            width: 3.5rem;
          }

          main section.middle .card .middle {
            display: flex;
            justify-content: space-between;
          }

          main section.middle .card .middle .chip {
            width: 3.5rem;
          }
          main section.middle .card .bottom {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          main section.middle .card .bottom .right {
            display: flex;
            gap: 2rem;
          }

          .input-group input:focus + label {
            transform: translate(-8px, -22px) scale(0.8);
            font-size: 13px;
            color: #14a248;
            opacity: 1;
          }

          .input-group input.springbok + label {
            transform: translate(-8px, -22px) scale(0.8);
            font-size: 13px;
            color: #14a248;
            opacity: 1;
          }

          .noLocumPayment {
            width: 100%;
            color: white;
            background-color: #14a248;
            border-radius: 4px;
            cursor: pointer;
            height: 42px;
            margin-top: 8px;
            position: relative;
            top: 5%;
          }

          /* =========== CHECKBOX ========== */

          input[type="checkbox"] {
            display: none;
          }
          input[type="checkbox"] label {
            color: red;
          }
          input[type="checkbox"] + label {
            position: relative;
            cursor: pointer;
            font-size: 16px;
            font-family: sans-serif;
            font-weight: 800;
            margin: 2px 0px 8px 35px;
            width: 97%;
            display: block;
            color: #2b2b2b;
            margin-bottom: 25px;
          }

          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -33px;
            top: 21px;
            width: 24px;
            height: 24px;
            display: block;
            background: white;
            border-radius: 0px;
            border: 2px solid rgb(218, 218, 218);
          }
          input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -31px;
            top: 24px;
            width: 19px;
            height: 19px;
            display: block;
            z-index: 1;
            background: url("./../../images/tick.png");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
            outline: 3px solid #14a248;
            border: none;
          }
          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

          /* ============ MEDIA QUERIES FOR TABLETS =========*/
          @media screen and (max-width: 1024px) {
            nav .search-bar {
              display: none;
            }
            nav .profile-area {
              gap: 2rem;
            }

            .myaccountbox {
              display: block;
              margin-left: 40px;
              width: 430px;
            }

            main {
              grid-template-columns: 1fr;
            }

            main .moveback {
              transform: translateX(-80%);
              transition: all 300ms ease;
            }
            main .movehere {
              transform: translateX(0%);
              transition: all 300ms ease;
              z-index: 2000;
            }
            main aside {
              position: fixed;
              top: 0;
              left: -100%;
              z-index: 3;
              background: var(--color-white);
              width: 22rem;
              height: 100vh;
              box-shadow: 2rem 0 2rem var(--color-primary-light);
              display: "none";
              animation: showSidebar 500ms ease-in forwards;
            }

            @keyframes showSidebar {
              to {
                left: 0;
              }
            }

            main aside button#close-btn {
              display: inline-block;
              width: 3rem;
              height: 3rem;
              position: absolute;
              top: 1rem;
              right: 1rem;
              z-index: 4;
              background: transparent;
              color: var(--color-dark);
            }
            button:hover {
              cursor: pointer;
            }

            main aside .sidebar {
              margin-top: 4rem;
            }

            main aside .updates {
              display: none;
            }

            main section.middle .cards {
              grid-template-columns: 1fr 1fr;
            }

            main canvas {
              margin: 3rem 0 1rem;
            }

            main section.right .recent.transactions {
              margin-top: 3rem;
            }
          }

          /*  ====== MEDIA QUERIES FOR MOBILE PHONES */

          @media screen and (max-width: 768px) {
            footer .font-weight-light-mobile {
              display: block;
              color: #212529;
            }
            footer .font-weight-light {
              display: none !important;
            }

            main .moveback {
              transform: translateX(-80%);
              transition: all 300ms ease;
            }
            main .movehere {
              transform: translateX(0%);
              transition: all 300ms ease;
            }

            nav .profile-area {
              gap: 2.6rem;
            }
            nav .profile h5,
            nav .profile span {
              display: none;
            }

            main section.middle .cards {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default CreditCardSuccess;
