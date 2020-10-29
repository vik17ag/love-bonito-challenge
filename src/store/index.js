import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentTabComponent: 'Locations',
        page: 1,
        rows: 0
    },
    mutations: {
        updateTab(state, tab){
            state.currentTabComponent = tab
        },
        updatePage(state, value){
            state.page = value
        },
        updateLocationCount(state, value){
            state.rows = value
        }
    },
    actions: {
    },
    modules: {
    }
})
