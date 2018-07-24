<template>
    
    <v-form ref="form" lazy-validation>
        <v-container  grid-list-md text-xs-center>
            
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
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs6  offset-xs3>
                        <v-layout row>
                            <v-flex xs2  >
                                <v-subheader class="text-lg-center"> Plantel:</v-subheader>
                            </v-flex>
                            <v-flex xs10  >
                                <v-select placeholder="Plantel" :options="getCatalogos[0]"  label="descripcion" id="id"
                                v-model="plantelSelected" >
                                    <template slot="no-options">
                                        No se cuenta con registros
                                    </template>
                                </v-select>  
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs6  offset-xs3>

                        <v-layout row>
                            <v-flex xs2  >
                                <v-subheader class="text-lg-left" >Nivel academico:</v-subheader>
                            </v-flex>
                            <v-flex xs10 >
                        
                                <v-select placeholder="Nivel academico" :options="getCatalogos[1]" label="descripcion" id="id" 
                                v-model="nivelAcademicoSelected" required>
                                    <template slot="no-options">
                                        No se cuenta con registros
                                    </template>
                                </v-select>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6  offset-xs3>    
                        <v-layout row>
                            <v-flex xs2 >
                                <v-subheader class="text-lg-center">Carrera:</v-subheader>
                            </v-flex>
                            <v-flex xs10>
                                <v-select placeholder="Carretera" :filterable="false" :options="carrera"  label="descripcion" id="id" @search="onSearch" 
                                    v-model="carreraSelected" required :disabled="!nivelAcademicoSelected || !plantelSelected">
                                    <template slot="no-options">
                                        No se encuentran carreras con los criterios seleccionados
                                    </template>

                                    <template slot="option" slot-scope="option">
                                        <div class="d-center">
                                        
                                        {{ option.descripcion +' - '+ option.clave }}
                                        </div>
                                    </template>
                                    <template slot="selected-option" slot-scope="option">
                                        <div class="selected d-center">
                                            
                                            {{ option.descripcion +' - '+  option.clave}}
                                        </div>
                                    </template>
                                </v-select>
                            </v-flex>
                        </v-layout>
                    </v-flex>            
                    <v-flex xs6  offset-xs3>
                        <v-layout row>
                            <v-flex xs2>
                                <v-subheader class="text-lg-center">Grupo:</v-subheader>
                            </v-flex>
                            <v-flex xs10> 
                        
                                <v-select placeholder="Grupo" :options="getGrupos" label="descripcion"  id="id" required
                                    v-model="grupoSelected"  :disabled="carreraSelected == '' || plantelSelected=='' "
                                    no-data-text="No se cuenta con registros">
                                    <span slot="no-options">
                                        No se cuenta con registros.
                                    </span>
                                </v-select>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <!--pre>{{ selected}}</pre-->
                    </v-flex>
                </v-layout>
            
                
                <v-layout>
                    <v-flex xs12 >
                        <v-btn :loading="loading3" color="primary"  @click="probarModal" :disabled="dispositivos.length==0" >
                            Enviar notificación
                            <v-icon right dark>fal fa-file</v-icon>
                        </v-btn>

                        <v-btn :loading="loading3" color="primary"  @click="generarBusqueda" :disabled="!grupoSelected" >
                            Buscar
                            <v-icon right dark>search</v-icon>
                        </v-btn>
                        
                        <v-btn :loading="loading3" color="primary"  @click="generarReporte" :disabled="items.length==0"  >
                            Generar reporte
                            <v-icon right dark>picture_as_pdf</v-icon>
                        </v-btn>
                        
                        <v-btn :loading="loading3" color="primary" @click="limpiarForma" >
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
        
      
            <v-layout row wrap>
                <v-flex xs12>
                <myDialog @cerrarModal="cerrarModal" @notificacionEnviada="notificacionEmitida" @notificacionErrada="notificacionErrada"
                    v-if="getPorps.modelo" :imgs="catImges" :smart="getDispositivos" :propiedades="getPorps">
                </myDialog>
                <mensajeDlg  @cerrarDlg="cerrarMensajeDlg" v-if="getMensajesProps.modelo" :propiedades="getMensajesProps" ></mensajeDlg>

                </v-flex>
            </v-layout>
        </v-container>

        <v-layout row wrap>
            <v-flex xs12>
                <v-data-table  v-model="selected"  ref="dataTable1"   :headers="headers" :items="items" 
                :pagination.sync="pagination" rows-per-page-text="Registros por página" item-key="name" 
                :rows-per-page-items='[25, {"text":"ver todos","value":-1}]' class="elevation-1">
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
                                    
                                <v-icon v-if="props.item.alumno.dispositivo != null" color="green"> phonelink_ring </v-icon>
                                <v-icon v-if="props.item.alumno.dispositivo == null" color="red"> phonelink_erase </v-icon>
                            </td>
                            <td class="text-xs-center"> {{ props.item.alumno.matricula }} </td>
                            <td class="text-xs-center"> {{ props.item.alumno.nombres + " "+ props.item.alumno.apaterno + " " + props.item.alumno.amaterno}} </td>
                            <td class="text-xs-center"> {{ props.item.colegiaturasAdeudadas }} </td>
                            <td class="text-xs-center"> {{ props.item.recargos }} </td>
                            <td class="text-xs-center"> {{ parseInt(props.item.importeRecargosColegiaturas * 100) / 100  | pesos}} </td>
                            <td class="text-xs-center"> {{ parseInt(props.item.importeColegiaturas * 100) / 100  | pesos}} </td>
                            <td class="text-xs-center"> {{ props.item.reinscripcionesAdeudadas }} </td>
                            <td class="text-xs-center"> {{ parseInt(props.item.importeReinscripciones * 100) / 100  | pesos}} </td>
                            <td class="text-xs-center"> {{ parseInt(props.item.adeudoTotal * 100) / 100 | pesos}} </td>
                        </tr>
                    </template>
                    <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                            {{ pageStart }} de {{ pageStop }}
                    </template>
                    <template slot="no-data">
                        No existen registros
                    </template>
                </v-data-table>
            </v-flex>    
        </v-layout>
          
    </v-form>

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
    components: { vSelect, myDialog, mensajeDlg},

  created() {
    this.$store.dispatch("setLoading", true);
  },

  filters:{
      pesos: function (value) {
        if (!value) return ''
        value = parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        return "$ "+value
    }
  },
  mounted() {
    this.$store.dispatch("validarToken2").then(data => {
        this.token = data;

      }).then(() => {
        
        let params = {catalogos: [{ cveCatalogo: "PLT" }, { cveCatalogo: "NVL" }]};
        debugger
        notificacionServices.getCatalogoGenerico(params, this.token).then(data => {
            data.respuesta.forEach((item, index) => {
                this.catalogs.push(item.respuesta);
            });
        }).then(()=>{
                let params = {access_token: this.token };
                homeServices.obtenerImagenes(params).then((data) => {
                this.catImges = data.respuesta;
                this.$store.dispatch("setLoading", false);
                });
        }).catch(error => {
                console.log("Resultado de la operacion... " + error);
                this.$store.dispatch("setLoading", false);
                this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                this.dialogo.tipo =  "red lighten-1";
                this.dialogo.modelo = !this.dialogo.modelo;            
            });
        
      }).catch(error => {
        console.log("Resultado de la operacion... " + error);
        this.$store.dispatch("setLoading", false);
        this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
        this.dialogo.tipo =  "red lighten-1";
        this.dialogo.modelo = !this.dialogo.modelo;
      });
  },
  
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
                { text: "Matricula", value: "matricula" },
                { text: "Nombre del alumno", value: "alumno" },
                { text: "# Colegiaturas", value: "colegiaturasAdeudadas" },
                { text: "Recargos", value: "recargos" },
                { text: "Importe de recargos", value: "importeRecargosColegiaturas" },
                { text: "Importe colegiaturas", value: "importeColegiaturas" },
                { text: "# de reinscripción", value: "reinscripcionesAdeudadas" },
                { text: "Importe Reinscripción", value: "importeReinscripciones" },
                { text: "Adeudo total", value: "adeudoTotal" }
            ],
            items: [],
            loader: null,
            loading3: false,
            
            dispositivos:[],
            
            confirmNotificacion:false,
            
            catImges: [],
            dataBusqueda:[],
            //resourcePdf:''
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
        this.dialogo.contenido = "Se ha enviado la notificación con éxito";
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
        this.dlg.titulo = "Datos para la notificación"; 
        this.dlg.contenido = "Contenido Generico";
        
        this.dlg.tipo = "primary lighten-1";
        this.dlg.modelo = !this.dlg.modelo;
                
    },
    limpiarForma(){
        //this.plantelSelected = this.nivelAcademicoSelected = undefined;
        //this.carreraSelected = this.grupoSelected ="";
        this.selected =this.items = this.dispositivos=[];
        this.dataBusqueda=[];
        //resourcePdf:''
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
        this.$store.dispatch("validarToken2").then(data => {
            this.token = data;
            let req = { idPlantel: this.plantelSelected.id, idCarrera: this.carreraSelected.id, access_token: this.token };
            
            notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaGrupo).then(data => {
                if (data.respuesta != undefined) {
                  resolve(data.respuesta);
                }
            }).catch(error => {
                console.log("Resultado de la operacion... " + error);
                this.$store.dispatch("setLoading", false);
                this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                this.dialogo.tipo =  "red lighten-1";
                this.dialogo.modelo = !this.dialogo.modelo;
            })
        }).catch(error => {
            console.log("Resultado de la operacion... " + error);
            this.$store.dispatch("setLoading", false);
            this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
            this.dialogo.tipo =  "red lighten-1";
            this.dialogo.modelo = !this.dialogo.modelo;
        })
      });
    },
    onSearch: function onSearch(search, loading) {
      if (search.length > 3) {
        loading(true);
        this.$store.dispatch("validarToken2").then(tooken => {
          this.token = tooken;
          this.search3(loading, search, this);
        }).catch(error => {
            console.log("Resultado de la operacion... " + error);
            this.$store.dispatch("setLoading", false);
            this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
            this.dialogo.tipo =  "red lighten-1";
            this.dialogo.modelo = !this.dialogo.modelo;
        });
      }
    },
    search3: function(loading, search, vm) {
        let req = {
            idNivel: this.nivelAcademicoSelected.id,
            filtro: search,
            access_token: this.token
        };
        notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaCarrera).then(data => {
            if (data.respuesta != undefined) {
                this.carrera = data.respuesta;
                loading(false);
            }
        }).catch(error => {
            console.log("Resultado de la operacion... " + error);
            this.$store.dispatch("setLoading", false);
            this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
            this.dialogo.tipo =  "red lighten-1";
            this.dialogo.modelo = !this.dialogo.modelo;
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
          notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaDeudor).then(data => {
              if (data.respuesta != undefined) {
                data.respuesta.filter((item)=>{
                    item.importeRecargosColegiaturas = item.importeRecargosColegiaturas.toFixed(2);
                    item.adeudoTotal = item.adeudoTotal.toFixed(2);
                })
                this.items = data.respuesta;
                this.$store.dispatch("setLoading", false);
              }
            }).catch(error => {
                console.log("Resultado de la operacion... " + error);
                this.$store.dispatch("setLoading", false);
                this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                this.dialogo.tipo =  "red lighten-1";
                this.dialogo.modelo = !this.dialogo.modelo;
            })
        }).catch(error => {
            console.log("Resultado de la operacion... " + error);
            this.$store.dispatch("setLoading", false);
            this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
            this.dialogo.tipo =  "red lighten-1";
            this.dialogo.modelo = !this.dialogo.modelo;
        })
    },
    generarReporte:function(){
        this.$store.dispatch("setLoading", true);
        this.$store.dispatch("validarToken2").then(tooken => {
            this.token = tooken;
        })
        .then(() => {
            let req={
                idGrupo:this.grupoSelected.id,
                registros:this.items
            };
            notificacionServices.enviarPostGeneric(CONS.urlGenerarReporte, req, this.token).then(data=>{
                let a = document.createElement("a");
                a.href = "data:application/octet-stream;base64,"+data.respuesta;
                a.download = "alumnos_deudores_"+Math.floor((Math.random() * 10) + 1)+".pdf"
                a.click();
                this.$store.dispatch("setLoading", false);
            }).catch(error => {
                console.log("Resultado de la operacion... " + error);
                this.$store.dispatch("setLoading", false);
                this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                this.dialogo.tipo =  "red lighten-1";
                this.dialogo.modelo = !this.dialogo.modelo;
            })    
        }).catch(error => {
            console.log("Resultado de la operacion... " + error);
            this.$store.dispatch("setLoading", false);
            this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
            this.dialogo.tipo =  "red lighten-1";
            this.dialogo.modelo = !this.dialogo.modelo;
        })
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