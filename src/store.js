import Vue from 'vue'
import Vuex from 'vuex'
import {apolloClient} from './apollo'
import {inAndOutFromC1, queryMigrations, queryAllCountries, queryGraph} from './apollo/queries'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        inAndOut: [],
        countries: [],
        migrations: [],
        graphData: [],
        selectedCountry: ""
    },
    getters: {
        // getMatrix: state => {
        //     let mat = [];
        //     state.countries.forEach((el, i) => {
        //         mat[i] = {
        //             'code': el.code,
        //             len: state.migrations.filter(cc => cc.from === el.code).length,
        //             count_0: state.migrations.filter(cc => cc.from === el.code).filter(x => x === 0).length,
        //             values: state.migrations.filter(cc => cc.from === el.code)
        //         }
        //     });
        //
        //     mat = mat.filter(row => row.len > 5);
        //     const countryList = mat.map(el => el.code);
        //
        //     var ret = Array(mat.length).fill(Array(mat.length).fill(0));
        //     // //todo don't use state.countries.forEach || instead use a filtered list from the line above
        //     mat.forEach((row, row_index) => {
        //         countryList.forEach((country, index) => {
        //                 let find = row.values.find(el => el.to === country);
        //                 if (find != undefined)
        //                     ret[row_index][index] = find.value
        //             }
        //         )
        //     });
        //     return {
        //         names: countryList,
        //         matrix: ret
        //     }
        //     // var ret = Array(state.countries.length).fill(Array(state.countries.length).fill(0));
        //     // mat.filter(row => row.values.every(val => val === row[0]))
        //     // //todo don't use state.countries.forEach || instead use a filtered list from the line above
        //     // mat.forEach((row, row_index) => {
        //     //     state.countries.forEach((country, index) => {
        //     //             let find = row.values.find(el => el.to == country.code);
        //     //             if (find != undefined)
        //     //                 ret[row_index][index] = find.value
        //     //         }
        //     //     )
        //     // });
        //     // return mat.filter(row=> row.len>5)
        // },
        migrations: state => {
            return state.migrations
        },
        chordData: state => {
            return state.migrations
        },
        inAndOut:
            state => {
                return state.inAndOut
            },
        countries:
            state => {
                return state.countries.map(el => el.code)
            },
        selectedCountry:
            state => {
                return state.selectedCountry
            },
        chartData:
            state => {
                return {
                    columns: ["c2", "in", "out"],
                    rows: state.inAndOut
                }
            },
        heatMapData:
            state => {
                return {
                    columns: ["from", "to", "value"],
                    rows: state.migrations
                }
            },
        graphData:
            state => {
                return {
                    columns: ["from", "to", "value"],
                    rows: state.migrations
                }
            }
    }
    ,
    mutations: {
        FETCH_GRAPH(state, graphData) {
            state.graphData = graphData
        }
        ,
        FETCH_COUNTRIES_FROM_C1(state, inAndOut) {
            state.inAndOut = inAndOut.nodes
        }
        ,
        FETCH_MIGRATIONS(state, migrations) {
            state.migrations = migrations
        }
        ,
        FETCH_COUNTRIES(state, countries) {
            state.countries = countries
        }
        ,
        UPDATE_CURRENT(state, newVal) {
            state.selectedCountry = newVal
        }
    }
    ,
    actions: {
        updateCurrent({commit, dispatch}, selected) {
            commit('UPDATE_CURRENT', selected)
            dispatch('fetchInAndOutFromC1')
        }
        ,
        async fetchInAndOutFromC1({commit, state}) {
            const {data} = await apolloClient.query({query: inAndOutFromC1, variables: {c1: state.selectedCountry}})
            commit('FETCH_COUNTRIES_FROM_C1', data.migrations_in_out_aggregate)
        }
        ,
        async fetchCountries({commit}) {
            const {data} = await apolloClient.query({query: queryAllCountries})
            commit('FETCH_COUNTRIES', data.countries)
        }
        ,
        async fetchMigrations({commit}) {
            const {data} = await apolloClient.query({query: queryMigrations})
            commit('FETCH_MIGRATIONS', data.migrations)
        }
        ,
        async fetchGraph({commit}) {
            const {data} = await apolloClient.query({query: queryGraph})
            commit('FETCH_GRAPH', data)
        }

    }
})
