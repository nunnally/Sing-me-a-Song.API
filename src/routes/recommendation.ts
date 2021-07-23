import { Router } from "express";
import RecommendationController from "../controllers/RecommendationController";

const router = Router();

router.post("/",RecommendationController.newRecommendation);
router.get("/top/:amount",RecommendationController.topRecommendations);


export default router;