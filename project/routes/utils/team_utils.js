const axios = require("axios");
const exp = require("constants");
const { DateTime } = require("mssql");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");
const match_utils = require("./match_utils");
const LEAGUE_ID = 271;
const SEASON_ID = 18334;

async function searchTeamByName(team_name) {
    const teamsByName = await axios.get(`${api_domain}/teams/search/${team_name}`, {
        params: {
          api_token: process.env.api_token,
          include: "venue",
        },
    });

    let relevant_teams = [];
    for (let i = 0; i < teamsByName.data.data.length; i++){
        if(teamsByName.data.data[i].current_season_id == SEASON_ID){
            relevant_teams.push(teamsByName.data.data[i]);
        }
    }
    if (relevant_teams.length == 0)
        return relevant_teams;
    return extractRelevantTeamData(relevant_teams);
}

async function getTeamsNames(SEASON_ID) {
  const teams = await axios.get(`${api_domain}/teams/season/${SEASON_ID}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  const team_names = [];
  for (var i = 0 ; i < teams.data.data.length; i++) {
    team_names.push(teams.data.data[i].name);
  }
  return team_names;
}

getTeamsNames
async function generalInfo(team_id) {
  const teamById = await axios.get(`${api_domain}/teams/${team_id}`, {
      params: {
        api_token: process.env.api_token,
      },
  });

  return {
    id: teamById.data.data.id,
    name: teamById.data.data.name,
    logo_path: teamById.data.data.logo_path
  };
}
  
function extractRelevantTeamData(teams_array) {
  return teams_array.map((team) => {
    const { name, logo_path, id} = team;
    return {
      team_id: id,
      team_name: name,
      logo: logo_path,
    };
  });
}

async function futureGamesInTeam(team_id) {
  const future_matches = await DButils.execQuery(
    `select * from dbo.matches where host_team_id='${team_id}' 
    or away_team_id='${team_id}' and date_match >= CAST(CURRENT_TIMESTAMP AS datetime) ORDER BY 
    CONVERT(DateTime, date_match ,101)`
  );

  if (future_matches.length == 0)
      return future_matches;
  return await match_utils.extractRelevantGamesData(future_matches);
}

async function pastGamesInTeam(team_id) {
  
  let start_date = '2020-09-11';
  var today = new Date();
  var end_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const prev_games = await axios.get(`${api_domain}/fixtures/between/${start_date}/${end_date}/${team_id}`, {
      params: {
        api_token: process.env.api_token,
        include: "visitorTeam,venue,referee,localTeam,events",
      },
  });

  if (prev_games.data.data.length == 0)
      return prev_games.data.data;
  return match_utils.extractRelevantPastGamesData(prev_games.data.data);
}

  exports.generalInfo = generalInfo;
  exports.searchTeamByName = searchTeamByName;
  exports.pastGamesInTeam = pastGamesInTeam;
  exports.futureGamesInTeam = futureGamesInTeam;
  exports.getTeamsNames = getTeamsNames;
