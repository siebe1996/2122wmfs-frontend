import { createRouter, createWebHistory } from "vue-router";
import GotchaLogin from "../views/LoginView.vue";
import store from "../store";
import home from "../store/home";
import info from "../store/info";

const router = createRouter({
  modules: {
    home: home,
    info: info,
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: true, },
      beforeEnter: async (to, from, next) => {
        console.warn("fetching currentGames beforeEnter");
        await store.dispatch("home/fetchCurrentGames");

        // todo handle error!

        next();
      },
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../views/InfoView.vue"),
      meta: { requiresAuth: true, title: "Info | Gotcha" },
      beforeEnter: async (to, from, next) => {
        console.warn("fetching infoGames beforeEnter");
        await store.dispatch("info/fetchInfoGames");

        // todo handle error!

        next();
      },
    },
    {
      path: "/login",
      name: "login",
      component: GotchaLogin,
      meta: { title: "Login | Gotcha" },
    },
    {
      path: "/logout",
      name: "logout",
      component: GotchaLogin,
      meta: { title: "Logout | Gotcha" },
      beforeEnter: (to, from, next) => {
        store.dispatch("auth/logout");
        router.push("/login");
        next();
      },
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: () => import("../views/DetailView.vue"),
      meta: { requiresAuth: true, title: "Detail | Gotcha" },
      beforeEnter: async (to, from, next) => {
        next();
      },
    },
    // cannot visit if not admin
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: { requiresAuth: true, role: "admin", title: "Admin | Gotcha" },
      beforeEnter: async (to, from, next) => {
        await store.dispatch("info/fetchInfoGames");
        // todo handle error!

        next();
      },
    },
    {
      path: "/admin/detail/:id",
      name: "admindetail",
      component: () => import("../views/AdminDetailView.vue"),
      meta: {
        requiresAuth: true,
        role: "admin",
        title: "Admin Details | Gotcha",
      },
      beforeEnter: async (to, from, next) => {
        next();
      },
    },
    /*{
      path: "/user",
      name: "user",
      component: () => import("../components/User.vue"),
      beforeEnter: async (to, from, next) => {
        //await store.dispatch('detail/fetchGame', {route.params.id});
        // todo handle error!

        next();
      }
    },*/
    {
      path: "/404",
      name: "404",
      component: () => import("../views/404View.vue"),
      meta: { title: "404 | Gotcha" },
      beforeEnter: async (to, from, next) => {
        next();
      },
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("../views/MessageView.vue"),
      meta: { requiresAuth: true, title: "Message | Gotcha" },
      beforeEnter: async (to, from, next) => {
        console.warn("fetching Messages beforeEnter");
        await store.dispatch("message/fetchMessages");

        // todo handle error!

        next();
      },
    },
    {
      path: "/messages/send",
      name: "sendMessage",
      component: () => import("../views/SendMessageView.vue"),
      meta: { requiresAuth: true, title: "Send a message | Gotcha" },
      beforeEnter: async (to, from, next) => {
        console.warn("fetching users beforeEnter");
        await store.dispatch("message/fetchAllUsers");
        next();
      },
    },
    {
      path: "/:catchAll(.*)",
      meta: { title: "404 redirect | Gotcha" },
      redirect: { path: "../404" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.warn("router beforeEach");

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.getters["auth/authenticated"]
  ) {
    next({ path: "/login" });
    return;
  }
  if (
    to.matched.some((record) => record.meta.role === "admin") &&
    !store.getters["auth/isAdmin"]
  ) {
    next({ path: "/login" });
    return;
  }
  next();
});

let initial = true;

router.afterEach((to) => {
  document.title = to.meta.title;
  if (initial) {
    initial = false;
    return;
  }

  setTimeout(() => {
    let mainDiv = document.querySelector("main div");
    if (!mainDiv) {
      return;
    }

    mainDiv.tabIndex = -1;
    mainDiv.focus();
  });
});
export default router;
