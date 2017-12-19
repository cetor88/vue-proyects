<template></template>

<script>
import Vue from 'vue';

export default {
    name:'logout',
    data(){
		return {
	    	mensaje:'',
		}
    },
    
    created(){       
        let cotininuar = this.$router;
        debugger;
        let control    = this.$store.state;
        this.$store.state.auth.signOut()
        .then(function() {
            console.log("usuario cerro session !!");
            control.autenticado = false;
            control.currentUser = null;
            cotininuar.replace("/");
        }).catch(function(error) {
            console.log("no se pudo cerrar la session !!");
        });
    },
    
}
</script>


<<style scoped>

</style>
