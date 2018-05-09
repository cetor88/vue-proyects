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

    actualizarModuloFirebase(mensaje ,obj){//}  modulo, estado, uid, token, item, dispositivo){
        return new Promise((resolve, reject) =>{
            
            let params = {
                idDispositivo: obj.dispositivo,
                idModulo:obj.item.id,
                idAccion:obj.bloqueo ? 2 : 1,//(1=desbloqueo,2=bloqueo) 
                observaciones:mensaje
            }

            let ref = CONS.db.ref("alumnos/"+obj.uid+"/configuracion/modulos/" + obj.modulo.toLowerCase() );
            let update= {bloquear_acceso : obj.bloqueo, mensaje : mensaje};
            ref.update(update)
            .then((response)=>{
                this.guardaBloqueoDesbloqueoModulos(params, obj.token).then((data)=>{
                    console.log("data-> " + data);
                    console.log("se persistio el modulo-> " + obj.modulo + " en el estado-> "+obj. estado);
                }).then(()=>{
                    resolve(true );
                })
                
            })  
        })
        .catch(function(err){
            console.log("Ocurrio un error!!");
            reject(null);
        })
    },

    obtenerModuloFirebase(uid){
        return new Promise((resolve, reject) =>{

            let ref = CONS.db.ref("alumnos/"+uid+"/configuracion/modulos/");
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
    },
    obtenerModuloFirebase2(token){
        let url = CONS.urlObtenerMoudlosFB;
        return new Promise((resolve, reject) =>{
            axios.get(url + token, 
                {  responseType: 'json'}
            )
            .then((resp) => {
                if (resp.data.codigo == 0 ){
                  resolve(resp.data.respuesta);
                }else
                  reject(null);
              })
            })
            .catch(function(err){
                console.log("Ocurrio un error!!");
                reject(null);
            })
    },
    guardaBloqueoDesbloqueoModulos(parametros, token){
        let url = CONS.urlGuardaBloqueoDesbloqueo;
        debugger;
        return new Promise((resolve, reject)=>{
            axios.post( url + token, parametros)
            .then((resp) => {
                debugger;
                if (resp.data != undefined){
                    resolve(resp.data );
                }else
                resolve(null);
                })
            })
            .catch(function(err){

                console.log("No se pudo guardar el la operacion!!");
                resolve(null);
            })
    }
}