require("dotenv/config");

const config = {
  JWT_SECRET: process.env.JWT_SECRET || "motdepasse",
};
const facebook = {
  clientID: process.env.FB_CLIENT_KEY,
  clientSecret: process.env.FB_SECRET_KEY,
};

const google = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports.google = google;
module.exports.facebook = facebook;
module.exports.config = config;
