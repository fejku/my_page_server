import dotenv from "dotenv";
import PotrawyController from "./controllers/food/PotrawyController";
import WagaController from "./controllers/WagaController";
import TagiController from "./controllers/food/TagiController";
import App from "./app";

dotenv.config({ path: "./env/development.env" });

const app = new App([new WagaController(), new PotrawyController(), new TagiController()]);

app.listen();
