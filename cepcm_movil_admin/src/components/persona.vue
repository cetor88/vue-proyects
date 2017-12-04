<template>
	<div >
		<template v-if="persona">
			<h1 v-text="datosPersona.nombre"></h1>
			<h1 v-text="datosPersona.correoe"> </h1>
			<img :src="datosPersona.foto" />

		</template>
		<span v-else >Cargando ....</span>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios';
	export default{
		mounted(){
			axios.get('https://randomuser.me/api/')
			.then((resp)=>{
				this.persona = resp.data.results[0];
			})
		}, 

		data(){
			return {
					persona : null,
				}
		},

		computed:{
			datosPersona(){
				return{
					nombre :`${this.persona.name.first} ${this.persona.name.last}`,
					foto : this.persona.picture.large,
					correoe: this.persona.email
				}
			}
		}
	}
</script>

<style type="text/css">
	

</style>