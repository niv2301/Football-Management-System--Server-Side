<template>
  <div class="container" align="center">
    <h1 class="title" align="center">Add Match</h1>
    <div>
      <div>
        <label>Select local team:</label>
        <b-dropdown id="dropdown-offset" offset="25" :text="host_team" class="m-2">
        <b-dropdown-item @click="addLocalTeam(name)" v-for="name in team_names" :key="name">{{ name }}</b-dropdown-item>
      </b-dropdown>
      </div>
    </div>
    <div>
      <div>
        <label>Select Visitor team:</label>
        <b-dropdown id="dropdown-offset" offset="25" :text="away_team" class="m-2">
        <b-dropdown-item @click="addVisitorTeam(name)" v-for="name in team_names" :key="name">{{ name }}</b-dropdown-item>
      </b-dropdown>
      </div>
    </div>
    <div>
      <div>
        <label>Select Referee Id:</label>
        <b-dropdown id="dropdown-offset3" offset="25" :text="referee_id" class="m-2">
        <b-dropdown-item @click="addRefereeId(name)" v-for="name in refereeIds" :key="name">{{ name }}</b-dropdown-item>
      </b-dropdown>
      </div>
    </div>
    <div >
      <div>
        <label>Select due date:</label>
        <b-form-datepicker v-model="date" @click="addDate(date)" :min="min" locale="en" class="datepicker"></b-form-datepicker>
      </div>
    </div>
    <div>
      <b-button align= "center" variant="success" @click="addMatch" :disabled="checkDisable" >Add Match</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "AddMatchPage",
  data() {
      const minDate = new Date()
    return {
      team_names:[],
      refereeIds:[],
      host_team:"Local Team",
      away_team:"Away Team",
      referee_id:"Referee ID",
      date: '',
      min: minDate,
      enableButton:false,

    };
  },
  
  async created() {
    try {
      const response = await this.axios.get(
        `http://localhost:3000/teams/getAllTeamNames`,
      );
      this.team_names = response.data;
      this.refereeIds = [1,2,3,4,5];
    }catch(error){
      console.log(error);
    }
  },
  computed: {
    checkDisable() {
      return this.date=="" || this.host_team =="Local Team" ||
       this.away_team == "Away Team" || this.referee_id =="Referee ID";     
    },
  },
  methods: {
    addLocalTeam(team_name) {
      this.host_team = team_name;
    },
    addVisitorTeam(team_name) {
      this.away_team = team_name;
    },
    addRefereeId(referee_id) {
      this.referee_id =referee_id.toString(); 
    },
    addDate(date) {
    this.date =date.toString(); 
    },
    async addMatch(){
      if(this.host_team === this.away_team){
          this.host_team = "Local Team";
          this.away_team = "Away Team";
          alert("Please choose different teams");
      }
      else{
        try {
          const response = await this.axios.post( `http://localhost:3000/league_manager/addMatch`, {
          host_team_name: this.host_team,
          away_team_name: this.away_team,
          date_match: this.date,
          referee_id: this.referee_id,
          });
          if(response.status == 201)
            this.$root.toast("Success!", "Match was added", "success");

        } catch (error) {
            this.$root.toast("Error!", "Something went wrong", "danger");
            console.log(error);
          }
      }
    }
  },
};

</script>

<style lang="scss" scoped>
label {
  display: inline-block;
  width: 150px;
  text-align: right;
}
.datepicker {
  width: 200px;
}
</style>
