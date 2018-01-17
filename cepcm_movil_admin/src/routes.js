import Vue from 'vue';

import VueRouter from 'vue-router';

import home from './components/home/home.vue';
import contacto from './components/contacto/contacto.vue';
import login from "./components/login/login.vue";
import logout from "./components/logout/logout.vue";

import firebase from "firebase";
Vue.use(VueRouter);

var routes = [
  {
    path: '/login',
    component: login,
   
  },
  {
    path: '/singUp',
    component: login,
   
  },
  {
    path: '/home',
    component: home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contacto',
    component: contacto,
    meta: {
      requiresAuth: true
    }
  },
  
]
export const router = new VueRouter({
  routes: routes,
  saveScrollPosition: true,
  history: true
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => {
    return record.meta.requiresAuth
  });
  if (!currentUser && requiresAuth) {
    next('/');
  } else {
    next();
  }
});
