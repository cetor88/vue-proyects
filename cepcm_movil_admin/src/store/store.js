import Vue from 'vue';
import Vuex from 'vuex';
import CONSTANTES from '../components/utils/constantes'

import { loadState, saveState, removeState } from '../utils/localStorage'
Vue.use(Vuex);

import axios from 'axios';
export const store = new Vuex.Store({

  state: {
    cantidad: 0,
    db: CONSTANTES.db,
    auth: CONSTANTES.auth,
    autenticado: loadState('autenticado'),
    currentUser: loadState('currentUser') || null,
    tokn: loadState('token') || { value: null, refresh: {value:''}, expiraEn: null },
    loading: false,
  },


  mutations: {
    setToken: (state, tokenResp) => {
      
        state.tokn.value = tokenResp.access_token,
        state.tokn.refresh = tokenResp.refresh_token,
        state.tokn.expiraEn = Math.floor(new Date().getTime() + (tokenResp.expires_in * 1000))
      saveState('token', state.tokn);
    },

    setSuccess: (state, esAutenticado) => {
      state.autenticado = esAutenticado;
      saveState('autenticado', state.autenticado);
    },

    setLogout: (state) => {

      state.auth.signOut()
        .then(() => {
          removeState('autenticado');
          removeState('token')
          removeState('currentUser')

          state.currentUser = null;
        }).catch((error) => {
          console.log("no se pudo cerrar la session !!");
        })
    },

    setCurrentUser: (state, user) => {
      state.currentUser = user;
      saveState('currentUser', user);
    },

    setLoading: (state, bandera) => {
      state.loading = bandera;
    }

  },


  actions: {
    obtenerToken: (context, user) => {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('username', user == undefined ? 'hector.ht10@gmail.com': user.email);
        params.append('password', user == undefined ? 'lQjyIzVZXjUlxqog8qC5EeH5WJ23': user.uid);
        params.append('grant_type', 'password');
        let config={
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Y2xpZW50YXBwOjEyMzQ1Ng=='
          }
        }
        axios.post(CONSTANTES.urlGetToken, params, config).then((tokenResp) => {
          if (tokenResp.status == 200) {
            context.commit('setToken', tokenResp.data);
            context.commit('setSuccess', true);
            resolve(tokenResp.data);
            //return ;
          }else{
            context.commit('setToken', null);
            context.commit('setSuccess', false);
            reject(null);
            //return null;
          }
        }).catch(function (err) {
            console.log("servicio no disponible, token!!"+ err);
            //return err;
            reject(err);
        })
    })
  },
    refrescaToken: (context, token) => {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', token);
        let config={
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic Y2xpZW50YXBwOjEyMzQ1Ng=='
          }
        }
        axios.post(CONSTANTES.urlGetToken, params, config).then((tokenResp) => {
          if (tokenResp.status == 200) {
            context.commit('setToken', tokenResp.data);
            context.commit('setSuccess', true);
            resolve(tokenResp.data);
            //return tokenResp;
          }else{
            context.commit('setToken', null);
            context.commit('setSuccess', false);
            reject(null);
            //return null;
          }
        }).catch(function (err) {
            console.log("servicio no disponible, refresh token!!"+ err);
            reject(err);
            //return err;
          })
      }) 
    },

    validarToken2: (context) => { // se valida si el token ya expiro
    //si ya expiro se manda a llamar el token; se manda a llamar a refrescar el token; si el refresh falla, se intenta llamar al token; 
    //si el token sigue activo se regresa el token actual

      return new Promise((resolve, reject) => {
      
        let time = new Date().getTime();
        let expiro = time > context.state.tokn.expiraEn //si la fecha actual es mayor que expiraEn 
        
        if (expiro) {
          console.log("expiro el token");
          let tokenRefresh = context.getters.obtenerTokenRefresh;
          context.dispatch('refrescaToken', tokenRefresh).then((response) => {// se intenta obtener el token refresh
            debugger;
            if (response == null) {// si no se obtiene
              console.log("ocurrio un error al refrescar el token");
              debugger
              context.dispatch('obtenerToken');//se intenta obtener el token 
              resolve(context.getters.obtenerTokenActual);
            } else {
              console.log("Token refresh valido");
              debugger
              resolve(context.getters.obtenerTokenActual);
            }
          },(err)=>{
            //console.log("Servicio no disponible, por generar el token");
            //throw new Error("Servicio no disponible, favor de intentar más adelante");
            reject(err)
          })
        } else {
          console.log("El token sigue activo");
          resolve(context.getters.obtenerTokenActual);
          
        }
      })
    },

    cerrarSesion: (context) => {
      context.commit('setLogout');
    },

    iniciarUsuario: (context, user) => {
      context.commit('setCurrentUser', user);
    },

    setLoading: (context, bandera) => {
      context.commit('setLoading', bandera);
    }

  },


  getters: {

    validarToken: (state) => (time) => {
      let salida;
      if (state.tokn != null) {
        salida = time > state.tokn.expiraEn; //si la fecha actual es mayor que expiraEn 
      } else {
        salida = true;
      }
      console.log("caducado el token: " + salida);
      return salida;
    },

    obtenerTokenRefresh: (state) => {
      
      return state.tokn.refresh;
    },

    obtenerTokenActual: (state) => {

      return state.tokn.value;
    },

    obtenerCurrentUser: (state) => {
      return state.currentUser;
    },

    getLoadiong: (state) => {
      return state.loading;
    }

  }

})
