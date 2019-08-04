<template>
    <v-container>
        <h1>{{params}}</h1>
        <v-layout
                text-center
                wrap
        >
            <v-flex xs12>
                <ve-bar :data="chartData"></ve-bar>
            </v-flex>
        </v-layout>

        <p>{{inAndOut}}</p>
    </v-container>
</template>

<script>
    import {inAndOutFromC1} from "../apollo/queries";

    export default {
        props: ['params'],
        data() {
            return {
                chartData: {
                    columns: ['c2','in','out'],
                    rows: []
                }
            }
        },
        beforeCreate() {
            this.$store.dispatch('fetchInAndOutFromC1', this.params)
        },
        computed: {
            inAndOut() {
                return this.$store.state.inAndOut
            },
        },
        watch:{
            params: function (val) {
                this.$store.dispatch('fetchInAndOutFromC1', val)
                this.chartData.rows= this.inAndOut
            }
        },
        created() {
            this.chartData.rows= this.inAndOut
        }
    };
</script>
