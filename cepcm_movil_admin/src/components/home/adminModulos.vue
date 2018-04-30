<template>
  <v-container  grid-list-md text-xs-center>
    <v-form ref="form" lazy-validation>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card color="primary" dark>
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <span>Administración de módulos</span>
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6  offset-xs3>
                
                <v-select placeholder="Plantel" :options="getCatalogos[0]"  label="descripcion" id="id"
                v-model="plantelSelected" >
                    <template slot="no-options">
                        No se cuenta con registros
                    </template>
                </v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                
                <v-select placeholder="Nivel academico" :options="getCatalogos[1]" label="descripcion" id="id" 
                 v-model="nivelAcademicoSelected" required>
                    <template slot="no-options">
                        No se cuenta con registros
                    </template>
                </v-select>
            </v-flex>
            <v-flex xs6  offset-xs3>
                
                <v-select placeholder="Carretera" :filterable="false" :options="carrera"  label="descripcion" id="id" @search="onSearch" 
                    v-model="carreraSelected" required :disabled="!nivelAcademicoSelected || !plantelSelected">
                    <template slot="no-options">
                        No se encuentran carreras con los criterios seleccionados
                    </template>

                    <template slot="option" slot-scope="option">
                        <div class="d-center">
                        
                        {{ option.descripcion }}
                        </div>
                    </template>
                    <template slot="selected-option" slot-scope="option">
                        <div class="selected d-center">
                            
                            {{ option.descripcion }}
                        </div>
                    </template>
                </v-select>
            </v-flex>            
            <v-flex xs6  offset-xs3>
                
                <v-select placeholder="Grupo" :options="getGrupos" label="descripcion"  id="id" required
                    v-model="grupoSelected"  :disabled="carreraSelected == '' || plantelSelected=='' ">
                    <template slot="no-data">
                        No se cuenta con registros
                    </template>
                </v-select>

            </v-flex>
            <v-flex>
                <!--pre>{{ selected}}</pre-->
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs12 >
                <v-btn :loading="loading3" color="primary" class="black--text" @click="generarBusqueda" :disabled="!grupoSelected">
                    Buscar
                    <v-icon right dark>search</v-icon>
                </v-btn>
                
                <v-btn :loading="loading3" color="primary" class="black--text" @click="limpiarForma">
                    Limpiar
                    <v-icon right dark>delete</v-icon>
                </v-btn>
                
            </v-flex>
        </v-layout>

        <v-layout>
            <!--v-flex xs12>
                <v-alert type="error"  v-model="alertValidaDsipositivo" dismissible transition="scale-transition">
                    Lo sentimos pero la persona no cuenta con dispositivo para recibir la notificación
                </v-alert>
            </v-flex-->
        </v-layout>
        <v-layout>    
            <v-flex xs12 >
                <div>
                    <v-data-table  ref="dataTable1" :headers="headers" :items="items"  :pagination.sync="pagination" 
                        item-key="name"  class="elevation-1" >
                        <template slot="headers" slot-scope="props">
                            <tr>
                                <th v-for="header in props.headers" :key="header.text">
                                    {{ header.text }}
                                </th>
                                <th>
                                    Acceso a modulos
                                    <tr>
                                        <td class="text-xs-center">Materias</td>
                                        <td class="text-xs-center">Calificaciones</td>
                                        <td class="text-xs-center"> Sessiones</td>
                                        <td class="text-xs-center">Pagos</td>
                                        <td class="text-xs-center">Adeudos</td>
                                        
                                    </tr>
                                </th>
                            </tr>
                        </template>

                        <template slot="items" slot-scope="props">
                            <tr :active="props.selected" >
                                
                                <td class="text-xs-center">
                                    {{props.item.dispositivo}}
                                </td>
                                <td class="text-xs-center"> {{ props.item.matricula }} </td>
                                <td class="text-xs-center"> {{ props.item.alumno.nombres + " "+ props.item.alumno.apaterno + " " + props.item.alumno.amaterno}} </td>
                                
                                <td class="text-xs-center"> 
                                    <tr>
                                        <td div v-for="modulo in props.item.modulos" :key="modulo.id" class="text-xs-center">
                                            <span v-text="modulo.id" style="visibility:hidden"></span>
                                            <v-switch v-model="modulo.estadoBloqueo" @click="probarModal($event, modulo.estadoBloqueo, modulo.id)" ></v-switch>
                                        </td>
                                    </tr>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                    <!--div class="text-xs-center pt-2" >
                        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                    </div -->  
                </div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <adminModulesFirebase @cerrarModal="cerrarModal" @succesModal="succesModal" @failModal="failModal" :propiedades="getPorps" v-if="getPorps.modelo" >
                </adminModulesFirebase>

                <mensajeDlg  @cerrarDlg="cerrarMensajeDlg" v-if="getMensajesProps.modelo" :propiedades="getMensajesProps" ></mensajeDlg>
            </v-flex>
        </v-layout>


    </v-form>
    <v-flex>

    </v-flex>
  </v-container>  

</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import { mapState, mapGetters } from "vuex";
import notificacionServices from "./notificacion.grupo.adeudo.services";

import homeServices from "./home.services";
import CONS from "../utils/constantes.js";

import adminModulesFirebase from '../dialogo/adminModulesFirebaseDlg';
import mensajeDlg from '../dialogo/mensajesDlg';


export default {
  created() {
    this.$store.dispatch("setLoading", true);
  },
  mounted() {
    this.$store
      .dispatch("validarToken2")
      .then(data => {
        this.token = data;
      })
      .then(() => {
        let params = {
          catalogos: [{ cveCatalogo: "PLT" }, { cveCatalogo: "NVL" }]
        };
        let cat = this.catalogs;
        notificacionServices
            .getCatalogoGenerico(params, this.token)
            .then(data => {
                data.respuesta.forEach((item, index) => {
                this.catalogs.push(item.respuesta);

                });
            })
            .then(()=>{
                let params = {access_token: this.token };
                homeServices.obtenerImagenes(params).then((data) => {
                    this.catImges = data.respuesta;
                    this.$store.dispatch("setLoading", false);
                });
            })
        
      })

      .catch(error => {
        this.$store.dispatch("setLoading", false);
      });
  },
  components: { vSelect, adminModulesFirebase, mensajeDlg},
  data: () => {
    return {
            dlg:{
                titulo:'Resultado de la operación',
                contenido:'',
                tipo:'',
                modelo:false,
                bloqueo:false,
                modulo:''
            },
            dialogo:{
                titulo:'Resultado de la operación',
                contenido:'',
                tipo:'',
                modelo:false
            },
            token: "",
            alertValidaDsipositivo: false,
            catalogs: [],
            plantel: [],
            plantelSelected: undefined,
            nivelAcademico: [],
            nivelAcademicoSelected: undefined,
            carrera: [],
            carreraSelected: "",
            grupo: [],
            grupoSelected: "",

            queryString: null,

            disparaBuscarGrupo: null,
            search: "",
            pagination: {},
            //selected: [],

           
            headers: [
                { text: "Dispositivo", value: "dispositivo" },
                { text: "Matricula", value: "matricula" },
                { text: "Alumno", value: "alumno" }
                
            ],

            items: [],
            loader: null,
            loading3: false,
            
            dispositivos:[],
            
            confirmNotificacion:false,
            
            catImges: [],
            dataBusqueda:[],
            resourcePdf:''

    };
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
    carreraSelected: function(newValue, oldValue) {
      if (newValue && this.carreraSelected) {
        //console.log("disparaBuscarGrupo");
        this.buscarGrupo().then(data => {
          this.grupo = data;
        });
      }
    }
  },
  methods: {
    notificacionErrada(){
        this.dialogo.contenido = "Ha ocurrido un error al enviar la notificación, favor de intantar de nuevo";
        this.dialogo.tipo =  "red lighten-1";;
        this.dialogo.modelo = !this.dialogo.modelo;
        
        setTimeout(() => {
            
            this.cerrarModal();
            
        }, 100); 
    },
    notificacionEmitida(){
        this.dialogo.contenido = "Se ha generado con éxito la notificación";
        this.dialogo.tipo =  "green lighten-1";;
        this.dialogo.modelo = !this.dialogo.modelo;
        
        setTimeout(() => {
            this.limpiarForma();
            this.cerrarModal();
            
        }, 100); 
    },
    cerrarMensajeDlg(){        
        this.dialogo.contenido = "";
        this.dialogo.tipo = "";
        this.dialogo.modelo = !this.dialogo.modelo;
        this.$store.dispatch("setLoading", false);
    },  
    cerrarModal(){
        console.log("cerrar parent")
        this.dlg.contenido = "";
        this.dlg.tipo = "";
        this.dlg.modelo = !this.dlg.modelo;
        this.dlg.bloqueo = false;
        this.dlg.modulo = '';
        this.$store.dispatch("setLoading", false);
    },
    probarModal(event, estado, modulo){
        if( !estado ){
            debugger;
            this.dlg.contenido = "Estas apunto de bloquear el acceso";
            this.dlg.tipo = "red lighten-1";
            this.dlg.modelo = !this.dlg.modelo;
            this.dlg.bloqueo = true;
            this.dlg.modulo = modulo;
        }else{
            this.dlg.contenido = "Estas apunto de desbloquear el acceso";
            this.dlg.tipo = "green lighten-1";
            this.dlg.modelo = !this.dlg.modelo;
            this.dlg.bloqueo =false;
            this.dlg.modulo = modulo;
        }    
    },
    succesModal(){
        this.cerrarModal();
    },
    failModal(){

    },


    limpiarForma(){
        this.plantelSelected = this.nivelAcademicoSelected = undefined;
        this.carreraSelected = this.grupoSelected ="";
        this.selected =this.items = this.dispositivos=[];
        this.dataBusqueda=[];
        resourcePdf:''
    },
    cambio(prop) {
    let dispositivo = prop.item.alumno.dispositivo != null ? prop.item.alumno.dispositivo: null;
    if (prop.item.alumno.dispositivo != null) {

        prop.selected = !prop.selected;
        if(!prop.selected){
            this.dispositivos.push(dispositivo.id);
        }else{
            this.dispositivos.splice(prop.index, 1);
        }
        
    } else {
        setTimeout(() => {
          this.alertValidaDsipositivo = false;
        }, 2000);
        this.alertValidaDsipositivo = true;
      }
    },
    

    buscarGrupo() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("validarToken2")
          .then(data => {
            this.token = data;
            let req = {
              idPlantel: this.plantelSelected.id,
              idCarrera: this.carreraSelected.id,
              access_token: this.token
            };
            //console.log(req);
            notificacionServices
              .getCatalogoDependiente(req, CONS.urlConsultaGrupo)
              .then(data => {
                if (data.respuesta != undefined) {
                  resolve(data.respuesta);
                }
              })
              .catch(() => {
                reject(null);
              });
          })
          .catch(() => {
            reject(null);
          });
      });
    },
    onSearch: function onSearch(search, loading) {
      if (search.length > 3) {
        loading(true);
        this.$store.dispatch("validarToken2").then(tooken => {
          this.token = tooken;
          this.search3(loading, search, this);
        });
      }
    },

    search3: function(loading, search, vm) {
      //console.log("search3");
      let req = {
        idNivel: this.nivelAcademicoSelected.id,
        filtro: search,
        access_token: this.token
      };
      notificacionServices
        .getCatalogoDependiente(req, CONS.urlConsultaCarrera)
        .then(data => {
          //s.log(data);
          if (data.respuesta != undefined) {
            this.carrera = data.respuesta;
            loading(false);
          }
        });
    },
    generarBusqueda: function() {
      this.$store.dispatch("setLoading", true);
      this.items = [];
      this.selected = [];
      this.dispositivos = [];
      this.$store
        .dispatch("validarToken2")
        .then(tooken => {
          this.token = tooken;
        })
        .then(() => {
          let req = {
            idGrupo: this.grupoSelected.id,
            access_token: this.token
          };
          this.dataBusqueda = [];
          notificacionServices
            .getCatalogoDependiente(req, CONS.urlConsultaDeudor)
            .then(data => {
              
              if (data.respuesta != undefined) {

                data.respuesta.filter((item)=>{
                    item.dispositivo=24;
                    item.modulos=[
                        {id:'Materias', estadoBloqueo:false},
                        {id:'Calificaciones', estadoBloqueo:true},
                        {id:'Sessiones', estadoBloqueo:false},
                        {id:'Pagos', estadoBloqueo:true},
                        {id:'Adeudos', estadoBloqueo:false}];
                });
                this.items = data.respuesta;

                console.log(this.items);
                debugger;
                this.$store.dispatch("setLoading", false);
              }
            })
            .catch(() => {
              this.$store.dispatch("setLoading", false);
            });
        })
        .catch(() => {
          this.$store.dispatch("setLoading", false);
        });
    }
  },

  computed: {
    getPorps() {
       return this.dlg;
    },
     getMensajesProps(){
        return this.dialogo;
    },
    
    getCatalogos: function() {
      return this.catalogs;
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    getLoaing() {
      return this.$store.getters.getLoadiong;
    },
    getGrupos() {
      if (this.plantelSelected && this.carreraSelected) {
        //console.log("true");
        return this.grupo;
      } else {
        //console.log("false");
        return (this.grupo = []);
      }
    },
    getDispositivos(){
        return this.dispositivos.length > 0 ? this.dispositivos : null;
    },
   
  }
};
</script>
