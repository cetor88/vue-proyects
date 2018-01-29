<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex>
                <v-text-field label="Buscar alumno" v-model="queryString" required   v-on:keyup="search(queryString)">
                </v-text-field>
                <div v-if="alumnos.length" transition="slide-x-transition" class="contentPerson">
                    <v-list slot="activator" class="content-person" two-line >
                        
                        <template v-for="persona  in getAlumnos" >                            
                            <v-list-tile avatar  v-bind:key="persona.text"  @click="personaSeleccionada(persona)">
                            <v-list-tile-avatar>
                                <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true" ></i>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="persona.text"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="persona.value"></v-list-tile-sub-title>
                            </v-list-tile-content>
                            </v-list-tile>
                            <v-divider v-bind:inset="true"></v-divider>
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
                            <h2>Personas seleccionadas</h2>
                        </div>
                    </v-card-text>
                </v-card>                
                <v-list class="contentPerson" v-if="getPersonasSeleccionadas.length" two-line>
                    <template v-for="persona  in getPersonasSeleccionadas">                            
                            <v-list-tile avatar  v-bind:key="persona.text"  class="action persona" >
                            <v-list-tile-avatar>
                                <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true" ></i>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="persona.text + ' - ' + persona.value"> </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                <i class="fa fa-trash-o fa-pull-left fa-border" aria-hidden="true" alt="Eliminar" @click="eliminaDispositivo(persona, personasSeleccionadas, dispositivos)"></i>
                            </v-list-tile-avatar>
                            </v-list-tile>
                            <v-divider v-bind:inset="true"></v-divider>
                        </template>
                </v-list>    
            </v-flex>
        </v-layout>
        <v-progress-circular indeterminate v-bind:size="100" v-bind:width="5" color="red" v-if="loader"></v-progress-circular>
    </v-container>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import homeServices from '../home/home.services'   
    
    export default{
    data () {
        return{
            queryString:'',
            alerta:false,
            msgError:"",
            personasSeleccionadas:[],
            loading:false,
            alumnos: [],
            //dispositivos:[],
        }
    },
    props:['dispositivos'],
    methods: {
        search (val) {
            if(val)
                if(val.length > 3){
                    val && this.querySelections(val)
                }
        },
        querySelections (strFiltro) {
            this.loading = true
            let req = {};
            this.$store.dispatch('validarToken2')
            .then((data)=>{
                this.token = data;
            })
            .then(() =>{
                req = {filtro : strFiltro, access_token : this.token};
                homeServices.obtenerAlumnosPorFiltro(req)
                .then((data) =>{
                    if(data.respuesta != undefined){
                        this.alumnos=[];
                        data.respuesta.forEach((item, key) =>{
                            this.alumnos.push({text: item.nombres +" "+ item.apaterno +" "+ item.amaterno , value: item.id})
                        });
                    }
                    this.loading = false
                })
            })
            .catch(function(err){
                console.log(err);
            })
        },

        personaSeleccionada(persona){
            this.loading = true;
            let req = {};
            if(!this.existeUsuario(persona, this.personasSeleccionadas)){
                this.$store.dispatch('validarToken2')
                .then((data)=>{
                    this.token = data;
                    req = {id: persona.value, access_token: this.token};
                    homeServices.obtenerAlumnosPorId(req)
                    .then((data) =>{
                        if(data.respuesta != undefined){
                            //if(data.respuesta.dispositivo != null){
                            if(data.respuesta != null){
                                //this.dispositivos.push(data.respuesta.dispositivo);
                                this.dispositivos.push(persona);
                                this.personasSeleccionadas.push(persona);
                                this.eliminarPersona(persona, this.alumnos);
                                
                                //this.eliminarPersona(persona, this.dispositivos);
                                this.loading = false;
                            
                            }else{
                               throw  "Lo sentimos, la personada seleccionada no cuenta con disposito.";
                            }

                        }
                    })
                    .catch((error)=>{
                        console.log(error);
                        this.loading = false;
                        this.alerta= true;
                        this.msgError= error;
                        setTimeout(() => {
                                this.alerta= false;
                        }, 2000);
                    })
                })
                .catch((error)=>{
                    console.log(error);
                    this.loading = false;
                    this.alerta= true;
                        setTimeout(() => {
                            this.alerta= false;
                    }, 2000);
                })
                
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
          debugger;
            arreglo.forEach( (element, index) => {
                if (element.value == persona.value){
                     arreglo.splice(index,1 );
                     return;
                }
            });
            
        },
        eliminaDispositivo(persona, arreglo1, arreglo2 ){
          debugger;
            this.eliminarPersona(persona, arreglo1);
            this.eliminarPersona(persona, arreglo2);
           
            
        },
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