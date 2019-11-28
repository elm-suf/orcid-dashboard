<template>
    <v-card height="100%" supportingtext="true">

        <v-card-text style="height: 84%;">
            <ve-line :legend-visible=true :data="lineData"></ve-line>

            <!--            <span class="subheading"><h2>Current Year : {{curr_year}}</h2></span>-->
        </v-card-text>

        <v-card-actions class="mr-2 mb-2">
            <v-row align="end" justify="end">
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
        <!--        <v-card-text>{{lineData}}</v-card-text>-->
        <!--        <v-card-text>{{series}}</v-card-text>-->
    </v-card>
</template>


<script>
    import {mapGetters} from "vuex";

    export default {
        beforeCreate() {
            this.$store.dispatch('fetchLineSeries');
            this.$store.dispatch('years');
        },
        created() {
            let func = () => {

            }
            setTimeout(func(), 1500);

        },
        name: "LineChart",
        data() {
            return {
                lineData: {
                    columns: ['year'],
                    rows: []
                },
                curr: [],
                curr_year: 0,
                range: [0, 22000],
                isPlaying: false
            }
        },
        computed: {
            ...mapGetters(
                {
                    series: 'fetchLineSeries',
                    years: 'years'
                }
            )
        },
        methods: {
            race() {
                let i = this.years.shift();
                this.curr_year = i;
                if (i < 1990) {
                    setTimeout(this.race(), 500);
                    return;
                }
                let cols = this.getCols(this.series[i]);
                let rows = this.getRows(this.series[i], i);
                // console.log('line', cols, rows);

                let tmp = this.merge(this.series[i], this.curr)
                // curr = this.series[i].sort((a, b) => a.value - b.value)
                this.curr = tmp.sort((a, b) => a.value - b.value)
                // this.chartData.rows = this.curr;

                return (() => {
                    if (i === undefined || !this.isPlaying)
                        return;
                    else
                        setTimeout(this.race(), 500);
                })
            }
            ,
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
            }
            ,
            toggle() {
                this.isPlaying
                    = !this.isPlaying;
                console.log(this.isPlaying);
                setTimeout(this.race(), 500);
            }
            ,
            getRows(series, i) {
                let row = {year: i.toString()};
                series.forEach(el => {

                    row[el.country] = el.value
                })
                console.log('cols', row);

                this.lineData.rows.push(row);
                return [];
            }
            ,
            getCols(series) {
                series.forEach(item => {
                    if (!this.lineData.columns.includes(item.country))
                        this.lineData.columns.push(item.country)
                });
                return [];
            }
        }
    }
    ;
</script>
