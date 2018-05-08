<template>
    <v-form ref="formModule" lazy-validation>
        <v-flex>
            <v-card>
                <v-dialog v-model="dialog" max-width="50%">
                    <v-card>
                        <v-toolbar :color="propiedades.tipo" dark>
                            <v-toolbar-title>{{propiedades.titulo}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-alert :color="propiedades.tipo" :value="true" outline icon="check_circle" >
                                <h3> {{propiedades.contenido}} </h3>
                            </v-alert>
                        </v-card-text>
                        <v-card-text>
                            <v-layout row wrap v-if="propiedades.bloqueo">
                                <v-flex xs12>
                                    <v-text-field :rules="msgRules" v-model="mensajeFb"
                                        label="Mensaje" :counter="50" :color="propiedades.tipo"></v-text-field>
                                </v-flex>
                                </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn v-if="propiedades.bloqueo" :color="propiedades.tipo" dark @click="bloquear">Bloquear</v-btn>
                            <v-btn v-else dark :color="propiedades.tipo" @click="desbloquear">Desbloquear</v-btn>
                            <v-btn :color="propiedades.tipo" dark @click="cerrar">Cancelar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-flex>
    </v-form>
  
</template>


<script>
    import notificacionServices from "../home/notificacion.grupo.adeudo.services";    

    export default {
        name:'adminModulesFirebase',
        props:['propiedades'],
        data:()=> {
            return {
                dialog:true,
                msgRules: [
                    v => !!v || "Mensaje es requerido",
                    v => (v && v.length <= 50) || "El mensaje debe ser menor a 50 caracteres"
                ],
                mensajeFb:"",

            }
        },
        methods: {
            cerrar(){
                console.log("cerrar!!");
                this.$emit('cerrarModal')// llamar al padre para cerrar la modal
            },
            bloquear(){
                console.log("Bloquear modulo");
                if (this.$refs.formModule.validate() ) {
                    console.log("formulario válido");
                    //notificacionServices.actualizarModuloFirebase(this.mensajeFb, this.getProps.modulo, this.getProps.bloqueo, this.getProps.uid, this.getProps.token, this.getProps.item, this.getProps.dispositivo)
                    notificacionServices.actualizarModuloFirebase(this.mensajeFb, this.getProps)
                    .then((ressponse)=>{
                        console.log("Termine de escribir en firebase!!");
                        this.$emit('succesModal', )// llamar al padre para cerrar la modal
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else{
                    console.log("formulario no válido")
                }
            },
            desbloquear(){
                console.log("Desbloquear modulo");
                //notificacionServices.actualizarModuloFirebase('', this.getProps.modulo, this.getProps.bloqueo, this.getProps.uid, this.getProps.token, this.getProps.item, this.getProps.dispositivo)
                notificacionServices.actualizarModuloFirebase('', this.getProps)
                    .then((ressponse)=>{
                        console.log("Termine de escribir en firebase!!");
                        this.$emit('succesModal', )// llamar al padre para cerrar la modal
                    }).catch((err)=>{
                        console.log(err);
                    })
            },
            
        },
        computed: {
            getProps(){
                return this.propiedades;
            }
        },
      
    }
</script>

<style>

</style>
