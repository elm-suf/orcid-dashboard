import Vue from 'vue'
import Vuex from 'vuex'
import {apolloClient} from './apollo'
import {inAndOutFromC1} from './apollo/queries'
import {queryAllCountries} from './apollo/queries'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        inAndOut: [],
        countries: [],
        // selectedCountry: ""
    },
    mutations: {
        fetchInAndOutFromC1(state, inAndOut) {
            state.inAndOut = inAndOut.nodes
        },
        fetchCountries(state, countries) {
            state.countries = countries.map(el => el.code)
        },
    },
    actions: {
        async fetchInAndOutFromC1({commit}, selected) {
            const {data} = await apolloClient.query({query: inAndOutFromC1, variables: {c1: selected}})
            commit('fetchInAndOutFromC1', data.migrations_in_out_aggregate)
        },
        async fetchCountries({commit}) {
            const {data} = await apolloClient.query({query: queryAllCountries})
            commit('fetchCountries', data.countries)
        },
    }
})
