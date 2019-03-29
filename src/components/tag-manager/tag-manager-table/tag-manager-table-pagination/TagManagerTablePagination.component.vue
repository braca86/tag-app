<template>
  <div class="table-pagination">
    <div class="table-pagination__per-page">
      <span>items per page</span>
      <span class="number">
        {{ itemsPerPage }}
        <fa-icon icon="chevron-down" />
      </span>
    </div>
    <div class="table-pagination__controls">
      <fa-icon icon="angle-double-left" />
      <fa-icon icon="angle-left" />
      <div class="table-pagination__controls--pages">
        <input type="text" v-model="currentPage">
        <span>of {{ totalPages }}</span>
      </div>
      <fa-icon icon="angle-right" />
      <fa-icon icon="angle-double-right" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "table-pagintion",
  data() {
    return {
      itemsPerPage: 10,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters([
      "tags"
    ]),
    totalPages() {
      return Math.ceil(this.tags.length / this.itemsPerPage);
    }
  }
}
</script>
