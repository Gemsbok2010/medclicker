import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { ExternalLink } from "react-external-link";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import LoggedInNavbar from "../components/LoggedInNavbar";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

function Plan({ address, latitude, longitude, geoLocate }) {
  const defaultProps = {
    center: {
      lat: -33.865143,
      lng: 151.2099,
    },
    zoom: 12,
    latLngBounds: {
      north: -9.36,
      south: -55.35,
      east: -175.81,
      west: 110.28,
    },
  };

  const option = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 17,
  };

  return (
    <>
      {latitude && longitude ? (
        <GoogleMap
          zoom={17}
          center={address ? option.center : { lat: latitude, lng: longitude }}
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            marginBottom: "20px",
          }}
          options={{
            disableDefaultUI: true,
            gestureHandling: "none",
            restriction: {
              strictBounds: false,
              latLngBounds: defaultProps.latLngBounds,
            },
          }}
        >
          <button className="useCurrentButton" onClick={geoLocate}>
            Use Current Location
          </button>

          {latitude ? (
            <Marker
              position={
                address ? option.center : { lat: latitude, lng: longitude }
              }
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: "/images/mcicon.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(35, -35),
                scaledSize: new window.google.maps.Size(28, 28),
                anchorPoint: window.google.maps.Point(50, -29),
              }}
            />
          ) : null}
        </GoogleMap>
      ) : (
        <GoogleMap
          center={latitude ? option.center : defaultProps.center}
          zoom={defaultProps.zoom}
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            marginBottom: "20px",
          }}
          options={{
            disableDefaultUI: true,
            gestureHandling: "none",
            restriction: {
              strictBounds: false,
              latLngBounds: defaultProps.latLngBounds,
            },
          }}
        >
          <button className="useCurrentButton" onClick={geoLocate}>
            Use Current Location
          </button>

          {latitude ? (
            <Marker
              position={option.center}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: "/images/mcicon.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(35, -35),
                scaledSize: new window.google.maps.Size(28, 28),
                anchorPoint: window.google.maps.Point(50, -29),
              }}
            />
          ) : null}
        </GoogleMap>
      )}
    </>
  );
}

const Step1 = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("sessionStorage");
  const user = useSelector((state) => state.userInfo.value);
  const [listOfProfessions, setListOfProfessions] = useState([]);
  const [phone, setPhone] = useState("");
  const [ahpra, setAhpra] = useState("");
  const [driverslicense, setDriverslicense] = useState("");
  const [profession, setProfession] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [readyToShow, setReadyToShow] = useState(false);

  // ============ PROFESSION (Disable and enable submit) =========

  const [showProfession, setShowProfession] = useState(false);
  const handleShowProfession = () => {
    setShowProfession(false);
  };
  const handleSetProfession = (e) => {
    const innerHTML = e.target.innerHTML;
    setProfession(innerHTML);
  };

  // ====== DRIVERS LICENSE (Disable and enable submit) ======

  const [seeDrivers, setSeeDrivers] = useState(false);
  const handleShowDrivers = () => {
    setSeeDrivers(false);
  };

  const handleSetDrivers = (e) => {
    const innerHTML = e.target.innerHTML;
    setDriverslicense(innerHTML);
  };

  // ============= STATE LIST =============
  const [states] = useState([
    { title: "ACT", id: 1 },
    { title: "New South Wales", id: 2 },
    { title: "Northern Territory", id: 3 },
    { title: "Queensland", id: 4 },
    { title: "South Australia", id: 5 },
    { title: "Tasmania", id: 6 },
    { title: "Victoria", id: 7 },
    { title: "Western Australia", id: 8 },
    { title: "New Zealand", id: 9 },
    { title: "I don't drive", id: 10 },
  ]);

  // ======= MOBILE (Disable and enable submit) =======
  const handlePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  };

  // ============= POPULATE SESSION DATA =================
  useEffect(() => {
    if (!ReactSession.get("locum_phone")) {
      setPhone("");
    } else {
      setPhone(ReactSession.get("locum_phone"));
    }
    if (!ReactSession.get("locum_drivers")) {
      setDriverslicense("");
    } else {
      setDriverslicense(ReactSession.get("locum_drivers"));
    }
    if (!ReactSession.get("locum_profession")) {
      setProfession("");
    } else {
      setProfession(ReactSession.get("locum_profession"));
    }
    if (!ReactSession.get("locum_ahpra")) {
      setAhpra("");
    } else {
      setAhpra(ReactSession.get("locum_ahpra"));
    }

    setFirstName(ReactSession.get("locum_firstName"));
    setLastName(ReactSession.get("locum_lastName"));
    setCountry(ReactSession.get("locum_country"));
    setState(ReactSession.get("locum_state"));
    setSuburb(ReactSession.get("locum_suburb"));
    setStreet(ReactSession.get("locum_street"));
    setStreetNo(ReactSession.get("locum_streetNo"));
    setPostalCode(ReactSession.get("locum_postalCode"));
    if (!ReactSession.get("locum_latitude")) {
      setLatitude("");
    } else {
      setLatitude(ReactSession.get("locum_latitude"));
    }
    if (!ReactSession.get("locum_longitude")) {
      setLongitude("");
    } else {
      setLongitude(ReactSession.get("locum_longitude"));
    }

    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/users/allusers/" +
          localStorage.getItem("userId")
      )
      .then((response) => {
        if (response.status === 200) {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setUserInfo(response.data);
          setReadyToShow(true);
        }
      });
  }, []);

  // ============= POPULATE SESSION DATA =================

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "api/locums/listOfProfessions"
      );
      const data = await res.json();

      if (isCancelled === false) {
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
  }, []);

  // ======= TAKE OUT DUPLICATE PROFESSIONS ======

  const noDuplicates = [
    ...new Map(
      listOfProfessions.map((list) => [list.professionName, list])
    ).values(),
  ];

  // ========== ALERT MESSAGE ===============
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInStep1(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 60,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  // ======= ONSUBMIT TO NEXT STEP 2 =======
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_BACKEND_URL + "api/locums/step1", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        firstName: user.firstName,
        lastName: user.lastName,
        driverslicense: driverslicense,
        profession: profession,
        ahpra: ahpra,
        country: country,
        state: state,
        suburb: suburb,
        street: street,
        streetNo: streetNo,
        latitude: latitude,
        longitude: longitude,
        postalCode: postalCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInStep1(data.invalid);
        } else {
          ReactSession.set("locum_firstName", userInfo.firstName);
          ReactSession.set("locum_lastName", userInfo.lastName);
          ReactSession.set("locum_phone", phone);
          ReactSession.set("locum_drivers", driverslicense);
          ReactSession.set("locum_profession", profession);
          ReactSession.set("locum_ahpra", ahpra);
          ReactSession.set("locum_country", country);
          ReactSession.set("locum_state", state);
          ReactSession.set("locum_suburb", suburb);
          ReactSession.set("locum_street", street);
          ReactSession.set("locum_streetNo", streetNo);
          ReactSession.set("locum_postalCode", postalCode);
          ReactSession.set("locum_latitude", latitude);
          ReactSession.set("locum_longitude", longitude);
          navigate("/step2");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ============ HIGHLIGHT ADDRESS SEARCH FIELD ==========
  var has_focus = false;
  $("#search").click(function (e) {
    if (!has_focus) {
      $(this).select();
      has_focus = true;
    }
  });

  $("#search").blur(function (e) {
    has_focus = false;
  });

  // ================= GEOLOCATION ==================
  const geoLocate = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      const geocoder = new window.google.maps.Geocoder();

      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK") {
            setStreetNo("");
            setStreet("");
            setSuburb("");
            setPostalCode("");
            setState("");
            setCountry("");
            setLatitude("");
            setLongitude("");

            for (var i = 0; i < results[0].address_components.length; i++) {
              if (
                results[0].address_components[i].types[0] === "street_number"
              ) {
                setStreetNo(results[0].address_components[i].long_name);
              }

              if (results[1].address_components[i].types[0] === "route") {
                setStreet(results[1].address_components[i].long_name);
              }

              if (results[0].address_components[i].types[0] === "locality") {
                setSuburb(results[0].address_components[i].long_name);
              }

              if (
                results[0].address_components[i].types[0] ===
                "administrative_area_level_1"
              ) {
                setState(results[0].address_components[i].short_name);
              }

              if (results[0].address_components[i].types[0] === "postal_code") {
                setPostalCode(results[0].address_components[i].long_name);
              }

              if (results[0].address_components[i].types[0] === "country") {
                setCountry(results[0].address_components[i].long_name);
              }
              setLatitude(pos.lat);
              setLongitude(pos.lng);
            }
          }
        });
      });
    }
  };

  // ============== AUTOCOMPLETE ===============

  const [address, setAddress] = useState("");

  const getAddressObject = async (places) => {
    setStreetNo("");
    setStreet("");
    setSuburb("");
    setPostalCode("");
    setState("");
    setCountry("");
    setLatitude("");
    setLongitude("");

    for (var i = 0; i < places.address_components.length; i++) {
      if (places.address_components[i].types[0] === "street_number") {
        setStreetNo(places.address_components[i].long_name);
      }
      if (places.address_components[i].types[0] === "route") {
        setStreet(places.address_components[i].long_name);
      }
      if (places.address_components[i].types[0] === "locality") {
        setSuburb(places.address_components[i].long_name);
      }
      if (places.address_components[i].types[0] === "postal_code") {
        setPostalCode(places.address_components[i].long_name);
      }
      if (
        places.address_components[i].types[0] === "administrative_area_level_1"
      ) {
        setState(places.address_components[i].short_name);
      }
      if (places.address_components[i].types[0] === "country") {
        setCountry(places.address_components[i].long_name);
      }
    }
    if (places.geometry.viewport) {
      setLongitude(places.geometry.location.lng());
      setLatitude(places.geometry.location.lat());
    }
  };

  const handleSelect = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("search")
    );
    autocomplete.setComponentRestrictions({
      country: ["au"],
    });

    autocomplete.addListener("place_changed", async () => {
      const places = autocomplete.getPlace();
      getAddressObject(places);
    });
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

  if (!isLoaded || readyToShow === false)
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
          <title>Locum Registration Step 1 | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />

        <div className="wrap">
          <div className="Q1title">
            <ul className="stepNav threeWide">
              <li>
                <Link className="active" style={{ fontWeight: "bold" }} to="#">
                  <span className="badge-highlight">1</span>
                  <span className="active">My Details</span>
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor:
                      street && ahpra && driverslicense && profession && phone
                        ? "pointer"
                        : "default",
                  }}
                  to={
                    street && ahpra && driverslicense && profession && phone
                      ? "/step2"
                      : "#"
                  }
                >
                  <span className="badge">2</span>
                  <span>My Experiences</span>
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: ReactSession.get("resume") ? "pointer" : "default",
                  }}
                  to={ReactSession.get("resume") ? "/step3" : "#"}
                >
                  <span className="badge">3</span>
                  <span>Review CV</span>
                </Link>
              </li>
              <li>
                <Link
                  style={{
                    fontWeight: "bold",
                    cursor: "default",
                  }}
                  to={"#"}
                >
                  <span className="badge">4</span>
                  <span>Complete</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="errorMessageHere">
            {alert ? (
              <div className="alert">
                <img
                  src="/images/cross-black.png"
                  style={{ width: "12px", cursor: "pointer" }}
                  alt=""
                  onClick={() => {
                    setAlert(false);
                  }}
                />{" "}
                <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
              </div>
            ) : (
              ""
            )}
          </div>
          <form id="formOne" onSubmit={onSubmit}>
            <div className="personContent">
              <section className="middlequestionCard">
                <h2>My Details</h2>

                <div className="container-fluid regCon">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-3 col-form-label"
                        >
                          First Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            autoComplete="nope"
                            disabled
                            className="form-control-lg"
                            id="firstName"
                            defaultValue={firstName}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lastName"
                          className="col-sm-3 col-form-label"
                        >
                          LastName
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            autoComplete="nope"
                            disabled
                            className="form-control-lg"
                            id="lastName"
                            defaultValue={lastName}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="email"
                          className="col-sm-3 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            className="form-control-lg"
                            id="email"
                            defaultValue={userInfo.email}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label
                          htmlFor="phone"
                          className="col-sm-3 col-form-label"
                        >
                          Mobile
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            autoComplete="nope"
                            required
                            className="form-control-lg"
                            id="phone"
                            maxLength="10"
                            placeholder="Example: 0400666888"
                            value={phone}
                            onChange={handlePhone}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="profession"
                          className="col-sm-3 col-form-label"
                        >
                          Profession
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            autoComplete="nope"
                            className="form-control-lg"
                            id="profession"
                            value={profession ? profession : ""}
                            onFocus={() => {
                              setShowProfession(true);
                              setSeeDrivers(false);
                            }}
                            onChange={() => {
                              setShowProfession(true);
                              setSeeDrivers(false);
                            }}
                          />
                          <div className="professionList">
                            <ul>
                              {showProfession &&
                                noDuplicates.map((profession) => {
                                  return (
                                    <li
                                      key={profession._id}
                                      onClick={(e) => {
                                        handleSetProfession(e);
                                        handleShowProfession();
                                      }}
                                      name={profession.professionName}
                                    >
                                      {profession.professionName}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="driverslicense"
                          className="col-sm-3 col-form-label"
                        >
                          Driver's License
                        </label>
                        <div className="col-sm-9">
                          <input
                            required
                            autoComplete="nope"
                            type="text"
                            readOnly
                            className="form-control-lg"
                            id="driverslicense"
                            placeholder="Select Jurisdiction"
                            value={driverslicense ? driverslicense : ""}
                            onFocus={() => {
                              setSeeDrivers(!seeDrivers);
                            }}
                            onChange={() => {
                              setSeeDrivers(!seeDrivers);
                            }}
                          />
                          {seeDrivers ? (
                            <div className="drivers">
                              <ul>
                                {states.map((state) => {
                                  return (
                                    <li
                                      key={state.id}
                                      onClick={(e) => {
                                        handleSetDrivers(e);
                                        handleShowDrivers();
                                      }}
                                    >
                                      {state.title}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="link-btn">
                        Please visit
                        <ExternalLink
                          href="https://www.ahpra.gov.au/"
                          target="_blank"
                        >
                          {" "}
                          AHPRA{" "}
                        </ExternalLink>
                        and paste your AHPRA in the space below.
                      </label>

                      <input
                        type="text"
                        id="ahpraLink"
                        style={{ outline: "none", width: "100%" }}
                        value={ahpra ? ahpra : ""}
                        autoComplete="off"
                        maxLength={13}
                        onChange={(e) => {
                          setAhpra(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="personContent">
              <section className="bottomQuestionCard">
                <h2>My Location</h2>
                <div className="container-fluid">
                  <div className="address">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="search">
                          Search for your street address, nearly popular
                          landmark, or general area below.
                        </label>

                        <Autocomplete
                          className={"googleAutoComplete"}
                          restrictions={{ country: "au" }}
                          fields={[
                            "address_components",
                            "geometry",
                            "icon",
                            "name",
                          ]}
                        >
                          {latitude ? (
                            <>
                              <input
                                required
                                autoComplete="off"
                                type="text"
                                id="search"
                                placeholder="Type your address here..."
                                onSelect={handleSelect}
                                value={`${streetNo} ${street}, ${suburb} ${state} ${postalCode}`}
                                onInput={() => {
                                  setLatitude("");
                                  setAddress("");
                                }}
                                onChange={() => {
                                  setLatitude("");
                                  setAddress("");
                                }}
                              />
                              <input
                                type="text"
                                disabled
                                style={{
                                  marginTop: "12px",
                                  border: "none",
                                  paddingTop: "1px",
                                  paddingBottom: "1px",
                                  height: "24px",
                                  fontWeight: "700",
                                }}
                                value={`${streetNo} ${street}`}
                              />

                              <input
                                type="text"
                                disabled
                                style={{
                                  marginTop: "2px",
                                  border: "none",
                                  paddingTop: "1px",
                                  paddingBottom: "1px",
                                  height: "24px",
                                  fontWeight: "700",
                                }}
                                value={`${suburb} ${state} ${postalCode}`}
                              />

                              <input
                                type="text"
                                disabled
                                style={{
                                  marginTop: "2px",
                                  border: "none",
                                  paddingTop: "1px",
                                  paddingBottom: "1px",
                                  height: "24px",
                                  fontWeight: "700",
                                }}
                                value={country}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                required
                                autoComplete="off"
                                type="text"
                                placeholder="Type your address here..."
                                onSelect={handleSelect}
                                id="search"
                                value={address ? address : ""}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                              />
                              <div className="bottomTips">
                                <p>
                                  <b>Having difficulty finding your address?</b>
                                </p>
                                <span>
                                  Search for your street or click "Use Current
                                  Location" in the top centre of the map.
                                </span>
                              </div>
                            </>
                          )}
                        </Autocomplete>
                      </div>
                      <div className="col-md-6">
                        <Plan
                          address={address}
                          latitude={latitude}
                          longitude={longitude}
                          geoLocate={geoLocate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="personContent">
              <section className="buttonCard">
                {street && driverslicense && phone && profession && ahpra ? (
                  <input type="submit" className="btn-vori" value="Next" />
                ) : (
                  <input
                    type="button"
                    disabled
                    className="btn-vori"
                    value="Next"
                  />
                )}
              </section>
            </div>
          </form>
          <Footer />
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
            padding: 0;
            background-color: #f4f5f6;
          }
          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
          }

          @media screen and (max-width: 768px) {
            .wrap {
              padding: 0;
            }
          }
          /* ============= 基本資料 居住位置 ============== */
          input[type="text"],
          input[type="email"] {
            height: 42px;
            border-radius: 7px;
            text-decoration: none;
            outline: none !important;
            background: none;
            border: 1px solid #dadada;
            padding: 12px 15px;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #2b2b2b;
            font-family: sans-serif;
          }
          #email:disabled,
          #firstName:disabled,
          #lastName:disabled,
          #profession:disabled {
            background-color: #ebebeb;
          }
          .professionList {
            position: absolute;
            z-index: 2000;
            width: 96%;
            display: block;
          }
          .professionList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 98%;
          }
          .professionList ul li {
            background-color: #f4f5f6;
            text-decoration: none;
            cursor: pointer;
            list-style-type: none;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #dadada;
            border-left: 2px solid #dadada;
            border-right: 2px solid #dadada;
            padding-left: 18px;
            position: relative;
            width: 100%;
          }

          .professionList ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 17px;
          }

          .drivers {
            position: absolute;
            z-index: 2000;
            width: 96%;
            display: block;
            height: 250px;
            overflow: scroll;
            z-index: 5000;
          }
          .drivers ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 98%;
          }

          .drivers ul li {
            background-color: #f4f5f6;
            text-decoration: none;
            cursor: pointer;
            list-style-type: none;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #dadada;
            border-left: 2px solid #dadada;
            border-right: 2px solid #dadada;
            padding-left: 18px;
            position: relative;
            width: 100%;
            display: block;
          }

          .drivers ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 17px;
          }

          .link-btn {
            color: #777;
            width: 100%;
            height: 30px;
            text-align: left;
            line-height: 40px;
          }
          .link-btn a {
            color: #008489;
            font-weight: 700;
          }

          .wrap .personContent {
            width: 90%;
            margin: 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            position: relative;
          }

          hr {
            display: block;
            margin-top: 0em;
            margin-bottom: 2em;
            margin-left: auto;
            margin-right: auto;
            border-width: 1px;
          }

          .wrap .bottomQuestionCard,
          .wrap .middlequestionCard {
            width: 80%;
            min-height: 325px;
            padding: 30px 20px;
            margin: 90px auto 0px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 7px;
            background: #fff;
          }
          .wrap .bottomQuestionCard h2,
          .wrap .middlequestionCard h2 {
            position: absolute;
            font-size: 24px;
            font-weight: 800;
            transform: translate(10%, -260%);
            color: #2b2b2b;
          }
          .bottomQuestionCard #address {
            width: 100%;
          }

          .wrap .buttonCard {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background-color: #f4f5f6;
            width: 80%;
            margin: 30px auto 30px;
            text-align: center;
          }

          .wrap .middlequestionCard {
            min-height: 260px;
          }

          .middlequestionCard .row {
            position: relative;
            top: 8%;
            width: 100%;
            left: 3%;
          }

          .btn-vori {
            position: relative;
            background-color: #14a248;
            color: white;
            border: 1px solid #14a248;
            cursor: pointer;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
          }

          .btn-vori:disabled {
            background-color: #ddd;
            color: #888;
            cursor: default;
            border: #ddd;
          }

          .useCurrentButton {
            background-color: #14a248;
            color: white;
            font-weight: 800;
            width: 220px;
            height: 36px;
            outline: none;
            border: none;
            font-size: 12px;
            cursor: pointer;
            z-index: 1;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .useCurrentButton:active,
          .useCurrentButton:focus {
            outline: none;
            border: none;
          }
          .container-fluid.regCon {
            margin: 0;
          }

          section .regCon {
            width: 100% !important;
            padding: 0;
          }
          .regCon .form-group {
            margin-bottom: 25px;
          }

          .regCon .col-form-label {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-top: calc(0.375rem + 1px);
            padding-bottom: calc(0.375rem + 1px);
            padding-right: 0;
            padding-left: 15px;
            font-family: sans-serif;
          }
          .regCon .address > p {
            color: #777;
            font-size: 22px;
          }
          .regCon .address .bottomTips span {
            color: #2b2b2b;
            font-size: 14px;
            font-weight: 500;
          }
          .regCon .address .bottomTips p {
            color: #2b2b2b;
            margin: 10px auto;
            font-size: 16px;
            font-weight: 800;
          }

          @media screen and (max-width: 768px) {
            .wrap .bottomQuestionCard,
            .wrap .middlequestionCard {
              margin: 90px 0px 0px;
              width: 100%;
            }
            .wrap .personContent {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
              position: relative;
            }

            .wrap .buttonCard {
              width: 410px;
              margin: 25px auto;
            }
            input[type="submit"] {
              width: 100%;
            }

            .wrap .link-btn {
              margin-top: 16px;
            }
            .row .col-md-6:first-child {
              margin-bottom: 15px;
            }
          }

          /* ============== PROCESS BAR ON TOP ============== */
          .wrap .Q1title {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height: auto;
            font-size: 16px;
            color: #484848;
            padding: 0px;
            text-align: center;
            margin: 0px auto;
          }

          .wrap .Q1title > ul {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
          }
          .wrap .Q1title > ul > li {
            list-style: none;
          }

          .stepNav {
            margin: 30px 20px;
            height: auto;
            padding-right: 20px;
            position: relative;
            z-index: 0;
          }

          .badge {
            display: block;
            font-size: 12px;
            width: 20px;
            height: 20px;
            line-height: 12px;
            background: #777;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
          }
          .badge-highlight {
            display: block;
            font-size: 12px;
            width: 22px;
            border: 1px solid white;
            height: 22px;
            line-height: 20px;
            background: #14a248;
            color: #fff;
            border-radius: 50%;
            margin-right: 5px;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            font-weight: 700;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav li {
            float: left;
            position: relative;
            z-index: 3;
          }

          .stepNav li:first-child {
            border-radius: 0px 0 0 0px;
          }

          .stepNav li:nth-child(2) {
            z-index: 2;
          }

          .stepNav li:nth-child(3) {
            z-index: 1;
          }

          .stepNav li:nth-child(4) {
            z-index: 0;
          }
          .stepNav.threeWide li {
            width: 33%;
          }
          .stepNav a,
          .stepNav a:visited {
            display: block;
            width: 100%;
            height: 43px;
            padding: 0 0 0 25px;
            color: #999;
            text-align: center;
            text-shadow: 0 1px 0 #fff;
            line-height: 43px;
            white-space: nowrap;
            border: none;
            text-decoration: none;
            border-right: 0;
            background-color: #ededed;
            position: relative;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          .stepNav a {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }

          .stepNav a:before {
            content: "";
            width: 30px;
            height: 30px;
            background: #ededed;
            display: block;
            position: absolute;
            top: 6px;
            right: -16px;
            z-index: -1;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }

          .stepNav a.active {
            text-shadow: none;
            color: #fff;
            background: #14a248;
          }
          .stepNav a.active::before {
            border-right: 1px solid #14a248;
            border-bottom: 1px solid #14a248;
            background: #14a248;
          }

          @media screen and (max-width: 768px) {
            .wrap .Q1title {
              width: 100%;
              padding: 0px 0px 0px 0px;
            }
            .wrap .Q1title > ul {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
              padding-left: 10px;
            }
            .wrap .Q1title > ul > li {
              width: 100%;
              margin-bottom: 10px;
              list-style: none;
            }
            .wrap .Q1title > ul > li a {
              text-align: left !important;
            }
            .stepNav a {
              -webkit-box-pack: left;
              -ms-flex-pack: left;
              justify-content: left;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Step1;
