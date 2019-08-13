<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-subheader class="pl-0">Select value</v-subheader>
                <v-slider
                        min="10"
                        max="500"
                        v-model="limit"
                        thumb-label="always"
                ></v-slider>
            </v-col>
        </v-row>
        <v-row class="hello" ref="chartdiv">
        </v-row>
    </v-container>
</template>

<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import {mapGetters} from "vuex";
    import _ from 'underscore'

    //todo filter & aggregate by continent
    export default {
        name: 'HelloWorld',
        data() {
            return {
                limit: 10
            }
        },
        watch: {
            limit: function () {
                this.renderChart()
            }
        },
        computed: {
            ...mapGetters(['chordData']),
            filterd: function () {
                console.log('change');
                return this.chordData.filter(el => el.value > this.limit)
            }
        },
        beforeCreate() {
            this.$store.dispatch('fetchMigrations')
        },
        mounted() {
            this.renderChart()
        },

        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        },
        methods: {
            renderChart: _.debounce(function () {

                let chart = am4core.create(this.$refs.chartdiv, am4charts.ChordDiagram);

                chart.paddingRight = 20;
                chart.data = this.filterd;
                chart.dataFields.fromName = "from";
                chart.dataFields.toName = "to";
                chart.dataFields.value = "value";
            }, 500)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
        width: 100%;
        height: 500px;
    }
</style>
