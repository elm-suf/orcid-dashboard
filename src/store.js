import Vue from 'vue'
import Vuex from 'vuex'
import {apolloClient} from './apollo'
import {inAndOutFromC1, queryMigrations, queryAllCountries, queryGraph, querySeries, queryLines} from './apollo/queries'
import {
    codes,
    byAlpha2,
    byAlpha3,
    byNumeric,
} from 'iso-country-codes';

Vue.use(Vuex);
// country {
//     area
//     continent
//     currency
//     fips
//     gdp
//     internet_hosts
//     internet_users
//     iso2
//     iso3
//     language_codes
//     languages
//     name
//     phoneslandline
//     phonesmobile
// }


export default new Vuex.Store({
    state: {
        selectedCountry: {},
        selectedCountries: [],
        allCountries: [],
    },
    getters: {
        //countries:Array[240]
        // 0:Object
        // __typename:"country"
        // code:"AD"
        // continent:"Europe"
        // name:"Andorra"
        countries: state => {
            return state.allCountries.map(el => byAlpha2[el.iso2])
        },
    },
    mutations: {
        INIT(state) {
            state.selectedCountries = []
        },
        ADD_TO_SELECTED(state, data) {
            if (!state.selectedCountries.includes(data))
                state.selectedCountries.push(data)
        },
        FETCH_COUNTRIES(state, countries) {
            console.log(countries)
            state.allCountries = countries
        },
        DESELECT(state, data) {
            if (state.selectedCountries.includes(data))
                state.selectedCountries.splice(state.selectedCountries.indexOf(data), 1)

        },
    }
    ,
    actions: {
        selectedCountries({commit}) {
            commit('INIT')
        },
        selectCountry({commit}, country) {
            commit('ADD_TO_SELECTED', country)
        },
        deselect({commit}, country) {
            commit('DESELECT', country)
        },

        // updateCurrent({commit, dispatch}, selected) {
        //     commit('UPDATE_CURRENT', selected)
        //     dispatch('fetchInAndOutFromC1')
        // },
        // async fetchInAndOutFromC1({commit, state}) {
        //     const {data} = await apolloClient.query({query: inAndOutFromC1, variables: {c1: state.selectedCountry}})
        //     commit('FETCH_COUNTRIES_FROM_C1', data.migrations_in_out_aggregate)
        // }
        // ,
        async fetchCountries({commit}) {
            const {data} = await apolloClient.query({query: queryAllCountries})
            commit('FETCH_COUNTRIES', data.countries)
        },
        // async fetchMigrations({commit}) {
        //     const {data} = await apolloClient.query({query: queryMigrations})
        //     commit('FETCH_MIGRATIONS', data.migrations)
        // }
        // ,
        // async fetchGraph({commit}) {
        //     const {data} = await apolloClient.query({query: queryGraph})
        //     commit('FETCH_GRAPH', data)
        // },
        // async fetchSeries({commit}) {
        //     const {data} = await apolloClient.query({query: querySeries})
        //     commit('FETCH_SERIES', data)
        // },
        // async fetchLineSeries({commit}) {
        //     const {data} = await apolloClient.query({query: queryLines})
        //     commit('FETCH_LINES', data)
        // }

    }
})
