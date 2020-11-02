import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthUtils {
  public static hashPassword = async (password: string) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  };

  public static signToken = (userId: string) => {
    return JWT.sign({ userId }, process.env.APP_SECRET!, { expiresIn: "1h" });
  };
}

export default AuthUtils;
