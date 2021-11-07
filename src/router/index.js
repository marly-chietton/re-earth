import BasePage from "@/components/BasePage.vue";
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "BasePage",
      component: BasePage,
    },
    // otherwise redirect to home
    { path: "*", redirect: "/" },
  ],
});

export default router;

