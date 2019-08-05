<template>
    <ve-heatmap :data="heatMapData" :settings="chartSettings"></ve-heatmap>
</template>


<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HeatMap",
        computed: mapGetters([
            'heatMapData',
            'countries'
        ]),
        created(){
          this.chartSettings.xAxisList= this.countries
          this.chartSettings.yAxisList= this.countries
        },
        data () {
            this.chartSettings = {
                xAxisList: [],
                yAxisList: []
            }
        //     return {
        //         chartData: {
        //             columns: ['week', 'location', 'person'],
        //             rows: [
        //                 { 'week': 'Monday', 'location': 'Beijing', 'person': 1000 },
        //                 { 'week': 'Tuesday', 'location': 'Shanghai', 'person': 400 },
        //                 { 'week': 'Wednesday', 'location': 'Hangzhou', 'person': 800 },
        //                 { 'week': 'Tuesday', 'location': 'Shenzhen', 'person': 200 },
        //                 { 'week': 'Wednesday', 'location': 'Changhcun', 'person': 100 },
        //                 { 'week': 'Friday', 'location': 'Nanjing', 'person': 300 },
        //                 { 'week': 'Thursday', 'location': 'Jiangsu', 'person': 800 },
        //                 { 'week': 'Wednesday', 'location': 'Beijing', 'person': 700 },
        //                 { 'week': 'Wednesday', 'location': 'Shanghai', 'person': 300 },
        //                 { 'week': 'Tuesday', 'location': 'Hangzhou', 'person': 500 }
        //             ]
        //         }
        //     }
        }
    }

</script>

<style scoped>

</style>
