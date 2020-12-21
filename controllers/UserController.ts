import express from "express";
import { IUser, UserModel } from "../models/UserModel";
import AuthUtils from "../utils/AuthUtils";

class UserController {
  public register = async (request: express.Request, response: express.Response) => {
    const { username, password, role } = <IUser>request.body;

    if (!username || !password || !role) {
      response.status(400).json({ message: "Nie wypełniono wszystkich pól." });
    }

    try {
      const user = await UserModel.findOne({ username });

      if (user) {
        response.status(400).json({ message: "Istnieje już taka nazwa użytkownika." });
      } else {
        const passwordHash = await AuthUtils.hashPassword(password);
        const newUser = new UserModel({ username, password: passwordHash, role });
        await newUser.save();
        response.status(201).json({ message: "Dodano użytkownika." });
      }
    } catch (error) {
      response.status(500).json({ message: "Error while finding user." });
    }
  };

  public login = async (request: express.Request, response: express.Response) => {
    if (request.isAuthenticated()) {
      const { _id, username, role } = <IUser>request.user;
      const token = AuthUtils.signToken(_id);
      response.cookie("access_token", token, {
        // domain: "fejku.github.io",
        expires: new Date(Date.now() + 900000),
        secure: true,
        // httpOnly: true,
      });
      response.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  };

  public logout = async (request: express.Request, response: express.Response) => {
    response.clearCookie("access_token");
    response.json({ user: { username: "", role: "" }, success: true });
  };

  public authenticated = async (request: express.Request, response: express.Response) => {
    const { username, role } = <IUser>request.user;
    response.status(200).json({ isAuthenticated: true, user: { username, role } });
  };
}

export default UserController;
