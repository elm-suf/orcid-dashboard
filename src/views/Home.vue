<template>
    <v-layout align-centerjustify-center>


        <v-layout wrap justify-center>
            <v-flex xs6 md4>
                <v-combobox
                        v-model="selected"
                        @change="changed"
                        :items="countries"
                        label="Select a favorite activity or create a new one"
                ></v-combobox>
            </v-flex>
            <v-flex xs12>
                <HeatMap></HeatMap>
            </v-flex>
            <v-flex xs12>
                <BarChart v-if="selectedCountry"/>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    // @ is an alias to /src
    import BarChart from "../components/BarChart";
    import HeatMap from "../components/HeatMap";
    import {mapGetters, mapState} from "vuex";

    export default {
        name: 'home',
        components: {
            BarChart,
            HeatMap
        },
        data() {
            return {
                chartData: {
                    columns: ["c2", "in", "out"],
                },
                selected: ''
            }
        },
        beforeCreate() {
            this.$store.dispatch('fetchCountries')
            this.$store.dispatch('fetchMigrations')
        },
        computed: {
            ...mapState([]),
            ...mapGetters([
                'selectedCountry',
                'countries'
            ])
        },
        methods: {
            changed() {
                console.log('Change', this.selected)
                this.$store.dispatch('updateCurrent', this.selected)
            }
        },
        created() {

        }
    }
</script>
