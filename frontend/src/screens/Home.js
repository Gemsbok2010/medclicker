import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperNavButtons } from "../components/SwiperNavButtons";

const Home = () => {
  // ============ NO OF CASES DATA ===========
  const [noOfCases, setNoOfCases] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [, setIsloaded] = useState(false);
  const [swiperOn, setSwiperOn] = useState(false);
  const [commentator1, setCommentator1] = useState("");
  const [commentator2, setCommentator2] = useState("");
  const [commentator3, setCommentator3] = useState("");
  const [commentator4, setCommentator4] = useState("");
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");
  const [comment4, setComment4] = useState("");

  const fetchData = async () => {
    setIsloaded(false);
    axios.get("http://localhost:4000/api/admin/homepage").then((response) => {
      if (response.status === 200) {
        setNoOfCases(response.data.noOfCases);
        setNoOfUsers(response.data.noOfUsers);
        setSwiperOn(response.data.plans.swiperOn);
        setComment1(response.data.plans.comment1);
        setComment2(response.data.plans.comment2);
        setComment3(response.data.plans.comment3);
        setComment4(response.data.plans.comment4);
        setCommentator1(response.data.plans.commentator1);
        setCommentator2(response.data.plans.commentator2);
        setCommentator3(response.data.plans.commentator3);
        setCommentator4(response.data.plans.commentator4);
        setIsloaded(true);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Easier, smarter ways to find a locum - Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <div className="wrap">
          <HomeNav />
          <section className="content2 container">
            <div className="row">
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/logo-5.png"
                      alt=""
                    />
                  </figure>
                  <h4>Search Close Around</h4>
                  <p>
                    Search roles and candidates based on location with visual
                    maps.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img className="img-fluid" src="/images/07-7.png" alt="" />
                  </figure>
                  {noOfCases >= 10 ? (
                    <h4>Currently listings: {noOfCases}</h4>
                  ) : (
                    <h4>Create your listing</h4>
                  )}
                  <p>
                    Follow our step-by-step questions to produce a listing. You
                    won't need 5 minutes.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img className="img-fluid" src="/images/07-10.png" alt="" />
                  </figure>
                  {noOfUsers >= 10 ? (
                    <h4>Active Candidates: {noOfUsers}</h4>
                  ) : (
                    <h4>Register today! </h4>
                  )}

                  <p>
                    All our locums are screened, including reviews, and AHPRA
                    verfification.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/logo-4.png"
                      alt=""
                    />
                  </figure>
                  <h4>Management</h4>
                  <p>
                    We designed tools to facilitate the management of the
                    recruitment process.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/logo-2.png"
                      alt=""
                    />
                  </figure>
                  <h4>Locum Booking</h4>
                  <p>
                    You choose your own locum. You get to review their profile
                    and then just book instantly.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/logo-3.png"
                      alt=""
                    />
                  </figure>
                  <h4>Nationwide Coverage</h4>
                  <p>
                    We cover roles across the country, and constantly recruiting
                    locums across Australia.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img
                      className="img-fluid"
                      src="/images/logo-6.png"
                      alt=""
                    />
                  </figure>
                  <h4>Affordable Rates</h4>
                  <p>We offer the lowest rates and fees for the service.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img className="img-fluid" src="/images/07-9.png" alt="" />
                  </figure>
                  <h4>Locum Services</h4>
                  <p>No find, no fees. It's that simple.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="iconArea">
                  <figure>
                    <img className="img-fluid" src="/images/07-12.png" alt="" />
                  </figure>
                  <h4>24/7 Support</h4>
                  <p>
                    Support is available Monday to Friday and with limited
                    capacity on weekends. We don't rest.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {swiperOn ? (
            <section className="content4 container-fluid">
              <h2
                style={{
                  fontSize: "23px",
                  color: "#777",
                  fontWeight: "500",
                  marginBottom: "18px",
                  textAlign: "center",
                }}
              >
                What our customers say...
              </h2>
              <div className="container comment">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={2}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  modules={[Pagination, Navigation, A11y, Autoplay]}
                  autoplay={{
                    delay: "3000",
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                  }}
                >
                  {commentator1 !== "" ? (
                    <SwiperSlide>
                      <div className="commentBox">
                        <div className="people">
                          <p className="m-0">{commentator1}</p>
                        </div>
                        <div className="peopleComment">
                          <p
                            className="m-0 font-weight-normal"
                            style={{ fontStyle: "italic" }}
                          >
                            "{comment1}"
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ) : (
                    ""
                  )}
                  {commentator2 !== "" ? (
                    <SwiperSlide>
                      <div className="commentBox">
                        <div className="people">
                          <p className="m-0">{commentator2}</p>
                        </div>
                        <div className="peopleComment">
                          <p
                            className="m-0 font-weight-normal"
                            style={{ fontStyle: "italic" }}
                          >
                            "{comment2}"
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ) : (
                    ""
                  )}
                  {commentator3 !== "" ? (
                    <SwiperSlide>
                      <div className="commentBox">
                        <div className="people">
                          <p className="m-0">{commentator3}</p>
                        </div>
                        <div className="peopleComment">
                          <p
                            className="m-0 font-weight-normal"
                            style={{ fontStyle: "italic" }}
                          >
                            "{comment3}"
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ) : (
                    ""
                  )}
                  {commentator4 !== "" ? (
                    <SwiperSlide>
                      <div className="commentBox">
                        <div className="people">
                          <p className="m-0">{commentator4}</p>
                        </div>
                        <div className="peopleComment">
                          <p
                            className="m-0 font-weight-normal"
                            style={{ fontStyle: "italic" }}
                          >
                            "{comment4}"
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ) : (
                    ""
                  )}
                  <SwiperNavButtons />
                </Swiper>
              </div>
            </section>
          ) : (
            ""
          )}

          <Footer />
        </div>
      </HelmetProvider>
      <style jsx="true">{`
        .swiper-pagination-bullet .swiper-pagination-bullet-active {
          color: green;
        }

        .swiper-wrapper .swiper-pagination .swiper-pagination-bullet {
          color: green !important;
          background-color: green !important;
        }

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
          padding: 0;
        }

        .content2 .col-md-4 {
          z-index: -1;
          margin-top: 30px;
        }
        .wrap .content1 {
          padding: 3px 10px;
          position: relative;
          height: 720px;
          background: url("./../../images/main-image-small.jpg");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        .wrap .content2 figure {
          width: 30%;
        }
        .wrap .content2 .iconArea {
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
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          z-index: -1;
        }
        .wrap .content2 .iconArea > h4 {
          width: 80%;
          text-align: center;
          padding-bottom: 20px;
          font-weight: bold;
          border-bottom: 1px solid #000;
        }
        .wrap .content2 .iconArea > p {
          width: 80%;
          text-align: center;
          padding: 10px 0;
          font-weight: normal;
        }
        .wrap .content4 {
          padding: 50px;
          background: #eeebeb;
        }
        .wrap .content4 > .title {
          font-size: 36px;
          color: #777;
        }
        .wrap .content4 > .comment {
          padding: 0px 0px;
          margin: 0 auto;
        }

        .wrap .commentBox {
          background: #fff;
          border-radius: 5px;
          border-top: 5px solid #14a248;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.28);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.28);
        }

        .wrap .content4 > .comment .people {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          padding: 25px 15px;
        }

        .wrap .content4 > .comment .people p {
          color: #777;
          font-size: 1.2em;
        }
        .wrap .content4 > .comment .peopleComment {
          height: 100px;
          padding: 0px 25px 25px;
        }
        .wrap .content4 > .comment .peopleComment p {
          text-align: justify;
          letter-spacing: 1px;
          font-size: 18px;
          line-height: 1.5;
          color: #777;
        }
        .wrap .content5 {
          height: 500px;
          background: url("./../../images/languages.jpg") no-repeat center
            center;
          background-size: cover;
          position: relative;
        }
        .content5 .btn-med {
          height: 45px;
          width: 200px;
          line-height: 45px;
          border-radius: 4px;
          font-weight: 800;
          background-color: #14a248;
          outline: none;
          border: none;
          color: white;
          cursor: pointer;
          position: absolute;
          font-size: 16px;
          transform: translate(-50%, -50%);
          top: 90%;
          left: 50%;
        }

        .comment {
          position: relative;
        }
        .comment .swiper-pagination {
          position: absolute !important;
          bottom: -25px !important;
          right: 0 !important;
          left: 0 !important;
          z-index: 500 !important;
        }
        .comment .swiper-pagination > li {
          margin-right: 30px;
          background: #14a248 !important;
        }
      `}</style>
    </>
  );
};

export default Home;
