<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex>
                <v-text-field label="Buscar alumno" v-model="queryString" required   v-on:keyup="search(queryString)">
                </v-text-field>
                <div v-if="alumnos.length" transition="slide-x-transition" class="contentPerson">
                    <v-list slot="activator" class="content-person">
                        <div class="action persona" v-for="persona in alumnos">
                            <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true" >
                            <v-list-tile-title v-text="persona.text" @click="personaSeleccionada(persona)"></v-list-tile-title>
                            </i>
                        </div>                        
                    </v-list>
                </div>
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
                <v-list class="contentPerson" v-if="personasSeleccionadas.length">
                    <v-list-tile v-for="persona in personasSeleccionadas">
                        <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true"></i>
                        <v-list-tile-title v-text="persona.text + ' ' + persona.value"> </v-list-tile-title>
                        <i class="fa fa-trash-o fa-pull-left fa-border" aria-hidden="true" alt="Eliminar" @click="eliminarPersona(persona, personasSeleccionadas)"></i>
                    </v-list-tile>
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
            items: [],
            personas:[],
            personasSeleccionadas:[],
            loading:false,
            alumnos: [],
        }
    },
    //watch: {
       
    //},
    methods: {
        search (val) {
            //debugger
            if(val)

                if(val.length > 3){
                    val && this.querySelections(val)
                }else{
                    this.items=[];
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

        alumnoSeleccionado: function(event){
                let idAlumno = event[event.length-1] ;
                let req = {id: idAlumno, access_token: this.token};

                this.$store.dispatch('validarToken2')
                .then((data)=>{
                    this.token = data;
                }).then(()=>{
                    homeServices.obtenerAlumnosPorId(req)
                    .then((data) =>{
                        console.log(data)
                        if(data.respuesta != undefined){
                            this.dispositivos = data.respuesta;
                        }
                    })
                })
        },
        personaSeleccionada(persona){
                if(!this.existeUsuario(persona, this.personasSeleccionadas)){
                    this.personasSeleccionadas.push(persona);
                    this.eliminarPersona(persona, this.alumnos);
                }
        },
        existeUsuario(persona, array){
            let salida=false;
            array.forEach(item => {
                if(persona.value != item.value){
                    salida = false;
                }else{
                    salida = true;
                    console.log("usuario ya ha sido agregado anterriomente");
                }
            });
            return salida;
        },
        eliminarPersona(persona, arreglo){
                let idDelete = undefined;
                arreglo.forEach( (element, index) => {
                    if (element.value == persona.value){
                        idDelete = index;
                    }
                });
                if(idDelete!=undefined){
                    arreglo.pop(idDelete);
                }
        }
  },
  computed:{
      loader(){
          return this.loading;
      }
  }
    
}
</script>

<style >
    .action.persona{
        cursor:pointer;

    }
    .action.persona .fa-border {
        border: solid 0.08em #e61313;
        margin:10px;
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