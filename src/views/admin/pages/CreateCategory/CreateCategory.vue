<template>
  <div class="create-category">
    <CategoryForm
      :category="category"
      @submit:category="createCategory"
      pageTitle="Add category"
    />
  </div>
</template>

<script>
  import categoryService from '@/services/admin/category.service'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import Swal from 'sweetalert2'
  import CategoryForm from '@/components/admin/CategoryForm/CategoryForm.vue';

  export default {
    name: "CreateCategory",
    components: {
      CategoryForm,
    },
    methods: {
      async createCategory(data) {
        try {
          loadingDialogHelper(
            "Creating category"
          )
          await categoryService.create(data)
          Swal.close()
          this.$router.push({ name: "Categories" })
        }
        catch(err) {
          console.log(err)
        }
      },
    },
    data() {
      return {
        category: {
          status: 'active',
        },
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
