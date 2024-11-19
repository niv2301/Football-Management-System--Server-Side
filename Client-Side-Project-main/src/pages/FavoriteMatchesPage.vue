<template>
  <div class="favorite_matches_user">
      <h1 style="text-align:center">Your favorite matches</h1>
      <span v-if="wait"> please wait..</span>
      <div v-else>
        <FavoriteGames v-if="games" :games="games"></FavoriteGames>
        <span v-else> {{errorMessage}}</span>
      </div>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames.vue";
export default {
    components:{
        FavoriteGames
    },
    data(){
        return{
            wait:true,
            games:undefined,
            errorMessage:"No favorite matches found"
        }
    },
    mounted(){
        try{
            this.retrieveFavoriteMatches();
        }
        catch(error){
            console.log(error);
        }
    },
    methods:{ 
        async retrieveFavoriteMatches(){
            const response=await this.axios.get(`http://localhost:3000/users/favoriteMatches`);
            if(response.status==200){
                this.games=response.data;
            }
            this.wait=false;
        }
    }
}
</script>

<style>
.favorite_matches_user {
    max-width: 40%;
    max-height: 40%;
  }
</style>