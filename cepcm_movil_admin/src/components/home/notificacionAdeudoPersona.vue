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
                <v-select  v-bind:items="getCatalogos[0]" append-icon="far fa-angle-down" item-text="text"
                item-value="id" v-model="plantelSelected" label="Plantel:" 
                    >
                </v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select  v-bind:items="getCatalogos[1]" append-icon="far fa-angle-down" item-text="text"
                item-value="id" v-model="nivelAcademicoSelected" label="Nivel academico:"
                    >
                </v-select>
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select :items="getCatalogos[0]" append-icon="far fa-angle-down" item-text="text"
                item-value="id"  v-model="carreraSelected" label="Carrera:" :disabled="nivelAcademicoSelected==undefined"
                    v-on:change="consultarCatalogo(carreraSelected, 'grupo')" >
                </v-select>  
            </v-flex>            
            <v-flex xs6  offset-xs3>
                <v-select :items="getCatalogos[1]" append-icon="far fa-angle-down" item-text="text"
                item-value="id" v-model="grupoSelected" label="Grupo:" :disabled="carreraSelected==undefined"
                    v-on:change="consultarCatalogo(grupoSelected, 'nothing')" progress >
                </v-select>
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
//import vSelect from 'vue-select'

export default {
    created(){
        this.$store.dispatch('setLoading', true);
    },
    mounted() {
        
        /*this.$store
        .dispatch("validarToken2")
        .then(data => {
            this.token = data;
        })
        .then(() => {*/
        let params = {catalogos:[{cveCatalogo:'PLT'}]};
        let cat = this.catalogs;
        notificacionServices.getCatalogoGenerico(params,this.token )
            .then((data) => {
                data.respuesta.forEach((item, index) => {
                    this.catalogs.push(item.respuesta);
                    
                })
            })
        this.$store.dispatch('setLoading', false);    
        /*})
        .catch((error)=>{
            console.log(error);
            this.$store.dispatch('setLoading', false);
        })*/
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
            carreraSelected: undefined,
        grupo: [],
            grupoSelected: undefined,
        
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
      }
    },

  methods: {
    consultarCatalogo(filtro, catalogo) {
        this.$store.dispatch('setLoading', true);
        setTimeout(() => {
            console.log("se ha ejecutado por completo el filtro " + filtro + " por el catalogo " + catalogo );
            this.$store.dispatch('setLoading', false);
      }, 3500);
    },
    cargaCatalogos(catalogo){
        let params = {catalogos:[{cveCatalogo:catalogo}]};
        let cat = this.catalogos;
        notificacionServices.getCatalogoGenerico(params,this.token )
            .then((data) => {
                data.respuesta.forEach((item, index) => {
                    cat[item.mensaje] = item.respuesta;
                    
                })
            }).then(()=>{
                return cat;
            })
    },
    
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
    
  }
};
</script>

<style>

</style>