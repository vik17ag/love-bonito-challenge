<template>
  <div id="app" class="p-5" style="text-align: center">
    <h2 >Love Bonito Challenge</h2>
    <keep-alive include="Home">
      <router-view @error="parseError"/>
    </keep-alive>
          <h2 class="mt-5">{{error}}</h2>

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
                            this.error = 'You are offline'
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
