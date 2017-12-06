      <template>
        <div>
          <login> </login>
          <persona> </persona>
          <persona>                     </persona>
        </div>      
      </template>

      <script>
      
      import persona from './components/persona.vue';
      import login from './components/login/login.vue';
      
      export default {
        components : { persona, login },
        
        data () {
          return {}
        }
      }
      </script>

      <style>
      </style>
