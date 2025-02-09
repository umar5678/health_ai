import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import { UserLoginType } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        // console.log("gogle user profile: ", profile);
        const user = await User.findOne({ email: profile._json.email });

        if (user) {
          if (user.loginType !== UserLoginType.GOOGLE) {
            next(
              new ApiError(
                400,
                "You have previously registered using " +
                  user.loginType?.toLowerCase()?.split("_").join(" ") +
                  ". Please use the " +
                  user.loginType?.toLowerCase()?.split("_").join(" ") +
                  " login option to access your account."
              ),
              null
            );
          } else {
            next(null, user);
          }
        } else {
          // If user with email does not exists, means the user is coming for the first time
          const createdUser = await User.create({
            email: profile._json.email,
            // There is a check for traditional logic so the password does not matter in this login method
            password: profile._json.sub, // Set user's password as sub (coming from the google)
            fullName: profile._json.email?.split("@")[0], // as email is unique, this username will be unique
            avatar: {
              url: profile._json.picture,
              localPath: "",
            }, // set avatar as user's google picture
            loginType: UserLoginType.GOOGLE,
          });
          if (createdUser) {
            next(null, createdUser);
          } else {
            next(new ApiError(500, "Error while registering the user"), null);
          }
        }
      } catch (err) {
        return next(err, null);
      }
    }
  )
);

export default passport;
