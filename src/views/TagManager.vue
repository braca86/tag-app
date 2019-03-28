<template>
  <main class="tag-manager">
    <div class="tag-manager__header">
      <div class="tag-manager__header--input-wraper"> 
        <fa-icon icon="search" />
        <input type="text" placeholder="Search by keyword, user, date or action" v-model="searchTags">
      </div>
    </div>
    <div class="tag-manager__controls">
      <tag-button 
        :disabled="deleteBtnDisabled" 
        @clicked="deleteBtnClickHandler" 
        type="delete"
      >Delete</tag-button>
    </div>
    <div class="tag-manager__table">
      <tag-table />
    </div>
  </main>
</template>

<script>
import TagButton from "@/components/ui/Button.component";
import TagTable from "@/components/TagManager/TagManagerTable/TagManagerTable.component";
export default {
  name: "tag-manager",
  components: {
    TagButton,
    TagTable
  },
  data() {
    return {
      searchTags: "",
      deleteBtnDisabled: false
    }
  },
  methods: {
    deleteBtnClickHandler() {
      alert('delete btn click');
    }
  }
};
</script>
