<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-flex xs12>
                <ve-bar :data="chartData"></ve-bar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters([
                'chartData'
            ])
        },
    };
</script>
