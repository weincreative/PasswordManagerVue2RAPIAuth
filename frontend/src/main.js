import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import Landing from "./components/LandingScreen";
import Passwordmanager from "./components/PasswordmanagerScreen";
import Register from "./components/RegisterScreen";
import Login from "./components/LoginScreen";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Landing },
  { path: "/passwordmanager", component: Passwordmanager },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  el: "#app",
  router,
  render: (h) => {
    return h(App);
  },
});
