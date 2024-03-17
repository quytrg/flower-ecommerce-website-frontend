<template>
  <div class="create-product">
    <ProductForm 
      :product="product"
      @submit:product="createProduct"
      pageTitle="Add Product"
    />
  </div>
</template>

<script>
  import ProductForm from '@/components/admin/ProductForm/ProductForm.vue';
  import ProductService from '@/services/admin/product.service.js'
  import Swal from 'sweetalert2'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  export default {
    name: "CreateProduct",
    components: {
      ProductForm,
    },
    methods: {
      async createProduct(data) {
        try {
          loadingDialogHelper(
            "Creating product"
          )
          await ProductService.create(data)
          Swal.close()
          this.$router.push({ name: "ProductsAdmin" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    data() {
      return {
        product: {
          status: 'active',
          discountPercentage: 0,
          categories: null,
          thumbnail: null,
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
