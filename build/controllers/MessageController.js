"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages to retrieve all the tuits messaged by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/messages to retrieve all users that messaged a tuit
 *     </li>
 *     <li>POST /api/users/:uid/messages/:tid to record that a user messages a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/messages/:tid to record that a user
 *     no londer messages a tuit</li>
 *    <li>DELETE /api/users/:uid/messages/ to record that a user
 *     no londer messages all messaged tuits</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
class MessageController {
    constructor() {
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid1 and uid2 representing the user that is sending
         * the message and the user being messaged
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new message that was inserted in the
         * database
         */
        this.userMessagesUser = (req, res) => MessageController.messageDao.userMessagesUser(req.params.uid1, req.params.uid2, req.body)
            .then((message) => res.json(message));
        /**
         * Retrieves all messages sent by user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the message objects
         */
        this.findAllMessagesSentByUser = (req, res) => MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters mid representing the message.
         * @param {Response} res Represents response to client, including status
         * on whether deleting the message was successful or not
         */
        this.userDeletesMessage = (req, res) => MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid representing the user whose sent messages
         * need to be deleted.
         * @param {Response} res Represents response to client, including status
         * on whether deleting the messages was successful or not
         */
        this.userDeletesAllSentMessages = (req, res) => MessageController.messageDao.userDeletesAllSentMessages(req.params.uid)
            .then(status => res.send(status));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid representing the user whose received messages
         * need to be deleted.
         * @param {Response} res Represents response to client, including status
         * on whether deleting the messages was successful or not
         */
        this.userDeletesAllReceivedMessages = (req, res) => MessageController.messageDao.userDeletesAllReceivedMessages(req.params.uid)
            .then(status => res.send(status));
        /**
         * Retrieves all messages received by user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the message objects
         */
        this.findAllMessagesReceivedByUser = (req, res) => MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));
    }
}
exports.default = MessageController;
MessageController.messageController = null;
MessageController.messageDao = MessageDao_1.default.getMessage();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return MessageController
 */
MessageController.getMessageController = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessagesUser);
        app.delete("/api/users/:uid/messages", MessageController.messageController.userDeletesAllReceivedMessages);
        app.get("/api/users/:uid/sentmessages", MessageController.messageController.findAllMessagesSentByUser);
        app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
        app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesReceivedByUser);
        app.delete("/api/users/:uid/sentmessages", MessageController.messageController.userDeletesAllSentMessages);
    }
    return MessageController.messageController;
};
;
