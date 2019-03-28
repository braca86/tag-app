<template>
  <div class="table-row">
    <span>x</span>
    <span>{{ rowData.color }}</span>
    <span>{{ rowData.name }}</span>
    <span>{{ rowData.tagged_items }}</span>
    <span>{{ rowData.assigned_to }}</span>
    <span>{{ rowData.expundge_date }}</span>
    <span>{{ rowData.options }}</span>
    <span>{{ rowData.date_created }}</span>
    <span>{{ rowData.created_by }}</span>
    <span>Delete</span>
  </div>
</template>

<script>
export default {
  name: 'table-row',
  props: {
    rowData: {
      type: Object,
      required: true
    }
  }
}
</script>

