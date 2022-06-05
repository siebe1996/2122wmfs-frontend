/**
 * @author Van de Voorde Siebe
 * @Version 29-5-2022
 */
import axios from "axios";
import router from "../router";

export default {
  namespaced: true,
  state() {
    return {
      currentGames: [],
      targetWeapon: undefined,
      weapon: undefined,
    };
  },
  getters: {
    getCurrentGames(state) {
      return state.currentGames;
    },
    getTargetWeapon(state) {
      return state.targetWeapon;
    },
    getWeapon(state) {
      return state.weapon;
    },
  },
  mutations: {
    SET_CURRENT_GAMES(state, value) {
      state.currentGames = value;
    },
    SET_TARGET_WEAPON(state, value) {
      state.targetWeapon = value;
    },
    SET_WEAPON(state, value) {
      state.weapon = value;
      console.log("setter weapon" + state.weapon);
    },
  },
  actions: {
    navBtnClicked(context, data) {
      router.push(data.route);
    },
    async fetchCurrentGames({ commit }) {
      await axios
        .get(`/api/currentgames`)
        .then(function (response) {
          // handle success
          let currentGames = response.data.data.current_games;
          commit("SET_CURRENT_GAMES", currentGames);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    fetchTargetWeapon({ commit }, gameId) {
      axios
        .get(`/api/userinfo/${gameId}`)
        .then(function (response) {
          // handle success
          let target = response.data.data.players[0].game_user.target_name[0];
          let targetWeapon = response.data.data;
          let weapon = response.data.data.weapon_id.technique;
          commit("SET_TARGET_WEAPON", targetWeapon);
          commit("SET_TARGET", target, { root: true });
          commit("SET_WEAPON", weapon);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    async fetchTarget({ commit }, gameId) {
      await axios
        .get(`/api/target?gameId=${gameId}`)
        .then(function (response) {
          // handle success
          let target = response.data.data;
          commit("SET_TARGET", target, { root: true });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {});
    },
    async patchAliveState({ commit }, params) {
      await axios
        .patch(`/api/gamelogic?${params}`)
        .then(function (response) {
          // handle success
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
