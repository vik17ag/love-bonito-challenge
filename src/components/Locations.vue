<template>
  <div id="locations">
    <h3>Locations</h3>
      <b-pagination
              id="pagination"
              :value="page"
              :total-rows="rows"
              :per-page="perPage"
              @change="handlePageChange"
      />
      <b-card-group columns class="m-3">
      <b-card  bordered align="start" :id="'card' + index" v-for="(location,index) in locations" v-bind:key="index">
          <b-card-title bg-variant="secondary" :title="location.name"></b-card-title>
          <b-card-sub-title >{{location.dimension}}</b-card-sub-title>
          <b-card-text >{{location.type}}</b-card-text>
          <button @click="openCharacter(location.residents)">View Characters</button>
      </b-card>
      </b-card-group>
  </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import { BPagination, BCardGroup, BButton } from 'bootstrap-vue'
    Vue.component('b-pagination', BPagination)
    Vue.component('b-card-group', BCardGroup)
    Vue.component('b-button', BButton)

export default {
  name: 'Locations',
  props: {
  },
    data(){
      return {
          locations: [],
          perPage: 0

      }
    },
    computed : {
        rows:{
          get(){
              return this.$store.state.rows
          },
          set(value){
              this.$store.commit('updateLocationCount',value)
          }
      },
        page:{
            get(){
                return this.$store.state.page
            },
            set(value){
                this.$store.commit('updatePage',value)
            }
        }
    },
    methods:{
      getLocations(){
          axios
              .get('https://rickandmortyapi.com/api/location?page='+this.page)
              .then(response => {
                  //console.log(response)
                  this.locations = response.data.results
                  this.rows = response.data.info.count
              })
      },
        handlePageChange(value) {
           this.page = value
            this.getLocations()
        },
        openCharacter(residents){
          if (residents &&  residents.length > 0){
              this.$emit('openCharacter',residents.map(url=>url.split('/')[5]).toString())
          } else {
              alert('No one is residing')
          }
        }
    },
    mounted(){
        this.getLocations()

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
