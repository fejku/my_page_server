import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "./models/UserModel";

class Passport {

  public static passportLocalMiddleware = () => {
    passport.use(new LocalStrategy(async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });
        
        if (!user) {
          return done(null, false, { message: "Nie znaleziono użytkownika o tej nazwie." })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Hasło nie pasuje." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })); 
  }

}

export default Passport;