<template functional>
  <div class="modal">
    <div class="modal__backdrop" @click="listeners.closeModal"></div>
    <div class="modal__dialog">
      <div class="modal__dialog--header">
        <span class="title">{{ props.title }}</span>
        <fa-icon class="close-icon" icon="times" @click="listeners.closeModal" />
      </div>
      <div class="modal__dialog--content">
        <slot />
      </div>
      <div class="modal__dialog--controls">
        <button 
          type="button" 
          @click="listeners.closeModal"
          class="cancel-btn"
        >Cancel</button>
        <button 
          type="button" 
          :class="props.customBtnClass" 
          @click="listeners.onConfirm"
          class="confirm-btn"
        >{{ props.confirmBtnText }}</button>
      </div>
    </div>
  </div>
</template>
