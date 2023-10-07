import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExternalLink } from "react-external-link";
import axios from "axios";

const Ahomepage = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [messageOn, setMessageOn] = useState(false);
  const [messageToAll, setMessageToAll] = useState("");
  const [titleOfMessage, setTitleOfMessage] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [swiperOn, setSwiperOn] = useState(false);
  const [commentator1, setCommentator1] = useState("");
  const [commentator2, setCommentator2] = useState("");
  const [commentator3, setCommentator3] = useState("");
  const [commentator4, setCommentator4] = useState("");
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");
  const [comment4, setComment4] = useState("");

  // ================= PUT ===================
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(process.env.REACT_APP_BACKEND_URL + "api/admin/homepage", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          messageOn,
          titleOfMessage,
          messageToAll,
          comment1,
          comment2,
          comment3,
          comment4,
          commentator1,
          commentator2,
          commentator3,
          commentator4,
          swiperOn,
          _id: userInfo ? userInfo._id : "",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.invalid) {
            outPutErrorMessages(data.invalid);
          }
          if (data) {
            outPutSuccessMessage(data.user);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessages(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(function () {
      setAlert(false);
      setUpdateNote(false);
    }, 5000);
    setAlertMsg(errorMessage);
  }

  function outPutSuccessMessage() {
    setUpdateNote(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(function () {
      setUpdateNote(false);
    }, 5000);
    setAlertMsg("");
  }

  // ============ SWIPER DATA ===========
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(process.env.REACT_APP_BACKEND_URL + "api/admin/storedInfo")
        .then((response) => {
          if (response.status === 200) {
            setUserInfo(response.data);
            setMessageOn(response.data.messageOn);
            setTitleOfMessage(response.data.titleOfMessage);
            setMessageToAll(response.data.messageToAll);
            setSwiperOn(response.data.swiperOn);
            setComment1(response.data.comment1);
            setComment2(response.data.comment2);
            setComment3(response.data.comment3);
            setComment4(response.data.comment4);
            setCommentator1(response.data.commentator1);
            setCommentator2(response.data.commentator2);
            setCommentator3(response.data.commentator3);
            setCommentator4(response.data.commentator4);
          }
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Content Management | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker Content Management" />
        </Helmet>
        <nav>
          <div className="dashboard">
            <div className="logo"></div>

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
                      <Link to="#">
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
          <section className="questionCard container">
            <div className="container regCon">
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
                ) : null}
                {updateNote ? (
                  <section className="updateNote container-fluid">
                    <div className="container-fluid ">
                      <img
                        src="/images/tick.png"
                        style={{ width: "12px" }}
                        alt=""
                      />
                      <span>Updated successfully.</span>
                    </div>
                  </section>
                ) : null}
              </div>
              <h2 className="mt-5 mb-4">Homepage Swiper</h2>

              <form onSubmit={onSubmit}>
                <div className="contain">
                  <div className="container1">
                    <p>Swiper Switch</p>
                    <div className="checkbox-btn">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={swiperOn ? true : false}
                        onChange={() => {
                          setSwiperOn(!swiperOn);
                        }}
                      />
                      <div>
                        <span id="span_slide" className="slidekey"></span>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="container1">
                    <label htmlFor="commentator1">
                      Commentator in Swiper 1
                    </label>
                    <input
                      type="text"
                      id="commentator1"
                      autoComplete="off"
                      value={commentator1}
                      onChange={(e) => {
                        setCommentator1(e.target.value);
                      }}
                    />
                  </div>
                  <p>Comment in Swiper 1</p>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    maxLength={1000}
                    placeholder="Maximum 1000 words"
                    value={comment1}
                    onChange={(e) => {
                      setComment1(e.target.value);
                    }}
                  ></textarea>

                  <hr />
                  <div className="container1">
                    <label htmlFor="commentator2">
                      Commentator in Swiper 2
                    </label>
                    <input
                      type="text"
                      id="commentator2"
                      autoComplete="off"
                      value={commentator2}
                      onChange={(e) => {
                        setCommentator2(e.target.value);
                      }}
                    />
                  </div>
                  <p>Comment in Swiper 2</p>
                  <textarea
                    rows="10"
                    maxLength={1000}
                    placeholder="Maximum 1000 words"
                    value={comment2}
                    onChange={(e) => {
                      setComment2(e.target.value);
                    }}
                  ></textarea>

                  <hr />
                  <div className="container1">
                    <label htmlFor="commentator3">
                      Commentator in Swiper 3
                    </label>
                    <input
                      type="text"
                      id="commentator3"
                      autoComplete="off"
                      value={commentator3}
                      onChange={(e) => {
                        setCommentator3(e.target.value);
                      }}
                    />
                  </div>
                  <p>Comment in Swiper 3</p>
                  <textarea
                    rows="10"
                    maxLength={1000}
                    placeholder="Maximum 1000 words"
                    value={comment3}
                    onChange={(e) => {
                      setComment3(e.target.value);
                    }}
                  ></textarea>

                  <div className="container1">
                    <label htmlFor="commentator4">
                      Commentator in Swiper 4
                    </label>
                    <input
                      type="text"
                      id="commentator4"
                      autoComplete="off"
                      value={commentator4}
                      onChange={(e) => {
                        setCommentator4(e.target.value);
                      }}
                    />
                  </div>
                  <p>Comment in Swiper 4</p>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    maxLength={1000}
                    placeholder="Maximum 1000 words"
                    value={comment4}
                    onChange={(e) => {
                      setComment4(e.target.value);
                    }}
                  ></textarea>

                  <div className="contain">
                    <h2 className="mt-5 mb-4">Dashboard Message</h2>
                    <div className="container1">
                      <p>Attention Message Switch</p>

                      <div className="checkbox-btn">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={messageOn ? true : false}
                          onChange={() => {
                            setMessageOn(!messageOn);
                          }}
                        />
                        <div>
                          <span id="span_slide" className="slidekey"></span>
                        </div>
                      </div>
                    </div>
                    <div className="container1">
                      <label htmlFor="titleMessage">
                        Title of Attention Message
                      </label>
                      <input
                        type="text"
                        id="titleMessage"
                        autoComplete="off"
                        value={titleOfMessage}
                        onChange={(e) => {
                          setTitleOfMessage(e.target.value);
                        }}
                      />
                    </div>
                    <p>Attention Message in Dashboard</p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      maxLength={1000}
                      placeholder="Maximum 1000 words"
                      value={messageToAll}
                      onChange={(e) => {
                        setMessageToAll(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="container2">
                    <input type="submit" value="Confirm" />
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>

        <style jsx="true">{`
          body {
            background: #fff;
          }
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
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

          .img-fluid {
            transform: translateX(36%);
          }

          .wrap .updateSuccess {
            width: 100%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .wrap .updateSuccess span {
            margin-left: 5px;
          }
          .wrap {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            min-height: 100vh;
            padding-top: 60px;
            padding-bottom: 30px;
            background-color: #f4f5f6;
          }
          .wrap .questionCard {
            width: 380px;
            min-height: 48vh;
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
            margin-bottom: 60px;
            border: 1px solid #ebebeb;
            background: #fff;
            /* -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
  box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3); */
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
            text-align: left;
            font-weight: 800;
            font-size: 28px;
            width: 100%;
            margin: 30px auto 24px;
            padding-top: 8px;
            padding-bottom: 8px;
            color: #2b2b2b;
          }

          label {
            display: block;
            font-size: 14px;
            margin-bottom: 10px;
            color: #1d1d1d;
            width: 250px;
            text-align: left;
            position: relative;
            transform: translateY(20%);
            width: 260px;
          }

          .contain {
            position: relative;
            width: 100%;
            left: 0%;
          }

          .container1,
          .container2 {
            display: block;
            position: relative;
            width: 100%;
          }

          input[type="button"] {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            float: left;
            color: #888;
            background-color: #dddddd;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            outline: none;
          }

          form p {
            font-size: 14px;
            margin-bottom: 10px;
            color: #1d1d1d;
            margin: 10px 0;
            text-align: left;
          }

          textarea {
            font-size: 14px;
            color: #777;
            font-family: sans-serif;
            text-decoration: none;
            outline: none;
            background: none;
            border: 2px solid #dadada;
            padding: 12px 10px;
            width: 100%;
            height: 90px;
          }

          input[type="text"] {
            height: 42px;
            text-decoration: none;
            outline: none;
            background: none;
            border: 2px solid #dadada;
            padding: 12px 20px;
            font-weight: 500;
            width: 260px;
            font-size: 14px;
            color: #777;
            font-family: sans-serif;
            display: iblock;
          }
          input[type="submit"] {
            height: 48px;
            background-color: #14a248;
            color: white;
            cursor: pointer;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            font-weight: 500;
            font-size: 16px;
            border: none;
            margin-top: 20px;
            outline: none;
            border-radius: 4px;
          }

          .questionCard a {
            margin-bottom: 0;
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            font-family: sans-serif;
          }
          .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
          }
          .wrap .updateNote {
            width: 100%;
            background-color: #bff4f2;
            margin-bottom: 8px;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px 0px 28px;
            display: block;
          }
          .wrap .updateNote span {
            margin-left: 5px;
          }
          @media only screen and (min-width: 768px) {
            .wrap .questionCard {
              width: 710px;
              padding: 30px 20px;
            }
            .nav-box {
              left: 96%;
            }
            .img-fluid {
              transform: translateX(0%);
            }

            input[type="button"],
            input[type="submit"] {
              width: 260px;
            }
            .container1,
            .container2 {
              width: 305px;
            }
          }

          /*Slidekey*/

          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }
          .checkbox-btn {
            position: relative;
            width: 130px;
            height: 30px;
            transform: translate(0%, 0%);
            border: 3px solid transparent;
            overflow: hidden;
            border-radius: 0px;
          }
          .checkbox-btn input {
            height: 100%;
            width: 100%;
            position: relative;
            cursor: pointer;
            opacity: 0;
            top: 0;
            left: 0;
            z-index: 3;
          }
          .checkbox-btn div {
            top: 0;
            left: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: transparent;
            border-radius: 4px;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
          }
          .checkbox-btn div .slidekey {
            position: absolute;
            width: 50px;
            height: 30px;
            top: 0;
            left: 0;
            text-align: center;
            background-color: #000;
            transition: 0.5s ease-in-out 0ms;
          }
          .checkbox-btn input:checked + div .slidekey {
            transform: translateX(76px);
          }
          .checkbox-btn .slidekey:before {
            content: "Switch On";
            position: absolute;
            height: 100%;
            width: 76px;
            text-align: center;
            top: 0;
            left: -76px;
            line-height: 26px;
            background-color: #14a248;
            color: white;
            font-size: 14px;
            font-weight: 500;
          }
          .checkbox-btn .slidekey:after {
            content: "Switch Off";
            background-color: #2b2b2b;
            color: white;
            position: absolute;
            height: 100%;
            width: 76px;
            text-align: center;
            top: 0;
            right: -76px;
            line-height: 26px;
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Ahomepage;
