<template>
    <v-flex>
        <v-card>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-toolbar :color="propiedades.tipo" dark>
                        <v-toolbar-title>{{propiedades.titulo}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    
                    <v-card-text>
                        <v-form ref="form" lazy-validation>
                            <v-flex>
                                <v-text-field label="Título de la notificación" :counter="50" required v-model="titulo" :rules="titRules" >
                                    </v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field required rows="2" label="Contenido" multi-line :counter="100" v-model="contenido" :rules="conRules" >
                                </v-text-field>
                            </v-flex>
                            <!--v-flex>
                                {{propiedades.contenido}}
                            </v-flex-->
                            <v-flex>
                                
                                    <v-card>
                                        <v-toolbar color="primary" dark>
                                            <v-toolbar-title class="text-xs-center">Selecciona una imagen para la notificación</v-toolbar-title>
                                            <v-spacer></v-spacer>
                                        </v-toolbar>
                                        <v-list>
                                            <v-list-group v-for="item in imgs" v-model="item.active" :key="item.descripcion" > <!-- :value="item.id" v-bind:key="item.id" -->
                                                <v-list-tile slot="item" >
                                                    <v-list-tile-action>
                                                        <v-icon v-bind:style="{ color: item.active ?'gold':''}">{{ item.imagen }}</v-icon>
                                                    </v-list-tile-action>

                                                    <v-list-tile-content>
                                                        <v-list-tile-title>{{item.descripcion}}</v-list-tile-title>
                                                    </v-list-tile-content>

                                                    <v-list-tile-action>
                                                        <v-icon>far fa-angle-down</v-icon>
                                                    </v-list-tile-action>
                                                </v-list-tile>

                                                <v-list-tile v-for="subItem in item.imagenes" :class="{active : img==subItem.id}"
                                                    :key="subItem.id" @click="img=subItem.id">
                                                    <v-list-tile-content >
                                                        <v-avatar :tile="false" class="lighten-4 imagen-avatar">
                                                            <img :src="'data:image/jpg;base64,'+ subItem.imagen" alt="avatar" />
                                                        </v-avatar>
                                                    </v-list-tile-content>
                                                            
                                                </v-list-tile>
                                            </v-list-group>
                                        </v-list>
                                    </v-card>
                                    <v-alert type="error" outline v-model="alertImagen" dismissible transition="scale-transition">
                                        Imagen requerida.
                                    </v-alert>
                            </v-flex>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="propiedades.tipo" dark @click="enviarNotificacion">Enviar notificación</v-btn>
                        <v-btn :color="propiedades.tipo" dark @click="cerrar">Cancelar</v-btn>
                    </v-card-actions>
                    
                </v-card>
            </v-dialog>
            
        </v-card>
    </v-flex>
  
</template>


<script>
    import { mapState, mapGetters } from "vuex";
    import homeServices from "../home/home.services";
    //import mensajeDlg from './mensajesDlg';
    

    export default {
        name:'myDialog',
        props:['propiedades', 'imgs', 'smart'],
        //components: { mensajeDlg },
        data:()=> {
            return {
                dialog:true,
                titulo: "",
                contenido: "",
                img: null,
                dispositivos: [],
                
                titRules: [
                    v => !!v || "Título es requerido",
                    v => (v && v.length <= 50) || "El título debe ser menor a 50 caracteres"
                ],
                conRules: [
                    v => !!v || "Contenido es requerido",
                    v =>
                    (v && v.length <= 100) ||
                    "El contenido debe ser menor a 100 caracteres"
                ],
                imagesRules: [v => !!v || "Selecciona una imagen"],
                token:undefined,
                
                alertImagen:false,
                limpiarComp:false,
               
            }
        },
        methods: {
            
            cerrar(){
                console.log("cerrar!!");
                this.$store.dispatch("setLoading", true);
                this.$emit('cerrarModal')// llamar al padre para cerrar la modal
            },
            enviarNotificacion() {
                debugger;
                if (this.$refs.form.validate() && this.dispositivos.length > 0 && this.img != null) {
                    this.$store.dispatch("setLoading", true);
                    this.$store
                    .dispatch("validarToken2")
                    .then(data => {
                        this.token = data;
                    })
                    .then(() => {
                        let req = {
                            titulo: this.titulo,
                            contenido: this.contenido,
                            id_imagen: this.img,
                            listaDispositivos: this.dispositivos
                        };
                        homeServices.guardarNotificacionADispositivos(req, this.token).then((data) => {
                                if(data.respuesta[0].idEstatus == -1){
                                    console.log("Proceso correcto!!" + data);
                                    this.$emit('notificacionEnviada')// llamar al padre para cerrar la modal
                                }else{
                                    this.$emit('notificacionErrada')// llamar al padre para cerrar la modal    
                                }
                                
                            })
                            .catch(error => {
                                console.log(error);
                                this.$emit('notificacionErrada')// llamar al padre para cerrar la modal
                            });
                    })
                    
                }else{
                    this.alertImagen=this.img == null ? true: false;
                }
            },
            
        },
        mounted() {
            console.log("catalogos imgs-> " + this.imgs);
            this.dispositivos = this.smart;
        },
        computed: {
            getPorps() {
            return this.dlg;

            },
        }

      
    }
</script>

<style>

li.active{
    border-radius: 5px;
    background-color: #e0e0e0;
}
</style>
