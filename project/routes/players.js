var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");
const team_utils = require("./utils/team_utils");

router.get("/previewPlayerInfo/id/:playerId", async (req, res, next) => {
    try {
      const idArray = JSON.parse(req.params.playerId);
      const results = await players_utils.getPlayersInfo(idArray);
      res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  });
  
  router.get("/fullPlayerInfo/id/:playerId", async (req, res, next) => {
    try {
      const idArray = JSON.parse(req.params.playerId);
      const results = await players_utils.getFullPlayersInfo(idArray);
      res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;
