const axios = require("axios");
const DButils = require("./DButils");

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
    `select top 1 host_team_id,away_team_id,date_match,stadium_id,referee_id
    from dbo.matches where date_match >= CAST(CURRENT_TIMESTAMP AS datetime)
    ORDER BY CONVERT(DateTime, date_match ,101)`
  );


  return {
    league_name: league.data.data.name,
    current_season_name: league.data.data.season.data.name,
    current_stage_name: stage.data.data[3].name,
    next_match: match[0]
  };
}

exports.getLeagueDetails = getLeagueDetails;
