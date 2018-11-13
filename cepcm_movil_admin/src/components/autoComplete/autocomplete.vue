<template>
    <!--v-container grid-list-md text-xs-center-->
    <div>
        <v-layout row wrap>
            <v-flex>
                <v-text-field label="Buscar alumno" v-model="queryString" required > <!--v-on:keyup="search(queryString)"-->
                </v-text-field>
                <strong 
                v-bind:style="{ color: isCalculating && !searchQueryIsDirty?'blue': searchQueryIsDirty && !isCalculating ?'orange' : !searchQueryIsDirty && !isCalculating?'green':''}" >
                {{ searchIndicator }}
                </strong>

                <div v-if="alumnos.length" transition="slide-x-transition" class="contentPerson">
                    <v-list slot="activator" class="content-person" two-line >
                        
                        <template v-for="persona  in getAlumnos" >                            
                            <v-list-tile avatar  v-bind:key="persona.value"  @click="(persona.dispositivo != 0 ? personaSeleccionada(persona) :'')"
                                :disabled="persona.dispositivo == 0">

                                <v-list-tile-avatar>
                                    <i color="pink"  class="fa fa-user fa-pull-left fa-border" aria-hidden="true" ></i>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="persona.text"></v-list-tile-title>
                                    <v-list-tile-action-text>Matricula: {{ persona.matricula }}</v-list-tile-action-text>

                                    
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-sub-title ></v-list-tile-sub-title>
                                    <v-icon color="pink  lighten-1" v-if="persona.dispositivo != 0" >phonelink_ring</v-icon>
                                    <v-icon color="grey darken-2" v-else >star_border</v-icon>
                                </v-list-tile-action>
                                
                            </v-list-tile>
                            <v-divider></v-divider>
                        </template>
                    </v-list>
                </div>
            </v-flex>
        </v-layout>
        <v-layout  row wrap>
            <v-flex>
                <v-alert outline color="error" icon="warning" :value="alerta">
                    {{msgError}}
                </v-alert>
            </v-flex>
        </v-layout> 
        <v-layout row wrap>
            <v-flex>
                <v-card class="accent-4" >
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <h2>Alumnos a los que se les enviará la notificación</h2>
                        </div>
                    </v-card-text>
                </v-card>                
                <v-list class="contentPerson" v-if="getPersonasSeleccionadas.length" two-line >
                    <template v-for="persona  in getPersonasSeleccionadas">                            
                            <v-list-tile avatar  :key="persona.text"  class="action persona" >
                            <v-list-tile-avatar>
                                <i class="fa fa-user fa-pull-left fa-border" aria-hidden="true" ></i>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="persona.text"> </v-list-tile-title>
                                <v-list-tile-sub-title v-text="persona.matricula"> </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                <i class="fa fa-trash fa-pull-left fa-border" aria-hidden="true" alt="Eliminar" @click="eliminaDispositivo(persona, personasSeleccionadas, dispositivos)"></i>
                            </v-list-tile-avatar>
                            </v-list-tile>
                            
                        </template>
                </v-list>    
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
            <mensajeDlg  @cerrarDlg="cerrarMensajeDlg" v-if="getMensajesProps.modelo" :propiedades="getMensajesProps" ></mensajeDlg>
            </v-flex>
        </v-layout>
        <v-progress-circular indeterminate v-bind:size="100" v-bind:width="5" color="red" v-if="loader"></v-progress-circular>
        </div>
    <!--/v-container-->
</template>

<script>
    import {mapState, mapGetters} from 'vuex'

    import homeServices from '../home/home.services'   
    
    import mensajeDlg from '../dialogo/mensajesDlg';

    import _ from 'lodash'

    export default{
    components: { mensajeDlg },
    props:{
        dispositivos:{},
        personasSeleccionadas:{
            required: true
        },
        limpiarComp:{}
    },
    data () {
        return{
            valid: false,

            queryString:'',
            searchQueryIsDirty: false,
            isCalculating: false,

            alerta:false,
            msgError:"",
            loading:false,
            alumnos: [],
            personasRules:[(v) => !!v || 'Elige al menos una persona'],
            dialogo:{
                titulo:'Resultado de la operación',
                contenido:'',
                tipo:'',
                modelo:false
            },
        }
    },

     watch: {
        queryString: function () {
            this.searchQueryIsDirty = true
            
            this.debounceInput(this.queryString)
        }
  },

    methods: {
        cerrarMensajeDlg(){
            this.dialogo.contenido = "";
            this.dialogo.tipo = "";
            this.dialogo.modelo = !this.dialogo.modelo;
            this.$store.dispatch("setLoading", false);
        },
        debounceInput: _.debounce(function (e) {
            if(e.length >= 4){
                this.isCalculating = true
                this.querySelections(e)
                
            }else{
                this.alumnos=[]
                this.isCalculating = false
                this.searchQueryIsDirty=false
                this.isCalculating=false;
            }
            }, 1000)
        ,querySelections (strFiltro) {
            this.$store.dispatch("setLoading", true);
            let req = {};
            this.$store.dispatch('validarToken2')
            .then((data)=>{
                this.token = data;
            })
            .then(() =>{
                req = {filtro : strFiltro, access_token : this.token};
                homeServices.obtenerAlumnosPorFiltro(req).then((data) =>{
                    if(data.respuesta != undefined){
                        this.alumnos=[];
                        data.respuesta.forEach((item, key) =>{
                            this.alumnos.push({text: item.nombres +" "+ item.apaterno +" "+ item.amaterno , value: item.id, dispositivo: item.idDispositivoUsuario, matricula: item.matricula})
                        });
                        this.isCalculating = false
                        this.searchQueryIsDirty = false
                    }
                    //this.loading = false
                    this.$store.dispatch("setLoading", false);
                }).catch(error => {
                    console.log("Resultado de la operacion... " + error);
                    this.$store.dispatch("setLoading", false);
                    this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                    this.dialogo.tipo =  "red lighten-1";
                    this.dialogo.modelo = !this.dialogo.modelo;
                    
                    this.isCalculating = false
                    this.searchQueryIsDirty = false
                })
            }).catch(error => {
                console.log("Resultado de la operacion... " + error);
                this.$store.dispatch("setLoading", false);
                this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                this.dialogo.tipo =  "red lighten-1";
                this.dialogo.modelo = !this.dialogo.modelo;
                
                this.isCalculating = false
                this.searchQueryIsDirty = false
            })
        },

        personaSeleccionada(persona){
            this.loading = true;
            let req = {};
            if(!this.existeUsuario(persona, this.personasSeleccionadas)){
                this.dispositivos.push(persona.dispositivo);
                this.personasSeleccionadas.push(persona);
                this.eliminarPersona(persona, this.alumnos);
                this.loading = false;
                this.alumnos=[];
                this.queryString=' ';
            }else{
                console.log("Persona ya seleccionada");
                this.loading = false;
            }
            
        },
        existeUsuario(persona, array){
            let bander= false;
            array.forEach(item => {
                if(persona.value == item.value){
                    bander = true;
                }
            });
            return bander;
        },
      eliminarPersona(persona, arreglo){
            arreglo.forEach( (element, index) => {
                if (element.value == persona.value){
                     arreglo.splice(index,1 );
                     return;
                }
            });
            
        },
        eliminaDispositivo(persona, arreglo1, arreglo2 ){
            this.eliminarPersona(persona, arreglo1);
            this.eliminarPersona(persona, arreglo2);
           
            
        },
        limpiar(){
            console.log("limpiar *")
            this.alumnos=[];
            this.queryString='';
        }
    },
    created: function() {
        console.log("created functtion")
        this.$parent.$on('limpiarChild', this.limpiar);
    },
    computed:{
        loader(){
          return this.loading;
        },
        getAlumnos(){
            return this.alumnos;
        },
        getPersonasSeleccionadas(){
            return this.personasSeleccionadas;
        },
        getMensajesProps(){
            return this.dialogo;
        },
        searchIndicator() {
            if (this.isCalculating) {
                return '⟳ Calculando resultados'
            } else if (this.searchQueryIsDirty) {
                return '... '
            }
            if(this.alumnos.length == 0){
                return '';
            }
             else {
                return '✓ Resultados encontrados'
            }
        },
        limpiarComponente(){
            this.limpiarComp
        }
    }
    
}
</script>

<style >
    .action.persona{
        cursor:pointer;

    }
    i.fa.fa-trash-o.fa-pull-left.fa-border{
        color: red; 
        font-size: 20px;
        font-weight: bold;
    }
   
    
    .contentPerson {
        height: 150px;
        border: solid 0.08em lightcoral;
        overflow-x: scroll;
        overflow-x: hidden;
    }
    /* SCROLL APP*/
    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: lightcoral; 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }
    
    ::-webkit-scrollbar-thumb:window-inactive {
        background: lightcoral; 
    }


    .contentPerson::-webkit-scrollbar {
        width: 12px;
    }

    .contentPerson::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
            border-radius: 10px;
    }

    .contentPerson::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }

    

</style>