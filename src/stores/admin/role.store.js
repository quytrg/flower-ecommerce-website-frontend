import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', {
  state: () => {
    return { 
      role: null,
      isFetching: false,
      error: false
    }
  },
  
  actions: {
    getRoleStart() {
      this.isFetching = true
      this.error = false
    },
    getRoleSuccess(payload) {
      this.role = payload
      this.isFetching = false
      this.error = false
    },
    getRoleFailed() {
      this.isFetching = false
      this.error = true
    }
  },
})
