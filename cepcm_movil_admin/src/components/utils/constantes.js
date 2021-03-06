var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

//http://10.64.8.52:8083/CEPCM_MOVIL/oauth/token

var ipOrigen ='http://187.190.149.140:8083/';


//var ipOrigen ='http://c022377:8083/';
export default {
    //urlGetToken:            ipOrigen + 'CEPCM_MOVIL/oauth/token?grant_type=password&client_id=restapp&client_secret=restapp&username=2&password=yhTo7LRvI2dvFxReUqzAxspzZi02', //GET
    urlGetToken:            ipOrigen + 'CEPCM_MOVIL/oauth/token', //POST
    
    //urlRefreshToken :       ipOrigen + 'CEPCM_MOVIL/oauth/token?grant_type=refresh_token&client_id=restapp&client_secret=restapp&refresh_token=',//GET
    
    /* notificacion por persona */
    urlImagenesPorTipo:     ipOrigen + 'CEPCM_MOVIL/api/imagenController/obtnerImagenesPorTipo',//?id_tipo=1&access_token=52c18d1f-b7ce-4bc7-8a58-016fff2864eb', GET

    urlImagenes:     ipOrigen + 'CEPCM_MOVIL/api/imagenController/obtnerImagenesParaNotificaciones',//?id_tipo=1&access_token=52c18d1f-b7ce-4bc7-8a58-016fff2864eb', GET

    urlBusqAlumnosPorFiltro:ipOrigen + 'CEPCM_MOVIL/api/alumnoController/busquedaPorNombre',//?filtro=CASTRO&access_token=d2c2beed-6941-404d-a95c-747649c2b021',    GET
    
    urlBusqAlumnosPorId:    ipOrigen + 'CEPCM_MOVIL/api/alumnoController/busquedaPorId',//?id=16549&access_token=267dd877-d673-4af4-8e80-1e981f559b92', GET
    
    urlEnvioNotificacion:   ipOrigen + 'CEPCM_MOVIL/api/notificacionController/enviarNotificacion',//?access_token=b4c5d55a-8d95-4b04-b237-0621044f7d5c', POST
    
    urlBusqAlumnoConDispositivo:   ipOrigen + 'CEPCM_MOVIL/api/alumnoController/busquedaPorNombreConDispositivo',
    
    urlNotificacionaDispositivos: ipOrigen + 'CEPCM_MOVIL/api/notificacionController/enviarNotificaciones',
    /* end */
    /* notificacion por grupos */
    
    urlConsultaCatalogos: ipOrigen + 'CEPCM_MOVIL/api/catalogosController/obtenerMultiplesCatalogosSimples',//?access_token=b4c5d55a-8d95-4b04-b237-0621044f7d5c', POST

    urlConsultaCarrera: ipOrigen + 'CEPCM_MOVIL/api/carreraController/busquedaPorNivelFiltros',//?idNivel=3&filtro=DAES&access_token=40a5036a-11b1-430e-917d-f6ff23fc019b
    
    urlConsultaGrupo: ipOrigen + 'CEPCM_MOVIL/api/grupoController/busquedaPorPlantelCarrera',//?idPlantel=3&idCarrera=1&access_token=59a5fee0-f33e-4da6-b334-5b3141f6a222

    urlConsultaDeudor: ipOrigen + 'CEPCM_MOVIL/api/deudoresController/obtenerDeudoresColegiaturasPorGrupo',//?idGrupo=972&access_token=62f755c0-08c8-4235-a2a3-4f5981f1cae7

    urlGenerarReporte: ipOrigen + 'CEPCM_MOVIL/api/reportesJasperController/obtenerReporteDeudoresPorGrupo', //?access_token=b5156dae-5cf7-4530-bcdd-69c95b8d26d9', POST
    
    urlObtenerMoudlosFB: ipOrigen + 'CEPCM_MOVIL/api/modulosController/obtnerModulosPorAplicacion?idAplicacion=1&access_token=',//650af496-8b6d-40c6-b265-20353cc859ac

    urlGuardaBloqueoDesbloqueo: ipOrigen + 'CEPCM_MOVIL/api/controlAccesoModuloController/persistirAccesoModulo?access_token=',//650af496-8b6d-40c6-b265-20353cc859ac POST

    urlBuscarAlumnosGrupo: ipOrigen + 'CEPCM_MOVIL/api/alumnoController/obtenerAlumnosPorGrupo?',//=1&access_token=b1080caa-6a7e-4992-a92f-a6cffcf7b3d7'

    rutaBannerTopFirebase : "configuracion/aplicacionAlumnos/configuracion/bannerTop/banners/",
    
    rutaBannerTopFB:'configuracion/aplicacionAlumnos/configuracion/bannerTop/',
    rutaBannerStorage: '/app/bannerTop/banner/',

    rutaUsuariosFb:'/usuarios/',
    /* end */

    firebaseApp : firebase.initializeApp({
                    apiKey: "AIzaSyCh5fyrqt_djN4OTAI2Rrsej1gdZdI6OII",
                    authDomain: "colposgrado-edu-mx.firebaseapp.com",
                    databaseURL: "https://colposgrado-edu-mx.firebaseio.com",
                    projectId: "colposgrado-edu-mx",
                    storageBucket: "colposgrado-edu-mx.appspot.com",
                    messagingSenderId: "732616378596"
                }),
    db : firebase.database(),
    auth : firebase.auth(),
    storage: firebase.storage(),
    
}