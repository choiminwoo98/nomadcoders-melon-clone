import Song from "../models/Song";
import User from "../models/User";

export const auth = async (req, res) => {
    return res.render("auth", { pageTitle: "Auth" });
};
