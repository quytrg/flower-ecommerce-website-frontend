<template>
  <header class="header">
    <Header/>
  </header>
  <main class="main">
    <Sidebar/>
    <router-view></router-view>
  </main>
  <footer class="footer">
  </footer>
</template>

<script>
  import Sidebar from '@/views/admin/partials/Sidebar/Sidebar.vue';
  import Header from '@/views/admin/partials/Header/Header.vue';

  export default {
    name: "default",
    components: {
      Sidebar,
      Header,
    },
    data() {
      return {
      }
    },
    
  }
</script>

<style lang="scss">
  @import '@/assets/styles/admin/main.css';
</style>
