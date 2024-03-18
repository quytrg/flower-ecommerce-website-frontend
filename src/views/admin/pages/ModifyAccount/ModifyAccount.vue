<template>
  <div class="modify-account">
    <AccountForm 
      v-if="account && roles"
      :account="account"
      :roles="roles"
      @submit:account="updateAccount"
    />
  </div>
</template>

<script>
  import AccountForm from '@/components/admin/AccountForm/AccountForm.vue';
  import AccountService from '@/services/admin/account.service.js'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import Swal from 'sweetalert2'
  import roleService from '@/services/admin/role.service.js'

  export default {
    name: "ModifyProduct",
    components: {
      AccountForm,
    },
    data() {
      return {
        account: null,
        roles: null
      }
    },
    methods: {
      async getAccount() {
        this.account = await AccountService.getOne(this.$route.params.id)
      },
      async getRoles() {
        const result = await roleService.getAll()
        this.roles = result.roles
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
      this.getAccount(),
      this.getRoles()
    }
  }
</script>

<style scoped lang="scss">

</style>
