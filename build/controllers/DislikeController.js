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
const DislikeDao_1 = __importDefault(require("../daos/DislikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
/**
 * @class TuitController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits Disliked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that Disliked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
 *     no londer dislikes a tuit</li>
 * </ul>
 * @property {DislikeDao} DislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
class DislikeController {
    constructor() {
        /**
        * Retrieves the count of users that Disliked a tuit from the database
        * @param {Request} req Represents request from client, including the path
        * parameter tid representing the Disliked tuit
        * @param {Response} res Represents response to client, including the total count
        */
        this.findTuitDislikesCount = (req, res) => DislikeController.dislikeDao.findTuitDislikesCount(req.params.tid)
            .then(dislike => res.json(dislike));
        /**
         * Retrieves all users that Disliked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the Disliked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatDislikedTuit = (req, res) => DislikeController.dislikeDao.findUsersThatDislikedTuit(req.params.tid)
            .then(dislikes => res.json(dislikes));
        /**
         * Retrieves all tuits Disliked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user Disliked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were Disliked
         */
        this.findAllTuitsDislikedByUser = (req, res) => {
            const uid = req.params.uid;
            //@ts-ignore
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            console.log("hi");
            DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
                .then(dislikes => {
                const dislikesNonNullTuits = dislikes.filter(dislike => dislike.dislikedTuit);
                const tuitsFromLikes = dislikesNonNullTuits.map(dislike => dislike.dislikedTuit);
                res.json(tuitsFromLikes);
            });
        };
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being Disliked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new dislikes that was inserted in the
         * database
         */
        this.userDislikesTuit = (req, res) => DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then(dislikes => res.json(dislikes));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unliking
         * the tuit and the tuit being unDisliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the Dislike was successful or not
         */
        this.userUndislikesTuit = (req, res) => DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        this.userTogglesTuitDislikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            //@ts-ignore
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            try {
                const userAlreadyDislikedTuit = yield DislikeController.dislikeDao
                    .findUserDislikesTuit(userId, tid);
                const userAlreadyLikedTuit = yield DislikeController.likeDao
                    .findUserLikesTuit(userId, tid);
                const howManyDislikedTuit = yield DislikeController.dislikeDao
                    .findTuitDislikesCount(tid);
                const howManyLikedTuit = yield DislikeController.likeDao
                    .countHowManyLikedTuit(tid);
                let tuit = yield DislikeController.tuitDao.findTuitById(tid);
                if (userAlreadyDislikedTuit) {
                    yield DislikeController.dislikeDao.userUndislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
                else {
                    yield DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                    if (userAlreadyLikedTuit && howManyLikedTuit > 0) {
                        tuit.stats.likes = howManyLikedTuit - 1;
                    }
                    yield DislikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                ;
                yield DislikeController.tuitDao.updateDislikes(tid, tuit.stats);
                console.log("dislike toggle", tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
        this.findUserDislikesTuit = (req, res) => {
            const uid = req.params.uid;
            const tid = req.params.tid;
            // @ts-ignore
            const profile = req.session['profile'];
            //@ts-ignore
            const userId = uid === "me" && profile ?
                profile._id : uid;
            //@ts-ignore
            DislikeController.dislikeDao.findUserDislikesTuit(userId, tid)
                .then(dislikes => res.json(dislikes));
        };
    }
}
exports.default = DislikeController;
DislikeController.dislikeDao = DislikeDao_1.default.getDislike();
DislikeController.likeDao = LikeDao_1.default.getLike();
DislikeController.tuitDao = TuitDao_1.default.getTuit();
DislikeController.dislikeController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
DislikeController.getInstance = (app) => {
    if (DislikeController.dislikeController === null) {
        DislikeController.dislikeController = new DislikeController();
        app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
        app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
        app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
        app.delete("/api/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUndislikesTuit);
        app.get("/api/tuits/:tid/dislikes/count", DislikeController.dislikeController.findTuitDislikesCount);
        app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
        app.get("/api/users/:uid/userDisliked/:tid", DislikeController.dislikeController.findUserDislikesTuit);
    }
    return DislikeController.dislikeController;
};
;
