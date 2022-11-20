/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController implements the follows resource's RESTful Web service API.
 * Defines the following HTTP endpoints:
 *     <li>POST /api/users/:uid1/follows/:uid2 user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid1/follows/:uid2 user unfollows another user
 *     </li>
 *     <li>GET /api/users/:uid/follows to get a list of other users a user is following
 *     </li>
 *     <li>GET /api/users/:uid/followers to get a list of other users that are following them
 *     no londer follows a user</li>
 *    <li>DELETE /api/users/:uid/followers user unfollows all followers
 *     </li>
 *   <li>DELETE /api/users/:uid/follows user unfollows all users they are following
 *     </li>

 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followController: FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getFollow();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getFollowController = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/follows/:uid2", FollowController.followController.userUnfollowsUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatFollowUser);
            app.delete("/api/users/:uid/followers", FollowController.followController.allFollowersUnfollowUser);
            app.delete("/api/users/:uid/follows", FollowController.followController.userUnfollowsAllUsers);
        }
        return FollowController.followController;
    }


    /**
     * searches the database for all users who have followed a certain user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves from the database all users that a user is following.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followed the users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Contains the path parameters uid and uid, which stand for the user who
     is following and unfollowing the other user, respectively. Represents client request.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Contains the path parameters uid and uid, which stand for the user who
     is unfollowing the user and the user who is being unfollowed, respectively.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is losing
     * all their followers
     * @param {Response} res Represents response to client, including status
     * on whether deleting the followers was successful or not
     */
    allFollowersUnfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.allFollowersUnfollowUser(req.params.uid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is unfollowing
     * all users
     * @param {Response} res Represents response to client, including status
     * on whether unfollowing the users was successful or not
     */
    userUnfollowsAllUsers = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAllUsers(req.params.uid)
            .then(status => res.send(status));
};