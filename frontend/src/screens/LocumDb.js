import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";

const LocumDb = () => {
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);
  const { search } = useLocation();
  const [noOfCases, setNoOfCases] = useState([]);
  const [page, setPage] = useState([]);
  const [maxPage, setMaxPage] = useState([]);
  const email = user.email;

  // =============== PAGE BUTTONS ================

  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/locums/database?page=${page <= 0 ? 0 : page - 1}` +
        "sortBy=" +
        sort +
        "&language=" +
        language +
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
    setLocums(data.locums);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setListOfProfessions(data.professions);
  };

  const pageNext = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/locums/database?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "sortBy=" +
        sort +
        "&language=" +
        language +
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
    setLocums(data.locums);
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
        `api/locums/database?page=${id + 1}` +
        "&language=" +
        language +
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
    setLocums(data.locums);
    setPage(data.page);
    setMaxPage(data.maxPage);
    setSort(data.sort);
    setListOfProfessions(data.professions);
  };

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);
  const [, setReload] = useState(false);

  const sorting = async (ascDesc) => {
    setReload(false);
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/locums/database?sortBy=asc" +
          "&language=" +
          language +
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
      setLocums(data.locums);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfProfessions(data.professions);
    }

    if (ascDesc === true) {
      setReload(false);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/locums/database?sortBy=desc" +
          "&language=" +
          language +
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
      setLocums(data.locums);
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

  // ========== SELECT LANGUAGE  ===========
  const [language, setLanguage] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [listOfProfessions, setListOfProfessions] = useState([]);
  const [checks, setChecks] = useState([]);
  const [location, setLocation] = useState([]);
  const [checkedChn, setCheckedChn] = useState(false);
  const [checkedCan, setCheckedCan] = useState(false);
  const [checkedViet, setCheckedViet] = useState(false);
  const [checkedGrk, setCheckedGrk] = useState(false);
  const [checkedIta, setCheckedIta] = useState(false);
  const [checkedKor, setCheckedKor] = useState(false);
  const [checkedArabic, setCheckedArabic] = useState(false);
  const [checkedEsp, setCheckedEsp] = useState(false);

  const [, setChecker] = useState([]);

  // =========== ADD LANGUAGE ==================
  const onLanguageChange = async (event) => {
    const { value } = event.target;
    setLanguage([...language, value]);
    const { checked } = event.target;
    setChecker([...language, checked]);
  };

  // ============= REMOVE LANGUAGE =============
  const onRemoveLevel = async (event) => {
    const { value } = event.target;
    const index = language.indexOf(value);
    if (index !== -1) {
      language.splice(index, 1);
    }
    setLanguage([...language]);
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
    setCheckedACT(false);
    setCheckedNSW(false);
    setCheckedNT(false);
    setCheckedQLD(false);
    setCheckedSA(false);
    setCheckedTAS(false);
    setCheckedWA(false);
    setCheckedVIC(false);
    setCheckedChn(false);
    setCheckedCan(false);
    setCheckedViet(false);
    setCheckedGrk(false);
    setCheckedIta(false);
    setCheckedKor(false);
    setCheckedArabic(false);
    setCheckedEsp(false);
    setLocation([]);
    setProfessions([]);
    setChecks([]);
    setLanguage([]);
  };

  // ============== BACKDROP ============== //
  const [, setBackdrop] = useState(false);

  const clickOnBackdrop = () => {
    setBackdrop(false);
    setFilterCard(false);
  };

  // ============= GET LOCUM LIST================
  const [locums, setLocums] = useState([]);
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
          "api/locums/database?" +
          "language=" +
          language +
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
        setLocums(data.locums);
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
  }, [language, professions, location, search, email, sort, page]);

  // ======= TAKE OUT DUPLICATE PROFESSIONS ======

  const noDuplicates = [
    ...new Map(
      listOfProfessions.map((list) => [list.professionName, list])
    ).values(),
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Databse | Medclicker</title>
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
                      to={`?sortBy=desc&language=${language}&location=${location}&professions=${professions}`}
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
                      to={`?sortBy=asc&language=${language}&location=${location}&professions=${professions}`}
                      target="_self"
                    >
                      Sort
                    </Link>
                  </button>
                )}
              </form>

              {noOfCases.length === 0 ? (
                <div className="results">Found 0 locums</div>
              ) : noOfCases > 1 ? (
                <div className="results">Found {noOfCases} locums</div>
              ) : (
                <div className="results">Found {noOfCases} locum</div>
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
                <div className="modal-box-language">
                  <h2 style={{ margin: "0" }}>Locum's spoken language</h2>
                  <div className="row">
                    <div className="language_flex">
                      <input
                        id="arabic"
                        type="checkbox"
                        checked={checkedArabic ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedArabic
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedArabic(!checkedArabic);
                        }}
                        value="Arabic"
                      />
                      <label htmlFor="arabic">Arabic</label>
                      <input
                        id="cantonese"
                        type="checkbox"
                        checked={checkedCan ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedCan
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedCan(!checkedCan);
                        }}
                        value="Cantonese"
                      />
                      <label htmlFor="cantonese">Cantonese</label>
                      <input
                        id="greek"
                        type="checkbox"
                        checked={checkedGrk ? true : false}
                        name="contract"
                        onChange={(event) => {
                          !checkedGrk
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedGrk(!checkedGrk);
                        }}
                        value="Greek"
                      />

                      <label htmlFor="greek">Greek</label>
                      <input
                        id="ita"
                        type="checkbox"
                        name="language"
                        checked={checkedIta ? true : false}
                        onChange={(event) => {
                          !checkedIta
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedIta(!checkedIta);
                        }}
                        value="Italian"
                      />
                      <label htmlFor="ita">Italian</label>
                      <input
                        id="korean"
                        type="checkbox"
                        checked={checkedKor ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedKor
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedKor(!checkedKor);
                        }}
                        value="Korean"
                      />
                      <label htmlFor="korean">Korean</label>
                      <input
                        id="mandarin"
                        type="checkbox"
                        checked={checkedChn ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedChn
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedChn(!checkedChn);
                        }}
                        value="Mandarin Chinese"
                      />
                      <label htmlFor="mandarin">Mandarin Chinese</label>
                      <input
                        id="esp"
                        type="checkbox"
                        name="language"
                        checked={checkedEsp ? true : false}
                        onChange={(event) => {
                          !checkedEsp
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedEsp(!checkedEsp);
                        }}
                        value="Spanish"
                      />
                      <label htmlFor="esp">Spanish</label>
                      <input
                        id="viet"
                        type="checkbox"
                        checked={checkedViet ? true : false}
                        name="language"
                        onChange={(event) => {
                          !checkedViet
                            ? onLanguageChange(event)
                            : onRemoveLevel(event);
                        }}
                        onClick={() => {
                          setCheckedViet(!checkedViet);
                        }}
                        value="Vietnamese"
                      />
                      <label htmlFor="viet">Vietnamese</label>
                    </div>
                  </div>
                </div>
                <input
                  type="button"
                  className="btn-search"
                  value="Clear all"
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
          <main>
            <section>
              <div className="tilesGrid">
                {locums.map((locum) => {
                  return (
                    <div className="tiles" key={locum._id}>
                      <ExternalLink
                        target="_blank"
                        href={
                          process.env.REACT_APP_BACKEND_URL +
                          `api/locums/resumeCandidate/${locum.nanoId}/${locum.slugId}`
                        }
                      >
                        <div className="topBox" style={{ overflow: "hidden" }}>
                          <div>
                            {locum.filename && (
                              <figure className="smallPhoto">
                                <img
                                  src={`/locumPhoto/${locum.filename}`}
                                  alt=""
                                />
                              </figure>
                            )}

                            <span className="locumName">{locum.firstName}</span>
                            <h4>Locum ID: {locum.locumId}</h4>
                            <h3>
                              {locum.suburb}, {locum.state} {locum.postalCode}
                            </h3>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                                overflow: "hidden",
                                width: "230px",
                                height: "58px",
                                position: "relative",
                                backgroundColor: "white",
                              }}
                            >
                              <span
                                className={locum.university1 ? "green" : ""}
                              >
                                {locum.university1}
                              </span>
                              <span className={locum.university2 ? "red" : ""}>
                                {locum.university2}
                              </span>
                              <span className={locum.university3 ? "blue" : ""}>
                                {locum.university3}
                              </span>
                              <br />
                              <span className={locum.degree1 ? "green" : ""}>
                                {locum.degree1}
                              </span>
                              <span className={locum.degree2 ? "red" : ""}>
                                {locum.degree2}
                              </span>
                              <span className={locum.degree3 ? "blue" : ""}>
                                {locum.degree3}
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateRows: "50% 50%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "no-wrap",
                                overflow: "hidden",
                                width: "180px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  flexWrap: "wrap",
                                  overflow: "hidden",
                                  width: "100%",
                                  height: "70px",
                                  position: "relative",
                                  backgroundColor: "white",
                                }}
                              >
                                <span
                                  className={locum.skillOne1 ? "purpleSm" : ""}
                                >
                                  {locum.skillOne1 && locum.skillOne1}
                                </span>
                                <span
                                  className={locum.skillOne2 ? "purpleSm" : ""}
                                >
                                  {locum.skillOne2 && locum.skillOne2}
                                </span>
                                <span
                                  className={locum.skillOne3 ? "purpleSm" : ""}
                                >
                                  {locum.skillOne3 && locum.skillOne3}
                                </span>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                                overflow: "hidden",
                                width: "100%",
                                height: "70px",
                                position: "relative",
                                backgroundColor: "white",
                              }}
                            >
                              <span
                                className={locum.skillTwo1 ? "greenSm" : ""}
                              >
                                {locum.skillTwo1 && locum.skillTwo1}
                              </span>
                              <span
                                className={locum.skillTwo2 ? "greenSm" : ""}
                              >
                                {locum.skillTwo2 && locum.skillTwo2}
                              </span>
                              <span
                                className={locum.skillTwo3 ? "greenSm" : ""}
                              >
                                {locum.skillTwo3 && locum.skillTwo3}
                              </span>
                              <br />
                              <span
                                className={locum.skillThree1 ? "redSm" : ""}
                              >
                                {locum.skillThree1 && locum.skillThree1}
                              </span>
                              <span
                                className={locum.skillThree2 ? "redSm" : ""}
                              >
                                {locum.skillThree2 && locum.skillThree2}
                              </span>
                              <span
                                className={locum.skillThree3 ? "redSm" : ""}
                              >
                                {locum.skillThree3 && locum.skillThree3}
                              </span>
                              <br />
                              <span
                                className={locum.whichlanguage0 ? "blueSm" : ""}
                              >
                                {locum.whichlanguage0 && locum.whichlanguage0}
                              </span>
                              <span
                                className={locum.whichlanguage1 ? "blueSm" : ""}
                              >
                                {locum.whichlanguage1 && locum.whichlanguage1}
                              </span>
                              <span
                                className={locum.whichlanguage2 ? "blueSm" : ""}
                              >
                                {locum.whichlanguage2 && locum.whichlanguage2}
                              </span>
                            </div>
                          </div>
                        </div>
                      </ExternalLink>
                    </div>
                  );
                })}
                {locums.length === 0 && (
                  <div className="no-listings">
                    <h2>No locums at the moment.</h2>
                  </div>
                )}
              </div>
            </section>
          </main>

          <nav className="paginate">
            <ul>
              {maxPage >= 2 ? (
                page > 1 ? (
                  <li key={1} className="previous" onClick={pagePrevious}></li>
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

          /*================== LOCUM CARDS ================= */
          main {
            display: grid;
            grid-template-columns: 16rem auto 30rem;
            gap: 2rem;
            width: 96%;
            margin: 1rem auto 4rem;
          }
          main .tilesGrid {
            background-color: transparent;
            width: 1500px;
            display: grid;
            margin-top: 0px;
            grid-template-columns: 30% 30% 30%;
            grid-row-gap: 12px;
            grid-column-gap: 12px;
          }

          main .tiles {
            width: 430px;
            height: 171px;
            border-radius: 5px;
            cursor: pointer;
            border-top: 5px solid #14a248;
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.28);
          }

          main .red {
            color: #e40000;
            font-size: 14px;
            height: 26px;
            line-height: 24px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .green {
            color: green;
            font-size: 14px;
            height: 26px;
            line-height: 24px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-right: 8px;
            margin-bottom: 3px;
          }

          main .blue {
            color: #54c8e8;
            font-size: 14px;
            height: 26px;
            line-height: 24px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #54c8e8;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .greenSm {
            color: green;
            font-size: 14px;
            height: 20px;
            line-height: 18px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid green;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .purpleSm {
            color: purple;
            font-size: 14px;
            height: 20px;
            line-height: 18px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid purple;
            margin-right: 8px;
            margin-bottom: 3px;
          }

          main .blueSm {
            color: #54c8e8;
            font-size: 14px;
            height: 20px;
            line-height: 18px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #54c8e8;
            margin-right: 8px;
            margin-bottom: 3px;
          }
          main .redSm {
            color: #e40000;
            font-size: 14px;
            height: 20px;
            line-height: 18px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-right: 8px;
            margin-bottom: 3px;
          }

          main .topBox {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px 5px 20px;
            overflow: hidden;
            background-color: white;
            margin: 0;
            height: 100%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18);
          }

          main .topBox .smallPhoto {
            display: inline-block;
            margin: 0px;
          }

          main .topBox .locumName {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 3px;
            margin-left: 5px;
            position: relative;
            top: -10px;
          }

          main .topBox h2 {
            color: #2f383c;
            font-size: 1.6rem;
            word-break: break-word;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 3px;
          }
          main .topBox h4 {
            color: rgba(99, 106, 109);
            font-weight: 200;
            font-family: "Noto Sans TC", sans-serif;
            font-size: 14px;
            margin-bottom: 7px;
          }

          main .topBox h3 {
            color: #2f383c;
            font-size: 1rem;
            word-break: break-word;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 3px;
          }
          main .topBox p {
            font-size: 28px;
            font-weight: 600;
            color: #2f383c;
          }

          main .topBox a {
            color: white;
            height: 100%;
            width: 100%;
          }
          .fa-star {
            color: gold;
            font-size: 14px;
          }

          .ratings {
            font-size: 14px;
            margin-left: 5px;
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

          .modal-box-language {
            display: block;
            background: white;
            width: 100%;
            padding-bottom: 20px;
            margin: 30px auto;
            position: relative;
            font-size: 13px;
            border-bottom: 1px solid rgb(210, 213, 218);
          }

          .wrap .modal-box-language h2 {
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
          .modal-box-language input[type="checkbox"] {
            display: none;
            margin: 0;
            width: 0;
          }
          .fix-Container {
            width: 100%;
            height: 56px;
            position: relative;
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
          .language_flex {
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

          /* ============= CHECKBOXES ================*/
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

          /* ============ MEDIA QUERIES FOR TABLETS =========*/
          @media screen and (max-width: 1024px) {
            .topBox {
              position: relative;
              width: 100%;
            }
            main .tilesGrid {
              display: grid;
              grid-column-gap: 0.1em;
              background-size: cover;
              grid-template-columns: 50% 50%;
              position: relative;
              padding: 0px 0px 0px 15px;
              overflow: hidden;
              position: relative;
              width: 1000px;
            }
            main .tiles {
              position: relative;
              width: 455px;
            }
            .wrap {
              padding: 0 auto;
            }
          }

          /*  ====== MEDIA QUERIES FOR MOBILE PHONES */

          @media screen and (max-width: 768px) {
            .topBox {
              position: relative;
              width: 100%;
            }
            main .tilesGrid {
              display: grid;
              grid-column-gap: 0.1em;
              background-size: cover;
              grid-template-columns: 100%;
              position: relative;
              padding: 0px 0px 0px 15px;
              overflow: hidden;
              position: relative;
              width: 485px;
            }
            main .tiles {
              position: relative;
              width: 455px;
            }
            .wrap {
              padding: 0 auto;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default LocumDb;
