<!--&lt;!&ndash;||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||&ndash;&gt;-->
<!--<template>-->
<!--    <v-card dark class="mx-auto">-->

<!--        <v-card-actions class="mt-2  justify-center">-->
<!--            <v-col class="col-9">-->
<!--                <v-combobox-->
<!--                        label="Select countries to compare"-->
<!--                        v-model="selectedCountries"-->
<!--                        :items="countries"-->
<!--                        chips-->
<!--                        item-text="name"-->
<!--                        item-value="string"-->
<!--                        clearable multiple hide-selected light solo>-->
<!--                    <template v-slot:selection="{ attrs, item, select, selected }">-->
<!--                        <v-chip v-bind="attrs" :input-value="selected" close @click="select"-->
<!--                                @click:close="remove(item)">-->
<!--                            <strong>{{ item.code }} </strong>&nbsp;-->
<!--                        </v-chip>-->
<!--                    </template>-->
<!--                </v-combobox>-->

<!--            </v-col>-->
<!--            <v-col class="col-2">-->
<!--                <v-btn class="ml-10" dark depressed fab @click="toggle">-->
<!--                    <v-icon large>-->
<!--                        {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}-->
<!--                    </v-icon>-->
<!--                </v-btn>-->
<!--            </v-col>-->
<!--        </v-card-actions>-->

<!--        <v-card-text>-->

<!--            <v-row>-->
<!--                <v-card light>-->
<!--                        <span class="subheading"><h2>Current Year : {{curr_year}}</h2></span>-->
<!--                    <v-layout text-center wrap>-->
<!--                        <svg id="map"-->
<!--                             viewBox="0 0 960 500 "-->
<!--                             class="binded"-->
<!--                             :width="width"-->
<!--                             :height="height">-->
<!--                            <g class="group">-->
<!--                                <path :d="generatePath" class="sphere"></path>-->
<!--                                <path-->
<!--                                        class="land"-->
<!--                                        v-for="(count , index) in features.features"-->
<!--                                        :key="index"-->
<!--                                        :d="generator(count)"-->
<!--                                        :fill="colorScale(getValue(count.id))"-->
<!--                                        @click="countryClicked(count)"-->
<!--                                >-->
<!--                                    <title>{{getNameByNumeric(count.id)}}</title>-->
<!--                                </path>-->
<!--                            </g>-->
<!--                        </svg>-->
<!--                    </v-layout>-->
<!--                    <ve-line :data="lineData"></ve-line>-->
<!--                </v-card>-->
<!--            </v-row>-->
<!--        </v-card-text>-->

<!--    </v-card>-->

<!--</template>-->


<!--<script>-->

<!--    import {mapGetters} from "vuex";-->
<!--    import {-->
<!--        codes,-->
<!--        byAlpha2,-->
<!--        byAlpha3,-->
<!--        byNumeric,-->
<!--    } from 'iso-country-codes';-->
<!--    import {tsv, json, geoPath, geoMercator, scaleLinear, scalePow, schemeBlues} from "d3";-->
<!--    import {feature} from "topojson";-->

<!--    export default {-->
<!--        name: 'choropleth',-->
<!--        components: {},-->
<!--        data() {-->
<!--            return {-->
<!--                countriesObj: {},-->
<!--                chips: [],-->
<!--                // selectedCountries: [],-->
<!--                lineData: {-->
<!--                    columns: ['year', 'migrations'],-->
<!--                    rows: []-->
<!--                },-->
<!--                minValue: 0,-->
<!--                maxValue: 0,-->
<!--                projection: geoMercator(),-->
<!--                chartData:-->
<!--                    {-->
<!--                        columns: ["country", "value"],-->
<!--                        rows:-->
<!--                            []-->
<!--                    },-->
<!--                features: {},-->
<!--                detailInfo: {},-->
<!--                curr: [],-->
<!--                curr_year: 0,-->
<!--                range: [0, 22000],-->
<!--                isPlaying: false,-->
<!--                width: 960,-->
<!--                height: 480-->
<!--            }-->
<!--        }-->
<!--        ,-->
<!--        beforeCreate() {-->
<!--            this.$store.dispatch('fetchSeries')-->
<!--            this.$store.dispatch('fetchCountries').then(()=>{-->
<!--                console.log('createds')-->
<!--                this.countries.forEach(el => console.log(el))-->
<!--                this.countries.forEach(el => this.countriesObj[el.code] = el)-->
<!--                console.log('createds')-->
<!--            })-->
<!--        }-->
<!--        ,-->
<!--        computed: {-->
<!--            ...-->
<!--                mapGetters([-->
<!--                    'series',-->
<!--                    'years',-->
<!--                    'countries'-->
<!--                ]),-->
<!--            colorScale() {-->
<!--                return scalePow()-->
<!--                    .exponent(0.5)-->
<!--                    .domain([this.minValue, this.maxValue])-->
<!--                    .range(['white', 'blue']);-->
<!--            }-->
<!--            ,-->
<!--            generator() {-->
<!--                return geoPath().projection(this.projection);-->
<!--            }-->
<!--            ,-->
<!--            generatePath() {-->
<!--                return this.generator({type: "Sphere"});-->
<!--            }-->
<!--        }-->
<!--        ,-->
<!--        created() {-->

<!--        }-->
<!--        ,-->
<!--        mounted() {-->

<!--            // tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv").then(res => {-->
<!--            //     console.log(res);-->
<!--            //     res.forEach(el => {-->
<!--            //         this.detailInfo[el.iso_n3] = el.name;-->
<!--            //     });-->
<!--            // });-->

<!--            json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(data => {-->
<!--                this.features = feature(data, data.objects.countries);-->
<!--            });-->
<!--        }-->
<!--        ,-->
<!--        methods: {-->
<!--            countryClicked(country) {-->
<!--                let code = this.getNameByNumeric(country.id).alpha2;-->
<!--                console.log(code)-->
<!--                if (!this.selectedCountries.includes(this.countriesObj[code]))-->
<!--                    this.selectedCountries.push(this.countriesObj[code])-->
<!--            },-->
<!--            getNameByNumeric(id) {-->
<!--                // console.log(byNumeric[id]);-->
<!--                return byNumeric[id]-->
<!--            },-->
<!--            getValue(id) {-->
<!--                let byNumericElement = byNumeric[id];-->
<!--                if (byNumericElement !== undefined) {-->
<!--                    let tmp = this.chartData.rows.filter(el => el.country === byNumeric[id].alpha2);-->
<!--                    if (tmp.length > 0)-->
<!--                        return tmp[0].value;-->
<!--                }-->
<!--                return 0;-->
<!--            }-->
<!--            ,-->
<!--            merge(arr1, arr2) {-->
<!--                // Merge the arrays, and set up an output array.-->
<!--                const merged = [...arr1, ...arr2];-->
<!--                const out = [];-->

<!--                // Loop over the merged array-->
<!--                for (let obj of merged) {-->

<!--                    // Destructure the object in the current iteration to get-->
<!--                    // its id and quantity values-->
<!--                    const {country, value} = obj;-->
<!--                    if (obj.value > this.maxValue)-->
<!--                        this.maxValue = obj.value / 2;-->

<!--                    // Find the object in out that has the same id-->
<!--                    const found = out.find(obj => obj.country === country);-->

<!--                    // If an object *is* found add this object's quantity to it...-->
<!--                    if (found) {-->
<!--                        found.value += value;-->

<!--                        // ...otherwise push a copy of the object to out-->
<!--                    } else {-->
<!--                        out.push({...obj});-->
<!--                    }-->
<!--                }-->

<!--                return out;-->
<!--            }-->
<!--            ,-->
<!--            race() {-->
<!--                console.log('race', this.isPlaying);-->
<!--                let i = this.years.shift();-->
<!--                this.curr_year = i;-->
<!--                console.log('mounted', this.series[i]);-->

<!--                let sum = 0;-->
<!--                if (this.series[i] !== undefined)-->
<!--                    this.series[i].forEach(el => sum += el.value);-->
<!--                    console.log('sum', this.series[i], sum);-->
<!--                //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\-->
<!--                this.lineData.rows.push({'migrations': sum, 'year': i.toString()});-->


<!--                let tmp = this.merge(this.series[i], this.curr)-->
<!--                // curr = this.series[i].sort((a, b) => a.value - b.value)-->
<!--                this.curr = tmp.sort((a, b) => a.value - b.value)-->
<!--                this.chartData.rows = this.curr;-->

<!--                return (() => {-->
<!--                    if (i === undefined || !this.isPlaying)-->
<!--                        return;-->
<!--                    else-->
<!--                        setTimeout(this.race(), 500);-->
<!--                })-->
<!--            }-->
<!--            ,-->
<!--            toggle() {-->
<!--                this.isPlaying = !this.isPlaying;-->
<!--                console.log(this.isPlaying);-->
<!--                setTimeout(this.race(), 500);-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--    ;-->
<!--</script>-->
<!--<style>-->
<!--    .land:hover {-->
<!--        fill: crimson;-->
<!--    }-->
<!--</style>-->
