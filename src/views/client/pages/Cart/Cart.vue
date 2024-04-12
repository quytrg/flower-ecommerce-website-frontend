<template>
  <div class="cart">
    <v-stepper
      v-model="step"
      :items="steps"
      show-actions
    >
      <template v-slot:item.1>
        <h3 class="text-h6">Order</h3>

        <br>

        <v-sheet border>
          <v-table>
            <thead>
              <tr>
                <th width="40px"><v-checkbox hide-details class="cart-checkbox"></v-checkbox></th>
                <th class="text-start">Product</th>
                <th class="text-end">Price</th>
                <th class="text-center">Quantity</th>
                <th class="text-end">Subtotal</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in items" :key="index">
                <td><v-checkbox hide-details class="cart-checkbox"></v-checkbox></td>
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
                <td class="text-end quantity">
                  <div class="d-flex align-items-center justify-content-center">
                    <button @click="handleDecreaseQuantity(product.info)">-</button>
                    <input type="text" v-model="product.quantity"/>
                    <button @click="handleIncreaseQuantity(product.info)">+</button>
                  </div>
                </td>
                <td class="text-end" v-text="product.quantity * product.info.price"></td>
                <td class="text-end">
                  <p class="delete-item" @click="handleDeleteItem(product)">Delete</p>
                </td>
              </tr>

              <tr>
                <th>Total</th>
                <th class="text-end" colspan="5">
                  ${{ totalCost }}
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-sheet>
      </template>

      <template v-slot:item.2 class="cart-address">
        
        <v-container fluid class="p-0">
          <v-row>
            <v-col cols="7" class="address-wrapper">
              <h3 class="text-h6">Address</h3>
              <br>
              <br>
              <v-form>
                <v-row class="px-5">
                  <v-col cols="6">
                    <v-text-field label="Full name" variant="outlined" v-model="order.info.fullName">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-5">
                  <v-col cols="6">
                    <v-text-field label="Email" variant="outlined" v-model="order.info.email">
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Number phone" variant="outlined" v-model="order.info.phone">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="px-5">
                  <v-col cols="4">
                    <v-select
                      label="City/Province"
                      :items="provinces"
                      item-title="province_name"
                      item-value="province_id"
                      @update:modelValue="handleSelectProvince($event)"
                      variant="outlined"
                      v-model="order.info.province"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      label="District"
                      :items="districts"
                      item-title="district_name"
                      item-value="district_id"
                      @update:modelValue="handleSelectDistrict($event)"
                      variant="outlined"
                      v-model="order.info.district"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      label="Ward"
                      :items="wards"
                      item-title="ward_name"
                      item-value="ward_id"
                      @update:modelValue="handleSelectWard($event)"
                      variant="outlined"
                      v-model="order.info.ward"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="px-5">
                  <v-col cols="12">
                    <v-textarea label="Specific home address" variant="outlined" v-model="order.info.specificAddress"></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
            <v-col cols="5" class="px-6">
              <h6 class="text-h6">Voucher</h6>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:item.3>
        <v-container fluid class="p-0">
          <v-row>
            <v-col cols="7" class="payment-wrapper">
                <v-tabs v-model="tab" color="black" align-tabs="start">
                    <v-tab :value="1">Cash on delivery</v-tab>
                    <v-tab :value="2">Card</v-tab>
                    <v-tab :value="3">Gift card</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item :value="1">
                      <v-container fluid class="px-0">
                          <v-row>
                            <v-col cols="12">
                              <h5>Cash on Delivery is a type of payment method where the recipient make payment for the order at the time of delivery rather than in advance.</h5> 
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-window-item>
                </v-window>
            </v-col>
            <v-col cols="5" class="px-6">
                <h3 class="text-h6">Shipping</h3>
                <br>
                <v-radio-group v-model="shipping" label="Delivery Method">
                <v-radio label="Standard Shipping ($5)" value="5"></v-radio>
                <v-radio label="Priority Shipping ($10)" value="10"></v-radio>
                <v-radio label="Express Shipping ($15)" value="15"></v-radio>
                </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
        
      </template>

      <template v-slot:item.4>
        <h3 class="text-h6">Confirm</h3>

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
      </template>
    </v-stepper>
  </div>
  
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useCartStore } from '@/stores/client/cart.store'
  import provinceService from '@/services/client/province.service';

  export default {
    data: () => ({
      shipping: '5',
      step: 1,
      steps: [
        'Review Order',
        'Address',
        'Payment',
        'Confirmation',
      ],
      provinces: [],
      districts: [],
      wards: [],
      tab: 1,
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
      ...mapState(useCartStore, ['items', 'totalCost', 'totalItems'])
    },
    methods: {
      handleDecreaseQuantity(product) {
        this.removeItem(product, 1)
      },
      handleIncreaseQuantity(product) {
        this.addItem(product, 1)
      },
      handleDeleteItem(item) {
        this.removeItem(item.info, item.quantity)
      },
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
      ...mapActions(useCartStore, ['getCart', 'removeItem', 'addItem'])
    },
    created() {
      if (!this.totalItems) {
        this.getCart()
      }
      this.getProvinces()
    }
  }
</script>

<style scoped lang="scss">
  .cart {
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


