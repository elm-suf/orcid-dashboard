<template>
    <v-app>
        <v-content>

            <!-- Provides the application the proper gutter -->

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
