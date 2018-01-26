
<template>
  <v-container  grid-list-md text-xs-center>
    <v-form >

        <v-layout row wrap>
            <v-flex xs12 >
                <v-card class="  accent-4"   >
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <h2>Notificaciones por Persona</h2>
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
        
            <v-flex xs6  offset-xs3>
                <v-flex>
                    <v-text-field label="Titulo" v-model="notificacion.titulo" required >
                    </v-text-field>
                </v-flex>
            </v-flex>
        
            <v-flex xs6 offset-xs3>
                <v-text-field name="contenido" required rows="2" label="Contenido" multi-line maxlength="100" v-model="notificacion.contenido">
                </v-text-field>
            </v-flex>

            <v-flex xs6 offset-xs3>
                <v-flex>
                    <v-card class="  accent-4"  >
                        <v-card-text>Buscar Persona </v-card-text>
                    </v-card>
                    <autocomplete> </autocomplete>
                    <!--v-select label="Buscar alumno" autocomplete 
                        @change='alumnoSeleccionado'
                        :loading="loading" multiple color=" " 
                        required 
                        :items="alumnos" 
                        :rules="[() => alumnosSeleted.length > 0 || 'Elige al menos a un alumno']"
                        :search-input.sync="search" 
                        clearable
                        cache-items
                        
                        
                        light
                        open-on-clear
                        persistent-hint
                        
                        solo 
                        chips
                        deletable-chips
                        no-data-text="No se encontraron resultados"
                        v-model="alumnosSeleted"> </v-select-->
                </v-flex>
                
            </v-flex>

            <v-flex xs6 offset-xs3>
                <v-card class="  accent-4"  >
                        <v-card-text>Selecciona una imagen </v-card-text>
                </v-card>
                <v-radio-group v-model="notificacion.img">
                    <v-card tile flat v-for="item in catImges">
                        <v-avatar :tile="false" class="lighten-4 imagen-avatar"  >
                            <img v-bind:src="'data:image/jpg;base64,'+ item.imagen" alt="avatar" >
                            <v-card class="input-img">
                                <v-radio color=" "  v-bind:value="item.id">
                                </v-radio> 
                            </v-card>
                            
                        </v-avatar>        
                    </v-card>
                </v-radio-group>
                    
            </v-flex>

            <!--v-flex xs12>
                <pre> {{notificacion}}</pre>
            </v-flex-->
        
            <v-flex xs12>
                <v-btn @click="enviarNotificacion"  color=" "  >
                    Enviar
                </v-btn>
            </v-flex>
        </v-layout>
        
    </v-form>
   </v-container>
</template>
<script>
    import persona from "../persona.vue";
    import {mapState, mapGetters} from 'vuex'
    import homeServices from './home.services'   
    import autocomplete from "../autoComplete/autocomplete.vue";
    export default {
    
        components: { 
            persona,autocomplete
        },
        mounted(){
            this.$store.dispatch('validarToken2')
            .then((data)=>{
                this.token = data;
            })
            .then(()=>{
                let params = { id_tipo:1, access_token :this.token };
                homeServices.obtenerImagenes(params)
                .then((data) =>{
                    this.catImges = data.respuesta;
                })
            })
        },
        data() {
            return {
                catImges :[],
                notificacion:{
                    titulo:'',
                    contenido:'',
                    img:'',
                    alumno:[]
                },
                token:'',
                loading: false,
                items: [],                
                dispositivos:[],
                
            }
    
        },
        
        methods:{
            
            enviarNotificacion: function(){
                this.notificacion.alumno = this.alumnosSeleted;
                
            },
            

        },
        computed:
            mapState(['tokn']),
            ...mapGetters(['validarToken']),
    
    };
</script>

<style >
    .imagen-avatar{
        
        cursor:pointer;
        padding: 30px;

    }
    .input-img{
        /*position:absolute;*/
        bottom:0px;
        left:10px;
    }
    .item-title{
        position: absolute;
        left: 20px;
        top: auto;
        vertical-align: middle;
    }
</style>