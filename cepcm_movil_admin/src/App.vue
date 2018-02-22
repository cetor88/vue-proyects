<template>
  <v-app>
    <v-toolbar dark color="primary">
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
          <v-icon left dark :class="item.icon"></v-icon>
          {{ item.title }}

        </v-btn>
        <v-btn
          v-if="userIsAuthenticated" flat @click="onLogout">
          <v-icon left dark class="fas fa-sign-out-alt"></v-icon>
          Cerrar sesiòn
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
                                  
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 >
          <v-progress-circular indeterminate v-bind:size="100" v-bind:width="5" color="red" v-if="getLoaing"></v-progress-circular> 
        </v-flex>
      </v-layout>

      <router-view></router-view>
    </v-container>
  </v-app>
</template>


<script>


import { mapState, mapGetters } from "vuex";
export default {
  
  data() {
    return {
      sideNav: true,
      value: '',
      loading:false
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        
        { icon: "fas fa-lock", title: "Login", link: "/login" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "far fa-comment-alt", title: "Avisos generales", link: "/home" },
          { icon: "far fa-money-bill-alt", title: "Deudores", link: "/adeudo" },
          { icon: "fas fa-map-marker", title: "Ubicación", link: "/meetup/new" },
          { icon: "fas fa-user", title: "Perfil", link: "/profile" }
        ];
      }
      return menuItems;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.obtenerCurrentUser !== null &&
        this.$store.getters.obtenerCurrentUser !== undefined
      );
    },

    getLoaing(){
      return this.$store.getters.getLoadiong;
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

  .progress-circular {
      position: absolute;
      display: inline-flex;
      z-index: 1;
    }
</style>