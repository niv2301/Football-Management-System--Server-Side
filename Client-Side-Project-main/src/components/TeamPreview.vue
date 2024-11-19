<template>
    <div >
        <b-card style="border:none; background:transparent;">      
            <b-card-text>   
                <ul class="player-content">
                    <div>
                        <router-link :to="{ name: 'team_page_by_id', params: { id: team_id } }"><img :src=teamImageURL> </router-link>
                    </div>
                    <div>
                        <router-link :to="{ name: 'team_page_by_id', params: { id: team_id } }"><b>Team Name:</b> {{ team_name }}</router-link>
                    </div>
                </ul>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
  name: "TeamPreview", 
  props: {
      team_id: {
        type: Number,
        required: true  
      },
      team_name: {
        type: String,
        required: true
      },
      teamImageURL: {
        type: String
      },  
  }, 
  mounted(){
    console.log("team preview mounted")
  } 
};
</script>

<style>

.game-content {
  width: 100%;
  overflow: hidden;
}



</style>
