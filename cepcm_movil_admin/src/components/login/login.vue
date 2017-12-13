<template>
  <b-container class="bv-example-row">
    <b-row>
        <b-col></b-col>
        <b-col>
          <!--div class="login-page">
            <div class="form">
              <span v-text="mensaje"> </span>
              <form class="register-form">
                <input type="email" placeholder="email" 
                  v-model="loginDetails.email"/>
                <input type="password" placeholder="password" 
                  v-model="loginDetails.password"/>
                <button v-on:click="loginUser">Entrar</button>
              </form>
            </div>
          </div-->
          <b-form v-on:submit.prevent="sinIn"  >
              <b-form-group>
                <span v-text="mensaje"> </span>
              </b-form-group>
              <b-form-group id="exampleInputGroup1"
                            label="Email address:"
                            description="We'll never share your email with anyone else.">
                <b-form-input id="exampleInput1"
                              type="email"
                              v-model="loginDetails.email"
                              required
                              placeholder="Enter email">
                </b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup2" label="Your Name:">
                <b-form-input id="exampleInput2"
                              type="text"
                              v-model="loginDetails.password"
                              required
                              placeholder="Enter name">
                </b-form-input>
              </b-form-group>
              <b-button type="submit"  variant="primary">Enviar</b-button>
            </b-form>
        </b-col>
        <b-col>
          
        </b-col>
    </b-row>
  </b-container> 
</template>


<script type="text/javascript">
  import Vue from 'vue';

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

	export default{
    name:'login',
		data(){
			return {
					mensaje:'Inicia session con tu emails y contraseña',
          loginDetails : {
                email : '',
                password : ''
          },
				}
		},
    
    methods: {
        createUser:function() {
             const authUser = {}
             var loginComp = this;
             debugger;
            this.$store.state.auth.createUserWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password)//signInWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password)
            
            .then(function(user){
              alert("cuenta creada");
            },
            function(err){
              alert("ups !!" + err);
            });
        },
        sinIn:function() {
             const authUser = {}
             var loginComp = this;
             debugger;
            let cotininuar = this.$router;
            this.$store.state.auth.signInWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password)
            .then(function(user){
              alert("usuario logeado!!" + user);
              cotininuar.replace("home");
            },
            function(err){
              alert("ups !!" + err);
            });
        }
    } 
	}
</script>

<style type="text/css">

/*.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}*/
</style>