/**
 * @file Implements an Express Node HTTP server.
 */
import UserController from './controllers/UserController';
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthController";
import DislikesController from "./controllers/DislikeController";
 import UserDao from './daos/UserDao';
 import TuitDao from './daos/TuitDao';
import express from 'express';
import Request from 'express';
import Response from 'express';
const mongoose = require('mongoose');

const session = require("express-session");
const cors = require('cors')

const app = express();
const corsOptions ={
    origin:true,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
let sess = {
   secret: "hello123",
   cookie: {
       secure: false
   }
}
if (process.env.ENV === 'PRODUCTION') {
   app.set('trust proxy', 1) // trust first proxy
   sess.cookie.secure = true // serve secure cookies
}


// mongoose.connect('mongodb+srv://SanjanaDabbiru:'+process.env.DB_PASSWORD+'@cluster0.1vqotnx.mongodb.net/tuiter');
mongoose.connect(`mongodb+srv://SanjanaDabbiru:${process.env.DB_PASSWORD}@cluster0.1vqotnx.mongodb.net/tuiter`);

const bodyParser = require('body-parser');

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(session(sess))
// app.use(bodyParser.urlencoded({
// extended: false
// }));
app.get('/', (req: express.Request, res: express.Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

app.get('/hello', (req: express.Request, res: express.Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

// const userDao = new UserDao();
// const tuitDao = new TuitDao();
// const userController = new UserController(app,userDao);
// const tuitController = new TuitController(app,tuitDao);

AuthenticationController(app);
const userController = UserController.getUserController(app);
const tuitController = TuitController.getTuitController(app);
const likesController = LikeController.getLikeController(app);
const followController = FollowController.getFollowController(app);
const bookmarkController = BookmarkController.getBookmarkController(app);
const messageController = MessageController.getMessageController(app);
const dislikesController = DislikesController.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4003;
app.listen(process.env.PORT || PORT);