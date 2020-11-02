import express from "express";
import { IUser, UserModel } from "../models/UserModel";
import AuthUtils from "../utils/AuthUtils";

class UserController  {

  public register = async (request: express.Request, response: express.Response) => {
    const { username, password, role } = <IUser>request.body;

    try {
      const user = await UserModel.findOne({ username });

      if (user) {
        response.status(400).json({ message: "Username is already taken" });
      } else {
        const passwordHash = await AuthUtils.hashPassword(password);
        const newUser = new UserModel({ username, password: passwordHash, role });
        await newUser.save();
        response.sendStatus(201);
      }
    } catch (error) {
      response.status(500).json({ message: "Error while finding user." });
    }    
  };

  public login = async (request: express.Request, response: express.Response) => {
    if (request.isAuthenticated()) {
      const { _id, username, role } = <IUser>request.user;
      const token = AuthUtils.signToken(_id);
      response.cookie("access_token", token, { httpOnly: true, sameSite: true });
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