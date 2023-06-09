export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "XXXX";
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send("로그인 필요");
    }
};
export const isNotLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent("로그인한 상태");
        res.redirect(`/?error=${message}`);
    }
};
