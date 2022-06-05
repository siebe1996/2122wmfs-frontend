import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Vue.component('font-awsome-icon', FontAwesomeIcon);

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

// trying auto login before routes are loaded
// that way you're not redirected to /login
// before the auto login process is finished
//
// an alternative could be to check every route,
// including '/', and wait for the auto login to finish.
console.warn("trying auto login, this is blocking...");

store.dispatch("auth/tryAutoLogin").then(() => {
  console.warn("finished auto login attempt");
  app.use(router);
  app.use(store);
  app.mount("#app");
});
