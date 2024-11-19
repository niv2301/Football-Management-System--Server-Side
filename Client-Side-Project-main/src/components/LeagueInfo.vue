<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title align = "center">{{leagueName}}</b-card-title>
      <b-card-text>
        <div class="game-content">
        <span> Season: {{ season }} </span><br>
        <span> Stage: {{ stage }} </span><br>   
        </div>
        <GamePreview
          :match_id="parseInt(next_match.match_id)" 
          :hostTeam="next_match.hostTeam" 
          :awayTeam="next_match.awayTeam" 
          :date_match_new="next_match.date_match_new" 
          :hour="next_match.hour" 
          :venue="next_match.venue_name" 
          :image_venue="next_match.venue_image"
          :key="next_match.match_id">
        </GamePreview>
        
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name : "LeagueInfo",
  components: {
    GamePreview,
  },
  data() {
    return {
      leagueName : "", 
      season : "", 
      stage : "",
      next_match : [],
    };
  },
  created() {
    this.getDetails();   
  },
  methods: {
    async getDetails() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/league/getDetails`
        );
        this.leagueName = response.data.league_name;
        this.season = response.data.current_season_name;
        this.stage = response.data.current_stage_name;
        this.next_match = response.data.next_match;
        // console.log(this.next_match);

      } catch (err) {
        console.log(err.response);
      }
    },
  },
}
</script>

<style>
.game-content {
  width: 100%;
  overflow: hidden;
}
.league-preview {
  display: inline-block;
  width: 50%;
  height: 10%;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(63, 67, 70);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>