import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ExternalLink } from "react-external-link";
// Three dots
import { ThreeDots } from "react-loader-spinner";
import { RotatingLines } from "react-loader-spinner";
// useSelector is accessing value of states
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../redux/userInfo";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Plan({ latitude, longitude, state }) {
  const defaultProps = {
    center: {
      lat: -33.865143,
      lng: 130.2099,
    },
    zoom: 4,
    latLngBounds: {
      north: -9.36,
      south: -55.35,
      east: -175.81,
      west: 110.28,
    },
  };

  let array = [];
  let arr = [];
  var arrObj = {};
  for (var i = 0; i < latitude.length; i++) {
    var lat = parseFloat(latitude[i]);
    var lng = parseFloat(longitude[i]);
    arrObj = { lat: lat, lng: lng };
    arr.push([lat, lng]);
    array.push(arrObj);
  }

  let myZoom;
  let myLatitude;
  let myLongitude;
  let myDrag;

  if (state.length === 1 && state[0] === "VIC") {
    myZoom = 6;
    myLatitude = -36.7596;
    myLongitude = 144.2786;
    myDrag = false;
  }

  if (state.length === 1 && state[0] === "QLD") {
    myZoom = 5;
    myLatitude = -21.3786;
    myLongitude = 150.5089;
    myDrag = false;
  }

  if (state.length === 1 && state[0] === "NSW") {
    myZoom = 6;
    myLatitude = -33.8688;
    myLongitude = 147.8363;
    myDrag = false;
  }

  if (state.length === 1 && state[0] === "ACT") {
    myZoom = 11;
    myLatitude = -35.2802;
    myLongitude = 149.131;
    myDrag = false;
  }

  if (state.length === 1 && state[0] === "TAS") {
    myZoom = 7;
    myLatitude = -42.0409;
    myLongitude = 146.8087;
    myDrag = false;
  }
  if (state.length === 1 && state[0] === "SA") {
    myZoom = 6;
    myLatitude = -31.3135;
    myLongitude = 134.7544;
    myDrag = false;
  }

  if (state.length === 1 && state[0] === "NT") {
    myZoom = 5;
    myLatitude = -19.4914;
    myLongitude = 132.551;
    myDrag = false;
  }

  if (state.length === 1 && state[0] === "WA") {
    myZoom = 5;
    myLatitude = -27.6728;
    myLongitude = 121.6283;
    myDrag = false;
  }

  const option = {
    center: {
      lat: myLatitude,
      lng: myLongitude,
    },
    zoom: myZoom,
    draggable: myDrag,
  };

  return (
    <>
      {/* default map loads on no inputs */}
      <GoogleMap
        center={option.center.lat ? option.center : defaultProps.center}
        zoom={option.zoom ? option.zoom : defaultProps.zoom}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          marginBottom: "20px",
        }}
        options={{
          disableDefaultUI: true,
          gestureHandling: option.draggable ? "cooperative" : "none",
          streetViewControl: false,
          dragabble: option.draggable ? option.draggable : false,
          restriction: {
            strictBounds: false,
            latLngBounds: defaultProps.latLngBounds,
          },
        }}
      >
        {array.map((mark, index) => {
          return (
            <Marker
              key={index}
              position={mark}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: "/images/mcicon.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(0, 0),
                scaledSize: new window.google.maps.Size(18, 18),
                anchorPoint: window.google.maps.Point(0, 0),
              }}
            />
          );
        })}
      </GoogleMap>
    </>
  );
}

const SearchList = () => {
  const dispatch = useDispatch();
  let zoek = window.location.search;
  let params = new URLSearchParams(zoek);
  let id = params.get("id");
  let token = params.get("token");
  let access = params.get("access");
  access = access === "true";
  var { search } = useLocation();
  let index = params.get("index");
  let prof = params.get("professions");

  const user = useSelector((state) => state.userInfo.value);

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [listingInfo, setListingInfo] = useState([]);
  const [noOfCases, setNoOfCases] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState([]);
  const [isloaded, setIsloaded] = useState(false);

  // ========= FACEBOOK & GOOGLE LOGIN DATA ==========

  useEffect(() => {
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);
    }
    // ============ PROFILE DATA ===========
    if (id) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "api/users/allusers/" +
            localStorage.getItem("userId")
        )
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("userId", response.data._id);
            dispatch(
              login({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                filename: response.data.filename,
                isLoggedIn: true,
                isLocum: response.data.isLocum,
                isActive: response.data.isActive,
                nanoId: response.data.nanoId,
                isAdmin: response.data.isAdmin,
                completeAccess: access,
              })
            );
            window.history.pushState({}, document.title, "/searchlist");
          }
        });
    }
  }, [id]);

  // ============ LOGGEDIN APPLICANT APPLIED ===========
  const [applied, setApplied] = useState([]);
  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "api/applications/applied?nanoId=" +
            user.nanoId
        )
        .then((response) => {
          if (response.status === 200) {
            setApplied(response.data.applied);
          }
        });
    }
  }, []);

  // =============== PAGE BUTTONS ================
  const pagePrevious = async () => {
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `api/listings/search?page=${page <= 0 ? 0 : page - 1}` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&professions=" +
        professions +
        "&location=" +
        location
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
        `api/listings/search?page=${
          page < maxPage ? 1 + parseInt(page) : page
        }` +
        "&sortBy=" +
        sort +
        "&contract=" +
        contract +
        "&professions=" +
        professions +
        "&location=" +
        location
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
        `api/listings/search?page=${id + 1}` +
        "&contract=" +
        contract +
        "&professions=" +
        professions +
        "&location=" +
        location +
        "&sortBy=" +
        sort
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

  // =============== SORT ================
  const [ascDesc, setAscDesc] = useState(false);
  const [sort, setSort] = useState(-1);

  const sorting = async (ascDesc) => {
    if (ascDesc === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/search?sortBy=asc" +
          "&contract=" +
          contract +
          "&professions=" +
          professions +
          "&location=" +
          location +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
      setPage(data.page);
      setMaxPage(data.maxPage);
      setSort(data.sort);
      setListOfProfessions(data.professions);
    }

    if (ascDesc === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/search?sortBy=desc" +
          "&contract=" +
          contract +
          "&professions=" +
          professions +
          "&location=" +
          location +
          "&page=" +
          page
      );
      const data = await res.json();
      setNoOfCases(data.num);
      setListingInfo(data.adPosts);
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

  // ========== TAKE OUT DUPLICATE PROFESSIONS =========
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

  // ============= GET SEARCH FILTER ===============
  useEffect(() => {
    let isCancelled = false;
    setIsloaded(false);

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/listings/search?" +
          "contract=" +
          contract +
          "&professions=" +
          professions +
          "&location=" +
          location +
          "&sortBy=" +
          sort +
          "&page=" +
          page
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
      setLongitude(data.longArr);
      setLatitude(data.latArr);
      setIsloaded(true);
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
  }, [contract, professions, location]);

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
  };

  // ============== BACKDROP ============== //
  const [, setBackdrop] = useState(false);

  const clickOnBackdrop = () => {
    setBackdrop(false);
    setFilterCard(false);
  };

  // FOOTER LINK FROM CHILD REDIRECT TO SEARCHLIST
  const [footState] = useState(search.split("=")[1]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      if (footState === "AustralianCapitalTerritory") {
        setCheckedACT(true);
        setLocation(["ACT"]);
      }
      if (footState === "NewSouthWales") {
        setCheckedNSW(true);
        setLocation(["NSW"]);
      }
      if (footState === "Queensland") {
        setCheckedQLD(true);
        setLocation(["QLD"]);
      }
      if (footState === "Victoria") {
        setCheckedVIC(true);
        setLocation(["VIC"]);
      }
      if (footState === "Tasmania") {
        setCheckedTAS(true);
        setLocation(["TAS"]);
      }
      if (footState === "SouthAustralia") {
        setCheckedSA(true);
        setLocation(["SA"]);
      }
      if (footState === "WesternAustralia") {
        setCheckedWA(true);
        setLocation(["WA"]);
      }
      if (footState === "NorthernTerritory") {
        setCheckedNT(true);
        setLocation(["NT"]);
      }
      if (search.split("=")[0] === "?professions") {
        setProfessions([...professions, prof]);
        setChecks([...checks, index]);
      }
    };
    if (isCancelled === false) {
      // call the function
      setTimeout(function () {
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }, 200);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const asx = async (event, id) => {
    const value = event.target.innerHTML;

    if (professions !== value) {
      clearPartial();
      setProfessions(value);
      setChecks(id);
      setLocation(["SA", "NSW", "VIC", "TAS", "WA", "NT", "ACT", "QLD"]);
    }

    if (value === "Adelaide") {
      clearPartial();
      setCheckedSA(true);
      setLocation(["SA"]);
    }
    if (value === "Sydney") {
      clearPartial();
      setCheckedNSW(true);
      setLocation(["NSW"]);
    }
    if (value === "Melbourne") {
      clearPartial();
      setCheckedVIC(true);
      setLocation(["VIC"]);
    }
    if (value === "Brisbane") {
      clearPartial();
      setCheckedQLD(true);
      setLocation(["QLD"]);
    }
    if (value === "Perth") {
      clearPartial();
      setCheckedWA(true);
      setLocation(["WA"]);
    }
    if (value === "Canberra") {
      clearPartial();
      setCheckedACT(true);
      setLocation(["ACT"]);
    }
    if (value === "Gold Coast") {
      clearPartial();
      setCheckedQLD(true);
      setLocation(["QLD"]);
    }
    if (value === "Newcastle") {
      clearPartial();
      setCheckedNSW(true);
      setLocation(["NSW"]);
    }

    if (value === "New South Wales") {
      clearPartial();
      setCheckedNSW(true);
      setLocation(["NSW"]);
    }
    if (value === "Queensland") {
      clearPartial();
      setCheckedQLD(true);
      setLocation(["QLD"]);
    }
    if (value === "Australian Capitcal Territory") {
      clearPartial();
      setCheckedACT(true);
      setLocation(["ACT"]);
    }
    if (value === "Victoria") {
      clearPartial();
      setCheckedVIC(true);
      setLocation(["VIC"]);
    }
    if (value === "Tasmania") {
      clearPartial();
      setCheckedTAS(true);
      setLocation(["TAS"]);
    }
    if (value === "Northern Territory") {
      clearPartial();
      setCheckedNT(true);
      setLocation(["NT"]);
    }
    if (value === "South Australia") {
      clearPartial();
      setCheckedSA(true);
      setLocation(["SA"]);
    }
    if (value === "Western Australia") {
      clearPartial();
      setCheckedWA(true);
      setLocation(["WA"]);
    }
  };

  const clearPartial = async () => {
    setCheckedACT(false);
    setCheckedNSW(false);
    setCheckedNT(false);
    setCheckedQLD(false);
    setCheckedSA(false);
    setCheckedTAS(false);
    setCheckedWA(false);
    setCheckedVIC(false);
    setProfessions([]);
    setChecks([]);
  };

  // ================= LOAD GOOGLE MAP ==================
  const [libraries] = useState(["drawing", "places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // LANGUAGE AND PLACES
    language: "en-AU",
    region: "AU",
    libraries: libraries,
  });

  if (!isLoaded)
    return (
      <div
        style={{
          backgroundColor: "#14a248",
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
          <RotatingLines
            strokeColor="white"
            strokeWidth="4"
            animationDuration="1.25"
            width="100"
            visible={true}
          />
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Search Job Cases | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <Navbar />
        <section className="filter">
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
          <div className="wrap">
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
                        height={40}
                        width={80}
                        color={"grey"}
                      />
                    </div>
                  ) : (
                    <div className="wrapper-ads">
                      <div className="app-photo-1"></div>

                      {listingInfo.map((listing) => {
                        return (
                          <div className="ads" key={listing._id}>
                            <ExternalLink
                              href={
                                process.env.REACT_APP_BACKEND_URL +
                                `api/listings/adPosts/${listing.slug}`
                              }
                              target="_self"
                            >
                              <div className="rightmessage">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h2>
                                    <figure className="smallPhoto">
                                      {listing.filename ? (
                                        <img src={listing.filename} alt="" />
                                      ) : (
                                        <img src="./images/girl.png" alt="" />
                                      )}
                                    </figure>
                                    <span
                                      style={{ marginRight: "45px" }}
                                    ></span>
                                    {listing.professions + " "}
                                    {listing.contractType === "Full-Time" ? (
                                      <span className="highlight_fulltime">
                                        Full-Time
                                      </span>
                                    ) : listing.contractType === "Part-Time" ? (
                                      <span className="highlight_parttime">
                                        Part-Time
                                      </span>
                                    ) : listing.contractType === "Locum" ? (
                                      <span className="highlight_locum">
                                        Locum
                                      </span>
                                    ) : (
                                      <span className="highlight_other">
                                        Other
                                      </span>
                                    )}
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "300",
                                      }}
                                    >
                                      {" " + listing.caseId}
                                    </span>
                                  </h2>

                                  <div
                                    style={{
                                      height: "30px",
                                      width: "50px",
                                      display: "block",
                                      color: "#2b2b2b",
                                      fontWeight: "900",
                                    }}
                                  >
                                    {listing.state}
                                  </div>
                                </div>

                                <h3>
                                  Posted: {listing.todaysDate}
                                  {applied.map((appId) => {
                                    return appId.caseId === listing.caseId ? (
                                      <span
                                        className="appliedbefore"
                                        key={appId._id}
                                      >
                                        Applied
                                      </span>
                                    ) : (
                                      <span key={appId._id}></span>
                                    );
                                  })}
                                </h3>
                                <p>{listing.about}</p>
                              </div>
                            </ExternalLink>
                          </div>
                        );
                      })}
                      {!listingInfo && (
                        <div className="no-listings">
                          <h2>No cases at this moment</h2>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="fixMap">
                  <Wrapper>
                    <Plan
                      state={location}
                      latitude={latitude}
                      longitude={longitude}
                    />
                  </Wrapper>
                </div>
              </div>
            </section>
            <div className="buttonSegment">
              <div
                style={{
                  backgroundColor: "#f0eff5",
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
          </div>
          <Footer asx={asx} />
        </div>

        <style jsx="true">{`
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

            padding-top: 0px;
            background-color: #f0eff5;
          }

          .wrapper {
            display: grid;
            grid-column-gap: 0.1em;
            background-size: cover;
            grid-auto-rows: 796px;
            grid-template-columns: 100%;
            position: relative;
            padding: 0px 0px 0px 15px;
            overflow: hidden;
          }
          .buttonSegment {
            display: grid;
            grid-template-columns: 56% 44%;
            padding: 0px 0px 0px 15px;
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
          .appliedbefore {
            color: #e40000;
            font-size: 16px;
            height: 28px;
            line-height: 28px;
            padding-left: 3px;
            padding-right: 3px;
            border: 1px solid #e40000;
            margin-left: 10px;
          }

          .wrapper-ads .ads {
            height: 150px;
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

          .rightmessage figure {
            position: relative;
            display: block;
          }
          .rightmessage .smallPhoto {
            position: absolute;
            display: inline-block;
            margin: 0px 8px 0px 0px;
          }

          .smallPhoto {
          overflow: hidden;
          position: relative;
          border-radius: 50%;
          width: 39px;
          height: 39px;
          margin: 8px auto 0px;
          background: #eee;
          border: 2px solid white;
          cursor: pointer;
          margin: 8px auto 0px;
        }

        .rightmessage .smallPhoto img {
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


      

          .applicant-ads .ads {
            height: 110px;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #ebebeb;
            background-color: rgba(35, 35, 35, 0.2);
            margin: 15px 10px 10px 0px;
            position: relative;
            overflow: hidden;
          }

          .wrapper-ads .rightmessage {
            margin-left: 0px;
            cursor: pointer;
            position: relative;
            padding: 10px 15px;
            display: block;
            margin-right: 15px;
            width: 97%;
            height: 100%;
            background-color: white;
            border-bottom: 1px solid #777;
          }
          .wrapper-ads .ads:hover {
            -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
          .wrapper-ads .rightmessage h2 {
            font-size: 18px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 600;
            color: #2b2b2b;
          }
          .rightmessage h3 {
            font-size: 14px;
            font-family: "Noto Sans TC", sans-serif;
            color: #2b2b2b;
            font-weight: 800;
            margin: 15px 0px;
          }
          .rightmessage p {
            font-size: 14px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 100;
            color: #2b2b2b;
            margin: 5px 0px;
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
          @media screen and (max-width: 768px) {
            .wrap .listContent .adList {
              width: 100%;
            }
            }
            @media only screen and (min-width: 768px) {
              .wrapper {
                grid-template-columns: 56% 44%;
                padding: 0px 0px 0px 15px;
              }
              .wrapper-ads .rightmessage {
                margin-left: 0px;
                width: 100%;
              }
            }
          }

          .filter {
            height: 56px;
            display: block;
            background: #fff;
            border-bottom: 1px solid #ebebeb;
            position: fixed;
            margin-top: 0px;
            width: 100%;
            z-index: 2000;
            position: relative;
          }
          .fix-Container {
            width: 100%;
            height: 56px;
            position: relative;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
          }

          .wrap .modal-box-contract {
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
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

          .filterCard .btn-search:active,
          .filterCard .btn-search:focus {
            outline: none;
            border: none;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
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
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 500;
            display: block;
            line-height: 40px;
          }
          #arrow-down a {
            height: 100%;
            width: 100%;
            color: #484848;
            position: relative;
            font-family: "Noto Sans TC", sans-serif;
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
          @media only screen and (min-width: 768px) {
            .wrap .filterCard {
              width: 680px;
              padding: 30px 16px;
              z-index: 3500;
            }
            .results {
              display: block;
            }
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
          /*Checboxes*/
          input[type="checkbox"] + label {
            margin: 0 0 0 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            font-family: "Noto Sans TC", sans-serif;
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

          .fixMap {
            display: none;
            width: 100%;
            height: 100%;
          }
          #map {
            position: center;
            width: 100%;
            height: 100%;
            display: block;
          }

          @media screen and (min-width: 768px) {
            .fixMap {
              display: block;
            }
          }

          .paginate {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            border: none;
            z-index: 500;
            margin: 22px auto;
            background-color: #f0eff5;
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
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default SearchList;
