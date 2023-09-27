const express = require("express");
const router = express.Router();
let accountSid = process.env.TWILIO_ACCOUNT_SID;
let authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
require("dotenv/config");
const SibApiV3Sdk = require("sib-api-v3-sdk");

// Imports
const Locum = require("../models/locumModel");

// ============ SMS MESSAGE (from Asms.js) ===============
router.post("/fireSMS", async (req, res) => {
  let match = { SMStext: true, country: "Australia" };

  // Location (STATE ONLY)
  if (req.query.location !== "") {
    const breakLocation = req.query.location;
    const stateArr = breakLocation.split(",");
    match["state"] = stateArr;
  }

  // Professions = OK
  if (req.query.profession !== "") {
    const breakProfs = req.query.profession;
    match["profession"] = breakProfs;
  }

  const message = req.body.message;
  const subscribers = await Locum.find(match);
  const noOfSubscribers = await Locum.find(match).countDocuments();

  console.log(match, "match", noOfSubscribers, subscribers);

  if (noOfSubscribers === 0) {
    res.json({ noOfSubscribers });
  } else {
    for (var i = 0; i < subscribers.length; i++) {
      var phone = subscribers[i].phone;
      var ausCode = "+61";

      const ausNo = ausCode.concat(phone);

      client.messages
        .create({
          body: message,
          from: "+19896655912",
          to: ausNo,
        })
        .then((message) => res.json({ noOfSubscribers }))
        .catch((error) => console.log(error));
    }
  }
});

//============ GET SIB SUBSCRIPTION DATA (from Subscription.js) ==============
router.get("/mysubscription", async (req, res) => {
  try {
    let apikey = process.env.SIB_API_KEY;

    // auth + set up
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = apikey;

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let identifier = req.query.email;

    apiInstance.getContactInfo(identifier).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
        res.status(200).json(data);
      },
      function (error) {
        console.error(error);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// =========== DELETE LOCUM FROM NEWSLETTER (from LocumProfile.js) ========
router.put("/delist/:email", async (req, res) => {
  const locum = await Locum.findOne({ email: req.params.email });

  // DELETE IN BREVO (SEND IN BLUE)

  let apiInstance = new SibApiV3Sdk.ContactsApi();
  let apikey = process.env.SIB_API_KEY;

  // auth + set up
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = apikey;

  // delete contact
  let identifier = req.params.email;

  apiInstance.deleteContact(identifier).then(
    function () {
      console.log("API called successfully.");
    },
    function (error) {
      console.error(error);
    }
  );

  // UPDATE DATABASE WITH NEWSLETTER TO FALSE
  Locum.findByIdAndUpdate(locum._id, req.body).then(function () {
    Locum.findById(locum._id).then(function (saveLocum) {
      saveLocum.save();
      res.send(saveLocum);
    });
  });
});

// =========== ADD LOCUM FROM NEWSLETTER (from LocumProfile.js) ========
router.put("/subscribe/:email", async (req, res) => {
  const locum = await Locum.findOne({ email: req.params.email });

  const { email, attributes } = req.body;

  // CREATE IN BREVO (SEND IN BLUE)
  let apiInstance = new SibApiV3Sdk.ContactsApi();
  let apikey = process.env.SIB_API_KEY;
  // auth + set up
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = apikey;

  let state = "";
  if (attributes.STATES === "NSW") {
    state = "1";
  }
  if (attributes.STATES === "VIC") {
    state = "2";
  }
  if (attributes.STATES === "TAS") {
    state = "3";
  }
  if (attributes.STATES === "ACT") {
    state = "4";
  }
  if (attributes.STATES === "NT") {
    state = "5";
  }
  if (attributes.STATES === "WA") {
    state = "6";
  }
  if (attributes.STATES === "SA") {
    state = "7";
  }
  if (attributes.STATES === "QLD") {
    state = "8";
  }
  if (attributes.STATES === "AUSTRALIA WIDE") {
    state = "9";
  }

  //create contact
  createContact = {
    email: email,
    attributes: {
      FIRSTNAME: attributes.FIRSTNAME,
      LASTNAME: attributes.LASTNAME,
      STATES: state,
    },
  };
  createContact.listIds = [6];

  // call SIB api
  apiInstance.createContact(createContact).then(
    (data) => {
      res.status(200);
    },
    (error) => {
      res.status(500);
      console.error(error);
    }
  );
  // UPDATE DATABASE WITH NEWSLETTER TO TRUE
  Locum.findByIdAndUpdate(locum._id, req.body).then(function () {
    Locum.findById(locum._id).then(function (saveLocum) {
      saveLocum.save();
      res.send(saveLocum);
    });
  });
});

router.put("/update", async (req, res) => {
  const locum = await Locum.findOne({ email: req.body.email });

  let apikey = process.env.SIB_API_KEY;

  // auth + set up
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = apikey;

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  // update contact
  let identifier = req.body.email;
  let { attributes } = req.body;

  let state = "";
  if (attributes.STATES === "NSW") {
    state = "1";
  }
  if (attributes.STATES === "VIC") {
    state = "2";
  }
  if (attributes.STATES === "TAS") {
    state = "3";
  }
  if (attributes.STATES === "ACT") {
    state = "4";
  }
  if (attributes.STATES === "NT") {
    state = "5";
  }
  if (attributes.STATES === "WA") {
    state = "6";
  }
  if (attributes.STATES === "SA") {
    state = "7";
  }
  if (attributes.STATES === "QLD") {
    state = "8";
  }
  if (attributes.STATES === "AUSTRALIA WIDE") {
    state = "9";
  }

  let updateContact = new SibApiV3Sdk.UpdateContact();

  updateContact.attributes = {
    EMAIL: identifier,
    FIRSTNAME: attributes.FIRSTNAME,
    LASTNAME: attributes.LASTNAME,
    STATES: state,
  };

  updateContact.listIds = [6];

  apiInstance.updateContact(identifier, updateContact).then(
    function () {
      console.log("API called successfully.");
    },
    function (error) {
      console.error(error);
    }
  );
  // UPDATE DATABASE WITH NEWSLETTER TO TRUE
  Locum.findByIdAndUpdate(locum._id, req.body).then(function () {
    Locum.findById(locum._id).then(function (saveLocum) {
      saveLocum.save();
      res.send(saveLocum);
    });
  });
});

module.exports = router;
