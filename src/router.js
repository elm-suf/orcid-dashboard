import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RaceChart from './components/RaceChart'
import MapComponent from "./components/MapComponent";
import SigmaComponent from "./components/SigmaComponent";
import Choropleth from "./components/Choropleth";
import LineChart from "./components/LineChart";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/race',
            name: 'race',
            component: RaceChart
        }, {
            path: '/choroplet',
            name: 'choroplet',
            component: Choropleth
        }, {
            path: '/sigma',
            name: 'sigma',
            component: SigmaComponent
        }, {
            path: '/map',
            name: 'map',
            component: MapComponent
        }, {
            path: '/line',
            name: 'lineChart',
            component: LineChart
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
