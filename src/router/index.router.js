import { createWebHistory, createRouter } from "vue-router"
import clientRouter from "./client.router";
import adminRouter from "./admin.router";
import { useAuthStore } from "@/stores/admin/auth.store";
import authService from "@/services/admin/auth.service";
import systemConfig from '@/config/system/index.js'

const routes = [
  ...clientRouter,
  ...adminRouter
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  // remove old tinymce
  tinymce.remove();
  // history point scroll animation
  window.scrollTo(0, 0);

  // require auth
  try {
    if ('requireAuth' in to.meta && to.meta.requireAuth) {
      // admin
      if (to.path.indexOf(systemConfig.adminPrefix) >= 0) {
        const authStore = useAuthStore()

        await authService.getAuth()
        .then(res => {
          authStore.update(res)
        })
        .catch(err => {
          authStore.update(null)
        })
        
        if (authStore.isAuth) {
          return true
        }
        else {
          return { name: 'AdminLogin' }
        }
      }
      // client
      return true
    }
    else {
      return true
    }
  }
  catch (err) {
    console.log(err)
    return { name: 'AdminLogin' }
  }
});

export default router
