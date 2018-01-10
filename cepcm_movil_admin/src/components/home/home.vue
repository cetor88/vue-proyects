<template>
    <section>    
        <h1> Home</h1>
        <pre>{{tokn}}</pre>
        <button v-on:click="obtenerToken"> Consultar token </button>
        <persona> </persona>
        <div class="container">
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó
    
            una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue
    
            popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
    
        </div>
       
       
    
    </section>
</template>

<script>
    import persona from "../persona.vue";
    //import utilsServices from '../..//utils/services';
    import {mapState, mapGetters} from 'vuex'
       
    export default {
    
        components: {    
            persona
        }, 
        data() {
            return {
                tokenEstatus:null
            };
    
        },
        methods:{
            obtenerToken:function(){
                console.log("refrescaToken");
                var expiro = this.$store.getters.validarToken(new Date().getTime() );
                var tokenRefresh = this.$store.getters.obtenerTokenRefresh;
                //var tokenRefresh = '8aec8bdc-86c1-4a45-97c6-ce5817d76185';
                if(expiro){
                    this.$store.dispatch('refrescaToken', tokenRefresh).then( (response) =>{
                        debugger;
                        if(response == null ){
                            console.log("ocurrio un error al refrescar el token")
                            alert("ocurrio un error!!!.  Se manda a llamar al refresh");
                        //"Ocurrio un error al refrescar el token, desea volver a intentar"
                            this.$store.dispatch('obtenerToken');
                            console.log("obtenerToken");
                        }else{
                            console.log("Token refresh valido");
                        }
                    });
                    //let tokenActual = this.$store.getters. obtenerTokenActual;
                    
                }
                
            },
        },
        computed:
            mapState(['tokn']),
            ...mapGetters(['validarToken']),
    
    };
</script>