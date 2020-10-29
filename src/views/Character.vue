<template>
      <div id="character" >
          <button @click="$router.back()">Back</button>

          <!--<b-card
                  :img-alt="character.name"
                  img-top
                 :img-src="character.image">



          </b-card>-->

          <div align="center">
              <b-card  no-body class="overflow-hidden" style="max-width: 540px;">
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
                              <b-card-text>Birth date : {{new Date(character.created).toDateString()}}</b-card-text>
                              <b-card-text>Last Known location : {{character.location.name}}</b-card-text>
                              <b-card-text>First seen in : {{character.origin.name}}</b-card-text>
                          </b-card-body>
                      </b-col>
                  </b-row>
              </b-card>
          </div>

          <h3>Appeared in</h3>
              <b-card no-gutters class="mb-2 " text-variant="primary" v-for="(ep,index) in character.episode" v-bind:key="index">Episode {{index+1}}</b-card>

      </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'

    import { BBadge } from 'bootstrap-vue'
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
        mounted(){
            //console.log(this.$route.params.id)
            axios
                .get('https://rickandmortyapi.com/api/character/'+this.$route.params.id)
                .then(response => {
                    console.log(response)
                    this.character = response.data
                })
        }
    }

</script>
