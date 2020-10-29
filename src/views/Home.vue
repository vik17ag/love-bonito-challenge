<template>
  <div class="home">
    <component :ids="charIds" v-bind:is="currentTabComponent" v-on:openCharacter="openCharacter" v-on:openLocation="currentTabComponent = 'Locations'"/>
  </div>
</template>

<script>
    import Vue from 'vue'
    import Locations from '../components/Locations.vue'
    import Characters from '../components/Characters.vue'
    import { CardPlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin)
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'Home',
        components: {
            Locations,
            Characters
        },
        data(){
            return {
                currentTabComponent: 'Locations',
                charIds: ''
            }
        },
        methods: {

            openCharacter(e){
                this. currentTabComponent = 'Characters'
                this.charIds = e
                //console.log(e)
            }
        }
    }
</script>
