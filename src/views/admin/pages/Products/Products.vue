<template>
  <div class="product fluid-container mx-5">
    <div class="product-title my-4 d-flex align-items-center">
      <h4 class="gray-text">eCommerce</h4>
      <h5 class="mx-1">/</h5> 
      <h4 class="primary-text">Product List</h4>
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
        <h5 class="my-0 d-flex align-items-center">Products</h5>
        <div class="d-flex">
          <SelectCategory
            v-model:selectedCategory="filter.category" 
          />
        </div>
      </div>
      <div class="card-body">
        <div class="product-action d-flex justify-content-between">
          <ChangeMulti @apply="handleChangeMulti"/>
          <router-link :to="{ name: 'CreateProduct' }">
            <button class="btn btn-main btn-primary">+ New Product</button>
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
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="products.length">
            <tr v-for="product, index in products" :key="product._id">
              <td>
                <input 
                  class="form-check-input"
                  type="checkbox"
                  name="id"
                  :value="product._id"
                  v-model="checkedItems[index]"
                >
              </td>
              <td>{{ index + 1 }}</td>
              <td>
                <div class="thumbnail">
                  <img 
                    :src="product.thumbnail" 
                    :alt="product.title"
                  >
                </div>
                
              </td>
              <td>{{ product.title }}</td>
              <td>${{ product.price }}</td>
              <td>
                <input 
                  type="number"
                  name="position"
                  v-model="product.position"
                  :style="{ 
                    width: '60px', 
                    padding: '3px', 
                  }"
                >
              </td>
              <td>
                <button
                  v-if="product.status === 'active'"
                  class="btn btn-sm btn-success btn-active"
                  @click="handleChangeStatus(product)"
                >
                  Active
                </button>
                <button
                  v-else
                  class="btn btn-sm btn-danger btn-inactive"
                  @click="handleChangeStatus(product)"
                >
                  Inactive
                </button>
              </td>
              <td>
                <div class="d-flex icon">
                  <router-link 
                    :to="{ name: 'ModifyProduct', params: { slug: `${product.slug}`} }"
                    class="d-flex align-items-center"
                  >
                    <i class="fa-regular fa-pen-to-square fa-lg fa-fw"></i>
                  </router-link>
                  <div
                    class="ms-2"
                    @click="handleDelete(product._id)"
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
</template>

<script>
  import FilterStatus from '@/components/admin/FilterStatus/FilterStatus.vue'
  import Search from '@/components/admin/Search/Search.vue'
  import ProductService from '@/services/admin/product.service.js'
  import SelectCategory from '@/components/admin/SelectCategory/SelectCategory.vue'
  import ChangeMulti from '@/components/admin/ChangeMulti/ChangeMulti.vue'
  import confirmDialogHelper from '@/helpers/admin/dialogs/confirm.helper.js'
  import successDialogHelper from '@/helpers/admin/dialogs/success.helper.js'

  export default {
    name: "Product",
    components: {
      FilterStatus,
      Search,
      SelectCategory,
      ChangeMulti,
    },
    data() {
      return {
        products: [],
        filter: {
          status: '',
          keyword: '',
          category: '',
        },
        checkall: false,
        checkedItems: [],
        page: 1,
        totalPages: 0
      }
    },
    methods: {
      async getProducts() {
        const filter = Object.fromEntries(
          Object.entries(this.filter).filter(([key, value]) => value !== '')
        );
        const data = await ProductService.get({
          params: {
            ...filter,
            page: this.page
          }
        })
        this.products = data.products
        this.totalPages = data.totalPages
      },
      handleClear() {
        this.filter = {
          status: '',
          keyword: '',
          category: '',
        }
      },
      async handleChangeStatus(product) {
        const changeStatusTo = product.status === 'active' ? 'inactive' : 'active'
        const formData = new FormData()
        formData.append('status', changeStatusTo)
        await ProductService.update(product._id, formData)
        product.status = changeStatusTo
      },
      handleCheckAll() {  
        this.checkedItems = this.products.map(() => this.checkall)
      },
      async handleChangeMulti(type) {
        const data = {
          ids: [],
          positions: [],
          type
        }
        this.checkedItems.map((checked, index) => {
          if (checked) {
            data.ids.push(this.products[index]._id)
            data.positions.push(this.products[index].position) 
          }
        })
        
        if (type !== '') {
          if (type !== 'position') {
            delete data.positions
          }
          // confirm to delete
          if (type === 'delete') {
            const result = await confirmDialogHelper()
            if (result.isConfirmed) {
              await ProductService.changeMulti(data);
              successDialogHelper()
              this.getProducts()
            }
          }
          else {
            await ProductService.changeMulti(data);
            successDialogHelper(
              "Changed!",
              "Your product information has been changed"
            )
            this.getProducts()
          }
        }

        // reset checkbox
        this.checkall = false
        this.checkedItems = this.products.map(() => false)
      },

      async handleDelete(id) {
        try {
          confirmDialogHelper().then(async (result) => {
            if (result.isConfirmed) {
              await ProductService.deleteOne(id)
              this.getProducts()
              successDialogHelper()
            }
          });
        }
        catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getProducts()
    },
    watch: {
      filter: {
        handler() {
          this.getProducts()
          this.page = 1
        },
        deep: true
      },
      page() {
        this.getProducts()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
