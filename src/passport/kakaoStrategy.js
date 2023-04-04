const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
import User from "../models/User";

module.exports = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
                callbackURL: "http://localhost:4000/auth/kakao/callback", // 카카오 로그인 Redirect URI 경로
            },
            async (accessToken, refreshToken, profile, done) => {
                // console.log("kakao profile", profile);
                try {
                    const existingUser = await User.findOne({
                        kakaoId: profile.id,
                    });
                    if (existingUser) {
                        return done(null, existingUser);
                    }

                    const newUser = new User({
                        kakaoId: profile.id,
                        email:
                            profile._json && profile._json.kakao_account.email,
                        displayName: profile.displayName,
                    });
                    await newUser.save();
                    done(null, newUser);
                } catch (err) {
                    done(err);
                }
            }
        )
    );
};
