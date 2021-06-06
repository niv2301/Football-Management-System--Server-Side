const axios = require("axios");
const { DateTime } = require("mssql");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");


async function addMatch(host_team_name, away_team_name,date_match,referee_id){
  const host_teamsByName = await axios.get(`${api_domain}/teams/search/${host_team_name}`, {
    params: {
      api_token: process.env.api_token,
      include: "venue",
    },
  });
  let host_team_id = host_teamsByName.data.data[0].id;

  const away_teamsByName = await axios.get(`${api_domain}/teams/search/${away_team_name}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  let away_team_id = away_teamsByName.data.data[0].id;
  let venue_id = host_teamsByName.data.data[0].venue.data.id;
  await DButils.execQuery(
    `insert into dbo.matches values ('${host_team_id}','${away_team_id}','${date_match}','${venue_id}','${referee_id}','${''}')`
  );
}

async function getManager(){
    const users = await DButils.execQuery("SELECT * FROM dbo.users"); 
    return users[0];
}

exports.addMatch = addMatch;
exports.getManager = getManager;