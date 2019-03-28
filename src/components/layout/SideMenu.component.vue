<template>
  <div class="side-menu">
    <div class="side-menu__header">
      <img src="../../assets/logo.png" width="45" height="24" alt="app logo">
      <span class="side-menu__header--name">jatheon<small>cloud</small></span>
    </div>
    <div class="side-menu__content">
      <nav>
        <router-link to="/dashboard"><fa-icon icon="align-left" />Dashboard</router-link>
        <router-link to="/search"><fa-icon icon="search" />Search</router-link>
        <router-link to="/saved-searches"><fa-icon icon="save" />Saved Searches</router-link>
        <router-link to="/clipboard"><fa-icon icon="clipboard" />Clipboard</router-link>
        <router-link to="/recent-searches"><fa-icon icon="search" />Recent Searches</router-link>
        <router-link to="/keywords"><fa-icon icon="font" />Keywords</router-link>
        <router-link to="/tag-manager"><fa-icon icon="tag" />Tag Manager</router-link>
        <router-link to="/settings"><fa-icon icon="cog" />Settings</router-link>
      </nav>
    </div>
  </div>
</template>
