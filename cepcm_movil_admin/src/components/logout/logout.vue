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
                let cotininuar = this.$router;
                let control    = this.$store.state;
                this.$store.state.auth.signOut()
                .then(() =>{
                    console.log("usuario cerro session !!");
                    control.autenticado = false;
                    this.$store.getters.cerrarSession;
                    control.currentUser = null;
                    cotininuar.replace("/");
                }).catch((error)=> {
                    console.log("no se pudo cerrar la session !!");
                    this.$store.getters.cerrarSession;
                });
            }
            
        },
        computed: mapState(['autenticado', 'token']),
        
    }
</script>


<style scoped>

</style>
