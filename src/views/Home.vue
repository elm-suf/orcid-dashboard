<template>
    <div class="home">
        <v-flex xs12>
            <v-combobox
                    v-model="selected"
                    :items="countries"
                    label="Select a favorite activity or create a new one"
            ></v-combobox>
        </v-flex>

        <BarChart  :params="selected" v-if="selected"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import BarChart from "../components/BarChart";

    export default {
        name: 'home',
        components: {
            BarChart
        },
        data() {
            return {
                chartData: {
                    columns: ["c2", "in", "out"],
                    rows: this.$store.state.inAndOut
                },
                selected: ''
            }
        },
        beforeCreate() {
            this.$store.dispatch('fetchCountries')
        },
        computed: {
            countries() {
                return this.$store.state.countries
            }
        },
        created() {

        }
    }
</script>
