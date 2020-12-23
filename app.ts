import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import IRoute from "./interfaces/IRoute";
import Passport from "./passport";

class App {
  public app: express.Application;

  private mongoose = mongoose;

  constructor(routes: IRoute[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private initializeMiddlewares() {
    this.app.use(morgan("dev"));

    // eslint-disable-next-line func-names
    this.app.use(function (req: express.Request, res: express.Response, next) {
      res.header("Access-Control-Allow-Origin", process.env.FRONT_ORIGIN);
      res.header("Access-Control-Allow-Headers", "Content-Type, X-Access-Token");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      next();
    });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    Passport.passportLocalMiddleware();
    Passport.passportJWTMiddleware();
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  private connectToTheDatabase() {
    this.mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("Connected to DB");
    });
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
}

export default App;
