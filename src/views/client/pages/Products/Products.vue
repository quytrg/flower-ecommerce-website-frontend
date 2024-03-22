<template>
  <div class="products fluid-section">
    <div class="products-category grid-wrapper-left relative">
      <div class="products-category__content content white-text background-image" :style="{ backgroundImage: `url(${category.thumbnail})`}">
        <div class="hoist-text relative">
          <h1>{{ category.title }}</h1>
        </div>
      </div>
      <div class="overlay-background-image"></div>
    </div>
    <div class="products-content grid-wrapper-right flex-box">
      <div class="products-block relative img-hover-zoom" v-for="product in products" :key="product._id">
        <router-link :to="{ name: 'ProductDetails', params: { slug: `${product.slug}` } }">
          <img :src="product.thumbnail" :alt="product.title">
          <div class="products-block__text">
            <h5>{{ product.title }}</h5>
            <p class="gray-text">Price ${{ product.price }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryService from '@/services/client/category.service.js'
  import ProductService from '@/services/client/product.service.js'
  import splitScroll from '@/helpers/client/splitScroll'
  export default {
    name: "Products",
    data() {
      return {
        category: {},
        products: [],
        productsHeight: 0,
      }
    },
    methods: {
      async getCategory() {
        this.category = await CategoryService.getCategoryBySlug(this.$route.params.categoryname)
        // fix error backgroundImage inline
        this.category.thumbnail = this.category.thumbnails[1]
      },
      async getProducts() {
        this.products = await ProductService.getProductsByCategory(this.$route.params.categoryname)
      }
    },
    created() {
      this.getCategory()
      this.getProducts()
    },
    watch: {
      products(newProducts, oldProducts) {
        this.productsHeight = Math.ceil(newProducts.length / 2) * window.innerWidth * 0.25
      },
      productsHeight(newHeight, oldHeight) {
        const categoryHeight = document.querySelector('.products-category').offsetHeight
        const durationProducts = newHeight - categoryHeight + 100
        splitScroll(durationProducts, '.products-category')
      }
    }
  }
</script>

<style scoped lang="scss">
  .products {
    &-category {
      &__content {
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &-content {
      flex-wrap: wrap;
    }

    &-content > *:not(:last-child):not(:nth-last-child(2)) {
      border-bottom: 1px solid var(--black);
    }

    &-block {
      width: 50%;
      img {
        width: 100%;
        height: 100%;
        object-position: 50% 50%;
        object-fit: cover;
        display: block;
      }
      border-left: 1px solid var(--black);
      overflow: hidden;

      &__text {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h5 {
          font-weight: 500;
          text-align: center;
        }
      }
    }
  }
  
</style>
 