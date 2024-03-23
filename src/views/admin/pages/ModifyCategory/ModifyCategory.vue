<template>
  <div class="modify-category">
    <CategoryForm 
      v-if="category"
      :category="category"
      @submit:category="updateCategory"
    />
  </div>
</template>

<script>
  import CategoryForm from '@/components/admin/CategoryForm/CategoryForm.vue';
  import categoryService from '@/services/admin/category.service.js'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import Swal from 'sweetalert2'

  export default {
    name: "ModifyCategory",
    components: {
      CategoryForm,
    },
    data() {
      return {
        category: null,
      }
    },
    methods: {
      async getCategory() {
        this.category = await categoryService.getOne(this.$route.params.id)
      },
      async updateCategory(data) {
        try {
          loadingDialogHelper(
            "Updating category"
          )
          await categoryService.update(data.get('_id'), data)
          Swal.close()
          this.$router.push({ name: "Categories" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getCategory()
    }
  }
</script>

<style scoped lang="scss">

</style>
