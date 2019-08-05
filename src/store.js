import Vue from 'vue'
import Vuex from 'vuex'
import {apolloClient} from './apollo'
import {inAndOutFromC1, queryMigrations, queryAllCountries} from './apollo/queries'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        inAndOut: [],
        countries: [],
        migrations: [],
        selectedCountry: ""
    },
    getters: {
        migrations: state => {
            return state.migrations
        },
        inAndOut: state => {
            return state.inAndOut
        },
        countries: state => {
            return state.countries.map(el => el.code)
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
                columns: ["from", "to", "value"],
                rows: state.migrations
            }
        }
    },
    mutations: {
        FETCH_COUNTRIES_FROM_C1(state, inAndOut) {
            state.inAndOut = inAndOut.nodes
        },
        FETCH_MIGRATIONS(state, migrations) {
            state.migrations = migrations
        },
        FETCH_COUNTRIES(state, countries) {
            state.countries = countries
        },
        UPDATE_CURRENT(state, newVal) {
            state.selectedCountry = newVal
        }
    },
    actions: {
            updateCurrent({commit, dispatch}, selected) {
            commit('UPDATE_CURRENT', selected)
            dispatch('fetchInAndOutFromC1')
        },
        async fetchInAndOutFromC1({commit, state}) {
            const {data} = await apolloClient.query({query: inAndOutFromC1, variables: {c1: state.selectedCountry}})
            commit('FETCH_COUNTRIES_FROM_C1', data.migrations_in_out_aggregate)
        },
        async fetchCountries({commit}) {
            const {data} = await apolloClient.query({query: queryAllCountries})
            commit('FETCH_COUNTRIES', data.countries)
        },
        async fetchMigrations({commit}) {
            const {data} = await apolloClient.query({query: queryMigrations})
            commit('FETCH_MIGRATIONS', data.migrations)
        }

    }
})
