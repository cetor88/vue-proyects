import CONS from '../utils/constantes.js'


export default {
    obtenerUsuario(uid){
        
        return new Promise((resolve, reject) =>{
            let ref = CONS.db.ref(CONS.rutaUsuariosFb + uid);
            ref.on('value',snapshot=>{
                if(snapshot.val() != null){
                    resolve(snapshot.val());
                }else{
                    reject(null);
                }
                    
            } )            
        })
    }


}
