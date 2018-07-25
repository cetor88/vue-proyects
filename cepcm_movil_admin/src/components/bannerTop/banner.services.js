import CONS from '../utils/constantes.js'


export default {
    obtenerBanners(){
        
        return new Promise((resolve, reject) =>{
            let ref = CONS.db.ref(CONS.rutaBannerTopFirebase);
            ref.on('value',snapshot=>{
                resolve(snapshot.val());
            } )            
        })
        .catch(function(){
            console.log("Ocurrio un error!!");
            reject(null);
        })
    },
    agregarBanner(urlDowload, redirect, fileName){
        return new Promise((resolve, reject) => {
            this.obtenerReferenciaFB().then((data)=>{
                let ref = CONS.db.ref(CONS.rutaBannerTopFirebase + data);
                ref.set({url:urlDowload, redirect:redirect, name:fileName})
            }).then(()=>{
                this.actualizarFechaHeaders();
                resolve("ok")
            })
        })
    },
    obtenerReferenciaFB(param) {
        return new Promise((resolve) => {
            let ref = CONS.db.ref(CONS.rutaBannerTopFirebase);
            var dato = {
              "url": "",
              "redirect": ""
            };
            resolve(ref.push(dato).key);
          })
    },

    actualizarFechaHeaders(){
        let ref = CONS.db.ref(CONS.rutaBannerTopFB);
        ref.update({fechaActualizacion:new Date().getTime()})
    },

    eliminaHeader(fileName, idFirebase){
        return new Promise((resolve, reject) => {
            this.eliminarHeaderStorage(fileName).then((data)=>{
                console.log("eliminado de storage " + fileName);
            }).then(()=>{
                this.eliminaHeaderDataBase(idFirebase).then((data)=>{
                    console.log("eliminado de storage " + idFirebase);
                })
            }).then(()=>{
                console.log("finaliza delete")
                this.actualizarFechaHeaders();
                resolve("ok");
            })
        })
    },
    eliminarHeaderStorage(fileName){
        return new Promise((resolve, reject) => {
            let ref = CONS.storage.ref(CONS.rutaBannerStorage + fileName);
            ref.delete().then(()=> {
                resolve("ok")
            }).catch((error)=> {
                reject(null);
            });
        })
    },

    eliminaHeaderDataBase(idFirebase){
        return new Promise((resolve, reject) => {
            let ref = CONS.db.ref(CONS.rutaBannerTopFirebase + idFirebase);
            ref.remove().then(()=> {
                resolve("ok")
            }).catch((error)=> {
                reject(null);
            });
        })
    }


}
