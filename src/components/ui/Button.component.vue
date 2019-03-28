<template functional>
  <div class="tag-button">
    <button 
      :disabled="props.disabled" 
      @click="listeners.clicked" 
      type="button"
      :class="[props.type]"
    ><slot /></button>
  </div>
</template>
