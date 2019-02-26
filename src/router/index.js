import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/Welcome";
import Signup from "@/components/Signup";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/welcome",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/",
      name: "Signup",
      component: Signup
    }
  ]
});
