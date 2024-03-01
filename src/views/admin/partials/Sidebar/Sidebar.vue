<template>
  <VueSidebarMenuAkahon 
    :isUsedVueRouter="true"
    menuTitle="KyivAdmin"
    menuIcon="bxs-florist"
    :menuItems="menuItems"
    :profileName="account.fullName"
    profileRole="administrator"
    :profileImg="account.avatar"
  />
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import { mapState } from 'pinia'
import { useAuthStore } from '@/stores/admin/auth.store'

export default {
  name: "Sidebar",
  components: { VueSidebarMenuAkahon },
  data() {
    const authStore = useAuthStore()
    return {
      menuItems: [
        { link: { name: 'Dashboard' }, name: 'Dashboard', tooltip: 'Dashboard', icon: 'bx-grid-alt' },
        { link: { name: 'ProductsAdmin' }, name: 'Products', tooltip: 'Products', icon: 'bxl-dropbox' },
        { link: { name: 'Accounts' }, name: 'Accounts', tooltip: 'Accounts', icon: 'bx-user' },
        { link: { name: 'Dashboard' }, name: 'Orders', tooltip: 'Orders', icon: 'bx-cart-alt' },
        { link: { name: 'Dashboard' }, name: 'File Manager', tooltip: 'File Manager', icon: 'bx-folder' },
        { link: { name: 'Dashboard' }, name: 'Setting', tooltip: 'Setting', icon: 'bx-cog' },
      ],
      account: authStore.currentAccount
    }
  },
  computed: {
    ...mapState(useAuthStore, ['currentAccount'])
  }
};
</script>

<style scoped lang="scss"></style>
