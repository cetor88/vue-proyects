<template>
    <section>    
        <b-row class="spacio">
            
        </b-row>
        <b-row class="header">
            <b-col class="logo">
                
            </b-col>
            <b-col class="institucion">
                <div>
                    <login></login>
                </div>
            </b-col>
            
        </b-row>
        
    
    </section>
</template>

<script>

import login from "./login/login.vue";
    import Vue from 'vue';
    
    
    export default {
        name: "myHeader",
        components:{login},
    };
</script>

<style scoped>

.spacio{
    padding-top: 5px;
    background:#FFF;
}
.header{
    border: solid 1px #822246;
    background: #F0F0F0;
    border-radius: 10%;
    height: 200px;
}
.logo{
    background-image: url('/src/assets/images/s5_logo.png');

}
</style>
