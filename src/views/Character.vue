<template>
      <div id="character" >
          <button class="btn" @click="$router.back()">Back</button>

          <div align="center">
              <b-card  no-body class="overflow-hidden shadow" style="max-width: 540px;">
                  <b-row no-gutters>
                      <b-col md="6">
                          <b-card-img :src="character.image" :alt="character.name" class="rounded-0"></b-card-img>
                      </b-col>
                      <b-col md="6">
                          <b-card-body :title="character.name">
                              <b-card-text>
                                  <b-badge :variant="getStatusColor(character.status)">{{character.status}}</b-badge>
                              </b-card-text>
                              <b-card-sub-title>{{character.species}} | <a :class="getGenderColor(character.gender)">{{character.gender}}</a></b-card-sub-title>
                              <b-card-text>Born : {{new Date(character.created).toDateString()}}</b-card-text>
                              <b-card-text>Last Known location : {{character.location.name}}</b-card-text>
                              <b-card-text>First seen in : {{character.origin.name}}</b-card-text>
                          </b-card-body>
                      </b-col>
                  </b-row>
              </b-card>
          </div>

          <div style="text-align: center;" class=" mt-5">
              <h3>Appeared in</h3>
              <div  class="mb-2"   v-for="(ep,index) in character.episode" v-bind:key="index">Episode {{index+1}}</div>
          </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'

    import { BBadge } from 'bootstrap-vue'
    import Dexie from 'dexie'

    Vue.component('b-badge', BBadge)
    Vue.component('b-row', BRow)
    Vue.component('b-col', BCol)
    import { CardPlugin, BRow, BCol } from 'bootstrap-vue'
    Vue.use(CardPlugin)
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'Character',
        props : {
        },
        data(){
            return {
                character: {
                    location : {},
                    origin : {},
                    image: ''
                }
            }
        },
        computed:{
        },
        methods: {
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
        async mounted() {
            this.$emit('error',null)

            this.db = new Dexie("Bonito");
            this.db.version(6).stores({
                locations: 'id,page',
                characters: 'id, locationUrl'
            });

            //Fetch from indexedDb
            this.character = await this.db.characters.get(Number(this.$route.params.id))
                .catch((error) => {
                    console.error("Failed to fetch characters from indexedDb. Error: " + error);
                    this.$emit('error', 3)
                })

            //console.log(this.character)

            //If no data available, then fetch from api
            if (!this.character || !this.character.id) {
                //console.log(this.$route.params.id)
                axios
                    .get('https://rickandmortyapi.com/api/character/' + this.$route.params.id)
                    .then(response => {
                        console.log(response)
                        this.character = response.data

                        //Insert detailed info in character
                        //Save in db along with location id as a direct attribute
                        this.db.characters.put({...response.data, locationUrl: this.character.location.url})
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
