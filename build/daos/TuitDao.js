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
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of UserDao
 */
class TuitDao {
    constructor() {
        /**
         * Uses TuitDao to retrieve all tuit documents from tuits collection.
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find(); });
        /**
         * Uses TuitDao to retrieve all tuits documents from tuits collection that are created by user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find({ postedBy: uid }); });
        /**
         * Uses TuitDao to retrieve a tuit documents created by a user from the database
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findTuitById = (tid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(tid)
                .populate("postedBy")
                .exec();
        });
        /**
         * Uses TuitDao to insert tuit instance into the database
         * @param {string} uid User's primary key
         * @returns Promise To be notified when tuit is inserted into the database
         */
        this.createTuit = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        /**
         * Uses TuitDao to update tuit instance in the database
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when tuit is updated into the database
         */
        this.updateTuit = (tid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
        /**
         * Removes a tuit instance from the database.
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when tuit is removed from the database
         */
        this.deleteTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ _id: tid }); });
        /**
       * update a tuit's stats
       * @param tid id ot the tuit
       * @param newStats new stats of the tuit
       * @returns
       */
        this.updateLikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
        this.updateDislikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance
 * @returns TuitDao
 */
TuitDao.getTuit = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
