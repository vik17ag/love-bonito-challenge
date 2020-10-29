<template>
      <div id="character">
          <button @click="$router.back()">Back</button>

          <b-card
                  :img-alt="character.name"
                  img-start
                  class="m-5" :img-src="character.image">

              <b-card-title :title="character.name"></b-card-title>
              <b-card-text>
                  <b-badge :variant="getStatusColor(character.status)">{{character.status}}</b-badge>
              </b-card-text>
              <b-card-sub-title>{{character.species}} | <a :class="getGenderColor(character.gender)">{{character.gender}}</a></b-card-sub-title>
              <b-card-text>Birth date : {{new Date(character.created).toDateString()}}</b-card-text>
              <b-card-text>Last Known location : {{character.location.name}}</b-card-text>
              <b-card-text>First seen in : {{character.origin.name}}</b-card-text>

          </b-card>

      </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'

    import { BBadge } from 'bootstrap-vue'
    Vue.component('b-badge', BBadge)
    import { CardPlugin } from 'bootstrap-vue'
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
                    origin : {}
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
        mounted(){
            //console.log(this.$route.params.id)
            axios
                .get('https://rickandmortyapi.com/api/character/'+this.$route.params.id)
                .then(response => {
                    //console.log(response)
                    this.character = response.data
                })
        }
    }

</script>
