<template>
    <v-app>
        <v-content>


                <!-- If using vue-router -->
                <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        props: {
            source: String,
        },

        data: () => ({
            drawer: false,
        }),
    }
</script>

<style>
    body, html {
        height: 100vh;
        overflow: hidden;
    }
</style>
