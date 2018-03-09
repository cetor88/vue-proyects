<template>
    <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex>
                    <!--label for="query" class="queryLabel">{{label}}</label-->
                    <!--v-menu transition="fade-transition"-->
                        <!--input name="query" class="querySearch" required
                        :label="label" :value="queryString" @input="search($event.target.value)" ref="inputGeneric">
                        <div class="contenedorFlotante">
                            <select v-model="selecteded" class="flotante" >
                                <option v-for="obj  in listageneric" v-bind:value="obj.id">
                                    {{ obj.descripcion }}
                                </option>
                            </select-->
                    
                            <!--v-list >
                                <v-list-tile v-for="obj  in listageneric" @click="elegirItem(obj)" >
                                    <v-list-tile-title v-text="obj.descripcion" ></v-list-tile-title>
                                </v-list-tile>
                            </v-list-->
                            <!--template v-if="listageneric.length==0">
                                <span> No se encontraron registros</span>
                            </template>
                        </div-->
                     <!--/v-menu-->
                     <v-select v-model="selected" :options="['foo','bar']"></v-select>
                </v-flex>
            </v-layout>
    </v-container>
  
</template>

<script>
    import { mapState, mapGetters } from "vuex"
    import notificacionServices from "../notificacion.grupo.adeudo.services"
    import CONS from '../../utils/constantes.js'
    import Vue from 'vue'
    import vSelect from 'vue-select'
    Vue.component('v-select', vSelect)

export default {
    name:'mySelect',
    props:['label','list', 'model', 'propsReq'],
    data(){
        return{
            queryString:'',
            buscarCarrera : null,
            token:'',
            listageneric : [],
            selecteded:null,
            selected:null,
            //  search:null,
        }
    },       
    mounted(){
        this.listageneric = this.list
    },
    methods:{
        elegirItem(item){
            this.selecteded =item;
            this.queryString = item.descripcion;
        },
        search (val) {
            if(val){
                
                if(val.length > 3){
                    this.$store.dispatch('setLoading', true);
                    this.$store.dispatch('validarToken2')
                    .then((data)=>{
                        this.token = data;
                        let req = this.propsReq;
                        req["filtro"]=val;
                        req["access_token"]=this.token;
                        this.querySelections(req, CONS.urlConsultaCarrera);
                        this.queryString= val;

                    })
                    
                }
            }
        },
        querySelections (req, url) {
            notificacionServices.getCatalogoDependiente(req, url)
                .then((data) =>{
                    console.log(data);
                    if(data.respuesta != undefined){
                      this.listageneric = data.respuesta;
                      this.$store.dispatch('setLoading', false);
                    }
                    
                })
        },
    },
    computed:{
        getList(){
            return this.listageneric;
        }
    },

}
</script>

<style>
    .input-group-select{
        width: 100%;

    }
    input.querySearch{
        border-bottom: 1px solid;
        width: 100%;
        
    }
    input.querySearch:focus{
        outline: none;        
    }
    input.querySearch:focus + div.contenedorFlotante{
        display: block;
    }

    label.queryLabel {
        float: left;
        color: rgba(0,0,0,0.54);
    }
    .contenedorFlotante{
        z-index: 100;
        position: absolute;
        min-height: 50px;
        max-width: 100%;
        max-height: 100%;
        min-width: 43%;
        display: none;
    }
    .elemento{
        cursor: pointer;
        border-bottom: dashed 1px
    }

    .flotante{
        display: inline;
    }
</style>
