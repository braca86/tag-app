import Vue from "vue";
import Vuex from "vuex";
import tags from "./helpers/tagsDemoData.helper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: tags
  },
  getters: {
    tags: state => {
      return state.tags;
    }
  },
  mutations: {},
  actions: {}
});
