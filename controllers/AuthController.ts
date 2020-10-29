import express from "express";
// import moment from "moment";
import IController from "../interfaces/IController";
import IRegister from "../interfaces/IRegister";
// import Waga from "../interfaces/IWaga";
// import WagaModel from "../models/WagaModel";

class AuthController implements IController {
  public path = "/auth";

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.register);
    // this.router.get(`${this.path}/:id`, this.getWagaById);
    // this.router.patch(`${this.path}/:id`, this.modifyWaga);
    // this.router.delete(`${this.path}/:id`, this.deleteWaga);
    // this.router.post(this.path, this.createWaga);
  }

  private register = async (request: express.Request, response: express.Response) => {
    const {username, password, role}: IRegister = request.body;
    // try {
    //   const wagi = await WagaModel.find();
    //   response.send(wagi);
    // } catch (error) {
    //   console.log(error);
    // }
  };  

// userRouter.post("/register", (req, res) => {
//   const {username, password, role} = req.body;
//   User.findOne({username}, (err, user) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: "Error has occured",
//           msgError: true
//         }
//       })
//     }

//     if(user) {
//       res.status(400).json({
//         message: {
//           msgBody: "Username is already taken",
//           msgError: true
//         }
//       })
//     } else {
//       const newUser = new User({username, password, role});
//       newUser.save(err => {
//         if (err) {
//           res.status(500).json({
//             message: {
//               msgBody: "Error has occured",
//               msgError: true
//             }
//           })
//         } else {
//           res.status(201).json({
//             message: {
//               msgBody: "Account created",
//               msgError: false
//             }
//           })
//         }
//       })
//     }
//   })
// });

  private getAllWagi = async (request: express.Request, response: express.Response) => {
    try {
      const wagi = await WagaModel.find();
      response.send(wagi);
    } catch (error) {
      console.log(error);
    }
  };

  private getWagaById = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    WagaModel.findById(id).then((waga) => {
      response.send(waga);
    });
  };

  private modifyWaga = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    const zmodyfikowanaWaga: Waga = request.body;
    WagaModel.findByIdAndUpdate(id, zmodyfikowanaWaga, { new: true }).then((waga) => {
      response.send(waga);
    });
  };

  private createWaga = async (request: express.Request, response: express.Response) => {
    const wagaData: Waga = request.body;

    const createdWaga = new WagaModel(wagaData);
    try {
      const savedWaga = await createdWaga.save();
      response.send(savedWaga);
    } catch (error) {
      console.log(error);
    }
  };

  private deleteWaga = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    try {
      const successResponse = await WagaModel.findByIdAndDelete(id);

      if (successResponse) {
        response.sendStatus(200);
      } else {
        response.sendStatus(500);
      }
    } catch (error) {
      response.sendStatus(500);
    }
  };
}

export default AuthController;






// const express = require("express");
// const userRouter = express.Router();
// const passport = require("passport");
// const passportConfig = require("../passport");
// const JWT = require("jsonwebtoken");
// const User = require("../model/User");
// const Todo = require("../model/Todo");

// const signToken = userId => {
//   return JWT.sign({
//     iss: "zzz",
//     sub: userId
//   }, "secretPass", {expiresIn: "1h"})
// }

// userRouter.post("/register", (req, res) => {
//   const {username, password, role} = req.body;
//   User.findOne({username}, (err, user) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: "Error has occured",
//           msgError: true
//         }
//       })
//     }

//     if(user) {
//       res.status(400).json({
//         message: {
//           msgBody: "Username is already taken",
//           msgError: true
//         }
//       })
//     } else {
//       const newUser = new User({username, password, role});
//       newUser.save(err => {
//         if (err) {
//           res.status(500).json({
//             message: {
//               msgBody: "Error has occured",
//               msgError: true
//             }
//           })
//         } else {
//           res.status(201).json({
//             message: {
//               msgBody: "Account created",
//               msgError: false
//             }
//           })
//         }
//       })
//     }
//   })
// });

// userRouter.post("/login", passport.authenticate('local', {session: false}), (req, res) => {
//   if (req.isAuthenticated()) {
//     const {_id, username, role} = req.user;
//     const token = signToken(_id);
//     res.cookie("access_token", token, {httpOnly: true, sameSite: true});
//     res.status(200).json({isAuthenticated: true, user: {username, role}});
//   }
// });

// userRouter.get("/logout", passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.clearCookie("access_token");
//   res.json({user: {username: "", role: ""}, success: true});
// });

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

// userRouter.get("/authenticated", passport.authenticate('jwt', {session: false}), (req, res) => {
//   const {username, role} = req.user;
//   res.status(200).json({isAuthenticated: true, user: {username, role}});
// });

// module.exports = userRouter;