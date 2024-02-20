<template>
  <button :class="type" :style="fullWidth === true ? 'width: 100%' : ''">{{ textContent }}</button>
</template>

<script>
  export default {
    name: "Button",
    props: {
      textContent: {
        type: String,
        default: "Button"
      },
      type: {
        type: String,
        default: "light",
        validator: (val) => ["light", "dark", "trans"].includes(val),
      },
      fullWidth: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';

  button {
    padding: 1.25vw 1.7vw 1.12vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    margin: auto;
  }
  .light {
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid $black;
  }

  .light:hover {
    color: $white;
    background-color: $black;
  }

  .dark {
    color: $white;
    background-color: $black;
  }

  .dark:hover {
    background-color: $dark-gray;
  }

  .trans {
    border: 1px solid $white;
    background-color: rgba(0, 0, 0, 0);
    color: $white;
  }

  .trans:hover {
    background-color: $white;
    color: $black;
  }
  
</style>
