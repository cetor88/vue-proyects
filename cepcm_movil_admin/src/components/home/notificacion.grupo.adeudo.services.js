import axios from 'axios'
import CONS from '../utils/constantes.js'


export default {
    getCatalogoGenerico(parametros, token) {
        
        const params = new URLSearchParams()
        return new Promise((resolve, reject) =>{
            let catalogos=[];
            catalogos.code=0;
            catalogos.mensaje="exito"
            catalogos.respuesta=[];
            
            let plantel = [{value:'ABA', label:'Abandono'},{value:'ABE', label:'Abeja'},{value:'ABO', label:'Abordado'},{value:'ABU', label:'Aburrido'}];
            let nvlAcademico=[{value:1, label:'Basico'},{value:2, label:'Intermedio'},{value:3, label:'Avanzado'},{value:4, label:'Experto'}];
            setTimeout(() => {
                catalogos.respuesta.push({code: 0, mensaje: "PLT", respuesta : plantel})
                catalogos.respuesta.push({code: 0, mensaje: "NVL", respuesta : nvlAcademico})
                resolve(catalogos );
            }, 500);
        })
            /*axios.post(CONS.urlConsultaCatalogos + "?access_token=" + token,
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
            })*/
            
    },

}