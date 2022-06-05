/**
 * @author Van de Voorde Siebe
 * @Version 30-5-2022
 */
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      users: undefined,
    };
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
  mutations: {
    SET_USERS(state, value) {
      state.users = value;
    },
  },
  actions: {
    async fetchUsers({ commit }, paras) {
      console.log("paras fetch user " + paras);
      await axios
        .get(`/api/admin/users?${paras}`)
        .then(function (response) {
          let users = response.data.data;
          commit("SET_USERS", users);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    async patchAliveStateUser({ commit }, params) {
      await axios
        .patch(`/api/admin/gamelogic?${params}`)
        .then(function (response) {
          let message = response.data.data;
          commit("SET_TARGET", message, { root: true });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
  },
};
