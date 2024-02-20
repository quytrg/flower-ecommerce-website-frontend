<template>
  <header class="header header-after header-client">
    <Header/>
  </header>
  <main class="main main-client">
    <router-view></router-view>
  </main>
  <footer class="footer footer-client">
    <Footer/>
  </footer>
</template>

<script>
  import Header from '../partials/Header/Header.vue';
  import Footer from '../partials/Footer/Footer.vue';
  export default {
    name: "default",
    components: {
      Header,
      Footer
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss">
  @import '@/assets/styles/client/main.css';
  .header-after::after {
    content: '';
    display: block;
    width: 100%;
    height: 6vw;
  }
</style>
