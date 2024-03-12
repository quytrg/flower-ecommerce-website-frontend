<template>
  <VueSidebarMenuAkahon 
    :isUsedVueRouter="true"
    menuTitle="KyivAdmin"
    menuIcon="bxs-florist"
    :menuItems="menuItems"
    :profileName="currentAccount?.fullName"
    profileRole="administrator"
    :profileImg="currentAccount?.avatar"
  />
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import { mapState } from 'pinia'
import { useAccountStore } from '@/stores/admin/account.store'

export default {
  name: "Sidebar",
  components: { VueSidebarMenuAkahon },
  data() {
    return {
      menuItems: [
        { link: { name: 'Dashboard' }, name: 'Dashboard', tooltip: 'Dashboard', icon: 'bx-grid-alt' },
        { link: { name: 'ProductsAdmin' }, name: 'Products', tooltip: 'Products', icon: 'bxl-dropbox' },
        { link: { name: 'Accounts' }, name: 'Accounts', tooltip: 'Accounts', icon: 'bx-user' },
        { link: { name: 'Dashboard' }, name: 'Orders', tooltip: 'Orders', icon: 'bx-cart-alt' },
        { link: { name: 'Dashboard' }, name: 'File Manager', tooltip: 'File Manager', icon: 'bx-folder' },
        { link: { name: 'Dashboard' }, name: 'Setting', tooltip: 'Setting', icon: 'bx-cog' },
      ],
    }
  },
  computed: {
    ...mapState(useAccountStore, ['currentAccount'])
  }
};
</script>

<style scoped lang="scss"></style>
