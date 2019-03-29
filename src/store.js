import Vue from "vue";
import Vuex from "vuex";
import tags from "./helpers/tagsDemoData.helper";
import colors from "./helpers/colorPalette.helper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: tags,
    tagsOnCurrentPage: [],
    colorPalette: colors,
    activeTagId: null,
    showModal: false,
    tagsForDelete: [],
    paginationOptions: {}
  },
  getters: {
    tags: state => {
      return state.tags;
    },
    tagsOnCurrentPage: state => {
      return state.tagsOnCurrentPage;
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
    },
    paginationOptions: state => {
      return state.paginationOptions;
    }
  },
  mutations: {
    setTagsData: (state, data) => {
      state.tags = data;
    },
    setTagsForCurrentPage: (state, data) => {
      state.tagsOnCurrentPage = data;
    },
    setActiveTagId: (state, id) => {
      state.activeTagId = id;
    },
    setShowModalState: (state, value) => {
      state.showModal = value;
    },
    setTagsForDelete: (state, value) => {
      state.tagsForDelete = value;
    },
    setPaginationOptions: (state, value) => {
      state.paginationOptions = value;
    }
  },
  actions: {
    toggleColorPalette: ({ getters, commit, dispatch }, tagId) => {
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
      dispatch("handlePagination");
    },
    setNewColor: ({ getters, commit, dispatch }, newColor) => {
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
      dispatch("handlePagination");
    },
    sortTagsByDateCreated: ({ getters, commit, dispatch }) => {
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({ ...item });
      }
      tagsCopy.sort(
        (a, b) => new Date(a.date_created) - new Date(b.date_created)
      );
      commit("setTagsData", tagsCopy);
      dispatch("handlePagination");
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
      dispatch("handlePagination");
    },
    selectDeselectTag: ({ getters, commit, dispatch }, { event, tagId }) => {
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({ ...item });
      }
      const clickedItemIndex = tagsCopy.findIndex(item => item.id === tagId);
      tagsCopy[clickedItemIndex].selected = event.target.checked;
      commit("setTagsData", tagsCopy);
      dispatch("handlePagination");
    },
    bulkSelectDeselectTags: ({ getters, commit, dispatch }, value) => {
      const displayedTagsIds = [];
      for (let item of getters.tagsOnCurrentPage) {
        displayedTagsIds.push(item.id);
      }
      const tagsCopy = [];
      for (let item of getters.tags) {
        tagsCopy.push({ ...item });
      }
      for (let item of tagsCopy) {
        if (displayedTagsIds.includes(item.id)) {
          item.selected = value;
        }
      }
      commit("setTagsData", tagsCopy);
      dispatch("handlePagination");
    },
    setPaginationOptions: ({ commit }, data) => {
      commit("setPaginationOptions", data);
    },
    handlePagination: ({ getters, commit }) => {
      const from =
        getters.paginationOptions.currentPage *
          getters.paginationOptions.perPage -
        getters.paginationOptions.perPage;
      const to =
        getters.paginationOptions.currentPage *
        getters.paginationOptions.perPage;
      const tags = getters.tags.slice(from, to);
      commit("setTagsForCurrentPage", tags);
    }
  }
});
