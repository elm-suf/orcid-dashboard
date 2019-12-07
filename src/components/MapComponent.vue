<template>
    <!--    <v-row align="start" justify="center" style="height: 100%; background: pink">-->
    <!--        <v-col cols="12" style="height: 80%">-->
    <!--        </v-col>-->
    <!--        <v-col cols="12" style="height: 20%">-->
    <!--            <combo></combo>-->
    <svg id="map"
         viewBox="0 0 960 510"
         class="binded"
         :width="width"
         :height="height">
        <g class="group">
            <path :d="generatePath" class="sphere"></path>
            <path
                    v-for="(count , index) in countries.features"
                    :class="{selected : isSelected(count.id), land:true}"
                    :key="index"
                    :d="generator(count)"
                    @click="countryClicked(count)"
            >
                <title>{{getNameByNumeric(count.id)}}</title>
            </path>
        </g>
    </svg>
    <!--    </v-row>-->
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
    import Combo from "../_components/ComparingComponent";
    import {mapGetters, mapState} from "vuex";

    export default {
        name: "MapComponent",
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
                height: 366
            };
        },
        mounted() {
            const {width, height} = this.$el.getBoundingClientRect();
            this.width = width;
            this.height = height;
            tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv").then(res => {
                res.forEach(el => {
                    this.detailInfo[el.iso_n3] = el.name;
                });
            });

            json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(data => {
                this.countries = feature(data, data.objects.countries);
            });


        },

        created() {
            // this.$store.dispatch('selectedCountries')
        },
        computed: {
            ...mapState([
                'selectedCountries'
            ]),
            generator() {
                return geoPath().projection(this.projection);
            },
            generatePath() {
                return this.generator({type: "Sphere"});
            },

        },
        methods: {
            isSelected(count) {
                const item = byNumeric[count]
                // console.log('item', count, item, this.selectedCountries)
                return this.selectedCountries.includes(item);
            },
            getNameByNumeric(id) {
                return byNumeric[id]
            },
            countryClicked(count) {
                // console.log("count", count, );
                this.$store.dispatch('selectCountry', byNumeric[count.id])
            },
            selected(item) {
                console.log("SELECTED", item);
                this.projection = item;
            }
        }
    }
    ;
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

    .unselected {
        fill: darkgray;
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
        fill: darkgrey;
        stroke: rgb(88, 45, 45);
    }

    .selected{
        fill: #42b983;
    }

    .path:hover {
        fill: crimson;
    }

    rect {
        fill: red;
    }

</style>
