import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return { 
      orders: []
    }
  },
  actions: {
    getOrders() {
      this.orders = JSON.parse(localStorage.getItem('orders')) || []
    },
    addOrder(orderId) {
      this.orders.unshift(orderId)
      this.setOrders()
    },
    setOrders() {
      localStorage.setItem('orders', JSON.stringify(this.orders))
    }
  },
})
