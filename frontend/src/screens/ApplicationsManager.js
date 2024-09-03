import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ExternalLink } from "react-external-link";
import { ReactSession } from "react-client-session";
import { useSelector } from "react-redux";
import axios from "axios";

const ApplicationsManager = () => {
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);
  const { search } = useLocation();
  const [listingInfo, setListingInfo] = useState([]);
  const [applications, setApplications] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const emptyArray = listingInfo.length;
  const [noOfCases, setNoOfCases] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState([]);
  const email = user.email;

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/applications/getList?page=${page <= 0 ? 0 : page - 1}` +
        "sortBy=" +
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
    setListOfProfessions(data.professions);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/applications/getList?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "sortBy=" +
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
        `api/applications/getList?page=${id + 1}` +
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
          "api/applications/getList?sortBy=asc" +
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
    }

    if (ascDesc === true) {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/getList?sortBy=desc" +
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
  // ======= TAKE OUT DUPLICATE PROFESSIONS ======

  const noDuplicates = [
    ...new Map(
      listOfProfessions.map((list) => [list.professionName, list])
    ).values(),
  ];

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
  };

  // ========= CLEAR ALL IN FILTERCARD ===========
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
  };

  // ============== BACKDROP ============== //
  const [, setBackdrop] = useState(false);

  const clickOnBackdrop = () => {
    setBackdrop(false);
    setFilterCard(false);
  };

  // ============= GET APPLICATIONSMANAGER ===============
  // ============= GET SEARCH FILTER ================

  useEffect(() => {
    let isCancelled = false;
    if (search === "") {
      sessionStorage.clear();
    }

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/applicationsmanager?" +
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
        setNoOfCases(data.num);
        setApplications(data.applications);
        setCandidates(data.candidates);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
        setListOfProfessions(data.professions);
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
  }, [contract, professions, location, page, sort, email, search]);

  useEffect(() => {
    let isCancelled = false;
    if (search === "") {
      sessionStorage.clear();
    }

    // declare the data fetching function
    const fetchData = async () => {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/getList?" +
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
        setNoOfCases(data.num);
        setListingInfo(data.adPosts);
        setCandidates(data.candidates);
        setPage(data.page);
        setMaxPage(data.maxPage);
        setSort(data.sort);
        setListOfProfessions(data.professions);
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
  }, [contract, professions, location, page, sort, email, search]);

  const highlight = async (slug) => {
    ReactSession.set("slug", slug);
    setReload(false);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/applications/myapplications/${slug}?` +
        "sortBy=" +
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
    setNoOfCases(data.num);
    setListingInfo(data.adPosts);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setCandidates(data.candidates);
  };

  const onWithdraw = async (e, slugId, nanoId) => {
    e.preventDefault();
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/applications/withdraw/${slugId}/${nanoId}?`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    if (data.deletedCount === 1) {
      highlight(slugId);
    }
  };

  // ============ LOGGEDIN APPLICANT APPLIED ===========
  const [thisApplicant, setThisApplicant] = useState([]);
  const [hired, setHired] = useState([]);
  const [nothired, setNothired] = useState([]);
  const [noresponse, setNoResponse] = useState([]);

  // Hired
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/hired?email=" +
          email
      )
      .then((response) => {
        if (response.status === 200) {
          setHired(response.data.thisAd);
        }
      });
  }, []);

  // Rejected
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/nothired?email=" +
          email
      )
      .then((response) => {
        if (response.status === 200) {
          setNothired(response.data.thisAd);
        }
      });
  }, []);

  // No response
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/noresponse?email=" +
          email
      )
      .then((response) => {
        if (response.status === 200) {
          setNoResponse(response.data.thisAd);
        }
      });
  }, []);

  // ============ COUNTDOWN ===========

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

  const cdays = (expiry) => {
    let xmas = new Date(expiry);
    let now = new Date();

    let timeDiff = xmas.getTime() - now.getTime() - 10 * 60 * 60 * 1000;

    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    return days;
  };

  const chours = (expiry) => {
    let xmas = new Date(expiry);
    let now = new Date();

    let timeDiff = xmas.getTime() - now.getTime() - 10 * 60 * 60 * 1000;

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
    let xmas = new Date(expiry);
    let now = new Date();

    let timeDiff = xmas.getTime() - now.getTime() - 10 * 60 * 60 * 1000;

    let seconds = Math.floor(timeDiff / 1000);
    let minutes = Math.floor(seconds / 60);

    let minutesX = (minutes %= 60).toLocaleString("en-AU", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return minutesX;
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Applications Manager | Medclicker</title>
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

              {noOfCases.length === 0 ? (
                <div className="results">You have made 0 applications</div>
              ) : noOfCases > 1 ? (
                <div className="results">
                  You have made {noOfCases} applications
                </div>
              ) : (
                <div className="results">
                  You have made {noOfCases} application
                </div>
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
                <div className="wrapper-ads">
                  {applications.map((apply) => {
                    return listingInfo.map((list) => {
                      return (
                        list.slug === apply.slugId && (
                          <div key={apply._id}>
                            <div className="ads">
                              <div
                                className={
                                  list.isActiveJob === false ||
                                  list.isDeletedJob === true
                                    ? "leftmessage inactive"
                                    : "leftmessage"
                                }
                              >
                                {list.isPaidLocum === false ? (
                                  list.isActiveJob === false &&
                                  list.isDeletedJob === false ? (
                                    <span className={"closed"}>PAUSED</span>
                                  ) : (
                                    <span></span>
                                  )
                                ) : (
                                  <span className={"closed"}>COMPLETED</span>
                                )}

                                {list.isPaidLocum === false ? (
                                  list.isDeletedJob === true &&
                                  list.isActiveJob === false ? (
                                    <span className={"closed"}>EXPIRED</span>
                                  ) : (
                                    <span></span>
                                  )
                                ) : (
                                  <span className={"closed"}>COMPLETED</span>
                                )}

                                {list.isDeletedJob ? (
                                  <div className="preview-ad inactive">
                                    View Job
                                  </div>
                                ) : (
                                  <ExternalLink
                                    href={
                                      process.env.REACT_APP_BACKEND_URL +
                                      `api/listings/adPosts/${list.slug}`
                                    }
                                    target="_self"
                                  >
                                    <div className="preview-ad">View Job</div>
                                  </ExternalLink>
                                )}
                                {ReactSession.get("slug") === list.slug ? (
                                  <div
                                    id="chosenOne"
                                    className="applicants"
                                    onClick={() => {
                                      highlight(list.slug);
                                    }}
                                  >
                                    {hired.map((appId) => {
                                      return (
                                        appId.slugId === list.slug && (
                                          <span key={appId._id}>Hired</span>
                                        )
                                      );
                                    })}
                                    {nothired.map((appId) => {
                                      return (
                                        appId.slugId === list.slug && (
                                          <span key={appId._id}>Rejected</span>
                                        )
                                      );
                                    })}
                                    {noresponse.map((appId) => {
                                      return (
                                        appId.slugId === list.slug && (
                                          <span key={appId._id}>
                                            My Application
                                          </span>
                                        )
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div
                                    className="applicants"
                                    onClick={() => {
                                      highlight(list.slug);
                                      myDates(list.slug);
                                    }}
                                  >
                                    {hired.map((appId) => {
                                      return (
                                        appId.slugId === list.slug && (
                                          <span
                                            style={{
                                              fontWeight: "300",
                                            }}
                                            key={appId._id}
                                          >
                                            Hired
                                          </span>
                                        )
                                      );
                                    })}
                                    {nothired.map((appId) => {
                                      return (
                                        appId.slugId === list.slug && (
                                          <span
                                            style={{
                                              fontWeight: "300",
                                            }}
                                            key={appId._id}
                                          >
                                            Rejected
                                          </span>
                                        )
                                      );
                                    })}
                                    {noresponse.map((appId) => {
                                      return (
                                        appId.slugId === list.slug && (
                                          <span
                                            style={{
                                              fontWeight: "300",
                                            }}
                                            key={appId._id}
                                          >
                                            My Application
                                          </span>
                                        )
                                      );
                                    })}
                                  </div>
                                )}
                                <h2>
                                  {list.professions + " "}
                                  {list.contractType === "Full-Time" ? (
                                    <span className="highlight_fulltime">
                                      {list.contractType}
                                    </span>
                                  ) : list.contractType === "Part-Time" ? (
                                    <span className="highlight_parttime">
                                      {list.contractType}
                                    </span>
                                  ) : list.contractType === "Locum" ? (
                                    <span className="highlight_locum">
                                      {list.contractType}
                                    </span>
                                  ) : (
                                    <span className="highlight_other">
                                      {list.contractType}
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
                                  Case ID: {list.caseId}
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
                                  {list.suburb +
                                    " " +
                                    list.state +
                                    " " +
                                    list.postalCode}
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
                                  Expiring on: {list.finishDate}
                                </h3>
                                {list.contractType === "Locum" ? (
                                  <h3
                                    style={{
                                      height: "20px",
                                      marginTop: "13px",
                                    }}
                                  >
                                    Need locum from:{" "}
                                    <span className="highlight">
                                      {list.startDate}
                                    </span>{" "}
                                    to{" "}
                                    <span className="highlight">
                                      {list.finishDate}
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
                                <p>{list.about}</p>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    });
                  })}
                  {emptyArray === 0 && (
                    <div className="no-applications">
                      <h2>No applications found</h2>
                    </div>
                  )}
                </div>
              </div>
              {ReactSession.get("slug") ? (
                <div
                  className="applicant-ads"
                  style={{ display: reload ? "block" : "none" }}
                >
                  {candidates.map((candidate) => {
                    return candidate.contractType === "Locum" ? (
                      <div className="ads" key={candidate._id}>
                        <div className="rightmessage">
                          {candidate.isSelected === true ? (
                            <div></div>
                          ) : (
                            <div
                              className="withdraw"
                              onClick={(e) => {
                                onWithdraw(
                                  e,
                                  candidate.slugId,
                                  candidate.nanoId
                                );
                              }}
                            >
                              {candidate.isRejected ? "Delete" : "Withdraw"}
                            </div>
                          )}

                          <h2>
                            <ExternalLink
                              target="_self"
                              href={
                                process.env.REACT_APP_BACKEND_URL +
                                `api/locums/resumeMe/${candidate.nanoId}`
                              }
                            >
                              {candidate.firstName}
                            </ExternalLink>
                            {candidate.seen ? (
                              <span className="seen">Viewed</span>
                            ) : (
                              <span className="seen">Submitted</span>
                            )}
                            {candidate.isSelected ? (
                              <span className="seen">Hired</span>
                            ) : (
                              <span></span>
                            )}
                            {candidate.isRejected ? (
                              <span className="rejected">Rejected</span>
                            ) : (
                              <span></span>
                            )}

                            <span className="can-do">
                              I can do:{" "}
                              <span className="highlight">
                                {candidate.available_start}
                              </span>{" "}
                              to{" "}
                              <span className="highlight">
                                {candidate.available_finish}
                              </span>
                            </span>
                          </h2>

                          <div
                            className={
                              candidate.isSelected
                                ? "selected-parentfirstSecond"
                                : "parentfirstSecond"
                            }
                          >
                            {candidate.isSelected === true ? (
                              <div className="selected-firstBox">
                                {listingInfo.map((listing) => {
                                  return (
                                    ReactSession.get("slug") ===
                                      listing.slug && (
                                      <>
                                        <p className="owner">
                                          {listing.firstName} {listing.lastName}
                                        </p>
                                        <p className="home">
                                          {listing.accommodation === true
                                            ? "Accom. included"
                                            : "Not included"}
                                        </p>
                                        <p className="aircraft">
                                          {listing.airtravel === true
                                            ? "Air travel included"
                                            : "Not included"}
                                        </p>
                                      </>
                                    )
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="firstBox">
                                <p className="home">
                                  I live in{" "}
                                  {candidate.suburb + " " + candidate.state}
                                </p>
                                <p className="aircraft">
                                  Fly from {candidate.locum_airport}
                                </p>
                                <p className="applied">
                                  Applied on {candidate.dateApplied}
                                </p>
                              </div>
                            )}

                            {candidate.isSelected === true ? (
                              <div className="selected-secondBox">
                                {listingInfo.map((listing) => {
                                  return (
                                    ReactSession.get("slug") ===
                                      listing.slug && (
                                      <>
                                        <p className="hospital">
                                          {listing.streetNo} {listing.street}{" "}
                                          {listing.suburb} {listing.state}{" "}
                                          {listing.postalCode}
                                        </p>
                                        <p className="email">{listing.email}</p>
                                        <p className="phone">{listing.phone}</p>
                                      </>
                                    )
                                  );
                                })}
                              </div>
                            ) : (
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
                                <div style={{ marginTop: "9px" }}>
                                  {thisApplicant.map((appId) => {
                                    return appId.nanoId === candidate.nanoId ? (
                                      <span id="units" key={appId._id}>
                                        <span
                                          id="daysBox"
                                          style={{
                                            padding: "3px",
                                          }}
                                        >
                                          {cdays(appId.expiryOffer)} days
                                        </span>
                                        <span
                                          id="hoursBox"
                                          style={{
                                            padding: "3px",
                                          }}
                                        >
                                          {chours(appId.expiryOffer)}h:
                                          {cminutes(appId.expiryOffer)}m
                                        </span>

                                        <span
                                          style={{
                                            color: "#777",
                                            margin: "0px 0px 0px 3px",
                                            padding: "3px",
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
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ads" key={candidate._id}>
                        <div className="rightmessage">
                          <div className="bookdateBar">
                            <div className="resume">
                              <ExternalLink
                                target="_blank"
                                href={candidate.resume}
                                download
                              >
                                Resume
                              </ExternalLink>
                            </div>

                            <div
                              className="withdraw"
                              onClick={(e) => {
                                onWithdraw(
                                  e,
                                  candidate.slugId,
                                  candidate.nanoId
                                );
                              }}
                            >
                              {candidate.isRejected ? "Delete" : "Withdraw"}
                            </div>
                          </div>
                          <h2>
                            {candidate.firstName} {candidate.lastName}
                            {candidate.seen ? (
                              <span className="seen">Viewed</span>
                            ) : (
                              <span></span>
                            )}
                            {candidate.isRejected ? (
                              <span className="rejected">Rejected</span>
                            ) : (
                              <span></span>
                            )}
                          </h2>

                          <div className="parentfirstSecond">
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

          .ads p {
            height: 46px;
            overflow: hidden;
          }

          .fs-sign-link,
          .fs-edit-link,
          .formswift-button {
            display: none;
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

          /*===================== FILTER PANEL ================= */
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

          .fix-Container {
            width: 100%;
            height: 56px;
            position: relative;
          }

          .fix-Container button a:active,
          .fix-Container button:focus {
            border: none;
            outline: none;
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

          @media only screen and (min-width: 768px) {
            .results {
              display: block;
            }
          }

          /* ============ PAGINATION ========== */

          .buttonSegment {
            display: grid;
            grid-template-columns: 56% 44%;
            padding: 0px 0px 0px 15px;
          }

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
          @media screen and (max-width: 768px) {
            .buttonSegment {
              display: block;
            }
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
          .pig {
            background-image: url("./../../images/pigmarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .home {
            background-image: url("./../../images/housemarker.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .phone {
            background-image: url("./../../images/phone.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .aircraft {
            background-image: url("./../../images/aircraft.png");
            background-repeat: no-repeat;
            background-position: -1px 0px;
            background-size: 20px;
          }
          .owner {
            background-image: url("./../../images/boy.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          .hospital {
            background-image: url("./../../images/hospital.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 18px;
          }
          .applied {
            background-image: url("./../../images/paperairplane.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }

          .email {
            background-image: url("./../../images/email.png");
            background-repeat: no-repeat;
            background-position: 0px 0px;
            background-size: 20px;
          }
          /* ========= JOB BOX (LEFT) ======== */

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

          .wrapper #chosenOne {
            background-color: #14a248;
            border: 1px solid #14a248;
            font-weight: 800;
            color: white;
          }

          .wrapper-ads .inactive {
            background-color: #ebebeb;
          }

          .wrapper .closed {
            position: absolute;
            transform: translate(-50%, -180%);
            top: 50%;
            left: 50%;
            color: #e40000;
            font-size: 16px;
            fontweight: 700;
            height: 32px;
            line-height: 30px;
            padding-left: 3px;
            padding-right: 3px;
            border: 2px solid #e40000;
            margin-left: 10px;
            background-color: transparent;
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

          .wrapper .ads .rightmessage {
            width: 100%;
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

          .wrapper-ads .leftmessage {
            margin-left: 0px;
            height: 230px;
            position: relative;
            overflow: hidden;
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
            font-size: 14px;
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
            padding: 0px 3px;
            display: inline-block;
          }

          .preview-ad,
          .applicants {
            width: 125px;
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
            font-family: sans-serif;
            font-weight: 300;
          }
          .preview-ad {
            position: absolute;
            top: 20%;
            left: 85%;
            transform: translate(-50%, -50%);
            display: block;
          }

          .preview-ad.inactive {
            background-color: #ebebeb;
            cursor: default;
            border-color: #353f47;
          }

          .preview-ad.inactive:hover {
            background-color: #ebebeb;
          }

          .applicants {
            position: absolute;
            top: 45%;
            left: 85%;
            transform: translate(-50%, -50%);
            display: block;
          }

          .applicants:hover,
          .preview-ad:hover {
            background-color: #f7f8f9;
            border-color: #353f47;
          }

          /* ========= CANDIDATE BOX (RIGHT) ======== */
          .applicant-ads {
            display: block;
            animation: myframes 500ms ease-in-out 0ms;
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

          .applicant-ads .rightmessage {
            margin-left: 0px;
            cursor: default;
            height: 140px;
            position: relative;
            height: 100%;
          }

          .applicant-ads .ads .rightmessage {
            width: 100%;
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

          .bookdateBar {
            position: absolute;
            display: flex;
            justify-content: right;
            width: 90px;
            height: 100%;
            flex-direction: column;
            left: 84%;
          }

          .applicant-ads .rightmessage .withdraw {
            width: 80px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: absolute;
            left: 78%;
            top: 50%;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
          }

          .applicant-ads .rightmessage .bookdateBar .withdraw {
            width: 80px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 4px;
            background-color: white;
            color: #484848;
            border: 1px solid #dce0e0;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 0%;
            cursor: pointer;
            display: block;
            font-family: sans-serif;
            font-weight: 300;
          }

          .applicant-ads .rightmessage .withdraw:hover {
            color: white;
            background-color: #e40000;
            border: 1px solid #353f47;
          }

          .resume a {
            display: block;
            color: #484848;
            height: 100%;
            width: 100%;
            font-weight: 300;
          }

          .resume {
            width: 80px;
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

          .applicant-ads .rightmessage .seen {
            color: green;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-left: 10px;
            display: none;
          }
          .applicant-ads .rightmessage .rejected {
            color: #e40000;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-left: 10px;
            display: none;
          }

          .parentfirstSecond {
            display: flex;
            justify-content: space-between;
            width: 350px;
          }
          .selected-parentfirstSecond {
            display: flex;
            justify-content: space-between;
            width: 435px;
          }

          .selected-parentfirstSecond .selected-firstBox {
            width: 185px;
          }
          .parentfirstSecond .secondBox {
            width: 165px;
          }
          .selected-parentfirstSecond .selected-secondBox {
            width: 300px;
          }

          .bookdateBar {
            position: absolute;
            display: flex;
            justify-content: right;
            width: 90px;
            height: 100%;
            flex-direction: column;
            left: 82%;
          }

          .no-applications {
            text-align: center;
            margin-top: 20px;
            padding: 0px auto;
          }
          .no-applications h2 {
            color: #333;
            font-weight: 800;
            margin: 0;
            font-size: 18px;
          }

          @media only screen and (min-width: 768px) {
            .wrapper {
              grid-template-columns: 56% 44%;
              padding: 0px 50px 0px 25px;
            }
            .wrapper-ads .leftmessage {
              margin-left: 0px;
              width: 100%;
            }
            .container {
              text-align: left;
            }
            .parentfirstSecond {
              width: 420px;
            }
            .selected-parentfirstSecond {
              width: 500px;
            }

            .applicant-ads .rightmessage .withdraw {
              left: 82%;
            }

            .applicant-ads .rightmessage .bookdateBar .withdraw {
              left: 0%;
            }

            .wrapper-ads .leftmessage h3 {
              font-size: 15px;
            }
            .wrapper .closed {
              font-size: 26px;
              fontweight: 700;
              height: 38px;
              line-height: 34px;
            }
            .applicant-ads .rightmessage .rejected {
              display: inline;
            }
            .applicant-ads .rightmessage .seen {
              display: inline;
            }
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

          .modal-box-roletype {
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

          /* ======== CHECKBOXES ============*/
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

          .filterCard .btn-search:active,
          .filterCard .btn-search:focus {
            outline: none;
            border: none;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default ApplicationsManager;
