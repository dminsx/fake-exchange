import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutExchangeView from "@/views/AboutExchangeView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutExchangeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
