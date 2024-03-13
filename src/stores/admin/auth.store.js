import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { 
      currentAccount: null,
      isFetching: false,
      error: false
    }
  },
  getters: {
    isAuth: (state) => state.currentAccount !== null
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
    update(payload) {
      this.currentAccount = payload
    }
  },
})
