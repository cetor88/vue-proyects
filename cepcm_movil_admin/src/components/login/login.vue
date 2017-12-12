<template>
  <div class="login-page">
    <div class="form">
      <span v-text="mensaje"> </span>
      <form class="register-form">
        <input type="email" placeholder="email" v-model="loginDetails.email"/>
        <input type="password" placeholder="password" v-model="loginDetails.password"/>
        <button v-on:click="loginUser">Entrar</button>
      </form>
    </div>
  </div>
  
</template>


<script type="text/javascript">
  import Vue from 'vue';
      
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
        loginUser:function() {  
             const authUser = {}
             var loginComp = this;
             debugger;
            this.$store.state.auth.createUserWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password)//signInWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password)
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // [START_EXCLUDE]
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
            })
        }
    }
	}
</script>

<style type="text/css">

.login-page {
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
}
</style>