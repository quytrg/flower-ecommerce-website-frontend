<template>
  <div class="all-categories fluid-section">
    <div class="all-categories__title grid-wrapper-left">
      <div class="content-wrapper content">
        <h1>Choose a</h1>
        <h1>Сategory</h1>
      </div>
    </div>
    <div class="all-categories__content grid-wrapper-right">
      <Category pinClass=".all-categories__title"/>
    </div>
  </div>
</template>

<script>
  import Category from '@/components/client/Category/Category.vue'
  export default {
    name: "Shop",
    components: {
      Category,
    }
  }
</script>

<style scoped lang="scss">
  .all-categories {
    &__title {
      height: 90vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
