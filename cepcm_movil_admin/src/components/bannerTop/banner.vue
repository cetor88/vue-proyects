<template>
    <div>
        <v-toolbar color="primary" dark>
            <v-toolbar-title>Configuración de banners</v-toolbar-title>
            
            <v-spacer></v-spacer>
            
        </v-toolbar>
        <v-flex>
            <v-layout>
                <v-carousel :interval="0">
                    <v-carousel-item v-for="(item,i) in items" :src="item.url" :key="i">
                        <v-speed-dial direction="bottom">
    
                        <v-btn fab dark large slot="activator" color="primary" fabhoverv-model="fab">
                          <v-icon aria-label="bars" class="md-fab">fa fa-bars</v-icon>
                        </v-btn>
    
                        
                        <v-btn fab dark large color="primary">
                          <v-icon class="md-fab md-mini md-warn fa fa-search"></v-icon>
                        </v-btn>
    
                      </v-speed-dial>

                    </v-carousel-item>
                </v-carousel>
            </v-layout>

        </v-flex>
        <v-flex  xs12 flexbox>
            <v-card>
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <v-flex v-bind="{ [`xs12 sm3`]: true }" v-for="file in archivos" :key="file.refDocument">

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
    </div>

</template>

<script>
 
    import CONS from '../utils/constantes.js'

    import bannerServices from "./banner.services";
    export default {
        name:'banner',
        data(){
            return {
                archivos: [{
                    refDocument:0,
                    banderaTermino:false,
                    porcentUpload:0
                }],
                items: []
            }
        },
        methods:{
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
            }
        },
        computed: {
            getNextDocument(){
                return this.refDocument++;
            },
            porcentaje(){
                return this.porcentUpload;
            }
        },
        mounted(){
            bannerServices.obtenerBanners()
            .then( (data) =>{
                this.items = data;
            })
        }

        
    }
</script>

