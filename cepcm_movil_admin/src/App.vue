<template>
  <div class="container">
    
    <router-view> </router-view>
    
      <!--authe></authe-->
      <!--p>
        {{contar}} numero de click´s
      </p-->
      
    <myfooter> Terminos y condiciones</myfooter>
  </div>
</template>

<script>

      
      import authe from './components/auth/auth.vue'
      import myfooter from './components/footer.vue'
      import Vue from 'vue'
      
      import BootstrapVue from 'bootstrap-vue'

      Vue.use(BootstrapVue);    

      export default{
        components:{authe, myfooter},
        computed:{
          contar(){
            return this.$store.state.cantidad;
            
          }
        }
      }
</script>

<style >
</style>