<template>
    <v-container fluid style="max-height: 100%; overflow: hidden">
        <v-row class="" style=" max-height: 48%">
            <div class="col col-md-6  col-sm-12">
                <map-component></map-component>
                <combo></combo>
            </div>
            <div class="col col-md-6  col-sm-12 " style="">
                <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
            </div>
        </v-row>

        <v-row style="max-height: 48%">
            <v-card class="col mx-4" style="">
                <ve-line :data="lineData"></ve-line>
            </v-card>
            <v-btn
                    class="mb-12 mr-4"
                    color="pink"
                    dark
                    absolute
                    bottom
                    right
                    fab
            >
                <v-icon>mdi-play</v-icon>

            </v-btn>

        </v-row>
    </v-container>
</template>

<script>
    import Combo from "../_components/ComparingComponent";
    import MapComponent from "../components/MapComponent";
    import LineChart from "../components/LineChart";
    import BarChart from "../components/BarChart";
    import {mapGetters} from "vuex";


    export default {
        name: "Dashboard",
        components: {MapComponent, Combo, LineChart, BarChart},
        created() {
            // this.$store.dispatch('fetchCountries');
            // this.$store.dispatch('fetchMigrations');
        },
        data() {
            return {
                isPlaying: false,
                lineData: {
                    columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
                    rows: [
                        {'cost': 1523, 'date': '01/01', 'profit': 1523, 'growthRate': 0.12, 'people': 100},
                        {'cost': 1223, 'date': '01/02', 'profit': 1523, 'growthRate': 0.345, 'people': 100},
                        {'cost': 2123, 'date': '01/03', 'profit': 1523, 'growthRate': 0.7, 'people': 100},
                        {'cost': 4123, 'date': '01/04', 'profit': 1523, 'growthRate': 0.31, 'people': 100},
                        {'cost': 3123, 'date': '01/05', 'profit': 1523, 'growthRate': 0.12, 'people': 100},
                        {'cost': 7123, 'date': '01/06', 'profit': 1523, 'growthRate': 0.65, 'people': 100}
                    ]
                },
                chartSettings: {
                    stack: {
                        'xxx': ['cost', 'profit']
                    }
                },
                chartData: {
                    columns: ['date', 'cost', 'profit'],
                    rows: [
                        {'date': '01/01', 'cost': 123, 'profit': 300},
                        {'date': '01/02', 'cost': 1223, 'profit': 600},
                        {'date': '01/03', 'cost': 2123, 'profit': 9000},
                        {'date': '01/04', 'cost': 4123, 'profit': 1200},
                        {'date': '01/05', 'cost': 3123, 'profit': 1500},
                        {'date': '01/06', 'cost': 7123, 'profit': 2000}
                    ]
                }
            }
        },
        computed: {
            ...
                mapGetters([
                    'selectedCountry',
                    'selectedCountries',
                    'countries',
                    'dashBar'
                ])
        }
        ,
        methods: {}
        ,
    }
</script>

<style scoped>
    .red {
        background: red;
    }
</style>
