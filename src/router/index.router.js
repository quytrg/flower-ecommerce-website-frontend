import { createWebHistory, createRouter } from "vue-router"
import clientRouter from "./client.router";
import adminRouter from "./admin.router";

const routes = [
  ...clientRouter,
  ...adminRouter
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  tinymce.remove();
  window.scrollTo(0, 0);
  next();
});

export default router
