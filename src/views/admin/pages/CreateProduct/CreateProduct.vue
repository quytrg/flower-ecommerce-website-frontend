<template>
  <div class="create-product" v-if="currentAccount?.permissions.includes('create_products')">
    <ProductForm 
      :product="product"
      @submit:product="createProduct"
      pageTitle="Add Product"
    />
  </div>
  <div class="create-product" v-else>
    <Unauthorized />
  </div>
</template>

<script>
  import ProductForm from '@/components/admin/ProductForm/ProductForm.vue';
  import ProductService from '@/services/admin/product.service.js'
  import Swal from 'sweetalert2'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import { mapState } from 'pinia'
  import { useAuthStore } from '@/stores/admin/auth.store'
  import Unauthorized from '@/components/admin/Unauthorized/Unauthorized.vue'

  export default {
    name: "CreateProduct",
    components: {
      ProductForm,
      Unauthorized,
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
    },
    computed: {
      ...mapState(useAuthStore, ['currentAccount'])
    }
  }
</script>

<style scoped lang="scss">

</style>
