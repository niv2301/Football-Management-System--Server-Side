<template >
  <div id="app">
    <b-navbar toggleable="lg" class="navbar navbar-dark bg-dark" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'weekly_matches' }">Weekly Matches</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <span class="ml-auto" style="color: rgb(179, 185, 190)" v-if="!$root.store.username" >
        Hi Guest
        <router-link :to="{ name: 'register' }" class="routerlink">Register</router-link>|
        <router-link :to="{ name: 'login' }" class="routerlink">Login</router-link>|
      </span>
      <span class="ml-auto" style="color: rgb(179, 185, 190)" v-else >
        Hi {{ $root.store.username }}
        <b-dropdown v-if="this.$root.store.isAdmin()" id="dropdown-2" text="League Management" style="color : black" >
          <b-dropdown-item
            ><router-link :to="{ name: 'addNewMatch' }"
              >Add new match</router-link
            ></b-dropdown-item>
          <b-dropdown-item
            ><router-link :to="{ name: 'matchesPreview' }"
              >Preview matches</router-link
            ></b-dropdown-item>
        </b-dropdown>
        <span>   </span>
        <b-dropdown id="dropdown-1" text="Personal Zone" style="color : black" >
          <b-dropdown-item
            ><router-link :to="{ name: 'favoriteMatches' }"
              >My Matches</router-link
            ></b-dropdown-item>
          <b-dropdown-item disabled>My Players</b-dropdown-item>
          <b-dropdown-item disabled>My Teams</b-dropdown-item> 
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item
            ><button @click="Logout">Logout</button></b-dropdown-item>
        </b-dropdown>
      </span>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

.h {
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:black;
  min-height: 100vh;
  background-image: url('../src/assets/background2.jpeg');
  background-size: cover;
}

#span{
  color: rgb(179, 185, 190)
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color:black;

}

#nav a.router-link-exact-active {
  color: #42b983;
}
.routerlink {
  color: rgb(179, 185, 190)
}

.carousel-control-next, .carousel-control-prev, .carousel-indicators /*, .carousel-indicators */ {
    filter: invert(100%);
}
.card {
  border: none;
}
</style>
