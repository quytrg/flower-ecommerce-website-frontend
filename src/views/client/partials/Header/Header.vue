<template>
  <nav class="navb">
    <div class="navb__content">
      <div class="navb__content--left">
        <div class="navb-link-wrap">
          <div class="navb-link-wrap__block">
            <router-link :to="linkFirstTab">{{ firstNavTab }}</router-link>
          </div>
          <div class="navb-link-wrap__block">
            <router-link to="/">Contact</router-link>
          </div>
        </div>
      </div>

      <div class="navb__content--right">
        <div class="navb-link-wrap">
          <div class="navb-link-wrap__block">
            <router-link to="/">Sign in</router-link>
          </div>
          <div class="navb-link-wrap__block">
            <router-link to="/">Cart</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        // firstNavTab: this.$route.name !== 'Shop' ? 'Shop' : 'Home',
        // linkFirstTab: this.$route.name !== 'Shop' ? '/category' : '/',
      }
    },
    computed: {
      firstNavTab() {
        return this.$route.name !== 'Shop' ? 'Shop' : 'Home'
      },
      linkFirstTab() {
        return this.$route.name !== 'Shop' ? '/categories' : '/'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .navb {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid $black;
    border-bottom: 1px solid $black;
    background-color: $white;
    z-index: 99;

    &__content {
      display: flex;

      &--left {
        width: 50%;
      }

      &--right {
        width: 50%;
        display: flex;
        justify-content: end;
      }
    }

    &-link-wrap {
      width: 50%;
      display: flex;

      &__block {
        display: flex;
        width: 50%;
        padding: 2.24vw;
        justify-content: center;
        align-items: center;
        border-right: 1px solid $black;
      }

      &:nth-child(1) {
        border-left: 1px solid $black;
      }
    }
  }
</style>
