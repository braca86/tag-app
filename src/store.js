import Vue from "vue";
import Vuex from "vuex";
import tags from "./helpers/tagsDemoData.helper";
import colors from "./helpers/colorPalette.helper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: tags,
    colorPalette: colors,
    activeTagId: null,
    showModal: false,
    tagsForDelete: []
  },
  getters: {
    tags: state => {
      return state.tags;
    },
    colorPalette: state => {
      return state.colorPalette;
    },
    activeTagId: state => {
      return state.activeTagId;
    },
    activeTagColor: state => {
      const activeTag = state.tags.find(item => item.id === state.activeTagId);
      return activeTag.color;
    },
    showModal: state => {
      return state.showModal;
    },
    tagsForDelete: state => {
      return state.tagsForDelete;
    }
  },
  mutations: {
    setTagsData: (state, data) => {
      state.tags = data;
    },
    setActiveTagId: (state, id) => {
      state.activeTagId = id;
    },
    setShowModalState: (state, value) => {
      state.showModal = value;
    },
    setTagsForDelete: (state, value) => {
      state.tagsForDelete = value;
    }
  },
  actions: {
    toggleColorPalette: ({ getters, commit }, tagId) => {
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({ ...item });
      }
      const clickedItemIndex = tagsCopy.findIndex(item => item.id === tagId);
      tagsCopy[clickedItemIndex].showPalette = !tagsCopy[clickedItemIndex]
        .showPalette;
      if (getters.activeTagId && tagId !== getters.activeTagId) {
        const activeItemIndex = tagsCopy.findIndex(
          item => item.id === getters.activeTagId
        );
        tagsCopy[activeItemIndex].showPalette = false;
      }
      commit("setTagsData", tagsCopy);
      commit("setActiveTagId", tagId);
    },
    setNewColor: ({ getters, commit }, newColor) => {
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({ ...item });
      }
      const activeItemIndex = tagsCopy.findIndex(
        item => item.id === getters.activeTagId
      );
      tagsCopy[activeItemIndex].color = newColor;
      tagsCopy[activeItemIndex].showPalette = false;
      commit("setTagsData", tagsCopy);
      commit("setActiveTagId", null);
    },
    sortTagsByDateCreated: ({ getters, commit }) => {
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({ ...item });
      }
      tagsCopy.sort(
        (a, b) => new Date(a.date_created) - new Date(b.date_created)
      );
      commit("setTagsData", tagsCopy);
    },
    changeModalState: ({ commit }, value) => {
      commit("setShowModalState", value);
    },
    triggerDeleteModal: ({ commit, dispatch }, tagIds) => {
      commit("setTagsForDelete", tagIds);
      dispatch("changeModalState", true);
    },
    deleteTags: ({ commit, getters, dispatch }) => {
      const tags = getters.tags.filter(
        item => !getters.tagsForDelete.includes(item.id)
      );
      commit("setTagsData", tags);
      dispatch("changeModalState", false);
    },
    selectDeselectTag: ({ getters, commit }, { event, tagId }) => {
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({ ...item });
      }
      const clickedItemIndex = tagsCopy.findIndex(item => item.id === tagId);
      tagsCopy[clickedItemIndex].selected = event.target.checked;
      commit("setTagsData", tagsCopy);
    },
    bulkSelectDeselectTags: ({ getters, commit }, event) => {
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({
          ...item,
          selected: event.target.checked
        });
      }
      commit("setTagsData", tagsCopy);
    }
  }
});
