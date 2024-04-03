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
                <th width="40px"><v-checkbox hide-details></v-checkbox></th>
                <th class="text-start">Product</th>
                <th class="text-end">Price</th>
                <th class="text-center">Quantity</th>
                <th class="text-end">Subtotal</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in items" :key="index">
                <td><v-checkbox hide-details></v-checkbox></td>
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

      <template v-slot:item.2>
        <h3 class="text-h6">Shipping</h3>

        <br>

        <v-radio-group v-model="shipping" label="Delivery Method">
          <v-radio label="Standard Shipping" value="5"></v-radio>
          <v-radio label="Priority Shipping" value="10"></v-radio>
          <v-radio label="Express Shipping" value="15"></v-radio>
        </v-radio-group>
      </template>

      <template v-slot:item.3>
        <h3 class="text-h6">Confirm</h3>

        <br>

        <v-sheet border>
          <v-table>
            <thead>
              <tr>
                <th width="40px"><v-checkbox hide-details></v-checkbox></th>
                <th class="text-start">Product</th>
                <th class="text-end">Price</th>
                <th class="text-end">Quantity</th>
                <th class="text-end">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in items" :key="index">
                <td><v-checkbox hide-details></v-checkbox></td>
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
  export default {
    data: () => ({
      shipping: '5',
      step: 1,
      steps: [
        'Review Order',
        'Select Shipping',
        'Submit',
      ],
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
      ...mapActions(useCartStore, ['getCart', 'removeItem', 'addItem'])
    },
    created() {
      if (!this.totalItems) {
        this.getCart()
      }
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
</style>
