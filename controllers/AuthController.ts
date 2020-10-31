import express from "express";
import passport from "passport";
import IController from "../interfaces/IController";
import { IUser, UserModel } from "../models/UserModel";
import AuthUtils from "../utils/AuthUtils";

class AuthController implements IController {
  public path = "/auth";

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/login`, passport.authenticate("local", { session: false }), this.login);
    this.router.get(`${this.path}/logout`, passport.authenticate("jwt", { session: false }), this.logout);
    this.router.get(`${this.path}/authenticated`, passport.authenticate("jwt", { session: false }), this.authenticated);
  }

  private register = async (request: express.Request, response: express.Response) => {
    const { username, password, role } = <IUser>request.body;

    try {
      const user = await UserModel.findOne({ username });

      if (user) {
        response.status(400).json({ message: "Username is already taken" });
      } else {
        const passwordHash = await AuthUtils.hashPassword(password);
        const newUser = new UserModel({ username, password: passwordHash, role });
        newUser.save();
        response.sendStatus(201);
      }
    } catch (error) {
      response.status(500).json({ message: "Error while finding user." });
    }    
  };

  private login = async (request: express.Request, response: express.Response) => {
    if (request.isAuthenticated()) {
      const { _id, username, role } = <IUser>request.user;
      const token = AuthUtils.signToken(_id);
      response.cookie("access_token", token, { httpOnly: true, sameSite: true });
      response.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  };

  private logout = async (request: express.Request, response: express.Response) => {
    response.clearCookie("access_token");
    response.json({ user: { username: "", role: "" }, success: true });
  };

  private authenticated = async (request: express.Request, response: express.Response) => {
    const { username, role } = <IUser>request.user;
    response.status(200).json({ isAuthenticated: true, user: { username, role } });
  };
}

export default AuthController;


// userRouter.post("/todo", passport.authenticate('jwt', {session: false}), (req, res) => {
//   const todo = new Todo(req.body);
//   todo.save((err) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: "Error has occured",
//           msgError: true
//         }
//       })
//     } else {
//       req.user.todos.push(todo);
//       req.user.save((err) => {
//         if (err) {
//           res.status(500).json({
//             message: {
//               msgBody: "Error has occured",
//               msgError: true
//             }
//           })
//         } else {
//           res.status(200).json({message: {msgBody: "Created todo", msgError: false}});
//         }
//       })
//     }
//   })
// });

// userRouter.get("/todos", passport.authenticate('jwt', {session: false}), (req, res) => {
//   User.findById({_id: req.user._id}).populate("todos").exec((err, document) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: "Error has occured",
//           msgError: true
//         }
//       })
//     } else {
//       res.status(200).json({todos: document.todos, authenticated: true});
//     }
//   });
// });

// userRouter.get("/admin", passport.authenticate('jwt', {session: false}), (req, res) => {
//   if (req.user.role === "admin") {
//     res.status(200).json({message: {msgBody: "You are an admin", msgError: false}});
//   } else {
//     res.status(403).json({message: {msgBody: "You're not an admin", msgError: true}});
//   }
// });