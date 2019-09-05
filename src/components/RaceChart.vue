<template>
    <v-container>
        <v-layout text-center wrap>
            <h2>Current Year : {{curr_year}}</h2>
            <v-flex xs12>
                <ve-bar :data="chartData"></ve-bar>
            </v-flex>
            <v-flex xs12>
                {{years}}
            </v-flex>
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
                curr_year : 0
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
        mounted() {

            let curr = []
            let func = () => {
                let i = this.years.shift();
                this.curr_year = i
                console.log('mounted', this.series[i]);
                curr = this.series[i].sort((a, b) => a.value - b.value)
                this.chartData.rows = curr;
                return function () {
                    if (i === undefined)
                        return;
                    else
                        setTimeout(func(), 500);
                }
            }

            setTimeout(func(), 500);

        }
    };
</script>
