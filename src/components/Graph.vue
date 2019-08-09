<template>

    <div id="main" style="width: 100%;height:100%;"></div>

</template>

<script>
    import dataTool from 'echarts/dist/extension/dataTool'
    import echarts from 'echarts'
    import axios from "axios";


    export default {
        name: "Graph",
        mounted() {
            let myChart = echarts.init(document.getElementById('main'));
            myChart.showLoading();

            // axios.get('https://raw.githubusercontent.com/jacomyal/sigmajs.org/master/assets/data/les-miserables.gexf')
            axios.get('/geo_graph.gexf')
                .then(d => {
                    let xml = d.data;
                    myChart.hideLoading();

                    let graph = echarts.dataTool.gexf.parse(xml);
                    console.log(graph)
                    var categories = ['South America', 'North America', 'Oceania', 'Asia', 'Africa', 'Europe'];
                    categories = categories.map((el) => {
                        return {name: el};
                    });


                    graph.nodes.forEach(function (node) {
                        node.itemStyle = null;
                        node.value = node.symbolSize;
                        node.symbolSize /= 5;
                        node.label = {
                            normal: {
                                show: node.symbolSize > 50
                            }
                        };
                        node.category = node.attributes.continent;
                    });
                    let option = {
                        title: {
                            text: 'Les Miserables',
                            subtext: 'Circular layout',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {},
                        legend: [{
                            // selectedMode: 'single',
                            data: categories
                        }],
                        animationDurationUpdate: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                name: 'Les Miserables',
                                type: 'graph',
                                layout: 'circular',
                                circular: {
                                    rotateLabel: true
                                },
                                data: graph.nodes,
                                links: graph.links,
                                categories: categories,
                                roam: true,
                                label: {
                                    normal: {
                                        position: 'right',
                                        formatter: '{b}'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        color: 'source',
                                        curveness: 0.3
                                    }
                                }
                            }
                        ]
                    };

                    myChart.setOption(option);

                })
        }
    }
</script>

<style scoped>

</style>

