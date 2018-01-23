<!--template>
  <div class="container">
    <myHeader></myHeader>
    <menus v-show="userInOut"></menus>
    <myCarrusel v-show="!userInOut"></myCarrusel>
    <router-view> </router-view>
    
    <myfooter> Terminos y condiciones</myfooter>
  </div>
</template-->
<template>
  <v-app>    
    <!--v-navigation-drawer temporary v-model="sideNav" >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Cerar sesiòn</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer-->

    <v-toolbar dark class="pink accent-4" >
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">ADMIN CEPCM MOVIL</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}

        </v-btn>
        <v-btn
          v-if="userIsAuthenticated" flat @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Cerrar sesiòn
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>


<script>
/*
      import menus from "./components/menu/menu.vue";
      import myHeader from  "./components/header.vue";
      import myCarrusel from "./components/carrusel.vue";
      import authe from './components/auth/auth.vue'
      import myfooter from './components/footer.vue'
      import Vue from 'vue'
      
      import BootstrapVue from 'bootstrap-vue'

      Vue.use(BootstrapVue);    

      export default{
        components:{menus, myHeader, myCarrusel, authe, myfooter},
        computed:{
          contar(){
            return this.$store.state.cantidad;
            
          },
          userInOut(){
            return this.$store.state.autenticado;
            
          }
        }
      }*/

//import myfooter from './components/footer.vue'
import autocomplete from "./components/autoComplete/autocomplete.vue";

import { mapState, mapGetters } from "vuex";
export default {
  components: { autocomplete },
  data() {
    return {
      sideNav: true,
      cities : ['Bangalore','Chennai','Cochin','Delhi','Kolkata','Mumbai'],
      value: '',
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        
        { icon: "lock_open", title: "Login", link: "/login" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "room", title: "Ubicación", link: "/meetup/new" },
          { icon: "person", title: "Perfil", link: "/profile" }
        ];
      }
      return menuItems;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.obtenerCurrentUser !== null &&
        this.$store.getters.obtenerCurrentUser !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("cerrarSesion");
      this.$router.replace("login");
    }
  }
};
</script>

<style lang="stylus">
@import './stylus/main';
</style>