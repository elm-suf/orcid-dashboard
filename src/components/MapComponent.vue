<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-row class="my-0">
                    <div v-for="(item, key) in projections" :key="key" class="my-2 col">
                        <v-btn @click="selected(item)">{{key}}</v-btn>
                    </div>
            </v-row>
            <v-flex xs12>
                <!-- <input type="select"> -->


                <svg id="map"
                     viewBox="0 0 960 500 "
                     class="binded"
                     :width="width"
                     :height="height"
                >
                    <g class="group">
                        <path :d="generatePath" class="sphere"></path>
                        <path
                                class="land"
                                v-for="(count , index) in countries.features"
                                :key="index"
                                :d="generator(count)"
                                @click="countryClicked(count)"
                        >
                            <title>{{getNameByNumeric(count.id)}}</title>
                        </path>
                    </g>
                </svg>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {select, selectAll, tsv, json, geoPath, geoMercator} from "d3";
    import {
        codes,
        byAlpha2,
        byAlpha3,
        byNumeric,
    } from 'iso-country-codes';

    import {
        geoAzimuthalEqualArea,
        geoNaturalEarth1,
        geoTransverseMercator
    } from "d3-geo";
    import {feature} from "topojson";

    export default {
        name: "Map",
        data() {
            return {
                projection: geoNaturalEarth1(),
                projections: {
                    geoMercator: geoMercator(),
                    geoAzimuthalEqualArea: geoAzimuthalEqualArea(),
                    geoNaturalEarth1: geoNaturalEarth1(),
                    geoTransverseMercator: geoTransverseMercator()
                },
                countries: {},
                detailInfo: {},
                width: 960,
                height: 500
            };
        },
        mounted() {
            // const { width } = this.$el.getBoundingClientRect();

            tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv").then(res => {
                res.forEach(el => {
                    this.detailInfo[el.iso_n3] = el.name;
                });
            });

            json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(data => {
                this.countries = feature(data, data.objects.countries);
            });


        },

        watch: {},
        computed: {
            generator() {
                return geoPath().projection(this.projection);
            },
            generatePath() {
                return this.generator({type: "Sphere"});
            }
        },
        methods: {
            getNameByNumeric(id){
                console.log(byNumeric[id]);
                return byNumeric[id]
            },
            countryClicked(count) {
                console.log("count", count);
            },
            selected(item) {
                console.log("SELECTED", item);
                this.projection = item;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .binded {
        display: inline-block;
        position: relative;
        width: 100%;
        vertical-align: middle;
        overflow: hidden;
    }

    .sphere {
        background: #200491;
        fill: #200491;
    }

    svg {
        background: #2c3e50;
    }

    path {
        margin: 200px;
        fill: #42b983;
        stroke: rgb(88, 45, 45);
    }

    .land:hover {
        fill: crimson;
    }

    rect {
        fill: red;
    }
</style>
