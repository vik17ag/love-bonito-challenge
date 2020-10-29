import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: {
            name: 'Home'
        }
    },
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/',
        name: 'Locations',
        component: () => import(/* webpackChunkName: "locations" */ '../components/Locations.vue')
    },
    {
        path: '/',
        name: 'Characters',
        component: () => import(/* webpackChunkName: "characters" */ '../components/Characters.vue')
    },
    {
        path: '/character/:id',
        name: 'Character',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "character" */ '../views/Character.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router
