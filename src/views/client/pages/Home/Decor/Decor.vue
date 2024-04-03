<template>
  <div class="decor fluid-section">
    <div class="decor__content content white-text">
      <h4>SERVICE</h4>
      <h1>Wedding & Event Decor</h1>
      <h5>Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life.</h5>
      <Button textContent="INQUIRE NOW" type="trans"/>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/client/Button/Button.vue';
  export default {
    name: "Decor",
    components: {
      Button,
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .decor__content {
    width: 100%;
    padding: 10vw 5.56vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h5 {
      text-align: center;
      padding: 1.24vw 20vw 4.2vw;
    }
    background-image: linear-gradient(rgba(18, 18, 18, .35), rgba(18, 18, 18, .35)), url('https://res.cloudinary.com/dszbsfjzs/image/upload/v1712149338/cgfcl08x252ftxpdujdw.webp');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
