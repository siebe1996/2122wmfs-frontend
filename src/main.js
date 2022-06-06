import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
//import Echo from "laravel-echo";
//import Pusher from "pusher-js";

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
/*window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  cluster: "mt1",
  wsHost: '127.0.0.1',
  wsPort: 6001,
  key: "1b2a", //Add your pusher key here
});*/

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
