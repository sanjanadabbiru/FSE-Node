/**
 * @file Controller Interface RESTful Web service API for Dislikes resource
 */
 import {Request, Response} from "express";
 /**
  * @interface DislikeController An interface for Dislikes on Tuiter.
  *
  */
 export default interface DislikesController {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userTogglesTuitDislikes (req: Request, res: Response): void;
    findTuitDislikesCount(req: Request, res: Response): void;
    userDislikesTuit(req: Request, res: Response): void;
    userUndislikesTuit(req: Request, res: Response): void;
    findUserDislikesTuit(req: Request, res: Response): void;
  }