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
      debugger;
      state.tokn.value = tokenResp.value,
        state.tokn.refresh = tokenResp.refreshToken,
        state.tokn.expiraEn = Math.floor(new Date().getTime() + (tokenResp.expiresIn * 1000))
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
    obtenerToken: (context) => {
      debugger;
      return new Promise((resolve, reject) => {
        axios.get(CONSTANTES.urlGetToken)
          .then((tokenResp) => {
            if (tokenResp.data != undefined) {
              context.commit('setToken', tokenResp.data);
              context.commit('setSuccess', true);
              resolve("ok");
            } else
              context.commit('setToken', null);
            resolve(null);
          })
      })
    },

    refrescaToken: (context, token) => {
      return new Promise((resolve, reject) => {
        axios.get(CONSTANTES.urlRefreshToken + token)
          .then((response) => {
            if (response.data != undefined) {
              context.commit('setToken', response.data);
              resolve("ok");
            } else {
              context.commit('setToken', null);
              resolve(null);
            }
          })

      })
    },

    validarToken2: (context) => {

      return new Promise((resolve, reject) => {

        let time = new Date().getTime();
        let expiro = time > context.state.tokn.expiraEn //si la fecha actual es mayor que expiraEn 
        if (expiro) {
          let tokenRefresh = context.getters.obtenerTokenRefresh;
          context.dispatch('refrescaToken', tokenRefresh).then((response) => {
            if (response == null) {
              console.log("ocurrio un error al refrescar el token");
              context.dispatch('obtenerToken');
              resolve(context.getters.obtenerTokenActual);
            } else {
              console.log("Token refresh valido");
              resolve(context.getters.obtenerTokenActual);
            }
          })
        } else {
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
      return state.tokn.refresh.value;
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
