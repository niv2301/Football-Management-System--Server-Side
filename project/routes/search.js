var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const team_utils = require("./utils/team_utils");


router.get("/searchTeamByName/:team_name", async (req, res, next) => {
    try {
      const results = await team_utils.searchTeamByName(req.params.team_name);
      if (results.length == 0) {
        if(req.session.user_id)
          delete req.session.last_executed_query_results;
        res.send({ status: 204, message: "A team named " + req.params.team_name + " not found" });
      }
      else {
        if(req.session.user_id) 
          req.session.last_executed_query_results = results;
        res.status(200).send(results);
      } 
      if(req.session.user_id)
        req.session.last_executed_query = [req.params.team_name]; 
    } catch (error) {
      next(error);
    }
  });


router.get("/searchPlayerByName/:player_name", async (req, res, next) => {
  try {
    const results = await players_utils.searchPlayerByName(req.params.player_name);
    if (results.length == 0) {
      if(req.session.user_id)
        delete req.session.last_executed_query_results;
      res.send({ status: 204, message: "A player named " + req.params.player_name + " not found" });
    }
    else {
      if(req.session.user_id)
        req.session.last_executed_query_results = results;
      res.status(200).send(results);
    }
    if(req.session.user_id)
      req.session.last_executed_query = [req.params.player_name];
  } catch (error) {
    next(error);
  }
});

router.get("/searchPlayerByNameAndByPosition/:player_name&:position_id", async (req, res, next) => {
  try {
    const results = await players_utils.searchPlayerByName(req.params.player_name);
    if (results.length == 0)
      res.send({ status: 204, message: "search not found!" });
    else{
      let relevant_players = [];
      for (let i = 0; i < results.length; i++){
          if(results[i].position == parseInt(req.params.position_id)){
            relevant_players.push(results[i]);
          }
      }
      if (relevant_players.length == 0) {
        if(req.session.user_id)
          delete req.session.last_executed_query_results;
        res.send({ status: 204, message: "search not found!" });
      }
      else {
        if(req.session.user_id)
          req.session.last_executed_query_results = relevant_players;
        res.status(200).send(relevant_players);
      }
      if(req.session.user_id)
        req.session.last_executed_query = [req.params.player_name,req.params.position_id];
    }  
  } catch (error) {
    next(error);
  }
});

router.get("/searchPlayerByNameAndByTeam/:player_name&:team_name", async (req, res, next) => {
  try {
    const results = await players_utils.searchPlayerByName(req.params.player_name);
    if (results.length == 0)
      res.send({ status: 204, message: "search not found!" });
    else{
      let relevant_players = [];
      for (let i = 0; i < results.length; i++){
          if(results[i].team_name.toLowerCase().includes(req.params.team_name.toLowerCase()))
            relevant_players.push(results[i]);
      }
      if (relevant_players.length == 0) {
        if(req.session.user_id)
          delete req.session.last_executed_query_results;
        res.send({ status: 204, message: "search not found!" });
      }
      else {
        if(req.session.user_id)
          req.session.last_executed_query_results = relevant_players;
        res.status(200).send(relevant_players);
      }
      if(req.session.user_id)
        req.session.last_executed_query = [req.params.player_name,req.params.team_name]
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
