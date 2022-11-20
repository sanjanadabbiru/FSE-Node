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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of BookmarkDao
 */
class FollowDao {
    constructor() {
        /**
         * Uses FollowDao to insert follow instance into the database
         * @param {string} uid1 User 1 primary key
         * @param {string} uid2 User 2 primary key
         * @returns Promise To be notified when follow is inserted into the database
         */
        this.userFollowsUser = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ user: uid2, followedBy: uid1 }); });
        /**
         * Removes follow instance from the database.
         * @param {string} uid1 User 1 primary key
         * @param {string} uid2 User 2 primary key
         * @returns Promise To be notified when follow is removed from the database
         */
        this.userUnfollowsUser = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ user: uid2, followedBy: uid1 }); });
        /**
         * Uses FollowDao to retrieve all user documents from users collection that follow a User
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the users are retrieved from
         * database
         */
        this.findAllUsersThatFollowUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ user: uid })
                .populate("followedBy")
                .exec();
        });
        /**
         * Uses FollowDao to retrieve all user documents from users collection that are followed by a User
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the users are retrieved from
         * database
         */
        this.findAllUsersFollowedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ followedBy: uid })
                .populate("user")
                .exec();
        });
        /**
         * Removes followers of User from the database.
         * @param {string} uid User's primary key
         * @returns Promise To be notified when followers are removed from the database
         */
        this.allFollowersUnfollowUser = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteMany({ user: uid }); });
        /**
         * Removes Users the User is following from the database.
         * @param {string} uid User's primary key
         * @returns Promise To be notified when followers are removed from the database
         */
        this.userUnfollowsAllUsers = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteMany({ followedBy: uid }); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance
 * @returns FollowDao
 */
FollowDao.getFollow = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
