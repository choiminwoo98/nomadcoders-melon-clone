import express from "express";
import { auth } from "../controllers/authController";
const passport = require("passport");
import KakaoStrategy from "passport-kakao";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

const authRouter = express.Router();

authRouter.get("/", auth);

authRouter.get("/logout", isLoggedIn, (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy();

        res.redirect("/");
    });
});

authRouter.get("/kakao", passport.authenticate("kakao"));

authRouter.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/error",
    }),
    (req, res) => {
        res.redirect("/");
    }
);
export default authRouter;
