<template>
  <div class="select-category">
    <div class="group-form">
      <select 
        name="category"
        id="category" 
        :value="selectedCategory" 
        @change="handleSelect($event)"
        class="form-select"
      >
        <option value="">Category</option>
        <option v-for="category in categories" :key="category._id" :value="category._id">
          {{ category.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  import CategoryService from '@/services/admin/category.service'
  export default {
    name: "SelectCategory",
    props: {
      selectedCategory: {
        type: String,
        default: ''
      }
    },
    emits: ['update:selectedCategory'],
    data() {
      return {
        categories: [],
      }
    },
    methods: {
      handleSelect(e) {
        this.$emit('update:selectedCategory', e.target.value)
      },
      async getAllCategories() {
        try {
          const filter = {
            params: {
              status: 'active'
            }
          }
          this.categories = await CategoryService.getAll(filter)
        }
        catch(err) {
          console.log(err)
        }
      },
    },
    created() {
      this.getAllCategories()
    },
  }
</script>

<style scoped lang="scss">

</style>
