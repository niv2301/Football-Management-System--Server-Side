var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  console.log(req.session.username + " is in here");
  if (req.session && req.session.username) {
    DButils.execQuery("SELECT username FROM users")
      .then((users) => {
        if (users.find((x) => x.username === req.session.username)) {
          req.username = req.session.username;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    // console.log(req);
    // console.log("------------");
    // console.log(req.session);
    // console.log("------------");
    // console.log(req.session.username);
    res.sendStatus(401);
  }
});

/**
 * for logged in user, shows his up to 3 favorite matches
 */
router.get("/favoriteMatchesTop3", async (req, res, next) => {
  try {
    const username = req.session.username;
    const favorite_matches = await users_utils.getTop3FutureFavoriteMatches(username);
    if(favorite_matches.length==0){
      res.send({ status: 204, message: "no games found" });
    }
    else{
      let favorite_matches_array = [];
      favorite_matches.map((element) => favorite_matches_array.push(element.match_id)); //extracting the players ids into array
      const results = await users_utils.getFavoriteMatchesDetails(favorite_matches_array);
      
      res.status(200).send(results);
    }
  } catch (error) {
    next(error);
  }
});





/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
router.post("/favoritePlayers", async (req, res, next) => {
  try {
    const username = req.session.username;
    const player_id = req.body.playerId;
    await users_utils.markPlayerAsFavorite(username, player_id);
    res.status(201).send("The player successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites players that were saved by the logged-in user
 */
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const username = req.session.username;
    const player_ids = await users_utils.getFavoritePlayers(username);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.player_id)); //extracting the players ids into array
    const results = await players_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});



router.get("/favoriteMatches", async (req, res, next) => {
  try {
    const username = req.session.username;
    const favorite_matches = await users_utils.getFavoriteMatches(username);
    if(favorite_matches.length==0){
      res.send({ status: 204, message: "no games found" });
    }
    else{
      let favorite_matches_array = [];
      favorite_matches.map((element) => favorite_matches_array.push(element.match_id)); //extracting the players ids into array
      const results = await users_utils.getFavoriteMatchesDetails(favorite_matches_array);
      res.status(200).send(results);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/addMatchToFavorite", async (req, res, next) => {
  try {
    const username = req.session.username;
    const match_id = req.body.match_id;
    await users_utils.markMatchAsFavorite(username, match_id);
    res.status(201).send("The match successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
