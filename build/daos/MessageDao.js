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
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of LikeDao
 */
class MessageDao {
    constructor() {
        /**
         * Uses MessageDao to insert message instance into the database
         * @param {string} uid2 User 1 primary key
         * @param {string} uid2 User 2 primary key
         * @returns Promise To be notified when message is inserted into the database
         */
        this.userMessagesUser = (uid1, uid2, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { to: uid2, from: uid1 })); });
        /**
         * Removes a message instance from the database.
         * @param {string} mid Message's primary key
         * @returns Promise To be notified when message is removed from the database
         */
        this.userDeletesMessage = (mid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ _id: mid }); });
        /**
         * Uses MessageDao to retrieve all user documents from messages collection that are received by user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findAllMessagesReceivedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid })
                .populate("message")
                .exec();
        });
        /**
         * Uses MessageDao to retrieve all user documents from messages collection that are sent by user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findAllMessagesSentByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: uid })
                .populate("message")
                .exec();
        });
        /**
         * Removes all message instances received by user from the database.
         * @param {string} uid User's primary key
         * @returns Promise To be notified when messages are removed from the database
         */
        this.userDeletesAllReceivedMessages = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteMany({ to: uid }); });
        /**
         * Removes a message instances sent to user from the database.
         * @param {string} mid User's primary key
         * @returns Promise To be notified when messages are removed from the database
         */
        this.userDeletesAllSentMessages = (uid) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteMany({ from: uid }); });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessageDao
 */
MessageDao.getMessage = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
