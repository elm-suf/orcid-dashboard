<template>
    <v-flex xs12>
        <ve-heatmap :events="chartEvents" :data="heatMapData" :settings="chartSettings"></ve-heatmap>
    </v-flex>
</template>


<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HeatMap",
        computed: mapGetters([
            'heatMapData',
            // 'countries'
        ]),
        created() {
            this.chartSettings.xAxisList = this.heatMapData.map(el => el.from)
            this.chartSettings.yAxisList = this.heatMapData.map(el => el.to)
        },
        methods: {},
        data() {
            this.chartSettings = {
                xAxisList: [],
                yAxisList: [],
                series: {
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        normal: {
                            show: true
                        }
                    },
                }
            };
            this.chartEvents = {
                click: (e) => {
                    self.name = e.name
                    console.log(e, name, self.name)
                    this.$store.dispatch('updateCurrent', name)
                }
            };
            //     return {
        }
    }

</script>

<style scoped>

</style>
