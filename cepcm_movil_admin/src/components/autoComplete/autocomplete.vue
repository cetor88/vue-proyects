<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs6 >
                <v-text-field label="Buscar alumno" v-model="queryString" 
                    required  v-on:keyup="buscarResultados">
                </v-text-field>
                <div v-if="personas.length" transition="slide-x-transition">
                    
                        <v-list slot="activator">
                            <v-list-tile v-for="persona in personas" >
                                <div clas="alumno">
                                    <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true" >
                                    <v-list-tile-title v-text="persona.text" @click="personaSeleccionada(persona)"></v-list-tile-title>
                                    </i>
                                </div>
                            </v-list-tile>
                        </v-list>
                    
                </div>
            </v-flex>
            <v-flex xs6>
                <v-card class="pink accent-4" dark >
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <h2>Personas seleccionadas</h2>
                        </div>
                    </v-card-text>
                </v-card>
                
                        <v-list>
                            <v-list-tile v-for="persona in personasSeleccionadas" >
                                <i class="fa fa-user-o fa-pull-left fa-border" aria-hidden="true"></i>
                                <v-list-tile-title v-text="persona.text + ' ' + persona.value"> </v-list-tile-title>
                                <i class="fa fa-trash-o fa-pull-left fa-border" aria-hidden="true" alt="Eliminar" @click="eliminarPersona(persona)"></i>
                            </v-list-tile>
                        </v-list>
                
            </v-flex>
        </v-layout>
        
    </v-container>
</template>

<script>
    export default{

    data () {
        return{
            queryString:'',
            items: [{text:"Pedro Juan", value:1},{text:"Juan Diego", value:2},{text:"Diego Alberto", value:3},{text:"Julian David", value:4},{text:"Jaime Eduardo", value:5}],
            personas:[],
            personasSeleccionadas:[],
        }
  },
  methods: {
      buscarResultados(){
        //return new Promise((resolve) =>{   
        if(this.queryString.length > 3){

            setTimeout(( )=>{
                this.personas = this.items.filter( e =>{
                    return (e.text || '').toLowerCase().indexOf((this.queryString || '').toLowerCase()) > -1
                })
            },1000)
        }else{
            this.personas=[]
        }


            
            //resolve(this.personas);
        //})
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
    
}
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
    .alumno{
        cursor:pointer;

    }
</style>