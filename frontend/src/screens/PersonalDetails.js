import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import $ from "jquery";
import Footer from "../components/Footer";
import LoggedInNavbar from "../components/LoggedInNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ThreeDots } from "react-loader-spinner";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import { RotatingLines } from "react-loader-spinner";
import { login } from "../redux/userInfo";

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

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.value);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let id = params.get("id");
  let token = params.get("token");
  let access = params.get("access");
  access = access === "true";
  console.log(user);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [idPhoto, setIdPhoto] = useState("");
  const [isloading, setIsloading] = useState(false);

  // ========= GOOGLE & FACEBOOK SIGN UP DATA ===========
  useEffect(() => {
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);
    }

    // ============ PROFILE DATA ===========
    axios
      .get(
        "http://localhost:4000/api/users/allusers/" +
          localStorage.getItem("userId")
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userId", response.data._id);
          setUserInfo(response.data);
          setCountry(response.data.country);
          setPostalCode(response.data.postalCode);
          setState(response.data.state);
          setSuburb(response.data.suburb);
          setStreet(response.data.street);
          setStreetNo(response.data.streetNo);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          setIdPhoto(response.data.filename);
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
              completeAccess: response.data.survey !== "" ? true : false,
            })
          );

          window.history.pushState({}, document.title, "/personal-details");
        }
      });
  }, [id]);

  // ============ PROFESSION (Disable and enable submit) =========
  const [listOfProfessions, setListOfProfessions] = useState([]);
  const [showProfession, setShowProfession] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    // declare the data fetching function
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:4000/api/listings/listOfProfessions?"
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

  const handleSetProfession = (e) => {
    const innerHTML = e.target.innerHTML;
    setUserInfo({ ...userInfo, profession: innerHTML });
  };

  // ========== TAKE OUT DUPLICATE PROFESSIONS =========
  const noDuplicates = [
    ...new Map(
      listOfProfessions.map((list) => [list.professionName, list])
    ).values(),
  ];

  // ========== SURVEY (Disable and enable submit) ===========
  const [showSurvey, setShowSurvey] = useState(false);
  const handleShowSurvey = () => {
    setShowSurvey(false);
  };
  const handleSetSurvey = (e) => {
    const innerHTML = e.target.innerHTML;
    setUserInfo({ ...userInfo, survey: innerHTML });
  };

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

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
    await fetch("http://localhost:4000/api/users/allusers/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok === true) {
        setIdPhoto("");
        setImageHere("");
        dispatch(
          login({
            firstName: user.firstName,
            isLoggedIn: true,
            lastName: user.lastName,
            email: user.email,
            filename: "",
            isLocum: user.isLocum,
            isActive: user.isActive,
            nanoId: user.nanoId,
            isAdmin: user.isAdmin,
            completeAccess: user.survey !== "" ? true : false,
          })
        );
      }
    });
  };

  // ======= PUT REQUEST TO UPDATE TO AUTHUSERS.JS ======
  const onSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    fetch("http://localhost:4000/api/users/allusers", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        profession: userInfo.profession,
        survey: userInfo.survey,
        country: country,
        state: state,
        suburb: suburb,
        street: street,
        streetNo: streetNo,
        latitude: latitude,
        longitude: longitude,
        postalCode: postalCode,
        filename: idPhoto,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessagesInAllusers(data.invalid);
          setIsloading(false);
        } else {
          setUpdateNote(true);
          setIsloading(false);
          setAlert(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setUserInfo(data);
          dispatch(
            login({
              firstName: data.firstName,
              isLoggedIn: true,
              lastName: data.lastName,
              email: data.email,
              filename: data.filename,
              isLocum: data.isLocum,
              isActive: data.isActive,
              nanoId: data.nanoId,
              isAdmin: data.isAdmin,
              completeAccess: true,
            })
          );

          setTimeout(function () {
            setUpdateNote(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // =========== BACKDROP ============//
  const [backdrop, setBackdrop] = useState(true);
  const [alertBanner, setAlertBanner] = useState(true);

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

  useEffect(() => {
    setAddress(`${streetNo} ${street} ${suburb} ${state} ${postalCode}`);
    setUserInfo({ ...userInfo, country: country });
  }, []);

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
          <title>Personal Details | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta
            name="description"
            content="Medclicker Medclicker Personal Details"
          />
        </Helmet>
        <LoggedInNavbar />

        <div className="personal_details">
          <Link to="/dashboard">Back to my Dashboard</Link>
          <h2>Personal information</h2>
        </div>

        {userInfo.survey === "" ||
        userInfo.phone === "" ||
        userInfo.profession === "" ||
        userInfo.street === "" ? (
          <>
            {backdrop && alertBanner ? (
              <>
                <div className="backdrop"></div>
                <div className="alertCard">
                  <figure>
                    <img
                      onClick={() => {
                        setBackdrop(false);
                        setAlertBanner(false);
                      }}
                      className="cross"
                      src="/images/cross-black.png"
                      alt=""
                    />
                  </figure>

                  <h3>New User's Note</h3>
                  <p>
                    Please fill in the remainder empty fields.
                    <img
                      style={{ width: "390px", marginLeft: "20px" }}
                      src="/images/profession.png"
                      alt=""
                    />
                  </p>
                  <br />
                  <p>
                    Click on the "Update" button at the end.
                    <img
                      style={{ width: "200px", marginLeft: "20px" }}
                      src="/images/update_button.png"
                      alt=""
                    />
                  </p>
                  <br />
                  <p>
                    You would have full access to all of Medclicker's services
                    once all fields are completed. Thank you.
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        <div className="wrap">
          <div className="personContent">
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

          <form
            id="formZero"
            action={`http://localhost:4000/api/users/upload?email=${userInfo.email}`}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="personContent">
              <section className="questionCard container-fluid">
                <h2>Photo</h2>
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
                        JPG, JPEG, PNG and GIF files only, max. file size: 600kb
                      </span>
                      <br />
                      <div className="buttonsEven">
                        <label htmlFor="photoUpload" className="upload-btn">
                          Upload Photo
                        </label>
                        <input
                          type="file"
                          accept="image/gif, image/jpeg, image/jpg, image/png, .doc,.docx, application/pdf"
                          className="form-control-file headUp"
                          id="photoUpload"
                          onChange={(event) => {
                            imageUpload(event);
                            imageUploadActivateButton();
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
                          <button type="submit" disabled id="savePhoto">
                            Save Photo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </form>
          <form id="formOne" onSubmit={onSubmit}>
            <div className="personContent">
              <section className="middleQuestionCard container-fluid">
                <h2>My Details</h2>
                <div className="container-fluid regCon">
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
                            className="form-control-lg"
                            id="firstName"
                            name="firstName"
                            autoComplete="none"
                            value={userInfo.firstName ? userInfo.firstName : ""}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lastName"
                          className="col-sm-3 col-form-label"
                        >
                          Last Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control-lg"
                            id="lastName"
                            name="lastName"
                            autoComplete="none"
                            value={userInfo.lastName ? userInfo.lastName : ""}
                            onChange={handleOnChange}
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
                            disabled
                            defaultValue={userInfo.email}
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
                            required
                            className="form-control-lg"
                            autoComplete="nope"
                            maxLength="10"
                            minLength="10"
                            placeholder="10-digits number"
                            value={userInfo.phone ? userInfo.phone : ""}
                            id="phone"
                            name="phone"
                            onChange={handleOnChange}
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
                            required
                            className="form-control-lg"
                            id="profession"
                            name="profession"
                            autoComplete="off"
                            value={
                              userInfo.profession ? userInfo.profession : ""
                            }
                            onFocus={() => {
                              setShowProfession(true);
                              setShowSurvey(false);
                            }}
                            onChange={() => {
                              setShowProfession(true);
                              setShowSurvey(false);
                            }}
                          />

                          {showProfession ? (
                            <div className="professionList">
                              <ul>
                                <li
                                  onClick={(e) => {
                                    handleSetProfession(e);
                                    setShowProfession(false);
                                  }}
                                >
                                  I am a Guest
                                </li>
                                {noDuplicates.map((profession) => {
                                  return (
                                    <li
                                      key={profession._id}
                                      onClick={(e) => {
                                        handleSetProfession(e);
                                        setShowProfession(false);
                                      }}
                                    >
                                      {profession.professionName}
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

                      {user.completeAccess === true ? (
                        ""
                      ) : (
                        <div className="form-group row">
                          <label
                            htmlFor="survey"
                            className="col-sm-3 col-form-label"
                          >
                            Survey
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              required
                              className="form-control-lg"
                              id="survey"
                              name="survey"
                              autoComplete="off"
                              value={userInfo.survey ? userInfo.survey : ""}
                              onFocus={() => {
                                setShowSurvey(true);
                                setShowProfession(false);
                              }}
                              onChange={() => {
                                setShowSurvey(true);
                                setShowProfession(false);
                              }}
                            />
                            {showSurvey && (
                              <div className="surveyList">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Facebook
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Search Engine
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Publication
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Word of Mouth
                                  </li>
                                  <li
                                    onClick={(e) => {
                                      handleSetSurvey(e);
                                      handleShowSurvey();
                                    }}
                                  >
                                    Other
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="personContent">
              <section className="bottomQuestionCard container-fluid">
                <h2>Primary Location of Practice</h2>
                <div className="container-fluid">
                  <div className="location">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="search">
                          Locate your primary address of practice (clinic,
                          hospital, pharmacy etc). Search for your street
                          address, landmarks, or general area below.
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
              <section className="buttonCard container-fluid">
                {userInfo.lastName &&
                userInfo.firstName &&
                userInfo.profession &&
                userInfo.phone &&
                userInfo.survey &&
                street &&
                suburb &&
                state &&
                country ? (
                  !isloading ? (
                    <input type="submit" className="btn-vori" value="Update" />
                  ) : (
                    <button className="btn-vori">
                      <ThreeDots
                        type="ThreeDots"
                        height={40}
                        width={80}
                        color={"white"}
                      />
                    </button>
                  )
                ) : (
                  <button disabled>Update</button>
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

          .btn-vori {
            position: relative;
            background-color: #14a248;
            color: #fff;
            border: 1px solid #14a248;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            width: 100%;
            cursor: pointer;
            text-align: center;
            align-items: center;
          }
          .btn-login {
            height: 48px;
            border-radius: 4px;
            width: 100%;
            font-weight: 800;
            font-size: 20px;
            background-color: rgb(165, 206, 15);
            text-align: center;
            box-sizing: border-box;
            margin-top: 0px;
            cursor: pointer;
            padding: 1px auto;
            background-color: #14a248;
            color: #fff;
            border: 1px solid #14a248;
          }

          .buttonCard button {
            position: relative;
            background-color: #ddd;
            color: #888;
            border: 1px solid #ddd;
            font-weight: 800;
            width: 150px;
            height: 50px;
            line-height: 50px;
            outline: none;
            font-size: 20px;
            border-radius: 4px;
            padding: 0;
            width: 100%;
          }

          .regCon {
            width: 85% !important;
            padding: 20px 0;
          }
          .regCon h2 {
            margin-bottom: 20px;
          }
          .regCon .form-group {
            margin-bottom: 25px;
          }

          @media only screen and (min-width: 768px) {
            .wrap {
              padding-top: 60px;
            }
            .buttonCard .btn-vori {
              width: 200px;
              text-align: center;
              background-color: #14a248;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .buttonCard button {
              width: 200px;
            }
          }

          /* ======== POST-SAVE MESSAGE ========== */
          .wrap .personContent {
            width: 90%;
            margin: 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            position: relative;
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

          /* ========= 頭像照片 =========== */
          .wrap .questionCard {
            width: 80%;
            min-height: 270px;
            padding: 30px 20px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            margin-top: 40px;
            border-radius: 0px;
            background: #fff;
          }

          .questionCard h2 {
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
          .bigHead #savePhoto {
            background-color: #ddd;
            color: #888;
            border: 1px solid #ddd;
            height: 40px;
            margin: 0px auto;
            width: 130px;
            margin-left: 5px;
          }
          .bigHead #savePhoto:active,
          .bigHead #savePhoto:focus {
            outline: none;
          }

          .bigHead #imagePreview {
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
            position: relative;
          }
          .bigHead #imagePreview img {
            position: absolute;
            height: 150px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
          }

          .bigHead #bin {
            margin: 4px 0px 0px 1px;
            height: 24px;
            width: 24px;
            cursor: pointer;
            position: relative;
            left: -42%;
            top: -43%;
            border-radius: 2px;
            background-color: #484848;
            background-image: url(./../../Images/bin.png);
            background-position: center;
            background-size: 12px;
            background-repeat: no-repeat;
            z-index: 200;
          }

          .bigHead #bin:hover {
            background-color: #2b2b2b;
            cursor: pointer;
          }

          .bigHead #bin:active,
          .bigHead #bin:focus {
            border: none;
            background-color: #2b2b2b;
          }

          .bigHead .rp {
            margin-left: 50px;
          }
          .bigHead .ex {
            margin-bottom: 16px;
            display: inline-block;
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

          .bigHead .buttonsEven {
            display: flex;
            justifycontent: space-evenly;
            width: 60%;
          }

          @media screen and (max-width: 768px) {
            .wrap .questionCard {
              margin: 90px 0px 0px;
              width: 100%;
            }

            .row .col-md-6:first-child {
              margin-bottom: 15px;
            }

            .bigHead .buttonsEven {
              display: block;
            }
            .bigHead #savePhoto {
              margin-left: 0px;
            }

            .bigHead {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
            }
            .bigHead > .rp {
              margin: 0 auto;
              text-align: center;
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
          }

          /* ============= PERSONAL DETAILS ============== */

          .personal_details {
            margin: 15px auto 25px;
            padding: 10px 210px;
          }

          .personal_details a {
            color: #14a248;
            display: block;
            margin-bottom: 10px;
          }

          .personal_details a:hover {
            color: #0e7132;
          }

          .personal_details h2 {
            color: #323232;
            font-weight: 500;
            font-size: 32px;
          }

          @media screen and (max-width: 768px) {
            .personal_details {
              margin: 25px auto;
              padding: 10px 100px;
              text-align: center;
            }
          }

          /* ============= QUESTION CARD ============== */
          .wrap .bottomQuestionCard,
          .wrap .middleQuestionCard {
            width: 80%;
            min-height: 325px;
            padding: 30px 20px;
            margin-top: 90px;
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

          .wrap .bottomQuestionCard h2,
          .wrap .middleQuestionCard h2 {
            position: absolute;
            font-size: 24px;
            font-weight: 500;
            transform: translate(0%, -260%);
            color: #323232;
          }
          .wrap .middleQuestionCard {
            min-height: 240px;
          }

          .middleQuestionCard .row {
            position: relative;
            top: 5%;
            width: 100%;
            left: 3%;
          }

          #email:disabled {
            background-color: #ebebeb;
          }

          input[type="text"]:invalid,
          input[type="date"]:invalid {
            border: 3px solid #14a248;
          }

          input[type="text"],
          input[type="date"],
          input[type="tel"],
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
            font-family: "Noto Sans TC", sans-serif;
          }

          .professionList {
            position: absolute;
            z-index: 2000;
            width: 93%;
            display: block;
          }
          .professionList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
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

          .surveyList {
            position: absolute;
            z-index: 2000;
            width: 94%;
            display: block;
          }
          .surveyList ul {
            position: relative;
            margin: 0px;
            padding: 0;
            width: 100%;
          }
          .surveyList ul li {
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
          .surveyList ul li:hover {
            background-color: white;
            border-left: 3px solid #14a248;
            padding-left: 17px;
          }
          .wrap .buttonCard {
            width: 80%;
            margin: 30px auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            border-radius: 0px;
            background: #fff;
            background-color: #f4f5f6;
          }

          .useCurrentButton {
            background-color: #14a248;
            color: white;
            font-weight: 800;
            width: 150px;
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

          .regCon .location > p {
            color: #777;
            font-size: 22px;
          }
          .regCon .location .bottomTips span {
            color: #2b2b2b;
            font-size: 14px;
            font-weight: 500;
          }
          .regCon .location .bottomTips p {
            color: #2b2b2b;
            margin: 10px auto;
            font-size: 16px;
            font-weight: 800;
          }

          @media screen and (max-width: 768px) {
            .wrap .bottomQuestionCard,
            .wrap .middleQuestionCard {
              margin: 90px 0px 0px;
              width: 100%;
            }
            .wrap .personContent {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
            }
            .wrap .buttonCard {
              width: 410px;
              margin: 25px auto;
            }
            .professionList {
              width: 95%;
            }
            .container {
              text-align: center;
            }
          }

          /* ======= INCOMPLETE PROFILE ALERT POP UP ======== */

          .backdrop {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: #3f3f3f;
            z-index: 100;
            opacity: 0.8;
            cursor: auto;
            z-index: 2000;
          }
          .alertCard {
            position: fixed;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            width: 1140px;
            padding: 28px 30px;
            display: -webkit-box;
            display: -ms-flexbox;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: 0px;
            background: rgba(255, 255, 255, 0.9);
            z-index: 2000;
          }
          .alertCard figure {
            position: relative;
            width: 100%;
            display: block;
          }

          .alertCard .cross {
            width: 25px;
            cursor: pointer;
            display: flex;
            align-items: left;
          }

          .alertCard h3 {
            color: #333;
            font-size: 38px;
            font-family: "Noto Sans TC", sans-serif;
            font-weight: 900;
            margin-bottom: 40px;
            text-align: center;
          }

          .alertCard p {
            color: #333;
            font-size: 22px;
            font-family: "Noto Sans TC", sans-serif;
            text-align: center;
          }

          @media screen and (max-width: 768px) {
            .alertCard {
              width: 500px;
              margin: 0 auto;
            }
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};
export default PersonalDetails;
