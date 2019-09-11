<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-flex xs12>
                <!-- <input type="select"> -->
                <button v-for="(item, key) in projections" :key="key" @click="selected(item)">{{key}}</button>

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
                            <title>{{detailInfo[count.id]}}</title>
                        </path>
                    </g>
                </svg>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {select, selectAll, tsv, json, geoPath, geoMercator} from "d3";
    import * as d3 from 'd3';
    import {
        geoAzimuthalEqualArea,
        geoNaturalEarth1,
        geoTransverseMercator
    } from "d3-geo";
    import {feature} from "topojson";

    export default {
        name: "Map",
        // props: {
        //   width: {
        //     type: Number,
        //     default: 720
        //   },
        //   height: {
        //     type: Number,
        //     default: 460
        //   }
        // },
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

            console.log("created", select('#svg'));
            const zoom = d3.zoom()
                .scaleExtent([1, 40])
                .translateExtent([[0, 0], [this.width, this.height]])
                .extent([[0, 0], [this.width, this.height]])
                .on("zoom", this.zoomed);

            tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv").then(res => {
                res.forEach(el => {
                    this.detailInfo[el.iso_n3] = el.name;
                });
            });

            json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(data => {
                this.countries = feature(data, data.objects.countries);
                select("#svg").call(zoom)
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
            countryClicked(count) {
                console.log("count", count);
            },
            selected(item) {
                console.log("SELECTED", item);
                this.projection = item;
            },
            zoomed() {
                console.log('zooom')
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
