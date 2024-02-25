import Vuex from "vuex";
import Vue from "vue";
import { getWeekDays } from "../utils/getWeekDays";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state() {
    return {
      week: getWeekDays(),
    };
  },
  mutations: {
    changeWeek(state, newWeek) {
      state.week = newWeek;
    },
  },
});
