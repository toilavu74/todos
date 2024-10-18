import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/AuthStore.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/register/register.vue"
      ),
  },
  {
    path: "/add",
    name: "AddTask",
    component: () =>
      import(/* webpackChunkName: "addtask" */ "../views/todos/add.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-todo/:id",
    name: "Edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/todos/edit.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  //const { currentUser, fetchCurrentUser } = authStore;
  //console.log(currentUser);
  await authStore.fetchCurrentUser();
  if (to.meta.requiresAuth && !authStore.currentUser) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
