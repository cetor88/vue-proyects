import Vue from 'vue';

import home from './components/home/home.vue';
import contacto from './components/contacto/contacto.vue';
import login from "./components/login/login.vue";


export const routes = [
    {
      path:'/home',
      component:home
    },
     {
      path:'/contacto',
      component:contacto
    },
    {
      path:'/',
      component:login
    }
]
