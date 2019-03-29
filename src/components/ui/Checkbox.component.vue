<template functional>
  <label class="tag-checkbox" :class="{'checked': props.checked}">
    <input @change="listeners.changed" :checked="props.checked" type="checkbox" />
    <span class="checkmark"></span>
  </label>
</template>
