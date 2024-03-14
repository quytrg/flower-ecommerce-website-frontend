<template>
  <div class="select">
    <v-select
      :items="items"
      label="Category"
      density="compact"
      item-title="title"
      item-value="_id"
      clearable
      @update:modelValue="handleSelect($event)"
    >
    </v-select>
  </div>
</template>

<script>
export default {
  props: {
    selectedValue: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: []
    },
    label: {
      type: String,
      default: 'Select'
    }
  },
  emits: ['update:selectedValue'],
  data() {
    return {
    }
  },
  methods: {
    handleSelect(value) {
      this.$emit('update:selectedValue', value)
    }
  }
};
</script>

<style>
.select {
  min-width: 200px;
}

.v-text-field .v-input__details {
  padding-inline: 16px;
  display: none;
}
</style>
