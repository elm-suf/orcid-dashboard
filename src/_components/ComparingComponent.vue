<template>
    <v-combobox
            label="Select countries to compare"
            v-model="selectedCountries"
            :items="countries"
            item-text="name"
            item-value="string"
            clearable multiple hide-selected light solo>
        <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(item)">
                <strong>{{ item.alpha3 }} </strong>&nbsp;
            </v-chip>
        </template>
    </v-combobox>
</template>

<script>
    import {mapGetters, mapState} from "vuex";


    export default {
        name: "combo",
        data() {

        },
        beforeCreate() {
            this.$store.dispatch('fetchCountries')
        },
        methods: {
            remove(item) {
                this.$store.dispatch('deselect', item)
            },
        },
        computed: {
            selectedCountries: {
                get() {
                    return this.$store.state.selectedCountries
                },
                set(value) {
                    this.$store.dispatch('selectCountry', value[value.length - 1])
                },

            },
            ...
                mapGetters([
                    'countries',
                ]),
        }
    }
</script>

<style scoped>

</style>
