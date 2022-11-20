"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
class TuitController {
    constructor() {
        /**
         * Retrieves all tuits from the database and returns an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits()
            .then((tuits) => res.json(tuits));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a tuit was successful or not
         */
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.send(status));
        /**
         * Retrieves all tuits from the database for a particular user and returns
         * an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findTuitsByUser = (req, res) => {
            // @ts-ignore
            let userId = req.params.uid === "me" && req.session['profile'] ?
                // @ts-ignore
                req.session['profile']._id : req.params.uid;
            if (userId == "me") {
                res.sendStatus(403);
            }
            else {
                TuitController.tuitDao.findTuitsByUser(userId)
                    .then((tuits) => res.json(tuits));
            }
        };
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the user ID
         */
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit) => res.json(tuit));
        /**
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new tuit to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit that was inserted in the
         * database
         */
        this.createTuit = (req, res) => {
            // @ts-ignore
            let userId = req.params.uid === "me" && req.session['profile'] ?
                // @ts-ignore
                req.session['profile']._id : req.params.uid;
            if (userId == "me" || req.body.tuit == "") {
                res.sendStatus(403);
            }
            else {
                TuitController.tuitDao.createTuit(userId, req.body)
                    .then((tuit) => res.json(tuit));
            }
        };
        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.send(status));
    }
}
exports.default = TuitController;
TuitController.tuitController = null;
TuitController.tuitDao = TuitDao_1.default.getTuit();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getTuitController = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        app.get("/api/tuits", TuitController.tuitController.findAllTuits);
        app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
        app.get("/api/tuits/:tid", TuitController.tuitController.findTuitById);
        app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);
        app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
        app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
    }
    return TuitController.tuitController;
};
