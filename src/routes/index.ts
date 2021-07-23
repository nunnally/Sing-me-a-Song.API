import { Router, Request, Response } from "express";
import recommendation from "./recommendation";


const routes = Router();

routes.use("/recommendation", recommendation);

export default routes;
