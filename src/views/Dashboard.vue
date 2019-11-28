<template>
    <v-layout row wrap style="min-height: 100%; ">
        <v-col cols="12" class="" style="height: 64vh; background: blanchedalmond">
            <v-row justify="center" align="center" class="mx-auto" style="height: 100%; width: 100%;">
                <v-col cols="5" class="v-flex" style=" height: 100%">
                    <v-card
                            height="100%"
                            supportingtext="true">
                            <map-component></map-component>
                        <v-card-actions class="mt-auto">
                            <combo></combo>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="7" class="v-flex" style=" height: 100%">
<!--                    <v-card height="100%"-->
<!--                            supportingtext="true"-->
<!--                            dark>-->
                            <bar-chart></bar-chart>
<!--                    </v-card>-->
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" class="ml-6 px-2" style="height: 36vh;">
<!--            <v-btn-->
<!--                    dark-->
<!--                    depressed-->
<!--                    fab-->
<!--                    @click="toggle">-->
<!--                <v-icon large>-->
<!--                    {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}-->
<!--                </v-icon>-->
<!--            </v-btn>-->
            <v-btn align="" fixed large fab color="indigo" @click="fetchSome">
                <v-icon>mdi-play</v-icon>
            </v-btn>
            <ve-line height="320px" :legend-visible=true :data="lineData"></ve-line>
        </v-col>
    </v-layout>

</template>

<script>
    import Combo from "../_components/ComparingComponent";
    import MapComponent from "../components/MapComponent";
    import LineChart from "../components/LineChart";
    import BarChart from "../components/BarChart";


    export default {
        name: "Dashboard",
        components: {MapComponent, Combo, LineChart, BarChart},
        data() {
            return {
                isPlaying: false,
                lineData: {
                    columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
                    rows: [
                        { 'cost': 1523, 'date': '01/01', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
                        { 'cost': 1223, 'date': '01/02', 'profit': 1523, 'growthRate': 0.345, 'people': 100 },
                        { 'cost': 2123, 'date': '01/03', 'profit': 1523, 'growthRate': 0.7, 'people': 100 },
                        { 'cost': 4123, 'date': '01/04', 'profit': 1523, 'growthRate': 0.31, 'people': 100 },
                        { 'cost': 3123, 'date': '01/05', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
                        { 'cost': 7123, 'date': '01/06', 'profit': 1523, 'growthRate': 0.65, 'people': 100 }
                    ]
                },
            }
        },
        methods:{
            fetchSome(){
                console.log('fetchdsome')
                this.$store.dispatch('fetchMigrations')
            }
        }
    }
</script>

<style scoped>

</style>
