<template>
  <v-container  grid-list-md text-xs-center>
    <v-form ref="form" lazy-validation>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card color="primary" dark>
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <span>Configuración de accesos a modulos por alumno:</span>
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
                    <v-flex xs10 >
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
                                
                                {{ option.descripcion  +' - '+ option.clave }}
                                </div>
                            </template>
                            <template slot="selected-option" slot-scope="option">
                                <div class="selected d-center">
                                    
                                    {{ option.descripcion  +' - '+ option.clave  }}
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


    </v-form>

        <v-layout row>
            <v-flex xs12  >
                <v-subheader class="text-lg-center" color="grey darken-4"> <span style="font-weight: bold; color: black;">Listado de alumnos:</span></v-subheader>
            </v-flex>
        </v-layout>
        <v-layout row>
            
            <v-flex xs12 >
                <div>
                    <v-data-table  ref="dataTable1" :headers="headers" :items="items"  :pagination.sync="pagination" 
                        rows-per-page-text="Registros por página" item-key="name"  class="elevation-1"
                        :rows-per-page-items='[25, {"text":"ver todos","value":-1}]' >
                        <template slot="headers" slot-scope="props">
                            <tr>
                                <th v-for="header in props.headers" :key="header.text">
                                    {{ header.text }}
                                </th>
                                <th class="text-xs-center"> Acceso a modulos
                                    <tr>
                                        <!--td class="text-xs-center" v-for="modulo in dataModulos" :key="modulo.id">
                                            {{modulo.descripcion}}
                                        </td-->
                                        <td class="text-xs-center">
                                            <!--div class="th-td-cell" v-for="modulo in dataModulos" :key="modulo.id" >
                                                {{modulo.descripcion}}
                                            </div-->
                                            <div class="th-td-cell" v-for="modulo in dataModulos" :key="modulo.id" >
                                                {{modulo.descripcion}}
                                            </div>
                                        </td>
                                    </tr>
                                </th>
                            </tr>
                        </template>
                        <template slot="items" slot-scope="props">
                            <tr :active="props.selected" >
                                <td class="text-xs-center">
                                    {{props.item.dispositivo}}                                
                                </td>
                                <td class="text-xs-center"> 
                                    {{ props.item.matricula }} 
                                </td>
                                <td class="text-xs-center"> 
                                    {{ props.item.nombres + " "+ props.item.apaterno + " " + props.item.amaterno}} 
                                </td>
                                
                                <td class="text-xs-center"> 
                                    <tr>
                                         <td class="text-xs-center">
                                            <div class="td-cell"  v-for="modulo in props.item.modulos" :key="modulo.id" >
                                            
                                                <div style="visibility:hidden"> {{modulo.item2.descripcion}} </div>

                                                <v-switch v-model="modulo.estadoBloqueo" 
                                                    @click="probarModal($event, modulo.estadoBloqueo, modulo.item2.nodoFirebase, props.item.uid, modulo.item2, props.item.dispositivo);
                                                            listenerFireBase(modulo.item2.nodoFirebase, props.item.uid)" >
                                                    
                                                </v-switch>
                                                
                                                <v-tooltip top>
                                                    <div dark color="primary" slot="activator">
                                                        <div v-bind:style="{visibility: !modulo.estadoBloqueo?'visible':'hidden'}">ver ..</div> 
                                                    </div>
                                                    <div v-if="!modulo.estadoBloqueo" v-text="modulo.mensaje"></div>
                                                </v-tooltip>
                                            
                                            </div>
                                         </td>
                                    </tr>
                                </td>
                            </tr>
                        </template>
                        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                                {{ pageStart }} de {{ pageStop }}
                        </template>
                        <template slot="no-data">
                            No existen registros
                        </template>
                    </v-data-table>
                    
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
    components: { vSelect, adminModulesFirebase, mensajeDlg},
    created() {
        this.$store.dispatch("setLoading", true);
    },
    mounted() {
        this.$store.dispatch("validarToken2").then(data => {
            this.token = data;
        }).then(()=>{
            notificacionServices.obtenerModuloFirebase2(this.token).then((data)=>{
                this.dataModulos=data;
                console.log(this.dataModulos);   
        }).then(() => {
                let params = {catalogos: [{ cveCatalogo: "PLT" }, { cveCatalogo: "NVL" }]};
                notificacionServices.getCatalogoGenerico(params, this.token).then(data => {
                    data.respuesta.forEach((item, index) => {
                        this.catalogs.push(item.respuesta);
                    });
                    this.$store.dispatch("setLoading", false);
                }).catch(error => {
                    console.log("Resultado de la operacion... " + error);
                    this.$store.dispatch("setLoading", false);
                    this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                    this.dialogo.tipo =  "red lighten-1";
                    this.dialogo.modelo = !this.dialogo.modelo;  
                });
            })
        }).catch(error => {
            console.log("Resultado de la operacion... " + error);
            this.$store.dispatch("setLoading", false);
            this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
            this.dialogo.tipo =  "red lighten-1";
            this.dialogo.modelo = !this.dialogo.modelo;  
        })
    },

    data: () => {
        return {
            dlg:{
                titulo:'Resultado de la operación',
                contenido:'',
                tipo:'',
                modelo:false,
                bloqueo:false,
                modulo:'',
                uid:'',
                token:'',
                item:{}
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

            
            headers: [
                //{ text: "Dispositivo", value: "dispositivo" },
                { text: "Matricula", value: "uid" },
                { text: "Alumno", value: "alumno" },
                
                
            ],

            items: [],
            loader: null,
            loading3: false,
            
            dispositivos:[],
            
            confirmNotificacion:false,
            
            
            dataBusqueda:[],
            resourcePdf:'',
            dataModulos:[],//['adeudos', 'calendario', 'calificaciones', 'login', 'materias', 'pagos']
            //dataModulos: ['adeudos', 'calendario', 'calificaciones', 'login', 'materias', 'pagos']

        }
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
            this.dlg.uid='',
            this.dlg.token='';
            this.dlg.item={};
            this.dlg.titulo ='';
            
        },
        probarModal(event, estado, modulo, uid, item, dispositivo){
            this.$store
            .dispatch("validarToken2")
            .then(tooken => {
                this.token = tooken;

                if( estado ){
                    debugger;
                    this.dlg.contenido = "Favor de introducir un mensaje con la descripción del bloqueo del módulo \""+ modulo.toUpperCase() +"\", con la cual se mostrará al alumno"   ;
                    this.dlg.tipo = "red lighten-1";
                    this.dlg.titulo = "Bloqueo de modulo";
                    this.dlg.modelo = !this.dlg.modelo;
                    this.dlg.bloqueo = true;
                    this.dlg.modulo = modulo;
                    this.dlg.uid = uid;
                    this.dlg.token = tooken;
                    this.dlg.item = item;
                    this.dlg.dispositivo = dispositivo;
                }else{
                    this.dlg.contenido = "Estas apunto de desbloquear el modulo \""+ modulo.toUpperCase() +"\"";
                    this.dlg.tipo = "orange lighten-1";
                    this.dlg.titulo = "Advertencia";
                    this.dlg.modelo = !this.dlg.modelo;
                    this.dlg.bloqueo = false;
                    this.dlg.modulo = modulo;
                    this.dlg.uid = uid;
                    this.dlg.token = tooken;
                    this.dlg.item = item;
                    this.dlg.dispositivo = dispositivo;
                }
            })
        },
        listenerFireBase( modulo, uid ){
            debugger;
            let ref = CONS.db.ref('alumnos/'+uid+'/configuracion/modulos/'+ modulo.toLowerCase());
            let index = 0;
            ref.on('value',snapshot=>{
                console.log( " snapshot ->" + snapshot.val());
                if(index > 0){
                    this.items.filter((item)=>{
                        debugger;
                        if(item.uid === uid){
                            for(var i = 0; i < item.modulos.length; i++){
                                if(item.modulos[i].item2.nodoFirebase.toLowerCase() == modulo.toLowerCase()){
                                    item.modulos[i].estadoBloqueo = !snapshot.val().bloquear_acceso;
                                    item.modulos[i].mensaje =  snapshot.val().mensaje;
                                }   
                            }
                        }
                    })
                }
                index++
                
            } )            
        }, 
        succesModal(){
            console.log("cerrar parent")
            this.dlg.contenido = "";
            this.dlg.tipo = "";
            this.dlg.modelo = !this.dlg.modelo;
            this.dlg.bloqueo = false;
            this.dlg.modulo = '';
            this.dlg.token='';
            this.dlg.item = {};
            this.$store.dispatch("setLoading", false);
                setTimeout(() => {
                    this.notificacionEmitida();
            }, 100);

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
        /*cambio(prop) {
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
        },*/   

        buscarGrupo() {
            return new Promise((resolve, reject) => {
                this.$store.dispatch("validarToken2").then(data => {
                    this.token = data;
                    let req = {
                        idPlantel: this.plantelSelected.id,
                        idCarrera: this.carreraSelected.id,
                        access_token: this.token
                    };
                    notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaGrupo).then(data => {
                        if (data.respuesta != undefined) {
                            resolve(data.respuesta);
                        }
                    }).catch(() => {
                        reject(null);
                    });
                }).catch(() => {
                    reject(null);
                });
            });
        },
        onSearch: function onSearch(search, loading) {
            if (search.length > 3) {
                this.$store.dispatch("setLoading", true);
                this.$store.dispatch("validarToken2").then(tooken => {
                    this.token = tooken;
                    this.search3(loading, search, this);
                    this.$store.dispatch("setLoading", false);
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
            notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaCarrera).then(data => {
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
            let auxItems=[];

            this.$store.dispatch("validarToken2").then(tooken => {
                this.token = tooken;
                let req = {
                    idGrupo: this.grupoSelected.id,
                    access_token: this.token
                };
                this.dataBusqueda = [];
                
                notificacionServices.getCatalogoDependiente(req, CONS.urlBuscarAlumnosGrupo).then(data => {
                        
                        if (data.respuesta != undefined) {

                            data.respuesta.forEach(item => {    
                                item.dispositivo = item.dispositivo === null ? 'N/A' : item.dispositivo.id;
                                item.uid = item.usuarioAplicacion !== null ? item.usuarioAplicacion.idFirebase :'';
                                
                                let demoList = [];                         
                                console.log(item.uid);
                                notificacionServices.obtenerModuloFirebase(item.uid).then((response) => {
                                    
                                        if( response!==null ){
                                            this.dataModulos.forEach( item => {
                                                demoList.push( { id: item.id,
                                                            estadoBloqueo: !response[item.nodoFirebase.toString()].bloquear_acceso,
                                                            mensaje:response[item.nodoFirebase.toString()].mensaje,
                                                            item2:item}
                                                    );
                                            })
                                            item.modulos = demoList;
                                            auxItems.push(item);
                                        }else{
                                            item.modulos = [];
                                            auxItems.push(item);
                                        }
                                        console.log(response);
                                    })
                                    
                                this.$store.dispatch("setLoading", false);
                                
                            });
                        }
                    }).catch(error => {
                        console.log("Resultado de la operacion... " + error);
                        this.$store.dispatch("setLoading", false);
                        this.dialogo.contenido = 'Servicio temporalmente no disponible, favor de intentar más adelante ó comunicarse con él administrador';
                        this.dialogo.tipo =  "red lighten-1";
                        this.dialogo.modelo = !this.dialogo.modelo;
                    })  
            }).then(()=>{
                this.items = auxItems;

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

<style scoped>
    .th-td-cell {
        display: inline-block;
        padding: 0px 25px;
        
    }
    .td-cell {
        display: inline-block;
        padding: 0px 22px;
        
    }
    tr td div.td-cell {
        padding: 0px 21px !important;
    }
</style>