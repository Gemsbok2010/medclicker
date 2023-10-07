import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const LocumAgreement = () => {
  const { pathname } = useLocation();

  const caseId = pathname.split("/")[2];
  const [agreement, setAgreement] = useState([]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [locum, setLocum] = useState([]);

  const dt = new Date();
  const thisyear = dt.getFullYear();

  useEffect(() => {
    // ============ PROFILE DATA ===========
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "api/applications/contract/" +
          caseId
      )
      .then((response) => {
    
        if (response.status === 200) {
          setAgreement(response.data.caseId);
          setList(response.data.list);
          setUser(response.data.user);
          setLocum(response.data.locum);
        }
      });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Agreement | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div
          className="top-container"
          style={{
            display: "flex",
            justifyContent: "left",
            flexDirection: "row",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "1000px",
              height: "1406px",
              margin: "0px auto",
              backgroundColor: "white",
              position: "relative",
              border: "none",
              padding: "0px",
              display: "flex",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                padding: "80px 0px 60px",
                height: "100%",
                width: "350px",
                position: "relative",
                display: "inline",
                background: "#eeebeb",
                boxSizing: "borderBox",
              }}
            >
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  width: "100%",
                  top: "0px",
                  boxSizing: "border-box",
                }}
              >
                <img
                  style={{
                    boxSizing: "border-box",
                    verticalAlign: "middle",
                    border: "0",
                    transform: "translateX(0%)",
                  }}
                  src="/images/medclicker.png"
                  alt="Medclicker LOGO"
                  width="180px"
                />
              </div>

              <div
                style={{
                  position: "relative",
                  padding: "5px 46px 0px 50px",
                  top: "14%",
                  textAlign: "left",
                  backgroundColor: "#eeebeb",
                }}
              >
                <h2
                  style={{
                    color: "#333",
                    fontSize: "16px",
                    marginBottom: "5px",
                    fontWeight: "500",
                    lineHeight: "1.1",
                    boxSizing: "borderBox",
                    marginTop: "0px",
                  }}
                >
                  EMPLOYER DETAILS
                </h2>
                <p
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 10px",
                    marginBottom: "5px",
                  }}
                >
                  {user.firstName} {user.lastName}
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 10px",
                    marginBottom: "5px",
                  }}
                >
                  {user.streetNo} {user.street}
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 10px",
                    marginBottom: "5px",
                  }}
                >
                  {user.suburb}
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 10px",
                    marginBottom: "5px",
                  }}
                >
                  {user.state} {user.postalCode}
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 10px",
                    marginBottom: "5px",
                  }}
                >
                  Australia
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 10px",
                    marginBottom: "5px",
                  }}
                >
                  Mobile: {user.phone}
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "16px",
                    fontWeight: "500",
                    margin: "0 0 10px",
                    marginBottom: "5px",
                  }}
                >
                  Email: {user.email}
                </p>
              </div>

              <div
                className="copyright"
                style={{
                  position: "absolute",
                  padding: "5px 46px 10px 50px",
                  bottom: "0%",
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    marginTop: "1px",
                    fontWeight: "500",
                    fontSize: "13px",
                    marginBottom: "5px",
                    margin: "0 0 10px",
                    color: "#777",
                  }}
                >
                  © {thisyear} Orange Tech Pty Ltd.
                </p>
                <p
                  style={{
                    marginTop: "1px",
                    fontWeight: "500",
                    fontSize: "13px",
                    marginBottom: "5px",
                    margin: "0 0 10px",
                    color: "#777",
                  }}
                >
                  {" "}
                  ABN 49 649 839 609. All Rights Reserved
                </p>
              </div>
            </div>
            <div
              className="main"
              style={{
                boxSizing: "border-box",
                padding: "30px 35px 20px",
                display: "inline-block",
                width: "650px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  boxSizing: "border-box",
                  top: "0%",
                  textAlign: "left",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#333",
                    fontFamily: "sans-serif",
                    boxSizing: "border-box",
                  }}
                >
                  AGREEMENT FOR
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#333",
                      fontFamily: "sans-serif",
                      boxSizing: "border-box",
                    }}
                  >
                    {agreement.firstName} {agreement.lastName}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    color: "#da4236",
                    fontWeight: "800",
                    border: "2px solid #da4236",
                    padding: "0px 10px",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                >
                  Accepted
                </div>
              </div>
              <hr
                style={{
                  height: "0",
                  marginTop: "20px",
                  marginBottom: "20px",
                  border: "0",
                  boxSizing: "content-box",
                  borderTop: "1px solid #eee",
                }}
              />
              <div
                style={{
                  minHeight: "995px",
                  position: "relative",
                  textAlign: "left",
                  boxSizing: "border-box",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    position: "relative",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        color: "#011b58",
                        borderBottom: "1px solid #eee",
                        height: "40px",
                      }}
                    >
                      <th
                        style={{
                          padding: "0",
                          textAlign: "left",
                          fontWeight: "900",
                        }}
                      >
                        Employment Details
                      </th>
                      <th style={{ padding: "0", textAlign: "left" }}></th>
                      <th style={{ padding: "0", textAlign: "left" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{ borderBottom: "1px solid #eee", height: "40px" }}
                    >
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Case ID
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {agreement.caseId}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Date Issued
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {agreement.createdAt
                          ? agreement.createdAt.split("T")[0]
                          : ""}
                      </td>
                    </tr>

                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Work Address
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {list.streetNo} {list.street}, {list.suburb}{" "}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        State
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {list.state} {list.postalCode}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table
                  style={{
                    width: "100%",
                    position: "relative",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        color: "#011b58",
                        borderBottom: "1px solid #eee",
                        height: "40px",
                      }}
                    >
                      <th
                        style={{
                          padding: "0",
                          textAlign: "left",
                          fontWeight: "900",
                        }}
                      >
                        {list.professions} Locum Details
                      </th>
                      <th style={{ padding: "0", textAlign: "left" }}></th>
                      <th style={{ padding: "0", textAlign: "left" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{ borderBottom: "1px solid #eee", height: "40px" }}
                    >
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Locum Name
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {agreement.firstName} {agreement.lastName}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Phone
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {agreement.phone}
                      </td>
                    </tr>
                    <tr
                      style={{ borderBottom: "1px solid #eee", height: "40px" }}
                    >
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Email
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {agreement.email}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Address
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {agreement.streetNo} {agreement.street},{" "}
                        {agreement.suburb}
                      </td>
                    </tr>

                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        State
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          borderBottom: "1px solid #eee",
                          padding: "0",
                          paddingRight: "5px",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {agreement.state} {agreement.postalCode}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        AHPRA
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {locum.ahpra}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table
                  style={{
                    width: "100%",
                    position: "relative",
                    borderSpacing: "0",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        color: "#011b58",
                        borderBottom: "1px solid #eee",
                        height: "40px",
                      }}
                    >
                      <th
                        style={{
                          padding: "0",
                          textAlign: "left",
                          fontWeight: "900",
                        }}
                      >
                        The Offer
                      </th>
                      <th style={{ padding: "0", textAlign: "left" }}></th>
                      <th style={{ padding: "0", textAlign: "left" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{ borderBottom: "1px solid #eee", height: "40px" }}
                    >
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Weekday Rates
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {list.normal_rate !== undefined
                          ? list.normal_rate !== ""
                            ? `AUD ${list.normal_rate}`
                            : "Negotiable"
                          : ""}{" "}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Saturday Rates
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {list.sat_rate !== undefined
                          ? list.sat_rate !== ""
                            ? `AUD ${list.sat_rate}`
                            : "Negotiable"
                          : ""}
                      </td>
                    </tr>

                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Sunday Rates
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {list.sun_rate !== undefined
                          ? list.sun_rate !== ""
                            ? `AUD ${list.sun_rate}`
                            : "Negotiable"
                          : ""}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Public Holiday Rates
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {list.ph_rate !== undefined
                          ? list.ph_rate !== ""
                            ? `AUD ${list.ph_rate}`
                            : "Negotiable"
                          : ""}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Air Travel Reimbursed
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {list.airtravel === true ? "Included" : "Not included"}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Air Travel Airport from
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {list.airport ? list.airport : "Not Applicable"}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Road Travel Reimbursed
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                        }}
                      >
                        {list.roadtravel === true ? "Included" : "Not included"}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Accommodation Included
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {list.accommodation === true
                          ? "Included"
                          : "Not included"}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingLeft: "5px",
                        }}
                      >
                        Start Date
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          paddingRight: "5px",
                          textAlign: "right",
                          fontWeight: "900",
                        }}
                      >
                        {agreement.available_start}
                      </td>
                    </tr>
                    <tr style={{ height: "40px" }}>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          paddingLeft: "5px",
                        }}
                      >
                        Finish Date
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingRight: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                          textAlign: "right",
                          fontWeight: "900",
                        }}
                      >
                        {agreement.available_finish}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <style jsx="true">{`
          body {
            box-sizing: border-box;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.42857143;
            color: #333;
          }

          .top-container {
            display: flex;
            justify-content: left;
            flex-direction: row;
            box-sizing: border-box;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default LocumAgreement;
