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
        selectedCountry: ""
    },
    getters: {
        inAndOut: state => {
            return state.inAndOut
        },
        countries: state => {
            return state.countries
        },
        selectedCountry: state => {
            return state.selectedCountry
        },
        chartData: state => {
            return {
                columns: ["c2", "in", "out"],
                rows: state.inAndOut
            }
        },
        heatMapData: state => {
            return {
                columns: ["c1", "c2", "in"],
                rows: state.inAndOut
            }
        }
    },
    mutations: {
        FETCH_COUNTRIES_FROM_C1(state, inAndOut) {
            state.inAndOut = inAndOut.nodes
        },
        FETCH_COUNTRIES(state, countries) {
            state.countries = countries.map(el => el.code)
        },
        UPDATE_CURRENT(state, newVal) {
            state.selectedCountry = newVal
        }
    },
    actions: {
        async fetchInAndOutFromC1({commit, state}) {
            const {data} = await apolloClient.query({query: inAndOutFromC1, variables: {c1: state.selectedCountry}})
            commit('FETCH_COUNTRIES_FROM_C1', data.migrations_in_out_aggregate)
        },
        async fetchCountries({commit}) {
            const {data} = await apolloClient.query({query: queryAllCountries})
            commit('FETCH_COUNTRIES', data.countries)
        },
        updateCurrent({commit}, selected) {
            commit('UPDATE_CURRENT', selected)
        }

    }
})
