<template>
  <div id="characters" style="text-align: center">
          <h3>Characters</h3>
          <button class="btn m-3" @click="$emit('openLocation','Locations')">Back</button>

      <b-card-group columns >

      <b-card v-b-hover="hovered"   @click="clicked(character)"
              :img-alt="character.name"
              style="max-width: 540px;"
              :class="`overflow-hidden ${shadow} mb-5`" :img-src="character.image" v-for="(character,index) in characters" v-bind:key="index">

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
    import { BBadge , VBHover } from 'bootstrap-vue'
    import Dexie from 'dexie'
    Vue.component('b-badge', BBadge)
    Vue.directive('b-hover', VBHover)

    export default {
        name: 'Characters',
        props: {
            ids: String
        },
        data(){
            return {
                characters: [],
                shadow: 'shadow-sm'
            }
        },
        methods:{
            clicked(character){
                this.shadow = 'shadow-lg'
                this.$router.push({ name: 'Character', params: { id: character.id } })
            },
            hovered(hovered){
                hovered?this.shadow = 'shadow-lg':this.shadow = 'shadow-sm'
            },
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
            this.db.version(6).stores({
                locations: 'id,page',
                characters: 'id, locationUrl'
            });

            //Fetch from indexedDb
            this.characters = await this.db.characters.where('locationUrl').equals('https://rickandmortyapi.com/api/character/'+this.ids).toArray()

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
                            return {...char, locationUrl: char.location.url}
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
    .btn {

        border-radius: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .6);

        background-color: rgb(0,123,255);
        color: #ecf0f1;

        transition: background-color .3s;
    }

    .btn:hover, .btn:focus {
        background-color: rgb(0,92,172);
        color: #dae0e0;

    }
</style>
