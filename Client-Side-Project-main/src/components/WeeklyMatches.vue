<template>
  <div>
    <div>
    <h3 align = "center"> Past Matches</h3>
    <b-table :items="items_past" :fields="fields_past" striped responsive="sm">
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

      
       <template #cell(local_team) = "row">
        <router-link :to="{ name: 'team_page_by_id', params: { id: row.item.local_team_id } }"> {{ row.item.local_team }}</router-link>
      </template>
      <template #cell(visitor_team) = "row">
        <router-link :to="{ name: 'team_page_by_id', params: { id: row.item.visitor_team_id } }"> {{ row.item.visitor_team }}</router-link>
      </template>
    </b-table>
   </div>

   <div>
    <h3 align = "center"> Future Matches</h3>
    <b-table :items="items_future" :fields="fields_future" striped responsive="sm">
      <template v-if="$root.store.username" #cell(add_to_favorites)="row" >
        <b-button size="sm" @click="addGameToFavorite(row.item.match_id)" class="mr-2">
          {{ row.detailsShowing ? 'Delete' : 'Add'}} to favorite
        </b-button>
      </template>
      <template v-else #cell(add_to_favorites)>
        <h7 style="font-weight: bold;">only for registered users</h7>
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
      data() {
        return {
          fields_past: ['match_id', 'local_team', 'visitor_team',  'date_game', 'hour', 'venue', 'referee_id', 'result', 'show_details'],
          fields_future: ['match_id', 'local_team', 'visitor_team', 'date_game', 'hour', 'venue', 'referee_id', 'add_to_favorites'],
          fields_events: ['minute_event', 'description_event','hour'],
          items_past :[],
          items_future:[],
        }
      },
      methods: {
        async GetWeeklyMatches() {
          try {
            const response = await this.axios.get("http://localhost:3000/weekly_matches/", );
            this.items_past =[];
            this.items_future =[];
            this.items_past = response.data[0];
            this.items_past._showDetails = true;
            this.items_future = response.data[1];

          } catch (err) {
            console.log(err.response);
            alert("Incorrect details !");
          }
        },
        async addGameToFavorite(match_id){
          try{
            const response = await this.axios.post("http://localhost:3000/users/addMatchToFavorite", {
            match_id: match_id,
            });
            
            if (response.status == 201) {
              this.$root.toast("Add game successfully", "Game has been added to your favorites successfully", "success");
            }
          }
          catch(error){
            this.$root.toast("Error!", "This game is already in your favorite", "danger");
          }
        }
      },
      mounted(){
        this.GetWeeklyMatches(); 
      }
  }
    
</script>