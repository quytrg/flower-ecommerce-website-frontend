<template>
  <div class="talk fluid-section">
    <div class="talk__content grid-wrapper-left">
      <div class="talk__block content" :style="{ borderRight: '1px solid var(--black)' }">
        <h1>Let's Talk</h1>
        <h5>Enter your number and we'll call you back ASAP to help you with any questions or to place an order</h5>
        <div class="talk__block--input flex-box">
          <input type="text" placeholder="+84 XX XXX XX XX">
          <Button textContent="REACH US" type="dark"/>
        </div>
      </div>
      <div class="talk__block flex-box">
        <h2>Phone</h2>
        <h2>Address</h2>
      </div>
      <div class="talk__block flex-box">
        <div class="talk__block--content">
          <div class="talk__block--content-inline flex-box">
            <img src="@/assets/images/phone.svg" alt="phone-img">
            <h5>+380980099777</h5>
          </div>
          <div class="talk__block--content-inline flex-box">
            <img src="@/assets/images/phone.svg" alt="phone-img">
            <h5>+380980099111</h5>
          </div>
        </div>
        <div class="talk__block--content">
          <h5>OPENING HOURS: 8 TO 11 P.M.</h5>
          <div class="talk__block--content-inline flex-box">
            <img src="@/assets/images/address.svg" alt="">
            <h5>15/4 Khreshchatyk Street, Kyiv</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="talk__content grid-wrapper-right">
      <img class="talk__content--thumb" src="https://uploads-ssl.webflow.com/6400d82951450021c2d1eb7b/64a03b42882782a8aa1f0e26_KYIV%20LB%202%20720.webp" alt="">
      <div class="talk__social flex-box">
        <h3>Follow us</h3>
        <div class="talk__social--icon">
          <img src="@/assets/images/insta.svg" alt="">
          <img src="@/assets/images/pint.svg" alt="">
          <img src="@/assets/images/face.svg" alt="">
          <img src="@/assets/images/x.svg" alt="">
          <img src="@/assets/images/tele.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/client/Button/Button.vue'
  export default {
    name: "Talk",
    components: {
      Button
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .talk {
    &__content > *:not(:last-child) {
      border-bottom: 1px solid $black;
    }

    &__block {
      h1 {
        margin-bottom: 2.24vw
      }

      input {
        flex: 1;
        padding: 1.25vw 1.7vw 1.12vw;
      }

      &--input {
        margin-top: 1.24vw;
      }

      h2 {
        width: 50%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.98vw;
        border-right: 1px solid $black;
      }

      &--content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        padding: 4.48vw;
        border-right: 1px solid $black;
        img {
          color: $black;
          width: 24px;
          margin-right: 0.56vw;
        }

        &-inline {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.24vw;
        }
      }
    }
    
    &__content {
      &--thumb {
        width: 100%;
      }
    }

    &__social {
      padding: 0.12vw;
      h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex: 1;
        border-right: 1px solid $black;
      }
      &--icon {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex: 1;
        img {
          width: 32px;
          margin: 0 0.98vw;
        }
      }
    }
  }
</style>
