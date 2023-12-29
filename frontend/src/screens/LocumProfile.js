import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { ExternalLink } from "react-external-link";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";

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

const LocumProfile = () => {
  const user = useSelector((state) => state.userInfo.value);
  const [userInfo, setUserInfo] = useState({});
  const [driverslicense, setDriverslicense] = useState("");
  const [ahpra, setAhpra] = useState("");
  const [profession, setProfession] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [SMStext, setSMStext] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [idPhoto, setIdPhoto] = useState("");
  const [, setIsloaded] = useState(false);
  const [listOfProfessions, setListOfProfessions] = useState([]);

  // ============ PROFILE DATA ===========
  useEffect(() => {
    setIsloaded(false);
    const fetchData = async () => {
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL + "api/locums/profile/" + user.email
        )
        .then((response) => {
          if (response.status === 200) {
            setUserInfo(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setSMStext(response.data.SMStext);
            setNewsletter(response.data.newsletter);
            setProfession(response.data.profession);
            setAhpra(response.data.ahpra);
            setDriverslicense(response.data.driverslicense);
            setCountry(response.data.country);
            setPostalCode(response.data.postalCode);
            setState(response.data.state);
            setSuburb(response.data.suburb);
            setStreet(response.data.street);
            setStreetNo(response.data.streetNo);
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);
            setPhone(response.data.phone);
            setIdPhoto(response.data.filename);
            setIsloaded(true);
          }
        });
    };
    fetchData();
  }, []);

  // ========== ALERT MESSAGE ===============
  const [updateNote, setUpdateNote] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesInAllusers(errorMessage) {
    setAlert(true);
    window.scrollTo({
      top: 60,
      behavior: "smooth",
    });
    setAlertMsg(errorMessage);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_BACKEND_URL + "api/locums/updateProfile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: userInfo._id,
        nanoId: userInfo.nanoId,
        firstName: firstName,
        lastName: lastName,
        email: userInfo.email,
        profession: profession,
        ahpra: ahpra,
        driverslicense: driverslicense,
        phone: phone,
        street: street,
        streetNo: streetNo,
        postalCode: postalCode,
        suburb: suburb,
        state: state,
        country: country,
        longitude: longitude,
        latitude: latitude,
        isLocum: true,
        SMStext: SMStext,
        newsletter: newsletter,
        photo: idPhoto,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInAllusers(data.invalid);
        } else {
          setUpdateNote(true);
          setAlert(false);
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
        alert(err.message);
      });
  };

  //==== ID PHOTO (disable and enable save photo button) ====
  const [savePhoto, setSavePhoto] = useState(false);

  function imageUploadActivateButton() {
    setSavePhoto(true);
  }

  // =============== UPLOAD PHOTO ===============
  const [previewImage, setPreviewImage] = useState(false);
  const [previewText, setPreviewText] = useState(false);
  const [imageFacebook, setImageFacebook] = useState(false);
  const [imageHere, setImageHere] = useState("");

  const [file, setFile] = useState("");

  const imageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      setPreviewText(true);
      setImageFacebook(true);
      setPreviewImage(true);
      reader.onload = function (event) {
        setImageHere(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // =========== DELETE PHOTO ==================
  const deletePhoto = async (id) => {
    await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/locums/allusers/" + id,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok === true) {
        setIdPhoto("");
        setImageHere("");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    console.log(...formData);
  
    fetch(
      `https://medclicker.com.au/api/locums/upload?email=${userInfo.email}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(typeof data);
        if (data.invalid) {
          outPutErrorMessagesInAllusers(data.invalid);
        } else {
          setUpdateNote(true);
          setIdPhoto(data.newImage);
          console.log("photo");
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
        console.error(err);
      });
  };

  // ======= MOBILE (Disable and enable submit) =======
  const handlePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  };

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

  // =============== STORE NEWSLETTER (Scenario 1) =============
  // Scenario 1: When user registered in locum newsletter (list 6)
  // and not registered in general newsletter (list 7).
  // Even if the user goes to Subscription.js to register in general
  // newsletter (list 7), it will remain in list 6 (locum)

  const storeNL = async (e, email) => {
    e.preventDefault();

    if (newsletter === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/comm/delist/${email}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            newsletter: false,
          }),
        }
      );
      const data = await res.json();

      if (data) {
        setNewsletter(false);
        setInBrevo(false);
      }
    }

    if (newsletter === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/comm/subscribe/${email}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            newsletter: true,
            attributes: {
              FIRSTNAME: firstName,
              LASTNAME: lastName,
              STATES: state,
            },
          }),
        }
      );
      const data = await res.json();

      if (data) {
        setNewsletter(true);
        setInBrevo(true);
      }
    }
  };

  // =============== STORE NEWSLETTER (Scenario 2) =============
  // Scenario 2: When user has not registered in locum newsletter (list 6)
  // and registered in general newsletter (list 7).
  // User then registers in locum newsletter (list 6), but because email
  // exist in list 7, it will remain in list 7.
  // Here, we use the updateContact to move list 7 to list 6 (Locum)
  const storeFR = async (e, email) => {
    e.preventDefault();

    if (newsletter === true) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + `api/comm/delist/${email}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            newsletter: false,
          }),
        }
      );
      const data = await res.json();

      if (data) {
        setNewsletter(false);
        setInBrevo(false);
      }
    }

    if (newsletter === false) {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "api/comm/update",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            newsletter: true,
            attributes: {
              FIRSTNAME: firstName,
              LASTNAME: lastName,
              STATES: state,
            },
          }),
        }
      );
      const data = await res.json();

      if (data) {
        setNewsletter(true);
        setInBrevo(true);
      }
    }
  };

  // =============== CHECK IF IN SEND IN BLUE (BREVO) =============

  const [inBrevo, setInBrevo] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "api/comm/mysubscription?" +
          "email=" +
          user.email
      );
      const data = await res.json();

      if (data.email) {
        setInBrevo(true);
      } else {
        setInBrevo(false);
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
  }, [inBrevo]);

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

  if (!isLoaded)
    return (
      <div
        style={{
          backgroundColor: "rgba(33, 40, 46, 0.8)",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          zIndex: "2500",
          justifyContent: "center",
          alignItems: "center",
          display: "block",
          position: "fixed",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            transform: "translate(50%,50%)",
          }}
        >
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="76"
            visible={true}
          />
          {"  "}
          Loading...
        </div>
      </div>
    );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Locum Profile | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker Locum Profile" />
        </Helmet>

        <LoggedInNavbar />
        <div className="locum_details">
          <Link to="/dashboard">Back to my Dashboard</Link>
          <h2>Locum information</h2>
        </div>
        <div className="wrap">
          {updateNote && (
            <section className="updateNote container-fluid">
              <div className="container-fluid ">
                <img src="/images/tick.png" width="12px" alt="" />
                <span>Your details have been updated</span>
              </div>
            </section>
          )}
          <div className="divider">
            <div className="personContent">
              <div className="threeItem">
                <div>
                  <Link style={{ color: "#14a248" }} to="#">
                    My Locum Profile
                  </Link>
                </div>
                <div>
                  <Link to="/locum_cv">My Skills & Experiences</Link>
                </div>
                <div>
                  <ExternalLink
                    href={
                      process.env.REACT_APP_BACKEND_URL +
                      `api/locums/resume/${userInfo.locumId}`
                    }
                    target="_self"
                  >
                    Preview CV
                  </ExternalLink>
                </div>
              </div>
            </div>
            <div className="allQuestionCards">
              <form id="formZero" onSubmit={handleSubmit}>
                <div className="sectionHeadings">
                  <h2>Photo</h2>
                </div>
                <div className="questionCard">
                  <div className="container-fluid regCon">
                    <div className="bigHead">
                      <figure id="imagePreview">
                        <div id="bin" onClick={() => deletePhoto(userInfo._id)}>
                          <input
                            type="submit"
                            id="embedBin"
                            style={{ visibility: "hidden" }}
                          />
                        </div>
                        {imageFacebook ? (
                          ""
                        ) : (
                          <>
                            <img
                              src={idPhoto}
                              alt=""
                              name="image-File"
                              id="image-facebook"
                            />
                            <img
                              src={`/locumPhoto/${idPhoto}`}
                              alt=""
                              name="image-File"
                              id="image-facebook"
                            />
                          </>
                        )}
                        {previewImage ? (
                          <img
                            src={imageHere}
                            alt=""
                            name="imageFile"
                            id="image-preview"
                          />
                        ) : (
                          ""
                        )}

                        {previewText ? "" : <span id="text-preview"></span>}
                      </figure>
                      <div className="rp">
                        <span className="ex">
                          JPG, JPEG, PNG and GIF files only, max. file size:
                          600kb
                        </span>
                        <br />
                        <div className="buttonsEven">
                          <label htmlFor="photoUpload" className="upload-btn">
                            Upload Photo
                          </label>
                          <input
                            type="file"
                            accept="image/gif, image/jpeg, image/jpg, image/png"
                            className="form-control-file headUp"
                            id="photoUpload"
                            onChange={(event) => {
                              imageUpload(event);
                              imageUploadActivateButton();
                              setFile(event.target.files[0]);
                            }}
                            name="gameFile"
                          />

                          {savePhoto ? (
                            <button
                              style={{
                                backgroundColor: "#14a248",
                                cursor: "pointer",
                                color: "#fff",
                                border: "1px solid #14a248",
                              }}
                              type="submit"
                              id="savePhoto"
                            >
                              Save Photo
                            </button>
                          ) : (
                            <button type="button" disabled id="savePhoto">
                              Save Photo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <form id="formOne" onSubmit={onSubmit}>
                <div className="sectionHeadings">
                  <h2>My Details</h2>
                </div>
                <div className="regCon">
                  <div className="errorMessageHere">
                    {alert ? (
                      <div className="alert">
                        <img
                          src="/images/cross-black.png"
                          style={{ width: "12px" }}
                          alt=""
                        />
                        <span
                          dangerouslySetInnerHTML={{ __html: alertMsg }}
                        ></span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <section className="middleQuestionCard">
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
                          Please contact Medclicker Customer services team if
                          you wish to amend your AHPRA details.
                        </label>

                        <input
                          type="text"
                          id="ahpra"
                          disabled
                          style={{ outline: "none", width: "40%" }}
                          value={ahpra ? ahpra : ""}
                          autoComplete="off"
                          maxLength={13}
                          onChange={(e) => {
                            setAhpra(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="sectionHeadings">
                  <h2>My Location</h2>
                </div>
                <section className="bottomQuestionCard">
                  <div className="container-fluid">
                    <div className="address">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="search">
                            Search for your street address, landmarks, or
                            general area below.
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
                                    <b>
                                      Having difficulty finding your address?
                                    </b>
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
                <div className="sectionHeadings">
                  <h2>Newsletter and SMS Subscription</h2>
                </div>
                <section className="SMSQuestionCard">
                  <div className="container-fluid regCon">
                    {SMStext ? (
                      <input
                        type="checkbox"
                        id="SMStext"
                        checked={SMStext}
                        onChange={() => {
                          setSMStext(!SMStext);
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        id="SMStext"
                        checked={SMStext}
                        onChange={() => {
                          setSMStext(!SMStext);
                        }}
                      />
                    )}

                    <label htmlFor="SMStext" className="nonselect">
                      I would like to receive SMS job alerts
                    </label>
                    {inBrevo === false ? (
                      newsletter ? (
                        <>
                          <input
                            type="checkbox"
                            id="newsletterA"
                            checked={newsletter ? true : false}
                            onChange={(e) => {
                              storeNL(e, user.email);
                            }}
                          />
                          <label htmlFor="newsletterA" className="nonselect">
                            I want to receive exclusive locum-only newsletters
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            id="newsletterB"
                            checked={newsletter ? true : false}
                            onChange={(e) => {
                              storeNL(e, user.email);
                            }}
                          />
                          <label htmlFor="newsletterB" className="nonselect">
                            I want to receive exclusive locum-only newsletters
                          </label>
                        </>
                      )
                    ) : (
                      ""
                    )}

                    {inBrevo === true ? (
                      newsletter ? (
                        <>
                          <input
                            type="checkbox"
                            id="newsletterA"
                            checked={newsletter ? true : false}
                            onChange={(e) => {
                              storeFR(e, user.email);
                            }}
                          />
                          <label htmlFor="newsletterA" className="nonselect">
                            I want to receive exclusive locum-only newsletters
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            id="newsletterB"
                            checked={newsletter ? true : false}
                            onChange={(e) => {
                              storeFR(e, user.email);
                            }}
                          />
                          <label htmlFor="newsletterB" className="nonselect">
                            I want to receive exclusive locum-only newsletters
                          </label>
                        </>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </section>
                <section className="buttonCard">
                  <input type="submit" className="btn-vori" value="Update" />
                </section>
              </form>
            </div>
          </div>
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
            padding-top: 60px;
            background-color: #f4f5f6;
          }
          .wrap .divider {
            display: grid;
            grid-template-columns: 30% 70%;
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
          .wrap .alert {
            background-color: #fcebcd;
            margin: 5px auto 12px;
            padding: 7px;
            width: 80%;
          }

          @media screen and (max-width: 768px) {
            .container {
              text-align: center;
            }
            .wrap {
              padding: 10px;
            }
            .wrap .divider {
              display: block;
            }
            .wrap .link-btn {
              margin-top: 16px;
            }
            .row .col-md-6:first-child {
              margin-bottom: 15px;
            }
          }

          /* ============= PERSONAL DETAILS ============== */

          .locum_details {
            margin: 15px auto 25px;
            padding: 10px 440px;
          }

          .locum_details h2 {
            color: #323232;
            font-weight: 500;
            font-size: 32px;
          }
          .locum_details a {
            color: #14a248;
            display: block;
            margin-bottom: 10px;
          }

          .locum_details a:hover {
            color: #0e7132;
          }

          @media screen and (max-width: 768px) {
            .locum_details {
              margin: 25px auto;
              padding: 10px 100px;
              text-align: center;
            }
          }

          /* =========== LEFT RAIL ========== */
          .wrap .personContent {
            width: 350px;
            margin: 0 20px;
          }
          .wrap .personContent .threeItem:last-child {
            height: 135px;
          }
          .wrap .personContent .threeItem > div {
            padding: 10px 30px;
            width: 100%;
          }
          .wrap .personContent .threeItem > div:last-child {
            padding: 0px 30px;
            margin-top: 20px;
            border: 1px solid #2b2b2b;
            height: 38px;
            border-radius: 4px;
            line-height: 38px;
            text-align: center;
          }
          .wrap .personContent .threeItem > div:last-child:hover {
            border: 1px solid #777;
          }
          .wrap .personContent .threeItem > div a:hover {
            color: #777;
          }
          .wrap .personContent .threeItem > div a {
            color: #2b2b2b;
            font-weight: 800;
            font-size: 22px;
            font-family: sans-serif;
          }
          .wrap .personContent .threeItem > div:hover {
            cursor: pointer;
          }
          @media screen and (max-width: 768px) {
            .wrap .personContent {
              display: block;
              width: 420px;
              margin: 0 auto 30px;
              height: 200px;
            }
            .wrap .personContent .threeItem {
              margin: 0;
              width: 420px;
              margin-bottom: 20px;
              text-align: center;
            }
            .wrap .personContent .threeItem > div {
              width: 100%;
            }
          }

          /* ========= RIGHT RAIL ========== */
          .wrap .allQuestionCards {
            width: 950px;
            padding: 0px 20px;
          }
          .wrap .sectionHeadings h2 {
            font-weight: 800;
            font-size: 24px;
            color: #2b2b2b;
            margin-top: 35px;
            margin-bottom: 10px;
            margin-left: 30px;
            width: 100%;
          }
          .regCon {
            width: 85% !important;
            padding: 20px 0;
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

          @media screen and (max-width: 768px) {
            .allQuestionCards {
              position: relative;
              margin: 0;
              width: 100%;
              display: block;
            }
          }

          /* =========== 頭像照片 =========== */
          .wrap .questionCard {
            position: relative;
            width: 900px;
            min-height: 270px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
            background: #fff;
          }

          .wrap .questionCard h2 {
            position: absolute;
            transform: translate(0%, -200%);
            font-weight: 500;
            font-size: 24px;
            width: 440px;
            margin-top: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 40px;
            color: #323232;
          }

          .upload-btn {
            color: #484848;
            width: 130px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            border: 2px solid #dadada;
          }
          .bigHead .ex {
            margin-bottom: 16px;
            display: inline-block;
          }

          .bigHead #savePhoto {
            background-color: #ddd;
            color: #888;
            border: 1px solid #ddd;
            height: 40px;
            margin: 0px auto;
            width: 130px;
            margin-left: 6px;
          }
          .bigHead #savePhoto:active,
          .bigHead #savePhoto:focus {
            outline: none;
          }

          #savePhoto {
            background-color: #ddd;
            color: #888;
            border: 1px solid #ddd;
            height: 40px;
            margin: 0px auto;
            width: 130px;
          }
          #imagePreview {
            width: 150px;
            height: 150px;
            border: 1px solid #ddd;
            margin-top: 15px;
            display: flex;
            justify-content: center;
            background-color: #eee;
            color: #ccc;
            align-items: center;
            overflow: hidden;
          }
          #imagePreview img {
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            width: 160px;
            position: relative;
          }

          #bin {
            margin: 4px 0px 0px 1px;
            height: 24px;
            width: 24px;
            cursor: pointer;
            position: absolute;
            transform: translate(-260%, -265%);
            border-radius: 2px;
            background-color: #484848;
            background-image: url("./../../images/bin.png");
            background-position: center;
            background-size: 12px;
            background-repeat: no-repeat;
            z-index: 200;
          }

          #bin:hover {
            background-color: #2b2b2b;
            cursor: pointer;
          }

          #bin:active,
          #bin:focus {
            border: none;
            background-color: #2b2b2b;
          }
          #photoUpload {
            display: none;
          }
          .upload-btn,
          .photo-btn {
            color: #484848;
            width: 130px;
            height: 40px;
            text-align: center;
            line-height: 36px;
            cursor: pointer;
            border: 2px solid #dadada;
            background-color: white;
          }
          .bigHead {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 85%;
            margin: 0 auto;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #ebebeb;
          }
          .bigHead .lp {
            width: 150px;
            height: 150px;
            background: #eee;
            border: 1px solid #ebebeb;
          }
          .bigHead .rp {
            margin-left: 50px;
          }
          .bigHead .ex {
            margin-bottom: 16px;
            display: inline-block;
          }
          @media screen and (max-width: 768px) {
            .bigHead {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
            }
            .bigHead > .rp {
              margin: 0;
            }
            .bigHead > .rp .headUp {
              padding-left: 40px;
              margin-top: 10px;
            }
            .bigHead > .rp label {
              display: block;
            }
            .bigHead > .rp .ex {
              display: none;
            }
            .wrap .questionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }
            .bigHead #savePhoto {
              margin-left: 0px;
            }
          }

          /* ============== 基本資料 ================ */
          #email:disabled,
          #lastName:disabled,
          #firstName:disabled,
          #ahpra:disabled {
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

          input[type="text"],
          input[type="email"] {
            height: 42px;
            border-radius: 0px;
            text-decoration: none;
            outline: none !important;
            background: none;
            border: 2px solid #dadada;
            padding: 12px 15px;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
            color: #2b2b2b;
            font-family: sans-serif;
          }
          .wrap .middleQuestionCard {
            position: relative;
            width: 900px;
            min-height: 260px;
            padding: 30px 20px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
            background: #fff;
          }
          .wrap .col-form-label {
            font-family: Arial;
            font-size: 14px;
            font-weight: 500;
          }

          .middleQuestionCard .row {
            position: relative;
            top: 8%;
            width: 100%;
            left: 3%;
          }
          @media screen and (max-width: 768px) {
            .wrap .middleQuestionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }
          }

          /* ============ 居住位置 ========== */
          .wrap .bottomQuestionCard {
            position: relative;
            width: 900px;
            min-height: 325px;
            padding: 30px 20px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
            background: #fff;
          }

          .wrap .bottomQuestionCard .address > p {
            color: #777;
            font-size: 22px;
          }
          .wrap .bottomQuestionCard .address .bottomTips span {
            color: #2b2b2b;
            font-size: 14px;
            font-weight: 500;
          }
          .wrap .bottomQuestionCard .address .bottomTips p {
            color: #2b2b2b;
            margin: 10px auto;
            font-size: 16px;
            font-weight: 800;
          }

          #address {
            width: 100%;
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
          @media screen and (max-width: 768px) {
            .wrap .bottomQuestionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }

            .wrap .allQuestionCards {
              padding: 0px;
              width: none;
            }
          }

          /* ======= 訂閱與SMS簡訊通知 ========== */
          .wrap .SMSQuestionCard {
            min-height: 125px;
            position: relative;
            width: 900px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
            background: #fff;
          }
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
            width: 100%;
            display: block;
            color: #2b2b2b;
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
          .nonselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                          supported by Chrome, Edge, Opera and Firefox */
          }

          @media screen and (max-width: 768px) {
            .wrap .SMSQuestionCard {
              width: 450px;
              margin: 0px 30px;
              display: block;
            }
          }

          /* ========== SUBMIT BUTTON ========= */
          .btn-vori {
            position: relative;
            background-color: #14a248;
            color: white;
            cursor: pointer;
            font-weight: 800;
            width: 200px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            margin: 20px 0px 20px 0px;
            border: none;
          }

          @media screen and (max-width: 768px) {
            .wrap .buttonCard {
              width: 450px;
              margin: 25px 30px;
            }
            input[type="submit"] {
              width: 100%;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default LocumProfile;
