<template>
    <v-flex>
        <v-card>
            <v-dialog v-model="dialog" persistent max-width="50%">
                <v-card>
                    <v-toolbar :color="conifg.tipo" dark>
                        <v-toolbar-title>{{conifg.titulo}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container grid-list-md text-xs-center v-if="conifg.option ==='add'" v-for="(file, id) in archivos" :key="id">
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field label="Url a redireccionar" :counter="150"  maxLength="150"  id="redirect"
                                            v-model="header.redirect" >
                                        </v-text-field>
                                    </v-flex>

                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12  >
                                        <v-subheader class="text-lg-center"> Selecciona una imagen:</v-subheader>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <div class="previewImage" @click="trigger($event)">
                                            <v-flex v-bind="{ [`xs12 sm12`]: true }" >
                                                <v-layout row wrap>
                                                    <v-flex xs12 v-if="file.porcentUpload != 100" >
                                                        <span >Haz click aquí para agregar una imagen.</span>

                                                    </v-flex>
                                                    <v-flex xs12 >
                                                        <input id="inputTrigger" style="display:none;" :accept="aceptFiles" type="file" @change="obtenerImagen($event, file)" ref="fileInput">
                                                        <v-progress-circular :size="100" v-if="file.porcentUpload > 0 && file.porcentUpload < 100" 
                                                            :width="15" :rotate="90" :value="file.porcentUpload" color="red" >
                                                            {{ file.porcentUpload }}
                                                        </v-progress-circular>
                                                    </v-flex>
                                                    <v-flex xs12 v-if="file.base64 != ''">
                                                        <v-layout row wrap>
                                                            <v-flex xs12 >
                                                                <span> Previsualización de imagen</span>
                                                            </v-flex>
                                                        </v-layout>
                                                        <v-layout row wrap>
                                                            <v-flex xs12 >
                                                                <v-avatar :tile="true" size="200px" color="grey lighten-4" >
                                                                    <img :src="file.base64" alt="avatar">
                                                                </v-avatar>
                                                            </v-flex>
                                                        </v-layout>   
                                                    </v-flex>
                                                    
                                                    <v-flex xs12 v-if="file.width !== -1">
                                                        <v-alert type="error"  v-model="file.alertValidaDsipositivo" dismissible transition="scale-transition">
                                                            <div v-for="item in file.alertValidaMsg" :key="item" >
                                                                <span>{{item}}</span>
                                                            </div>
                                                        </v-alert>
                                                    </v-flex>
                                                </v-layout>                                                
                                            </v-flex>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>

                            <v-container grid-list-md text-xs-center v-else-if="conifg.option ==='apply'" >
                                <v-layout row wrap>
                                <v-flex xs12 sm12>
                                    <span>¿Éstas seguro de publicar los cambios?</span>
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
                        <v-btn v-if="conifg.option ==='delete'" :color="conifg.tipo" dark @click="cerrar">Cancelar</v-btn>

                        <v-btn v-if="conifg.option ==='add'" :color="conifg.tipo" dark @click="subirImagen">Aceptar</v-btn>
                        <v-btn v-if="conifg.option ==='add'" :color="conifg.tipo" dark @click="cerrar">Cancelar</v-btn>
                        
                        <v-btn v-if="conifg.option ==='apply'" :color="conifg.tipo" dark @click="aplicarCambios">Aceptar</v-btn>
                        <v-btn v-if="conifg.option ==='apply'" :color="conifg.tipo" dark @click="cerrar">Cancelar</v-btn>
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
                    url:'',
                    height:-1,
                    width:-1,
                    alertValidaDsipositivo:false,
                    alertValidaMsg:[],
                    base64:'',
                    file:''
                }],
                aceptFiles:'image/jpg image/png'
            }
        },
        methods: {
            cerrar(){
                console.log("cerrar!!");
                this.$emit('cancelDlg')// llamar al padre para cerrar la modal
            },

            trigger:(event,)=>{
                document.getElementById("inputTrigger").click()
            },

            obtenerImagen:(event, archivo)=>{
                let file = event.target.files[0];
                if(file != undefined){
                    
                    return new Promise (function (resolved, rejected) {
                        var reader = new FileReader();
                        reader.onload = function(){
                            var img = new Image();
                            img.onload = function() {
                                var width = img.naturalWidth, height= img.naturalHeight;
                                archivo.width = width;
                                archivo.height = height;
                                
                            };
                        }
                        reader.onloadend = function(){
                            archivo.base64 = reader.result;
                        }
                        reader.readAsDataURL(file);
                        archivo.file = file;
                    })
                }
                
            },

            subirImagen(){
                let file = this.archivos[0];
                file.redirect = this.header.redirect;
                let ref =  CONS.storage.ref(CONS.rutaBannerStorage + file.file.name);
                let task = ref.put(file.file);
                task.on('state_changed', (snapshot) =>{
                                
                    file.porcentUpload = Math.ceil( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
                    console.log("archivo en proceso" + file.porcentUpload);
                },  (error)=>{   
                    console.log("el archivo no pudo subir");
                },  (complete) =>{
                        console.log("archivo subido");
                        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            console.log('File available at', downloadURL);
                            file.url = downloadURL;
                            bannerServices.agregarBanner(downloadURL, file.redirect, file.file.name).then((data)=>{
                                resolve("ok")
                                
                            })
                        })
                        this.$emit('cancelDlg')// llamar al padre para cerrar la modal
                    })
            },
            /*onFileSelected:(event, archivo)=>{
                var _URL = window.URL || window.webkitURL;
                archivo.alertValidaMsg=[];

                return new Promise((resolve, reject) => {
                    this.banderaTermino = true;
                    document.getElementById("redirect").style.disabled=true;
                    
                    let file = event.target.files[0];
                    if(file != undefined){
                        var reader = new FileReader();
                        reader.onload =  (e)=> {
                            var img = new Image();
                            img.src = reader.result;
                            img.onload = ()=> {
                                var width = img.naturalWidth,
                                height = img.naturalHeight;

                                archivo.width = width;
                                archivo.height = height;                                
                                if( (width >= 400 && width <= 1000) && (height >= 300 && height <=1000) ) {
                                    console.log("tamaño correcto")
                                    let ref =  CONS.storage.ref(CONS.rutaBannerStorage + file.name);
                                    let task = ref.put(file);
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
                                }
                                else {
                                    console.log("el archivo debe ser mayor " + archivo)
                                    archivo.alertValidaMsg.push("1.- Las dimensiones del archivo no son válidas.",
                                        " 2.- Verificar que el ancho sea de 400px y la altura igual a 300px.",
                                        "3.- El formato válido es JPG.");
                                    archivo.alertValidaDsipositivo = true;
                                }
                            }
                            //img.src = reader.result;
                        }
                        reader.readAsDataURL(file);
                    }
                })
                
            },*/
            
            eliminar(){
                debugger;
                bannerServices.eliminaHeader(this.conifg.fileName, this.conifg.idFireBase).then((data)=>{
                    console.log("finaliza eliminado de header")
                })
                    this.$emit('cancelDlg')// llamar al padre para cerrar la modal
            },
            aplicarCambios(){
                debugger;
                bannerServices.actualizarFechaHeaders().then( (data)=>{
                    console.log("Se han aplicado con éxito los cambios" + data );
                })
                    this.$emit('cancelDlg')// llamar al padre para cerrar la modal
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