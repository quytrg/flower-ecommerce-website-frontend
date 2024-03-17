<template>
  <div class="modify-account">
    <AccountForm 
      v-if="account"
      :account="account"
      @submit:account="updateAccount"
    />
  </div>
</template>

<script>
  import AccountForm from '@/components/admin/AccountForm/AccountForm.vue';
  import AccountService from '@/services/admin/account.service.js'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import Swal from 'sweetalert2'

  export default {
    name: "ModifyProduct",
    components: {
      AccountForm,
    },
    data() {
      return {
        account: null
      }
    },
    methods: {
      async getAccount() {
        this.account = await AccountService.getOne(this.$route.params.id)
      },
      async updateAccount(data) {
        try {
          loadingDialogHelper(
            "Updating account"
          )
          await AccountService.update(data.get('_id'), data)
          Swal.close()
          this.$router.push({ name: "Accounts" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getAccount()
    }
  }
</script>

<style scoped lang="scss">

</style>
