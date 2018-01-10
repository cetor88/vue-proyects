<template>
  <div class="container">
    <myHeader></myHeader>
    <menus v-show="userInOut"></menus>
    <myCarrusel v-show="!userInOut"></myCarrusel>
    <router-view> </router-view>
    
    <myfooter> Terminos y condiciones</myfooter>
  </div>
</template>

<script>

      import menus from "./components/menu/menu.vue";
      import myHeader from  "./components/header.vue";
      import myCarrusel from "./components/carrusel.vue";
      import authe from './components/auth/auth.vue'
      import myfooter from './components/footer.vue'
      import Vue from 'vue'
      
      import BootstrapVue from 'bootstrap-vue'

      Vue.use(BootstrapVue);    

      export default{
        components:{menus, myHeader, myCarrusel, authe, myfooter},
        computed:{
          contar(){
            return this.$store.state.cantidad;
            
          },
          userInOut(){
            return this.$store.state.autenticado;
            
          }
        }
      }
</script>

<style >
</style>