import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Sing me a song] - Server started on port ${PORT}!`);
});

export default app;