import dotenv from "dotenv";
import AuthController from "./controllers/AuthController";
import App from "./app";

dotenv.config({ path: "./env/development.env" });

const app = new App([new AuthController()]);

app.listen();
