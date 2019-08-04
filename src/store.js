import Vue from 'vue'
import Vuex from 'vuex'
import {apolloClient} from './apollo'
import gql from "graphql-tag";
// import {inAndOutFromC1} from './apollo/queries'

Vue.use(Vuex)


const inAndOutFromC1 = gql`
    query inAndOutFromC1($c1: String!){
        migrations_in_out_aggregate(where: {c1: {_eq: $c1}}){
            nodes {
                c2
                in
                out
            }
        }
    }`;
const queryAllCountries = gql`
    {
        countries: migrations_in_out(distinct_on: c1) {
            code: c1
        }
    }`;
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
