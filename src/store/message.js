/**
 * @author Van de Voorde Siebe
 * @Version 3-6-2022
 */
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      messages: undefined,
      users: undefined,
      success: undefined,
    };
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getUsers(state) {
      return state.users;
    },
  },
  mutations: {
    SET_MESSAGES(state, value) {
      state.messages = value;
    },
    SET_USERS(state, value) {
      state.users = value;
    },
    SET_SUCESS(state, value) {
      state.success = value;
    },
  },
  actions: {
    async fetchMessages({ commit }) {
      await axios
        .get(`/api/messages`)
        .then(function (response) {
          // handle success
          let messages = response.data.data;
          commit("SET_MESSAGES", messages);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    async fetchAllUsers({ commit }) {
      await axios
        .get(`/api/allusers`)
        .then(function (response) {
          // handle success
          let users = response.data.data;
          commit("SET_USERS", users);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    async postMessage({ commit }, message) {
      console.log(message.user + " message");
      await axios
        .post(`/api/messages`, message)
        .then(function () {
          commit("SET_SUCESS", "sucess");
          console.log("sucess");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    async deleteMessage(id) {
      console.log("delete message " + id);
      await axios
        .delete(`/api/messages/${id}`)
        .then(function (response) {
          // handle success
          let message = response.data.data;
          console.log(message);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
  },
};
