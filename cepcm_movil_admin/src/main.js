import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import {router} from './routes'
import {store} from './store/store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router: router,
      store: store,
      //render: h => h(App)
      template : '<App/>',
      components : {App}
    })
  }
});
