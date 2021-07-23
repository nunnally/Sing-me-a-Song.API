import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app"


createConnection()
  .then(async connection => {
    app
  })
  .catch(error => console.log(error));

