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
                        <v-icon>contact_mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            About
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="race">
                    <v-list-item-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            RaceChart
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container fill-height fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer app color="indigo">
            <span class="white--text">&copy; 2019</span>
        </v-footer>
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
