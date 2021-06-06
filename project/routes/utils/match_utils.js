const axios = require("axios");
const { DateTime } = require("mssql");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");


async function getPreviousWeeklyMatches() {
  var start_round = new Date(new Date().getTime()-(3*24*60*60*1000));
  const mySQLDateString2 = start_round.toJSON().slice(0, 19); 
  const previous_matches = await DButils.execQuery(
    `select * from dbo.matches where  date_match < CAST(CURRENT_TIMESTAMP AS datetime) and
    date_match >= '${mySQLDateString2}' ORDER BY CONVERT(DateTime, date_match ,101)`
  );
  return previous_matches;
}
async function AddEventLogAndResult(game) {

  const event_log = await DButils.execQuery(
    `select minute_event,description_event from dbo.event_log where match_id = '${game.match_id}'`
  );
  game.events = event_log;
  const res_game = await DButils.execQuery(
    `select match_result from dbo.matches where match_id = '${game.match_id}'`
  );
  game.result = res_game[0].match_result;
  for (let i = 0;i < event_log.length; i++){
    var userTimezoneOffset = game.full_date.getTimezoneOffset() * 60000;
    let date = new Date(game.full_date.getTime() + userTimezoneOffset); 
    game.events[i].hour = new Date(date.getTime() + game.events[i].minute_event*60000).toString().substr(16,5);
  }
  return game;
}

async function getFutureWeeklyMatches() {
  var end_round = new Date(new Date().getTime()+(4*24*60*60*1000));
  const mySQLDateString2 = end_round.toJSON().slice(0, 19); 
  const future_matches = await DButils.execQuery(
    `select * from dbo.matches where  date_match > CAST(CURRENT_TIMESTAMP AS datetime) and
    date_match <= '${mySQLDateString2}' ORDER BY CONVERT(DateTime, date_match ,101)`
  );
  return future_matches;
}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractRelevantPlayerData(players_info);
}

function extractRelevantPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id } = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
    };
  });
}

async function getAllMatches(){
  const all_matches = await DButils.execQuery(
    `select * from dbo.matches ORDER BY CONVERT(DateTime, date_match ,101)`
  );
  return all_matches;
}

async function createGame(game) {
   
  const isoDate = new Date(game.date_match);
  let isoDateTry = new Date(isoDate.getTime());
  const mySQLDateString2 = isoDateTry.toJSON().slice(0, 16);
  let date_match = mySQLDateString2.split('T')[0];
  let time_match = mySQLDateString2.split('T')[1].substring(0,5);
  
  const team1 = await axios.get(`${api_domain}/teams/${game.host_team_id}`, {
    params: {
      include: "venue",
      api_token: process.env.api_token,
    },  
  });
  let host_team_name =  team1.data.data.name;
  const team2 = await axios.get(`${api_domain}/teams/${game.away_team_id}`, {
    params: {
      api_token: process.env.api_token,
    },  
  });
  let away_team_name =  team2.data.data.name;
  let venue_name = team1.data.data.venue.data.name;
  if ( isoDate < Date.now() ){
    return {
      match_id : game.match_id,
      date_game : date_match,
      hour : time_match,
      full_date : isoDate,
      local_team : host_team_name,
      visitor_team : away_team_name,
      venue : venue_name,
      image_venue : team1.data.data.venue.data.image_path,
      result: game.match_result
    };
  }
  return {
    date_game : date_match,
    hour : time_match,
    local_team : host_team_name,
    visitor_team : away_team_name,
    venue : venue_name,
    image_venue : team1.data.data.venue.data.image_path,
  };
}

function createPastGame(game) {
  let events_log = [];
  for (let i = 0 ; i < game.events.data.length; i++) {
    
    let event = new Object();
    event.date = game.time.starting_at.date;
    let date = new Date(game.time.starting_at.date_time);
    
    event.hour = new Date(date.getTime() + game.events.data[i].minute*60000).toString().substr(16,5);
    event.minute = game.events.data[i].minute;
    event.description = game.events.data[i].type;
    event.name_player = game.events.data[i].player_name;      
    events_log.push(event);
  }
  return {
    date_game : game.time.starting_at.date,
    hour : game.time.starting_at.time,
    local_team : game.localTeam.data.name,
    visitor_team : game.visitorTeam.data.name,
    venue : game.venue.data.name,
    image_venue : game.venue.data.image_path,
    result : game.scores.ft_score,
    referee : game.referee.data.common_name,
    events: events_log
  };
}

async function extractRelevantGamesData(future_games) {

  let games = [];
  for (let i = 0 ; i < future_games.length; i++) {
    games.push(await createGame(future_games[i]));
  }
  return games;
}

function extractRelevantPastGamesData(prev_games) {

  let games = [];
  for (let i = 0 ; i < prev_games.length; i++) {
    games.push(createPastGame(prev_games[i]));
  }
  return games;
}



exports.getPreviousWeeklyMatches = getPreviousWeeklyMatches;
exports.getFutureWeeklyMatches = getFutureWeeklyMatches;
exports.AddEventLogAndResult =AddEventLogAndResult;
exports.createGame = createGame;
exports.createPastGame = createPastGame;
exports.extractRelevantGamesData = extractRelevantGamesData;
exports.extractRelevantPastGamesData = extractRelevantPastGamesData;
exports.getAllMatches = getAllMatches;
