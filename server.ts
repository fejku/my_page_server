import dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes";
import App from "./app";

dotenv.config({ path: "./env/development.env" });

const app = new App([new AuthRoutes()]);

app.listen();
