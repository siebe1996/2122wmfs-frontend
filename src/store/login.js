/**
 * @author Van de Voorde Siebe
 * @Version 3-6-2022
 */
import axios from "axios";
import router from "../router";
import store from "../store";

export default {
  namespaced: true,
  state() {
    return {
      status: undefined,
      processing: undefined,
    };
  },
  getters: {
    status(state) {
      return state.status;
    },
    getProcessing(state) {
      return state.processing;
    },
  },
  mutations: {
    SET_STATUS(state, value) {
      state.status = value;
    },
    SET_PROCESSING(state, value) {
      state.processing = value;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      commit("SET_PROCESSING", true);
      try {
        await axios.get(`/sanctum/csrf-cookie`);
        await axios.post(`/api/login`, credentials);
        await store.dispatch("auth/login", null, { root: true });
        await router.push("/");
      } catch (err) {
        if (err.response?.status === 401) {
          commit("SET_STATUS", err.response?.data?.message);
          return;
        }
        console.error(err);
      } finally {
        commit("SET_PROCESSING", false);
      }
    },
  },
};
