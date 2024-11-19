<template>
<div style="max-width: 70%; margin-left:17%;">
    <div style="background: transparent; border: 0;">
        <b-card style="background-color: transparent;border: 0;">      
                 <div align="center" class="left-half">
                   <br>
                   <br>
                   <br>
                    <TeamPreview :team_name="team_name"  
                                :teamImageURL="teamImageURL"
                                :key="team_id"></TeamPreview>
                </div>
                <div class="right-half">
                <b-carousel
                  id="carousel-1"
                  :interval="4000"
                  controls
                  indicators
                  background="transparent"
                  img-width="20%"
                  img-height="15px"
                  style="text-shadow: 1px 1px 2px #555;"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                  >
                  <!-- Text slides with image -->
                      <b-carousel-slide v-for="(player, index) in players" img-blank :key="index">
                          <template>
                              <PlayerPreview 
                              :id="player.id" 
                              :name="player.name" 
                              :team_name="player.team_name" 
                              :position="player.position" 
                              :imageURL="player.image"
                              :key="player.playerId">
                              </PlayerPreview>
                          </template>
                      </b-carousel-slide>
                  </b-carousel>
                </div>               
        </b-card>
    </div>
    <div >
    <h3 align = "center"> Past Matches</h3>
    <b-table :items="past_matches" :fields="fields_past" striped responsive="sm">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Events
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-table :items="row.item.events" :fields="fields_events" striped responsive="sm">
            <b-button size="sm" @click="row.toggleDetails">Hide Events</b-button>
          </b-table>
        </b-card>
      </template>
    </b-table>
   </div>


   <div>
    <h3 align = "center"> Future Matches</h3>
    <b-table :items="future_matches" :fields="fields_future" striped responsive="sm">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Events
        </b-button>
      </template>


    </b-table>
   </div>
</div>
</template>

<script>
import PlayerPreview from '../components/PlayerPreview'
import TeamPreview from '../components/TeamPreview'
export default {
  name: "team_page_by_id",
   components: {
    PlayerPreview,
    TeamPreview
  }, 
  data() {
    return {
        team_id: 0,
        teamImageURL: "",
        team_name: "",
        players: [],
        past_matches: [],
        future_matches: [],

        fields_past: ['match_id', 'local_team', 'visitor_team', 'date_game', 'hour', 'venue','referee', 'result', 'show_details'],
        fields_future: ['match_id', 'local_team', 'visitor_team', 'date_game', 'hour', 'venue', 'referee_id'],
        fields_events: ['minute', 'description','hour'],
        sliding: null,
        
    };
  },
  methods: {
    onSlideStart() {
        this.sliding = true
    },
    onSlideEnd() {
        this.sliding = false
    },
    async teamDetails(){
      try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/teamFullDetails/${this.$route.params.id}`,
        );
        this.team_id = response.data[0].id;
        this.teamImageURL = response.data[0].logo_path;
        this.team_name = response.data[0].name;
        this.players = [];
        this.past_matches = [];
        this.future_matches = [];
        this.players = response.data[1];
        this.past_matches = response.data[3];
        this.past_matches._showDetails = true;
        this.future_matches = response.data[2];
      } catch (error) {
        console.log(error);
      }
    },
  }, 
  mounted(){
    this.teamDetails(); 
  }
};
</script>

<style>

.left-half {
  float: left;
  width: 50%;
}
.right-half {
  float: left;
  width: 50%;
}

.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}

.row{
  margin-top:100px;
}


.carousel-1 {
    /* border-radius: 55px 55px 55px 55px; */
    height: 20%;
    width: 10%;
    margin-bottom: 60px;
    margin-top: 40px;
    margin-left: 200px;
    margin-right: 200px;
    background-color: transparent;
    opacity: 1;

}
</style>
