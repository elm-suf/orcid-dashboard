<template>
    <div class="home">
        <v-flex xs12>
            <v-combobox
                    v-model="selected"
                    @change="changed"
                    :items="countries"
                    label="Select a favorite activity or create a new one"
            ></v-combobox>
        </v-flex>
        {{selected}}
        {{selectedCountry}}
        <HeatMap></HeatMap >
        <BarChart v-if="selected"/>
    </div>
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
        },
        computed: {
            ...mapState([
                'countries'
            ]),
            ...mapGetters([
                'selectedCountry'
            ])
        },
        methods: {
            changed() {
                console.log('Change', this.selected)
                this.$store.dispatch('updateCurrent', this.selected)
                this.$store.dispatch('fetchInAndOutFromC1')
            }
        },
        created() {

        }
    }
</script>
