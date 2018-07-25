<template>
    <v-flex>
        <v-card>
            <v-dialog v-model="dialog" max-width="50%">
                <v-card>
                    <v-toolbar :color="conifg.tipo" dark>
                        <v-toolbar-title>{{conifg.titulo}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container grid-list-md text-xs-center v-if="conifg.option ==='add'" v-for="(file, id) in archivos" :key="id">
                                <v-layout row wrap>
                                    <v-flex xs2  >
                                        <v-subheader class="text-lg-center"> Url a redireccionar:</v-subheader>
                                    </v-flex>
                                    <v-flex xs10 sm10 md10>
                                        <v-text-field label="Url a redireccionar" :counter="150"  maxLength="150"  id="redirect"
                                            v-model="header.redirect" :disabled="file.porcentUpload == 100">
                                        </v-text-field>
                                    </v-flex>

                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs2  >
                                        <v-subheader class="text-lg-center"> Selecciona una imagen:</v-subheader>
                                    </v-flex>
                                    <v-flex xs10 sm10 md10>
                                        <div class="previewImage" @click="trigger($event)">
                                            <v-flex v-bind="{ [`xs12 sm12`]: true }" >
                                                <v-layout row wrap>
                                                    <v-flex xs12 v-if="file.porcentUpload != 100" >
                                                        <span >Haz click aquí para agregar una imagen</span>
                                                    </v-flex>
                                                    <v-flex xs12  >
                                                        <input id="inputTrigger" style="display:none;" type="file" @change="onFileSelected($event, file)" ref="fileInput">
                                                        <v-progress-circular :size="100" v-if="file.porcentUpload > 0 && file.porcentUpload < 100" 
                                                            :width="15" :rotate="90" :value="file.porcentUpload" color="red" >
                                                            {{ file.porcentUpload }}
                                                        </v-progress-circular>
                                                    </v-flex>
                                                    <v-flex xs12 v-if="file.porcentUpload == 100">
                                                        <v-layout row wrap>
                                                            <v-flex xs12 >
                                                                <span> Se ha subido con éxito el documento</span>
                                                            </v-flex>
                                                        </v-layout>
                                                        <v-layout row wrap>
                                                            <v-flex xs12 >
                                                                <v-avatar :tile="true" size="150px" color="grey lighten-4" >
                                                                    <img :src="file.url" alt="avatar">
                                                                </v-avatar>
                                                            </v-flex>
                                                        </v-layout>   
                                                    </v-flex>
                                                </v-layout>                                                
                                            </v-flex>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-container grid-list-md text-xs-center v-else >
                                <v-layout row wrap>
                                <v-flex xs12 sm12>
                                    <span>¿Éstas seguro de eliminar la imagen seleccionada?</span>
                                </v-flex>
                                <v-flex xs12 sm12>
                                    <v-avatar :tile="true" size="150px" color="grey lighten-4" >
                                        <img :src="conifg.url" alt="avatar">
                                    </v-avatar>   
                                </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-if="conifg.option ==='delete'" :color="conifg.tipo" dark @click="eliminar">Eliminar</v-btn>
                        <v-btn v-if="conifg.option ==='add'" :color="conifg.tipo" dark @click="cerrar">Aceptar</v-btn>
                        <v-btn v-if="conifg.option ==='delete'" :color="conifg.tipo" dark @click="cerrar">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-flex>
  
</template>


<script>
    import CONS from '../utils/constantes.js'

    import bannerServices from "../bannerTop/banner.services";

    export default {
        name:'heradersDlg',
        props:['propiedades'],
        data:()=> {
            return {
                dialog : true,
                conifg:{},
                valid:true,
                header:{imagen:'', redirect:''},
                archivos: [{
                    refDocument:0,
                    banderaTermino:false,
                    porcentUpload:0,
                    url:''
                }],
            }
        },
        methods: {
            cerrar(){
                debugger
                console.log("cerrar!!");
                this.$emit('cancelDlg')// llamar al padre para cerrar la modal
            },

            trigger:(event,)=>{
                document.getElementById("inputTrigger").click()
            },

            onFileSelected:(event, archivo)=>{
                return new Promise((resolve, reject) => {
                    this.banderaTermino = true;
                    document.getElementById("redirect").style.disabled=true;
                    //get file
                    let file = event.target.files[0];

                    //create a storage ref
                    let ref =  CONS.storage.ref(CONS.rutaBannerStorage + file.name);
                    //upload file
                    let task = ref.put(file);
                    //upload progress               
                    task.on('state_changed', (snapshot) =>{
                                    
                        archivo.porcentUpload = Math.ceil( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
                        console.log("archivo en proceso" + archivo.porcentUpload);
                    },  (error)=>{   
                        console.log("el archivo no pudo subir");
                    },  (complete) =>{
                        console.log("archivo subido");
                        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            console.log('File available at', downloadURL);
                            archivo.url = downloadURL;
                            bannerServices.agregarBanner(downloadURL, document.getElementById("redirect").value, file.name).then((data)=>{
                                
                                resolve("ok")
                                
                                
                            })
                        });
                    })
                })
            },
            
            eliminar(){
                bannerServices.eliminaHeader(this.conifg.fileName, this.conifg.idFireBase).then((data)=>{
                    console.log("finaliza eliminado de header")
                    this.$emit('cancelDlg')// llamar al padre para cerrar la modal
                })
            },
        },    
        mounted() {
            this.conifg = this.propiedades;

        },
        computed:{
            getNextDocument(){
                return this.refDocument++;
            },
        }
    }
</script>

<style>

    .previewImage {
        border-radius: 1%;
        border: dashed 2px #a0F0F0;
        padding: 20px 20px;
        cursor:pointer;
    }
</style>