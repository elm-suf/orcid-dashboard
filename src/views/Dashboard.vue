<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" style="background: red">
                <v-row align="start">
                    <combo></combo>
                </v-row>
                <v-row align="start">
                    <v-col cols="6" align-self="center" style="background: red">
                        <map-component>
                        </map-component>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>


</template>

<script>
    import Combo from "../_components/ComparingComponent";
    import MapComponent from "../components/MapComponent";

    export default {
        name: "Dashboard",
        components: {MapComponent, Combo}
    }
</script>

<style scoped>

</style>
