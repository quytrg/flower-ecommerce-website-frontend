<template>
  <div class="accounts fluid-container mx-3">
    <h3 class="accounts-title my-3">Account List</h3>

    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between">
        <h5 class="my-0 mt-ms-auto d-flex align-items-center">Filters and Search</h5>
        <button class="btn btn-sm btn-danger" @click="handleClear">Clear Filters</button>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <FilterStatus @active="handleFilterStatus" :clear="clear"/>
          </div>
          <div class="col-6">
            <Search @search="handleSearch" :clear="clear"/>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between">
        <h5 class="my-0 d-flex align-items-center">Accounts</h5>
        <!-- <div class="d-flex">
          <h5 class="my-0 d-flex align-items-center mx-2">Filter by roles: </h5>
          <SelectCategory @select="handleFilterCategory" :clear="clear"/>
        </div> -->
      </div>
      <div class="card-body">
        <div class="account-action d-flex justify-content-between">
          <!-- <ChangeMulti @apply="handleChangeMulti"/> -->
          <router-link :to="{ name: 'CreateAccount' }">
            <button class="btn btn-outline-success">+ New account</button>
          </router-link>
        </div>
        <table class="table table-hover table-sm mt-3">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox"
                  name="checkall"
                  @change="handleCheckAll"
                  v-model="checkall"
                >
              </th>
              <th>STT</th>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Decentralization</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="accounts.length">
            <tr v-for="account, index in accounts" :key="account._id">
              <td>
                <input 
                  type="checkbox"
                  name="id"
                  :value="account._id"
                  v-model="checkedItems[index]"
                  @change="handleCheckbox"
                >
              </td>
              <td>{{ index + 1 }}</td>
              <td>
                <img 
                  :src="account.avatar" 
                  :alt="account.fullName"
                  :style="{ 
                    width: '100px', 
                    aspectRatio: '1 / 1' 
                  }"
                >
              </td>
              <td>{{ account.fullName }}</td>
              <td>{{ getRoleName(account) }}</td>
              <td>{{ account.email }}</td>
              <td>
                <button
                  v-if="account.status === 'active'"
                  class="btn btn-sm btn-success"
                  @click="handleChangeStatus($event, account)"
                >
                  Active
                </button>
                <button
                  v-else
                  class="btn btn-sm btn-danger"
                  @click="handleChangeStatus($event, account)"
                >
                  Inactive
                </button>
              </td>
              <td>
                <router-link 
                  :to="{ name: 'ModifyAccount', params: { id: `${account._id}` } }"
                >
                  <button
                    class="btn btn-warning btn-sm"
                  >
                    Modify
                  </button>
                </router-link>
                <button
                  class="btn btn-danger btn-sm ms-1"
                  @click="handleDelete(account._id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td>
                <div class="text-center">
                  No result.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import FilterStatus from '@/components/admin/FilterStatus/FilterStatus.vue'
  import Search from '@/components/admin/Search/Search.vue'
  import SelectCategory from '@/components/admin/SelectCategory/SelectCategory.vue'
  // import ChangeMulti from '@/components/admin/ChangeMulti/ChangeMulti.vue'
  import AccountService from '@/services/admin/account.service'
  import RoleService from '@/services/admin/role.service'
  import Swal from 'sweetalert2'

  export default {
    name: "Accounts",
    components: {
      FilterStatus,
      Search,
      SelectCategory,
      // ChangeMulti,
    },
    data() {
      return {
        accounts: [],
        filter: {},
        clear: false,
        checkall: false,
        checkedItems: [],
        roles: [],
      }
    },
    methods: {
      async getAccounts() {
        this.filter = Object.fromEntries(
          Object.entries(this.filter).filter(([key, value]) => value !== '')
        );
        this.accounts = await AccountService.get({
          params: this.filter
        })
      },
      async getRoles() {
        this.roles = await RoleService.getAll()
      },
      handleFilterStatus(filterStatus) {
        this.filter.status = filterStatus
        this.getAccounts()
      },
      handleFilterCategory(category) {
        this.filter.category = category
        this.getAccounts()
      },
      handleSearch(keyword) {
        this.filter.keyword = keyword
        this.getAccounts()
      },
      handleClear() {
        this.clear = !this.clear
        this.filter = {}
        this.getAccounts()
      },
      async handleChangeStatus(e, account) {
        const changeStatusTo = account.status === 'active' ? 'inactive' : 'active'
        const data = {
          status: changeStatusTo
        }
        await AccountService.changeStatus(account._id, data)
        account.status = changeStatusTo
      },
      handleCheckAll() {  
        this.checkedItems = this.accounts.map(() => this.checkall)
      },
      // async handleChangeMulti(type) {
      //   const checkedIdList = this.checkedItems.map((checked, index) => {
      //     if (checked) {
      //       return this.products[index]._id
      //     }
      //   })
        
      //   if (type !== '') {
      //     const data = {
      //       idList: checkedIdList,
      //       type
      //     }

      //     await ProductService.changeMulti(data);
      //     this.getProducts()
      //   }
      // },
      handleCheckbox() {
  
      },
      getRoleName(account) {
        const role = this.roles.find(role => role._id === account.roleId)
        if (role) return role.title
      },
      async handleDelete(id) {
        try {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
              await AccountService.deleteOne(id)
              this.getAccounts()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
          
        }
        catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getAccounts()
      this.getRoles()
    }
  }
</script>

<style scoped lang="scss">
  .card {
    border: 0;
    // border-radius: 0;
  }
</style>
