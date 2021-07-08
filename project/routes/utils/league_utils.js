const axios = require("axios");
const DButils = require("./DButils");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";

const LEAGUE_ID = 271;
const SEASON_ID = 18334;


async function getLeagueDetails() {
  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`,
    {
      params: {
        include: "season",
        api_token: process.env.api_token,
      },
    }
  );
  const stage = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/stages/season/${SEASON_ID}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );

  const match = await DButils.execQuery(
    `select top 1 match_id,host_team_id,away_team_id,date_match,stadium_id,referee_id
    from dbo.matches where date_match >= CAST(CURRENT_TIMESTAMP AS datetime)
    ORDER BY CONVERT(DateTime, date_match ,101)`
  );

  const team1 = await axios.get(`${api_domain}/teams/${match[0].host_team_id}`, {
    params: {
      include: "venue",
      api_token: process.env.api_token,
    },  
  });
  match[0].hostTeam =  team1.data.data.name;
  const team2 = await axios.get(`${api_domain}/teams/${match[0].away_team_id}`, {
    params: {
      api_token: process.env.api_token,
    },  
  });
  match[0].awayTeam =  team2.data.data.name;
  match[0].venue_name = team1.data.data.venue.data.name;
  match[0].venue_image = team1.data.data.venue.data.image_path;

  const isoDate = new Date(match[0].date_match);
  const mySQLDateString2 = isoDate.toJSON().slice(0, 16);
  match[0].date_match_new = mySQLDateString2.split('T')[0];
  match[0].hour = mySQLDateString2.split('T')[1].substring(0,5); 


  return {
    league_name: league.data.data.name,
    current_season_name: league.data.data.season.data.name,
    current_stage_name: stage.data.data[3].name,
    next_match: match[0]
  };
}

exports.getLeagueDetails = getLeagueDetails;
