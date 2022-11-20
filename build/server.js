"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const session = require("express-session");
const cors = require('cors');
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:4005',
    credentials: true,
    optionSuccessStatus: 200
};
let sess = {
    secret: "hello123",
    cookie: {
        secure: false
    }
};
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
// mongoose.connect('mongodb+srv://SanjanaDabbiru:'+process.env.DB_PASSWORD+'@cluster0.1vqotnx.mongodb.net/tuiter');
mongoose.connect(`mongodb+srv://SanjanaDabbiru:${process.env.DB_PASSWORD}@cluster0.1vqotnx.mongodb.net/tuiter`);
const bodyParser = require('body-parser');
app.use(cors(corsOptions));
// app.use(cors());
app.use(express_1.default.json());
app.use(session(sess));
// app.use(bodyParser.urlencoded({
// extended: false
// }));
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering!'));
app.get('/hello', (req, res) => res.send('Welcome to Foundation of Software Engineering!'));
// const userDao = new UserDao();
// const tuitDao = new TuitDao();
// const userController = new UserController(app,userDao);
// const tuitController = new TuitController(app,tuitDao);
(0, AuthController_1.default)(app);
const userController = UserController_1.default.getUserController(app);
const tuitController = TuitController_1.default.getTuitController(app);
const likesController = LikeController_1.default.getLikeController(app);
const followController = FollowController_1.default.getFollowController(app);
const bookmarkController = BookmarkController_1.default.getBookmarkController(app);
const messageController = MessageController_1.default.getMessageController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4003;
app.listen(process.env.PORT || PORT);
