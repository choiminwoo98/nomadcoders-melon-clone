import Song from "../models/Song";
import User from "../models/User";

const url = `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=Korea,%20Republic%20of&limit=10&api_key=${process.env.SONG_API}&format=json`;
let data = [];
fetch(url)
    .then((response) => response.json())
    .then((json) => {
        data = json.tracks.track;
    })
    .catch((error) => console.error(error));
export const home = async (req, res) => {
    res.render("home", {
        user: req.user,
        songName: data.map((a) => a.name),
        pageTitle: "Home",
    });
};
