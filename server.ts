import dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes";
import AppsRoutes from "./routes/AppsRoutes";
import App from "./app";

dotenv.config({ path: "./env/development.env" });

const app = new App([new AuthRoutes(), new AppsRoutes()]);

app.listen();
