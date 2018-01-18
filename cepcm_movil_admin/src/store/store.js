import Vue from 'vue';
import Vuex from 'vuex';
import CONSTANTES from '../components/utils/constantes'

import {loadState, saveState, removeState} from '../utils/localStorage'
Vue.use(Vuex);

import axios from 'axios';
export const store = new Vuex.Store({

  state: {
    cantidad: 0,
    db: CONSTANTES.db,
    auth: CONSTANTES.auth, 
    autenticado:  loadState('autenticado') ,
    currentUser: loadState('currentUser') || null,
    tokn: loadState('token') || {value:null, refresh:null, expiraEn:null},
  },
  mutations: {
    setToken: (state, tokenResp) => {

        state.tokn.value = tokenResp.value,
        state.tokn.refresh = tokenResp.refreshToken,
        state.tokn.expiraEn = Math.floor(new Date().getTime() + (tokenResp.expiresIn * 1000))
        saveState('token',state.tokn);
    },

    setSuccess: (state, esAutenticado) => {
      state.autenticado = esAutenticado;
      saveState('autenticado', state.autenticado);
    },

    setLogout: (state) =>{
      
      state.auth.signOut()
      .then(() =>{
        removeState('autenticado');
        removeState('token')
        removeState('currentUser')
  
        state.currentUser = null;
      }).catch((error)=> {
        console.log("no se pudo cerrar la session !!");
      })
    },

    setCurrentUser:(state, user)=>{
      state.currentUser = user;
      saveState('currentUser', user);
    }
    
  },
  actions: {
    obtenerToken: (context) => {
      return new Promise((resolve, reject) =>{
      axios.get(CONSTANTES.urlGetToken)
        .then((tokenResp) => {
          if (tokenResp.data != undefined){
            context.commit('setToken', tokenResp.data);
            context.commit('setSuccess', true);
            resolve("ok");
          }else
            context.commit('setToken', null);
            resolve(null);
        })
      })
    },

    refrescaToken: (context, token) => {
      return new Promise((resolve, reject) =>{
        axios.get(CONSTANTES.urlRefreshToken + token)
        .then( (response) => {
          if (response.data != undefined){
            context.commit('setToken', response.data);
            resolve("ok");
          }else{
            context.commit('setToken', null);
            resolve(null);
          }
        })

      })
    },

    cerrarSesion: (context) =>{
      context.commit('setLogout');
    },

    iniciarUsuario: (context, user)=>{
      context.commit('setCurrentUser', user);
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
      return state.tokn.refresh.value;
    },

    obtenerTokenActual: (state) => {
      return state.tokn.value;
    },
    
    obtenerCurrentUser: (state)=>{
      return state.currentUser;
    }

  }

})
