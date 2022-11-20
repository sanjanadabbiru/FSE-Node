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
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
const AuthenticationController = (app) => {
    const userDao = UserDao_1.default.getUser();
    const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        const password = newUser.password;
        const hash = yield bcrypt.hash(password, saltRounds);
        newUser.password = hash;
        const existingUser = yield userDao.findUsersByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = yield userDao.createUser(newUser);
            // console.log("inserted user body",insertedUser)
            insertedUser.password = '';
            // console.log("inserted user body after pass",insertedUser)
            //@ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
    const profile = (req, res) => {
        //@ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        }
        else {
            res.sendStatus(403);
        }
    };
    const logout = (req, res) => {
        //@ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    };
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log(password);
        const existingUser = yield userDao
            .findUsersByUsername(username);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        const match = yield bcrypt.compare(password, existingUser.password);
        if (match) {
            existingUser.password = '*****';
            //@ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        }
        else {
            res.sendStatus(403);
        }
    });
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/signup", signup);
};
exports.default = AuthenticationController;
