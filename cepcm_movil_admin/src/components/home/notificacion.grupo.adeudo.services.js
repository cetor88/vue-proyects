import axios from 'axios'
import CONS from '../utils/constantes.js'


export default {
    getCatalogoGenerico(parametros, token) {
        
        //const params = new URLSearchParams()
        return new Promise((resolve, reject) =>{
           
            axios.post(CONS.urlConsultaCatalogos + "?access_token=" + token,
                parametros
            )
            .then((tokenResp) => {
                if (tokenResp.data.codigo == 0 ){
                  resolve(tokenResp.data );
                }else
                  reject(null);
              })
            })
            .catch(function(err){
                console.log("Ocurrio un error!!");
                reject(null);
            })
            
    },
    getCatalogoDependiente(parametros, url) {
        //const params = new URLSearchParams()
        return new Promise((resolve, reject) =>{
            axios.get(url, 
                {   params: parametros,
                    responseType: 'json'
                }
            )
            .then((tokenResp) => {
                if (tokenResp.data.codigo == 0 ){
                  resolve(tokenResp.data );
                }else
                  reject(null);
              })
            })
            .catch(function(err){
                console.log("Ocurrio un error!!");
                reject(null);
            })
    },
    enviarPostGeneric(url, parametros, token){

        //const params = new URLSearchParams()
        return new Promise((resolve, reject) =>{
            axios.post( url + "?access_token=" + token,
                parametros
            )
            .then((tokenResp) => {
                if (tokenResp.data != undefined){
                    resolve(tokenResp.data );
                }else
                    reject(null);
                })
            })
            .catch(function(err){
                console.log("Ocurrio un error!!");
                reject(null);
            })
    },

    actualizarModuloFirebase(mensaje, modulo, estado){
        return new Promise((resolve, reject) =>{

            let ref = CONS.db.ref("alumnos/nFD9JOWG3Ab6Br1DkrSZz73AwqK2/configuracion/modulos/" + modulo.toLowerCase() );
            let update= {bloquear_acceso:estado, mensaje:mensaje};
            ref.update(update)
            .then((response)=>{
                resolve(true );
                
            })  
        })
        .catch(function(err){
            console.log("Ocurrio un error!!");
            reject(null);
        })
    }
}