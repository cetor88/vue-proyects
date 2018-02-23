import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import {router} from './routes'
import {store} from './store/store'
import firebase from 'firebase'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.pink.accent4,
    secondary: colors.black,
    accent: colors.indigo.base
  },
  options: {
    themeVariations: ['primary', 'secondary']
  }
})

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
