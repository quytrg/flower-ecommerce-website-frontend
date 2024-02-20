<template>
  <div class="search">
    <div class="input-group">
      <input 
        type="text"
        placeholder="Search"
        class="form-control"
        :value="keyword"
        @input="handleSearch($event)"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    props: {
      keyword: '',
    },
    emits: ['update:keyword'],
    data() {
      return {
      }
    },
    methods: {
      handleSearch(e) {
        this.$emit('update:keyword', e.target.value)
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
