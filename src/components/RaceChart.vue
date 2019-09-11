<template>
    <v-container>
        <v-card
                class="mx-auto"
        >
            <v-toolbar flat dense>
                <v-toolbar-title>
                    <span class="subheading"><h2>Current Year : {{curr_year}}</h2></span>
                </v-toolbar-title>
                <div class="flex-grow-1"></div>
            </v-toolbar>

            <v-card-text>
                <v-row
                        class="mb-4"
                        justify="space-between"
                >

                    <v-col class="text-right">
                        <v-btn
                                dark
                                depressed
                                fab
                                @click="toggle"
                        >
                            <v-icon large>
                                {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>


        <v-layout text-center wrap>
            <v-flex xs12>
                <ve-histogram :data="chartData"></ve-histogram>
            </v-flex>
            <v-range-slider
                    v-model="range"
            ></v-range-slider>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: 'RaceChart',
        data() {
            return {
                chartData: {
                    columns: ["country", "value"],
                    rows: []
                },
                curr: [],
                curr_year: 0,
                range: [0, 22000],
                isPlaying: false
            }
        },
        beforeCreate() {
            this.$store.dispatch('fetchSeries')
        },
        computed: {
            ...mapGetters([
                'series',
                'years'
            ])
        },
        created() {
            let func = () => {

            }
            setTimeout(func(), 500);

        },
        methods: {
            merge(arr1, arr2) {
                // Merge the arrays, and set up an output array.
                const merged = [...arr1, ...arr2];
                const out = [];

                // Loop over the merged array
                for (let obj of merged) {

                    // Destructure the object in the current iteration to get
                    // its id and quantity values
                    const {country, value} = obj;

                    // Find the object in out that has the same id
                    const found = out.find(obj => obj.country === country);

                    // If an object *is* found add this object's quantity to it...
                    if (found) {
                        found.value += value;

                        // ...otherwise push a copy of the object to out
                    } else {
                        out.push({...obj});
                    }
                }

                return out;
            },
            race() {
                console.log('race', this.isPlaying);
                let i = this.years.shift();
                this.curr_year = i
                console.log('mounted', this.series[i]);


                let tmp = this.merge(this.series[i], this.curr)
                // curr = this.series[i].sort((a, b) => a.value - b.value)
                this.curr = tmp.sort((a, b) => a.value - b.value)
                this.chartData.rows = this.curr;

                return (() => {
                    if (i === undefined || !this.isPlaying)
                        return;
                    else
                        setTimeout(this.race(), 500);
                })
            },
            toggle() {
                this.isPlaying = !this.isPlaying;
                console.log(this.isPlaying);
                setTimeout(this.race(), 500);
            }
        }
    };
</script>
