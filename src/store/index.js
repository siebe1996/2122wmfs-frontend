import { createStore } from "vuex";
import auth from "./auth";
import home from "./home";
import info from "./info";
import detail from "./detail";
import admin from "./admin";
import login from "./login";
import message from "./message";

export default createStore({
  modules: {
    auth: auth,
    home: home,
    info: info,
    detail: detail,
    admin: admin,
    login: login,
    message: message,
  },
  state() {
    return {
      target: undefined,
    };
  },
  getters: {
    getTarget(state) {
      return state.target;
    },
  },
  mutations: {
    SET_TARGET(state, value) {
      state.target = value;
    },
  },
  actions: {},
});
