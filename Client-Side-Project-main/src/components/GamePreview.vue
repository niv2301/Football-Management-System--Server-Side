<template>
  <div class="game-preview">
      <span align = "center"> host: {{ hostTeam }}</span><br>
      <span> guest: {{ awayTeam }}</span><br>
      <span> date: {{ date_match_new }}</span><br>
      <span> time: {{ hour }}</span><br>
      <span> venue: {{ venue }}</span><br>
      <img style="width: 180px; height: 110px;" :src=image_venue>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      match_id: {
        type: Number,
        //required: true
      },
      hostTeam: {
        type: String,
        //required: true
      },
      awayTeam: {
        type: String,
        //required: true
      },
      date_match_new: {
        type: String,
        //required: true
      },
      hour: {
        type: String,
        //required: true
      },
      venue: {
        type: String,
        //required: true
      },
      image_venue: {
        type: String
      } 
  }, 
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border: none;
  color: black;
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



</style>
