<template>
  <div class="role fluid-container mx-5" v-if="currentAccount?.permissions.includes('read_roles')">
    <div class="is-fetching" v-if="!isFetching">
      <div class="role-title my-4 d-flex align-items-center">
        <h4 class="gray-text">Role Settings</h4>
        <h5 class="mx-1">/</h5> 
        <h4 class="primary-text">Roles</h4>
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
              <FilterStatus 
                v-model:activedStatus="filter.status"
              />
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
          <h5 class="my-2 d-flex align-items-center">Roles</h5>
        </div>
        <div class="card-body">
          <div class="roles-action d-flex justify-content-between">
            <!-- <ChangeMulti @apply="handleChangeMulti"/> -->
            <div></div>
            <router-link :to="{ name: 'CreateRole' }">
              <button class="btn btn-main btn-primary">+ New Role</button>
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
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="roles.length">
              <tr v-for="role, index in roles" :key="role._id">
                <td>
                  <input 
                    class="form-check-input"
                    type="checkbox"
                    name="id"
                    :value="role._id"
                    v-model="checkedItems[index]"
                  >
                </td>
                <td>{{ index + 1 }}</td>
                <td>{{ role.title }}</td>
                <td>{{ role.description }}</td>
                <td>
                  <button
                    v-if="role.status === 'active'"
                    class="btn btn-sm btn-success btn-active"
                    @click="handleChangeStatus(role)"
                  >
                    Active
                  </button>
                  <button
                    v-else
                    class="btn btn-sm btn-danger btn-inactive"
                    @click="handleChangeStatus(role)"
                  >
                    Inactive
                  </button>
                </td>
                <td>
                  <div class="d-flex icon">
                    <!-- <router-link 
                      :to="{ name: 'ModifyProduct', params: { slug: `${product.slug}`} }"
                      class="d-flex align-items-center"
                    >
                      <i class="fa-regular fa-pen-to-square fa-lg fa-fw"></i>
                    </router-link> -->
                    <div
                      class="ms-2"
                      @click="handleDelete(role._id)"
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
  <div class="product fluid-container mx-5" v-else>
    <Unauthorized />
  </div>
</template>

<script>
  import FilterStatus from '@/components/admin/FilterStatus/FilterStatus.vue'
  import Search from '@/components/admin/Search/Search.vue'
  import ChangeMulti from '@/components/admin/ChangeMulti/ChangeMulti.vue'
  import confirmDialogHelper from '@/helpers/admin/dialogs/confirm.helper.js'
  import successDialogHelper from '@/helpers/admin/dialogs/success.helper.js'
  import { mapState } from 'pinia'
  import { useAuthStore } from '@/stores/admin/auth.store'
  import Unauthorized from '@/components/admin/Unauthorized/Unauthorized.vue'
  import roleService from '@/services/admin/role.service'

  export default {
    name: "Roles",
    components: {
      FilterStatus,
      Search,
      ChangeMulti,
      Unauthorized,
    },
    data() {
      return {
        roles: [],
        filter: {
          status: '',
          keyword: '',
          roleId: '',
        },
        checkall: false,
        checkedItems: [],
        page: 1,
        totalPages: 0,
        isFetching: true
      }
    },
    methods: {
      async getRoles() {
        const filter = Object.fromEntries(
          Object.entries(this.filter).filter(([key, value]) => (value !== '' || value !== null))
        );
        const data = await roleService.getAll({
          params: {
            ...filter,
            page: this.page
          }
        })
        this.roles = data.roles
        this.totalPages = data.totalPages,
        this.isFetching = false
      },
      handleClear() {
        this.filter = {
          status: '',
          keyword: '',
          roleId: '',
        }
      },
      // async handleChangeStatus(product) {
      //   const changeStatusTo = product.status === 'active' ? 'inactive' : 'active'
      //   const formData = new FormData()
      //   formData.append('status', changeStatusTo)
      //   await ProductService.update(product._id, formData)
      //   product.status = changeStatusTo
      // },

      // handleCheckAll() {  
      //   this.checkedItems = this.products.map(() => this.checkall)
      // },
      // async handleChangeMulti(type) {
      //   const data = {
      //     ids: [],
      //     positions: [],
      //     type
      //   }
      //   this.checkedItems.map((checked, index) => {
      //     if (checked) {
      //       data.ids.push(this.products[index]._id)
      //       data.positions.push(this.products[index].position) 
      //     }
      //   })
        
      //   if (type !== '') {
      //     if (type !== 'position') {
      //       delete data.positions
      //     }
      //     // confirm to delete
      //     if (type === 'delete') {
      //       const result = await confirmDialogHelper()
      //       if (result.isConfirmed) {
      //         await ProductService.changeMulti(data);
      //         successDialogHelper()
      //         this.getProducts()
      //       }
      //     }
      //     else {
      //       await ProductService.changeMulti(data);
      //       successDialogHelper(
      //         "Changed!",
      //         "Your product information has been changed"
      //       )
      //       this.getProducts()
      //     }
      //   }

      //   // reset checkbox
      //   this.checkall = false
      //   this.checkedItems = this.products.map(() => false)
      // },

      // async handleDelete(id) {
      //   try {
      //     confirmDialogHelper().then(async (result) => {
      //       if (result.isConfirmed) {
      //         await ProductService.deleteOne(id)
      //         this.getProducts()
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
      this.getRoles()
    },
    watch: {
      filter: {
        handler() {
          this.getRoles()
          this.page = 1
        },
        deep: true
      },
      page() {
        this.getRoles()
      }
    },
    computed: {
      ...mapState(useAuthStore, ['currentAccount'])
    }
  }
</script>

<style scoped lang="scss">
</style>
