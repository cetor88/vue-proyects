<template>
  <v-container  grid-list-md text-xs-center>
    <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card color="primary" dark>
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <span>Envio de notificaciones a alumnos</span>
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
        
            <v-flex xs6  offset-xs3>
                <v-flex>
                    <v-text-field label="Título de la notificación" v-model="notificacion.titulo" :rules="tituloRules" :counter="50" required >
                    </v-text-field>
                </v-flex>
            </v-flex>
        
            <v-flex xs6 offset-xs3>
                <v-text-field required rows="2" label="Contenido" multi-line :rules="contentRules" :counter="100"  v-model="notificacion.contenido">
                </v-text-field>
            </v-flex>

            <v-flex xs6 offset-xs3>
                <v-flex>
                    <autocomplete v-model="notificacion.dispositivos" :dispositivos="dispositivos" 
                    :personasSeleccionadas="personasSeleccionadas" :limpiarComp="limpiarComp"> </autocomplete>
                </v-flex>
                <v-flex>
                    <span v-if="dispositivos.length == 0"  style="color:red;">Elige al menos un alumno</span>
                </v-flex>
                
            </v-flex>

            <v-flex xs6 offset-xs3>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>Selecciona una imagen para la notificación</v-toolbar-title>
                    </v-toolbar>
        
                    <v-list>
                        <v-list-group v-for="item in catImges" v-model="item.active" :key="item.descripcion" >

                            <v-list-tile slot="item">
                                <v-list-tile-action>
                                    <v-icon v-bind:style="{ color: item.active ?'gold':''}">{{ item.imagen }}</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.descripcion }}</v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                        <v-icon>far fa-angle-down</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                
                            <v-list-tile v-for="subItem in item.imagenes" :class="{active : notificacion.img==subItem.id, primary_accent1 : notificacion.img==subItem.id, }"
                                :key="subItem.id" @click="notificacion.img=subItem.id">
                                <v-list-tile-content>
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
            <v-flex xs12>
                <v-btn @click="limpiarNotificacion"  color="primary" dark >
                    Limpiar
                </v-btn>
                <v-btn @click="enviarNotificacion" color="primary" dark >
                    Enviar
                </v-btn>
            </v-flex>
            
        </v-layout>
        
    </v-form>
    <v-layout>
        <v-flex>
            <v-card>
                <v-dialog v-model="dialogInfo.modelo" max-width="500px">
                    <v-card>
                        <v-toolbar :color="dialogInfo.tipo" dark>
                            <v-toolbar-title>{{dialogInfo.titulo}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text center>
                            <p class="text-md-center"> 
                                <span  :color="dialogInfo.tipo" >
                                    {{dialogInfo.contenido}}
                                </span>
                                </p> 
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :color="dialogInfo.tipo" dark @click.native="reiniciarModal">Aceptar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
                <v-flex xs12>
                <mensajeDlg  @cerrarDlg="cerrarMensajeDlg" v-if="getMensajesProps.modelo" :propiedades="getMensajesProps" ></mensajeDlg>
                </v-flex>
            </v-layout>

   </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import homeServices from "./home.services";
import autocomplete from "../autoComplete/autocomplete.vue";
import mensajeDlg from '../dialogo/mensajesDlg';
export default {
    components: {autocomplete, mensajeDlg },
    mounted() {
        console.log("home")
        this.$store.dispatch("setLoading", true);
        this.$store.dispatch("validarToken2").then(data => {
            this.token = data;
        }).then(() => {
            let params = {access_token: this.token };
            homeServices.obtenerImagenes(params).then(data => {
                this.catImges = data.respuesta;

                //this.$store.dispatch("setLoading", false);
            }).catch(error => {
                    console.log("Resultado de la operacion... " + error);
                    //this.$store.dispatch("setLoading", false);
                    this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                    this.dialogo.tipo =  "red lighten-1";
                    this.dialogo.modelo = !this.dialogo.modelo;            
            })
        }).catch(error => {
            console.log("Resultado de la operacion... " + error);
            //this.$store.dispatch("setLoading", false);
            this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
            this.dialogo.tipo =  "red lighten-1";
            this.dialogo.modelo = !this.dialogo.modelo;            
        }).finally(() => {
            
            this.$store.dispatch("setLoading", false);
        });
    },
    data() {
        return {
            dialogInfo:{
                titulo:'Resultado de la operación',
                contenido:'',
                tipo:'',
                modelo:false
            },
            dialogo:{
                    titulo:'Resultado de la operación',
                    contenido:'',
                    tipo:'',
                    modelo:false
            },
            catImges: [],
            notificacion: {
                titulo: "",
                contenido: "",
                img: null,
                dispositivos: []
            },
            token: "",
            loading: false,
            items: [],
            dispositivos: [],
            personasSeleccionadas:[],
            valid: true,
            tituloRules: [
                v => !!v || "Título es requerido",
                v => (v && v.length <= 50) || "El título debe ser menor a 50 caracteres"
            ],
            contentRules: [
                v => !!v || "Contenido es requerido",
                v =>
                (v && v.length <= 100) ||
                "El contenido debe ser menor a 100 caracteres"
            ],
            imagesRules: [v => !!v || "Selecciona una imagen"],
            
            alertImagen:false,
            limpiarComp:false,
        }
    },
    methods: {
        reiniciarModal(){
            this.dialogInfo.modelo = false;
            this.dialogInfo.titulo = 'Resultado de la operación';
            this.dialogInfo.contenido ='',
            this.dialogInfo.tipo ='',
            this.dialogInfo.modelo =false
        },
        cerrarMensajeDlg(){        
            this.dialogo.contenido = "";
            this.dialogo.tipo = "";
            this.dialogo.modelo = !this.dialogo.modelo;
            this.$store.dispatch("setLoading", false);
        }, 
        enviarNotificacion() {
            
            if (this.$refs.form.validate() && this.dispositivos.length > 0 && this.notificacion.img !=null ) {
                this.$store.dispatch("setLoading", true);
                this.$store.dispatch("validarToken2").then(data => {
                this.token = data;
            })
            .then(() => {
                let req = {
                    titulo: this.notificacion.titulo,
                    contenido: this.notificacion.contenido,
                    id_imagen: this.notificacion.img,
                    listaDispositivos: this.dispositivos
                };
                
                homeServices.guardarNotificacionADispositivos(req, this.token).then((data) => {
                        console.log("Proceso correcto!!" + data);
                        if(data.respuesta[0].idEstatus == 1){
                            this.limpiarNotificacion();
                            this.dialogInfo.modelo = !this.dialogInfo.modelo;
                            this.dialogInfo.tipo = 'green lighten-1'
                            this.dialogInfo.contenido = 'Se han enviado las notificaciones exitosamente';
                            this.$store.dispatch("setLoading", false);
                        }else{
                            this.dialogInfo.modelo = !this.dialogInfo.modelo;
                            this.dialogInfo.tipo = 'oranche lighten-1'
                            this.dialogInfo.contenido = 'Ocurrió un error inesperado.';
                            this.$store.dispatch("setLoading", false);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.$store.dispatch("setLoading", false);
                    });
            })
            
            }else{
                this.alertImagen=this.notificacion.img == null ? true: false;

                this.dialogInfo.modelo = !this.dialogInfo.modelo;
                this.dialogInfo.tipo = 'red lighten-1'
                this.dialogInfo.titulo = 'Error'
                this.dialogInfo.contenido = 'Favor de especificar todos los valores requeridos.';
            }

        },
        limpiarNotificacion(){
            this.notificacion.titulo='';
            this.notificacion.contenido='';
            this.notificacion.dispositivos=[];
            this.dispositivos = [];
            this.notificacion.img = null;
            this.personasSeleccionadas = [];
            this.limpiarComp=true;
            this.catImges.filter((item)=>{
                item.active = false;
            })

        }
    },
    computed:{
        //mapState(["tokn"]),
        //...mapGetters(["validarToken"]),
        getMensajesProps(){
            return this.dialogo;
        },
    }
            
                
}
</script>

<style >
.imagen-avatar {
  cursor: pointer;
  padding: 30px;
}
.input-img {
  /*position:absolute;*/
  bottom: 0px;
  left: 10px;
}
.item-title {
  position: absolute;
  left: 20px;
  top: auto;
  vertical-align: middle;
}
li.active:after {
        content: "✓";
        position: absolute;
        top: 10px;
        right: 25px;
        font-size: 1.5em;
        color: #c51162 !important
    }
/*stylos modal*/
</style>