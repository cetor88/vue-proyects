<template>
    <div>    
        
                <login></login>
                <logout></logout>
        
    </div>
</template>

<script>

import login from "./login/login.vue";
import logout from "./logout/logout.vue";
import Vue from 'vue';
    
    
    export default {
        name: "myHeader",
        components:{login, logout},
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
    height: 200px;
    background-color:lightcoral;
}
.logo{
    background-image: url('/src/assets/images/s5_logo.png');
    background-repeat:no-repeat;
}
</style>
