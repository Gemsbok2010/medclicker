const config = {
  JWT_SECRET: process.env.JWT_SECRET || "motdepasse",
};
const facebook = {
  clientID: "501057722218648",
  clientSecret: "d7bf32c1bbe73f6157bc57549f363b0f",
};

const google = {
  clientID:
    "458778111230-s5q4p0sv3eahqnej4bvo4se344jqnhlf.apps.googleusercontent.com",
  clientSecret: "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",
};

module.exports.google = google;
module.exports.facebook = facebook;
module.exports.config = config;
