import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "./models/UserModel";

class Passport {
  public static passportLocalMiddleware = () => {
    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          const user = await UserModel.findOne({ username });

          if (!user) {
            return done(null, false, { message: "Nie znaleziono użytkownika o tej nazwie." });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Hasło nie pasuje." });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }),
    );
  };

  // Przekazywanie tokena JWT przez cookies
  // private static cookieExtractor = (request: express.Request) => {
  //   let token = null;
  //   if (request && request.cookies) {
  //     token = request.cookies.access_token;
  //   }
  //   return token;
  // };

  public static passportJWTMiddleware = () => {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
          secretOrKey: process.env.APP_SECRET,
        },
        async (payload, done) => {
          try {
            const user = await UserModel.findById({ _id: payload.userId });

            if (!user) {
              return done(null, false, { message: "Nie znaleziono użytkownika." });
            }

            return done(null, user);
          } catch (error) {
            return done(error);
          }
        },
      ),
    );
  };
}

export default Passport;
