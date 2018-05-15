import axios from 'axios';
import CONS from '../utils/constantes.js'


export default {
    obtenerBanners(){
        return new Promise((resolve, reject) =>{

            let ref = CONS.db.ref("configuracion/aplicacionAlumnos/bannerTop/banners/");
            ref.on('value',snapshot=>{
                console.log( " snapshot ->" + snapshot.val());
                debugger;
                resolve(snapshot.val());
            } )            

        })
        .catch(function(err){
            console.log("Ocurrio un error!!");
            reject(null);
        })
    }
}
