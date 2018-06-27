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
                                  
    <!--v-container text-xs-center-->
      <v-layout row wrap  v-if="getLoaing">
        <div class="modela-mask">
          <orbit-spinner indeterminate :size="100" color="#ff1d5e" />
        </div>
      </v-layout>
    <!--/v-container-->
    <v-layout row wrap>
      <v-flex>
        <router-view></router-view>
      </v-flex>
    </v-layout>
    
  </v-app>
</template>


<script>
import { mapState, mapGetters } from "vuex";
import { OrbitSpinner } from "epic-spinners";
export default {
  components: {
    OrbitSpinner
  },
  data() {
    return {
      sideNav: true,
      value: "",
      loading: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [{ icon: "fas fa-lock", title: "Login", link: "/login" }];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "far fa-comment-alt",
            title: "Avisos generales",
            link: "/home"
          },
          { icon: "far fa-money-bill-alt", title: "Deudores", link: "/adeudo" },
          {
            icon: "fas fa-user",
            title: "Gestión de modulos",
            link: "/adminModulos"
          },
          { icon: "fas fa-map-marker", title: "Banners", link: "/banner" },
          { icon: "fas fa-map-marker", title: "Ubicación", link: "/meetup/new" }
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

    getLoaing() {
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
  position: fixed;
  display: inline-flex;
  z-index: 1;
  left: 50%;
  margin-left: -4em;
  top: 50%;
  margin-top: -4em;
}

.orbit-spinner {
  cursor: default;
  position: fixed;
  display: inline-flex;
  z-index: 1;
  left: 50%;
  margin-left: -4em;
  top: 50%;
  margin-top: -4em;
}

.modela-mask {
  cursor: default;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
</style>