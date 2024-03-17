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
          const result = await AccountService.update(data._id, data)
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
