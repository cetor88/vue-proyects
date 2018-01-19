var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

//var ipOrigen ='http://201.145.153.227/';
var ipOrigen ='http://c022377:8082/';
export default {
    urlGetToken:            ipOrigen + 'CEPCM_MOVIL/oauth/token?grant_type=password&client_id=restapp&client_secret=restapp&username=2&password=yhTo7LRvI2dvFxReUqzAxspzZi02', //GET
    urlRefreshToken :       ipOrigen + 'CEPCM_MOVIL/oauth/token?grant_type=refresh_token&client_id=restapp&client_secret=restapp&refresh_token=',//GET

    urlImagenesPorTipo:     ipOrigen + 'CEPCM_MOVIL/api/imagenController/obtnerImagenesPorTipo',//?id_tipo=1&access_token=52c18d1f-b7ce-4bc7-8a58-016fff2864eb', GET
    urlBusqAlumnosPorFiltro:ipOrigen + 'CEPCM_MOVIL/api/alumnoController/busquedaPorNombre',//?filtro=CASTRO&access_token=d2c2beed-6941-404d-a95c-747649c2b021',    GET
    
    urlBusqAlumnosPorId:    ipOrigen + 'CEPCM_MOVIL/api/alumnoController/busquedaPorId',//?id=16549&access_token=267dd877-d673-4af4-8e80-1e981f559b92', GET
    
    urlEnvioNotificacion:   ipOrigen + 'CEPCM_MOVIL/api/notificacionController/enviarNotificacion',//?access_token=b4c5d55a-8d95-4b04-b237-0621044f7d5c', POST

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
    
}