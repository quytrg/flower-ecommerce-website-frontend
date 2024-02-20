<template>
  <div class="brand">
    <div class="brand__name">
      <h1>Kyiv</h1>
      <h1>
        LuxeBouquets<sup>®</sup>
      </h1>
      <h5>Discover Uniquely Crafted Bouquets and Gifts for Any Occasion:</h5>
      <h5>Spread Joy with Our Online Flower Delivery Service</h5>
    </div>
    <div class="brand__quote">
      <img src="https://uploads-ssl.webflow.com/6400d82951450021c2d1eb7b/64a03d676a877d080695084a_ewddewd%201.webp" alt="a girl is smelling flowers">
      <h6>Experience the joy of giving with our modern floral studio. Order online and send fresh flowers, plants and gifts today.</h6>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Brand",
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .brand {
    width: 100%;
    // height: 100vh;
    padding: 2vw 5vw; 
    // border-left: 1px solid $black;
    // border-bottom: 1px solid $black;
    &__name > h5:first-of-type{
      margin-top: 1.12vw;
    }
    &__quote {
      padding-top: 1.7vw;
      margin-top: 2.7vw;
      border-top: 1px solid $black;
      display: flex;
      justify-content: center;

      img {
        width: 50%;
        padding-right: 1.7vw;
        border-right: 1px solid $black;
      }

      h6 {
        width: 50%;
        padding-left: 1.7vw;
      }
    }
  }
</style>
