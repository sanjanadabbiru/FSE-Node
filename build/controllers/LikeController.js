"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
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
class LikeController {
    constructor() {
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findAllTuitsLikedByUser = (req, res) => {
            const uid = req.params.uid;
            //@ts-ignore
            const profile = req.session['profile'];
            const uId = uid === "me" && profile ?
                profile._id : uid;
            LikeController.likeDao.findAllTuitsLikedByUser(uId)
                .then(likes => {
                const likesTuits = likes.filter(like => like.tuit);
                const tuitsLikes = likesTuits.map(like => like.tuit);
                res.json(tuitsLikes);
            });
        };
        this.userTogglesLikesTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            //@ts-ignore
            const profile = req.session['profile'];
            const uId = uid === "me" && profile ?
                profile._id : uid;
            console.log('hi');
            try {
                const userHasLikedTuit = yield LikeController.likeDao
                    .userLikesTuit(uId, tid);
                const countOfLikedTuit = yield LikeController.likeDao
                    .countHowManyLikedTuit(tid);
                console.log("countOfLikedTuit", countOfLikedTuit);
                let tuit = yield LikeController.tuitDao.findTuitById(tid);
                console.log(userHasLikedTuit);
                if (userHasLikedTuit) {
                    yield LikeController.likeDao.userUnlikesTuit(uId, tid);
                    tuit.stats.likes = countOfLikedTuit - 1;
                    console.log("hello", tuit.stats.likes);
                }
                else {
                    yield LikeController.likeDao.userLikesTuit(uId, tid);
                    tuit.stats.likes = countOfLikedTuit + 1;
                    console.log(tuit.stats.likes);
                }
                ;
                yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
        /**
         * count of likes of a tuit.
         * @param {Request} req Represents client request: includes the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents total count.
         */
        this.findLikesCount = (req, res) => LikeController.likeDao.countHowManyLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unliking
         * the tuit and the tuit being unliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the like was successful or not
         */
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }
}
exports.default = LikeController;
LikeController.likeController = null;
LikeController.likeDao = LikeDao_1.default.getLike();
LikeController.tuitDao = TuitDao_1.default.getTuit();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return LikeController
 */
LikeController.getLikeController = (app) => {
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
};
;
