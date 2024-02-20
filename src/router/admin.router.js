import systemConfig from '@/config/system/index.js'
import AdminLayout from '@/views/admin/layouts/default.vue'
import ProductsAdmin from '@/views/admin/pages/Products/Products.vue'
import Dashboard from '@/views/admin/pages/Dashboard/Dashboard.vue'
import CreateProduct from '@/views/admin/pages/CreateProduct/CreateProduct.vue'
import ModifyProduct from '@/views/admin/pages/ModifyProduct/ModifyProduct.vue'
import Accounts from '@/views/admin/pages/Accounts/Accounts.vue'
import CreateAccount from '@/views/admin/pages/CreateAccount/CreateAccount.vue'
import ModifyAccount from '@/views/admin/pages/ModifyAccount/ModifyAccount.vue'
import AdminAuthLayout from '@/views/admin/layouts/auth.vue'
import AdminLogin from '@/views/admin/pages/Auth/Login.vue'

const adminRouter = [
  {
    path: `/${systemConfig.adminPrefix}`,
    name: "AdminLayout",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "products",
        name: "ProductsAdmin",
        component: ProductsAdmin,
      },
      {
        path: "products/create",
        name: "CreateProduct",
        component: CreateProduct,
      },
      {
        path: "products/modify/:slug",
        name: "ModifyProduct",
        component: ModifyProduct
      },
      {
        path: "accounts",
        name: "Accounts",
        component: Accounts
      },
      {
        path: "accounts/create",
        name: "CreateAccount",
        component: CreateAccount
      },
      {
        path: "accounts/modify/:id",
        name: "ModifyAccount",
        component: ModifyAccount
      },
    ]
  },
  {
    path: `/${systemConfig.adminPrefix}/auth`,
    name: "AdminAuthLayout",
    component: AdminAuthLayout,
    children: [
      {
        path: "login",
        name: "AdminLogin",
        component: AdminLogin,
      },
    ]
  }
]

export default adminRouter
