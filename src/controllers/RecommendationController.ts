import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { validate } from "class-validator";
import { Recommendation } from "../entity/Recommendation";


class RecommendationController {

  static newRecommendation = async (req: Request, res: Response) => {
  
    let { name, youtubeLink } = req.body;
    let recommendation = new Recommendation();
    recommendation.name = name;
    recommendation.youtubeLink = youtubeLink;

    const errors = await validate(recommendation);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const recommendationRepository = getRepository(Recommendation);
    try {
      await recommendationRepository.save(recommendation);
    }catch (e) {
      res.status(400).send(e);
      return;
    }
     
    res.status(201).send('Recommendation sent.');
  };


  /*This function can generate Dirty Write. Our API don't have a massive usage, so lets
  leave it this way. Ask Ronald better approaches */
  static updateVoteRecommendation = async (req: Request, res: Response, value: number = +1) => {

    const id : number= req.params.id;
    const recommendationRepository = getRepository(Recommendation);

    const recommendation = await recommendationRepository.findOneOrFail({
      where: { id: id }
    });
    recommendation.score+=value;

    await recommendationRepository.save(recommendation);

    res.status(201).send(recommendation);

  }

  static topRecommendations = async (req: Request, res: Response) => {

    const amount : number= req.params.amount;
    const recommendationRepository = getRepository(Recommendation);

    const recommendations = await recommendationRepository.find({
      take:amount,
      order: {
        score: "DESC"
      }
    });

    res.status(201).send(recommendations);

  }

  static randomRecommendations = async (req: Request, res: Response) => {

    const goodRecommendation: boolean = Math.random() < 0.7;
    
    
    const amount : number= req.params.amount;
    const recommendationRepository = getRepository(Recommendation);

    const recommendations = await recommendationRepository.find({
      take:amount,
      order: {
        score: "DESC"
      }
    });

    res.status(201).send(recommendations);

  }
};




export default RecommendationController;