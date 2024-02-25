import Vue from "vue";
import App from "./App.vue";
import "./assets/main.css";
import Vuex from "vuex";

Vue.use(Vuex);

new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement(App);
  },
});
