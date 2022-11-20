/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import TuitDao from "../daos/TuitDao";
import DislikesDao from "../daos/DislikeDao";
import Tuit from "../models/Tuit"
import Like from "../models/Like";
import {Session} from 'inspector';
/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeController: LikeController | null = null;
    private static likeDao: LikeDao = LikeDao.getLike();
    private static tuitDao: TuitDao = TuitDao.getTuit();
    private static dislikesDao: DislikesDao = DislikesDao.getDislike();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getLikeController = (app: Express): LikeController => {

        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
            app.get("/api/tuits/:tid/likes/count", LikeController.likeController.findLikesCount);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesLikesTuit);
        }
        return LikeController.likeController;
    }


    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) =>{
        const uid = req.params.uid;
        //@ts-ignore
        const profile = req.session['profile'];
        const uId = uid === "me" && profile ?
            profile._id : uid;

        LikeController.likeDao.findAllTuitsLikedByUser(uId)
            .then(likes => {
            const likesTuits =
                likes.filter(like => like.tuit);
            const tuitsLikes =
                likesTuits.map(like => like.tuit);
            res.json(tuitsLikes);
            });
    }



    userTogglesLikesTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        //@ts-ignore
        const profile = req.session['profile'];
        const uId = uid === "me" && profile ?
        profile._id : uid;
        try {
                    const userAlreadyLikedTuit = await LikeController.likeDao
                        .findUserLikesTuit(uId, tid);
                    const userAlreadyDislikedTuit = await LikeController.dislikesDao
                        .findUserDislikesTuit(uId, tid);
                    const howManyLikedTuit = await LikeController.likeDao
                        .countHowManyLikedTuit(tid);
                    const howManyDislikedTuit = await LikeController.dislikesDao
                        .findTuitDislikesCount(tid);
                    let tuit = await LikeController.tuitDao.findTuitById(tid);
                   if (userAlreadyLikedTuit) {
                                   await LikeController.likeDao.userUnlikesTuit(uId, tid);
                                   tuit.stats.likes = howManyLikedTuit - 1;
                               } else {
                                   await LikeController.likeDao.userLikesTuit(uId, tid);
                                    if (userAlreadyDislikedTuit && howManyDislikedTuit>0){
                                        tuit.stats.dislikes = howManyDislikedTuit -1;
                                    }
                                   tuit.stats.likes = howManyLikedTuit + 1;
                               }

                    await LikeController.tuitDao.updateLikes(tid, tuit.stats);
                    res.sendStatus(200);
                } catch (e) {
                    res.sendStatus(404);
                }
        }

    /**
     * count of likes of a tuit.
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents total count.
     */
    findLikesCount = (req: Request, res: Response) =>
        LikeController.likeDao.countHowManyLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
};
