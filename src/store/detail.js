/**
 * @author Van de Voorde Siebe
 * @Version 30-5-2022
 */
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      game: undefined,
      alivePlayers: undefined,
      winner: undefined,
      mostKilled: undefined,
    };
  },
  getters: {
    getGame(state) {
      return state.game;
    },
    getAlivePlayers(state) {
      return state.alivePlayers;
    },
    getWinner(state) {
      return state.winner;
    },
    getMostKilled(state) {
      return state.mostKilled;
    },
  },
  mutations: {
    SET_GAME(state, value) {
      state.game = value;
    },
    SET_ALIVE_PLAYERS(state, value) {
      state.alivePlayers = value;
    },
    SET_WINNER(state, value) {
      state.winner = value;
    },
    SET_MOST_KILLED(state, value) {
      state.mostKilled = value;
    },
  },
  actions: {
    async fetchGame({ commit }, gameId) {
      await axios
        .get(`/api/games/${gameId}`)
        .then(function (response) {
          // handle success
          let game = response.data.data.game_data;
          let alivePlayers = response.data.data.alive_player;
          let winner = response.data.data.winner;
          let mostKilled = response.data.data.most_killed;
          commit("SET_GAME", game);
          commit("SET_ALIVE_PLAYERS", alivePlayers);
          commit("SET_WINNER", winner);
          commit("SET_MOST_KILLED", mostKilled);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
  },
};
