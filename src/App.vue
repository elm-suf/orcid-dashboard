<template>
    <v-app id="inspire">
        <v-navigation-drawer app v-model="drawer">
            <v-list dense>
                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="about">
                    <v-list-item-action>
                        <v-icon>bubble_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Chord
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="line">
                    <v-list-item-action>
                        <!--                        <i class="fas fa-chart-line"></i>-->
                        <v-icon>fas fa-chart-line</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Line
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="map">
                    <v-list-item-action>
                        <!--                        <i class="fas fa-globe-africa"></i>-->
                        <v-icon>fas fa-globe</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            MapComponent
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="choroplet">
                    <v-list-item-action>
                        <v-icon>map</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Choropleth
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="race">
                    <v-list-item-action>
                        <v-icon>bar_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            RaceChart
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="dashboard">
                    <v-list-item-action>
                        <v-icon>bar_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Dashboard
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
                dense
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <!--            <v-toolbar-title>Application</v-toolbar-title>-->
        </v-app-bar>

        <v-content style="overflow: hidden ">
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
            drawer: null,
        }),
    }
</script>
