import axios from 'axios'
import CONS from '../utils/constantes.js'


export default {
    getCatalogoGenerico(parametros, token) {
        
        const params = new URLSearchParams()
        return new Promise((resolve, reject) =>{
            /*let catalogos=[];
            catalogos.code=0;
            catalogos.mensaje="exito"
            catalogos.respuesta=[];
            
            let plantel = [{id:'ABA', text:'Abandono'},{id:'ABE', text:'Abeja'},{id:'ABO', text:'Abordado'},{id:'ABU', text:'Aburrido'}];
            let nvlAcademico=[{id:1, text:'Basico'},{id:2, text:'Intermedio'},{id:3, text:'Avanzado'},{id:4, text:'Experto'}];
            setTimeout(() => {
                catalogos.respuesta.push({code: 0, mensaje: "PLT", respuesta : plantel})
                catalogos.respuesta.push({code: 0, mensaje: "NVL", respuesta : nvlAcademico})
                resolve(catalogos );
            }, 3500);
        })*/
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
        const params = new URLSearchParams()
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

    /*getDeudores(parametros, url) {
        const params = new URLSearchParams()
        return new Promise((resolve, reject) =>{
            axios.get(CONS.urlConsultaGrupo,
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
    },*/

}