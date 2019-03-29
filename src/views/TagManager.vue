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
        @clicked="deleteBtnClick" 
        type="delete"
      >Delete</tag-button>
    </div>
    <div class="tag-manager__table">
      <tag-table />
    </div>
    <modal 
      v-if="showModal" 
      @closeModal="closeModal"
      @onConfirm="deleteTags" 
      title="delete tag" 
      custom-btn-class="delete-btn"
      confirm-btn-text="delete"
    ><modal-content :amount="tagsForDelete.length" /></modal>
  </main>
</template>

<script>
import TagButton from "@/components/ui/Button.component";
import Modal from "@/components/ui/Modal.component";
import ModalContent from "@/components/tag-manager/delete-tag-modal-content/DeleteTagModalContent.component";
import TagTable from "@/components/tag-manager/tag-manager-table/TagManagerTable.component";
import { mapGetters } from "vuex";
export default {
  name: "tag-manager",
  components: {
    TagButton,
    TagTable,
    Modal,
    ModalContent
  },
  data() {
    return {
      searchTags: ""
    }
  },
  computed: {
    ...mapGetters([
      "showModal",
      "tagsForDelete",
      "tagsOnCurrentPage"
    ]),
    deleteBtnDisabled() {
      return this.tagsOnCurrentPage.findIndex(item => item.selected) === -1
    }
  },
  methods: {
    deleteBtnClick() {
      const tagsForDelete = [];
      for (let item of this.tagsOnCurrentPage) {
        if (item.selected) tagsForDelete.push(item.id)
      }
      this.$store.dispatch('triggerDeleteModal', tagsForDelete);
    },
    closeModal() {
      this.$store.dispatch("changeModalState", false);
    },
    deleteTags() {
      this.$store.dispatch("deleteTags");
    }
  }
};
</script>
