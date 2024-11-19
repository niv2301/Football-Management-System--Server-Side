<template>
  <div>
    <div class="container">
      <div class="left-half">
        <h2 class="title" align = "center">Search Team</h2>
        <div>
          <b-input-group id="search-input">
            <b-form-input v-model="searchTeam"></b-form-input>
            <b-input-group-append>
              <b-button class="navbar navbar-dark bg-dark" variant="success" @click="findSearchTeam">Search</b-button>
            </b-input-group-append>
          </b-input-group>
          <br>
          <div align = "center">
            <span><h6 style="font-weight: bold;">Sort teams by alphabetical order</h6></span>
            <input type="checkbox" id="checkBox" v-model="sortTeams" value="sortByName" 
            @change="sortTeamsByAlphabet">  
          </div>
          <br> 
          <br>
        </div>
        <div class="content">
          <b-carousel
                id="carousel-1"
                :interval="10000"
                v-if="searchTeamClicked || lastQueryTerm!='' "
                controls
                indicators
                background="transparent"
                img-width="20%"
                img-height="11%"
                style="text-shadow: 1px 1px 2px #555;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                >
                  <b-carousel-slide v-for="(team, index) in teams" img-blank :key="index">
                          <TeamPreview  :team_name="team.team_name"  
                          :teamImageURL="team.logo"
                          :team_id="team.team_id"
                          :key="team.team_id"></TeamPreview>
                  </b-carousel-slide>
          </b-carousel>
          <span v-if="searchTeamClicked && teams.length>0" class="mt-4"> found: {{ this.teams.length }} results<br></span>
          <span v-else-if="searchTeamClicked && teams.length==0" class="mt-4"> No teams found<br></span>
        </div>
      </div>
      <div class="right-half">
        <h2 class="title" align = "center">Search Player</h2>
        <div>
          <b-input-group id="search-input">
            <b-form-input v-model="searchPlayer"></b-form-input>
            <b-input-group-append>
              <b-button class="navbar navbar-dark bg-dark" variant="success" @click="findSearchPlayer">Search</b-button>
            </b-input-group-append>
          </b-input-group>
          <br/>
          <div align="center"> 
            <div class="right-half" align = "center" style="width: 70%;">
              <h6 class="title" style="font-weight: bold;">Filter By: (OPTIONAL)</h6>
              <!-- Using modifiers -->
              <b-button @click="showDropDown" v-b-toggle.collapse-2 class="m-1">Position</b-button>
              <!-- Using value -->
              <b-button @click="showTextTeam" v-b-toggle="'collapse-2'" class="m-1">Team name</b-button>
              <!-- <b-button align= "center" @click="findSearchPlayer" class="navbar navbar-dark bg-dark" variant="success">Search</b-button> -->
              <br>
              <br>
              <!-- Element to collapse -->
              <b-collapse id="collapse-2">
                <b-card v-if="showDropDownPos===true" class="background-search">
                  <b-dropdown dropright size="sm" :text="buttonTitle" split-class="m-2">
                    <b-dropdown-item @click="buttonTitle = i.toString() " v-for="i in 11" :key="i">{{ i }}</b-dropdown-item>
                  </b-dropdown>
                </b-card>
                <b-card v-else-if="showText===true" class="background-search">
                  <b-form-input v-model="textTeam"></b-form-input>

                </b-card>
              </b-collapse>
              <br>
              <br>
            </div>
            <div class="left-half" style="width: 30%;">
              <div align = "center">
                <span><h6 style="font-weight: bold;">Sort by name</h6></span>
                <input type="checkbox" :disabled="sortByTeam ? true : false" id="checkBox" v-model="sortByName" value="sortPlayerByName" 
                @change="sortPlayersByName">  
              </div>
              <div align = "center">
                <span><h6 style="font-weight: bold;">Sort by team</h6></span>
                <input type="checkbox" :disabled="sortByName ? true : false" id="checkBox" v-model="sortByTeam" value="sortPlayerByTeam" 
                @change="sortPlayersByTeam">  
              </div>
            </div>
            <br>
            <br>
            <span v-if="searchPlayerClicked && players.length>0" class="mt-4"> found: {{ this.players.length }} results<br></span>
            <span v-else-if="searchPlayerClicked && players.length==0" class="mt-4"> No players found<br></span>
            
          </div>
          <br>
          <div class="content">
            <b-carousel
                  id="carousel-2"
                  v-if="searchPlayerClicked && players.length>0"
                  :interval="10000"
                  controls
                  indicators
                  background="transparent"
                  img-width="20%"
                  img-height="12%"
                  style="opacity:1;text-shadow: 1px 1px 2px #555;"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                  >
                    <b-carousel-slide v-for="(player, index) in players" img-blank :key="index">
                            <PlayerPreview :id="player.id" 
                              :team_name="player.team_name" 
                              :name="player.name" 
                              :position="player.position" 
                              :imageURL="player.image" 
                              :key="player.id">
                            </PlayerPreview>
                    </b-carousel-slide>
            </b-carousel>
         </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import TeamPreview from '../components/TeamPreview'
import PlayerPreview from '../components/PlayerPreview'
export default {
  components: {
    TeamPreview,
    PlayerPreview,
  },
  data() {
    return {
      //details for the PlayerSearch
      players: [],
      textTeam: "",
      searchPlayer: "",
      showDropDownPos: true, //showDropDownPos and showText are check if one of the filters is on
      showText: true,
      searchTeamClicked: false, /// hide/show the answers of the other search (there is a team search and a player search)
      searchPlayerClicked: false, /// hide/show the answers of the other search (there is a team search and a player search)
      buttonTitle: "optional",
      sortTeams:false,
      sortByName:false,
      sortByTeam:false,
      //details for the TeamSearch
      searchTeam: "",
      searchQuery: "",
      teams: [],
      unsortTeams : [],
      slide: 0,
      sliding: null,

      ///local storage of team search
      lastQueryTeam: "",
      lastQueryTerm: "",

    };
  },
  mounted(){
    this.lastQueryTerm = localStorage.getItem("lastQueryTerm");

    this.loadHistorySearch();
  },
  methods: {
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
    async loadHistorySearch() {
      try {
        if (this.$root.store.username) {
          if (localStorage.lastQueryTeam) {
            this.searchTeam = localStorage.lastQueryTerm;
            this.teams = JSON.parse(localStorage.lastQueryTeam);
            
          }else if(localStorage.lastQueryPlayers){
            this.searchPlayer = localStorage.lastQueryTermPlayer;
            if(localStorage.lastQueryFilterPosition){
              this.buttonTitle = localStorage.lastQueryFilterPosition;
            }
            if(localStorage.lastQueryFilterTeamName){
              this.textTeam = localStorage.lastQueryFilterTeamName;
            }
             this.players = JSON.parse(localStorage.lastQueryPlayers);
          }
        } else {
          if (localStorage.lastQueryTeam) {
            localStorage.removeItem("lastQueryTeam");
            localStorage.removeItem("lastQueryTerm");
          }
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    async showDropDown(){
      this.showDropDownPos = true;
      this.showText = false;
      this.textTeam = "";
    },
    async showTextTeam(){
      this.buttonTitle = "optional";
      this.showDropDownPos = false;
      this.showText = true;
    },
    async findSearchTeam(){
      if(this.searchTeam!= ""){
          try {
            const response = await this.axios.get(
              `http://localhost:3000/search/searchTeamByName/${this.searchTeam}`,
            );
            if(response.data.status == 204){
              this.teams = [];      
              this.unsortTeams = [];     
            }
            else{
              this.teams = response.data;
              this.unsortTeams = response.data;
            }
            this.searchTeamClicked = true;
            this.searchPlayerClicked = false;
            if (this.$root.store.username) {
              localStorage.setItem("lastQueryTerm", this.searchTeam);
              localStorage.setItem("lastQueryTeam", JSON.stringify(this.teams));
              localStorage.removeItem("lastQueryTermPlayer");
              localStorage.removeItem("lastQueryFilterPosition");
              localStorage.removeItem("lastQueryFilterTeamName");
              localStorage.removeItem("lastQueryPlayers");

            }
            

          } catch (error) {
            console.log(error);
          }
      }
      else{
        alert("Please insert name of team!")
      }
    },
    async findSearchPlayer(){
      if(this.searchPlayer!= ""){
        try{
            if(this.buttonTitle === "optional" && this.textTeam ===""){
              var response = await this.axios.get(
              `http://localhost:3000/search/searchPlayerByName/${this.searchPlayer}`,
              );
              if (this.$root.store.username) {
                localStorage.setItem("lastQueryTermPlayer", this.searchPlayer);
                localStorage.removeItem("lastQueryFilterPosition");
                localStorage.removeItem("lastQueryFilterTeamName");
                localStorage.removeItem("lastQueryTeam");
                localStorage.removeItem("lastQueryTerm");
              }
            }
            else if (this.buttonTitle != "optional" && this.textTeam === ""){
              var response = await this.axios.get(
              `http://localhost:3000/search/searchPlayerByNameAndByPosition/player_name/${this.searchPlayer}/position_id/${this.buttonTitle}`,
              );
              if (this.$root.store.username) {
              localStorage.setItem("lastQueryTermPlayer", this.searchPlayer);
              localStorage.setItem("lastQueryFilterPosition", this.buttonTitle);
              localStorage.removeItem("lastQueryFilterTeamName");
              localStorage.removeItem("lastQueryTeam");
              localStorage.removeItem("lastQueryTerm");
              
              //  JSON.stringify(this.teams));
              }
            }
            else if (this.buttonTitle === "optional" && this.textTeam != ""){
              var response = await this.axios.get(
              `http://localhost:3000/search/searchPlayerByNameAndByTeam/player_name/${this.searchPlayer}/team_name/${this.textTeam}`,
              );
              if (this.$root.store.username) {
                localStorage.setItem("lastQueryTermPlayer", this.searchPlayer);
                localStorage.setItem("lastQueryFilterTeamName", this.textTeam);
                localStorage.removeItem("lastQueryFilterTeamName");
                localStorage.removeItem("lastQueryTeam");
                localStorage.removeItem("lastQueryTerm");
              }
            }

            if(response.data.status == 204)
              this.players = [];           
            else
              this.players = response.data;

            if (this.$root.store.username) {
              localStorage.setItem("lastQueryPlayers", JSON.stringify(this.players));
            }


            this.searchPlayerClicked = true;
            this.searchTeamClicked = false;
        } catch(error){
          console.log("error in PlayerView")
          console.log(error);  
        }
      }
      else{
        alert("Please insert name of player!")
      } 
    },
    sortTeamsByAlphabet(){
      if(this.sortTeams){
        if(this.teams.length!=0){
          this.teams.sort((a,b)=> a.team_name.localeCompare(b.team_name));
        }
      }
    },
    sortPlayersByName(){
      if(this.sortByName){
        if(this.players.length!=0){
          this.players.sort((a,b)=> a.name.localeCompare(b.name));
        }
      }
    },
    sortPlayersByTeam(){
      if(this.sortByTeam){
        if(this.players.length!=0){
          this.players.sort((a,b)=> a.team_name.localeCompare(b.team_name));
        }
      }
    },

  },
}

</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 80%; 
  /* border: 100px; */
}
/* Pattern styles */
.left-half {
  float: left;
  width: 50%;
}
.right-half {
  float: left;
  width: 50%;
}

.content {
  height: 800px;
  width: 100%;
}

.background-search{
  /* background-color: rgb(194, 64, 64); */
  background-color: transparent;
  border:0;

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

.carousel-2 {
    border-radius: 55px 55px 55px 55px;
    overflow: hidden;
    height: 50%;
    width: 50%;
    margin-bottom: 60px;
    margin-top: 40px;
    margin-left: 200px;
    margin-right: 200px;
        background-color: transparent;

}

b-carousel-slid {
    border-radius: 55px 55px 55px 55px;
}
</style>