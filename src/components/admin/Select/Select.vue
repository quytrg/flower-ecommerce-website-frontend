<template>
  <div class="select">
    <v-select
      :items="items"
      :label="label"
      density="compact"
      item-title="title"
      item-value="_id"
      clearable
      hide-details
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

<style lang="scss" scoped>
.select {
  min-width: 200px;
}
</style>
