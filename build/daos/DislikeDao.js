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
const DislikesModel_1 = __importDefault(require("../mongoose/DislikesModel"));
/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} DislikeDao Private single instance of DislikeDao
 */
class DislikesDao {
    constructor() {
        /**
      * Uses DislikeModel to retrieve all Disliked tuits by a user from Dislikes collection
      * @param {string} uid User id for which Dislikes are to be retrieved
      * @returns Promise To be notified when the Dislikes are retrieved from
      * database
      */
        this.findTuitsUserDisliked = (uid) => __awaiter(this, void 0, void 0, function* () {
            return DislikesModel_1.default
                .find({ dislikedBy: uid })
                .populate({
                path: "dislikedTuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        /**
       * Uses DislikeModel to retrieve all Dislikes from Dislikes collection
       * @param {string} tid Tuit id of tuit who Dislikes the tuit
       * @returns Promise To be notified when the Dislikes are retrieved from
       * database
       */
        this.findUsersThatDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return DislikesModel_1.default
                .find({ dislikedTuit: tid })
                .populate("dislikedBy")
                .exec();
        });
        /**
       * Uses DislikeModel to create a new Dislike for tuit.
       * @param {string} uid User id of user who Dislikes the tuit
       * @param {string} tid Tuit id of tuit to be Disliked
       * @returns Promise To be notified when the Dislikes are retrieved from
       * database
       */
        //  userDislikesTuit = async (uid: string, tid: string): Promise<any> => {
        //      DislikesModel.create({dislikedTuit: tid, dislikedBy: uid});
        //  }
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikesModel_1.default.create({ dislikedTuit: tid, dislikedBy: uid }); });
        /**
       * Uses DislikeModel to remove a  Dislike for tuit.
       * @param {string} uid User id of user who unDislikes the tuit
       * @param {string} tid Tuit id of tuit to be unDisliked
       * @returns Promise To be notified when the Dislikes are deleted from
       * database
       */
        this.userUndislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikesModel_1.default.deleteOne({ dislikedTuit: tid, dislikedBy: uid }); });
        /**
           * Uses DislikeModel to count number of Dislikes a tuit has.
           * @param {string} tid Tuit id of tuit to be unDisliked
           * @returns Promise To be notified with the total Dislikes on specific tuit.
           */
        this.findTuitDislikesCount = (tid) => __awaiter(this, void 0, void 0, function* () { return DislikesModel_1.default.countDocuments({ dislikedTuit: tid }); });
        this.findUserDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return DislikesModel_1.default.findOne({ dislikedTuit: tid, dislikedBy: uid });
        });
        this.findAllTuitsDislikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return DislikesModel_1.default
                .find({ dislikedBy: uid })
                .populate({
                path: "dislikedTuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
    }
}
exports.default = DislikesDao;
DislikesDao.DislikesDao = null;
DislikesDao.getDislike = () => {
    if (DislikesDao.DislikesDao === null) {
        DislikesDao.DislikesDao = new DislikesDao();
    }
    return DislikesDao.DislikesDao;
};
