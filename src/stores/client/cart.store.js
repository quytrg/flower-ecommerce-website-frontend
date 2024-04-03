import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return { 
      items: []
    }
  },
  getters: {
    totalItems: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    totalCost: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity * item.info.price, 0)
    }
  },
  actions: {
    getCart() {
      this.items = JSON.parse(localStorage.getItem('cart')) || []
    },
    addItem(item, quantity) {
      const targetItem = this.items.find(currItem => currItem.info._id === item._id);
      if (targetItem) targetItem.quantity += quantity;
      else this.items.push({ info: item, quantity: quantity})
      this.setCart()
    },
    removeItem(item, quantity) {
      const targetItem = this.items.find(currItem => currItem.info._id === item._id);
      if (targetItem) {
        targetItem.quantity -= quantity
        if(targetItem.quantity <= 0) this.items = this.items.filter(currItem => currItem.info._id !== item._id);
        this.setCart()
      }
    },
    setCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  },
})
