<template functional>
  <div class="delete-tag-modal">
    <img src="../../../assets/delete.png" alt="delete tag" width="118" height="84">
    <p>Are you sure you want to <strong>delete {{ props.amount > 1 ? 'these tags' : 'this tag' }}</strong>?</p>
  </div>
</template>
