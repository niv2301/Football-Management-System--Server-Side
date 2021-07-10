const { DateTime } = require("mssql");
const DButils = require("./DButils");
const match_utils = require("./match_utils");


/**
  this function assumes that user only can add a future games to his favorites
  (The selection will be made solely from the table of future games)
 */
async function markMatchAsFavorite(user_id, username, match_id) {
  const isoDateString = await DButils.execQuery(
    `select date_match from dbo.matches where match_id='${match_id}'`
  );
  const isoDate = new Date(isoDateString[0].date_match);
  const mySQLDateString2 = isoDate.toJSON().slice(0, 19);

  await DButils.execQuery(
  `insert into dbo.favorite_matches values ('${user_id}','${match_id}','${mySQLDateString2}', '${username}')`
  );
}

async function markPlayerAsFavorite(username, player_id) {
  await DButils.execQuery(
    `insert into FavoritePlayers values ('${username}',${player_id})`
  );
}

async function getFavoritePlayers(username) {
  const player_ids = await DButils.execQuery(
    `select player_id from FavoritePlayers where username='${username}'`
  );
  return player_ids;
}

async function getTop3FutureFavoriteMatches(username) {
  const matches_ids = await DButils.execQuery(
    `select top 3 match_id from dbo.favorite_matches where username='${username}' 
    and date_match >= CAST(CURRENT_TIMESTAMP AS datetime) ORDER BY 
    CONVERT(DateTime, date_match ,101)`
  );
  return matches_ids;
}

async function getFavoriteMatches(username) {
  await DButils.execQuery(`delete from dbo.favorite_matches where username='${username}' 
    and date_match < CAST(CURRENT_TIMESTAMP AS datetime)`);

  const matches_ids = await DButils.execQuery(
    `select match_id from dbo.favorite_matches where username='${username}' 
    ORDER BY CONVERT(DateTime, date_match ,101)`
  );
  return matches_ids;
}

async function getFavoriteMatchesDetails(matches_ids) {

  const matches = await DButils.execQuery(
    `select match_id, host_team_id,away_team_id,date_match,stadium_id from dbo.matches where match_id
     IN (${matches_ids})  ORDER BY date_match`
  );
  return await match_utils.extractRelevantGamesData(matches);
}

exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;
exports.getFavoriteMatches = getFavoriteMatches;
exports.getTop3FutureFavoriteMatches = getTop3FutureFavoriteMatches;
exports.getFavoriteMatchesDetails = getFavoriteMatchesDetails;
exports.markMatchAsFavorite = markMatchAsFavorite;