<template>
  <div class="category">
    <div class="category__list">
      <div class="category-block-wrapper" v-for="(item, index) in category">
        <div class="category__item img-hover-zoom" v-if="index % 2 === 0" :key="index">
          <div class="category__name">
            <h3>{{ item.title }}</h3>
            <router-link :to="{name: 'Products', params: { categoryname: `${item.slug}`}}" class="category__link">
              <h5>Shop now</h5>
              <img src="@/assets/images/arrow-right.svg" alt="" class="slide-right-animation">
            </router-link>
          </div>
          <div class="category__thumb">
            <router-link :to="{name: 'Products', params: { categoryname: `${item.slug}`}}">
              <img :src="item.thumbnail1" :alt="item.thumbnail1">
            </router-link>
          </div>
        </div>
        <div class="category__item img-hover-zoom" v-if="index % 2 === 1" :key="index">
          <div class="category__thumb">
            <router-link :to="{name: 'Products', params: { categoryname: `${item.slug}`}}">
              <img :src="item.thumbnail1" :alt="item.thumbnail1">
            </router-link>
          </div>
          <div class="category__name">
            <h3>{{ item.title }}</h3>
            <router-link :to="{ name: 'Products', params: { categoryname: `${item.slug}` } }" class="category__link">
              <img src="@/assets/images/arrow-left.svg" alt="" class="slide-left-animation">
              <h5>Shop now</h5>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryService from '@/services/client/category.service'
  import splitScroll from '@/helpers/client/splitScroll'
  
  export default {
    name: "Category",
    props: {
      pinClass: {
        type: String,
        default: "",
      }
    },
    data() {
      return {
        category: [],
        categoryHeight: 0,
      }
    },
    methods: {
      async getCategory() {
        try {
          this.category = await CategoryService.getAll()
        }
        catch(err) {
          console.log(err)
        }
      },
    },
    created() {
      this.getCategory()
    },
    watch: {
      category(newCategory, oldCategory) {
        this.categoryHeight = newCategory.length * window.innerWidth * 0.25
      },
      categoryHeight(newHeight, oldHeight) {
        const brandHeight = document.querySelector(this.pinClass).offsetHeight
        const durationCategory = newHeight - brandHeight - 50
        splitScroll(durationCategory, this.pinClass)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .category {
    width: 100%;
    
    &__list > *:not(:last-child) {
      border-bottom: 1px solid $black;
    } 

    &__item {
      display: flex;
      width: 100%;
    }

    &__name {
      width: 50%;
      border-left: 1px solid $black;
      // border-bottom: 1px solid $black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h3, h5 {
        text-align: center;
        margin: 0 3px;
      }
    }

    &__thumb {
      width: 50%;
      img {
        width: 100%;
        aspect-ratio: 1 / 1;
      }
      border-left: 1px solid $black;
      // border-bottom: 1px solid $black;
    }

    &__link {
      display: flex;
      img {
        line-height: 150%;
      }
      // underline h5 while hovering
      &:hover h5 {
        text-decoration: underline;
      }
    }
    
  }
  
  // category animation
  // image zoom on hover category block (hidden while zooming)
  .img-hover-zoom .category__thumb {
    overflow: hidden; 
  }
  
  // slide arrow while hovering category block
  .slide-right-animation {
    transition: transform 0.3s ease-in-out;
  }

  .slide-left-animation {
    transition: transform 0.3s ease-in-out;
  }

  .category__item:hover .slide-left-animation {
    transform: translateX(-10px);
  }

  .category__item:hover .slide-right-animation {
    transform: translateX(10px);
  }
  // end category animation
</style>
