import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

function Map({ address, latitude, longitude }) {
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
            height: "275px",
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
            height: "275px",
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

const ListingEditReg = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2];
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);

  const [professions, setProfessions] = useState("");

  const [list, setList] = useState({});
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [updateNote, setUpdateNote] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const onConfirmDelete = () => {
    setBackdrop(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onDelete = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/admin/delete/" + list.slug, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ isDeletedJob: true, isActiveJob: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/admin/listings");
        }
      });
  };

  const onSave = () => {
    setTimeout(function () {
      setAlert(false);
      setUpdateNote(false);
    }, 3000);
  };

  // ============= PUT ==============
  const onSubmit = (e) => {
    e.preventDefault();

    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const nanoId = user.nanoId;
    fetch("http://localhost:4000/api/listings/edit", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        nanoId,
        country,
        state,
        suburb,
        street,
        streetNo,
        latitude,
        longitude,
        postalCode,
        about,
        startDate: list.startDate,
        finishDate: list.finishDate,
        caseId: list.caseId,
        contractType: list.contractType,
        slug: list.slug,
        professions,
        todaysDate: list.todaysDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessages(data.invalid);
        } else {
          setUpdateNote(true);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setTimeout(function () {
            setUpdateNote(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    // ============ LISTINGS DATA ===========
    axios
      .get("http://localhost:4000/api/listings/listingEditReg/" + slug)
      .then((response) => {
        if (response.status === 200) {
          setList(response.data.listing);
          setUserInfo(response.data.listing);
          setProfessions(response.data.listing.professions);
          setAbout(response.data.listing.about);
          setCountry(response.data.listing.country);
          setPostalCode(response.data.listing.postalCode);
          setState(response.data.listing.state);
          setSuburb(response.data.listing.suburb);
          setStreet(response.data.listing.street);
          setStreetNo(response.data.listing.streetNo);
          setLatitude(response.data.listing.latitude);
          setLongitude(response.data.listing.longitude);
          setIsDeleted(response.data.listing.isDeletedJob);
        }
      });
  }, []);

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessages(error) {
    setAlert(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const errorMessage = error;
    setAlertMsg(errorMessage);
  }

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

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Edit | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        {backdrop ? (
          <div
            onClick={() => setBackdrop(false)}
            className="backdrop-delete"
          ></div>
        ) : (
          ""
        )}

        <div className="wrap">
          <div className="edit-description">
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
            {alert ? (
              <div className="alert">
                <img
                  src="/images/cross-black.png"
                  style={{ width: "12px" }}
                  alt=""
                />{" "}
                <span dangerouslySetInnerHTML={{ __html: alertMsg }}></span>
              </div>
            ) : (
              ""
            )}

            {/* <div className="errorMessageHere"> */}

            {/* </div> */}

            <div className="container-intro">
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
                  <span className="highlight_locum">{list.contractType}</span>
                ) : (
                  <span className="highlight_other">{list.contractType}</span>
                )}
              </h2>

              <h3
                style={{
                  margin: "15px 10px",
                  fontSize: "15px",
                  fontWeight: "200",
                  color: "#333",
                }}
              >
                Case ID: {list.caseId}
              </h3>
              <h3
                style={{
                  margin: "15px 10px",
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#333",
                }}
              >
                Posted: {list.todaysDate}
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="flexwrap">
                <div className="groupFive">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>About the Role & Work Place</h2>
                    </div>
                  </div>
                  <div className="container-level">
                    <textarea
                      id="about"
                      maxLength={2000}
                      placeholder="Maximum 2000 words"
                      value={about}
                      required
                      onChange={(e) => {
                        setAbout(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="groupSeven">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>Your Location</h2>
                    </div>
                    <Autocomplete
                      className={"form-control-lg"}
                      restrictions={{ country: "au" }}
                      fields={[
                        "address_components",
                        "geometry",
                        "icon",
                        "name",
                      ]}
                    >
                      {latitude ? (
                        <input
                          required
                          autoComplete="off"
                          type="text"
                          id="search"
                          style={{ width: "100%" }}
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
                      ) : (
                        <input
                          required
                          autoComplete="off"
                          type="text"
                          placeholder="Type your address here..."
                          onSelect={handleSelect}
                          id="search"
                          style={{ width: "100%" }}
                          value={address ? address : ""}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      )}
                    </Autocomplete>
                  </div>
                  <div className="container-map">
                    <Map
                      address={address}
                      latitude={latitude}
                      longitude={longitude}
                    />
                  </div>
                  <div className="container-map"></div>
                </div>
              </div>
              <div className="bottomButtons">
                {isDeleted === false ? (
                  <input
                    type="button"
                    id="delete-btn"
                    className="delete-btn"
                    value="Delete"
                    onClick={onConfirmDelete}
                  />
                ) : (
                  <input
                    type="button"
                    id="delete-btn"
                    className="delete-btn"
                    value="Deleted"
                    disabled
                  />
                )}

                {about && street ? (
                  <input
                    type="submit"
                    className="save-btn"
                    value="Save"
                    onClick={onSave}
                  />
                ) : (
                  <input
                    type="button"
                    disabled
                    className="save-btn"
                    value="Save"
                  />
                )}
              </div>
              {backdrop ? (
                <div className="modal-box-delete">
                  <div className="container">
                    <div className="bin"></div>
                    <h2>Delete this listing?</h2>
                  </div>
                  <div className="nostop" onClick={() => setBackdrop(false)}>
                    Stop!
                  </div>
                  <div onClick={onDelete} className="delete">
                    Delete
                  </div>
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </HelmetProvider>
      <style jsx="true">{`
        .wrap {
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding-top: 60px;
          background-color: #f0eff5;
        }
        html,
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: #f0eff5;
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

        .wrap .updateNote {
          width: 80%;
          background-color: #bff4f2;
          margin-bottom: 8px;
          height: 40px;
          line-height: 40px;
          padding: 0px 15px 0px 28px;
          display: none;
        }
        .wrap .updateNote span {
          margin-left: 5px;
        }
        .wrap .alert {
          background-color: #fcebcd;
          margin: 5px auto 12px;
          padding: 7px;
          width: 80%;
        }

        .flexwrap {
          padding: 0;
          margin: 0;
          width: 100%;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .edit-description {
          width: 410px;
          position: relative;
          display: flex;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: -moz-box;
          flex-wrap: wrap;
          justify-content: center;
          padding: 20px;
          margin: 0px auto 60px;
          border: 1px solid #ebebeb;
          background-color: #fff;
          padding-bottom: 20px;
          -webkit-box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
          box-shadow: 4px 4px 20px rgba(51, 51, 51, 0.3);
        }
        .wrap .updateNote {
          width: 80%;
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

        .bottomButtons input[type="submit"] {
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
        }
        .bottomButtons input[type="button"] {
          position: relative;
          background-color: #e40000;
          color: white;
          border: 1px solid #e40000;
          cursor: pointer;
          font-weight: 800;
          width: 150px;
          height: 50px;
          line-height: 50px;
          outline: none;
          font-size: 20px;
          border-radius: 4px;
          margin: 0px;
        }
        .bottomButtons {
          margin-top: 40px;
          display: flex;
          width: 100%;
          justify-content: space-around;
        }
        .wrap .save-btn:disabled,
        .wrap .delete-btn:disabled {
          background-color: #ddd;
          color: #888;
          cursor: default;
          border: #ddd;
          border-radius: 4px;
          font-weight: 800;
          text-align: center;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
        }
        .container-intro {
          width: 100%;
          border-bottom: 1px solid #ebebeb;
        }

        .container-intro h2 {
          font-size: 22px;
          color: #333;
          font-weight: 800;
        }
        .container-intro p {
          color: rgb(51, 51, 51);
          line-height: 20px;
          font-size: 15px;
          font-weight: 100;
          font-family: sans-serif;
          width: 100%;
        }

        /* ============= CONTRACT TYPE ============= */
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

        /* ========= AIRPORT DROPDOWN =============*/

        #container {
          display: inline-block;
          position: relative;
          width: 200px;
          margin-bottom: 10px;
          left: 143px;
          top: -326px;
        }

        #container input[type="text"] {
          left: 0px;
        }

        #whichAirport {
          margin: 0px;
          display: inline-block;
          width: 200px !important;
          height: 40px;
          padding: 3px 6px;
          font-size: 12px;
          font-family: sans-serif;
          border-radius: 0px;
          outline: none;
          background-color: white;
          position: relative;
          display: block;
          border: 1px solid rgba(235, 235, 235);
        }

        .airportList {
          position: absolute;
          z-index: 2000;
          width: 100%;
          display: block;
          height: 140px;
          overflow: scroll;
          z-index: 5000;
        }
        .airportList ul {
          position: relative;
          margin: 0px;
          padding: 0;
          width: 100%;
        }
        .airportList ul li {
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
          padding-left: 20px;
          position: relative;
          width: 100%;
          font-size: 12px;
        }
        .airportList ul li:hover {
          background-color: white;
          border-left: 3px solid #14a248;
          padding-left: 19px;
        }

        @media only screen and (min-width: 768px) {
          #container {
            position: relative;
            display: inline-block;
            width: 210px;
            font-size: 12px;
            left: 10px;
            top: 12px;
          }
          #whichAirport {
            width: 210px !important;
            font-size: 12px;
          }

          .airportList ul li {
            font-size: 12px;
            padding-left: 18px;
          }
        }

        /* ============= GROUP TITLES ============= */
        .container-title {
          width: 100%;
          left: 0%;
          padding: 0px 20px 0px;
        }
        .container-title h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }
        @media only screen and (min-width: 768px) {
          .container-title .form-cont {
            margin: 3px 46px 7px 0px;
            width: 80px;
          }
          .container-title h2 {
            width: 440px;
          }
          .container-title {
            width: 480px;
          }
        }

        /* ============= GROUP BUTTONS ============= */

        .wrap .questionCard {
          width: 100%;
          padding: 15px 10px;
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
          background: none;
        }

        /* =============== GROUP FIVE (程度說明) ===============*/
        .groupFive {
          margin-top: 50px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .groupFive .container-rate {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .groupFive .container-rate h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        .container-level {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .container-level h2 {
          font-weight: 800;
          font-size: 22px;
          width: 440px;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }
        textarea {
          height: 330px;
          width: 100%;
          padding: 10px;
          border: 1px solid rgb(238, 238, 238);
        }

        /* ============= YOUR LOCATION ============== */

        .groupSeven {
          margin-top: 50px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          margin-left: 0px;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .groupSeven .container-rate {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .groupSeven .container-rate h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        .container-map {
          width: 100%;
          left: 0%;
          padding: 10px 20px;
        }
        .container-map h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        input::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: #2b2b2b !important;
          font-weight: bold;
        }
        input::-moz-placeholder {
          /* Firefox 19+ */
          color: #2b2b2b !important;
          font-weight: bold;
        }
        input :-ms-input-placeholder {
          /* IE 10+ */
          color: #2b2b2b !important;
          font-weight: bold;
        }
        input:-moz-placeholder {
          /* Firefox 18- */
          color: #2b2b2b !important;
          font-weight: bold;
        }

        /*Right banner*/
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        input[type="text"] {
          outline: none;
          padding: 6px 10px 6px 13px;
          height: 40px;
          width: 140px;
          color: #2b2b2b;
          font-size: 13px;
          font-weight: 500;
          font-family: sans-serif;
          margin-right: 15px;
          left: 50%;
          border: 1px solid #ebebeb;
        }
        .selectdate input[type="text"]:active,
        .selectdate input[type="text"]:focus {
          outline: 3px solid #14a248;
        }
        .img-fluid {
          transform: translateX(36%);
        }
        /*Match Tutors*/
        .container-candidate {
          position: relative;
          width: 100%;
          top: 7%;
          left: 0%;
        }
        .container-candidate h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          padding-top: 8px;
          padding-bottom: 12px;
          color: #fff;
          border-bottom: 1px solid #ebebeb;
        }
        .box.box-primary {
          padding: 15px 10px;
          box-shadow: none;
        }

        input[type="button"] {
          color: white;
          background-color: #006098;
          border: 1px solid #006098;
          outline: none;
          cursor: pointer;
          width: 60px;
          height: 32px;
          line-height: 32px;
          font-weight: 900;
          margin-top: 4px;
        }

        /* ======== MODAL BOX DELETE =========== */
        .modal-box-delete h2 {
          font-weight: 800;
          font-size: 22px;
          margin-top: 10px;
          color: #2b2b2b;
        }
        .backdrop-delete {
          display: block;
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: #3f3f3f;
          z-index: 2005;
          opacity: 0.6;
        }
        .modal-box-delete {
          display: block;
          z-index: 2100;
          left: 50%;
          background: white;
          width: 320px;
          height: 180px;
          margin: 10px auto;
          animation: mailframe 600ms ease-in 0ms;
          transform: translate(-50%, -300%);
          position: absolute;
        }
        .modal-box-delete .container {
          margin: 20px auto 20px;
          text-align: center;
          width: 100%;
          font-size: 18px;
          font-family: sans-serif;
          font-weight: 600;
          color: #484848;
          display: flex;
          justify-content: center;
        }
        .nostop,
        .delete {
          width: 110px;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          border-radius: 4px;
          color: #484848;
          text-align: center;
          position: absolute;
          top: 65%;
          left: 25%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          display: block;
          font-family: sans-serif;
          font-weight: 300;
          border: 1px solid #dce0e0;
        }
        .delete,
        .delete:focus,
        .delete:active {
          left: 75%;
        }

        .nostop:hover,
        .delete:hover {
          background-color: #f7f8f9;
          border-color: #353f47;
        }

        .bin {
          margin-right: 7px;
          height: 40px;
          width: 40px;
          text-align: center;
          border-radius: 2px;
          background-color: #484848;
          background-image: url("./../../images/bin.png");
          background-position: center;
          background-size: 30px;
          background-repeat: no-repeat;
          display: block;
        }
        @keyframes mailframe {
          from {
            transform: translate(-50%, -30%);
            opacity: 0;
          }
          to {
            transform: translateY(-50%, -50%);
            opacity: 1;
          }
        }
        .container {
          text-align: center;
        }
        @media only screen and (min-width: 768px) {
          .container {
            text-align: left;
          }

          .img-fluid {
            transform: translateX(0%);
          }

          input[type="text"] {
            width: 220px;
          }
          input[type="button"] {
            width: 80px;
          }

          .box.box-primary {
            padding: 15px 40px;
          }
          .box .row {
            text-align: left;
          }
          .bottomButtons input[type="button"] {
            width: 200px;
          }
          .bottomButtons input[type="submit"] {
            width: 200px;
          }
          .bottomButtons {
            margin-top: 21px;
          }
          .edit-description {
            width: 1050px;
          }

          .container-duration h2 {
            width: 440px;
          }
          .container-duration {
            width: 480px;
          }
          .container-rate h2 {
            width: 440px;
          }
          .container-rate {
            width: 480px;
          }

          .groupFive {
            width: 480px;
          }
          .align-other {
            margin: -18px 0px;
          }

          .container-level {
            width: 480px;
          }
          .groupSeven {
            width: 480px;
            margin-left: 28px;
          }
          .groupSix {
            width: 480px;
          }

          .container-map h2 {
            width: 440px;
          }
          .container-map {
            width: 480px;
          }

          .container-map input[type="text"] {
            width: 440px;
          }
          #comlength select {
            position: absolute;
            transform: translate(248px, 300px);
          }
        }
      `}</style>
    </>
  );
};

export default ListingEditReg;
