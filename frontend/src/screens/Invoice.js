import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Invoice = () => {
  const { pathname } = useLocation();

  const invoiceNumber = pathname.split("/")[2]
  const [invoice, setInvoice] = useState([]);
  const [gst, setGst] = useState("");
  const [total, setTotal] = useState("");
  const [nakedFee, setNakedFee] = useState("");

  const dt = new Date();
  const thisyear = dt.getFullYear();

  useEffect(() => {
    // ============ PROFILE DATA ===========
    axios
      .get("http://localhost:4000/api/payment/invoicenumber/" + invoiceNumber)
      .then((response) => {
        if (response.status === 200) {
          setInvoice(response.data.invoice);
          setTotal(response.data.total);
          setGst(response.data.gst);
          setNakedFee(response.data.nakedFee);
        }
      });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Invoice | Medclicker</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
          <meta name="description" content="Medclicker" />
        </Helmet>

        <div className="top-container">
          <div className="top-container-child">
            <div className="top-container-div">
              <div className="top-container-div-div">
                <img
                  src="/images/medclicker.png"
                  alt="Medclicker LOGO"
                  width="180px"
                />
              </div>

              <div className="amount-payable ">
                <h2>AMOUNT PAYABLE</h2>
                <h2>AUD 0.00</h2>
              </div>

              <div className="bill-to">
                <h2>BILLED TO</h2>
                <p>
                  {invoice.firstName} {invoice.lastName}
                </p>
                <p>
                  {invoice.streetNo} {invoice.street}{" "}
                </p>
                <p>{invoice.suburb} </p>
                <p>
                  {invoice.state} {invoice.postalCode}{" "}
                </p>
                <p>{invoice.country}</p>
                <p>Mobile: {invoice.phone}</p>
                <p>Email: {invoice.email}</p>
              </div>
              <div className="invoice-no">
                <h2>INVOICE DETAILS</h2>
                <p>
                  Tax Invoice: <b>{invoice.invoiceNumber}</b>
                </p>
                <p>
                  Date Issued: <b>{invoice.dateIssued}</b>
                </p>
                <p>
                  Date Due: <b>{invoice.dateIssued}</b>
                </p>
              </div>

              <div className="copyright">
                <p>© {thisyear} Orange Tech Pty Ltd.</p>
                <p> ABN 49 649 839 609. All Rights Reserved</p>
              </div>
            </div>
            <div className="main">
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
                <div className="tax-invoice">
                  TAX INVOICE
                  <div className="tax-invoice">{invoice.invoiceNumber}</div>
                </div>
                <div className="paid">PAID</div>
              </div>
              <hr />

              <div className="table-parent">
                <table>
                  <thead>
                    <tr
                      style={{
                        color: "#011b58",
                        borderBottom: "1px solid #eee",
                        height: "40px",
                      }}
                    >
                      <th style={{ padding: "0", textAlign: "left" }}>
                        Product Item/ Type
                      </th>
                      <th style={{ padding: "0", textAlign: "left" }}></th>
                      <th style={{ padding: "0", textAlign: "left" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="service-type">
                      <td>
                        {invoice.isPaidLocum
                          ? "Locum Service"
                          : "Standard Service"}{" "}
                        {invoice.professions}
                      </td>
                      <td></td>
                      <td>AUD {total}</td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          width: "140px",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingLeft: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      >
                        Product fee
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #eee",
                          width: "140px",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingLeft: "5px",
                          boxSizing: "border-box",
                          fontSize: "14px",
                        }}
                      >
                        AUD {nakedFee}
                      </td>
                    </tr>

                    <tr>
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
                          width: "140px",
                          padding: "0",
                          paddingLeft: "5px",
                          fontSize: "14px",
                        }}
                      >
                        GST
                      </td>
                      <td
                        style={{
                          boxSizing: "border-box",
                          borderBottom: "1px solid #eee",
                          padding: " 0",
                          paddingLeft: "5px",
                          fontSize: "14px",
                        }}
                      >
                        AUD {gst}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          boxSizing: "border-box",
                          padding: "0",
                          fontSize: "14px",
                        }}
                      ></td>
                      <td
                        style={{
                          fontWeight: "900",
                          width: "140px",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingLeft: "5px",
                          borderBottom: "1px solid #eee",
                          boxSizing: "border-box",
                        }}
                      >
                        Total
                      </td>
                      <td
                        style={{
                          fontWeight: "900",
                          width: "140px",
                          fontSize: "14px",
                          backgroundColor: "#eeebeb",
                          padding: "0",
                          paddingLeft: "5px",
                          borderBottom: "1px solid #eee",
                          boxSizing: "border-box",
                        }}
                      >
                        AUD {total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="paying-your-invoice">
                <div style={{ width: "270px", boxSizing: "border-box" }}>
                  <h2>Paying Your Invoice</h2>
                  {/* <div className="bpay">
                    <div>
                      <img
                        style={{ width: "70px" }}
                        src="https://i.ibb.co/rv2qRb1/bpay.png"
                        alt=""
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <div style={{ color: "#011b58", fontSize: "12px" }}>
                        <b>Biller Code:</b> 206060
                      </div>
                      <div style={{ color: "#011b58", fontSize: "12px;" }}>
                        <b>Reference No:</b> 65816472
                      </div>
                    </div>
                  </div> */}

                  <div className="bank-transfer">
                    <div className="title">EFT or Bank Transfer</div>
                    <div className="bank-details">
                      <div>
                        <p>Name</p>
                        <p>BSB</p>
                        <p>Account No.</p>
                        <p>Bank</p>
                      </div>
                      <div className="orangetech">
                        <p>Orange Tech Pty Ltd</p>
                        <p>032 289</p>
                        <p>792112</p>
                        <p>Westpac Banking Corporation</p>
                      </div>
                    </div>
                  </div>
                  <div className="notice">
                    <p>
                      Please contact your bank or financial institution to make
                      payments from your savings or cheque accounts. Bank
                      transfers can take
                      <b> between 2 to 3 business days</b> to clear.
                    </p>

                    <p style={{ marginTop: "7px" }}>
                      Please feel free to email your remittance information to
                      info@medclicker.com.au so our team can keep an eye out for
                      your payment.
                    </p>
                  </div>
                </div>
                <div className="visa-mc">
                  <img
                    src="https://i.ibb.co/zSDYxhX/visa.png"
                    alt="Medclicker accepts VISA Card "
                  />
                  <img
                    src="https://i.ibb.co/TrWvXBB/mc.png"
                    alt="Medclicker accepts MasterCard Card"
                  />
                  <img
                    src="https://i.ibb.co/7j3gRNH/amex.png"
                    alt="Medclicker accepts American Express"
                    style={{ width: "50px" }}
                  />
                  <p>
                    VISA, MasterCard and American Express are accepted on
                    medclicker.com
                  </p>
                  <p>We do not accept cheques.</p>
                  <p>Need assistance?</p>
                  <p>Use the contact enquiry form on medclicker.com/contact</p>
                  <img
                    src="/images/medclicker.png"
                    alt="Medclicker LOGO"
                    style={{ width: "120px" }}
                  />
                </div>
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
          .amount-payable {
            padding: 5px 46px 0px 50px;
            position: relative;
            top: 5%;
            text-align: left;
            width: 100%;
            box-sizing: border-box;
          }

          .amount-payable h2 {
            color: #333;
            width: 100%;
            font-size: 16px;
            margin-bottom: 5px;
            margin-top: 0px;
            font-weight: 500;
            line-height: 1.1;
          }
          .top-container img {
            box-sizing: border-box;
            vertical-align: middle;
            border: 0;
            transform: translateX(0%);
          }

          .top-container .top-container-div {
            padding: 80px 0px 60px;
            height: 100%;
            width: 350px;
            position: relative;
            display: inline;
            background: #eeebeb;
            box-sizing: border-box;
          }

          .top-container .top-container-div-div {
            position: relative;
            text-align: center;
            width: 100%;
            top: 0px;
            box-sizing: border-box;
          }

          .top-container .top-container-child {
            width: 1000px;
            height: 1406px;
            margin: 0px auto;
            background-color: white;
            position: relative;
            border: none;
            padding: 0px;
            display: flex;
            box-sizing: border-box;
          }

          .bill-to {
            position: relative;
            padding: 5px 46px 0px 50px;
            top: 14%;
            text-align: left;
            background-color: #eeebeb;
          }

          .bill-to h2 {
            color: #333;
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 500;
            line-height: 1.1;
            box-sizing: border-box;
            margin-top: 0px;
          }

          .bill-to p {
            color: #777;
            font-size: 16px;
            font-weight: 500;
            margin: 0 0 10px;
            margin-bottom: 5px;
          }

          .invoice-no {
            position: relative;
            top: 30%;
            padding: 5px 46px 0px 50px;
            text-align: left;
            background-color: #eeebeb;
          }

          .invoice-no h2 {
            color: #333;
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 500;
            line-height: 1.1;
            margin-top: 0px;
            box-sizing: border-box;
          }

          .invoice-no p {
            color: #777;
            font-size: 16px;
            font-weight: 500;
            margin: 0 0 10px;
            margin-bottom: 6px;
          }

          .copyright {
            position: absolute;
            padding: 5px 46px 10px 50px;
            bottom: 0%;
            text-align: left;
          }

          .copyright p {
            margin-top: 1px;
            font-weight: 500;
            font-size: 13px;
            margin-bottom: 5px;
            margin: 0 0 10px;
            color: #777;
          }

          .main {
            box-sizing: border-box;
            padding: 30px 35px 20px;
            display: inline-block;
            width: 650px;
          }
          .main hr {
            height: 0;
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            box-sizing: content-box;
            border-top: 1px solid #eee;
          }

          .tax-invoice {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            font-family: sans-serif;
            box-sizing: border-box;
          }

          .paid {
            font-size: 28px;
            color: #da4236;
            font-weight: 800;
            border: 2px solid #da4236;
            padding: 0px 10px;
            height: 44px;
            box-sizing: border-box;
          }
          .table-parent {
            min-height: 995px;
            position: relative;
            text-align: left;
            box-sizing: border-box;
          }
          table {
            width: 100%;
            position: relative;
            border-spacing: 0;
            border-collapse: collapse;
          }

          tbody tr {
            height: 40px;
          }
          tbody .service-type {
            border-bottom: 1px solid #eee;
            height: 40px;
          }

          tbody .service-type td {
            box-sizing: border-box;
            padding: 0;
            font-size: 14px;
          }

          .paying-your-invoice {
            bottom: 0px;
            display: flex;
            width: 100%;
            border: 2px solid #eee;
            padding: 10px;
            justify-content: space-between;
            box-sizing: border-box;
          }
          .paying-your-invoice .bpay {
            display: flex;
            border: 2px solid #011b58;
            padding: 7px;
          }

          .paying-your-invoice h2 {
            color: #011b58;
            margin: 2px 0 10px;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.1;
          }

          .bank-transfer {
            margin-top: 7px;
            border: 2px solid #011b58;
          }
          .bank-transfer .title {
            text-align: center;
            color: #011b58;
            font-weight: 800;
            font-size: 12px;
          }

          .bank-details {
            display: flex;
            padding: 7px;
            justify-content: space-between;
          }

          .bank-details p {
            color: #011b58;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 0px;
            margin: 0 0 1px;
          }

          .orangetech {
            text-lign: right;
          }
          .orangetech p {
            color: #011b58;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 0px;
            margin: 0 0 1px;
          }

          .notice {
            margin-top: 8px;
            box-sizing: border-box;
          }
          .notice p {
            box-sizing: border-box;
            color: #011b58;
            font-size: 10px;
            font-weight: 500;
            line-height: 13px;
            margin-bottom: 0px;
            margin: 0 0 1px;
          }

          .visa-mc {
            margin-left: 32px;
            width: 280px;
            box-sizing: border-box;
          }
          .visa-mc img {
            display: inline;
            width: 80px;
          }

          .visa-mc p {
            font-size: 12px;
            color: #333;
            font-weight: 700;
            margin: 0 0 10px;
            box-sizing: border-box;
          }
        `}</style>
      </HelmetProvider>
    </>
  );
};

export default Invoice;
