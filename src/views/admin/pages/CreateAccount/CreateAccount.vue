<template>
  <div class="create-account">
    <AccountForm 
      :account="account"
      @submit:account="createAccount"
      pageTitle="Add a new product"
    />
  </div>
</template>

<script>
  import AccountForm from '@/components/admin/AccountForm/AccountForm.vue';
  import AccountService from '@/services/admin/account.service.js'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import Swal from 'sweetalert2'

  export default {
    name: "CreateAccount",
    components: {
      AccountForm,
    },
    methods: {
      async createAccount(data) {
        try {
          loadingDialogHelper(
            "Creating account"
          )
          await AccountService.create(data)
          Swal.close()
          this.$router.push({ name: "Accounts" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    data() {
      return {
        account: {
          status: 'active',
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
