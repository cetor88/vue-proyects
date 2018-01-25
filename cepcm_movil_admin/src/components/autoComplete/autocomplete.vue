<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs6 offset-xs3>
                <v-text-field label="Buscar alumno" v-model="queryString" 
                    required  v-on:keyup="buscarResultados">
                </v-text-field>
                <div v-if="personas.length" transition="slide-x-transition" class="contentPerson">
                    <v-list slot="activator">
                        <div class="action persona" v-for="persona in personas">
                            <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true" >
                            <v-list-tile-title v-text="persona.text" @click="personaSeleccionada(persona)"></v-list-tile-title>
                            </i>
                        </div>                        
                    </v-list>
                </div>
            </v-flex>
            <v-flex xs6 offset-xs3>
                <v-card class="accent-4" >
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <h2>Personas seleccionadas</h2>
                        </div>
                    </v-card-text>
                </v-card>                
                <v-list>
                    <v-list-tile v-for="persona in personasSeleccionadas">
                        <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true"></i>
                        <v-list-tile-title v-text="persona.text + ' ' + persona.value"> </v-list-tile-title>
                        <i class="fa fa-trash-o fa-pull-left fa-border" aria-hidden="true" alt="Eliminar" @click="eliminarPersona(persona)"></i>
                    </v-list-tile>
                </v-list>    
            </v-flex>
        </v-layout>
        <v-progress-circular indeterminate v-bind:size="100" v-bind:width="5" color="red" v-if="loader"></v-progress-circular>
    </v-container>
</template>

<script>
    export default{

    data () {
        return{
            queryString:'',
            items: [{text:"Carlos Pedro Juan", value:1},{text:"Juan Carlos Diego", value:2},{text:"Diego Alberto", value:3},{text:"Julian David Juan", value:4},{text:"Jaime Carlos Eduardo", value:5},
            {text:"Juan Carlos", value:6},{text:"Carlos Alberto", value:7},{text:"Julian David Carlos", value:8},{text:"Jaime Eduardo Lima", value:9}],
            personas:[],
            personasSeleccionadas:[],
            loading:false,
        }
    },
    methods: {
    buscarResultados(){
        
        if(this.queryString.length > 3){
            this.loading=true;
            setTimeout(( )=>{
                this.personas = this.items.filter( e =>{
                    this.loading=false;
                    return (e.text || '').toLowerCase().indexOf((this.queryString || '').toLowerCase()) > -1
                })
            },1000)
        }else{
            this.personas=[]
        }
        
    },
    personaSeleccionada(persona){
          console.log("persona seleccionada " + persona);
            if(!this.existeUsuario(persona)){
                this.personasSeleccionadas.push(persona);
            }else{
                console.log("persona existente")
            
            }
    },
    existeUsuario(persona){
        let salida=false;
        this.personasSeleccionadas.forEach(item => {
            if(persona.value != item.value){
                salida = false;
            }else{
                salida = true;
                console.log("usuario ya ha sido agregado anterriomente");
            }
        });
        return salida;
    },
    eliminarPersona(persona){
        let idDelete = undefined;
        this.personasSeleccionadas.forEach( (element, index) => {
            if (element.value == persona.value){
                idDelete = index;
            }
        });
        if(idDelete!=undefined){
            this.personasSeleccionadas.pop(idDelete);
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
    
</style>