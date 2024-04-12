<template>
  <div class="footer-wrapper fluid-section">
    <div class="footer__block">
      <h5 class="footer-text-margin">Remember to offer beautiful flowers from Kyiv Florist Studio Valentines Day, Mothers Day, Christmas... Reminds you 7 days before. No spam or sharing your address</h5>
      <input type="text" placeholder="Your Email">
      <Button textContent="REMIND" type="dark" :fullWidth="true" />
    </div>
    <div class="footer__block">
      <h4 class="footer-title-gray">Contact Us</h4>
      <h5 class="footer-mini-title-gray">Address</h5>
      <h5 class="footer-text-margin">15/4 Khreshchatyk Street, Kyiv</h5>
      <h5 class="footer-mini-title-gray">Phone</h5>
      <h5 class="footer-text-margin">+380980099777</h5>
      <h5 class="footer-mini-title-gray">General Enquiry</h5>
      <h5 class="footer-text-margin">Kiev.Florist.Studio@gmail.com</h5>
      <br>
      <h4 class="footer-title-gray">Follow Us</h4>
      <div class="social-icon">
        <img src="@/assets/images/insta.svg" alt="">
        <img src="@/assets/images/pint.svg" alt="">
        <img src="@/assets/images/face.svg" alt="">
        <img src="@/assets/images/x.svg" alt="">
        <img src="@/assets/images/tele.svg" alt="">
      </div>
    </div>
    <div class="footer__block">
      <h4 class="footer-title-gray">Shop</h4>
      <router-link to="/categories" class="footer-text-margin">
        <h5 class="footer-text-margin">All Products</h5>
      </router-link>
      <router-link to="/categories/fresh-flowers" class="footer-text-margin">
        <h5 class="footer-text-margin">Fresh Flowers</h5>
      </router-link>
      <router-link to="/categories/fried-flowers" class="footer-text-margin">
        <h5 class="footer-text-margin">Fried Flowers</h5>
      </router-link>
      <router-link to="/categories/live-plants" class="footer-text-margin">
        <h5 class="footer-text-margin">Live Plants</h5>
      </router-link>
      <router-link to="/categories/aroma-candles" class="footer-text-margin">
        <h5 class="footer-text-margin">Aroma Candles</h5>
      </router-link>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Designer Vases</h5>
      </router-link>
      <router-link to="/categories/fresheners" class="footer-text-margin">
        <h5 class="footer-text-margin">Freshener Diffuser</h5>
      </router-link>
      <br>
      <h4 class="footer-title-gray">Service</h4>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Flower Subscription</h5>
      </router-link>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Wedding & Event Decor</h5>
      </router-link>
    </div>
    <div class="footer__block">
      <h4 class="footer-title-gray">About Us</h4>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Our Story</h5>
      </router-link>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Blog</h5>
      </router-link>
      <br>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Shipping & returns</h5>
      </router-link>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Terms & conditions</h5>
      </router-link>
      <router-link to="/" class="footer-text-margin">
        <h5 class="footer-text-margin">Privacy policy</h5>
      </router-link>
    </div>
  </div>
  
</template>

<script>
  import Button from '@/components/client/Button/Button.vue';
  export default {
    name: "Footer",
    components: {
      Button,
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .footer {
    &__block {
      width: 25%;
      padding: 2.48vw;
      border-left: 1px solid var(--black);

      input {
        width: 100%;
        padding: 1.25vw 1.7vw 1.12vw;
        margin-top: 1.24vw;
        margin-bottom: 1.12vw;
        border: 1px solid black;
      }
    }
  }

  .footer-title-gray {
    color: $gray;
    margin-bottom: 1.56vw;
  }

  .footer-mini-title-gray {
    color: $gray;
    
  }

  .footer-text-margin {
    margin-bottom: 1.12vw;
  }

  .social-icon {
    display: flex;
    align-items: center;
    img {
      width: 32px;
      margin-right: 1.12vw;
    }
  }
</style>
