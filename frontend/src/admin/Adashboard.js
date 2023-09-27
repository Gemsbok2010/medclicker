import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
import Footer from "../components/Footer";

const Adashboard = () => {
  const user = useSelector((state) => state.userInfo.value);
  const email = user.email;
  const [dropdown, setDropdown] = useState(false);
  const [, setIsloaded] = useState(false);

  const [close, setClose] = useState(false);
  const [applications, setApplications] = useState("");

  const [nsw, setNSW] = useState("");
  const [vic, setVIC] = useState("");
  const [qld, setQLD] = useState("");
  const [wa, setWA] = useState("");
  const [sa, setSA] = useState("");
  const [act, setACT] = useState("");
  const [nt, setNT] = useState("");
  const [tas, setTAS] = useState("");

  const [noOfLocums, setNoOfLocums] = useState("");
  const [inactiveList, setInactiveList] = useState("");
  const [activeList, setActiveList] = useState("");
  const [expired, setExpired] = useState("");

  const [nswLocum, setNSWLocum] = useState("");
  const [vicLocum, setVICLocum] = useState("");
  const [qldLocum, setQLDLocum] = useState("");
  const [waLocum, setWALocum] = useState("");
  const [saLocum, setSALocum] = useState("");
  const [actLocum, setACTLocum] = useState("");
  const [ntLocum, setNTLocum] = useState("");
  const [tasLocum, setTASLocum] = useState("");

  const [inactiveLocum, setInactiveLocum] = useState("");
  const [activeLocum, setActiveLocum] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let isCancelled = false;
    setIsloaded(false);
    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:4000/api/admin/dashboard/" + email
      );
      const data = await res.json();

      if (isCancelled === false) {
        setUserInfo(data.admin);
        setApplications(data.applications);
        setNoOfUsers(data.noOfUsers);
        setNSW(data.nsw);
        setVIC(data.vic);
        setQLD(data.qld);
        setNT(data.nt);
        setACT(data.act);
        setWA(data.wa);
        setSA(data.sa);
        setTAS(data.tas);
        setNSWLocum(data.nswLocum);
        setVICLocum(data.vicLocum);
        setQLDLocum(data.qldLocum);
        setNTLocum(data.ntLocum);
        setSALocum(data.saLocum);
        setTASLocum(data.tasLocum);
        setWALocum(data.waLocum);
        setACTLocum(data.actLocum);
        setNoOfLocums(data.noOfLocums);
        setActiveList(data.activeList);
        setInactiveList(data.inactiveList);
        setExpired(data.expiredList);
        setInactiveLocum(data.inactiveLocum);
        setActiveLocum(data.activeLocum);
        setIsloaded(true);
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
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Dashboard | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
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
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />

          <meta name="description" content="Medclicker" />
        </Helmet>
        <nav>
          <div className="dashboard">
            <Link to="/">
              <div className="logo">
                <img src="/images/mainLogo.png" className="logo" alt="" />
              </div>
            </Link>

            <div className="profile-area">
              <div className="nav-box">
                <figure
                  className="smallPhoto"
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                >
                  <img src={user.filename} alt="" />
                </figure>
                {dropdown ? (
                  <div id="dropItem">
                    <div className="dropwrap">
                      <Link to="/admin/dashboard">
                        <h4>Admin Console</h4>
                      </Link>
                      <Link to="/homepage">
                        <h4>Content Management</h4>
                      </Link>
                      <Link to="/admin/users">
                        <h4>User Management</h4>
                      </Link>
                      <Link to="/admin/locums">
                        <h4>Locum Management</h4>
                      </Link>
                      <Link to="/admin/applications">
                        <h4>Application Management</h4>
                      </Link>
                      <Link to="/admin/agreements">
                        <h4>Locum Agreements Management</h4>
                      </Link>
                      <Link to="/admin/listings">
                        <h4>Listing Management (All)</h4>
                      </Link>
                      <Link to="/locumlistings">
                        <h4>Listing Management (Locum)</h4>
                      </Link>
                      <Link to="/admin/professions">
                        <h4>Profession Management</h4>
                      </Link>
                      <Link to="/admin/payconsole">
                        <h4>Payment Plans</h4>
                      </Link>
                      <Link to="/admin/payments">
                        <h4>Payment Management</h4>
                      </Link>
                      <Link to="/admin/security">
                        <h4>Security Settings</h4>
                      </Link>
                      <Link to="/sms">
                        <h4>SMS</h4>
                      </Link>
                      <ExternalLink href="/signout" target="_self">
                        <h4>Log Out</h4>
                      </ExternalLink>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
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
                <Link to="#" className="active">
                  <span className="material-icons-sharp">dashboard</span>
                  <h4>Dashboard Home</h4>
                </Link>
                <Link to="/homepage">
                  <span className="material-icons-sharp">settings</span>
                  <h4>Content Management</h4>
                </Link>
                <Link to="/admin/users">
                  <span className="material-icons-sharp">person_search</span>
                  <h4>User Management</h4>
                </Link>
                <Link to="/admin/locums">
                  <span className="material-icons-sharp">person_search</span>
                  <h4>Locum Management</h4>
                </Link>

                <Link to="/admin/applications">
                  <span className="material-symbols-outlined">fact_check</span>
                  <h4>Application Management</h4>
                </Link>

                <Link to="/admin/agreements">
                  <span className="material-symbols-outlined">fact_check</span>
                  <h4>Locum Agreements Management</h4>
                </Link>

                <Link to="/admin/listings">
                  <span className="material-icons-sharp">search</span>
                  <h4>Listing Management</h4>
                </Link>
                <Link to="/locumlistings">
                  <span className="material-icons-sharp">search</span>
                  <h4>Listing Management (Locum)</h4>
                </Link>
                <Link to="/admin/professions">
                  <span className="material-icons-sharp">person</span>
                  <h4>Profession Management</h4>
                </Link>
                <Link to="/admin/payconsole">
                  <span className="material-icons-sharp">account_balance</span>
                  <h4>Payment Plans</h4>
                </Link>
                <Link to="/admin/payments">
                  <span className="material-icons-sharp">local_atm</span>
                  <h4>Payment Management</h4>
                </Link>
                <Link to="/admin/security">
                  <span className="material-icons-sharp">settings</span>
                  <h4>Security Settings</h4>
                </Link>
                <Link to="/sms">
                  <span className="material-symbols-outlined">sms</span>
                  <h4>SMS</h4>
                </Link>
                <Link to="/signout">
                  <span className="material-icons-sharp">logout</span>
                  <h4>Log Out</h4>
                </Link>
              </div>

              {/* END OF SIDEBAR */}
            </aside>

            <section className="middle">
              <div className="myaccountbox">
                <div className="leftBox">
                  <div className="topBox">
                    <div>
                      <h2>Admin</h2>
                      <h4>User ID: {userInfo.nanoId}</h4>
                      <h3>Name</h3>

                      <p>
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div className="controlButton">
                      <button className="controlpanel">
                        <Link style={{ wdith: "100px" }} to="/dashboard">
                          Exit Admin Console
                        </Link>
                      </button>
                    </div>
                  </div>
                  <div className="middleBox">
                    <h2 style={{ textAlign: "center" }}>Users</h2>

                    {noOfUsers <= 1 ? (
                      <p>{noOfUsers} user</p>
                    ) : (
                      <p>{noOfUsers} users</p>
                    )}
                  </div>
                  <div className="bottomBox">
                    <h2 style={{ textAlign: "center" }}>Applications</h2>
                    {applications <= 1 ? (
                      <p>{applications} application</p>
                    ) : (
                      <p>{applications} applications</p>
                    )}
                  </div>
                </div>
                <div className="gridBox">
                  <div className="grid">
                    <div className="heading">
                      <h2>Listings by Locations</h2>
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td>NSW</td>
                          <td>{nsw}</td>
                        </tr>
                        <tr>
                          <td>VIC</td>
                          <td>{vic}</td>
                        </tr>
                        <tr>
                          <td>QLD</td>
                          <td>{qld}</td>
                        </tr>
                        <tr>
                          <td>ACT</td>
                          <td>{act}</td>
                        </tr>
                        <tr>
                          <td>TAS</td>
                          <td>{tas}</td>
                        </tr>
                        <tr>
                          <td>SA</td>
                          <td>{sa}</td>
                        </tr>
                        <tr>
                          <td>NT</td>
                          <td>{nt}</td>
                        </tr>
                        <tr>
                          <td>WA</td>
                          <td>{wa}</td>
                        </tr>
                        <tr>
                          <td>Nationwide</td>
                          <td>{wa + nt + sa + tas + act + qld + vic + nsw}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table style={{ marginTop: "5px" }}>
                      <tbody>
                        <tr>
                          <td>Active</td>
                          <td>{activeList}</td>
                        </tr>
                        <tr>
                          <td>Paused</td>
                          <td>{inactiveList}</td>
                        </tr>
                        <tr>
                          <td style={{ color: "#b9b9b9" }}>Expired</td>
                          <td style={{ color: "#b9b9b9" }}>{expired}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid">
                    <div className="heading">
                      <h2>Locums by Locations</h2>
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td>NSW</td>
                          <td>{nswLocum}</td>
                        </tr>
                        <tr>
                          <td>VIC</td>
                          <td>{vicLocum}</td>
                        </tr>
                        <tr>
                          <td>QLD</td>
                          <td>{qldLocum}</td>
                        </tr>
                        <tr>
                          <td>ACT</td>
                          <td>{actLocum}</td>
                        </tr>
                        <tr>
                          <td>TAS</td>
                          <td>{tasLocum}</td>
                        </tr>
                        <tr>
                          <td>SA</td>
                          <td>{saLocum}</td>
                        </tr>
                        <tr>
                          <td>NT</td>
                          <td>{ntLocum}</td>
                        </tr>
                        <tr>
                          <td>WA</td>
                          <td>{waLocum}</td>
                        </tr>
                        <tr>
                          <td>Nationwide</td>
                          <td>{noOfLocums}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table style={{ marginTop: "5px" }}>
                      <tbody>
                        <tr>
                          <td>Visible</td>
                          <td>{activeLocum}</td>
                        </tr>
                        <tr>
                          <td>Dormant</td>
                          <td>{inactiveLocum}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            {/* END OF MIDDLE */}
          </main>
          <Footer />
        </div>

        <style jsx="true">{`
          .wrap {
             {
              /* padding-bottom: 30px; */
            }
          }

          table {
            width: 100%;
            position: relative;
            border-spacing: 0;
            border-collapse: collapse;
          }

          tbody tr {
            height: 40px;
          }
          tbody .service-type {
            border-bottom: 1px solid #eee;
            height: 40px;
          }

          tbody .service-type td {
            box-sizing: border-box;
            padding: 0;
            font-size: 14px;
          }
          tbody tr td {
            border-bottom: 1px solid rgb(238, 238, 238);
            width: 140px;
            background-color: rgb(238, 235, 235);
            padding: 0px 0px 0px 12px;
            box-sizing: border-box;
            font-size: 14px;
            color: #56444e;
            font-weight: 800;
            border-left: 1px solid white;
            border-bottom: 1px solid #fff;
          }

          .backdrop {
            position: fixed;
            display: block;
            background-color: rgba(33, 40, 46, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2500;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }

          .myaccountbox {
            margin-top: 0px;
            display: flex;
            justify-content: space-bewtween;
            width: 1280px;
          }

          .leftBox {
            background-color: white;
            background: transparent;
            width: 430px;
            height: 500px;
            display: grid;

            grid-template-row: 3fr 3fr 3fr;
            grid-row-gap: 12px;
            grid-column-gap: 12px;

            margin-right: 10px;
            border-radius: 5px;
          }

          .leftBox h2 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 400;
            letter-spacing: -0.02em;
            margin-bottom: 18px;
          }
          .leftBox h4 {
            color: rgba(99, 106, 109);
            font-weight: 100;
            font-family: "Noto Sans TC", sans-serif;
            font-size: 14px;
            margin-bottom: 16px;
          }

          .leftBox h3 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 400;
            letter-spacing: -0.02em;
            margin-bottom: 0px;
          }

          .leftBox p {
            font-size: 28px;
            font-weight: 600;
          }

          .topBox {
            display: flex;
            border-top: 5px solid #14a248;
            justify-content: space-between;
            background-color: #fff;
            padding: 16px 20px 0px 20px;
            margin: 0;
            border-radius: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          .topBox .controlButton {
            position: relative;
            height: 100px;
            width: 140px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-betweeb;
          }

          .topBox .controlButton .controlpanel a {
            width: 140px;
            background: linear-gradient(210deg, #006098, rgba(0, 96, 152, 0));
            background-color: #54c8e8;
            border-radius: 4px;
          }

          .controlButton button {
            margin-top: 0px;
            top-right: 0px;
            top: 0;
            position: relative;
          }

          .middleBox {
            display: block;
            border-top: 5px solid #14a248;
            background-color: #fff;
            padding: 16px 20px 0px 20px;
            margin: 0;

            border-radius: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          .bottomBox h2,
          .middleBox h2 {
            font-weight: 600;
            font-size: 28px;
            color: var(--color-gray-dark);
            margin-bottom: 3px;
          }

          .bottomBox p,
          .middleBox p {
            font-weight: 600;
            font-size: 48px;
            color: var(--color-gray-dark);
            text-align: center;
            margin-bottom: 0;
          }

          .bottomBox {
            display: block;
            border-top: 5px solid #14a248;

            background-color: #fff;
            padding: 16px 20px 0px 20px;
            margin: 0;

            border-radius: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }

          .topBox button {
            position: relative;
            color: white;
            cursor: pointer;
            font-weight: 500;
            width: 80px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 15px;
            border-radius: 4px;
            padding: 0;
            margin-top: 20px;
          }

          .topBox a {
            color: white;
            height: 100%;
            width: 100%;
            display: block;
            font-size: 14px;
          }

          .gridBox {
            background-color: transparent;
            height: 500px;
            width: 630px;
            border-radius: 5px;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-row-gap: 12px;
            grid-column-gap: 12px;
            margin-top: 0px;
          }
          .grid {
            background-color: white;
            border-radius: 5px;
            cursor: pointer;
            height: 100%;
            padding: 5px 10px 20px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }
          .grid .heading {
            margin-top: 20px;
          }

          .grid span {
            font-size: 18px;
          }

          /* ROOT CSS VARIABLES */

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

          .dark-theme {
            --color-white: #131316;
            --color-light: #23232a;
            --color-dark: #ddd;
            --color-gray-dark: #adacb5;
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

          small {
            font-weight: 300;
            font-size: 0.77rem;
          }

          .text-muted {
            color: var(--color-gray-light);
          }
          .primary {
            color: var(--color-primary);
          }
          .success {
            color: var(--color-success);
          }
          .danger {
            color: var(--color-danger);
          }
          .purple {
            color: var(--color-purple);
          }

          .bg-primary {
            background-color: var(--color-primary);
            box-shadow: 0 0.8rem 0.8rem var(--color-primary-light);
          }
          .bg-success {
            background-color: var(--color-success);
            box-shadow: 0 0.8rem 0.8rem var(--color-success-light);
          }
          .bg-danger {
            background-color: var(--color-danger);
            box-shadow: 0 0.8rem 0.8rem var(--color-danger-light);
          }
          .bg-purple {
            background-color: var(--color-purple);
            box-shadow: 0 0.8rem 0.8rem var(--color-purple-light);
          }
          .bg-dark {
            background-color: #27282f;
            box-shadow: 0 0.8rem 0.8rem rgba(0, 0, 0, 0.2);
          }
          /* ============== NAV BAR ============= */

          nav {
            width: 100%;
            background-color: var(--color-white);
            padding: 1rem 0;
            height: 65px;
          }

          nav .dashboard {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 96%;
            margin: 0 auto;
          }

          nav img.logo {
            width: 10rem;
            display: block;
          }

          nav .logo.active {
            display: block;
          }

          nav .profile-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
          }

          nav .profile-area .theme-btn .active {
            background: var(--color-dark);
            border-radius: var(--border-radius-2);
            color: var(--color-white);
          }

          nav .profile-area .profile {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .nav-box {
            width: 35px;
            height: 35px;
            left: 90%;
            top: 50%;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
          }

          .nav-box > figure {
            width: 200px;
            position: absolute;
            transform: translate(-50%, -50%);
            left: 10%;
            top: 50%;
          }
          .nav-box .smallPhoto {
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            width: 39px;
            height: 39px;
            background: #eee;
            border: 2px solid white;
            cursor: pointer;
          }
          .nav-box .smallPhoto img {
            position: absolute;
            max-width: 48px;
            height: auto;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }

          .nav-box #dropItem {
            width: 280px;
            background: white;
            position: absolute;
            border: 1px solid #ebebeb;
            border-top: none;
            transform: translateX(-84%);
            display: block;
          }

          .nav-box #dropItem.open {
            display: block;
          }

          .nav-box .dropwrap {
            padding-bottom: 0px;
            width: 88%;
            background: var(--color-white);
            margin-top: 3%;
            margin-left: 6%;
          }

          .nav-box .dropwrap a {
            color: #777;
            font-weight: 500;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            height: 45px;
            line-height: 45px;
            width: 100%;
            position: relative;
            display: block;
          }

          .nav-box .dropwrap a h4 {
            margin-bottom: 0px;
            width: 100%;
            position: relative;
            display: block;
            height: 45px;
            line-height: 45px;
            font-size: 12px;
            font-weight: 500;
            color: rgb(119, 119, 119);
          }

          .nav-box .dropwrap a:hover {
            border-bottom: 1px solid #484848;
          }

          nav .profile-area .profile-photo {
            display: block;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
          }

          nav .profile-area button {
            display: none;
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

          /* will be shown only on mobile and tablets */
          main aside button#close-btn {
            display: none;
          }

          main aside button#close-btn:focus,
          main aside button#close-btn:active {
            outline: none;
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
            margin-left: 2.2rem;

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

          /* ============== updates =============== */

          main aside .updates {
            background: var(--color-white);
            border-radius: var(--border-radius-1);
            text-align: center;
            padding: var(--card-padding);
          }

          main aside .updates span {
            font-size: 2.8rem;
          }

          main aside .updates h4 {
            margin: 1rem 0;
          }

          main aside .updates a {
            display: block;
            width: 100%;
            background: var(--color-primary);
            color: var(--color-white);
            border-radius: var(--border-radius-1);
            padding: 0.8rem 0;
            margin-top: 2rem;

            transition: all 300ms ease;
          }

          main aside .updates a:hover {
            box-shadow: 0 1rem 2rem var(--color-primary-light);
          }

          /* ====================== MIDDLE =================== */

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

          /* ========= MONTHLY REPORT ============= */

          main .monthly-report {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            justify-content: space-between;
            margin-top: 2rem;
          }

          main .monthly-report h1 {
            font-weight: 700;
            font-size: 1.8rem;
          }

          /* ========= FAST PAYMENT ============= */

          main .fast-payment {
            margin-top: 2rem;
            display: flex;
            align-self: center;
            gap: 2rem;
          }

          main .fast-payment .badges {
            display: flex;
            gap: 1rem;
            align-self: center;
            flex-wrap: wrap;
            max-width: 100%;
          }

          main .fast-payment .badge span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
          }

          /* =========== FOOTER============ */

          footer .font-weight-light-mobile {
            display: none;
          }
          footer .font-weight-light {
            display: block !important;
            color: #212529;
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
              display: flex;
              flex-direction: column;
              width: 430px;
              height: 700px;
              margin: 0 auto;
            }
            .gridBox {
              margin-top: 20px;
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
            main {
              padding-top: 20px;
              padding-bottom: 20px;
            }
            .gridBox {
              width: 430px;
              height: 550px;
              display: flex;
              flex-wrap: wrap;
              margin: 0 auto;
              justify-content: space-between;
              position: relative;
              transform: translateY(2%);
            }
            .grid {
              width: 500px;
              margin: 0 auto;
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

            main section.middle .fast-payment {
              flex-direction: column;
              align-items: flex-start;
              gap: 1.4rem;
              margin-top: 3rem;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Adashboard;
