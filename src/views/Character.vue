<template>
    <div id="character">
        <button @click="$router.back()">Back</button>

        <b-card
                img-alt="Image"
                img-top
                style="max-width: 20rem;"
                class="mb-2" :img-src="character.image">

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
    import Dexie from 'dexie'

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
        async mounted() {
            this.$emit('error',null)

            this.db = new Dexie("Bonito");
            this.db.version(5).stores({
                locations: 'id,page',
                characters: 'id, location'
            });

            //Fetch from indexedDb
            this.character = await this.db.characters.get(Number(this.$route.params.id))
                .catch((error) => {
                    console.error("Failed to fetch characters from indexedDb. Error: " + error);
                    this.$emit('error', 3)
                })

            console.log(this.character)

            //If no data available, then fetch from api
            if (!this.character ) {
                //console.log(this.$route.params.id)
                axios
                    .get('https://rickandmortyapi.com/api/character/' + this.$route.params.id)
                    .then(response => {
                        //console.log(response)
                        this.character = response.data

                        //Insert detailed info in character
                        //Save in db along with location id as a direct attribute
                        this.db.characters.put(this.character)
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
