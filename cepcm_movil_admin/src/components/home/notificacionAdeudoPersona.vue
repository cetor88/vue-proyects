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
            <!--v-flex xs6  offset-xs3>
                <v-select  v-bind:items="getCatalogos.PLT" append-icon="far fa-angle-down" item-text="descripcion"
                item-value="id" v-model="plantelSelected" label="Plantel:" 
                     v-on:change="consultarCatalogo(plantelSelected, 'nivelAcademico')">
                </v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select  v-bind:items="getCatalogos.NVL" append-icon="far fa-angle-down" item-text="descripcion"
                item-value="id" v-model="nivelAcademicoSelected" label="Nivel academico:"
                    v-on:change="consultarCatalogo(nivelAcademicoSelected, 'carrera')" >
                </v-select>
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select :items="carrera" append-icon="far fa-angle-down"
                    v-model="carreraSelected" label="Carrera:" :disabled="nivelAcademicoSelected==undefined"
                    v-on:change="consultarCatalogo(carreraSelected, 'grupo')" >
                </v-select>  
            </v-flex>            
            <v-flex xs6  offset-xs3>
                <v-select :items="grupo" append-icon="far fa-angle-down"
                    v-model="grupoSelected" label="Grupo:" :disabled="carreraSelected==undefined"
                    v-on:change="consultarCatalogo(grupoSelected, 'nothing')" progress >
                </v-select>  
            </v-flex -->
            <v-flex xs6  offset-xs3>
            <v-select :value.sync="plantelSelected" :options="options" ></v-select>
            </v-flex >
        </v-layout>
    </v-form>
     <v-flex>
                
                <pre>{{getCatalogos}}</pre>
            </v-flex>
  </v-container>  

</template>
<script>
import { mapState, mapGetters } from "vuex"
import notificacionServices from "./notificacion.grupo.adeudo.services"
import vSelect from 'vue-select'

export default {
    created() {
        //this.$store.dispatch('setLoading', true);
        /*this.$store
        .dispatch("validarToken2")
        .then(data => {
            this.token = data;
        })
        .then(() => {*/
        
        //this.$store.dispatch('setLoading', false);    
        /*})
        .catch((error)=>{
            console.log(error);
            this.$store.dispatch('setLoading', false);
        })*/
    },
  components: {vSelect,},
  data() {
    return {
        token: "",
        catalogos:[],
        plantel: [],
            plantelSelected: undefined,
        nivelAcademico: [],
            nivelAcademicoSelected: undefined,
        carrera: [],
            carreraSelected: undefined,
        grupo: [],
            grupoSelected: undefined,
        
        selected: null,
        options: [{label:'foo', value:1},{label:'bar', value:2},{label:'baz', value:3}]
    };
  },/*
  watch: {
    catalogos: function (val) {
        debugger;
      this.catalogos = val;
    },
  },*/
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
    }
  },
  computed:{
    getCatalogos: function(){
          
          this.catalogos = this.cargaCatalogos('PLT');
          return this.catalogos;
    }

  }
};
</script>

<style>

</style>