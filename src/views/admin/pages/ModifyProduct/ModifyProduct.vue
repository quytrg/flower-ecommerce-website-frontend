<template>
  <div class="modify-product">
    <ProductForm 
      v-if="product && product.categories"
      :product="product"
      @submit:product="updateProduct"
      pageTitle="Modify Product"
    />
  </div>
</template>

<script>
  import ProductForm from '@/components/admin/ProductForm/ProductForm.vue';
  import ProductService from '@/services/admin/product.service.js'
  import Swal from 'sweetalert2'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import CategoryService from '@/services/admin/category.service';
  export default {
    name: "ModifyProduct",
    components: {
      ProductForm,
    },
    data() {
      return {
        product: null,
      }
    },
    methods: {
      async getProduct() {
        this.product = await ProductService.getProductBySlug(this.$route.params.slug)
        const categories = await CategoryService.getCategoriesOfProduct(this.product._id)
        console.log(categories)
        this.product.categories = categories.map(item => {
          return {
            title: item.title,
            _id: item._id
          }
        })
      },
      async updateProduct(data) {
        try {
          loadingDialogHelper()
          await ProductService.update(data.get('_id'), data)
          Swal.close()
          this.$router.push({ name: "ProductsAdmin" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getProduct()
    }
  }
</script>

<style scoped lang="scss">

</style>
