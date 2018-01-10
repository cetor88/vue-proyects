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
    currentUser: null,
    tokn: loadState('token') || {value:null, refresh:null, expiraEn:null},
  },
  mutations: {
    setToken: (state, tokenResp) => {

        state.tokn.value = tokenResp.value,
        state.tokn.refresh = tokenResp.refreshToken,
        state.tokn.expiraEn = Math.floor(new Date().getTime() + (tokenResp.expiresIn * 1000))
        saveState('token',state.tokn);
    },
    setSuccess: (state) => {
      state.autenticado = true;
      saveState('autenticado', state.autenticado);
    },
    
  },
  actions: {
    obtenerToken: (context) => {
      return new Promise((resolve, reject) =>{
      axios.get(CONSTANTES.urlGetToken)
        .then((tokenResp) => {
          if (tokenResp.data != undefined){
            context.commit('setToken', tokenResp.data);
            context.commit('setSuccess');
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
    cerrarSession: (state) => {
      return  removeState('autenticado')
    }


  }

})
