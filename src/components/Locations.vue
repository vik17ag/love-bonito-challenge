<template>
  <div id="locations" style="text-align: center">
    <h3>Locations</h3>
      <b-pagination
              id="pagination"
              :value="page"
              :total-rows="rows"
              :per-page="perPage"
              @change="handlePageChange"
              align="center"
              class="m-3"
      />
      <b-card-group columns >
      <b-card  class="shadow p-3 mb-5 bg-white rounded" border-variant="white" align="start" :id="'card' + index" v-for="(location,index) in locations" v-bind:key="index">
          <b-card-title bg-variant="secondary" :title="location.name"></b-card-title>
          <b-card-sub-title >{{location.dimension}}</b-card-sub-title>
          <b-card-text >{{location.type}}</b-card-text>
          <button class="btn" @click="openCharacter(location.residents)">View Characters</button>
      </b-card>
      </b-card-group>
  </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import Dexie from "dexie"

    import { BPagination, BCardGroup, BButton, ModalPlugin  } from 'bootstrap-vue'
    Vue.component('b-pagination', BPagination)
    Vue.component('b-card-group', BCardGroup)
    Vue.component('b-button', BButton)
    Vue.use(ModalPlugin)

    export default {
        name: 'Locations',
        props: {
        },
        data(){
            return {
                locations: [],
                perPage: 0,
                db: {}
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
            async  getLocations(){
                this.$emit('error',null)


                //Fetch from indexedDb
                this.locations = await this.db.locations.where('page').equals(this.page).toArray()
                    .catch((error) => {
                        console.error("Failed to fetch locations from indexedDb. Error: " + error);
                        this.$emit('error',3)
                    })
                this.rows = localStorage.getItem('rows')

                //If no data available, then call api
                if (this.locations.length === 0 || !this.rows) {

                    let response = await axios.get('https://rickandmortyapi.com/api/location?page=' + this.page)

                        .catch((error) => {
                            console.error("Failed to fetch from api. Error: " + error);
                            if (error.request){
                                this.$emit('error',1)
                                //: 404 Not Found page/error message if your API returns a 404.
                                //: 5xx Backend error message
                                //: retry for spotty network or show refresh page - axios-retry

                            } else {
                                this.$emit('error',4)
                            }
                        })
                    this.locations = response.data.results
                    this.locations.page = this.page
                    this.rows = response.data.info.count

                    localStorage.setItem('rows', response.data.info.count)

                    //Save in db along with page attribute
                    this.db.locations.bulkPut(response.data.results.map(loc => {
                        return {...loc, page: this.page}
                    }))
                        .catch((error) => {
                            console.error("Failed to add locations in indexedDb. Error: " + error)
                            this.$emit('error',3)


                        })

                }

            },
            handlePageChange(value) {
                this.page = value
                this.getLocations()
            },
            openCharacter(residents){
                if (residents &&  residents.length > 0){
                    this.$emit('openCharacter',residents.map(url=>url.split('/')[5]).toString())
                } else {
                    this.$bvModal.msgBoxOk('No one stays here !! You are always welcome.')
                }
            }
        },
        mounted(){
            this.db = new Dexie("Bonito");
            this.db.version(6).stores({
                locations: 'id,page',
                characters: 'id, locationUrl'
            });

            this.getLocations()

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
