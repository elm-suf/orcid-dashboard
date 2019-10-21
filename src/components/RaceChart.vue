<template>
    <v-card class="mx-auto" width="960">
        <v-layout text-center wrap>
            <v-flex xs12>
                <ve-histogram :data="chartData"></ve-histogram>
                <ve-line :data="lineData"></ve-line>
            </v-flex>
        </v-layout>
        <v-card-text>
            <span class="subheading"><h2>Current Year : {{curr_year}}</h2></span>
        </v-card-text>

        <v-card-actions class="mr-2 mb-2">
            <v-row align="center" justify="end">
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
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'RaceChart',
        data() {
            return {
                lineData: {
                    columns: [],
                    rows: []
                },
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
                const result = [];
                // Loop over the merged array
                for (let obj of merged) {
                    // Destructure the object in the current iteration to get
                    // its id and quantity values
                    const {country, value} = obj;

                    // Find the object in out that has the same id
                    const found = result.find(obj => obj.country === country);

                    // If an object *is* found add this object's quantity to it...
                    if (found) {
                        found.value += value;

                        // ...otherwise push a copy of the object to out
                    } else {
                        result.push({...obj});
                    }
                }
                return result;
            },
            race() {
                console.log('race', this.isPlaying);
                let i = this.years.shift();
                this.curr_year = i
                console.log('race start', this.series[i]);

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
