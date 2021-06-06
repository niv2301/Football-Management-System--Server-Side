var express = require("express");
var router = express.Router();
const match_utils = require("./utils/match_utils");



router.get("/", async (req, res, next) => {
try {
    
    const prev_matches = await match_utils.getPreviousWeeklyMatches();
    const prev_matches_relevant_info = await match_utils.extractRelevantGamesData(prev_matches);
    let previous_matches =[];
    for(let i =0; i<prev_matches.length; i++){
        previous_matches.push(await match_utils.AddEventLogAndResult(prev_matches_relevant_info[i]));
    }

    const all_future_matches = await match_utils.getFutureWeeklyMatches();
    let future_matches_relevat_data = await match_utils.extractRelevantGamesData(all_future_matches);

    let all_matches =[previous_matches,future_matches_relevat_data];
    if (all_matches[0].length == 0 && all_matches[1].length == 0)
        res.send({ status: 204, message: "no games found" });
    else
        res.status(200).send(all_matches);
}


catch (error) {
    next(error);
}
});

module.exports = router;
