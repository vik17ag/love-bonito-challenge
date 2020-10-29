<template>
  <div id="app" class="p-5" >
    <h1 style="text-align: center">Welcome to Love Bonito Challenge</h1>
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
