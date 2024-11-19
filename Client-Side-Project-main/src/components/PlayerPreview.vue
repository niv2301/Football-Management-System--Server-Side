<template>
    <div>
        <b-card style="border:none; background:transparent">      
            <b-card-text>   
              <div>
                  <router-link :to="{ name: 'player_page_by_id', params: { id: id } }"><img :src=imageURL> </router-link>
              </div>
              <div>
                  <router-link :to="{ name: 'player_page_by_id', params: { id: id } }"><b>Full Name:</b> {{ name }}</router-link>
              </div>
              <li> Player ID: {{ id }}</li>
              <li> Team: {{ team_name }}</li>
              <li> Position: {{ position }}</li>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
  name: "PlayerPreview",

  props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      team_name: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      imageURL: {
        type: String
      }  
  }, 
  mounted(){
    console.log("player preview mounted")
  } 
};
</script>

<style>
ul.ba {
    list-style-type: none;
}
</style>
