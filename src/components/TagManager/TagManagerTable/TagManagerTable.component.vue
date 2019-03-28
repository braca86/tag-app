<template>
  <div class="tag-manager-table">
    <div class="tag-manager-table__header">
      <span>x</span>
      <span>color</span>
      <span>tag name</span>
      <span>tagged items</span>
      <span>assigned to</span>
      <span>expunge date</span>
      <span>options</span>
      <span>date created <fa-icon icon="chevron-down" /></span>
      <span>created by</span>
      <span>actions</span>
    </div>
    <div class="tag-manager-table__rows">
      <table-row v-for="tag in tags" :row-data="tag" :key="tag.id" />
    </div>
    <div class="tag-manager-table__navigation">

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableRow from './TagManagerTableRow/TagManagerTableRow.component';
export default {
  name: 'tag-manager-table',
  components: {
    TableRow
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  }
}
</script>

