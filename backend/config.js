const config = {
  JWT_SECRET: process.env.JWT_SECRET || "motdepasse",
};
const facebook = {
  clientID: "1391738818445498",
  clientSecret: "9687c4786d03e4b79171fdc03b1a98c0",
};

const google = {
  clientID:
    "458778111230-s5q4p0sv3eahqnej4bvo4se344jqnhlf.apps.googleusercontent.com",
  clientSecret: "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",
};

module.exports.google = google;
module.exports.facebook = facebook;
module.exports.config = config;
