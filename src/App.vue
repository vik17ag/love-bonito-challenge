<template>
  <div id="app">
    <h1>Welcome to Love-Bonito Challenge</h1>
    <keep-alive include="Home">
      <router-view @error="parseError"/>
    </keep-alive>
    <h3>{{error}}</h3>

  </div>
</template>

<script>

    export default {
        data() {
            return {
                error: null
            }
        },
        methods: {
            parseError(errorCode){
                console.log(errorCode)
                if (errorCode)
                    switch (errorCode){
                        case 1:
                            this.error = 'Network is not good.'
                            break
                        case 2:
                            this.error = 'Page not found 404'
                            break
                        case 3:
                            this.error = 'Local database for Offline content will not be available '
                            break
                        default:
                            this.error = 'Something went wrong in the app or server'
                    }
                else this.error = null
            }
        },

        created(){

        }
    }
</script>

<style>
</style>
