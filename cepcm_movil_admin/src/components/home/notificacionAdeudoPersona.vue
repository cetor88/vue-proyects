<template>
  <v-container  grid-list-md text-xs-center>
    <v-form ref="form" lazy-validation>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card color="primary" dark>
                    <v-card-text >
                        <div>
                            <i class="fa fa-bookmark-o fa-2x fa-rotate-90 item-title" ></i>
                            <span>Notificaciones a alumnos deudores</span>
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select :items="items" append-icon="far fa-angle-down"
                     v-model="e1" label="Plantel:" ></v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select :items="items" append-icon="far fa-angle-down"
                     v-model="e1" label="Nivel academico:" ></v-select>  
            </v-flex>
            <v-flex xs6  offset-xs3>
                <v-select :items="items" append-icon="far fa-angle-down"
                     v-model="e1" label="Carrera:" ></v-select>  
            </v-flex>            
            <v-flex xs6  offset-xs3>
                <v-select :items="items" append-icon="far fa-angle-down"
                     v-model="e1" label="Grupo:" ></v-select>  
            </v-flex>
            
        </v-layout>

    </v-form>
  </v-container>  
</template>
<script>
export default {
  data() {
    return {
         e1: null,
        e2: null,
        e3: null,
        e4: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' }
        ],
    };
  }
};
</script>

<style>