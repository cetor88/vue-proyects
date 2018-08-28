
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
                    <v-text-field name="email" label="Email" id="email" v-model="loginDetails.email" type="email" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Contraseña" id="password" v-model="loginDetails.password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-alert v-model="mensajeSining" color="error" icon="warning" outline v-if="mensajeSining.length>0"  dismissible>
                        {{mensajeSining}}
                    </v-alert>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn block type="submit" dark color="primary">
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




<script >
import Vue from "vue";
import  {router} from '../../routes';
import {mapState, } from 'vuex';
import loginServices from './login.services.js';

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
      mensajeSining:'',
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
      this.$store.dispatch("setLoading", true);

      this.$store.state.auth.signInWithEmailAndPassword( this.loginDetails.email, this.loginDetails.password )
        .then((user)=> {
            loginServices.obtenerUsuario(user.uid).then((data)=>{
              control.dispatch('obtenerToken', user).then(()=>{
              control.dispatch('iniciarUsuario', user);
              this.$store.dispatch("setLoading", true);
              cotininuar.replace("home");
              })
            }).catch(()=>{
              this.$store.dispatch("setLoading", false);
              this.mensajeSining="Usuario y/o contraseña incorrect@"  
            })
          },
          (err)=> {
            this.$store.dispatch("setLoading", false);
            this.mensajeSining="Usuario y/o contraseña incorrect@"
          }
        )
       
    },
  },  
  computed: mapState(['autenticado', 'tokn']),
  
};
</script>