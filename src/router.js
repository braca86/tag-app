import Vue from "vue";
import Router from "vue-router";
import TagManager from "./views/TagManager.vue";
import Clipboard from "./views/Clipboard.vue";
import Dashboard from "./views/Dashboard.vue";
import Keywords from "./views/Keywords.vue";
import RecentSearches from "./views/RecentSearches.vue";
import SavedSearches from "./views/SavedSearches.vue";
import Search from "./views/Search.vue";
import Settings from "./views/Settings.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/tag-manager",
      name: "tag-manager",
      component: TagManager
    },
    {
      path: "/clipboard",
      name: "clipboard",
      component: Clipboard
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/keywords",
      name: "keywords",
      component: Keywords
    },
    {
      path: "/recent-searches",
      name: "recent-searches",
      component: RecentSearches
    },
    {
      path: "/saved-searches",
      name: "saved-searches",
      component: SavedSearches
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/",
      redirect: "/tag-manager"
    }
  ]
});
