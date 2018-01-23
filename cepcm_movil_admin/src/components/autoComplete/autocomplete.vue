<template>
    <v-container>
        <v-card>
            <pre>{{items}}</pre>
            <pre>{{select}}</pre>
        </v-card>
        <v-card  flat>
            <v-card-text>
                <v-container fluid>
                <v-layout>
                    <v-flex>
                    <v-select label="Buscar alumno" autocomplete :loading="loading" color="pink"                           multiple
                        :hide-selected="true" required :items="items" :open-on-clear="true"
                        :rules="[() => select.length > 0 || 'Debes seleccionar al menos un alumno']"
                        :search-input.sync="search"
                        v-model="select" 
                    ></v-select>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default{

    data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: [],
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    }
  },
  watch: {
    search (val) {
        if(val.length > 3){
            val && this.querySelections(val)
        }else{
            this.items=[];
        }
    }
  },
  methods: {
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style >
    
</style>