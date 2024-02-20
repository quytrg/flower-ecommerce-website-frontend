<template>
  <div class="slider">
    <h1>Our Clients say</h1>
    <div class="slider__content">
      <swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="false"
        :navigation="false"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide>
          <h3>"Flower subscriptions revolutionized my Kiev hotel! Conveniently customize and receive fresh bouquets regularly. Highly recommended for hassle-free floral arrangements!”</h3>
          <h5>– Leonid Yurushev</h5>
        </swiper-slide>
        <swiper-slide>
          <h3>“Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!"</h3>
          <h5>– Ronald Richards</h5>
        </swiper-slide>
      </swiper>
    </div>
    <Button textContent="READ MORE"/>
  </div>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/pagination";
  import "swiper/css/navigation";

  // import required modules
  import { Autoplay, Pagination, Navigation } from "swiper/modules";

  import Button from '@/components/client/Button/Button.vue'

  export default {
    components: {
      Swiper,
      SwiperSlide,
      Button,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
    },
  };
</script>

<style scoped lang="scss">
  .swiper {
    width: 75vw;
    // height: 400px;
  }

  .swiper-slide {
    text-align: center;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      font-weight: 300;
    }

    h5 {
      margin: 1.24vw;
    }
  }

  .slider {
    h1 {
      text-align: center;
      font-weight: 500;
      font-size: 56px;
      margin-top: 4.24vw;
      margin-bottom: 1.24vw;
    }

    &__content {
      margin-bottom: 1.12vw;
    }

    padding-bottom: 5.56vw;
    border: 1px solid var(--black);
  }

</style>
