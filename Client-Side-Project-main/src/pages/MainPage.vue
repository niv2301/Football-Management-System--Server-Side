<template>
  <div class="container">
    <h1 class="title" align = "center">Main Page</h1>
    <span v-if="wait"> please wait..</span>
    <div v-else>
      <div class="left-half">
        <LeagueInfo></LeagueInfo>
      </div>
      <div class="right-half">
        <div v-if="!$root.store.username" to="/login">
          <LoginPage></LoginPage>
        </div>
        <div v-else>
          <div v-if="favoriteMatches.length>0">
          <FavoriteGames></FavoriteGames>
          </div>
          <div v-else>
            <h3 class="title" >There are no matches to load</h3>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames,
  },
  data() {
    return {
      wait:true,
      favoriteMatches: [],
    };
  },
  methods:{ 
    async retrieveFavoriteMatchesTop3(){
        this.wait=false;
        const response=await this.axios.get(`http://localhost:3000/users/favoriteMatchesTop3`);
        if(response.status==200){
            this.favoriteMatches=response.data;
        }
        else{
          this.favoriteMatches = [];
        }
         
    }
  },
  created() {
    this.retrieveFavoriteMatchesTop3();   
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}


/* Pen-specific styles */
* {
  box-sizing: border-box;
}
html, body, section, div {
  height: 100%;
}

body { 
  color: #fff;
  font-family: sans-serif;
  font-size: 1.25rem;
  line-height: 150%;
  text-align: center;
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

</style>
