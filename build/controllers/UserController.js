"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
class UserController {
    constructor() {
        /**
         * Retrieves all users from the database and returns an array of users.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then((users) => res.json(users));
        /**
         * Finds a user instance from the database
         * @param {Request} req Represents client request: includes path
         * parameter uid - the primary key of the user to be removed.
         * @param {Response} res Represents response to client: includes status
         * on whether deletion successful or not.
         */
        this.findUsersByUsername = (req, res) => UserController.userDao.findUsersByUsername(req.params.username)
            .then(status => res.json(status));
        /**
         * Retrieves the user by their primary key
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user that matches the user ID
         */
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.uid)
            .then((user) => res.json(user));
        /**
         * Creates a new user instance
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new user to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new user that was inserted in the
         * database
         */
        this.createUser = (req, res) => {
            UserController.userDao.createUser(req.body)
                .then((user) => res.json(user));
        };
        /**
         * Removes a user instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));
        /**
         * Removes a user instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteUsersByUsername = (req, res) => UserController.userDao.deleteUsersByUsername(req.params.username)
            .then((status) => res.send(status));
        /**
         * Modifies an existing user instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a user was successful or not
         */
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.uid, req.body)
            .then((status) => res.send(status));
    }
}
exports.default = UserController;
UserController.userController = null;
UserController.userDao = UserDao_1.default.getUser();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @returns UserController
 */
UserController.getUserController = (app) => {
    if (UserController.userController === null) {
        UserController.userController = new UserController();
        app.get("/api/users/create", UserController.userController.createUser);
        app.get("/api/users/:uid/delete", UserController.userController.deleteUser);
        // RESTful User Web service API
        app.get("/api/users", UserController.userController.findAllUsers);
        app.get("/api/users/:username", UserController.userController.findUsersByUsername);
        app.post("/api/users", UserController.userController.createUser);
        app.put("/api/users/:uid", UserController.userController.updateUser);
        app.get("/api/users/:uid", UserController.userController.findUserById);
        app.delete("/api/users/:uid", UserController.userController.deleteUser);
        app.delete("/api/users/username/:username", UserController.userController.deleteUsersByUsername);
    }
    return UserController.userController;
};
