<template>
  <v-app>
    <v-toolbar dark color="primary">
    <!--v-toolbar class="accent-4" -->
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