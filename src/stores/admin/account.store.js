import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => {
    return { 
      currentAccount: null,
      isFetching: false,
      error: false
    }
  },
  actions: {
    loginStart() {
      this.isFetching = true
      this.error = false
    },
    loginSuccess(payload) {
      this.currentAccount = payload
      this.isFetching = false
      this.error = false
    },
    loginFailed() {
      this.isFetching = false
      this.error = true
    },
    updateAccountInfo(payload) {
      this.currentAccount = payload
    }
  },
})
