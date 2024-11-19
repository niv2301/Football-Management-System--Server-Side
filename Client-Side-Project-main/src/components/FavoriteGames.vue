<template>
   <div align = "left">
    <b-card align = "left" style="background:transparent; border:0;">      
        <b-card-text style="color: black;"> 
          <b-carousel
          id="carousel-1"
          :interval="10000"
          controls
          indicators
          background="transparent"
          img-width="30%"
          img-height="20%"
          style="text-shadow: 1px 1px 2px #555;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
          >
          <!-- Text slides with image -->
              <b-carousel-slide v-for="(match, index) in matches" img-blank :key="index">
                  <template align = "left">
                      <GamePreview
                        :match_id="match.match_id" 
                        :hostTeam="match.local_team" 
                        :awayTeam="match.visitor_team" 
                        :date_match_new="match.date_game" 
                        :hour="match.hour" 
                        :venue="match.venue"
                        :image_venue="match.image_venue"
                        :key="match.match_id"
                        ></GamePreview>
                  </template>
              </b-carousel-slide>
          </b-carousel>               
        </b-card-text>
    </b-card>
    </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      matches: [],
      sliding: null,

    };
  },
  created() {
    console.log("favorite updateMatches mounted");
    this.updateMatches();   
  },
  methods: {
    onSlideStart() {
        this.sliding = true
    },
    onSlideEnd() {
        this.sliding = false
    },
    async updateMatches(){
      console.log("response");
      try {
        const response = await this.axios.get(
          this.$root.store.BASE_URL + "/users/favoriteMatchesTop3",
        );
        const games = response.data;
        if(games.length == 0){

        }
        console.log(games);
        this.matches.push(...games);
      } catch (error) {
        console.log("error in update updateMatches")
        console.log(error);
      }
    },
  }, 
};
</script>

<style>
.carousel-1 {
    /* border-radius: 55px 55px 55px 55px; */
    height: 10%;
    width: 10%;
    margin-bottom: 60px;
    margin-top: 20%;
    margin-left: 20%;
    margin-right: 200px;
    background-color: transparent;
    opacity: 1;

}
</style>
