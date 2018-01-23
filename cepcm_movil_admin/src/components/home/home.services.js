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
        obtenerAlumnosPorFiltro(parametros){
            const params = new URLSearchParams()
            return new Promise((resolve, reject) =>{
                axios.get(CONS.urlBusqAlumnosPorFiltro,
                    {   params: parametros,
                        responseType: 'json'
                    }
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

        obtenerAlumnosPorId(parametros){
            const params = new URLSearchParams()
            return new Promise((resolve, reject) =>{
                axios.get(CONS.urlBusqAlumnosPorId,
                    {   params: parametros,
                        responseType: 'json'
                    }
                )
                .then((tokenResp) => {
                    if (tokenResp.data != undefined){
                      resolve(tokenResp.data.respuesta );
                    }else
                      reject(null);
                  })
                })
                .catch(function(err){
                    console.log("Ocurrio un error!!");
                    reject(null);
                })
        },

        guardarNotificacion(parametros){
            const params = new URLSearchParams()
            return new Promise((resolve, reject) =>{
                axios.post(CONS.urlEnvioNotificacion,
                    {   data: parametros,
                        responseType: 'json'
                    }
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

}