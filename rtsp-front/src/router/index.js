import Vue from "vue";
import VueRouter from "vue-router";
import Records from "../components/Records";
import Sock from "../components/Sock";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Sock",
    component: Sock,
  },
  {
    path: "/records",
    name: "Records",
    component: Records,
  },
];

const router = new VueRouter({
  mode: "history",
  // base: '/',
  routes,
});

export default router;
