import Vue from 'vue';

import VueRouter from 'vue-router';
import {store}  from './store/store'

import home from './components/home/home.vue';
import contacto from './components/contacto/contacto.vue';
import login from "./components/login/login.vue";
import logout from "./components/logout/logout.vue";

Vue.use(VueRouter);

var  routes = [
    {
      path:'/home',
      component:home,
      meta:{
        requiresAuth:true
      }
    },
     {
      path:'/contacto',
      component:contacto,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/logout',
      component:logout
    }
]
export const router = new VueRouter({
  routes:routes
});

router.beforeEach((to, from, next) => {
  debugger;
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.autenticado) {
    next({ path: '/', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});