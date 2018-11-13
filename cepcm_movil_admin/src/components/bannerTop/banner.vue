<template>
    <v-container text-xs-center>
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Configuración de banners</v-toolbar-title>
            
            <v-spacer></v-spacer>
        </v-toolbar>
        
            <v-layout row wrap>
                <v-flex xs12 flexbox>
                    <v-container>
                        <v-card active-class="active" :hover="true" :light="false">
                            <v-card-media :src="watchUrl.url" height="500px">
                                <v-layout column class="media">
                                <v-card-title>                                    
                                    <v-spacer></v-spacer>
                                     <v-speed-dial  :right="true" :top="true" 
                                        :open-on-hover="true" direction="bottom" transition="slide-y-reverse-transition" >
                                         <v-btn slot="activator"  color="yellow darken-2" dark fab >
                                            <v-icon>more_vert</v-icon>
                                            <v-icon>close</v-icon>
                                        </v-btn>

                                        <v-tooltip top>

                                            <v-btn dark icon class="mr-3" color="green" slot="activator"  @click="aplicarCambios()"> <!-- trigger($event, getNextDocument) -->
                                                <v-icon>play_arrow</v-icon>
                                            </v-btn>
                                            <span>Aplicar cambios</span>
                                        </v-tooltip>

                                        <v-tooltip top>

                                            <v-btn dark icon class="mr-3" color="pink" slot="activator"  @click="addHeader()"> <!-- trigger($event, getNextDocument) -->
                                                <v-icon>add</v-icon>
                                            </v-btn>
                                            <span>Agregar header</span>
                                        </v-tooltip>

                                        <v-tooltip top>
                                            <v-btn fab dark small color="red" slot="activator" @click="deleteHeader($event, watchUrl)">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                            <span>Eliminar header</span>
                                        </v-tooltip>

                                    </v-speed-dial>
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-card-title class="white--text pl-5 pt-5">
                                    <v-btn dark icon class="mr-3" color="pink" @click="back($event, watchUrl)">
                                        <v-icon >chevron_left</v-icon>
                                    </v-btn>
                                    <v-btn dark icon class="mr-3" color="pink" @click="next($event, watchUrl)">
                                        <v-icon >chevron_right</v-icon>
                                    </v-btn>
                                    
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn :class="{active: item.id == watchUrl.index}" fab small dark color="primary" v-for="item in this.items"
                                        @click="goo($event, item.id)" :key="item.id" > 
                                        <v-icon :class="{active: item.id == watchUrl.index}" dark >flag</v-icon>
                                        {{item.id + 1 }}
                                    </v-btn>
                                </v-card-actions>
                                </v-layout>
                            </v-card-media>
                        </v-card>
                    </v-container>
                </v-flex >
                
            </v-layout>
           
        <v-flex>
            <mensajeDlg  @cerrarDlg="cerrarMensajeDlg" v-if="getMensajesProps.modelo" :propiedades="getMensajesProps" ></mensajeDlg>
            <heradersDlg @cancelDlg="cancelHeader" v-if="getHeaderProps.modelo" :propiedades="getHeaderProps"></heradersDlg>
        </v-flex>
    </v-container>

</template>

<script>
 
    import CONS from '../utils/constantes.js'

    import bannerServices from "./banner.services";

    import mensajeDlg from '../dialogo/mensajesDlg';

    import heradersDlg from '../dialogo/heradersDlg';

    export default {
        name:'banner',
        components: { mensajeDlg,  heradersDlg },
        data(){
            return {
                items: [],
                dialogo:{
                    titulo:'Resultado de la operación',
                    contenido:'',
                    tipo:'',
                    modelo:false,
                    idFireBase:'',
                    url:'',
                },
                watchUrl:{url:'', index:0},
                headerConfig:{
                    titulo:'Resultado de la operación',
                    contenido:'',
                    tipo:'',
                    option:'',
                    modelo:false,
                    item:{},
                    fileName:''
                }
            }
        },
        mounted(){
            this.$store.dispatch("setLoading", true);
            debugger;
            let ref = CONS.db.ref(CONS.rutaBannerTopFirebase);
            ref.on('value',(snapshot)=>{
                var result =[];
                Object.keys(snapshot.val()).map((value, item) =>{
                    let interSnapShot = snapshot.val()[value];
                    interSnapShot.idFireBase=value;
                    result.push(interSnapShot);
                });
                this.items = result;
                let index=0;
                result.filter((item)=>{
                    item.id=index;
                    index++;
                });
                
                this.watchUrl.url =this.items[0].url
                this.$store.dispatch("setLoading", false);
            } )  
        },
        
        methods:{
            cancelHeader(){
                this.headerConfig.option='';
                this.headerConfig.tipo = "";
                this.headerConfig.modelo = !this.headerConfig.modelo;
            },
            addHeader(){
                this.headerConfig.option='add';
                this.headerConfig.tipo = "green lighten-1";
                this.headerConfig.modelo = !this.headerConfig.modelo;
            },
            deleteHeader(event, itemUrl){
                debugger;
                this.headerConfig.option = 'delete';
                this.headerConfig.tipo = "red lighten-1";
                this.headerConfig.idFireBase = this.items[itemUrl.index].idFireBase;
                this.headerConfig.url = this.items[itemUrl.index].url;
                this.headerConfig.fileName = this.items[itemUrl.index].name;
                this.headerConfig.modelo = !this.headerConfig.modelo;
                
            },

            aplicarCambios(){
                console.log("aplicar cambios")
                this.headerConfig.option='apply';
                this.headerConfig.tipo = "green lighten-1";
                this.headerConfig.modelo = !this.headerConfig.modelo;
            },
            cerrarMensajeDlg(){
                this.dialogo.contenido = "";
                this.dialogo.tipo = "green";
                this.dialogo.modelo = !this.dialogo.modelo;
                this.$store.dispatch("setLoading", false);
            },
            next(event, itemUrl){
                if(  itemUrl.index + 1 < this.items.length){
                    this.watchUrl.url= this.items[itemUrl.index+1].url;
                    this.watchUrl.index= itemUrl.index+1;
                }else{
                    this.watchUrl.url= this.items[0].url;
                    this.watchUrl.index= 0;
                }
            },
            back(event, itemUrl){
                if(  itemUrl.index-1 !== -1){
                    this.watchUrl.url= this.items[itemUrl.index - 1].url;
                    this.watchUrl.index= itemUrl.index-1;
                }else{
                    this.watchUrl.url= this.items[this.items.length-1].url;
                    this.watchUrl.index= this.items.length-1;
                }
            },
            goo($event, index){
                this.watchUrl.url= this.items[index].url;
                this.watchUrl.index= index;
            }
    },
    computed: {
            porcentaje(){
                return this.porcentUpload;
            },
            getMensajesProps(){
                return this.dialogo;
            },

            getHeaderProps(){
                return this.headerConfig;
            },

            getImagenes(){
                return this.items
            }
        }

        
    }
</script>

<style >
    .card__media__background:before {
        /*content: 'This slide is active!';*/
        position: absolute;
        top: -18px;
        right: -18px;
        padding: 4px 25px;
        background: orange;
        color: #fff;
        font-size: 10px;
        transform: translateX(30%) rotate(45deg);
        transform-origin: 0 0;
        box-shadow: 0 0 9px rgba(0, 0, 0, 0.2);
    }
    .vueperslides__bullet {
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
        box-shadow: none;
        transition: 0.3s;
        width: 16px;
        height: 16px;
    }

    .vueperslides__bullet--active {
        background-color: #ff5252;
    }

    .vueperslides__bullet span {
        display: block;
        color: #fff;
        font-size: 10px;
        opacity: 0.8;
    }
    .card__media .card__media__background{
        opacity: .9;
        transition: visibility 0s,opacity .5s linear;
    }
    button.active {
        font-size: 25px;
        opacity: .5;
        transition: visibility 0s,opacity .1s linear;
        
    }   
    
</style>