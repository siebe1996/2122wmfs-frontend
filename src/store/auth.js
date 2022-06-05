import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      authenticated: false,
      user: {},
    };
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    },
    isAdmin(state, getters) {
      let admin = false;
      for (let i = 0; i < getters.user.roles.length; i++) {
        if (getters.user.roles[i].title === "spelbegeleider") {
          admin = true;
        }
      }
      return admin;
    },
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
  },
  actions: {
    async tryAutoLogin({ dispatch }) {
      if (document.cookie.indexOf("XSRF-TOKEN") === -1) {
        return;
      }
      return dispatch("login");
    },
    login({ commit }) {
      return axios
        .get("/api/user")
        .then(({ data }) => {
          commit("SET_USER", data.data);
          commit("SET_AUTHENTICATED", true);
        })
        .catch((err) => {
          console.warn(err);
          commit("SET_USER", {});
          commit("SET_AUTHENTICATED", false);
        });
    },
    logout({ commit }) {
      commit("SET_USER", {});
      commit("SET_AUTHENTICATED", false);

      if (document.cookie.indexOf("XSRF-TOKEN") === -1) {
        return;
      }

      // I don't care about the response
      // but it resets the cookie... so... yeah;
      return axios
        .post("/api/logout")
        .catch(() => {})
        .finally(() => {
          // clear cookie to prevent future auto login attempts
          document.cookie =
            "XSRF-TOKEN=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure;";
        });
    },
  },
};
