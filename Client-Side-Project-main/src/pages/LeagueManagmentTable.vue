<template>
    <div class="container">
      <div align="center">
        <h1> All Matches </h1>
      </div>
      <div align="center">
        <div class="left-half" align="right">
          <label style="font-weight: bold;">Sort by team name  </label>
          <input type="checkbox" :disabled="sortByDate ? true : false" id="checkBox" v-model="sortByName" value="sortPlayerByName" 
          @change="sortGamesByName">  
        </div>
        <div  class="right-half" align="right">
          <label style="font-weight: bold;">Sort by date  </label>
          <input type="checkbox" :disabled="sortByName ? true : false" id="checkBox" v-model="sortByDate" value="sortPlayerByTeam" 
          @change="sortGamesByDate">  
        </div>
      </div>
      <div>
        <b-table :items="items" :fields="fields" striped responsive="sm">

          <template  #cell(show_details)="row" >
            <b-button size="sm" v-if="isPastGame(row.item.date_game)" @click="row.toggleDetails" class="mr-2">
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

          <template #cell(local_team) = "row">
            <router-link :to="{ name: 'team_page_by_id', params: { id: row.item.local_team_id } }"> {{ row.item.local_team }}</router-link>
          </template>
          <template #cell(visitor_team) = "row">
            <router-link :to="{ name: 'team_page_by_id', params: { id: row.item.visitor_team_id } }"> {{ row.item.visitor_team }}</router-link>
          </template>
        </b-table>
      </div>

    </div>
</template>

<script>

export default {
  name: "LeagueManagmentTable",
  data() {
    return {
        fields: ['match_id', 'local_team', 'visitor_team',  'date_game', 'hour', 'venue', 'referee_id', 'result','show_details'],
        fields_events: ['minute_event', 'description_event','hour'],
        items :[],
        show_flag:false,
        sortByName:false,
        sortByDate:false,
    };
  },
  methods: {
      async getAllMatches() {
          try {
            const response = await this.axios.get("http://localhost:3000/league_manager/");
            console.log(response.data);
            console.log("aaaaa");
            this.items = response.data;
            this.items._showDetails = true; //?
          } catch (err) {
            console.log(err.response);
            alert("Incorrect details !");
          }
      },
      isPastGame(date_match) {
        const varDate = new Date(date_match); //dd-mm-YYYY
        const today = new Date();
        if (varDate < today) {
            this.show_flag = true;
            return true;
        }
        else
            return false;
      },
      showEvents() {
        if (this.show_flag == true) {
            this.show_flag = false;
            return true;
        }
        else 
          return false;
      },
      sortGamesByName(){
        if(this.sortByName){
          if(this.items.length!=0){
            this.items.sort((a,b)=> a.local_team.localeCompare(b.local_team));
          }
        }
      },
      sortGamesByDate(){
        if(this.sortByDate){
          if(this.items.length!=0){
            this.items.sort((a,b)=> a.date_game.localeCompare(b.date_game));
          }
        }
      },
  },
  mounted(){
    this.getAllMatches(); 
  }
};
</script>
<style scoped>
  .left-half {
    float: right;
    width: 70%;
  }
  .right-half {
    float: left;
    width: 30%;
  }
  .container {
    max-width: 600px;
  }
  label {
    display: inline-block;
    width: 150px;
    text-align: right;
  }
</style>