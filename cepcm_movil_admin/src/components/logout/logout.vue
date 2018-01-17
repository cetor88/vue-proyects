<template>
  
    <button v-on:click="logOut" v-show="autenticado"> Cerrar sesión
    </button>


</template>

<script type="text/javascript">
import Vue from 'vue'
import {mapState, } from 'vuex'

    export default {
        name:'logout',
        methods: {
            logOut(){
                this.$store.dispatch('cerrarSesion')
            }
            
        },
        computed: mapState(['autenticado', 'token']),
        
    }
</script>


<style scoped>

</style>
