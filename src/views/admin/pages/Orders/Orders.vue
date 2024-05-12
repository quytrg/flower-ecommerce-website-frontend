<template>
  <div class="orders fluid-container mx-5">
    <div class="is-fetching" v-if="!isFetching">
      <div class="orders-title my-4 d-flex align-items-center">
        <h4 class="gray-text">eCommerce</h4>
        <h5 class="mx-1">/</h5> 
        <h4 class="primary-text">Orders</h4>
      </div>

      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <h5 class="my-0 mt-ms-auto d-flex align-items-center">Filters</h5>
          <div @click="handleClear" class="icon">
            <i class="fa-solid fa-filter-circle-xmark fa-lg"></i>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <!-- <FilterStatus 
                v-model:activedStatus="filter.status"
              /> -->
            </div>
            <div class="col-6">
              <Search 
                v-model:keyword="filter.keyword"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <h5 class="my-2 d-flex align-items-center">Orders</h5>
          <!-- <v-row justify="end" v-if="roles.length">
            <v-col cols="3">
              <Select v-model:selectedValue="filter.roleId" :items="roles" label="Roles"/>
            </v-col>
          </v-row> -->
        </div>
        <div class="card-body">
          <div class="account-action d-flex justify-content-between">
            <!-- <ChangeMulti @apply="handleChangeMulti"/> -->
            <div></div>
            <router-link :to="{ name: 'CreateAccount' }">
              <!-- <button class="btn btn-main btn-primary">+ New Account</button> -->
            </router-link>
          </div>
          <table class="table table-sm mt-3">
            <thead>
              <tr>
                <th>
                  <input 
                    class="form-check-input" 
                    type="checkbox"
                    name="checkall"
                    @change="handleCheckAll"
                    v-model="checkall"
                  >
                </th>
                <th>STT</th>
                <th>Order ID</th>
                <th>Customers</th>
                <th>Date</th>
                <th>Status</th>
                <th>Method</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="orders.length">
              <tr v-for="order, index in orders" :key="order.orderId">
                <td>
                  <input 
                    class="form-check-input" 
                    type="checkbox"
                    name="id"
                    :value="order.orderId"
                    v-model="checkedItems[index]"
                  >
                </td>
                <td>{{ index + 1 }}</td>
                <td>#{{ order.orderId }}</td>
                <td> 
                  <v-row class="my-3">
                    <v-col align-self="center" cols="2">
                      <v-avatar image="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="></v-avatar>
                    </v-col>
                    <v-col align-self="center" cols="8" >
                      <div>{{ order.fullName }}</div>
                      <div>{{ order.email }}</div>
                    </v-col>
                    
                  </v-row>
                </td>
                <td>{{ getHumanDate(order.createdAt)}}</td>
                <td>
                  <v-chip
                    class="ma-2"
                    color="cyan"
                    label
                  >
                    {{ order.status }}
                  </v-chip>
                  
                </td>
                <td>
                  <!-- <button
                    v-if="account.status === 'active'"
                    class="btn btn-sm btn-success btn-active"
                    @click="handleChangeStatus(account)"
                  >
                    Active
                  </button>
                  <button
                    v-else
                    class="btn btn-sm btn-danger btn-inactive"
                    @click="handleChangeStatus(account)"
                  >
                    Inactive
                  </button> -->
                  {{ order.method }}
                </td>
                <td>
                  <div class="d-flex icon">
                    <router-link 
                      :to="{ name: 'ModifyAccount', params: { id: `${sds}` } }"
                    >
                      <i class="fa-regular fa-pen-to-square fa-lg fa-fw"></i>
                    </router-link>
                    <div
                      class="ms-2"
                      @click="handleDelete()"
                    >
                      <i class="fa-regular fa-trash-can fa-lg fa-fw"></i>
                    </div>
                  </div>
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
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="8">
                  <v-container class="max-width p-0">
                    <v-pagination
                      v-model="page"
                      :length="totalPages"
                      :total-visible="6"
                    ></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>
    </div>

    <div class="is-fetching" v-else>
      <v-row>
        <v-col cols="6">
          <v-skeleton-loader
            color="grey-lighten-5"
            class="my-2"
            max-width="400"
            type="heading"
          ></v-skeleton-loader>
        </v-col>
      </v-row>

      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <v-row>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="my-0"
                max-width="120"
                type="subtitle"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="ms-auto my-0"
                max-width="120"
                type="subtitle"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </div>
        <div class="card-body">
          <v-row>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="my-0"
                max-width="300"
                type="heading"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="ms-auto my-0"
                max-width="400"
                type="heading"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <v-row>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="my-0"
                max-width="120"
                type="subtitle"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="ms-auto my-0"
                max-width="120"
                type="subtitle"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </div>
        <div class="card-body">
          <v-row>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="my-0"
                max-width="300"
                type="heading"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="6" class="py-1">
              <v-skeleton-loader
                class="ms-auto my-0"
                max-width="400"
                type="heading"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <table class="table table-sm mt-3">
            <thead>
              <tr>
                <th colspan="12">
                  <v-skeleton-loader
                    class="my-0"
                    type="table-row"
                  ></v-skeleton-loader>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="12">
                  <v-skeleton-loader
                    class="my-0"
                    type="table-row-divider@6"
                  ></v-skeleton-loader>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="8" class="p-0">
                  <v-container class="max-width p-0">
                    <v-skeleton-loader
                      class="mx-auto"
                      max-width="300"
                      type="heading"
                    ></v-skeleton-loader>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="orders fluid-container mx-5" v-else>
    <Unauthorized />
  </div> -->
</template>

<script>
  import FilterStatus from '@/components/admin/FilterStatus/FilterStatus.vue'
  import Search from '@/components/admin/Search/Search.vue'
  // import SelectCategory from '@/components/admin/SelectCategory/SelectCategory.vue'
  // import ChangeMulti from '@/components/admin/ChangeMulti/ChangeMulti.vue'
  import AccountService from '@/services/admin/account.service'
  import orderService from '@/services/admin/order.service'
  // import RoleService from '@/services/admin/role.service'
  import confirmDialogHelper from '@/helpers/admin/dialogs/confirm.helper.js'
  import successDialogHelper from '@/helpers/admin/dialogs/success.helper.js'
  import { mapState } from 'pinia'
  import { useAuthStore } from '@/stores/admin/auth.store'
  // import Unauthorized from '@/components/admin/Unauthorized/Unauthorized.vue'
  // import Select from '@/components/admin/Select/Select.vue'
  import moment from 'moment'

  export default {
    name: "Accounts",
    components: {
      // FilterStatus,
      Search,
      // SelectCategory,
      // ChangeMulti,
      // Unauthorized,
      // Select
    },
    data() {
      return {
        // accounts: [],
        orders: [],
        // roles: [],
        filter: {
          // status: '',
          keyword: '',
          // roleId: '',
        },
        checkall: false,
        checkedItems: [],
        page: 1,
        totalPages: 0,
        isFetching: true
      }
    },
    methods: {
      async getOrders() {
        try {
          const filter = Object.fromEntries(
            Object.entries(this.filter).filter(([key, value]) => (value !== '' && value !== null))
          );
          const data = await orderService.get({
            params: {
              ...filter,
              page: this.page
            }
          })
          this.orders = data.orders
          this.totalPages = data.totalPages
          this.isFetching = false
          console.log(this.orders)
        }
        catch (err) {
          console.log(err)
        }
      },
      getHumanDate(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      },
      handleClear() {
        this.filter = {
          // status: '',
          keyword: '',
          // roleId: '',
        }
      },
      // async handleChangeStatus(account) {
      //   const changeStatusTo = account.status === 'active' ? 'inactive' : 'active'
      //   const formData = new FormData()
      //   formData.append('status', changeStatusTo)
      //   await AccountService.update(account._id, formData)
      //   account.status = changeStatusTo
      // },
      // async handleDelete(id) {
      //   try{
      //     confirmDialogHelper().then(async (result) => {
      //       if (result.isConfirmed) {
      //         await AccountService.deleteOne(id)
      //         this.getAccounts()
      //         successDialogHelper()
      //       }
      //     });
      //   }
      //   catch (err) {
      //     console.log(err)
      //   }
      // },
    },
    created() {
      this.getOrders()
    },
    watch: {
      filter: {
        handler() {
          this.getOrders()
          this.page = 1
        },
        deep: true
      },
      page() {
        this.getOrders()
      }
    },
    computed: {
      // ...mapState(useAuthStore, ['currentAccount'])
    }
  }
</script>

<style scoped lang="scss">
</style>
