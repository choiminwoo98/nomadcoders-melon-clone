import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { isLoggedIn, localsMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import authRouter from "./routers/authRouter";
import passport from "passport";
const passportConfig = require("./passport");

const app = express();
const logger = morgan("dev");
passportConfig();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(flash());
app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", rootRouter);
app.use("/auth", authRouter);

/*
Add more routers here!
*/

export default app;
