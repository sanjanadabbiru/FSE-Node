
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

export default class TuitController implements TuitControllerI {

    private static tuitController: TuitController | null = null;

    private static tuitDao: TuitDao = TuitDao.getTuit();


        /**
         * Creates singleton controller instance
         * @param {Express} app Express instance to declare the RESTful Web service
         * API
         * @return TuitController
         */
        public static getTuitController = (app: Express): TuitController => {
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
        }

        /**
         * Retrieves all tuits from the database and returns an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        findAllTuits = (req: Request, res: Response) =>
            TuitController.tuitDao.findAllTuits()
                .then((tuits: Tuit[]) => res.json(tuits));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.send(status));

        /**
         * Retrieves all tuits from the database for a particular user and returns
         * an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        findTuitsByUser = (req: Request, res: Response) => {
                // @ts-ignore
                let uId = req.params.uid === "me" && req.session['profile'] ?
                    // @ts-ignore
                    req.session['profile']._id : req.params.uid;
                if (uId == "me") {
                    res.sendStatus(403);
                } else {
                    TuitController.tuitDao.findTuitsByUser(uId)
                        .then((tuits: Tuit[]) => res.json(tuits));
                }
        }


        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the user ID
         */
        findTuitById = (req: Request, res: Response) =>
            TuitController.tuitDao.findTuitById(req.params.tid)
                .then((tuit: Tuit) => res.json(tuit));

        /**
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new tuit to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit that was inserted in the
         * database
         */
        createTuit = (req: Request, res: Response) =>{
                // @ts-ignore
                let userId = req.params.uid === "me" && req.session['profile'] ?
                    // @ts-ignore
                    req.session['profile']._id : req.params.uid;

                if (userId == "me" || req.body.tuit == "") {
                    res.sendStatus(403);
                } else {
                    TuitController.tuitDao.createTuit(userId, req.body)
                        .then((tuit: Tuit) => res.json(tuit));
                }
        }


        /**
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        deleteTuit = (req: Request, res: Response) =>
            TuitController.tuitDao.deleteTuit(req.params.tid)
                .then((status) => res.send(status));


}