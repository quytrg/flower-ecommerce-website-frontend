<template>
  <div class="unauthorized d-flex justify-content-center align-items-center flex-column">
    <h1 class="mb-1">403</h1>
    <h3 class="mb-2">Forbidden</h3>
    <h4>The page you are trying to access has restricted access</h4>
    <h5>Contact your administator if you need help</h5>
  </div>
</template>

<script>
  export default {
    name: "Unauthorized",
    data() {
      return {
      }
    },
    methods: {
    },
  }
</script>

<style scoped lang="scss">
  .unauthorized {
    height: 80vh;
    h1 {
      font-size: 100px;
    }
  }
</style>
