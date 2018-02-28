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
                <v-select  v-bind:items="getCatalogos[0]" append-icon="far fa-angle-down" item-text="descripcion"
                item-value="id" v-model="plantelSelected" label="Plantel:" required>
                </v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select  v-bind:items="getCatalogos[1]" append-icon="far fa-angle-down" item-text="descripcion"
                item-value="id" v-model="nivelAcademicoSelected" label="Nivel academico:" required>
                </v-select>
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select label="Selecciona una carrera" autocomplete item-text="descripcion" item-value="id"
                    required :items="carrera" :rules="[(value) => !!value || 'Selecciona al menos una carrera']" 
                    :search-input.sync="buscarCarrera" :value="carreraSelected" v-on:change="carreraSeleccionada($event.target.value)"
                    :disabled="nivelAcademicoSelected==undefined"
                    :clearable="true"  ></v-select> 
                    <!--v-on:select="carreraSeleccionada"-->

            </v-flex>            
            <v-flex xs6  offset-xs3>
                <v-select label="Selecciona una grupo"  item-text="descripcion" item-value="id"
                    required :items="grupo" :rules="[(value) => !!value || 'Selecciona al menos un grupo']" 
                    v-model="grupoSelected"  :disabled="carreraSelected == '' || plantelSelected=='' ">
                </v-select>
            </v-flex>
            <v-flex>
                <pre>{{ carreraSelected }}</pre>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 >
                <v-btn :loading="loading3" @click.native="loader = 'loading3'" :disabled="loading3"
                    color="primary" class="white--text" >
                    Exportar
                    <v-icon right dark>fal fa-file-pdf</v-icon>
                </v-btn>

                <v-btn :loading="loading3" @click.native="loader = 'loading3'" :disabled="loading3"
                    color="primary" class="white--text" >
                    Enviar notificación
                    <v-icon right dark>far fa-share-square</v-icon>
                </v-btn>
                <v-btn :loading="loading3" @click.native="loader = 'loading3'" :disabled="loading3"
                    color="primary" class="white--text" >
                    Limpiar
                    <v-icon right dark>far fa-eraser</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout>    
            <v-flex xs12 >
                <div>
                    <v-data-table :headers="headers" :items="items" :search="search" :pagination.sync="pagination"
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
                                        {{ props.item.name }}
                                    </span>
                                    <span>
                                        {{ props.item.name }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.calories  }}
                                    </span>
                                    <span>
                                        {{ props.item.calories }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.fat }}
                                    </span>
                                    <span>
                                        {{ props.item.fat }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.carbs }}
                                    </span>
                                    <span>
                                        {{ props.item.carbs }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.protein }}
                                    </span>
                                    <span>
                                        {{ props.item.protein }}
                                    </span>
                                </v-tooltip >
                            </td>
                            <td class="text-xs-right">
                                <v-tooltip bottom>
                                    <span slot="activator">
                                        {{ props.item.iron }}
                                    </span>
                                    <span>
                                        {{ props.item.iron }}
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
  //components: {vSelect,},
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
        a1: null,
        states: [
          { name: 'Florida', abbr: 'FL', id: 1 },
          { name: 'Georgia', abbr: 'GA', id: 2 },
          { name: 'Nebraska', abbr: 'NE', id: 3 },
          { name: 'California', abbr: 'CA', id: 4 },
          { name: 'New York', abbr: 'NY', id: 5 }
        ],
        customFilter (item, queryText, itemText) {
            console.log(item)
            console.log(queryText)
            console.log(itemText)
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.name)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },
        buscarCarrera : null,
        disparaBuscarGrupo:null,
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
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
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
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

        buscarCarrera (val) {
            if(val)
                if(val.length > 3){
                    this.$store.dispatch('setLoading', true);
                    this.$store.dispatch('validarToken2')
                    .then((data)=>{
                        this.token = data;
                        let req = {idNivel : this.nivelAcademicoSelected, filtro : val, access_token : this.token};
                        val && this.querySelections(req, CONS.urlConsultaCarrera)
                        this.$store.dispatch('setLoading', false);
                    })
                    
                }
        },
        disparaBuscarGrupo(){
            console.log(this.plantelSelected);
            console.log(this.carreraSelected);
        }
       
    },

    methods: {
        querySelections (req, url) {
            //req = {idNivel : this.nivelAcademicoSelected, filtro : strFiltro, access_token : this.token};
            console.log(req);
            notificacionServices.getCatalogoDependiente(req, url)
                .then((data) =>{
                    console.log(data);
                    if(data.respuesta != undefined){
                      this.carrera = data.respuesta;
                      this.$store.dispatch('setLoading', false);
                    }
                    
                })
        },
        buscarGrupo(val){
            return new Promise((resolve, reject) =>{
                this.$store.dispatch('validarToken2')
                .then((data)=>{
                    this.token = data;
                    
                    let req = {idPlantel : this.plantelSelected, idCarrera : this.carreraSelected, access_token : this.token};
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
        carreraSeleccionada(){
            console.log("entre a carrera seleccionada");
            debugger;
            if( this.carreraSelected!=''){
                this.$store.dispatch('setLoading', true);
                this.buscarGrupo().then((data)=>{
                    console.log(data);
                    this.grupo = data;    
                    this.$store.dispatch('setLoading', false);
                })
            }
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
        debugger;
        this.$store.dispatch('setLoading', true);
        this.buscarGrupo().then((data)=>{
            console.log(data);
            this.grupo = data;    
        })
        this.$store.dispatch('setLoading', false);
        
        return this.grupo;
    }
  }
};
</script>

<style>

</style>