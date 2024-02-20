<template>
  <div class="create-account container mt-3">
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
  export default {
    name: "CreateAccount",
    components: {
      AccountForm,
    },
    methods: {
      async createAccount(data) {
        try {
          console.log(data);
          await AccountService.create(data)
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
