<template>
  <b-container class="bv-example-row">
    <b-button v-on:click="showModal" v-show="!userInOut" variant="primary"> Iniciar sesión
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
</template>


<script type="text/javascript">
import Vue from "vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import  {router} from '../../routes';

export default {
  name: "login",
  data() {
    return {
      mensaje: "Inicia session con tu emails y contraseña",
      loginDetails: {
        email: "",
        password: ""
      },
    }
  },

  methods: {
    createUser: function() {
      const authUser = {};
      var loginComp = this;
      debugger;
      this.$store.state.auth
        .createUserWithEmailAndPassword(
          this.loginDetails.email,
          this.loginDetails.password
        ) //signInWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password)
        .then(
          function(user) {
            alert("cuenta creada");
          },
          function(err) {
            alert("ups !!" + err);
          }
        );
    },
    sinIn: function() {
      const authUser = {};
      var loginComp = this;
      var comp = this;
      let cotininuar = this.$router;
      let control = this.$store.state;
      
      this.$store.state.auth
        .signInWithEmailAndPassword(
          this.loginDetails.email,
          this.loginDetails.password
        )
        .then(
          function(user) {
            debugger
            comp.hideModal();
            //router.push(cotininuar.query.redirect);
            control.autenticado = true;
            control.currentUser = user;
            cotininuar.replace("home");

          },
          function(err) {
            alert("ups !!" + err);
          }
        );
    },
    showModal() {
      this.$refs.myModal.show()
    },
    hideModal() {
      this.$refs.myModal.hide()
    },
  },
  
  computed:{
    userInOut(){
      return this.$store.state.autenticado;      
    }
  }
};
</script>

<style type="text/css">
.modal-enter{
  opacity: 0;
}

.modal-enter-active{
  transition :opacity 5s;
}

.modal-leave-to{
  opacity: 0;
}
.modal-leave-active{
  transition: opacity 1s;  
}

</style>