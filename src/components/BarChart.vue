<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-flex xs12>
                <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
            </v-flex>

            <v-btn @click="changeSome('in')">IN</v-btn>
            <v-btn @click="changeSome('out')">OUT</v-btn>
            <p>{{chartSettings}}</p>
        </v-layout>
    </v-container>
</template>

<script>


    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                chartSettings: {
                    stack: {
                        'x': ['in', 'out']
                    },
                    metrics: ['in', 'out'],
                    dataOrder: {
                        label: 'in',
                        order: 'desc'
                    }
                }
            }
        },
        computed: {
            ...
                mapGetters([
                    'chartData'
                ])
        },
        methods: {
            changeSome(val) {
                console.log('OK');
                this.chartSettings.dataOrder.label = val
                let order = val === 'in' ? 'desc' : 'asc'
                this.chartSettings.dataOrder.order = order
            }
        }
    }
    ;
</script>
