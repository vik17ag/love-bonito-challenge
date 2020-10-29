<template>
  <div id="characters">
      <button  @click="$emit('openLocation','Locations')">Back</button>
      <h3>Characters</h3>

      <b-card-group columns >

      <b-card  @click="$router.push({ name: 'Character', params: { id: character.id } })"
              :img-alt="character.name"
              style="max-width: 540px;"
              class="mb-2 overflow-hidden" :img-src="character.image" v-for="(character,index) in characters" v-bind:key="index">

          <b-card-title :title="character.name"></b-card-title>
          <b-card-text>
            <b-badge :variant="getStatusColor(character.status)">{{character.status}}</b-badge>
          </b-card-text>
          <b-card-sub-title>{{character.species}} | <a :class="getGenderColor(character.gender)">{{character.gender}}</a></b-card-sub-title>
      </b-card>
      </b-card-group>
  </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import { BBadge } from 'bootstrap-vue'
    import Dexie from 'dexie'
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
        async mounted(){
            this.$emit('error',null)

            this.db = new Dexie("Bonito");
            this.db.version(5).stores({
                locations: 'id,page',
                characters: 'id, location'
            });

            //Fetch from indexedDb
            this.characters = await this.db.characters.where('location').equals('https://rickandmortyapi.com/api/character/'+this.ids).toArray()

                .catch((error) => {
                    console.error("Failed to fetch characters from indexedDb. Error: " + error);
                    this.$emit('error',3)
                })

            //If no data available, then fetch from api
            if (!this.characters || this.characters.length === 0){

                axios
                    .get('https://rickandmortyapi.com/api/character/'+this.ids)
                    .then(response => {
                        this.characters = Array.isArray(response.data)?response.data:[response.data]

                        //Save in db along with location id as a direct attribute
                        this.db.characters.bulkPut(this.characters.map(char => {
                            return {...char, location: char.location.url}
                        }))
                            .catch((error) => {
                                console.error("Failed to add characters in indexedDb. Error: " + error);
                                this.$emit('error',3)
                            })

                    })

                    .catch((error) => {
                        console.error("Failed to fetch from api. Error: " + error);
                        this.$emit('error',1)
                    })

            }


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
