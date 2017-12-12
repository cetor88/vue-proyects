<template>
  <section>
    <menus></menus>
      <!--authe></authe-->
      <!--p>
        {{contar}} numero de click´s
      </p-->
      <router-view> </router-view>
    <myfooter> Terminos y condiciones</myfooter>
  </section>
</template>

<script>

      import menus from './components/menu/menu.vue'
      import authe from './components/auth/auth.vue'
      import myfooter from './components/footer.vue'
      export default{
        components:{menus, authe, myfooter},
        computed:{
          contar(){
            return this.$store.state.cantidad;
            
          }
        }
      }
</script>

<style>
</style>
