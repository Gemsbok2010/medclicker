const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv/config");
const { google, facebook } = require("./config");
const User = require("./models/userModel");
const generate = require("nanoid-generate");
const generateNanoId = generate.numbers(5);
// Generate Unique Nano ID
const dt = new Date();
const year = dt.getFullYear();
const month = dt.getMonth() + 11;
const day = dt.getDate() + 10;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//Google
passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: "https://medclicker.com.au/auth/google/callback",
      // passReqToCallback   : true
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if user already exists in db
      User.findOne({ email: profile.emails[0].value }).then((existingUser) => {
        if (existingUser) {
          // already have the user

          done(null, existingUser);
        } else {
          //if not create a new user
          let dt = new Date();
          dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
          new User({
            nanoId: "G" + `${year}${month}${day}` + generateNanoId,
            lastName: profile.family_name,
            firstName: profile.given_name,
            email: profile.emails[0].value,
            isLocum: false,
            googleId: profile.id,
            survey: "",
            profession: "",
            phone: "",
            country: "",
            filename: profile.photos[0].value,
            createdAt: dt,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);

//Facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: facebook.clientID,
//       clientSecret: facebook.clientSecret,
//       callbackURL: "https://medclicker.com.au/auth/facebook/callback",
//       profileFields: ["id", "gender", "email", "name", "picture.type(large)"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       //Check if user already exists in db
//       User.findOne({
//         email: profile.emails[0].value,
//       }).then((currentUser) => {
//         if (currentUser) {
//           done(null, currentUser);
//         } else {
//           let dt = new Date();
//           dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
//           new User({
//             nanoId: "F" + `${year}${month}${day}` + generateNanoId,
//             lastName: profile.name.familyName,
//             firstName: profile.name.givenName,
//             email: profile.emails[0].value,
//             isLocum: false,
//             facebookId: profile.id,
//             survey: "",
//             profession: "",
//             phone: "",
//             country: "",
//             filename: profile.photos[0].value,
//             createdAt: dt,
//           })
//             .save()
//             .then((newUser) => {
//               done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );
