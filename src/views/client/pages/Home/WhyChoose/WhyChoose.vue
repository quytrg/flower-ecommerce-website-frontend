<template>
  <div class="why-choose fluid-section">
    <div class="why-choose__title grid-wrapper-left content">
      <h1>Why choose us ?</h1>
    </div>
    <div class="why-choose__content grid-wrapper-right">
      <div class="why-choose__content--block content">
        <h2>Stylish bouquets by florists</h2>
        <h5>At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service.</h5>
      </div>
      <div class="why-choose__content--block content">
        <h2>On-time delivery</h2>
        <h5>Never miss a moment with our on-time flower delivery service. Our couriers will deliver your bouquet personally, without boxes, to ensure it arrives in perfect condition. Trust us to deliver your thoughtful gift reliably.</h5>
      </div>
      <div class="why-choose__content--block content">
        <h2>Safe payment</h2>
        <h5>You can feel secure when placing an order with us, as we use industry-standard security measures to protect your payment information. Your transaction will be safe and hassle-free, so you can shop with confidence.</h5>
      </div>
      <div class="why-choose__content--block content">
        <h2>Subscription by your needs</h2>
        <h5>With our subscription service tailored to your specific needs, you can enjoy the convenience of having beautiful bouquets delivered straight to your door at regular intervals. Our flexible service is perfect for busy individuals or those who want to ensure they always have fresh flowers on hand. You'll save time and money with this hassle-free solution to your floral needs.</h5>
      </div>
    </div>
  </div>
</template>

<script>
  import splitScroll from '@/helpers/client/splitScroll';
  export default {
    name: "WhyChoose",
    mounted() {
      splitScroll('177%', '.why-choose__title')
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';

  .why-choose__title {
    padding-bottom: 2.24vw;
  }
  .why-choose__content > *:not(:last-child){
    border-bottom: 1px solid $black;
  }

  .why-choose__content--block {
    border-left: 1px solid $black;
    h5 {
      margin-top: 1.24vw;
    }
  }
</style>
