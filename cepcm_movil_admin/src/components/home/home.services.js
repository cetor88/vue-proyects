import axios from 'axios';
import CONS from '../utils/constantes.js'


export default {
        obtenerImagenes(parametros){
            const params = new URLSearchParams()
            return new Promise((resolve, reject) =>{
                axios.get(CONS.urlImagenesPorTipo,
                    {   params: parametros,
                        responseType: 'json'
                    }
                )
                .then((tokenResp) => {
                    if (tokenResp.data != undefined){
                      resolve("ok");
                    }else
                      reject(null);
                  })
                })
                .catch(function(err){
                    console.log("Ocurrio un error!!");
                    reject(null);
                })
        },

}