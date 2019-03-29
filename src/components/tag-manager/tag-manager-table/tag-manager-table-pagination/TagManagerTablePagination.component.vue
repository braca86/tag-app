<template>
  <div class="table-pagination">
    <div class="table-pagination__per-page">
      <span>items per page</span>
      <span class="number" @click="toggleDropdown">
        {{ itemsPerPage }}
        <fa-icon icon="chevron-down" />
      </span>
      <div v-show="showPerPageDropdown" class="table-pagination__per-page--dropdown">
        <div 
          v-for="item in perPageOptions" 
          :key="item" 
          :class="{'active': itemsPerPage === item}"
          @click="setPerPageOption(item)"
        >{{ item }}</div>
      </div>
    </div>
    <div class="table-pagination__controls">
      <fa-icon @click="goToStart" :class="{'disabled': leftDisabled}" icon="angle-double-left" />
      <fa-icon @click="previousPage" :class="{'disabled': leftDisabled}" icon="angle-left" />
      <div class="table-pagination__controls--pages">
        <input type="text" v-model="currentPage">
        <span>of {{ totalPages }}</span>
      </div>
      <fa-icon @click="nextPage" :class="{'disabled': rightDisabled}" icon="angle-right" />
      <fa-icon @click="goToEnd" :class="{'disabled': rightDisabled}" icon="angle-double-right" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "table-pagintion",
  data() {
    return {
      perPageOptions: [5, 10, 20, 50],
      itemsPerPage: 10,
      currentPage: 1,
      showPerPageDropdown: false
    }
  },
  computed: {
    ...mapGetters([
      "tags"
    ]),
    totalPages() {
      return Math.ceil(this.tags.length / this.itemsPerPage);
    },
    leftDisabled() {
      return this.currentPage === 1
    },
    rightDisabled() {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    toggleDropdown() {
      this.showPerPageDropdown = !this.showPerPageDropdown;
    },
    setPerPageOption(value) {
      this.itemsPerPage = value;
      this.showPerPageDropdown = false;
    },
    goToStart() {
      this.currentPage = 1;
    },
    goToEnd() {
      this.currentPage = this.totalPages;
    },
    nextPage() {
      if (this.currentPage === this.totalPages) return;
      this.currentPage += 1;
    },
    previousPage() {
      if (this.currentPage === 1) return;
      this.currentPage -= 1;
    }
  },
  created() {
    this.$store.dispatch('setPaginationOptions', 
      {perPage: this.itemsPerPage, currentPage: this.currentPage}
    ).then(() => {
      this.$store.dispatch('handlePagination');
    });
  },
  watch: {
    itemsPerPage(val) {
      this.$store.dispatch('setPaginationOptions', 
        {perPage: val, currentPage: this.currentPage}
      ).then(() => {
        this.$store.dispatch('handlePagination');
      });
    },
    currentPage(val) {
      this.$store.dispatch('setPaginationOptions', 
        {perPage: this.itemsPerPage, currentPage: val}
      ).then(() => {
        this.$store.dispatch('handlePagination');
      });
    }
  }
}
</script>
