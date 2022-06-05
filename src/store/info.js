/**
 * @author Van de Voorde Siebe
 * @Version 29-5-2022
 */
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      infoGamesActive: undefined,
      infoGamesPrevious: undefined,
      gotchaListArr: [
        {
          name: "",
          items: "",
        },
        {
          name: "",
          items: "",
        },
      ],
    };
  },
  getters: {
    getInfoGamesActive(state) {
      return state.infoGamesActive;
    },
    getInfoGamesPrevious(state) {
      return state.infoGamesPrevious;
    },
  },
  mutations: {
    SET_INFO_GAMES_ACTIVE(state, value) {
      state.infoGamesActive = value;
    },
    SET_INFO_GAMES_PREVIOUS(state, value) {
      state.infoGamesPrevious = value;
    },
  },
  actions: {
    async fetchInfoGames({ commit }) {
      await axios
        .get(`/api/games`)
        .then(function (response) {
          // handle success
          let active = response.data.data.active;
          let previous = response.data.data.previous_games;
          commit("SET_INFO_GAMES_ACTIVE", active);
          commit("SET_INFO_GAMES_PREVIOUS", previous);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    async postGameUser(gameId) {
      await axios
        .post(`/api/userinfo`, { gameId: gameId })
        .then(function () {
          console.log("sucess");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
  },
};
