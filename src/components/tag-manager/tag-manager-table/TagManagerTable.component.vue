<template>
  <div class="tag-manager-table">
    <div class="tag-manager-table__header">
      <span>
        <checkbox @changed="checkboxClickHandler($event)" :checked="isAllSelected" />
      </span>
      <span>color</span>
      <span>tag name</span>
      <span>tagged items</span>
      <span>assigned to</span>
      <span>expunge date</span>
      <span>options</span>
      <span @click="sortByDateCreated">date created <fa-icon icon="chevron-down" /></span>
      <span>created by</span>
      <span>actions</span>
    </div>
    <div class="tag-manager-table__rows">
      <table-row v-for="tag in tags" :row-data="tag" :key="tag.id" />
    </div>
    <div class="tag-manager-table__pagination">
      <table-pagination />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableRow from "./tag-manager-table-row/TagManagerTableRow.component";
import TablePagination from "./tag-manager-table-pagination/TagManagerTablePagination.component";
import Checkbox from "@/components/ui/Checkbox.component";
export default {
  name: "tag-manager-table",
  components: {
    TableRow,
    Checkbox,
    TablePagination
  },
  computed: {
    ...mapGetters([
      'tags'
    ]),
    isAllSelected() {
      return this.tags.length && this.tags.findIndex(item => !item.selected) === -1
    }
  },
  methods: {
    sortByDateCreated() {
      this.$store.dispatch('sortTagsByDateCreated');
    },
    checkboxClickHandler(e) {
      this.$store.dispatch('bulkSelectDeselectTags', e);
    }
  }
}
</script>

