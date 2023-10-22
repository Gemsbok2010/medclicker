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

import LoggedInNavbar from "../components/LoggedInNavbar";
import Footer from "../components/Footer";

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

const ListingEdit = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2];
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.value);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [monStart, setMonStart] = useState("");
  const [monFinish, setMonFinish] = useState("");
  const [tueStart, setTueStart] = useState("");
  const [tueFinish, setTueFinish] = useState("");
  const [wedStart, setWedStart] = useState("");
  const [wedFinish, setWedFinish] = useState("");
  const [thuStart, setThuStart] = useState("");
  const [thuFinish, setThuFinish] = useState("");
  const [friStart, setFriStart] = useState("");
  const [friFinish, setFriFinish] = useState("");
  const [satStart, setSatStart] = useState("");
  const [satFinish, setSatFinish] = useState("");
  const [sunStart, setSunStart] = useState("");
  const [sunFinish, setSunFinish] = useState("");

  const [times] = useState([
    { title: "06:00", id: 1 },
    { title: "06:15", id: 2 },
    { title: "06:30", id: 3 },
    { title: "06:45", id: 4 },
    { title: "07:00", id: 5 },
    { title: "07:15", id: 6 },
    { title: "07:30", id: 7 },
    { title: "07:45", id: 8 },
    { title: "08:00", id: 9 },
    { title: "08:15", id: 10 },
    { title: "08:30", id: 11 },
    { title: "08:45", id: 12 },
    { title: "09:00", id: 13 },
    { title: "09:15", id: 14 },
    { title: "09:30", id: 15 },
    { title: "09:45", id: 16 },
    { title: "10:00", id: 17 },
    { title: "10:15", id: 18 },
    { title: "10:30", id: 19 },
    { title: "10:45", id: 20 },
    { title: "11:00", id: 21 },
    { title: "11:15", id: 22 },
    { title: "11:30", id: 23 },
    { title: "11:45", id: 24 },
    { title: "12:00", id: 25 },
    { title: "12:15", id: 26 },
    { title: "12:30", id: 27 },
    { title: "12:45", id: 28 },
    { title: "13:00", id: 29 },
    { title: "13:15", id: 30 },
    { title: "13:30", id: 31 },
    { title: "13:45", id: 32 },
    { title: "14:00", id: 33 },
    { title: "14:15", id: 34 },
    { title: "14:30", id: 35 },
    { title: "14:45", id: 36 },
    { title: "15:00", id: 37 },
    { title: "15:15", id: 38 },
    { title: "15:30", id: 39 },
    { title: "15:45", id: 40 },
    { title: "16:00", id: 41 },
    { title: "16:15", id: 42 },
    { title: "16:30", id: 43 },
    { title: "16:45", id: 44 },
    { title: "17:00", id: 45 },
    { title: "17:15", id: 46 },
    { title: "17:30", id: 47 },
    { title: "17:45", id: 48 },
    { title: "18:00", id: 49 },
    { title: "18:15", id: 50 },
    { title: "18:30", id: 51 },
    { title: "18:45", id: 52 },
    { title: "19:00", id: 53 },
    { title: "19:15", id: 54 },
    { title: "19:30", id: 55 },
    { title: "19:45", id: 56 },
    { title: "20:00", id: 57 },
    { title: "20:15", id: 58 },
    { title: "20:30", id: 59 },
    { title: "20:45", id: 60 },
    { title: "21:00", id: 61 },
    { title: "21:15", id: 62 },
    { title: "21:30", id: 63 },
    { title: "21:45", id: 64 },
    { title: "22:00", id: 65 },
    { title: "22:15", id: 66 },
    { title: "22:30", id: 67 },
    { title: "22:45", id: 68 },
    { title: "23:00", id: 69 },
    { title: "23:15", id: 70 },
    { title: "23:30", id: 71 },
    { title: "23:45", id: 72 },
    { title: "Times Variable", id: 73 },
  ]);

  const [professions, setProfessions] = useState("");
  const [airtravel, setAirtravel] = useState(false);
  const [roadtravel, setRoadtravel] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const [normal_rate, setNormalRate] = useState("");
  const [sat_rate, setSatRate] = useState("");
  const [sun_rate, setSunRate] = useState("");
  const [ph_rate, setPhRate] = useState("");
  const [payout, setPayout] = useState(0);
  const [monHr, setMonHr] = useState(0);
  const [tueHr, setTueHr] = useState(0);
  const [wedHr, setWedHr] = useState(0);
  const [thuHr, setThuHr] = useState(0);
  const [friHr, setFriHr] = useState(0);
  const [satHr, setSatHr] = useState(0);
  const [sunHr, setSunHr] = useState(0);
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
  const [isPaidLocum, setIsPaidLocum] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);

  const onConfirmDelete = () => {
    setBackdrop(true);
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  const onDelete = async (e) => {
    e.preventDefault();
    await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/listings/delete/" + list.slug,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          isDeletedJob: true,
          isActiveJob: false,
          caseId: list.caseId,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/listingManager");
        }
      });
  };

  const onSave = () => {
    setTimeout(function () {
      setAlert(false);
      setUpdateNote(false);
    }, 3000);
  };

  // ============ AIRPORT =============

  const [showAirport, setShowAirport] = useState(false);
  const [airport, setAirport] = useState("");

  const handleShowAirport = () => {
    setShowAirport(false);
  };

  const handleSetAirport = (e) => {
    const innerHTML = e.target.innerHTML;
    setAirport(innerHTML);
  };

  // ============= PUT ==============
  const onSubmit = (e) => {
    e.preventDefault();

    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const nanoId = user.nanoId;
    fetch(process.env.REACT_APP_BACKEND_URL + "api/listings/edit", {
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
        normal_rate,
        sat_rate,
        sun_rate,
        ph_rate,
        roadtravel,
        airtravel,
        airport,
        accommodation,
        about,
        startDate: list.startDate,
        finishDate: list.finishDate,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        monStart,
        tueStart,
        wedStart,
        thuStart,
        friStart,
        satStart,
        sunStart,
        monFinish,
        tueFinish,
        wedFinish,
        thuFinish,
        friFinish,
        satFinish,
        sunFinish,
        caseId: list.caseId,
        contractType: list.contractType,
        slug: list.slug,
        professions,
        payout: newPayout,
        monHr,
        tueHr,
        wedHr,
        thuHr,
        friHr,
        satHr,
        sunHr,
        todaysDate: list.todaysDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.invalid) {
          outPutErrorMessages(data.invalid);
        } else if (monday && !normal_rate) {
          outPutErrorMessages(
            `You have selected a <b>Monday</b> as a working day. Hence, a weekday hourly rate is mandatory.`
          );
        } else if (tuesday && !normal_rate) {
          outPutErrorMessages(
            `You have selected a <b>Tuesday</b> as a working day. Hence, a weekday hourly rate is mandatory.`
          );
        } else if (wednesday && !normal_rate) {
          outPutErrorMessages(
            `You have selected a <b>Wednesday</b> as a working day. Hence, a weekday hourly rate is mandatory.`
          );
        } else if (thursday && !normal_rate) {
          outPutErrorMessages(
            `You have selected a <b>Thursday</b> as a working day. Hence, a weekday hourly rate is mandatory.`
          );
        } else if (friday && !normal_rate) {
          outPutErrorMessages(
            `You have selected a <b>Friday</b> as a working day. Hence, a weekday hourly rate is mandatory.`
          );
        } else if (saturday && !sat_rate) {
          outPutErrorMessages(
            `You have selected a <b>Saturday</b> as a working day. Hence, a weekday hourly rate is mandatory.`
          );
        } else if (sunday && !sun_rate) {
          outPutErrorMessages(
            `You have selected a <b>Sunday</b> as a working day. Hence, a weekday hourly rate is mandatory.`
          );
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
      .get(
        process.env.REACT_APP_BACKEND_URL + "api/listings/Ad_details/" + slug
      )
      .then((response) => {
        if (response.status === 200) {
          setList(response.data.listing);

          setProfessions(response.data.listing.professions);
          setMonday(response.data.listing.monday);
          setTuesday(response.data.listing.tuesday);
          setWednesday(response.data.listing.wednesday);
          setThursday(response.data.listing.thursday);
          setFriday(response.data.listing.friday);
          setSaturday(response.data.listing.saturday);
          setSunday(response.data.listing.sunday);
          setMonStart(response.data.listing.monStart);
          setTueStart(response.data.listing.tueStart);
          setWedStart(response.data.listing.wedStart);
          setThuStart(response.data.listing.thuStart);
          setFriStart(response.data.listing.friStart);
          setSatStart(response.data.listing.satStart);
          setSunStart(response.data.listing.sunStart);
          setMonFinish(response.data.listing.monFinish);
          setTueFinish(response.data.listing.tueFinish);
          setWedFinish(response.data.listing.wedFinish);
          setThuFinish(response.data.listing.thuFinish);
          setFriFinish(response.data.listing.friFinish);
          setSatFinish(response.data.listing.satFinish);
          setSunFinish(response.data.listing.sunFinish);
          setNormalRate(response.data.listing.normal_rate);
          setSatRate(response.data.listing.sat_rate);
          setSunRate(response.data.listing.sun_rate);
          setPhRate(response.data.listing.ph_rate);
          setAirtravel(response.data.listing.airtravel);
          setAirport(response.data.listing.airport);
          setAbout(response.data.listing.about);
          setCountry(response.data.listing.country);
          setPostalCode(response.data.listing.postalCode);
          setState(response.data.listing.state);
          setSuburb(response.data.listing.suburb);
          setStreet(response.data.listing.street);
          setStreetNo(response.data.listing.streetNo);
          setLatitude(response.data.listing.latitude);
          setLongitude(response.data.listing.longitude);
          setPayout(response.data.listing.payout);
          setMonHr(response.data.listing.monHr);
          setTueHr(response.data.listing.tueHr);
          setWedHr(response.data.listing.wedHr);
          setThuHr(response.data.listing.thuHr);
          setFriHr(response.data.listing.friHr);
          setSatHr(response.data.listing.satHr);
          setSunHr(response.data.listing.sunHr);
          setIsPaidLocum(response.data.listing.isPaidLocum);
        }
      });
  }, []);

  // ========== ERROR MESSAGE ===============

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function outPutErrorMessagesTimes(day) {
    setAlert(true);
    window.scrollTo({
      top: 110,
      behavior: "smooth",
    });
    const errorMessage = `Finish Time on ${day} cannot be earlier than the Start Time. Please correct the error.`;
    setAlertMsg(errorMessage);
  }

  function outPutErrorMessages(error) {
    setAlert(true);
    window.scrollTo({
      top: 110,
      behavior: "smooth",
    });
    const errorMessage = error;
    setAlertMsg(errorMessage);
  }

  // ========= SALARY CALCULATIONS ==============
  let weekdayPay =
    normal_rate === ""
      ? 0
      : (monHr + tueHr + wedHr + thuHr + friHr) * parseInt(normal_rate);

  let saturdayPay = sat_rate === "" ? 0 : satHr * parseInt(sat_rate);

  let sundayPay = sun_rate === "" ? 0 : sunHr * parseInt(sun_rate);
  let newPayout = sundayPay + saturdayPay + weekdayPay;

  // ========= HOURS OF WORK CALCULATIONS ===========

  const handleCalcMon = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = parseInt(monStart.split(":")[0]);

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = monStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }

    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Monday");
      setMonFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Monday");
      setMonFinish("");
    } else {
      setAlert(false);
    }
    setMonHr(hr + min);
  };

  const handleCalcTue = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = tueStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = tueStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }

    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Tuesday");
      setTueFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Tuesday");
      setTueFinish("");
    } else {
      setAlert(false);
    }
    setTueHr(hr + min);
  };

  const handleCalcWed = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = wedStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = wedStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Wednesday");
      setWedFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Wednesday");
      setWedFinish("");
    } else {
      setAlert(false);
    }
    setWedHr(hr + min);
  };

  const handleCalcThu = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = thuStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = thuStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Thursday");
      setThuFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Thursday");
      setThuFinish("");
    } else {
      setAlert(false);
    }
    setThuHr(hr + min);
  };

  const handleCalcFri = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = friStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = friStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Friday");
      setFriFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Friday");
      setFriFinish("");
    } else {
      setAlert(false);
    }
    setFriHr(hr + min);
  };

  const handleCalcSat = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = satStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = satStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Saturday");
      setSatFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Saturday");
      setSatFinish("");
    } else {
      setAlert(false);
    }
    setSatHr(hr + min);
  };

  const handleCalcSun = (e) => {
    const { value } = e.target;
    const finishHr = value.split(":")[0];
    const startHr = sunStart.split(":")[0];

    const differenceHr = finishHr - startHr;

    var hr = differenceHr;

    const finishMin = value.split(":")[1] / 60;
    const startMin = sunStart.split(":")[1] / 60;

    const differenceMin = finishMin - startMin;
    const minInPercentage = finishMin - startMin;

    var min = Math.abs(minInPercentage);

    if (differenceMin < 0) {
      hr = hr - 1;
      min = 1 - startMin + finishMin;
    }
    if (differenceHr < 0) {
      outPutErrorMessagesTimes("Sunday");
      setSunFinish("");
    } else if (differenceHr === 0 && differenceMin < 0) {
      outPutErrorMessagesTimes("Sunday");
      setSunFinish("");
    } else {
      setAlert(false);
    }

    setSunHr(hr + min);
  };

  // ========= SALARY CALCULATIONS ==============

  // if (monHr === "") {
  //   monHr = 0;
  // } else {
  //   monHr = monHr * parseInt(normal_rate);
  // }

  // if (tueHr === "") {
  //   tueHr = 0;
  // } else {
  //   tueHr = tueHr * parseInt(normal_rate);
  // }

  // if (wedHr === "") {
  //   wedHr = 0;
  // } else {
  //   wedHr = wedHr * parseInt(normal_rate);
  // }

  // if (thuHr === "") {
  //   thuHr = 0;
  // } else {
  //   thuHr = thuHr * parseInt(normal_rate);
  // }

  // if (friHr === "") {
  //   friHr = 0;
  // } else {
  //   friHr = friHr * parseInt(normal_rate);
  // }

  // if (satHr === "") {
  //   satHr = 0;
  // } else {
  //   satHr = satHr * parseInt(sat_rate);
  // }

  // if (sunHr === "") {
  //   sunHr = 0;
  // } else {
  //   sunHr = sunHr * parseInt(sun_rate);
  // }

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
          <title>Edit Locum Ad | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>
        <LoggedInNavbar />

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
            <form action="" onSubmit={onSubmit}>
              <div className="flexwrap">
                <div className="groupThree">
                  <div className="checkBoxGroup">
                    <div className="container-rate">
                      <h2>The Offer</h2>
                    </div>
                  </div>
                  <div className="container-rate">
                    <div className="align">
                      <input
                        style={{ marginBottom: "10px" }}
                        type="text"
                        id="normal_rate"
                        className="form-control5"
                        placeholder="Weekday hourly rate"
                        autoComplete="off"
                        maxLength="4"
                        minLength="1"
                        disabled
                        defaultValue={normal_rate}
                      />
                    </div>
                    <div className="align">
                      <input
                        style={{ marginBottom: "10px" }}
                        type="text"
                        id="sat_rate"
                        className="form-control5"
                        placeholder="Saturday hourly rate"
                        maxLength="4"
                        minLength="1"
                        autoComplete="off"
                        disabled
                        defaultValue={sat_rate}
                      />
                    </div>
                    <div className="align">
                      <input
                        style={{ marginBottom: "10px" }}
                        type="text"
                        id="sun_rate"
                        className="form-control5"
                        placeholder="Sunday hourly rate"
                        maxLength="4"
                        minLength="1"
                        autoComplete="off"
                        disabled
                        defaultValue={sun_rate}
                      />
                    </div>
                    <div className="align">
                      <input
                        style={{ marginBottom: "10px" }}
                        type="text"
                        id="sun_rate"
                        className="form-control5"
                        placeholder="Public Holiday hourly rate"
                        maxLength="4"
                        minLength="1"
                        autoComplete="off"
                        disabled
                        defaultValue={ph_rate}
                      />
                    </div>

                    <div className="align-other">
                      {airtravel ? (
                        <>
                          <input
                            id="a"
                            type="checkbox"
                            checked={airtravel}
                            onChange={(e) => {
                              setAirtravel(e.target.checked);
                            }}
                          />
                          <label htmlFor="a">Air Travel Included</label>
                        </>
                      ) : (
                        <>
                          <input
                            id="a"
                            type="checkbox"
                            checked={airtravel}
                            onChange={(e) => {
                              setAirtravel(e.target.checked);
                              setAirport("");
                            }}
                          />
                          <label htmlFor="a">Air Travel Included</label>
                        </>
                      )}
                      {roadtravel ? (
                        <>
                          <input
                            id="b"
                            type="checkbox"
                            checked={roadtravel}
                            onChange={(e) => {
                              setRoadtravel(e.target.checked);
                            }}
                          />
                          <label htmlFor="b">Road Transport Included</label>
                        </>
                      ) : (
                        <>
                          <input
                            id="b"
                            type="checkbox"
                            checked={roadtravel}
                            onChange={(e) => {
                              setRoadtravel(e.target.checked);
                            }}
                          />
                          <label htmlFor="b">Road Transport Included</label>
                        </>
                      )}

                      {accommodation ? (
                        <>
                          <input
                            id="c"
                            type="checkbox"
                            checked={accommodation}
                            onChange={(e) => {
                              setAccommodation(e.target.checked);
                            }}
                          />
                          <label htmlFor="c">Accommodation Included</label>
                        </>
                      ) : (
                        <>
                          <input
                            id="c"
                            type="checkbox"
                            checked={false}
                            onChange={(e) => {
                              setAccommodation(e.target.checked);
                            }}
                          />
                          <label htmlFor="c">Accommodation Included</label>
                        </>
                      )}
                    </div>

                    {airtravel ? (
                      <div id="container">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control-lg"
                          id="whichAirport"
                          name="profession"
                          placeholder="Select Airport"
                          value={airport ? airport : ""}
                          onFocus={() => {
                            setShowAirport(true);
                          }}
                          onChange={() => {
                            setShowAirport(true);
                          }}
                        />
                        {showAirport ? (
                          <div className="airportList">
                            <ul>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in AU
                              </li>

                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in NSW
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in QLD
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in VIC
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in VIC and TAS
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in TAS
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in NT
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in SA
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                anywhere in WA
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Adelaide (ADL) Only
                              </li>

                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Brisbane (BNE) Only
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Cairns (CNS) Only
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Canberra (CBR) Only
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Darwin (DRW) Only
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Hobart (HBA) Only
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Melbourne (MEL) Only
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Perth (PER) Only
                              </li>
                              <li
                                onClick={(e) => {
                                  handleSetAirport(e);
                                  handleShowAirport();
                                }}
                              >
                                from Sydney (SYD) Only
                              </li>
                            </ul>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="groupFour">
                  <div className="checkBoxGroup">
                    <div className="container-title">
                      <h2>Start and Finish Dates</h2>
                    </div>
                  </div>
                  <div className="container-times">
                    <div className="container-date">
                      <input
                        id="calstart"
                        type="text"
                        disabled="disabled"
                        defaultValue={list.startDate}
                      />
                      <input
                        id="calfinish"
                        type="text"
                        disabled="disabled"
                        defaultValue={list.finishDate}
                      />
                    </div>
                  </div>
                  <div className="container-times">
                    <div className="row">
                      <div className="align-days">
                        <input
                          id="mon"
                          checked={monday ? true : false}
                          onChange={(e) => {
                            setMonday(e.target.checked);
                            setMonStart("");
                            setMonFinish("");
                            setMonHr("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="mon">Mon</label>

                        <input
                          id="tue"
                          checked={tuesday ? true : false}
                          onChange={(e) => {
                            setTuesday(e.target.checked);
                            setTueStart("");
                            setTueFinish("");
                            setTueHr("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="tue">Tue</label>

                        <input
                          id="wed"
                          checked={wednesday ? true : false}
                          onChange={(e) => {
                            setWednesday(e.target.checked);
                            setWedStart("");
                            setWedFinish("");
                            setWedHr("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="wed">Wed</label>

                        <input
                          id="thu"
                          checked={thursday ? true : false}
                          onChange={(e) => {
                            setThursday(e.target.checked);
                            setThuStart("");
                            setThuFinish("");
                            setThuHr("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="thu">Thu</label>

                        <input
                          id="fri"
                          checked={friday ? true : false}
                          onChange={(e) => {
                            setFriday(e.target.checked);
                            setFriStart("");
                            setFriFinish("");
                            setFriHr("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="fri">Fri</label>

                        <input
                          id="sat"
                          checked={saturday ? true : false}
                          onChange={(e) => {
                            setSaturday(e.target.checked);
                            setSatStart("");
                            setSatFinish("");
                            setSatHr("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="sat">Sat</label>
                        <input
                          id="sun"
                          checked={sunday ? true : false}
                          onChange={(e) => {
                            setSunday(e.target.checked);
                            setSunStart("");
                            setSunFinish("");
                            setSunHr("");
                          }}
                          type="checkbox"
                          name="toppings"
                        />
                        <label htmlFor="sun">Sun</label>
                      </div>
                      <div className="time-clock">
                        {monday ? (
                          <select
                            className="form-cont"
                            value={monStart}
                            onChange={(e) => {
                              setMonStart(e.target.value);
                            }}
                            onFocus={() => {
                              setMonFinish("");
                            }}
                          >
                            <option>{monStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {tuesday ? (
                          <select
                            className="form-cont"
                            value={tueStart}
                            onChange={(e) => {
                              setTueStart(e.target.value);
                            }}
                            onFocus={() => {
                              setTueFinish("");
                            }}
                          >
                            <option>{tueStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {wednesday ? (
                          <select
                            className="form-cont"
                            value={wedStart}
                            onChange={(e) => {
                              setWedStart(e.target.value);
                            }}
                            onFocus={() => {
                              setWedFinish("");
                            }}
                          >
                            <option>{wedStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {thursday ? (
                          <select
                            className="form-cont"
                            value={thuStart}
                            onChange={(e) => {
                              setThuStart(e.target.value);
                            }}
                            onFocus={() => {
                              setThuFinish("");
                            }}
                          >
                            <option>{thuStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {friday ? (
                          <select
                            className="form-cont"
                            value={friStart}
                            onChange={(e) => {
                              setFriStart(e.target.value);
                            }}
                            onFocus={() => {
                              setFriFinish("");
                            }}
                          >
                            <option>{friStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {saturday ? (
                          <select
                            className="form-cont"
                            value={satStart}
                            onChange={(e) => {
                              setSatStart(e.target.value);
                            }}
                            onFocus={() => {
                              setSatFinish("");
                            }}
                          >
                            <option>{satStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {sunday ? (
                          <select
                            className="form-cont"
                            value={sunStart}
                            onChange={(e) => {
                              setSunStart(e.target.value);
                            }}
                            onFocus={() => {
                              setSunFinish("");
                            }}
                          >
                            <option>{sunStart}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                      </div>
                      <div className="time-clock">
                        {monStart !== "" ? (
                          <select
                            value={monFinish}
                            onChange={(e) => {
                              setMonFinish(e.target.value);
                              handleCalcMon(e);
                            }}
                            className="form-cont"
                          >
                            <option>{monFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {tueStart !== "" ? (
                          <select
                            value={tueFinish}
                            onChange={(e) => {
                              setTueFinish(e.target.value);
                              handleCalcTue(e);
                            }}
                            className="form-cont"
                          >
                            <option>{tueFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {wedStart !== "" ? (
                          <select
                            value={wedFinish}
                            onChange={(e) => {
                              setWedFinish(e.target.value);
                              handleCalcWed(e);
                            }}
                            className="form-cont"
                          >
                            <option>{wedFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {thuStart !== "" ? (
                          <select
                            value={thuFinish}
                            onChange={(e) => {
                              setThuFinish(e.target.value);
                              handleCalcThu(e);
                            }}
                            className="form-cont"
                          >
                            <option>{thuFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}

                        {friStart !== "" ? (
                          <select
                            value={friFinish}
                            onChange={(e) => {
                              setFriFinish(e.target.value);
                              handleCalcFri(e);
                            }}
                            className="form-cont"
                          >
                            <option>{friFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {satStart !== "" ? (
                          <select
                            value={satFinish}
                            onChange={(e) => {
                              setSatFinish(e.target.value);
                              handleCalcSat(e);
                            }}
                            className="form-cont"
                          >
                            <option>{satFinish}</option>
                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                        {sunStart !== "" ? (
                          <select
                            value={sunFinish}
                            onChange={(e) => {
                              setSunFinish(e.target.value);
                              handleCalcSun(e);
                            }}
                            className="form-cont"
                          >
                            <option>{sunFinish}</option>

                            {times.map((time) => {
                              return (
                                <option key={time.id}>{time.title}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <select disabled className="form-cont"></select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      {isPaidLocum === false ? (
                        latitude && longitude ? (
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
                        )
                      ) : (
                        <input
                          required
                          autoComplete="off"
                          type="text"
                          id="search"
                          style={{ width: "100%" }}
                          disabled
                          defaultValue={`${streetNo} ${street}, ${suburb} ${state} ${postalCode}`}
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
                {isPaidLocum === false ? (
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

                {isPaidLocum === false ? (
                  monFinish ||
                  tueFinish ||
                  wedFinish ||
                  thuFinish ||
                  friFinish ||
                  satFinish ||
                  sunFinish ? (
                    normal_rate || sat_rate || sun_rate || ph_rate ? (
                      airtravel && airport === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : monday && monFinish === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : tuesday && tueFinish === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : wednesday && wedFinish === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : thursday && thuFinish === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : friday && friFinish === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : saturday && satFinish === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : sunday && sunFinish === "" ? (
                        <input disabled className="save-btn" value=" Save" />
                      ) : (
                        <input
                          type="submit"
                          className="save-btn"
                          value="Save"
                          onClick={onSave}
                        />
                      )
                    ) : (
                      <input
                        disabled
                        type="button"
                        className="save-btn"
                        value=" Save"
                      />
                    )
                  ) : (
                    <input
                      disabled
                      type="button"
                      className="save-btn"
                      value="Save"
                    />
                  )
                ) : (
                  <input
                    disabled
                    type="button"
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
          <Footer />
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
          height: 45%;
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
          margin-top: 90px;
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
          text-align: center;
          font-weight: 800;
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

        /* ============= GROUP THREE (我的條件) ============== */
        .groupThree {
          margin-top: 30px;
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
        .container-rate {
          width: 100%;
          left: 0%;
          padding: 0px 20px;
        }
        .container-rate h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        .align-other {
          margin: 0px;
          width: 120px;
        }

        #comlength select {
          margin: 0px 5px 15px;
          display: inline-block;
          width: 200px !important;
          height: 32px;
          padding: 3px 5px;
          font-size: 14px;
          font-family: sans-serif;
          border-radius: 0px;
          color: #2b2b2b;
          outline: none;
          background-color: white;
          position: relative;
          border-color: #ccc;
          z-index: 500;
          top: -88px;
          left: 15px;
          border: 1px solid #ebebeb;
          transform: translate(72px, -8px);
        }
        .align-other input[type="checkbox"] + label {
          height: 20px;
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-family: sans-serif;
          font-weight: 500;
          float: left;
          display: block;
          width: 185px;
          color: #2b2b2b;
          margin: 7px 0px 2px 30px;
        }

        .align-other input[type="checkbox"] + label::before {
          content: " ";
          position: relative;
          left: -9px;
          top: 5px;
          width: 20px;
          height: 20px;
          display: inline-block;
          background: white;
          border-radius: 4px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          color: #2b2b2b;
        }

        .align-other input[type="checkbox"] + label::after {
          content: " ";
          position: absolute;
          left: -13px;
          top: 1px;
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
          color: #2b2b2b;
        }

        .align-other input[type="checkbox"]:checked + label::after {
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 1;
        }
        @media only screen and (min-width: 768px) {
          .groupThree {
            width: 480px;
          }
        }

        /* ================= GROUP FOUR ================= */
        .groupFour {
          margin-top: 30px;
          width: 100%;
          height: 420px;
          border: 1px solid #ebebeb;
          position: relative;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .container-times {
          width: 100%;
          left: 0%;
          padding: 0px 20px 0px;
        }
        .container-times h2 {
          font-weight: 800;
          font-size: 22px;
          width: 100%;
          margin-top: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ebebeb;
          color: #2b2b2b;
        }

        .day_flex {
          display: -webkit-box;
          display: -ms-flexbox;
          display: block;
          -ms-flex-pack: distribute;
          justify-content: space-around;
          margin: 33px 0px 1px 0px;
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
        input[type="checkbox"] {
          opacity: 0;
          float: left;
          display: block;
        }

        .align-days {
          margin: 0px;
          width: 120px;
        }

        .align-days input[type="checkbox"] + label {
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-family: sans-serif;
          font-weight: 500;
          margin: 7px 0px 2px 30px;
          width: 105px;
          display: block;
          color: #2b2b2b;
          float: left;
          height: 20px;
        }

        .align-days input[type="checkbox"] + label::before {
          content: " ";
          position: relative;
          left: -7px;
          top: 5px;
          width: 20px;
          height: 20px;
          display: inline-block;
          background: white;
          border-radius: 4px;
          -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .align-days input[type="checkbox"] + label::after {
          content: " ";
          position: absolute;
          left: -11px;
          top: 1px;
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

        .align-days input[type="checkbox"]:checked + label::after {
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 1;
        }

        .container-times .form-cont {
          margin: 7px 16px 18px 0px;
          display: block;
          width: 80px;
          height: 24px;
          font-size: 14px;
          padding: 2px 8px;
          outline: none;
          background-color: white;
          border-radius: 0px;
          border: 1px solid #ebebeb;
        }
        .time-clock {
          margin: 18px 0px 0px 15px;
        }
        .container-times .form-cont:disabled {
          background-color: #e9ecef;
        }

        @media only screen and (min-width: 768px) {
          .groupFour {
            width: 480px;
            margin-left: 28px;
          }
          .container-times .form-cont {
            margin: 7px 46px 18px 0px;
            width: 85px;
          }
          .container-times > .container-date {
            width: 500px;
            padding-left: 20px;
            padding-right: 20px;
          }

          .container-times input[type="text"] {
            padding: 7px 10px 7px 18px;
            width: 200px;
            font-size: 14px;
            margin-right: 25px;
          }
          .container-times h2 {
            width: 440px;
          }
          .container-times {
            width: 480px;
          }
          .time-clock {
            margin: 18px 0px 0px 25px;
          }
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

        /* ============= GROUP SEVEN (理想上課地點) ============== */

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
            margin-top: 42px;
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

export default ListingEdit;
