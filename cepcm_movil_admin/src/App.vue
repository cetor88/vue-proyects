<template>
  <div class="container">
    <menus></menus>
    <router-view> </router-view>
    
      <!--authe></authe-->
      <!--p>
        {{contar}} numero de click´s
      </p-->
      
    <myfooter> Terminos y condiciones</myfooter>
  </div>
</template>

<script>

      import menus from './components/menu/menu.vue'
      import authe from './components/auth/auth.vue'
      import myfooter from './components/footer.vue'
      import Vue from 'vue'
      
      import BootstrapVue from 'bootstrap-vue'

      Vue.use(BootstrapVue);    

      export default{
        components:{menus, authe, myfooter},
        computed:{
          contar(){
            return this.$store.state.cantidad;
            
          }
        }
      }
</script>

<style >
</style>