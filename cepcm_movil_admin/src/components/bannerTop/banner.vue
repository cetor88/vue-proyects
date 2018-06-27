<template>
    <v-container text-xs-center>
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Configuración de banners</v-toolbar-title>
            
            <v-spacer></v-spacer>
            
        </v-toolbar>
        
            <v-layout row wrap>
                <v-flex xs4 flexbox>
                    <v-container>
                        <v-card>
                            <v-card-media :src="watchUrl" height="300px">
                                <v-layout column class="media">
                                <v-card-title>
                                    <v-btn dark icon>
                                    <v-icon>chevron_left</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn dark icon class="mr-3">
                                    <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn dark icon>
                                    <v-icon>more_vert</v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-card-title class="white--text pl-5 pt-5">
                                    <div class=" pl-5 pt-5">Configuración de banners</div>
                                </v-card-title>
                                </v-layout>
                            </v-card-media>
                            <v-list two-line>

                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="indigo">phone</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                                        <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-icon>chat</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                                
                                <v-divider inset></v-divider>

                            </v-list>
                            </v-card>
                    </v-container>
                </v-flex >
                <v-flex xs8 flexbox>
                    <vueper-slides :slide-ratio="0.5" :infinite="false" disableArrowsOnEdges 
                        :slide-content-outside="true" :parallax="1" @ready="readyMethod" @slide="slideMethod">
                        <vueper-slide v-for="(item, i) in getImagenes" :key="item.id" :image="item.url" :title="item.url" 
                            :watchUrl="item.url">
                        </vueper-slide>
                    </vueper-slides>
                </v-flex>
            </v-layout>
            
        <v-flex  xs12 flexbox>
            <v-card>
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <v-flex v-bind="{ [`xs12 sm3`]: true }" v-for="(file, id) in archivos" :key="id">

                    <div class="upload">
                        <div @click="trigger($event, getNextDocument)" >Selecciona un archivo</div>
                        <input :id="getNextDocument" style="display:none;" type="file" @change="onFileSelected($event, file)" ref="fileInput">
                        <!--button style="display:none;" color="primary"  @click="onUpload($event, file)">Subir documentos</button-->
                    
                        <v-progress-circular :size="100" v-if="file.porcentUpload > 0 && file.porcentUpload < 100" :width="15" :rotate="90" :value="file.porcentUpload" color="red" >
                            {{ file.porcentUpload }}
                        </v-progress-circular>
                    </div>

                    </v-flex>
                </v-layout>
            </v-container>
            </v-card>
        </v-flex>
        <v-flex>
            <mensajeDlg  @cerrarDlg="cerrarMensajeDlg" v-if="getMensajesProps.modelo" :propiedades="getMensajesProps" ></mensajeDlg>

        </v-flex>
    </v-container>

</template>

<script>
 
    import CONS from '../utils/constantes.js'

    import bannerServices from "./banner.services";

    import mensajeDlg from '../dialogo/mensajesDlg';

    import { VueperSlides, VueperSlide } from 'vueperslides'

    export default {
        name:'banner',
        components: { mensajeDlg,  VueperSlides, VueperSlide  },
        data(){
            return {
                archivos: [{
                    refDocument:0,
                    banderaTermino:false,
                    porcentUpload:0
                }],
                items: [],
                dialogo:{
                    titulo:'Resultado de la operación',
                    contenido:'',
                    tipo:'',
                    modelo:false
                },
                watchUrl:''
            }
        },
        mounted(){
            this.$store.dispatch("setLoading", true);
            bannerServices.obtenerBanners().then( (data) =>{

                var result =[];
                Object.keys(data).map(function(value, item) {
                    
                    result.push(data[value]);
                });
                result.filter((item)=>{
                    let index=0;
                    item.id=index;
                    this.items.push(item);
                    index++;
                });
                this.$store.dispatch("setLoading", false);
            });

            
        },
        
        methods:{
            cerrarMensajeDlg(){        
                this.dialogo.contenido = "";
                this.dialogo.tipo = "";
                this.dialogo.modelo = !this.dialogo.modelo;
                this.$store.dispatch("setLoading", false);
            },  
            trigger:(event, idClick)=>{
                document.getElementById(idClick).click()
            },
            onFileSelected:(event, archivo)=>{
                debugger;
                this.banderaTermino = true;
                //get file
                let file = event.target.files[0];

                //create a storage ref
                let ref =  CONS.storage.ref('/app/bannerTop/banner/' +file.name);
                
                //upload file
                let task = ref.put(file);


                //upload progress               
                task.on('state_changed', (snapshot) =>{
                    debugger;                     
                    archivo.porcentUpload = Math.ceil( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
                
                    
                    console.log("archivo en proceso" + archivo.porcentUpload);
                },  (error)=>{   
                    console.log("el archivo no pudo subir");
                },  (complete) =>{
                    console.log("archivo subido");

                })
            },
            readyMethod(event, item){
                debugger;
            },
            slideMethod:(event, idItem)=>{
                
                this.watchUrl = idItem.currentSlide.title;
                debugger;
                
            }
    },
    computed: {
            getNextDocument(){
                return this.refDocument++;
            },
            porcentaje(){
                return this.porcentUpload;
            },
            getMensajesProps(){
                return this.dialogo;
            },
            getImagenes(){
                return this.items
            }
        }

        
    }
</script>

<style >
    .vueperslides__slide--active:before {
        content: 'This slide is active!';
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
</style>