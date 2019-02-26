// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import * as firebase from "firebase";
import router from "./router";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate, {
  events: "change|blur"
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAvBG64ttGbPBCajr_lA4m6DERfq8gfugA",
      authDomain: "signup-page-72909.firebaseapp.com",
      databaseURL: "https://signup-page-72909.firebaseio.com",
      projectId: "signup-page-72909",
      storageBucket: "signup-page-72909.appspot.com"
    });
  }
});
