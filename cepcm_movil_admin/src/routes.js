import Vue from 'vue';

import home from './components/home/home.vue';
import contacto from './components/contacto/contacto.vue';
import login from "./components/login/login.vue";


export const routes = [
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
      path:'/',
      component:login
    }
]/*
routes.beforeEach( (to, from, next) =>{
  let currentUser = this.$store.state.auth.currentUser;
  let requiredAuth = to.matched.some(record => record.meta.requiresAuth);
  debugger;
  if(requiresAuth && !currentUser) 
    next('login')
    else if(!requiresAuth && currentUser)
      next('home')
  else 
    next();
});*/