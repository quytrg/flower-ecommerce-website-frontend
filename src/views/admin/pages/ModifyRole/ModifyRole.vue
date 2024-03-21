<template>
  <div class="modify-role">
    <RoleForm 
      v-if="role"
      :role="role"
      pageTitle="Modify Role"
      @submit:role="updateRole"
    />
  </div>
</template>

<script>
  import RoleForm from '@/components/admin/RoleForm/RoleForm.vue';
  import loadingDialogHelper from '@/helpers/admin/dialogs/loading.helper'
  import Swal from 'sweetalert2'
  import roleService from '@/services/admin/role.service.js'

  export default {
    name: "ModifyProduct",
    components: {
        RoleForm,
    },
    data() {
      return {
        role: null,
      }
    },
    methods: {
      async getRole() {
        this.role = await roleService.getById(this.$route.params.id)
      },
      async updateRole(data) {
        try {
          loadingDialogHelper(
            "Updating role"
          )
          await roleService.update(data._id, data)
          Swal.close()
          this.$router.push({ name: "Roles" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getRole()
    }
  }
</script>

<style scoped lang="scss">

</style>
