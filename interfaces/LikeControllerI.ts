/**
 * @file Declares Controller for the Likes resource
 */
import {Request, Response} from "express";

export default interface LikeControllerI {
    findAllUsersThatLikedTuit(req: Request, res: Response): void;

    findAllTuitsLikedByUser(req: Request, res: Response): void;

    userLikesTuit(req: Request, res: Response): void;
    /**
     * Get the count of likes on  a tuit.
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, includes the total count.
     */
    findLikesCount(req: Request, res: Response): void;

    userUnlikesTuit(req: Request, res: Response): void;

    /**
     * Toggles the likes on a tuit
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userTogglesLikesTuit(req: Request, res: Response): void;

};