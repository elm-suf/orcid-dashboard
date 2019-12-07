<!--<template>-->
<!--    <v-container fluid style="max-height: 100%; overflow: auto">-->
<!--        <v-row class="">-->
<!--            <div class="col col-md-6  col-sm-12">-->
<!--                <map-component></map-component>-->
<!--                <combo></combo>-->
<!--            </div>-->
<!--            <div class="col col-md-6  col-sm-12 " style="">-->
<!--                <ve-bar :data="barData" :settings="chartSettings"></ve-bar>-->
<!--            </div>-->
<!--        </v-row>-->

<!--        <v-row>-->
<!--            <v-card class="col  mx-4">-->
<!--                <ve-line :data="lineData"></ve-line>-->
<!--            </v-card>-->
<!--            <v-btn-->
<!--                    class="mb-4 mr-4"-->
<!--                    color="pink"-->
<!--                    dark-->
<!--                    fixed-->
<!--                    bottom-->
<!--                    right-->
<!--                    fab>-->
<!--                <v-icon>mdi-play</v-icon>-->

<!--            </v-btn>-->
<!--        </v-row>-->
<!--    </v-container>-->
<!--</template>-->

<template>
    <div class="parent ">
        <div class="main">
            <v-card height="100%">
                <map-component></map-component>
                <v-card-actions class="mt-4">
                    <combo></combo>
                </v-card-actions>
            </v-card>
        </div>
        <div class="right">
            <v-card height="100%" v-if="!detailedView">
                <ve-bar height="520px" :data="barData" :settings="chartSettings" :events="chartEvents">
                </ve-bar>
            </v-card>
            <v-card height="100%" v-if="detailedView">
                <i @click="chartEvents.click" class="fa fa-arrow-left mt-4 ml-4" aria-hidden="true"></i>
                <ve-histogram height="480px" :data="detailBarData" :settings="detailSettings"></ve-histogram>
            </v-card>
        </div>
        <div class="bottom">
            <v-card>
                <ve-line height="42vh" :data="lineData"></ve-line>
            </v-card>
        </div>
    </div>
</template>

<script>
    import Combo from "../_components/ComparingComponent";
    import MapComponent from "../components/MapComponent";
    import LineChart from "../components/LineChart";
    import BarChart from "../components/BarChart";
    import {mapGetters, mapState} from "vuex";

    export default {
        name: "Dashboard",
        components: {MapComponent, Combo, LineChart, BarChart},
        created() {
            this.$store.dispatch("fetchCountries");
            // this.$store.dispatch('fetchMigrations');
        },
        data() {
            return {
                windowSize: {
                    x: 0,
                    y: 0
                },
                isPlaying: false,
                chartSettings: {
                    stack: {
                        xxx: ["in", "out"]
                    },
                    dataOrder: {
                        label: "in",
                        order: "desc"
                    }
                },
                detailSettings: {
                    dataOrder: {
                        label: "in",
                        order: "desc"
                    }
                },
                detailedView: null,
                chartEvents: {
                    click: e => {
                        console.log(e);
                        this.flip();
                        this.$store.dispatch("updateCurrent", e.name);
                    }
                }
            };
        },
        computed: {
            ...mapState(["selectedCountries"]),
            ...mapGetters([
                "barData",
                "detailBarData",
                "lineData",
                "lines",
                "selectedCountry"
                // 'countries',
                // 'dashBar'
            ])
        },
        methods: {
            onResize() {
                this.windowSize = {x: window.innerWidth, y: window.outerHeight};
            },
            flip() {
                this.detailedView = !this.detailedView;
            }
        }
    };
</script>

<style scoped>
    .parent {
        margin: 4px;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 8px;
        grid-row-gap: 8px;
        grid-template-areas: "main main right" "main main right" "main main right" "bottom bottom bottom" "bottom bottom bottom";
    }

    .right {
        grid-area: right;
    }

    .bottom {
        grid-area: bottom;
        background: #2c3e50;
    }

    .main {
        grid-area: main;

    }
</style>
