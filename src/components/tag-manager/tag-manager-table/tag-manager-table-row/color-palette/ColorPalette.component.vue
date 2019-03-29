<template>
  <div class="color-palette">
    <div class="color-palette__title">Tag Color</div>
    <div class="color-palette__content">
      <span
        class="color-palette__content--item" 
        v-for="color in colorPalette"
        :key="color" 
        :style="{'background-color': color}"
        @click="assignColor(color)"
      ><fa-icon class="check" v-if="color === activeTagColor" icon="check" /></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "color-palette",
  computed: {
    ...mapGetters([
      'colorPalette',
      'activeTagColor'
    ])
  },
  methods: {
    assignColor(newColor) {
      this.$store.dispatch('setNewColor', newColor);
    }
  }
}
</script>
