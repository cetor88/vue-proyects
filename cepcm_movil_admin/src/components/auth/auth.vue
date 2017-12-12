<template>
    <div class="container">
        <h1>{{cantidad}}Numero de clicks</h1>
        <button v-on:click="aumentar"> Aumentar</button>
        <button v-on:click="descontar"> Descontar</button>
    </div>   
</template>


<script>
    export default{
        
        methods:{
            aumentar(){
                this.$store.state.cantidad++;
            },

            descontar(){
                this.$store.state.cantidad--;
            }

        },
        computed:{
            cantidad(){
                return this.$store.state.cantidad;
            }
        }
    }

</script>

