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
import Roles from '@/views/admin/pages/Roles/Roles.vue'
import CreateRole from '@/views/admin/pages/CreateRole/CreateRole.vue'
import ModifyRole from '@/views/admin/pages/ModifyRole/ModifyRole.vue'

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
        meta: { requireAuth: true }
      },
      {
        path: "products",
        name: "ProductsAdmin",
        component: ProductsAdmin,
        meta: { requireAuth: true }
      },
      {
        path: "products/create",
        name: "CreateProduct",
        component: CreateProduct,
        meta: { requireAuth: true }
      },
      {
        path: "products/modify/:slug",
        name: "ModifyProduct",
        component: ModifyProduct,
        meta: { requireAuth: true }
      },
      {
        path: "accounts",
        name: "Accounts",
        component: Accounts,
        meta: { requireAuth: true }
      },
      {
        path: "accounts/create",
        name: "CreateAccount",
        component: CreateAccount,
        meta: { requireAuth: true }
      },
      {
        path: "accounts/modify/:id",
        name: "ModifyAccount",
        component: ModifyAccount,
        meta: { requireAuth: true }
      },
      {
        path: "roles",
        name: "Roles",
        component: Roles,
        meta: { requireAuth: true }
      },
      {
        path: "roles/create",
        name: "CreateRole",
        component: CreateRole,
        meta: { requireAuth: true }
      },
      {
        path: "roles/modify/:id",
        name: "ModifyRole",
        component: ModifyRole,
        meta: { requireAuth: true }
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
        meta: { requireAuth: false }
      },
    ]
  }
]

export default adminRouter
