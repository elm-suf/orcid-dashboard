<template>
        <v-combobox
                label="Select countries to compare"
                v-model="selectedCountries"
                :items="countries"
                chips
                item-text="name"
                item-value="string"
                clearable multiple hide-selected light solo>
            <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" close @click="select"
                        @click:close="remove(item)">
                    <strong>{{ item.code }} </strong>&nbsp;
                </v-chip>
            </template>
        </v-combobox>
</template>

<script>
    import {mapGetters} from "vuex";


    export default {
        name: "combo",
        data() {
            return {
                chips: [],
            }
        },
        beforeCreate() {
            this.$store.dispatch('fetchCountries')
        },
        methods: {
            remove(item) {
                this.chips.splice(this.chips.indexOf(item), 1)
                this.chips = [...this.chips]
            },
        },
        computed: {
            ...
                mapGetters([
                    'countries',
                    chips: 'selectedCountries'
                ]),
        }
    }
</script>

<style scoped>

</style>
