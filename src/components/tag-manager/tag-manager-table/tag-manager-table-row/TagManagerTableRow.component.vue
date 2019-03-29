<template>
  <div class="table-row">
    <span class="table-row__item checkbox">
      <checkbox @changed="checkboxClickHandler($event, rowData.id)" :checked="rowData.selected" />
    </span>
    <span class="table-row__item color">
      <div class="color-label-wrapper" @click="toggleColorPalette(rowData.id)">
        <span class="color-label" :style="{'background-color': rowData.color}"></span>
        <fa-icon class="arrow" :icon="colorChevronIcon" />
      </div>
      <color-palette v-if="rowData.showPalette" />
    </span>
    <span class="table-row__item name">
      <span 
        class="tag-name" 
        :style="{'background-color': rowData.color}"
      >{{ rowData.name }}</span>
    </span>
    <span class="table-row__item" :class="{'empty-value': !rowData.tagged_items}">
      {{ rowData.tagged_items || 'No' }} Emails
    </span>
    <span class="table-row__item" :class="{'empty-value': !rowData.assigned_to}">
      {{ assignedTo }}
    </span>
    <span class="table-row__item expundge-date" :class="{'empty-value': !rowData.expundge_date}">
      {{ rowData.expundge_date || 'Not Set' }}
    </span>
    <span class="table-row__item options" :class="{'empty-value': !rowData.options}">
      {{ rowData.options || 'Not Set' }}
    </span>
    <span class="table-row__item">{{ rowData.date_created }}</span>
    <span class="table-row__item">{{ rowData.created_by }}</span>
    <span @click="deleteTag(rowData.id)" class="table-row__item delete">Delete</span>
  </div>
</template>

<script>
import Checkbox from "@/components/ui/Checkbox.component"
import ColorPalette from "./color-palette/ColorPalette.component";
export default {
  name: "table-row",
  components: {
    ColorPalette,
    Checkbox
  },
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  computed: {
    colorChevronIcon() {
      return this.rowData.showPalette ? "chevron-up" : "chevron-down";
    },
    assignedTo() {
      if (!this.rowData.assigned_to) return 'Not Set';
      const splitName = this.rowData.assigned_to.split(" ");
      return `${splitName[0]} ${splitName[1][0]}`;
    }
  },
  methods: {
    toggleColorPalette(tagId) {
      this.$store.dispatch('toggleColorPalette', tagId);
    },
    deleteTag(tagId) {
      this.$store.dispatch('triggerDeleteModal', [tagId]);
    },
    checkboxClickHandler(e, tagId) {
      this.$store.dispatch('selectDeselectTag', {
        event: e,
        tagId: tagId
      });
    }
  }
}
</script>

