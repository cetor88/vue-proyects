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
                <h2>Plantel</h2>
                <v-select placeholder="Plantel" :options="getCatalogos[0]"  label="descripcion" id="id"
                v-model="plantelSelected" >
                </v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                <h2>Nivel academico</h2>
                <v-select placeholder="Nivel academico" :options="getCatalogos[1]" label="descripcion" id="id" 
                 v-model="nivelAcademicoSelected" required>
                </v-select>
            </v-flex>
            <v-flex xs6  offset-xs3>
                <h2>Carrera</h2>
                <v-select placeholder="Carretera" :filterable="false" :options="carrera"  label="descripcion" id="id" @search="onSearch" v-model="carreraSelected" required="">
                    <template slot="no-options">
                    Escribe una carrera
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
                <h2>Grupo</h2>
                <v-select placeholder="Grupo" :options="getGrupos" label="descripcion"  id="id" required
                    v-model="grupoSelected"  :disabled="carreraSelected == '' || plantelSelected=='' ">
                </v-select>

            </v-flex>
            <v-flex>
                <!--pre>{{ grupo}}</pre -->
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 >
                <v-btn :loading="loading3" color="primary" class="white--text" >
                    Exportar
                    <v-icon right dark>fal fa-file-pdf</v-icon>
                </v-btn>

                <v-btn :loading="loading3" color="primary" class="black--text" @click="generarNorificacion">
                    Generar notificación
                    <v-icon right dark>far fa-share-square</v-icon>
                </v-btn>
                <v-btn :loading="loading3" color="primary" class="white--text" >
                    Limpiar
                    <v-icon right dark>far fa-eraser</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout>    
            <v-flex xs12 >
                <div>
                    <v-data-table :headers="headers" :items="dataTable" :search="search" :pagination.sync="pagination"
                    hide-actions class="elevation-1">
                        <template slot="headerCell" slot-scope="props">
                            <v-tooltip bottom>
                                <span slot="activator">
                                    {{ props.header.text }}
                                </span>
                                <span>
                                    {{ props.header.text }}
                                </span>
                            </v-tooltip>
                        </template>

                        <template slot="items" slot-scope="props">
                            <td>
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.alumno.nombres + " "+ props.item.alumno.apaterno + " " + props.item.alumno.amaterno}}
                                    </span>
                                    <span>
                                        {{ props.item.alumno.nombres + " "+ props.item.alumno.apaterno + " " + props.item.alumno.amaterno}}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.colegiaturas  }}
                                    </span>
                                    <span>
                                        {{ props.item.colegiaturas }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.recargos }}
                                    </span>
                                    <span>
                                        {{ props.item.recargos }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.importeRecargosColegiaturas }}
                                    </span>
                                    <span>
                                        {{ props.item.importeRecargosColegiaturas }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.importeColegiaturas }}
                                    </span>
                                    <span>
                                        {{ props.item.importeColegiaturas }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.reinscripcionesAdeudadas }}
                                    </span>
                                    <span>
                                        {{ props.item.reinscripcionesAdeudadas }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.importeReinscripciones }}
                                    </span>
                                    <span>
                                        {{ props.item.importeReinscripciones }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.adeudoTotal }}
                                    </span>
                                    <span>
                                        {{ props.item.adeudoTotal }}
                                    </span>
                                </v-tooltip >
                            </td>
                        </template>
                    </v-data-table>
                    <div class="text-xs-center pt-2">
                        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-form>
    <v-flex>

    </v-flex>
  </v-container>  

</template>
<script>
import Vue from 'vue'
    import vSelect from 'vue-select'
import { mapState, mapGetters } from "vuex"
import notificacionServices from "./notificacion.grupo.adeudo.services"
import CONS from '../utils/constantes.js'

export default {
    
    created(){
        this.$store.dispatch('setLoading', true);
    },
    mounted() {
        
        this.$store
        .dispatch("validarToken2")
        .then(data => {
            this.token = data;
        })
        .then(() => {
        let params = {catalogos:[{cveCatalogo:'PLT'}, {cveCatalogo: 'NVL'}]};
        let cat = this.catalogs;
        notificacionServices.getCatalogoGenerico(params,this.token )
            .then((data) => {
                data.respuesta.forEach((item, index) => {
                    this.catalogs.push(item.respuesta);
                    /*console.log(item);
                    this.catalogs[item.mensaje] = item.respuesta;
                    console.log(this.catalogos);*/
                    
                })
            })
        this.$store.dispatch('setLoading', false);    
        })
        .catch((error)=>{
            console.log(error);
            this.$store.dispatch('setLoading', false);
        })
    },
        components: {vSelect},
  data() {
    return {
        token: "",
        catalogs:[],

        plantel: [],
            plantelSelected: undefined,
        nivelAcademico: [],
            nivelAcademicoSelected: undefined,
        carrera: [],
            carreraSelected: '',
        grupo: [],
            grupoSelected: '',

        queryString:null,
        
        disparaBuscarGrupo:null,
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {text: 'Alumno', value: 'alumno'},
          { text: '# Colegiaturas', value: 'colegiaturas' },
          { text: 'Recargos %', value: 'recargos' },
          { text: 'Importe de recargos', value: 'importeRecargosColegiaturas' },
          { text: 'Importe', value: 'importeColegiaturas' },
          { text: '# de reinscripción', value: 'iron' },
          { text: 'Importe', value: 'importeReinscripciones' },
          { text: 'Adeudo total', value: 'adeudoTotal' }
        ],
        dataTable:[],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
        ],
        loader: null,
        loading3: false,
    };
  },

   watch: {
        loader () {
            const l = this.loader
            this[l] = !this[l]
            setTimeout(() => (this[l] = false), 3000)

            this.loader = null
        },
        carreraSelected: function (newValue, oldValue) {
            if(newValue && this.carreraSelected){
                console.log("disparaBuscarGrupo");
                this.buscarGrupo().then(data=>{
                    this.grupo = data;
                });
            }
        },
   },
    methods: {
        buscarGrupo(){
            return new Promise((resolve, reject) =>{
                this.$store.dispatch('validarToken2')
                .then((data)=>{
                    this.token = data;
                    let req = {idPlantel : this.plantelSelected.id, idCarrera : this.carreraSelected.id, access_token : this.token};
                    console.log(req);
                    notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaGrupo)
                    .then((data) =>{
                        if(data.respuesta != undefined){
                            resolve(data.respuesta);          
                        }
                    }).catch(()=>{
                        reject(null);  
                    })
                }).catch(()=>{
                    reject(null);  
                })
            })
        },
        onSearch: function onSearch(search, loading) {
            if(search.length > 3){
                loading(true);
                this.$store.dispatch('validarToken2')
                .then((tooken)=>{
                    this.token = tooken;
                    this.search3(loading, search, this);
                })
            }
        },

        search3 : function (loading, search, vm) {
            console.log("search3");
            let req  = {idNivel: this.nivelAcademicoSelected.id, filtro: search, access_token: this.token};
            notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaCarrera)
            .then((data) =>{
                console.log(data);
                if(data.respuesta != undefined){
                    this.carrera = data.respuesta;
                    loading(false);      
                }
                    
            })
        },
        generarNorificacion: function(){
            debugger;
            this.$store.dispatch('validarToken2')
                .then((tooken)=>{
                    this.token = tooken;
                }).then(()=>{
                    let req  = {idGrupo:this.grupoSelected.id, access_token:this.token};
                    notificacionServices.getCatalogoDependiente(req, CONS.urlConsultaDeudor)
                        .then((data) =>{
                            console.log(data);
                            if(data.respuesta != undefined){
                                this.dataTable = data.respuesta;
                                      
                            }
                                
                        })
                })

        }

    },
    
    computed:{

        getCatalogos: function(){
            return this.catalogs;
        },
        pages () {
            if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
            ) return 0

            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
        getLoaing(){
        return this.$store.getters.getLoadiong;
        },
        getGrupos(){
            
            if(this.plantelSelected && this.carreraSelected){
                console.log("true");
                return this.grupo;
            }else{
                console.log("false");
                return this.grupo=[];
            }
            
        },
        
    }
}
</script>
