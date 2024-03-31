<template>
  <VueSidebarMenuAkahon 
    :isUsedVueRouter="true"
    menuTitle="KyivAdmin"
    menuIcon="bxs-florist"
    :menuItems="menuItems"
    :profileName="currentAccount?.fullName"
    :profileRole="currentAccount?.roleTitle"
    :profileImg="currentAccount?.avatar"
    @button-exit-clicked="handleLogout"
  />
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import { mapState } from 'pinia'
import { useAuthStore } from '@/stores/admin/auth.store'
import authService from '@/services/admin/auth.service.js'


export default {
  name: "Sidebar",
  components: { VueSidebarMenuAkahon },
  data() {
    return {
      menuItems: [
        { link: { name: 'Dashboard' }, name: 'Dashboard', tooltip: 'Dashboard', icon: 'bx-grid-alt' },
        { link: { name: 'ProductsAdmin' }, name: 'Products', tooltip: 'Products', icon: 'bxl-dropbox' },
        { link: { name: 'Categories' }, name: 'Categories', tooltip: 'Categories', icon: 'bx bx-collection' },
        { link: { name: 'Accounts' }, name: 'Accounts', tooltip: 'Accounts', icon: 'bx-user' },
        { link: { name: 'Roles' }, name: 'Roles', tooltip: 'Roles', icon: 'bx bxs-user-account' },
        { link: { name: 'Permissions' }, name: 'Permissions', tooltip: 'Permissions', icon: 'bx bx-lock' },
        { link: { name: 'Dashboard' }, name: 'Orders', tooltip: 'Orders', icon: 'bx-cart-alt' },
        { link: { name: 'Dashboard' }, name: 'Setting', tooltip: 'Setting', icon: 'bx-cog' },
      ],
    }
  },
  methods: {
    async handleLogout() {
      await authService.logout()
      this.$router.push({ name: 'AdminLogin'})
      location.reload()
    }
  },
  computed: {
    ...mapState(useAuthStore, ['currentAccount'])
  }
};
</script>

<style scoped lang="scss"></style>
