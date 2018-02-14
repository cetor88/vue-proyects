
<template>
  <v-container  grid-list-md text-xs-center>
    <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card class=" pink accent-4"  dark>
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <h2>Envio de notificaciones a alumnos</h2>
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
        
            <v-flex xs6  offset-xs3>
                <v-flex>
                    <v-text-field label="Titulo de la notificación" v-model="notificacion.titulo" :rules="tituloRules" :counter="50" required >
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
                    :personasSeleccionadas="personasSeleccionadas"> </autocomplete>
                </v-flex>
                <v-flex>
                    <span v-if="dispositivos.length == 0"  style="color:red;">Elige al menos un alumno</span>
                </v-flex>
                
            </v-flex>

            <v-flex xs6 offset-xs3>
                <v-radio-group v-model="notificacion.img"  :rules="[v => !!v || 'Selecciona una imagen']">
                            <v-card>
                                <v-toolbar color="pink" dark>
                                    <v-toolbar-title class="text-xs-center">Imagen para la notificación:</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                <v-list>
                                    <v-list-group v-for="item in catImges" :value="item.id" v-bind:key="item.id">
                                        <v-list-tile slot="item" @click="">
                                            <v-list-tile-action>
                                                <v-icon>{{ item.imagen }}</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>{{item.descripcion}}</v-list-tile-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-icon>keyboard_arrow_down</v-icon>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        <v-list-tile v-for="subItem in item.imagenes" :class="{active : notificacion.img==subItem.id}" v-bind:key="subItem.id" @click="notificacion.img=subItem.id">
                                            <v-list-tile-content >
                                                <v-avatar :tile="false" class="lighten-4 imagen-avatar">
                                                    <img v-bind:src="'data:image/jpg;base64,'+ subItem.imagen" alt="avatar" />
                                                </v-avatar>
                                            </v-list-tile-content>
                                            
                                        </v-list-tile>
                                    </v-list-group>
                                </v-list>
                            </v-card>
                        </v-radio-group>
                    
            </v-flex>
            <v-flex xs12>
                <pre>{{notificacion}} </pre>
            </v-flex>
            <v-flex xs12>
                <v-btn @click="limpiarNotificacion"  class="pink" dark >
                    Limpiar
                </v-btn>
                <v-btn @click="enviarNotificacion" class="pink" dark >
                    Enviar
                </v-btn>
            </v-flex>
            
        </v-layout>
        
    </v-form>
    <v-layout>
        <v-flex>
            <v-card>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-toolbar color="green" dark>
                            <v-toolbar-title>Resultado de la operación</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            Se han enviado las notificaciones exitosamente
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green lighten-1" dark @click.native="dialog = false">Aceptar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-flex>
    </v-layout>

   </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import homeServices from "./home.services";
import autocomplete from "../autoComplete/autocomplete.vue";

export default {
  components: {
    autocomplete
  },
  mounted() {
    this.$store
      .dispatch("validarToken2")
      .then(data => {
        this.token = data;
      })
      .then(() => {
        let params = {access_token: this.token };
        homeServices.obtenerImagenes(params).then(data => {
          this.catImges = data.respuesta;
        });
      });
  },
  data() {
    return {
        dialog:false,
        catImges: [],
        notificacion: {
            titulo: "",
            contenido: "",
            img: "",
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
        imagesRules: [v => !!v || "Selecciona una imagen"]
    };
  },

  methods: {
    enviarNotificacion() {
      if (this.$refs.form.validate() && this.dispositivos.length > 0) {
        this.$store
        .dispatch("validarToken2")
        .then(data => {
            this.token = data;
        })
        .then(() => {
            let req = {
              titulo: this.notificacion.titulo,
              contenido: this.notificacion.contenido,
              id_imagen: this.notificacion.img,
              listaDispositivos: this.dispositivos
            };
            debugger;
            homeServices
                .guardarNotificacionADispositivos(req, this.token)
                .then((data) => {
                    console.log("Proceso correcto!!" + data);
                })
                .then(()=>{
                    this.limpiarNotificacion();
                    this.dialog = !this.dialog;
                })
                .catch(error => {
                    console.log(error);
                });
        })
        
      }
    },
    limpiarNotificacion(){
        this.notificacion.titulo='';
        this.notificacion.contenido='';
        this.notificacion.dispositivos=[];
        this.dispositivos = [];
        this.notificacion.img = '';
        this.personasSeleccionadas = [];
    }
  },
    computed: 
            mapState(["tokn"]),
            ...mapGetters(["validarToken"]),
            
                
};
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

li.active{
    border-radius: 5px;
    background-color: #e0e0e0;
}
/*stylos modal*/



</style>