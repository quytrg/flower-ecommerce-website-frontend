<template>
  <div class="about fluid-section">
    <div class="about__title grid-wrapper-left content">
        <h1>About us</h1>
    </div>
    <div class="about__content grid-wrapper-right content">
      <h4>OUR STORY</h4>
      <h2>Kyiv LuxeBouquets</h2>
      <h5>We are a modern local floral studio, which specializes in the design and delivery of unique bouquets. We have the best florists who carefully select each look, our studio cooperates directly with farms for growing different flowers, so we always have fresh flowers, which are collected by our florists in exquisite bouquets. We have a collection of fresh bouquets, collections of dried bouquets, house plants, as well as fragrant candles from luxury brands to create the perfect atmosphere. Make someone's day amazing by sending flowers, plants and gifts the same or next day. Ordering flowers online has never been easier.</h5>
      <Button textContent="LEARN MORE" type="light"/>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/client/Button/Button.vue';
  import splitScroll from '@/helpers/client/splitScroll';

  export default {
    name: "AboutUs",
    components: {
      Button, 
    },
    mounted() {
      splitScroll(410, '.about__title')
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .about {
    &__title {
      h1 {
        margin: 0;
      }
    }

    &__content {
      border-left: 1px solid $black;
      h2 {
        margin: 2.24vw 0;
      }
      
      h5 {
        margin-bottom: 4.42vw;
      }

      button {
        margin-left: 0;
      }
    }
  }
</style>
