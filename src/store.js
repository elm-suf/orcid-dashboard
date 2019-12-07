import Vue from 'vue'
import Vuex from 'vuex'
import {apolloClient} from './apollo'
import {
    inAndOutFromC1,
    queryMigrations,
    queryAllCountries,
    queryGraph,
    querySeries,
    queryLines,
    queryDetails
} from './apollo/queries'
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
        lines: {}
    },
    getters: {
        selectedCountry: state => state.selectedCountry,
        barData: (state) => {
            return {
                columns: ['country', 'in', 'out'],
                rows: state.selectedCountries.map(el => el.migrations[0])
            }
        },
        lineData: (state, getters) => {

            let tmp = {};
            let rows = []

            state.selectedCountries.map(country => country.series)
                .forEach(it =>
                    it.forEach(item => {
                        if (tmp[item.year] === undefined)
                            tmp[item.year] = []
                        // tmp[item.year].push({'value': item.value, 'country': item.country})
                        tmp[item.year].push({country: item.country, value: item.value})
                    }));
            for (let key in tmp) {
                let row = {'year': key};
                tmp[key].forEach(el => row[el.country] = el.value)
                rows.push(row)
            }


            return {
                columns: ['year'].concat(state.selectedCountries.map(el => el.alpha2)),
                rows
            }
        },

        detailBarData: state => {
            return {
                columns: ['country', 'in', 'out'],
                rows: state.selectedCountry.in_and_out.filter(el => el.in > 5 && el.out > 10)
            }

        },
        countries: state => state.allCountries.map(el => byAlpha2[el.iso2]),
    },
    mutations: {
        FETCH_COUNTRIES(state, countries) {
            console.log(countries)
            state.allCountries = countries
        },
        UP_CURRENT(state, iso2) {
            console.log(iso2)
            state.selectedCountry = byAlpha2[iso2]
        },
        INIT(state) {
            state.selectedCountries = []
        },
        ADD_TO_SELECTED(state, data) {
            if (!state.selectedCountries.includes(data))
                state.selectedCountries.push(data)
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
        updateCurrent({commit}, iso2) {
            commit('UP_CURRENT', iso2)
        },
        async selectCountry({commit, dispatch}, country) {
            console.log(country)
            const {data} = await apolloClient.query({query: queryDetails, variables: {c1: country.alpha2}})
            // Object.assign(country, )
            country.migrations = data.all_migrations;
            country.series = data.series;
            country.in_and_out = data.in_and_out;

            commit('ADD_TO_SELECTED', country)
        },
        deselect({commit}, country) {
            commit('DESELECT', country)
        },
        async fetchCountries({commit}) {
            const {data} = await apolloClient.query({query: queryAllCountries})
            commit('FETCH_COUNTRIES', data.countries)
        }
    }
})
