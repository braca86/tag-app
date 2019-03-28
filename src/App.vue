<template>
  <div id="app">
    <side-menu />
    <router-view class="main-view" />
  </div>
</template>

<script>
import SideMenu from '@/components/layout/SideMenu.component'
export default {
  name: 'app',
  components: {
    SideMenu
  }
}
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
