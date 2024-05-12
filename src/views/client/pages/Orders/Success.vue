<template>
  <div class="order-success">
    <div class="order-success-wrapper mb-5 ms-3 me-3 py-5">
      <div class="text-center my-3">
       <v-icon icon="mdi mdi-check-circle" size="48px"></v-icon>
      </div>
      <h3 class="text-center my-3">Thank you for your order</h3>
      <h5 class="text-center">The order confirmation email with details of your order and a link to track its progress has been sent to your email address.</h5>
      <h4 class="text-center">Your order # is: 
        <router-link to="/">{{ orders[0] }}</router-link>
       - Pending</h4>
      <br>
      <v-sheet border class="mb-3">
        <v-table class="confirm-info">
          <tbody>
            <tr>
              <td>
                <div>
                  <div class="d-flex align-items-center my-3">
                    <v-icon icon="mdi mdi-map-marker-outline" color="grey-darken-1"></v-icon>
                    <h6 class="ms-2">Address</h6>
                  </div>
                  <div>
                    <p>{{ order.info.fullName }}</p>
                    <p>{{ order.info.specificAddress }}</p>
                    <p>{{ order.info.ward?.ward_name }}, {{ order.info.district?.district_name }}, {{ order.info.province?.province_name }}</p>
                    <p class="my-3">{{ order.info.phone }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div class="d-flex align-items-center my-3">
                    <v-icon icon="mdi mdi-credit-card-outline" color="grey-darken-1"></v-icon>
                    <h6 class="ms-2">Payment</h6>
                  </div>
                </div>
                <div>
                  <p class="mb-3">
                    Cash on Delivery is a type of payment method where the recipient make payment for the order at the time of delivery rather than in advance.
                  </p>
                </div>
              </td>
              <td>
                <div>
                  <div class="d-flex align-items-center my-3">
                    <v-icon icon="mdi mdi-truck-fast-outline" color="grey-darken-1"></v-icon>
                    <h6 class="ms-2">Shipping</h6>
                  </div>
                </div>
                <div>
                  <p class="mb-3">Shipping fee (${{ shipping }})</p>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
      <v-sheet border>
        
        <v-table>
          <thead>
            <tr>
              <th class="text-start">Product</th>
              <th class="text-end">Price</th>
              <th class="text-end">Quantity</th>
              <th class="text-end">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in items" :key="index">
              <td class="text-start">
                <div class="d-flex">
                  <div class="product-thumbnail">
                    <img 
                      :src="product.info.thumbnail" 
                      :alt="product.info.title"
                    >
                  </div>
                  <div class="d-flex align-items-center">
                    {{ product.info.title }}
                  </div>
                </div>
              </td>
              <td class="text-end" v-text="product.info.price"></td>
              <td class="text-end" v-text="product.quantity"></td>
              <td class="text-end" v-text="product.quantity * product.info.price"></td>
            </tr>
            <tr>
              <th>Shipping</th>
              <th class="text-end" colspan="5">
                ${{ shipping }}
              </th>
            </tr>
            <tr>
              <th>Total</th>
              <th class="text-end" colspan="5">
                ${{ total }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useCartStore } from '@/stores/client/cart.store'
  import { useOrdersStore } from '@/stores/client/orders.store'
  import provinceService from '@/services/client/province.service';
  import checkoutService from '@/services/client/checkout.service';

  export default {
    data: () => ({
      shipping: '5',
      order: {
        info: {
          fullName: '',
          email: '',
          phone: '',
          province: null,
          district: null,
          ward: null,
          specificAddress: ''
        },
        items: [],
        shipping: 0,
        totalCost: 0,
        totalItems: 0
      }
    }),
    computed: {
      total () {
        return this.totalCost + Number(this.shipping ?? 0)
      },
      ...mapState(useCartStore, ['items', 'totalCost', 'totalItems']),
      ...mapState(useOrdersStore, ['orders'])
    },
    methods: {
      async getProvinces() {
        const res = await provinceService.getProvinces()
        this.provinces = res.results
      },
      async getDistricts(province_id) {
        const res = await provinceService.getDistricts(province_id)
        this.districts = res.results
      },
      async getWards(district_id) {
        const res = await provinceService.getWards(district_id)
        this.wards = res.results
      },
      async handleSelectProvince(province_id) {
        this.order.info.district = null
        this.order.info.ward = null
        await this.getDistricts(province_id)

        const province = this.provinces.find(item => item.province_id === province_id)
        this.order.info.province = province
      },
      async handleSelectDistrict(district_id) {
        this.order.info.ward = null
        await this.getWards(district_id)

        const district = this.districts.find(item => item.district_id === district_id)
        this.order.info.district = district
      },
      async handleSelectWard(ward_id) { 
        const ward = await this.wards.find(item => item.ward_id === ward_id)
        this.order.info.ward = await ward
      },
      ...mapActions(useCartStore, ['getCart', 'removeItem', 'addItem']),
      ...mapActions(useOrdersStore, ['addOrder', 'getOrders'])
    },
    created() {
      if (!this.totalItems) {
        this.getCart()
      }
      this.getProvinces()
      this.getOrders()
    }
  }
</script>

<style scoped lang="scss">
  .order-success {
    border-bottom: 1px solid var(--black);
  }

  .product-thumbnail {
    width: 80px;
    height: 80px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-right: 0.5rem;
    position: relative;
    border-bottom: 1rem;
    overflow: hidden;
    float: left;
    background-color: #eef6f8ea;

    img {
      height: 80px;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: auto;
    }
  }

  .quantity {
    font-size: 1rem;

    input {
      width: 3rem;
      height: 3rem;
      text-align: center;
      border: 1px solid #a4a4a4 !important;
      border-left: none !important;
      border-right: none !important;
    }

    button {
      width: 3rem;
      height: 3rem;
      border-radius: 0;
      border: 1px solid #a4a4a4;
      background-color: var(--white);
      font-size: 22px;
    }

    button:hover {
      background-color: var(--white);
    }

    h5 {
      font-weight: 400;
    }

    margin-bottom: 4.48vw;
  }

  .delete-item {
    cursor: pointer;
    margin: 0;
  }
  .delete-item:hover {
    color: black;
  }

  .address-wrapper, .payment-wrapper {
    border-right: 1px solid var(--light-gray);
  }

  .confirm-info tr > :not(:last-child){
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }

  .confirm-info {
    h6 {
      font-weight: 500;
      opacity: 0.75;
      margin-bottom: 0;
    }

    p {
      opacity: 0.85;
      font-size: 16px;
      margin-bottom: 0.2rem;
    }

    td {
      width: 30%;
      vertical-align: top;
    }
  }
</style>


