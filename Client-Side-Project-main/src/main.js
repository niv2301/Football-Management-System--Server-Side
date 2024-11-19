import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";



import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Cloudinary from 'cloudinary-vue';
Vue.use(Cloudinary, {
  configuration: {
    cloudName: "dbur1pbkj"
    
    // API KEY: 974382264129746,
    // API Secret: ueJ_403GHRv36Fd-G-rHcXisxAM,
    // CLOUDINARY_URL=cloudinary://974382264129746.ueJ_403GHRv36Fd-G-rHcXisxAM@dbur1pbkj



  }
});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCookies);
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TablePlugin,
  FormDatepickerPlugin,
  CarouselPlugin
} from "bootstrap-vue";
[
  CarouselPlugin,
  TablePlugin,
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormDatepickerPlugin, 
  InputGroupPlugin
].forEach((x) => Vue.use(x));

Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: undefined,
  lastQueryTeam: undefined,
  lastQueryTerm: undefined,
  lastQueryTermPlayer: undefined,
  lastQueryFilterPosition: undefined,
  lastQueryFilterTeamName: undefined,
  lastQueryPlayers : undefined,
  BASE_URL: "http://localhost:3000",
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    this.lastQueryTeam = "";
    this.lastQueryTerm = "";
    this.lastQueryTermPlayer = "";
    this.lastQueryFilterPosition = "";
    this.lastQueryFilterTeamName = "";
    this.lastQueryPlayers = "";
    console.log("login", this.username);
  },
  isAdmin() {
    if(this.username === "niv"){
      console.log("admin logged in");
      return true;
    }
    return false;
  },
  logout() {
    console.log("logout");
    Vue.$cookies.remove("session"); 
    localStorage.removeItem("username");
    localStorage.clear();
    this.username = undefined;
  }
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

router.beforeEach((to, from, next) => {	
  // if there was a transition from logged in to session expired or localStorage was deleted	
  // if we try to enter auth required pages and we are not authorized	
  //console.log(shared_data.username);	
  //console.log(Vue.$cookies.get("session"));	
  if (shared_data.username === undefined || !Vue.$cookies.get("session")) {	
    if (	
      (shared_data.username === undefined && Vue.$cookies.get("session")) ||	
      (shared_data.username !== undefined && !Vue.$cookies.get("session"))	
    ) {	
      shared_data.logout();	
    }	
    // if the route requires Authorization, (and we know the user is not authorized), we redirect to login page	
    if (to.matched.some((route) => route.meta.requiresAuth)) {	
      next({ name: "login" });	
    } else next();	
  } else next();	
});

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
