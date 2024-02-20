<template>
  <section class="category-section fluid-section">
    <div class="brand-wrapper grid-wrapper-left">
      <Brand />
    </div>
    <div class="category-wrapper grid-wrapper-right">
      <Category pinClass=".brand-wrapper"/>
    </div>
  </section>  
  <section class="about-section">
    <div class="about-wrapper">
      <AboutUs />
    </div>
  </section>
  <section class="why-choose-section">
    <div class="why-choose-wrapper">
      <WhyChoose />
    </div>
  </section>
  <section class="talk-section">
    <div class="talk-wrapper">
      <Talk />
    </div>
  </section>
  <section class="our-service">
    <div class="our-service-wrapper">
      <h1>Our Service</h1>
      <OurService />
    </div>
  </section>
  <section class="decor-section">
    <div class="decor-wrapper">
      <Decor />
    </div>
  </section>
  <section class="slider-section">
    <div class="slider-wrapper">
      <Slider />
    </div>
  </section>
</template>

<script>
  import Category from '@/components/client/Category/Category.vue'; 
  import Brand from '@/views/client/pages/Home/Brand/Brand.vue';
  import AboutUs from '@/views/client/pages/Home/AboutUs/AboutUs.vue';
  import WhyChoose from '@/views/client/pages/Home/WhyChoose/WhyChoose.vue';
  import Talk from '@/views/client/pages/Home/Talk/Talk.vue';
  import OurService from '@/views/client/pages/Home/OurService/OurService.vue'
  import Decor from '@/views/client/pages/Home/Decor/Decor.vue';
  import Slider from '@/views/client/pages/Home/Slider/Slider.vue';

  export default {
    name: "Home",
    components: { 
      Category,
      Brand,
      AboutUs,
      WhyChoose,
      Talk,
      OurService,
      Decor,
      Slider
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .our-service-wrapper {
    text-align: center;
    h1 {
      padding: 4.48vw;
      border-bottom: 1px solid $black;
    }
  }

</style>
