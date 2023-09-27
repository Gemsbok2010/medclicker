require("dotenv/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ============ CONTACT US EMAIL ==============
function contactUsContent(name, phone, email, message, thisyear, logo) {
  output = `
        <head>
        <style> 
        html,
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        body {
          background-color: #f4f5f6;
        }
        
        h1 {
          font-weight: 700;
          font-size: 30px;
        }
        p {
          font-weight: 500;
          font-size: 14px;
          color: #333;
          font-family: sans-serif;
        }
        hr {
          margin-top: 20px;
          margin-bottom: 20px;
          border: 0;
          border-top: 1px solid #eee;
        }
        
  
        
        </style>
      </head>
      <body>
          <div style="-webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 40px 20px 20px;
          background-color: #f4f5f6;">
          <div style="  width:100%;
          background-color: white;
          position: relative;
          border: 1px solid #eee;">
          <div style="margin: 30px 30px; text-align:center">
          <img style="background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          width: 210px;
          position: relative;" src="${logo}">
      </div>
    
              <hr style="margin-top: 12px; margin-bottom: 12px;">
              <div style="margin: 30px 30px;">
              <h1>Hi Admin,</h1>
                  <br>
                  <p>You have a message from <b>${name}</b>.
                      <br><br>
                  <div style=" margin: 0;">
                      <h4 style="font-weight: 800; margin-top: 0; margin-bottom: 0;">Message(s)</h4>
                      <hr style=" margin-top: 12px;margin-bottom: 12px;">
                      <p style="color: #333; margin-bottom: 5px; white-space: pre-wrap;">${message} </p>
                    
                  </div>
                  <hr>
                  <b>Contact details:</b>
                  <div style=" margin: 0;">
                  <p>Email: ${email}</p>
                  <p>Mobile: ${phone}</p>
                  </div>
                  
                  <br>
                  <br>
                  <p>Kind regards,</p>
                  <p>${name}</p>
                  <div style="margin:5px 0px 0px">
                  <img style="background-repeat: no-repeat;
                  background-size: contain;
                  background-position: center;
                  margin: 0; width:120.88px" src="${logo}" alt="logo">
                  </div>
                  <br>
                  <div style=" font-size: 12px;
                  color: #777;
                  text-align: center;
                  margin: 10px auto;">
                  This email was sent via Contact Us Enquiry Form from ${email}.</div>
                  <div style="  font-size: 12px;
                  color: #777;
                  text-align: center;
                  margin: 10px auto;">© <span>${thisyear}</span> Orange Tech Pty Ltd. ABN 49 649 839 609. All Rights Reserved</div>
                  </p>
              </div>
          </div>
      </div>
      </body>
        `;
  return output;
}

function contactUsEmail(to, from, subject, text) {
  const msg = { to, from, subject, html: text };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent");
    } else {
      console.log(`Email sent to ${to.email} successfully`);
    }
  });
}

// ============ INFORM PASSWORD HAS CHANGED ==============
function informPasswordChangeEmail(firstName, logo, email, thisyear) {
  output = `
        <head>
        <style> 
        html,
        body {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        body {
          background-color: #f4f5f6;
        }
        
        h1 {
          font-weight: 700;
          font-size: 30px;
        }
        p {
          font-weight: 500;
          font-size: 14px;
          color: #333;
          font-family: sans-serif;
        }
        hr {
          margin-top: 20px;
          margin-bottom: 20px;
          border: 0;
          border-top: 1px solid #eee;
        }
        
        </style>
      </head>
      <body>
          <div style="-webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 40px 20px 20px;
          background-color: #f4f5f6;">
          <div style="  width:100%;
          background-color: white;
          position: relative;
          border: 1px solid #eee;">
          <div style="margin: 30px 30px; text-align:center">
          <img style="background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          width: 210px;
          position: relative;" src="${logo}">
      </div>
    
              <hr style="margin-top: 12px; margin-bottom: 12px;">
              <div style="margin: 30px 30px;">
              <h1>Hi ${firstName},</h1>
                  <br>
                  <p>Your password has recently been updated. If you have in fact made these changes, you don't need to do anything.</p>
                      <br>
                      <p>If you didn't make these changes, or believe an unauthorised intruder has made access to your account, please contact our Medclicker Customer Support.  <a style="color:#008489; font-weight:700; text-decoration:none;" href="www.medclicker.com/contact">Contact us</a>.</p>
               
                          <br>
                  <p>Kind regards,</p>
                  <p>Medclicker Customer Support</p>
                  <div style="margin:5px 0px 0px">
                  <img style="background-repeat: no-repeat;
                  background-size: contain;
                  background-position: center;
                  margin: 0; width:120.88px" src="${logo}" alt="logo">
                  </div>
                  <br>
                  <div style=" font-size: 12px;
                  color: #777;
                  text-align: center;
                  margin: 10px auto;">This email was sent by Medclicker to ${email}.</div>
                  <div style="  font-size: 12px;
                  color: #777;
                  text-align: center;
                  margin: 10px auto;">© <span>${thisyear}</span> Orange Tech Pty Ltd. ABN 49 649 839 609. All Rights Reserved</div>
                  </p>
              </div>
          </div>
      </div>
      </body>
        `;
  return output;
}

function sendPasswordChangedEmail(to, from, subject, text) {
  const msg = { to, from, subject, html: text };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent");
    } else {
      console.log(`Email sent to ${to} successfully`);
    }
  });
}

// =============== FORGOT PASSWORD ================
function forgotPasswordEmail(firstName, logo, link, email, thisyear) {
  output = `
          <head>
          <style> 
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          body {
            background-color: #f4f5f6;
          }
          
          h1 {
            font-weight: 700;
            font-size: 30px;
          }
          p {
            font-weight: 500;
            font-size: 14px;
            color: #333;
            font-family: sans-serif;
          }
          hr {
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            border-top: 1px solid #eee;
          }
          
          </style>
        </head>
        <body>
            <div style="-webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 40px 20px 20px;
            background-color: #f4f5f6;">
            <div style="  width:100%;
            background-color: white;
            position: relative;
            border: 1px solid #eee;">
            <div style="margin: 30px 30px; text-align:center">
            <img style="background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            width: 210px;
            position: relative;" src="${logo}">
        </div>
      
                <hr style="margin-top: 12px; margin-bottom: 12px;">
                <div style="margin: 30px 30px;">
                <h1>Hi ${firstName},</h1>
                    <br>
                    <p>Oops! Forgot your password? Not a worry.</p>
                    <br/>
                <p>Click on the below link to reset a new password.</p>
                 
                    <br/>
                    <a href="${link}">${link}</a>
                    <br/><br/>
                    <p>If the link does not open, try pasting the above link into a new web browser.</p>
                            <br/>
                            <p>Kind regards,</p>
                            <p>Medclicker Customer Support</p>
                    <div style="margin:5px 0px 0px">
                    <img style="background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    margin: 0; width:120.88px" src="${logo}" alt="logo">
                    </div>
                    <br>
                    <div style=" font-size: 12px;
                    color: #777;
                    text-align: center;
                    margin: 10px auto;">This email was sent by Medclicker to ${email}.</div>
                    <div style="  font-size: 12px;
                    color: #777;
                    text-align: center;
                    margin: 10px auto;">© <span>${thisyear}</span> Orange Tech Pty Ltd. ABN 49 649 839 609. All Rights Reserved</div>
                    </p>
                </div>
            </div>
        </div>
        </body>
          `;
  return output;
}

function sendforgotPasswordEmail(to, from, subject, text) {
  const msg = { to, from, subject, html: text };

  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent!!!", err);
    } else {
      console.log("Email sent successfully!!!");
    }
  });
}

// =============== PAYMENT COMPLETED ================
async function paymentConfirmation(
  caseId,
  invoice,
  email,
  firstName,
  date,
  total,
  thisyear,
  logo,
  product,
  status
) {
  output = `
    <head>
    <style> 

    html,
    body {
      width: 100%;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    
    body {
      background-color: #f4f5f6;
    }
    
    h1 {
      font-weight: 700;
      font-size: 30px;
    }
    p {
      font-weight: 500;
      font-size: 14px;
      color: #333;
      font-family: sans-serif;
    }
    hr {
      margin-top: 20px;
      margin-bottom: 20px;
      border: 0;
      border-top: 1px solid #eee;
    }
    </style>
  </head>
  <body>
  <div style="-webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 40px 20px 20px;
  background-color: #f4f5f6;">
  <div style="  width:100%;
  background-color: white;
  position: relative;
  border: 1px solid #eee;">
  <div style="margin: 30px 30px; text-align:center">
  <img style="background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 210px;
  position: relative;" src="${logo}">
</div>
  </div>
       
          <hr style="margin-top: 12px; margin-bottom: 12px;">
          <div style="margin: 30px 30px;">
              <h1>Hi ${firstName},</h1>
              <br>
              <p>This is a payment receipt for invoice # <b>${invoice}</b>, which we issued to you on the <b>${date}</b>.
                  <br><br>
              <div style=" margin: 0;">
                  <h4 style="font-weight: 800; margin-top: 0; margin-bottom: 0;">Invoice Item(s)</h4>
                  <hr style=" margin-top: 12px;margin-bottom: 12px;">
                  <p style="color: #333; margin-bottom: 5px;">Product: <b>${product}</b> </p>
                
                  <p style="color: #333; margin-bottom: 5px;">Case ID: <b>${caseId}</b> </p>
                  <p style="color: #333; margin-bottom: 5px;">Date Paid: <b>${date}</b> </p>
                  <p style="color: #333; margin-bottom: 5px;">Total Paid: <b>AUD ${total}</b> </p>
                  <p style="color: #333; margin-bottom: 5px;">Status: <b>${status}</b></p>
              </div>
              <hr>
              Please keep this email for your records as this will serve as an official receipt for this payment.
              
              <br>
              <br>
              <p>Kind regards,</p>
              <p>Medclicker Customer Support</p>
    <div style="margin:0">
              <img style="background-repeat: no-repeat;
              background-size: contain;
              background-position: center;
              margin: 0; width:120.88px"  position: relative;" src="${logo}" alt="logo">
</div>
              <br>
              <div style=" font-size: 12px;
              color: #777;
              text-align: center;
              margin: 10px auto;">This email was sent by Medclicker to ${email}.</div>
              <div style="  font-size: 12px;
              color: #777;
              text-align: center;
              margin: 10px auto;">© <span>${thisyear}</span> Orange Tech Pty Ltd. ABN 49 649 839 609. All Rights Reserved</div>
              </p>
          </div>
      </div>
  </div>
  </body>
    `;
  return output;
}

function pdfContent(
  invoice,
  logo,
  mc,
  visa,
  amex,
  firstName,
  lastName,
  email,
  phone,
  date,
  professions,
  product,
  total,
  fee,
  gst,
  streetNo,
  street,
  suburb,
  state,
  postalCode,
  country,
  thisyear,
  status
) {
  pdfOutput = `<body style="box-sizing: border-box;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px;line-height: 1.42857143;
  color: #333;">
  
    <div class="top-container" style="display: flex;
    justify-content: left;
    flex-direction: row;box-sizing: border-box">
  
      <div style="width: 1000px;
      height:1406px;
      margin: 0px auto;
      background-color: white;
      position: relative;
      border: none;
      padding: 0px;
      display: flex;box-sizing: border-box">
        <div style="padding: 80px 0px 60px;
        height: 100%;
        width: 350px;
        position: relative;
        display: inline;
        background: #eeebeb;
        box-sizing: border-box;">
          <div style="position: relative;
          text-align: center;
          width: 100%;
      top: 0px;box-sizing: border-box;">
            <img style="box-sizing: border-box;vertical-align: middle; border:0;transform: translateX(0%);"
            src="${logo}" width="180px" alt="Medclicker LOGO" />
          </div>
  
  
          <div style=" padding: 5px 46px 0px 50px;  position: relative;
          top: 5%;
          text-align: left;
          width: 100%;box-sizing: border-box;">
            <h2 style=" color: #333;
            width: 100%;
            font-size: 16px;
            margin-bottom: 5px;
            margin-top: 0px;font-weight: 500;
      line-height: 1.1;">
              AMOUNT PAYABLE
            </h2>
            <h2 style="color: #333;
            width: 100%;
            font-size: 16px;
            margin-bottom: 5px;
            margin-top: 0px;font-weight: 500;
      line-height: 1.1;">
              AUD 0.00
            </h2>
          </div>
  
          <div style="position: relative;
         
          padding: 5px 46px 0px 50px;
          top: 14%;
          text-align: left;
          background-color: #eeebeb;">
            <h2 style="color: #333;
            font-size: 16px;
            margin-bottom: 5px;font-weight: 500;
      line-height: 1.1;box-sizing: border-box;
            margin-top: 0px;">BILLED TO</h2>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${firstName} ${lastName}</p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${streetNo} ${street} </p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${suburb} </p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${state} ${postalCode} </p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${country}</p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;    margin: 0 0 10px;
            margin-bottom: 5px;">Mobile: ${phone}</p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">Email: ${email}</p>
  
  
  
          </div>
          <div class="invoice-no" style="position: relative;
          top: 30%;
          padding: 5px 46px 0px 50px;
          text-align: left;
          background-color: #eeebeb;">
            <h2 style=" color: #333;
            font-size: 16px;
            margin-bottom: 5px;font-weight: 500;
      line-height: 1.1;
            margin-top: 0px;box-sizing: border-box;">INVOICE DETAILS</h2>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 6px;">Tax Invoice: <b>${invoice}</b></p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500; margin: 0 0 10px;
            margin-bottom: 6px;box-sizing: border-box;">Date Issued: <b>${date}</b></p>
            <p style="color: #777;
            font-size: 16px;
            font-weight: 500; margin: 0 0 10px;
            margin-bottom: 6px;">Date Due: <b>${date}</b></p>
          </div>
  
          <div class="copyright" style=" position: absolute;
            padding: 5px 46px 10px 50px;
          bottom: 0%;
          text-align: left;">
            <p style="  margin-top: 1px;
            font-weight: 500;
            font-size: 13px;
            margin-bottom: 5px;margin: 0 0 10px;
            color: #777;">© ${thisyear} Orange Tech Pty Ltd.</p>
            <p style="  margin-top: 1px;
            font-weight: 500;
            font-size: 13px;
            margin-bottom: 5px;margin: 0 0 10px;
            color: #777;"> ABN 49 649 839 609. All Rights Reserved</p>
          </div>
  
        </div>
        <div class="main" style="box-sizing: border-box;padding: 30px 35px 20px; display: inline-block;
        width: 650px;">
          <div style="display: flex;
          position: relative;box-sizing: border-box;
          top: 0%;
          text-align: left;
          justify-content: space-between;">
            <div style="font-size:20px;font-weight: 600;color:#333; font-family: sans-serif; box-sizing: border-box;">TAX
              INVOICE
              <div style="font-size:20px; font-weight: 600; color:#333;font-family: sans-serif; box-sizing: border-box;">
                ${invoice}</div>
            </div>
            <div
              style="font-size:28px;color:#da4236; font-weight: 800; border:2px solid #da4236; padding:0px 10px; height:44px;box-sizing: border-box;">
              ${status}
            </div>
          </div>
          <hr style="height:0;margin-top: 20px;
          margin-bottom: 20px;
          border: 0;box-sizing: content-box;
          border-top: 1px solid #eee">
  
  
          <div style="min-height: 995px;position: relative;text-align: left;box-sizing: border-box;">
            <table style="width:100%; position:relative;border-spacing: 0;
            border-collapse:collapse">
              <thead>
                <tr style="color:#011b58;border-bottom: 1px solid #eee; height:40px">
                  <th style="padding: 0;text-align: left">Product Item/ Type</th>
                  <th style="padding: 0;text-align: left"></th>
                  <th style="padding: 0;text-align: left">Total</th>
                </tr>
  
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #eee; height:40px">
  
                  <td style="box-sizing: border-box; padding: 0;font-size:14px;">${product} ${professions}</td>
                  <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                  <td style="box-sizing: border-box;padding: 0;font-size:14px;">AUD ${total}</td>
                </tr>
                <tr style=" height:40px">
                  <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                  <td
                    style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                    Product fee</td>
                  <td
                    style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-left:5px;box-sizing: border-box;;font-size:14px;">
                    AUD ${fee}</td>
                </tr>
  
                <tr style=" height:40px">
                  <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                  <td
                    style="box-sizing: border-box;border-bottom: 1px solid #eee;width:140px;padding: 0;padding-left:5px;font-size:14px;">
                    GST
                  </td>
                  <td
                    style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-left:5px;font-size:14px;">
                    AUD ${gst}</td>
                </tr>
                <tr style=" height:40px">
                  <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                  <td
                    style="box-sizing: border-box;border-bottom: 1px solid #eee; font-weight:900;width:140px;font-size:14px; background-color:#eeebeb;padding: 0;padding-left:5px">
                    Total
                  </td>
                  <td
                    style="box-sizing: border-box;border-bottom: 1px solid #eee;font-weight:900;background-color:#eeebeb;padding: 0;padding-left:5px;font-size:14px;">
                    AUD
                    ${total}</td>
                </tr>
            
              </tbody>
  
            </table>
          </div>
  
          <div style=" bottom:0px;
          display: flex;
          width: 100%;
          border: 2px solid #eee;
          padding: 10px;
          justify-content: space-between;box-sizing: border-box;">
  
            <div style="width:270px;box-sizing: border-box;">
              <h2 style="color:#011b58;margin:2px 0 10px; font-size:14px;    font-weight: 500;
              line-height: 1.1;">Paying Your Invoice</h2>

  
              <div style="margin-top:7px;border: 2px solid #011b58;">
                <div style="text-align: center;color:#011b58; font-weight:800; font-size:12px">EFT or Bank Transfer</div>
                <div style="display:flex; padding:7px; justify-content:
                space-between;">
  
                  <div>
                    <p style="color:#011b58;font-size:12px;font-weight:600;margin-bottom:0px; margin: 0 0 1px;">Name</p>
                    <p style="color:#011b58;font-size:12px;font-weight:600;margin-bottom:0px; margin: 0 0 1px;">BSB
                    </p>
                    <p style="color:#011b58;font-size:12px;font-weight:600;margin-bottom:0px;    margin: 0 0 1px;">
                      Account No.</p>
                    <p style="color:#011b58;font-size:12px;font-weight:600;margin-bottom:0px;    margin: 0 0 1px;">Bank
                    </p>
                  </div>
                  <div style="text-align: right;">
                    <p style="color:#011b58;font-size:12px;font-weight:500;margin-bottom:0px; margin: 0 0 1px;">Orange
                      Tech Pty Ltd</p>
                    <p style="color:#011b58;font-size:12px;font-weight:500;margin-bottom:0px;margin: 0 0 1px;">032 289</p>
                    <p style="color:#011b58;font-size:12px;font-weight:500;margin-bottom:0px;    margin: 0 0 1px;">
                      792112</p>
                    <p style="color:#011b58;font-size:12px;font-weight:500;margin-bottom:0px;    margin: 0 0 1px;">Westpac Banking Corporation</p>
                  </div>
                </div>
              </div>
  
              <div style="margin-top:8px;box-sizing: border-box">
                <p
                  style="box-sizing: border-box;color:#011b58;font-size:10px; font-weight:500; line-height:13px;margin-bottom:0px; margin: 0 0 1px;">
                  Please
                  contact your bank or
                  financial institution to make payments from your savings or cheque accounts. Bank transfers can take<b> between 2 to 3 business
                    days</b> to clear.
                </p>
                <p style="margin-top: 7px;box-sizing: border-box;color:#011b58;font-size:10px; font-weight:500; line-height:13px;margin-bottom:0px; margin: 0 0 1px;">
                Please feel free to email your remittance information to
                info@medclicker.com.au so our team can keep an eye out for
                your payment.
              </p>
              </div>
  
            </div>
            <div style="margin-left:32px;width:280px;box-sizing: border-box ">
            <div style="display:flex; justify-content: left;">
              <img style="display:inline;width:80px" src="${visa}" alt="Visa">
              <img style="display:inline;width:80px" src="${mc}" alt="MasterCard">
              <img style="display:inline;width:50px; height:50px;align-self: center; align-items: center;" src="${amex}" alt="American Express">
              </div>
              <p style="font-size:12px;color:#333;font-weight:700;margin: 0 0 10px;box-sizing: border-box;">VISA and
                MasterCard are accepted
                on medclicker.com</p>
              <p style="font-size:12px;color:#333;font-weight:700;margin: 0 0 10px;box-sizing: border-box;">We do not
                accept cheques.</p>
              <p style="font-size:12px;color:#333;font-weight:700;margin: 0 0 10px;box-sizing: border-box;">Need
                assistance?</p>
              <p style="font-size:12px;color:#333;font-weight:700;margin: 0 0 10px;box-sizing: border-box;">Use the
                contact enquiry form on
                medclicker.com/contact
              </p>
              <img
              src="${logo}"
              alt="Medclicker LOGO"
              style="width: 120px";
            />
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  `;
  return pdfOutput;
}

function sendEmail(to, from, subject, text, attachments) {
  const msg = { to, from, subject, html: text, attachments };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log(err);
      console.log("Email not sent");
    } else {
      console.log(`Email sent to ${to} successfully`);
    }
  });
}

// =============== LOCUM APPLIED NOTIFICATION TO EMPLOYER ================
function locumApplication(
  firstName,
  caseId,
  email,
  applicant,
  thisyear,
  logo,
  professions
) {
  output = `
          <head>
          <style> 
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          body {
            background-color: #f4f5f6;
          }
          
          h1 {
            font-weight: 700;
            font-size: 30px;
          }
          p {
            font-weight: 500;
            font-size: 14px;
            color: #333;
            font-family: sans-serif;
          }
          hr {
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            border-top: 1px solid #eee;
          }
          
          </style>
        </head>
        <body>
            <div style="-webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 40px 20px 20px;
            background-color: #f4f5f6;">
            <div style="  width:100%;
            background-color: white;
            position: relative;
            border: 1px solid #eee;">
            <div style="margin: 30px 30px; text-align:center">
            <img style="background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            width: 210px;
            position: relative;" src="${logo}">
        </div>
      
                <hr style="margin-top: 12px; margin-bottom: 12px;">
                <div style="margin: 30px 30px;">
                <h1>Hi ${firstName},</h1>
                    <br/>
                    <p>This is a notification email that a locum, <b>${applicant}</b>, has submitted an application for case ID: <b>${caseId}</b>, which you have advertised for a <b>locum ${professions}</b>.</p>
                    <br/>
                <p>Please login to your account, go to <b>[Listing Manager]</b> to review ${applicant}'s application. You have <b>72 hours</b> to accept or reject the application before the application will be auto-deleted.</p>
                <br/>
<p>If you are no longer looking for a <b>locum ${professions}</b>, please login to your account, go to <b>[Listing Manager]</b>, scroll to Case ID: <b>${caseId}</b>, click on <b>[Edit]</b> and click <b>[Delete]</b>.</p>
                <br/>
                <p>Please do not hesitate in contacting Medclicker Customer Support for any assistance or questions. Thank you!</p>
                   
                            <br/>
                            <p>Kind regards,</p>
                            <p>Medclicker Customer Support</p>
                    <div style="margin:5px 0px 0px">
                    <img style="background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    margin: 0; width:120.88px" src="${logo}" alt="logo">
                    </div>
                    <br>
                    <div style=" font-size: 12px;
                    color: #777;
                    text-align: center;
                    margin: 10px auto;">This email was sent by Medclicker to ${email}.</div>
                    <div style="  font-size: 12px;
                    color: #777;
                    text-align: center;
                    margin: 10px auto;">© <span>${thisyear}</span> Orange Tech Pty Ltd. ABN 49 649 839 609. All Rights Reserved</div>
                    </p>
                </div>
            </div>
        </div>
        </body>
          `;
  return output;
}

function sendLocumEmail(to, from, subject, text) {
  const msg = { to, from, subject, html: text };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent");
    } else {
      console.log(`Email sent to ${to} successfully`);
    }
  });
}

// =============== EMPLOYER MADE PAYMENT NOTIFY LOCUM HIRED ================
function toLocum(
  jobSeekerFirstName,
  jobSeekerEmail,
  available_start,
  available_finish,
  firstName,
  lastName,
  email,
  phone,
  streetNo,
  street,
  suburb,
  state,
  postalCode,
  country,
  professions,
  thisyear,
  logo,
  caseId
) {
  output = `
          <head>
          <style> 
          html,
          body {
            width: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          body {
            background-color: #f4f5f6;
          }
          
          h1 {
            font-weight: 700;
            font-size: 30px;
          }
          p {
            font-weight: 500;
            font-size: 14px;
            color: #333;
            font-family: sans-serif;
          }
          hr {
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            border-top: 1px solid #eee;
          }
          
          </style>
        </head>
        <body>
            <div style="-webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 40px 20px 20px;
            background-color: #f4f5f6;">
            <div style="  width:100%;
            background-color: white;
            position: relative;
            border: 1px solid #eee;">
            <div style="margin: 30px 30px; text-align:center">
            <img style="background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            width: 210px;
            position: relative;" src="${logo}">
        </div>
      
                <hr style="margin-top: 12px; margin-bottom: 12px;">
                <div style="margin: 30px 30px;">
                <h1>Hi ${jobSeekerFirstName},</h1>
                    <br/>
                    <p>Congratulations! This is a notification email that the employer for case ID: <b>${caseId}</b>, has accepted your offer for the role you applied for as a <b>locum ${professions}</b> for the dates from <b>${available_start}</b> to <b>${available_finish}</b>.</p>
                    <br/>
                <p>For more details, please login to your account, go to <b>[Applications Manager]</b>, scroll to case ID: <b>${caseId}</b> to review your application. Please contact the employer as soon as possible to arrange accommodation and air or road travels, if needed.</p>
                <br/>
                <div style="position: relative;text-align: left;box-sizing: border-box;">
                <table style="width:100%; position:relative;border-spacing: 0;
              border-collapse:collapse">
                  <thead>
                    <tr style="color:#011b58;border-bottom: 1px solid #eee; height:40px">
                      <th style="padding: 0;text-align: left; font-size:14px">Employer's Details</th>
                      <th style="padding: 0;text-align: left"></th>
                    </tr>
            
                  </thead>
                  <tbody>
            
                    <tr style="height:40px">
                      <td
                        style="border-bottom: 1px solid #eee; width:170px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                        Contact</td>
                      <td
                        style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-left:5px;box-sizing: border-box;;font-size:14px;">
                        ${firstName} ${lastName}</td>
                    </tr>
            
                    <tr style="height:40px">
            
                      <td
                        style="box-sizing: border-box;border-bottom: 1px solid #eee;width:170px;padding: 0;padding-left:5px;font-size:14px;">
                        Email
                      </td>
                      <td style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-left:5px;font-size:14px;">
                        ${email}</td>
                    </tr>
                    <tr style="height:40px">
                      <td
                        style="box-sizing: border-box;border-bottom: 1px solid #eee; width:170px;font-size:14px; background-color:#eeebeb;padding: 0;padding-left:5px">
                        Phone
                      </td>
                      <td
                        style="box-sizing: border-box;border-bottom: 1px solid #eee;background-color:#eeebeb;padding: 0;padding-left:5px;font-size:14px;">
                        ${phone}</td>
                    </tr>
                    <tr style="height:40px">
            
                      <td
                        style="box-sizing: border-box;border-bottom: 1px solid #eee;width:170px;padding: 0;padding-left:5px;font-size:14px;">
                        Address
                      </td>
                      <td style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-left:5px;font-size:14px;">
                        ${streetNo} ${street}, ${suburb} ${state} ${postalCode}</td>
                    </tr>
                  </tbody>
            
                </table>
              </div>
                <br/>

                <p>Please do not hesitate in contacting Medclicker Customer Support for any assistance or questions. Good luck and happy locuming!</p>
                <br/>

                <p>Please keep this email for your records as this will serve as an official receipt for this agreement.</p>
                            <br/>
                            <p>Kind regards,</p>
                            <p>Medclicker Customer Support</p>
                    <div style="margin:5px 0px 0px">
                    <img style="background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    margin: 0; width:120.88px" src="${logo}" alt="logo">
                    </div>
                    <br>
                    <div style=" font-size: 12px;
                    color: #777;
                    text-align: center;
                    margin: 10px auto;">This email was sent by Medclicker to ${jobSeekerEmail}.</div>
                    <div style="  font-size: 12px;
                    color: #777;
                    text-align: center;
                    margin: 10px auto;">© <span>${thisyear}</span> Orange Tech Pty Ltd. ABN 49 649 839 609. All Rights Reserved</div>
                    </p>
                </div>
            </div>
        </div>
        </body>
          `;
  return output;
}

function pdfContract(
  jobSeekerFirstName,
  jobSeekerLastName,
  jobSeekerEmail,
  jobSeekerPhone,
  ahpra,
  available_start,
  available_finish,
  locum_streetNo,
  locum_street,
  locum_suburb,
  locum_state,
  locum_postalCode,
  firstName,
  lastName,
  email,
  phone,
  streetNo,
  street,
  suburb,
  state,
  postalCode,
  emp_streetNo,
  emp_street,
  emp_suburb,
  emp_state,
  emp_postalCode,
  professions,
  caseId,
  dateIssued,
  thisyear,
  logo,
  normal_rate,
  sat_rate,
  sun_rate,
  ph_rate,
  accommodation,
  roadtravel,
  airtravel,
  airport
) {
  pdfOutput = `<body style="box-sizing: border-box;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px;line-height: 1.42857143;
  color: #333;">

  <div class="top-container" style="display: flex;
    justify-content: left;
    flex-direction: row;box-sizing: border-box">

    <div style="width: 1000px;
      height:1406px;
      margin: 0px auto;
      background-color: white;
      position: relative;
      border: none;
      padding: 0px;
      display: flex;box-sizing: border-box">
      <div style="padding: 80px 0px 60px;
        height: 100%;
        width: 350px;
        position: relative;
        display: inline;
        background: #eeebeb;
        box-sizing: border-box;">
        <div style="position: relative;
          text-align: center;
          width: 100%;
      top: 0px;box-sizing: border-box;">
          <img style="box-sizing: border-box;vertical-align: middle; border:0;transform: translateX(0%);" src="${logo}"
            width="180px" alt="Medclicker LOGO" />
        </div>

        <div style="position: relative;
         
          padding: 5px 46px 0px 50px;
          top: 14%;
          text-align: left;
          background-color: #eeebeb;">
          <h2 style="color: #333;
            font-size: 16px;
            margin-bottom: 5px;font-weight: 500;
      line-height: 1.1;box-sizing: border-box;
            margin-top: 0px;">EMPLOYER DETAILS</h2>
          <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${firstName} ${lastName}</p>
          <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${emp_streetNo} ${emp_street} </p>
          <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${emp_suburb} </p>
          <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">${emp_state} ${emp_postalCode} </p>
          <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">Australia</p>
          <p style="color: #777;
            font-size: 16px;
            font-weight: 500;    margin: 0 0 10px;
            margin-bottom: 5px;">Mobile: ${phone}</p>
          <p style="color: #777;
            font-size: 16px;
            font-weight: 500;margin: 0 0 10px;
            margin-bottom: 5px;">Email: ${email}</p>
        </div>

        <div class="copyright" style=" position: absolute;
            padding: 5px 46px 10px 50px;
          bottom: 0%;
          text-align: left;">
          <p style="  margin-top: 1px;
            font-weight: 500;
            font-size: 13px;
            margin-bottom: 5px;margin: 0 0 10px;
            color: #777;">© ${thisyear} Orange Tech Pty Ltd.</p>
          <p style="  margin-top: 1px;
            font-weight: 500;
            font-size: 13px;
            margin-bottom: 5px;margin: 0 0 10px;
            color: #777;"> ABN 49 649 839 609. All Rights Reserved</p>
        </div>

      </div>
      <div class="main" style="box-sizing: border-box;padding: 30px 35px 20px; display: inline-block;
        width: 650px;">
        <div style="display: flex;
          position: relative;box-sizing: border-box;
          top: 0%;
          text-align: left;
          justify-content: space-between;">
          <div style="font-size:20px;font-weight: 600;color:#333; font-family: sans-serif; box-sizing: border-box;">
            AGREEMENT FOR
            <div style="font-size:20px; font-weight: 600; color:#333;font-family: sans-serif; box-sizing: border-box;">
              ${jobSeekerFirstName} ${jobSeekerLastName}
            </div>
          </div>
          <div
            style="font-size:28px;color:#da4236; font-weight: 800; border:2px solid #da4236; padding:0px 10px; height:44px;box-sizing: border-box;">
            Accepted
          </div>
        </div>
        <hr style="height:0;margin-top: 20px;
          margin-bottom: 20px;
          border: 0;box-sizing: content-box;
          border-top: 1px solid #eee">
        <div style="min-height: 995px;position: relative;text-align: left;box-sizing: border-box;">
          <table style="width:100%; position:relative;border-spacing: 0;
            border-collapse:collapse">
            <thead>
              <tr style="color:#011b58;border-bottom: 1px solid #eee; height:40px">
                <th style="padding: 0;text-align: left">Employment Details</th>
                <th style="padding: 0;text-align: left"></th>
                <th style="padding: 0;text-align: left"></th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee; height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Case ID</td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;padding-right:5px;text-align: right;">
                  ${caseId}</td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Date Issued
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px;box-sizing: border-box;;font-size:14px;text-align: right;">
                  ${dateIssued}</td>
              </tr>

              <tr style="height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px; ">Work
                  Address</td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;width:140px;padding: 0;padding-left:5px;font-size:14px;">
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-right:5px;font-size:14px;text-align: right;">
                  ${streetNo} ${street}, ${suburb} </td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  State
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">

                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px;box-sizing: border-box;;font-size:14px;text-align: right;">
                  ${state} ${postalCode}</td>
              </tr>

            </tbody>

          </table>
          <br />
          <table style="width:100%; position:relative;border-spacing: 0;
            border-collapse:collapse">
            <thead>
              <tr style="color:#011b58;border-bottom: 1px solid #eee; height:40px">
                <th style="padding: 0;text-align: left">${professions} Locum  Details</th>
                <th style="padding: 0;text-align: left"></th>
                <th style="padding: 0;text-align: left"></th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee; height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Locum Name</td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;padding-right:5px;text-align: right;">
                  ${jobSeekerFirstName} ${jobSeekerLastName}</td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Phone
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px;box-sizing: border-box;;font-size:14px;text-align: right;">
                  ${jobSeekerPhone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee; height:40px">

                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Email</td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;padding-right:5px;text-align: right;">
                  ${jobSeekerEmail}</td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Address
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px;box-sizing: border-box;;font-size:14px;text-align: right;">
                  ${locum_streetNo} ${locum_street}, ${locum_suburb}</td>
              </tr>

              <tr style="height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px; ">State
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;width:140px;padding: 0;padding-left:5px;font-size:14px;">
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-right:5px;font-size:14px;text-align: right;">
                  ${locum_state} ${locum_postalCode}
                </td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  AHPRA
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px;box-sizing: border-box;;font-size:14px;text-align: right;">
                  ${ahpra}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <table style="width:100%; position:relative;border-spacing: 0;
            border-collapse:collapse">
            <thead>

              <tr style="color:#011b58;border-bottom: 1px solid #eee; height:40px">

                <th style="padding: 0;text-align: left">The Offer</th>
                <th style="padding: 0;text-align: left"></th>
                <th style="padding: 0;text-align: left"></th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee; height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Weekday Rates</td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;"></td>
                <td style="box-sizing: border-box;padding: 0;font-size:14px;padding-right:5px; text-align:right">
                  ${
                    normal_rate !== "" ? `AUD ${normal_rate}` : "Negotiable"
                  }</td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Saturday Rates
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px; text-align:right;box-sizing: border-box;;font-size:14px;">
                  ${sat_rate !== "" ? `AUD ${sat_rate}` : "Negotiable"}</td>
              </tr>

              <tr style="height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Sunday Rates</td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;width:140px;padding: 0;padding-left:5px;font-size:14px;">
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-right:5px; text-align:right;font-size:14px;">
                  ${sun_rate !== "" ? `AUD ${sun_rate}` : "Negotiable"}</td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Public Holiday Rates
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px; text-align:right;box-sizing: border-box;;font-size:14px;">
                  ${ph_rate !== "" ? `AUD ${ph_rate}` : "Negotiable"}</td>
              </tr>
              <tr style="height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Air Travel Reimbursed
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;width:140px;padding: 0;padding-left:5px;font-size:14px;">
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-right:5px; text-align:right;font-size:14px;">
                  ${airtravel === true ? "Included" : "Not included"}
                  </td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Air Travel Airport from
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px; text-align:right;box-sizing: border-box;font-size:14px;">
                  ${airport ? airport : "Not Applicable"}
                </td>
              </tr>
              <tr style="height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Road Travel Reimbursed
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;width:140px;padding: 0;padding-left:5px;font-size:14px;">
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-right:5px; text-align:right;font-size:14px;">
                  ${roadtravel === true ? "Included" : "Not included"}
                </td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Accommodation Included
                </td>
                <td
                  style="border-bottom: 1px solid #eee; width:140px; background-color: #eeebeb;padding: 0; padding-left:5px;box-sizing: border-box;font-size:14px;">
                </td>
                <td
                  style="border-bottom: 1px solid #eee; background-color: #eeebeb;padding: 0;padding-right:5px; text-align:right;box-sizing: border-box;;font-size:14px;">${
                    accommodation === true ? "Included" : "Not included"
                  }
                </td>
              </tr>
              <tr style="height:40px">
                <td style="box-sizing: border-box; padding: 0;font-size:14px;padding-left:5px;">Start Date
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;width:140px;padding: 0;padding-left:5px;font-size:14px;">
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0;padding-right:5px; text-align:right;font-size:14px;font-weight:900">${available_start}
                </td>
              </tr>
              <tr style=" height:40px">
                <td
                  style="box-sizing: border-box; padding: 0;font-size:14px;background-color: #eeebeb;padding-left:5px;">
                  Finish Date
                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee; ;width:140px;font-size:14px; background-color:#eeebeb;padding: 0;padding-right:5px; text-align:right;">

                </td>
                <td
                  style="box-sizing: border-box;border-bottom: 1px solid #eee;font-weight:900;background-color:#eeebeb;padding: 0;text-align:right;padding-right:5px;font-size:14px;">${available_finish}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </div>

  </body>
  `;
  return pdfOutput;
}

function sendHiredEmail(to, from, subject, text, attachments) {
  const msg = { to, from, subject, html: text, attachments };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log("Email not sent");
    } else {
      console.log(`Email sent to ${to} successfully`);
    }
  });
}

module.exports = {
  toLocum,
  pdfContract,
  sendHiredEmail,
  locumApplication,
  sendLocumEmail,
  pdfContent,
  paymentConfirmation,
  sendEmail,
  contactUsEmail,
  contactUsContent,
  informPasswordChangeEmail,
  sendPasswordChangedEmail,
  forgotPasswordEmail,
  sendforgotPasswordEmail,
};
