<template>
  <v-container  grid-list-md text-xs-center>
    <v-form ref="form" lazy-validation>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card color="primary" dark>
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <span>Notificaciones a alumnos deudores</span>
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6  offset-xs3>
                <!--h2>Plantel</h2-->
                <v-select placeholder="Plantel" :options="getCatalogos[0]"  label="descripcion" id="id"
                v-model="plantelSelected" >
                    <template slot="no-options">
                        No se cuenta con registros
                    </template>
                </v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                <!--h2>Nivel academico</h2-->
                <v-select placeholder="Nivel academico" :options="getCatalogos[1]" label="descripcion" id="id" 
                 v-model="nivelAcademicoSelected" required>
                    <template slot="no-options">
                        No se cuenta con registros
                    </template>
                </v-select>
            </v-flex>
            <v-flex xs6  offset-xs3>
                <!--h2>Carrera</h2-->
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
                    <template slot="selected-option" scope="option">
                        <div class="selected d-center">
                            
                            {{ option.descripcion }}
                        </div>
                    </template>
                </v-select>
            </v-flex>            
            <v-flex xs6  offset-xs3>
                <!--h2>Grupo</h2-->
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
                <v-btn :loading="loading3" color="primary" class="black--text" @click="probarModal" :disabled="dispositivos.length==0">
                    Enviar notificación
                    <v-icon right dark>fal fa-file</v-icon>
                </v-btn>

                <v-btn :loading="loading3" color="primary" class="black--text" @click="generarBusqueda" :disabled="!grupoSelected">
                    Buscar
                    <v-icon right dark>search</v-icon>
                </v-btn>
                
                <v-btn :loading="loading3" color="primary" class="black--text" @click="generarReporte" :disabled="items.length==0" >
                    Generar reporte
                    <v-icon right dark>picture_as_pdf</v-icon>
                </v-btn>
                
                <v-btn :loading="loading3" color="primary" class="black--text" @click="limpiarForma">
                    Limpiar
                    <v-icon right dark>delete</v-icon>
                </v-btn>
                
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <v-alert type="error"  v-model="alertValidaDsipositivo" dismissible transition="scale-transition">
                    Lo sentimos pero la persona no cuenta con dispositivo para recibir la notificación
                </v-alert>
            </v-flex>
        </v-layout>
        <v-layout>    
            <v-flex xs12 >
                <div>
                    <v-data-table  v-model="selected"  ref="dataTable1"   :headers="headers" :items="items"  :pagination.sync="pagination" 
                        item-key="name"  class="elevation-1" >
                        <template slot="headers" slot-scope="props">
                            <tr>
                                <th>                                    
                                </th>
                                <th v-for="header in props.headers" :key="header.text">
                                    {{ header.text }}
                                </th>
                            </tr>
                        </template>

                        <template slot="items" slot-scope="props">
                            <tr :active="props.selected" @click="cambio( props)" >
                                <td class="text-xs-center">
                                    <v-checkbox hide-details :input-value="props.selected"></v-checkbox>
                                </td>
                                <td class="text-xs-center">
                                     
                                    <v-icon v-if="props.item.alumno.dispositivo != null"> phonelink_ring </v-icon>
                                    <v-icon v-if="props.item.alumno.dispositivo == null"> phonelink_erase </v-icon>
                                </td>
                                <td class="text-xs-center"> {{ props.item.alumno.nombres + " "+ props.item.alumno.apaterno + " " + props.item.alumno.amaterno}} </td>
                                <td class="text-xs-center"> {{ props.item.colegiaturas }} </td>
                                <td class="text-xs-center"> {{ props.item.recargos }} </td>
                                <td class="text-xs-center"> {{ props.item.importeRecargosColegiaturas }} </td>
                                <td class="text-xs-center"> {{ props.item.importeColegiaturas }} </td>
                                <td class="text-xs-center"> {{ props.item.reinscripcionesAdeudadas }} </td>
                                <td class="text-xs-center"> {{ props.item.importeReinscripciones }} </td>
                                <td class="text-xs-center"> {{ props.item.adeudoTotal }} </td>
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
                <myDialog @cerrarModal="cerrarModal" @notificacionEnviada="notificacionEmitida" @notificacionErrada="notificacionErrada"
                    v-if="getPorps.modelo" :imgs="catImges" :smart="getDispositivos" :propiedades="getPorps">
                </myDialog>
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

import myDialog from '../dialogo/commonDialog';
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
  components: { vSelect, myDialog, mensajeDlg},
  data: () => {
    return {
            dlg:{
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
            selected: [],

            headers: [
                { text: "Dispositivo", value: "dispositivo" },
                { text: "Alumno", value: "alumno" },
                { text: "# Colegiaturas", value: "colegiaturas" },
                { text: "Recargos", value: "recargos" },
                { text: "Importe de recargos", value: "importeRecargosColegiaturas" },
                { text: "Importe", value: "importeColegiaturas" },
                { text: "# de reinscripción", value: "reinscripcionesAdeudadas" },
                { text: "Importe", value: "importeReinscripciones" },
                { text: "Adeudo total", value: "adeudoTotal" }
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
    /*selected : function(newValue, oldValue){
            console.log(newValue);
        }*/
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
        this.$store.dispatch("setLoading", false);
    },
    probarModal(){
        this.dlg.contenido = "Contenido Generico";
        this.dlg.tipo = "red lighten-1";
        this.dlg.modelo = !this.dlg.modelo;
                
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
                this.items = data.respuesta;
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
    },
    generarReporte:function(){
        this.$store.dispatch("setLoading", true);
        this.$store.dispatch("validarToken2")
            .then(tooken => {
            this.token = tooken;
            })
            .then(() => {
                let req={
                    idGrupo:this.grupoSelected.id,
                    registros:this.items
                };
                notificacionServices.enviarPostGeneric(CONS.urlGenerarReporte, req, this.token)
                .then(data=>{
                    let a = document.createElement("a");
                    a.href = "data:application/octet-stream;base64,"+data.respuesta;
                    a.download = "alumnos_deudores_"+Math.floor((Math.random() * 10) + 1)+".pdf"
                    a.click();
                    this.$store.dispatch("setLoading", false);
                })
                
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
