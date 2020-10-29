<template>
  <div id="characters">
      <button  @click="$emit('openLocation','Locations')">Back</button>
      <h3>Characters</h3>

      <b-card  @click="$router.push({ name: 'Character', params: { id: character.id } })"
              img-alt="Image"
              img-top
              style="max-width: 20rem;"
              class="mb-2" :img-src="character.image" v-for="(character,index) in characters" v-bind:key="index">

          <b-card-title :title="character.name"></b-card-title>
          <b-card-text>
            <b-badge :variant="getStatusColor(character.status)">{{character.status}}</b-badge>
          </b-card-text>
          <b-card-sub-title>{{character.species}} | <a :class="getGenderColor(character.gender)">{{character.gender}}</a></b-card-sub-title>
      </b-card>
  </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import { BBadge } from 'bootstrap-vue'
    Vue.component('b-badge', BBadge)

    export default {
  name: 'Characters',
  props: {
      ids: String
  },
  data(){
      return {
          characters: []
      }
  },
        methods:{
            getStatusColor(status){
          switch (status){
              case 'Dead':
                  return 'danger'
              case 'Alive':
                  return 'success'
               default:
                  return 'secondary'
          }
      },
            getGenderColor(gender){
                switch (gender){
                    case 'Male':
                        return 'text-primary'
                    case 'Female':
                        return 'text-danger'
                    default:
                        return 'text-secondary'
                }
            }
        },
    mounted(){
        axios
            .get('https://rickandmortyapi.com/api/character/'+this.ids)
            .then(response => {
                //console.log(response.data)
                this.characters = Array.isArray(response.data)?response.data:[response.data]
            })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
