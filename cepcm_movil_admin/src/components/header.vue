<template>
    <section>    
        <b-row class="spacio">
            
        </b-row>
        <b-row class="header">
            <b-col class="logo">logo</b-col>
            <b-col class="institucion">
                <div>
                    <b-btn  v-b-modal.modalLogin variant="outline-success" >Iniciar sesión</b-btn>
                </div>
            </b-col>
            
        </b-row>
        <b-row class="spacio">
            <b-modal id="modalLogin" hide-footer title="Login" v-on:cerrar="hideModal">
                <login ></login>
            </b-container>
            </b-modal>
        </b-row>
    
    </section>
</template>

<script>

import login from "./login/login.vue";
    import Vue from 'vue';
    export default {
    
        name: "myHeader",
        components:{login},
        methods:{
            hideModal(demo){
                this.$ref.modalLogin.hide();

            }
        },
    
    };
</script>

<style scoped>
.spacio{
    padding-top: 5px;
    background:#FFF;
}
.header{
    position: relative;
    height: 100px;
    background: lightgray;
}
.header .logo{
    border: solid 1px lightblue;
    border-style: dashed;
    border-radius: 10%;
}

</style>
