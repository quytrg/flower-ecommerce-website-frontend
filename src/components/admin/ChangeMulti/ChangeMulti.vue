<template>
  <div class="change-multi d-flex">
    <div class="group-form">
      <select 
        name="change-multi"
        id="change-multi" 
        class="form-select"
        v-model="selectedType"
      >
        <option value="" selected>Change multiple</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="position">Position</option>
        <option value="delete">Delete</option>
      </select>
    </div>
    <button 
      type="submit" 
      class="btn btn-primary btn-main ms-1" 
      @click="handleChangeMulti"
    >
      Apply
    </button>
  </div>
</template>

<script>
  export default {
    name: "ChangeMulti",
    data() {
      return {
        selectedType: '',
      }
    },
    methods: {
      handleChangeMulti() {
        this.$emit('apply', this.selectedType)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
