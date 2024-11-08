import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { ReactSession } from "react-client-session";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactGA from "react-ga4";
import moment from "moment";

// Three dots
import { ThreeDots } from "react-loader-spinner";

const ListingManager = () => {
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();
  const [listingInfo, setListingInfo] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [, setNewApplicants] = useState([]);
  const [, setNoApplied] = useState("");
  const [noOfCases, setNoOfCases] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState([]);
  const email = user.email;
  const [isloaded, setIsloaded] = useState(true);
  const [isloading, setIsloading] = useState(false);

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/listingmanager?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&professions=" +
        professions +
        "&location=" +
        location +
        "&email=" +
        email
    );

    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/listingmanager?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&professions=" +
        professions +
        "&location=" +
        location +
        "&email=" +
        email
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
  };

  // ========= PAGE INTERMEDIATE BUTTONS ==========
  const circles = [];

  for (let v = 0; v < maxPage; v++) {
    circles.push(v);
  }

  const IntermediateButtons = async (id) => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/listingmanager?page=${id + 1}` +
        "&contract=" +
        contract +
        "&professions=" +
        professions +
        "&location=" +
        location +
        "&sortBy=" +
        sort +
        "&email=" +
        email
    );
    const data = await res.json();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
    setCandidates(data.candidates);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setListOfProfessions(data.professions);
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);
  const [reload, setReload] = useState(false);

  const sorting = async (ascDesc) => {
    setReload(false);
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/listingmanager?sortBy=asc" +
          "&contract=" +
          contract +
          "&professions=" +
          professions +
          "&location=" +
          location +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();
      setReload(true);
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
      setCandidates(data.candidates);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfProfessions(data.professions);
      ReactSession.remove("slug");
    }

    if (ascDesc === true) {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/listingmanager?sortBy=desc" +
          "&contract=" +
          contract +
          "&professions=" +
          professions +
          "&location=" +
          location +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();
      setReload(true);
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
      setCandidates(data.candidates);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfProfessions(data.professions);
      ReactSession.remove("slug");
    }
  };

  //=========== FILTER CARD APPEARS ===========
  const [filterCard, setFilterCard] = useState(false);

  const appearFunction = () => {
    setFilterCard(true);
    setBackdrop(true);
  };

  // ========== SELECT CONTRACT TYPE ===========
  const [contract, setContract] = useState([]);
  const [listOfProfessions, setListOfProfessions] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [checks, setChecks] = useState([]);
  const [location, setLocation] = useState([]);

  const [checkedFt, setCheckedFt] = useState(false);
  const [checkedPt, setCheckedPt] = useState(false);
  const [checkedLocum, setCheckedLocum] = useState(false);

  // ========= ADD CONTRACT TYPE ==========
  const onContractChange = async (event) => {
    const { value } = event.target;
    setContract([...contract, value]);
    ReactSession.remove("slug");
  };

  // ========== REMOVE CONTRACT TYPE ==========
  const onRemoveLevel = async (event) => {
    const { value } = event.target;
    const index = contract.indexOf(value);
    if (index !== -1) {
      contract.splice(index, 1);
    }
    setContract([...contract]);
  };
  // ========== SELECT PROFESSIONS ===========

  const checkingprofession = (e) => {
    const value = e.target.value;

    if (!professions.includes(value)) {
      setProfessions([...professions, value]);
      ReactSession.remove("slug");
    } else {
      const index = professions.indexOf(value);

      if (index !== -1) {
        professions.splice(index, 1);
      }
      setProfessions([...professions]);
    }
  };

  const checkingchecks = (id) => {
    if (!checks.includes(id)) {
      setChecks([...checks, id]);
    } else {
      const index = checks.indexOf(id);
      if (index !== -1) {
        checks.splice(index, 1);
      }
      setChecks([...checks]);
    }
  };

  // ============== SELECT LOCATIONS ===============
  const [checkedACT, setCheckedACT] = useState(false);
  const [checkedNSW, setCheckedNSW] = useState(false);
  const [checkedNT, setCheckedNT] = useState(false);
  const [checkedQLD, setCheckedQLD] = useState(false);
  const [checkedSA, setCheckedSA] = useState(false);
  const [checkedTAS, setCheckedTAS] = useState(false);
  const [checkedWA, setCheckedWA] = useState(false);
  const [checkedVIC, setCheckedVIC] = useState(false);

  // ========== REMOVE STATE LOCATION ===========
  const onRemoveState = async (event) => {
    const { value } = event.target;

    const index = location.indexOf(value);
    if (index !== -1) {
      location.splice(index, 1);
    }

    setLocation([...location]);
  };

  // ========= ADD STATE LOCATION ===========
  const onLocationChange = async (event) => {
    const { value } = event.target;
    setLocation([...location, value]);
    ReactSession.remove("slug");
  };

  // ========= FILTERCARD CLEAR ALL ===========

  const clearAll = async () => {
    setCheckedFt(false);
    setCheckedPt(false);
    setCheckedLocum(false);
    setCheckedACT(false);
    setCheckedNSW(false);
    setCheckedNT(false);
    setCheckedQLD(false);
    setCheckedSA(false);
    setCheckedTAS(false);
    setCheckedWA(false);
    setCheckedVIC(false);
    setLocation([]);
    setContract([]);
    setProfessions([]);
    setChecks([]);
    ReactSession.remove("slug");
  };

  // ============== BACKDROP ============== //
  const [backdrop, setBackdrop] = useState(false);

  const clickOnBackdrop = () => {
    setBackdrop(false);
    setFilterCard(false);
  };

  const highlight = async (slug) => {
    ReactSession.set("slug", slug);
    setReload(false);

    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/candidates/${slug}?sortBy=` +
        sort +
        "&contract=" +
        contract +
        "&professions=" +
        professions +
        "&location=" +
        location +
        "&page=" +
        page +
        "&email=" +
        email
    );
    const data = await res.json();
    setReload(true);
    setNoApplied(data.noApplied);
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setCandidates(data.candidates);
    setListOfProfessions(data.professions);
  };

  const activeAd = async (e, slug) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/sleepAd/${slug}/?sortBy=` +
        sort +
        "&page=" +
        page +
        "&location=" +
        location +
        "&contract=" +
        contract +
        "&professions=" +
        professions,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isActiveJob: false, isDeletedJob: false }),
      }
    );
    const data = await res.json();

    if (data) {
      console.log(data);
      setListingInfo(data.adPosts);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  const sleepAd = async (e, slug) => {
    e.preventDefault();
    setBackdrop(true);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/sleepAd/${slug}/?sortBy=` +
        sort +
        "&page=" +
        page +
        "&location=" +
        location +
        "&contract=" +
        contract +
        "&professions=" +
        professions,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isActiveJob: true, isDeletedJob: false }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data) {
      setListingInfo(data.adPosts);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setBackdrop(false);
    }
  };

  const onReject = async (e, slugId, nanoId) => {
    e.preventDefault();

    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/reject/${slugId}/${nanoId}?sortBy=` +
        sort +
        "&page=" +
        page,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ isRejected: true }),
      }
    );

    const data = await res.json();
    if (data) {
      setNewApplicants(data.newApplicants);
      setCandidates(data.candidates);
      setSort(data.sort);
      setPage(data.page);
      setMaxPage(data.maxPage);
    }
  };

  // ============= GET LISTINGMANAGER ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;
    setIsloaded(false);
    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/listingmanager?" +
          "contract=" +
          contract +
          "&professions=" +
          professions +
          "&location=" +
          location +
          "&sortBy=" +
          sort +
          "&page=" +
          page +
          "&email=" +
          email +
          "&slug=" +
          ReactSession.get("slug")
      );
      const data = await res.json();

      if (isCancelled === false) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setReload(true);
        setNoApplied(data.noApplied);
        setNoOfCases(data.num);
        setListingInfo(data.adPosts);
        setCandidates(data.candidates);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
        setNewApplicants(data.newApplicants);
        setListOfProfessions(data.professions);
        setIsloaded(true);
        ReactSession.remove("slug");
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
  }, [contract, professions, location, sort, page]);

  // ======= TAKE OUT DUPLICATE PROFESSIONS ======

  const noDuplicates = [
    ...new Map(
      listOfProfessions.map((list) => [list.professionName, list])
    ).values(),
  ];

  // ============ LOCUM PAYMENT =============
  const getAccessCode = async (e, nanoId, slugId) => {
    setIsloading(true);
    e.preventDefault();
    await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/locums/bookme/${nanoId}/${slugId}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      }
    )
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        } else {
          return response.json().then((json) => Promise.reject(json));
        }
      })
      .then(({ formUrl, accessCode }) => {
        if ((formUrl, accessCode)) {
          setIsloading(false);
          navigate(
            `/payment/${nanoId}${slugId}` +
              "?accessCode=" +
              accessCode +
              "&formUrl=" +
              formUrl
          );
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  // ============ LOGGEDIN APPLICANT APPLIED ===========
  const [thisApplicant, setThisApplicant] = useState([]);

  const myDates = (slug) => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/getdates?slug=" +
          slug
      )
      .then((response) => {
        if (response.status === 200) {
          setThisApplicant(response.data.thisAd);
        }
      });
  };

  // ============ COUNTDOWN ===========

  const cdays = (expiry) => {
    const jaar = expiry.split("-")[0];
    const maand = expiry.split("-")[1];
    const breakdag = expiry.split("T")[0];
    const dag = breakdag.split("-")[2];

    const breakhuur = expiry.split("T")[1];
    const huur = breakhuur.split(":")[0];
    const minuten = breakhuur.split(":")[1];

    var dateObject = moment().format(
      `${jaar}-${maand}-${dag}T${huur}:${minuten}:ssZ`
    );

    let now = new Date();
    var future = new Date(dateObject);

    let timeDiff = future.getTime() - now.getTime();

    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    return days;
  };

  const chours = (expiry) => {
    const jaar = expiry.split("-")[0];
    const maand = expiry.split("-")[1];
    const breakdag = expiry.split("T")[0];
    const dag = breakdag.split("-")[2];

    const breakhuur = expiry.split("T")[1];
    const huur = breakhuur.split(":")[0];
    const minuten = breakhuur.split(":")[1];

    var dateObject = moment().format(
      `${jaar}-${maand}-${dag}T${huur}:${minuten}:ssZ`
    );

    let now = new Date();
    var future = new Date(dateObject);

    let timeDiff = future.getTime() - now.getTime();

    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    var hoursX = (hours %= 24).toLocaleString("en-AU", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return hoursX;
  };

  const cminutes = (expiry) => {
    const jaar = expiry.split("-")[0];
    const maand = expiry.split("-")[1];
    const breakdag = expiry.split("T")[0];
    const dag = breakdag.split("-")[2];

    const breakhuur = expiry.split("T")[1];
    const huur = breakhuur.split(":")[0];
    const minuten = breakhuur.split(":")[1];

    var dateObject = moment().format(
      `${jaar}-${maand}-${dag}T${huur}:${minuten}:ssZ`
    );

    let now = new Date();
    var future = new Date(dateObject);

    let timeDiff = future.getTime() - now.getTime();

    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);

    let minutesX = (minutes %= 60).toLocaleString("en-AU", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return minutesX;
  };

  const isSeen = async (e, slugId, nanoId) => {
    e.preventDefault();

    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/applications/seen?` +
        "slugId=" +
        slugId +
        "&nanoId=" +
        nanoId,

      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ slugId, nanoId }),
      }
    );
    const data = await res.json();

    if (data) {
      setNewApplicants(data.newApplicants);
    }
  };

  const captureGa = () => {
    ReactGA.event({
      category: "Post Locum Ad",
      action: "Locum Ad CC details",
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Listing Manager | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossorigin="anonymous"
          />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />
        {backdrop ? (
          <div className="backdrop">
            <ThreeDots
              type="ThreeDots"
              height={30}
              width={80}
              color={"white"}
            />
          </div>
        ) : (
          ""
        )}
        <section>
          <div className="fix-Container">
            <div className="row">
              <div
                className="nonselect"
                id="filterPanel"
                onClick={appearFunction}
              >
                <div id="filter"></div>
                <span>Filter</span>
              </div>

              <form style={{ marginRight: "118px" }}>
                {ascDesc ? (
                  <button
                    id="arrow-up"
                    onClick={() => {
                      setAscDesc(!ascDesc);
                      sorting(ascDesc);
                    }}
                  >
                    <Link
                      to={`?sortBy=desc&contract=${contract}&location=${location}&professions=${professions}`}
                      target="_self"
                    >
                      Sort
                    </Link>
                  </button>
                ) : (
                  <button
                    id="arrow-down"
                    onClick={() => {
                      setAscDesc(!ascDesc);
                      sorting(ascDesc);
                    }}
                  >
                    <Link
                      to={`?sortBy=asc&contract=${contract}&location=${location}&professions=${professions}`}
                      target="_self"
                    >
                      Sort
                    </Link>
                  </button>
                )}
              </form>

              {!isloaded ? (
                <div
                  className="results"
                  style={{
                    position: "relative",
                    display: "block",
                    transform: "translateY(25%)",
                  }}
                >
                  <ThreeDots
                    type="ThreeDots"
                    height={20}
                    width={40}
                    color={"gray"}
                  />
                </div>
              ) : noOfCases.length === 0 ? (
                <div className="results">Results: 0 Job Cases</div>
              ) : noOfCases > 1 ? (
                <div className="results">Results: {noOfCases} Job Cases</div>
              ) : (
                <div className="results">Results: {noOfCases} Job Case</div>
              )}
            </div>
          </div>
        </section>

        <div className="wrap">
          {filterCard ? (
            <div className="filterCard container">
              <div className="filterTitle">
                <img
                  onClick={clickOnBackdrop}
                  style={{
                    width: "20px",
                    cursor: "pointer",
                    verticalAlign: "top",
                  }}
                  src="/images/cross-black.png"
                  alt=""
                />
                <h2>Filter Card</h2>
              </div>

              <form id="filterForm">
                <div className="modal-box-contract">
                  <h2 style={{ margin: "0" }}>Contract Type</h2>
                  <div className="row">
                    <div className="contract_flex">
                      <input
                        id="ft"
                        type="checkbox"
                        checked={checkedFt ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedFt
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedFt(!checkedFt);
                        }}
                        value="Full-Time"
                      />
                      <label htmlFor="ft">Full-Time</label>

                      <input
                        id="pt"
                        type="checkbox"
                        checked={checkedPt ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedPt
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedPt(!checkedPt);
                        }}
                        value="Part-Time"
                      />

                      <label htmlFor="pt">Part-Time</label>

                      <input
                        id="locum"
                        type="checkbox"
                        name="contract"
                        checked={checkedLocum ? true : false}
                        onChange={(event) => {
                          !checkedLocum
                            ? onContractChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedLocum(!checkedLocum);
                        }}
                        value="Locum"
                      />
                      <label htmlFor="locum">Locum</label>
                    </div>
                  </div>
                </div>

                <div className="modal-box-roletype">
                  <h2 style={{ margin: "0" }}>Professions</h2>
                  <div className="row">
                    <div className="role_flex">
                      {noDuplicates.map((profession) => {
                        return (
                          <span key={profession._id}>
                            <input
                              id={profession.professionName}
                              type="checkbox"
                              checked={
                                checks.includes(profession._id) ? true : false
                              }
                              name={profession.professionName}
                              onChange={(e) => {
                                checkingprofession(e);
                                checkingchecks(profession._id);
                              }}
                              value={profession.professionName}
                            />
                            <label htmlFor={profession.professionName}>
                              {profession.professionName}
                            </label>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="modal-box-location">
                  <h2 style={{ margin: "0" }}>Location</h2>
                  <div className="row">
                    <div className="states_flex">
                      <input
                        id="a"
                        type="checkbox"
                        checked={checkedACT ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedACT
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedACT(!checkedACT);
                        }}
                        value="ACT"
                      />
                      <label htmlFor="a">Australian Capital Territory</label>
                      <input
                        name="location"
                        id="b"
                        checked={checkedNSW ? true : false}
                        type="checkbox"
                        onChange={(event) => {
                          !checkedNSW
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedNSW(!checkedNSW);
                        }}
                        value="NSW"
                      />
                      <label htmlFor="b">New South Wales</label>
                      <input
                        id="c"
                        type="checkbox"
                        checked={checkedNT ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedNT
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedNT(!checkedNT);
                        }}
                        value="NT"
                      />
                      <label htmlFor="c">Northern Territory</label>

                      <input
                        id="d"
                        type="checkbox"
                        checked={checkedQLD ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedQLD
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedQLD(!checkedQLD);
                        }}
                        value="QLD"
                      />
                      <label htmlFor="d">Queensland</label>
                      <input
                        id="e"
                        type="checkbox"
                        name="location"
                        checked={checkedSA ? true : false}
                        onChange={(event) => {
                          !checkedSA
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedSA(!checkedSA);
                        }}
                        value="SA"
                      />
                      <label htmlFor="e">South Australia</label>

                      <input
                        id="f"
                        type="checkbox"
                        checked={checkedTAS ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedTAS
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedTAS(!checkedTAS);
                        }}
                        value="TAS"
                      />
                      <label htmlFor="f">Tasmania</label>
                      <input
                        id="g"
                        type="checkbox"
                        checked={checkedVIC ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedVIC
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedVIC(!checkedVIC);
                        }}
                        value="VIC"
                      />
                      <label htmlFor="g">Victoria</label>
                      <input
                        id="h"
                        type="checkbox"
                        checked={checkedWA ? true : false}
                        name="location"
                        onChange={(event) => {
                          !checkedWA
                            ? onLocationChange(event)
                            : onRemoveState(event);
                        }}
                        onClick={() => {
                          setCheckedWA(!checkedWA);
                        }}
                        value="WA"
                      />
                      <label htmlFor="h">Western Australia</label>
                    </div>
                  </div>
                </div>
                <input
                  type="button"
                  className="btn-search"
                  value="Clear All"
                  onClick={clearAll}
                />
              </form>
            </div>
          ) : (
            ""
          )}
          {filterCard ? (
            <div onClick={clickOnBackdrop} className="backdrop"></div>
          ) : (
            ""
          )}

          <section className="listContent container-fluid">
            <div className="wrapper">
              <div className="adList">
                {!isloaded ? (
                  <div
                    className="sidebar"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                      alignItems: "center",
                      height: "604px",
                    }}
                  >
                    <ThreeDots
                      type="ThreeDots"
                      height={30}
                      width={80}
                      color={"grey"}
                    />
                  </div>
                ) : (
                  <div className="wrapper-ads">
                    {listingInfo.map((listing) => {
                      return (
                        <div className="ads" key={listing._id}>
                          <div className="leftmessage">
                            <ExternalLink
                              href={
                                process.env.REACT_APP_BACKEND_URL +
                                `api/listings/edit/${listing.slug}`
                              }
                              target="_self"
                            >
                              <div className="edit-ad">Edit</div>
                            </ExternalLink>

                            <ExternalLink
                              href={
                                process.env.REACT_APP_BACKEND_URL +
                                `api/listings/adPosts/${listing.slug}`
                              }
                              target="_self"
                            >
                              <div className="preview-ad">View</div>
                            </ExternalLink>

                            <div
                              id={
                                ReactSession.get("slug") === listing.slug
                                  ? "chosenOne"
                                  : ""
                              }
                              className="applicants"
                              onClick={() => {
                                highlight(listing.slug);
                                myDates(listing.slug);
                              }}
                            >
                              {/* {newApplicants.map((newApplicant) => {
                                return newApplicant.slugId === listing.slug ? (
                                  ReactSession.get("slug") === listing.slug ? (
                                    <span
                                      className="showCircle"
                                      key={newApplicant._id}
                                    >
                                      {noApplied}
                                    </span>
                                  ) : (
                                    <span
                                      className="alertCircle"
                                      key={newApplicant._id}
                                    >
                                      New
                                    </span>
                                  )
                                ) : (
                                  <span key={newApplicant._id}></span>
                                );
                              })} */}
                              {listing.isPaidLocum === false
                                ? "Applicants"
                                : "Locum"}
                            </div>

                            {listing.isPaidLocum === false ? (
                              listing.isActiveJob === true ? (
                                <div
                                  className="retire"
                                  id={listing.isActiveJob ? "" : "sleep"}
                                  onClick={(e) => {
                                    activeAd(e, listing.slug);
                                  }}
                                >
                                  Pause
                                </div>
                              ) : (
                                <>
                                  <div
                                    className="retire"
                                    id={listing.isActiveJob ? "" : "sleep"}
                                    onClick={(e) => {
                                      sleepAd(e, listing.slug);
                                    }}
                                  >
                                    Paused
                                  </div>
                                </>
                              )
                            ) : (
                              <div className="retire" id={"sleep"}>
                                Completed
                              </div>
                            )}

                            <h2>
                              {listing.professions + " "}
                              {listing.contractType === "Full-Time" ? (
                                <span className="highlight_fulltime">
                                  {listing.contractType}
                                </span>
                              ) : listing.contractType === "Part-Time" ? (
                                <span className="highlight_parttime">
                                  {listing.contractType}
                                </span>
                              ) : listing.contractType === "Locum" ? (
                                <span className="highlight_locum">
                                  {listing.contractType}
                                </span>
                              ) : (
                                <span className="highlight_other">
                                  {listing.contractType}
                                </span>
                              )}
                            </h2>
                            <h3
                              style={{
                                fontWeight: "200",
                                marginTop: "6px",
                                marginBottom: "8px",
                              }}
                            >
                              Case ID: {listing.caseId}
                            </h3>
                            <h3
                              style={{
                                height: "20px",
                                width: "300px",
                                display: "block",
                                color: "#2b2b2b",
                                marginTop: "6px",
                                marginBottom: "8px",
                              }}
                            >
                              {listing.street +
                                ", " +
                                listing.suburb +
                                " " +
                                listing.state +
                                " " +
                                listing.postalCode}
                            </h3>
                            <h3
                              style={{
                                height: "20px",
                                width: "250px",
                                display: "block",
                                color: "#2b2b2b",
                                marginTop: "6px",
                                marginBottom: "8px",
                              }}
                            >
                              Expiring on: {listing.finishDate}
                            </h3>
                            {listing.contractType === "Locum" ? (
                              <h3
                                style={{
                                  height: "20px",
                                  marginTop: "13px",
                                }}
                              >
                                Need locum from:{" "}
                                <span className="highlight">
                                  {listing.startDate}
                                </span>{" "}
                                to{" "}
                                <span className="highlight">
                                  {listing.finishDate}
                                </span>
                              </h3>
                            ) : (
                              <h3
                                style={{
                                  height: "20px",
                                  marginTop: "13px",
                                }}
                              ></h3>
                            )}

                            <p>{listing.about}</p>
                          </div>
                        </div>
                      );
                    })}
                    {listingInfo.length === 0 && (
                      <div className="no-listings">
                        <h2>No listings at the moment</h2>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {ReactSession.get("slug") ? (
                <div
                  className="applicant-ads"
                  style={{ display: reload ? "block" : "none" }}
                >
                  {candidates.map((candidate) => {
                    return candidate.contractType === "Locum" ? (
                      <div
                        className={"ads"}
                        key={candidate._id}
                        style={
                          candidate.seen
                            ? { backgroundColor: "white" }
                            : { backgroundColor: "#fffec8" }
                        }
                      >
                        {candidate.isSelected === true ? (
                          <div></div>
                        ) : (
                          <div
                            id="bin"
                            onClick={(e) => {
                              onReject(e, candidate.slugId, candidate.nanoId);
                            }}
                          ></div>
                        )}
                        <div className="rightmessage">
                          <div className="bookdate">
                            <div className="bookdateBar"></div>
                            <div>
                              {candidate.isSelected === true ? (
                                <ExternalLink
                                  target="_self"
                                  href={
                                    process.env.REACT_APP_BACKEND_URL +
                                    `api/locums/isSelected/${candidate.nanoId}/${candidate.slugId}`
                                  }
                                >
                                  <button>Locum Details</button>
                                </ExternalLink>
                              ) : isloading ? (
                                <button
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "relative",
                                    alignItems: "center",
                                  }}
                                >
                                  <ThreeDots
                                    type="ThreeDots"
                                    height={20}
                                    width={40}
                                    color={"white"}
                                  />
                                </button>
                              ) : (
                                <ExternalLink>
                                  <button
                                    onClick={(e) => {
                                      getAccessCode(
                                        e,
                                        candidate.nanoId,
                                        candidate.slugId
                                      );
                                      captureGa();
                                    }}
                                  >
                                    Book Me
                                  </button>
                                </ExternalLink>
                              )}
                            </div>
                          </div>

                          <h2>
                            {candidate.isSelected === true ? (
                              <ExternalLink
                                target="_self"
                                href={
                                  process.env.REACT_APP_BACKEND_URL +
                                  `api/locums/isSelected/${candidate.nanoId}/${candidate.slugId}`
                                }
                              >
                                {candidate.firstName} {candidate.lastName}
                              </ExternalLink>
                            ) : (
                              <ExternalLink
                                target="_self"
                                href={
                                  process.env.REACT_APP_BACKEND_URL +
                                  `api/locums/resumeCandidate/${candidate.nanoId}/${candidate.slugId}`
                                }
                              >
                                {candidate.firstName}
                              </ExternalLink>
                            )}
                            {candidate.seen ? (
                              <span className="seen">Viewed</span>
                            ) : (
                              <span className="new">New</span>
                            )}

                            {thisApplicant.map((appId) => {
                              return appId.nanoId === candidate.nanoId ? (
                                <span key={appId._id} className="can-do">
                                  Available:{" "}
                                  <span className="highlight">
                                    {appId.available_start}
                                  </span>{" "}
                                  to{" "}
                                  <span className="highlight">
                                    {appId.available_finish}
                                  </span>
                                </span>
                              ) : (
                                <span key={appId._id} className="can-do"></span>
                              );
                            })}

                            {/* <span className="ratings">
                              4.8 */}
                            {/* <span className="mx-2">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </span> */}
                            {/* <span className="graySpan">61 Reviews</span> */}
                            {/* </span> */}
                          </h2>

                          <div className={"parentfirstSecond"}>
                            <div className="firstBox">
                              <p className="home">
                                I live in{" "}
                                {candidate.suburb + ", " + candidate.state}
                              </p>

                              <p className="aircraft">
                                Fly from {candidate.locum_airport}
                              </p>
                              <p className="applied">
                                Applied on {candidate.dateApplied}
                              </p>
                            </div>
                            <div className="secondBox">
                              {candidate.locum_ahpra ===
                              "No, I am not registered with AHPRA." ? (
                                <p className="forbid">No AHPRA</p>
                              ) : (
                                <p className="yes">AHPRA</p>
                              )}
                              {candidate.locum_payroll ===
                              "No, I don' t have an ABN." ? (
                                <p className="forbid">No ABN</p>
                              ) : (
                                <p className="yes">Have ABN</p>
                              )}

                              {candidate.isSelected === true ? (
                                <p className="phone">{candidate.phone}</p>
                              ) : (
                                <div style={{ marginTop: "9px" }}>
                                  {thisApplicant.map((appId) => {
                                    return appId.nanoId === candidate.nanoId ? (
                                      <span id="units" key={appId._id}>
                                        <span
                                          id="daysBox"
                                          style={{
                                            padding: "2px",
                                          }}
                                        >
                                          {cdays(appId.expiryOffer)} days
                                        </span>
                                        <span
                                          id="hoursBox"
                                          style={{
                                            padding: "2px",
                                          }}
                                        >
                                          {chours(appId.expiryOffer)}h:
                                          {cminutes(appId.expiryOffer)}m
                                        </span>

                                        <span
                                          style={{
                                            color: "#777",
                                            margin: "0px 0px 0px 3px",
                                            padding: "0px",
                                          }}
                                        >
                                          left
                                        </span>
                                      </span>
                                    ) : (
                                      <span key={appId._id} id="units"></span>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={"ads"}
                        key={candidate._id}
                        style={
                          candidate.seen
                            ? { backgroundColor: "white" }
                            : { backgroundColor: "#fffec8" }
                        }
                      >
                        <div
                          id="bin"
                          onClick={(e) => {
                            onReject(e, candidate.slugId, candidate.nanoId);
                          }}
                        ></div>
                        <div className="rightmessage">
                          <div className="cv">
                            <div className="resumeBar">
                              <div
                                className="resume"
                                onMouseOver={(e) => {
                                  isSeen(e, candidate.slugId, candidate.nanoId);
                                }}
                              >
                                <ExternalLink
                                  target="_self"
                                  href={candidate.resume}
                                  download
                                >
                                  Resume
                                </ExternalLink>
                              </div>
                            </div>
                            {candidate.coverLetter ? (
                              <div
                                className="resume"
                                onMouseOver={(e) => {
                                  isSeen(e, candidate.slugId, candidate.nanoId);
                                }}
                              >
                                <ExternalLink
                                  target="_self"
                                  href={candidate.coverLetter}
                                  download
                                >
                                  Cover Letter
                                </ExternalLink>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <h2>
                            {candidate.firstName} {candidate.lastName}
                            {candidate.seen ? (
                              <span></span>
                            ) : (
                              <span className="new">New</span>
                            )}
                          </h2>

                          <div className={"gezinfirstSecond"}>
                            <div className="firstBox">
                              <p className="home">
                                I live in{" "}
                                {candidate.suburb + ", " + candidate.state}
                              </p>
                              <p className="email">{candidate.email}</p>
                              <p className="phone">{candidate.phone}</p>
                            </div>
                            <div className="secondBox">
                              {candidate.ahpra ===
                              "Yes, I declare that I am registered with AHPRA." ? (
                                <p className="yes">AHPRA</p>
                              ) : (
                                <p className="forbid">No AHPRA</p>
                              )}
                              {candidate.workstatus ===
                              "I am an Australian Citizen/ Permanent Resident" ? (
                                <p className="yes">AU citizen/ PR</p>
                              ) : candidate.workstatus ===
                                "I am a New Zealand Citizen" ? (
                                <p className="yes">NZ citizen</p>
                              ) : (
                                <p className="forbid">Require AU visa</p>
                              )}
                              <p className="applied">
                                Applied on {candidate.dateApplied}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {candidates.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        height: "90px",
                        lineHeight: "90px",
                      }}
                    >
                      No applicants at the moment
                    </div>
                  )}
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </section>
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
          <Footer />
        </div>

        <style jsx="true">{`
          body {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          /*===================== COUNTDOWN ================= */

          #units span {
            text-align: center;
            font-size: 14px;
            color: white;
            padding: 1px 5px;
            width: 20%;
            border-radius: 4px;
            box-sizing: border-box;
            margin: 10px 3px;
          }

          #units span:nth-child(1) {
            background: #14a248;
            color: #fff;
            border: none;
          }

          #units span:nth-child(2) {
            background: #14a248;
            color: #fff;
            border: none;
          }

          /*===================== FILTER CARD ================= */

          .wrap .filterCard {
            width: 420px;
            height: 95vh;
            padding: 20px 10px;
            align-items: center;
            border-radius: 0px;
            background: #fff;
            -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
            z-index: 3000;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            position: absolute;
            display: block;
            animation: filterframe 300ms ease-in 0ms;
            overflow: scroll;
          }

          @keyframes filterframe {
            from {
              transform: translate(-50%, -30%);
              opacity: 0;
            }
            to {
              transform: translateY(-50%, -50%);
              opacity: 1;
            }
          }

          @media only screen and (min-width: 768px) {
            .wrap .filterCard {
              width: 680px;
              padding: 30px 16px;
              z-index: 3500;
            }
          }

          .new {
            color: green;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-left: 10px;
          }

          .seen {
            color: #e40000;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-left: 10px;
          }

          .wrap .filterCard .filterTitle {
            position: relative;
            height: 42px;
            line-height: 42px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .filterCard .filterTitle h2 {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            font-weight: 600;
            font-size: 18px;
            font-family: Museo-Sans-500;
            color: rgb(51, 63, 72);
          }

          .wrap .filterCard .filterTitle img:hover {
            background-color: #dedede;
          }
          .wrap .modal-box-roletype {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-roletype h2 {
            color: rgb(51, 63, 72);
            font-size: 16px;
            font-weight: 600;
            font-family: Museo-Sans-500;
          }

          .modal-box-contract {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-contract h2 {
            color: rgb(51, 63, 72);
            font-size: 16px;
            font-weight: 600;
            font-family: Museo-Sans-500;
          }

          .wrap .modal-box-location {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-location h2 {
            color: rgb(51, 63, 72);
            font-size: 16px;
            font-weight: 600;
            font-family: Museo-Sans-500;
          }

          .filterCard .btn-search {
            height: 48px;
            border-radius: 4px;
            width: 120px;
            font-weight: 800;
            font-size: 20px;
            background-color: #14a248;
            text-align: center;
            border-color: #14a248;
            box-sizing: border-box;
            margin-top: 0px;
            cursor: pointer;
            padding: 1px auto;
            line-height: 32px;
            color: #fff;
            position: relative;
            outline: none;
            border: none;
          }
          .modal-box-location input[type="checkbox"],
          .modal-box-roletype input[type="checkbox"],
          .modal-box-contract input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
          }

          .states_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
          }
          .contract_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
          }
          .role_flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: block;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            margin: 1px 0px 0px 80px;
            height: 100%;
          }

          .filterCard .btn-search:active,
          .filterCard .btn-search:focus {
            outline: none;
            border: none;
          }

          .results {
            position: relative;
            height: 56px;
            line-height: 56px;
            width: 200px;
            font-weight: 600;
            font-size: 13px;
            font-family: "Noto Sans TC", sans-serif;
            color: rgb(51, 63, 72);
            display: none;
          }

          .nonselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
          }

          #filterPanel {
            width: 150px;
            height: 40px;
            padding: 5px 16px;
            line-height: 30px;
            font-size: 13px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            cursor: pointer;
            display: inline-block;
            font-family: sans-serif;
            font-weight: 500;
            position: relative;
            left: 30px;
            top: 7px;
          }

          #filterPanel span {
            margin-left: 26px;
            font-weight: 500;
          }

          #filterPanel:hover,
          #arrow-down:hover {
            background-color: #f7f8f9;
            border-color: #353f47;
          }

          #arrow-up {
            background-image: url("./../../images/arrow-up.png");
            height: 40px;
            width: 150px;
            line-height: 32px;
            font-size: 13px;
            border-radius: 4px;
            border: 1px solid #dce0e0;
            position: relative;
            left: 50px;
            top: 7px;
            text-align: center;
            font-family: sans-serif;
            font-weight: 500;
            cursor: pointer;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: 19px 14px;
            background-size: 13px;
            padding: 0;
            background-color: #14a248;
            border: 1px solid #14a248;
          }

          #arrow-down {
            background-image: url("./../../images/arrow-down.png");
            height: 40px;
            width: 150px;
            line-height: 32px;
            font-size: 13px;
            border-radius: 4px;
            border: 1px solid #dce0e0;
            text-align: center;
            font-family: sans-serif;
            font-weight: 500;
            cursor: pointer;
            background-color: white;
            background-repeat: no-repeat;
            background-position: 19px 14px;
            background-size: 13px;
            display: inline-block;
            position: relative;
            left: 50px;
            top: 7px;
            padding: 0;
          }
          #arrow-up a {
            height: 100%;
            width: 100%;
            color: #fff;
            position: relative;
            font-family: sans-serif;
            font-weight: 500;
            display: block;
            line-height: 40px;
          }
          #arrow-down a {
            height: 100%;
            width: 100%;
            color: #484848;
            position: relative;
            font-family: sans-serif;
            font-weight: 500;
            display: block;
            line-height: 40px;
          }
          #filter {
            background-image: url("./../../images/filters-small.png");
            height: 30px;
            width: 30px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 22px;
            display: block;
            position: absolute;
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

          .checkboxes {
            background-color: #14a248;
            cursor: pointer;
            color: white;
            border: 1px solid #14a248;
            position: relative;
            width: 250px;
            font-size: 16px;
            text-align: center;
            height: 40px;
            margin-top: 18px;
            border-radius: 4px;
            transform: translateX(19%);
            outline: none;
          }

          .checkboxes:focus,
          .checkboxes:active {
            outline: none;
          }

          .modal-box-location input[type="checkbox"],
          .modal-box-roletype input[type="checkbox"],
          .modal-box-contract input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
          }

          input::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #555 !important;
            font-weight: bold;
          }
          input::-moz-placeholder {
            /* Firefox 19+ */
            color: #555 !important;
            font-weight: bold;
          }
          input :-ms-input-placeholder {
            /* IE 10+ */
            color: #555 !important;
            font-weight: bold;
          }
          input:-moz-placeholder {
            /* Firefox 18- */
            color: #555 !important;
            font-weight: bold;
          }
          input[type="checkbox"] {
            opacity: 0;
            float: left;
          }
          /*Checboxes*/
          input[type="checkbox"] + label {
            margin: 0 0 0 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: sans-serif;
            font-weight: 500;
            float: left;
            margin: 0px;
            width: 100%;
          }
          input[type="checkbox"] + label::before {
            content: " ";
            position: relative;
            left: -45px;
            top: 19px;
            width: 20px;
            height: 20px;
            display: block;
            background: white;
            border-radius: 4px;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          input[type="checkbox"] + label::after {
            content: " ";
            position: absolute;
            left: -50px;
            top: 15px;
            width: 30px;
            height: 30px;
            display: block;
            z-index: 1;
            background: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: center;
            -webkit-transition: all 0.2s ease;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
          }
          input[type="checkbox"]:checked + label::after {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
          }

          @keyframes myframes {
            from {
              opacity: 1;
              transform: translateY(-40%);
            }
            to {
              opacity: 1;
              transform: translateY(0%);
            }
          }

          @media only screen and (min-width: 768px) {
            .results {
              display: block;
            }
          }

          .wrapper {
            display: grid;
            grid-column-gap: 2em;
            background-size: cover;
            grid-auto-rows: 796px;
            grid-template-columns: 100%;
            position: relative;
            padding: 0px 25px 0px 25px;
            overflow: hidden;
          }

          .buttonSegment {
            display: grid;
            grid-template-columns: 56% 44%;
            padding: 0px 0px 0px 15px;
          }

          .wrapper-ads .ads {
            height: 230px;
            width: 100%;
            border-radius: 0px;
            border: none;
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
          }

          .highlight_locum {
            color: white;
            background: #14a248;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .highlight_fulltime {
            color: white;
            background: #54c8e8;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }
          .highlight_parttime {
            color: white;
            background: #a020f0;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .highlight_other {
            color: white;
            background: deeppink;
            border-radius: 4px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            padding: 2px 8px;
            display: inline-block;
          }

          .ads p {
            height: 46px;
            overflow: hidden;
          }

          .wrap .alertCircle {
            background-color: #e40000;
            border-radius: 50%;
            color: white;
            height: 30px;
            width: 30px;
            line-height: 30px;
            position: absolute;
            transform: translate(210%, -50%);
          }

          .wrap .showCircle {
            background-color: #fff;
            border-radius: 50%;
            color: #14a248;
            height: 32px;
            width: 32px;
            line-height: 30px;
            position: absolute;
            border: 1px solid #14a248;
            transform: translate(210%, -50%);
          }

          .wrapper .adList {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            position: relative;
          }
          ::-webkit-scrollbar {
            display: none;
          }
          ::-moz-scrollbar {
            display: none;
          }
          :-ms-scrollbar {
            display: none;
          }
          .scrollbar {
            display: none;
          }

          @media only screen and (min-width: 768px) {
            .wrapper {
              grid-template-columns: 56% 44%;
              padding: 0px 50px 0px 25px;
            }
          }

          /* ============ POSTS =============== */

          .wrapper-ads .leftmessage {
            margin-left: 0px;
            height: 230px;
            position: relative;
            overflow: hidden;
            background: white;
            border: 2px solid #ebebeb;
            height: 100%;
          }
          .wrapper-ads .ads:hover {
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .wrapper-ads .leftmessage h2 {
            font-size: 18px;
            font-family: sans-serif;
            font-weight: 600;
            color: #333;
            margin: 10px 10px 10px 10px;
          }

          .wrapper-ads .leftmessage h3 {
            font-size: 15px;
            font-family: sans-serif;
            color: #333;
            font-weight: 800;
            margin: 15px 10px;
          }
          .wrapper-ads .leftmessage p {
            font-size: 15px;
            font-family: sans-serif;
            font-weight: 100;
            color: #333;
            margin: 10px 10px;
          }

          .applicant-ads {
            animation: myframes 500ms ease-in-out 0ms;
          }

          #chosenOne {
            background-color: #14a248;
            border: 1px solid #14a248;
            font-weight: 800;
            color: white;
          }

          #sleep {
            background-color: #e40000;
            border: 1px solid #e40000;
            font-weight: 800;
            color: white;
          }

          .applicant-ads .ads {
            height: 155px;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #333;
            background-color: white;
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
            display: block;
            padding: 10px 10px 0px;
          }

          .candidatePhoto {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            position: absolute;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            transform: translate(-50%, -50%);
            left: 8%;
            top: 50%;
            overflow: hidden;
            background: #eee;
            border: 2px solid white;
          }

          .candidatePhoto img {
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

          .fa-star {
            color: gold;
            font-size: 14px;
          }

          .ratings {
            font-size: 14px;
            margin-left: 5px;
          }

          .can-do {
            font-size: 14px;
            margin-left: 8px;
          }
          .highlight {
            color: white;
            background: deeppink;
            border-radius: 4px;
            line-height: 24px;
            text-align: center;
            padding: 0px 2px;
            display: inline-block;
          }

          .parentfirstSecond {
            display: flex;
            justify-content: space-between;
            width: 370px;
          }

          .parentfirstSecond .secondBox {
            width: 165px;
          }

          .gezinfirstSecond {
            display: flex;
            justify-content: space-between;
            width: 420px;
          }

          .gezinfirstSecond .secondBox {
            width: 165px;
          }

          .applicant-ads .rightmessage {
            margin-left: 0px;
            cursor: default;
            height: 140px;
            position: relative;
            height: 100%;
          }

          .applicant-ads .rightmessage h2,
          .applicant-ads .rightmessage h2 a {
            font-size: 18px;
            font-family: sans-serif;
            font-weight: 600;
            color: #2b2b2b;
            margin: 0px 0px 3px 0px;
          }

          .applicant-ads .ads .rightmessage p {
            margin: 9px 2px 0px;
            color: #777;
            padding-left: 25px;
            font-size: 14px;
            font-weight: 300;
            font-family: sans-serif;
            height: 22px;
            position: relative;
          }

          .ads .rightmessage {
            width: 100%;
          }

          .ads #bin {
            margin: 4px 0px 0px 1px;
            height: 24px;
            width: 24px;
            cursor: pointer;
            position: absolute;
            border-radius: 2px;
            background-color: #484848;
            left: 95%;
            top: -1%;
            background-image: url("./../../images/bin.png");
            background-position: center;
            background-size: 12px;
            background-repeat: no-repeat;
            z-index: 200;
          }

          .ads #bin:hover {
            background-color: #2b2b2b;
            cursor: pointer;
          }

          .ads #bin:active,
          .ads #bin:focus {
            border: none;
            background-color: #2b2b2b;
          }

          .bookdate {
            position: absolute;
            width: 150px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            left: 72%;
            height: 98px;
          }
          .bookdate button {
            width: 100%;
            background-color: #14a248;
            color: white;
            outline: none;
            border: none;
            height: 40px;
            border-radius: 4px;
            cursor: pointer;
          }

          .bookdate button a {
            color: #fff;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 38px;
          }

          .bookdateBar {
            position: relative;
            display: flex;
            justify-content: right;
            width: 100%;
            height: 100%;
          }

          .cv {
            position: absolute;
            width: 100px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            left: 78%;
            top: 15%;
          }

          .resumeBar {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .reject {
            width: 85px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: relative;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
            height: 40px;
          }

          .resume a {
            display: block;
            color: #484848;
            height: 100%;
            width: 100%;
            font-weight: 300;
          }

          .resume {
            width: 100px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: relative;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
            height: 40px;
          }

          .resume:first-child {
            margin-bottom: 20px;
          }

          .fs-sign-link,
          .fs-edit-link,
          .formswift-button {
            display: none;
          }

          .no-listings {
            text-align: center;
            margin-top: 20px;
            padding: 0px auto;
          }
          .no-listings h2 {
            color: 333;
            font-weight: 800;
            margin: 0;
            font-size: 18px;
          }
          .preview-ad,
          .edit-ad,
          .retire,
          .applicants {
            width: 115px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: absolute;
            top: 30%;
            left: 96%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
          }
          .preview-ad {
            position: absolute;
            top: 20%;
            left: 55%;
            transform: translate(-50%, -50%);
            display: block;
          }
          .edit-ad {
            position: absolute;
            top: 45%;
            left: 55%;
            transform: translate(-50%, -50%);
            display: block;
          }

          .applicants {
            position: absolute;
            top: 45%;
            left: 85%;
            transform: translate(-50%, -50%);
            display: block;
          }
          .retire {
            position: absolute;
            top: 20%;
            left: 85%;
            transform: translate(-50%, -50%);
            display: block;
          }
          .retire:hover,
          .applicants:hover,
          .edit-ad:hover,
          .preview-ad:hover {
            background-color: #f7f8f9;
            border-color: #353f47;
          }
          .reject:hover {
            color: white;
            background-color: #e40000;
            border: 1px solid #333;
          }

          @media screen and (max-width: 768px) {
            .wrap .listContent .adList {
              width: 100%;
            }
            .applicant-ads .rightmessage {
              margin-left: 0px;
              pointer: default;
              height: 140px;
              position: relative;
              height: 100%;
            }
            .bookdate {
              width: 90px;
              left: 78%;
              height: 98px;
            }

            .cv {
              width: 130px;
              left: 70%;
              height: 98px;
            }
            .edit-ad {
              width: 80px;
              left: 66%;
            }
            .applicants {
              width: 80px;
            }
            .retire {
              width: 80px;
            }
            .preview-ad {
              width: 80px;
              left: 66%;
            }
            .reject {
              display: none;
            }

            .bookdate button {
              width: 80px;
              height: 40px;
            }
            .applicant-ads .ads .rightmessage .secondBox {
              display: block;
            }

            .buttonSegment {
              display: block;
            }

            .parentfirstSecond {
              width: 300px;
            }
            .applicant-ads .ads .rightmessage p {
              font-size: 12px;
            }
            .wrapper-ads .leftmessage h3 {
              font-size: 13px;
            }

            .ads #bin {
              left: 93%;
              top: -1%;
            }

            .resume {
              display: none;
            }
          }

          input[type="button"] {
            background-color: pink;
            display: block;
            height: 100%;
            width: 100%;
          }

          .fix-Container {
            width: 100%;
            height: 56px;
            position: relative;
          }

          .yes {
            background-image: url("./../../images/check.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .forbid {
            background-image: url("./../../images/forbid.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .aircraft {
            background-image: url("./../../images/aircraft.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .phone {
            background-image: url("./../../images/phone.png");
            background-repeat: no-repeat;
            background-position: 0px 1px;
            background-size: 19px;
          }
          .applied {
            background-image: url("./../../images/paperairplane.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .home {
            background-image: url("./../../images/housemarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .email {
            background-image: url("./../../images/email.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
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

          /* ========= FOOTER SUBSCRIPTION ============ */

          #subscribe-btn a:hover {
            color: white;
          }
          #subscribe-btn a {
            height: 100%;
            width: 100%;
            display: block;
            color: white;
          }

          button a:active,
          button:focus {
            border: none;
            outline: none;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ListingManager;
