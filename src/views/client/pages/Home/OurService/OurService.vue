<template>
  <div class="our-service fluid-section">
    <div class="our-service__thumb grid-wrapper-left"></div>
    <div class="our-service__content grid-wrapper-right content">
      <h4>SERVICE</h4>
      <h1>Flower Subcriptions</h1>
      <h5>Experience the convenience and savings of regular flower deliveries with our flexible subscription service - up to 30% more profitable than one-time purchases.</h5>
      <Button textContent="SUBSCRIBE NOW"/>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/client/Button/Button.vue';
  export default {
    name: "OurService",
    components: {
      Button,
    }
  }
</script>

<style scoped lang="scss">
  .our-service{
    &__thumb {
      background-image: linear-gradient(rgba(18, 18, 18, .25), rgba(18, 18, 18, .25)), url('https://uploads-ssl.webflow.com/6400d82951450021c2d1eb7b/6436a36c9d977d7032eb51ee_happiness-image-placeholder_lx1a04.webp');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid var(--black);
      padding: 8.48vw 6.64vw;
      h1 {
        font-size: 52px;
        margin: 2.24vw;
      }

      h5 {
        margin-bottom: 4.48vw;
      }
    }

  }

    


</style>
