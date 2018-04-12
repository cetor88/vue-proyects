<template>
    <v-flex>
        <v-card>
            <v-dialog v-model="dialog" max-width="50%">
                <v-card>
                    <v-toolbar :color="propiedades.tipo" dark>
                        <v-toolbar-title>{{propiedades.titulo}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-flex>
                            {{propiedades.contenido}}
                        </v-flex>                       
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="propiedades.tipo" dark @click="cerrar">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-flex>
  
</template>


<script>
    
    export default {
        name:'mensajeDlg',
        props:['propiedades'],
        data:()=> {
            return {
                dialog:true,
                
            }
        },
        methods: {
            cerrar(){
                console.log("cerrar!!");
                this.$emit('cerrarDlg')// llamar al padre para cerrar la modal
            }
            
        },
      
    }
</script>

<style>

</style>
