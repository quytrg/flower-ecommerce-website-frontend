import ClientLayout from "@/views/client/layouts/default.vue"
import Home from "@/views/client/pages/Home/Home.vue"
import Shop from "@/views/client/pages/Shop/Shop.vue"
import Products from "@/views/client/pages/Products/Products.vue"
import ProductDetails from "@/views/client/pages/ProductDetails/ProductDetails.vue"
import Cart from "@/views/client/pages/Cart/Cart.vue"

const clientRouter = [
  {
    path: "/",
    name: "ClientLayout",
    component: ClientLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: { requireAuth: false }
      },
      {
        path: "categories",
        name: "Shop",
        component: Shop,
        meta: { requireAuth: false }
      },
      {
        path: "categories/:categoryname",
        name: "Products",
        component: Products,
        meta: { requireAuth: false }
      },
      {
        path:"products/:slug",
        name: "ProductDetails",
        component: ProductDetails,
        meta: { requireAuth: false }
      },
      {
        path:"cart",
        name: "Cart",
        component: Cart,
        meta: { requireAuth: false }
      }
    ]
  },
]

export default clientRouter
