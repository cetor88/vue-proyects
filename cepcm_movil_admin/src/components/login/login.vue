<!--template>
  <b-container class="bv-example-row">
    <b-button v-on:click="showModal" v-show="!autenticado" variant="primary"> Iniciar sesión
    </b-button>

    <b-modal ref="myModal" hide-footer title="Login" v-if="showModal" v-on:close="showModal = false">
      <transition name="modal">
            
        <b-form v-on:submit.prevent="sinIn"  >
          <b-form-group>
            <span v-text="mensaje"> </span>
          </b-form-group>
            <b-form-group id="exampleInputGroup1"
                  label="Correo electrónico:"
                  description="Ingresa con tu correo electrónico.">
              <b-form-input id="exampleInput1"
                  type="email"
                  v-model="loginDetails.email"
                  required
                  placeholder="Correo electrónico">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2" label="Tu contraseña:">
              <b-form-input id="exampleInput2"
                  type="password"
                  v-model="loginDetails.password"
                  required
                  placeholder="Tu contraseña">
              </b-form-input>
            </b-form-group>
          <b-button type="submit"   variant="primary lg">Entrar</b-button>
        </b-form>
      </transition>
    </b-modal>
    
  </b-container> 
</template-->
<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <!--app-alert @dismissed="onDismissed" :text="error.message"></app-alert-->
      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex xs12 sm6 offset-sm3>
        <h2  v-text="mensaje"></h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="loginDetails.email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="loginDetails.password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" dark color="primary">
                      Aceptar
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>




<script type="text/javascript">
import Vue from "vue"
import  {router} from '../../routes'
import {mapState, } from 'vuex'

export default {
  name: "login",

  data() {
    return {
      mensaje: "Inicia session con tu email y contraseña",
      loginDetails: {
        email: "",
        password: ""
      },
      dialog: false,
      error:false,
    }
  },

  methods: {
    createUser: function() {
      const authUser = {};
      var loginComp = this;
      
      this.$store.state.auth
        .createUserWithEmailAndPassword(
          this.loginDetails.email,
          this.loginDetails.password
        )
        .then(
          function(user) {
            alert("cuenta creada");
          },
          function(err) {
            alert("ups !!" + err);
          }
        );
    },
    onSignin: function() {
      const authUser = {};
      var loginComp = this;
      var comp = this;
      let cotininuar = this.$router;
      let control = this.$store;
      
      this.$store.state.auth.signInWithEmailAndPassword( this.loginDetails.email, this.loginDetails.password )
        .then(
          function(user) {
            control.dispatch('iniciarUsuario', user);
            control.dispatch('obtenerToken');
            cotininuar.replace("home");
          },
          function(err) {
            alert("ups !!" + err);
          }
        )
       
    },
  },  
  computed: mapState(['autenticado', 'tokn']),
  
};
</script>