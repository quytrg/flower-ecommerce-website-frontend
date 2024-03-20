<template>
  <div class="create-role">
    <RoleForm 
      :role="role"
      @submit:role="createRole"
      pageTitle="Add Role"
    />
  </div>
</template>

<script>
  import RoleForm from '@/components/admin/RoleForm/RoleForm.vue';
  import roleService from '@/services/admin/role.service.js'
  import Swal from 'sweetalert2'
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  export default {
    name: "CreateRole",
    components: {
      RoleForm,
    },
    methods: {
      async createRole(data) {
        console.log(data)
        try {
          loadingDialogHelper(
            "Creating role"
          )
          await roleService.create(data)
          Swal.close()
          this.$router.push({ name: "Roles" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    data() {
      return {
        role: {
          status: 'active',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
