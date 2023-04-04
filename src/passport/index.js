const passport = require("passport");
const kakao = require("./kakaoStrategy"); // 카카오서버로 로그인할때
import User from "../models/User";

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    kakao(); // 구글 전략 등록
};
