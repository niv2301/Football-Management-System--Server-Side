var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const match_utils = require("./utils/match_utils");
const manager_utils = require("./utils/manager_utils");


router.use(async function (req, res, next) {
    if (req.session && req.session.user_id) {
      await manager_utils.getManager()
        .then((manager) => {
          if (manager.user_id == req.session.user_id) {
            next();
          }
          else 
            res.status(401).send("You don't have manager permissions");
        }).catch((err) => next(err));
    } else {
      res.status(401).send("unauthorized");
    }
  });

router.get("/", async (req, res, next) => {
  try {
      
      const all_matches = await match_utils.getAllMatches();
      const all_matches_relevant_info = await match_utils.extractRelevantGamesData(all_matches);
      if (all_matches.length == 0)
        res.send({ success: 204, message: "no games found" });
      else
          res.status(200).send(all_matches_relevant_info);
  }
  catch (error) {
      next(error);
  }
  });

router.post("/addMatch", async (req, res, next) => {
  try {
    const host_team_name = req.body.host_team_name;
    const away_team_name = req.body.away_team_name;
    const date_match = req.body.date_match;
    const referee_id = req.body.referee_id;
    await manager_utils.addMatch(host_team_name, away_team_name,date_match,referee_id);
    res.status(201).send("The match successfully has added");

  } catch (error) {
    next(error);
  }
});

  module.exports = router;