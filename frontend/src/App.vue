<template>
    <div id="app">
        <md-toolbar md-elevation="0">
            <md-button
                class="md-icon-button"
                v-if="isLoggedIn"
                @click="openSidebar()"
            >
                <md-icon>menu</md-icon>
            </md-button>
            <div v-if="!isLoggedIn">
                <md-button to="/registration" class="md-primary"
                    >Regisztráció</md-button
                >
                <md-button to="/login" class="md-primary">Belépés</md-button>
            </div>
        </md-toolbar>
        <div class="content">
            <router-view />
        </div>
        <md-snackbar
            :md-position="'center'"
            :md-duration="3000"
            md-persistent
            :md-active.sync="show"
            md-closed="onScnackbarClose()"
        >
            <span>{{ getSnackbarError }}</span>
        </md-snackbar>
        <md-drawer
            md-closed="onSidebarClose()"
            :md-active.sync="sidebarOpen"
            md-swipeable
        >
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">Drunk</span>
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>face</md-icon>
                    <router-link to="/auth/profile" class="md-list-item-text"
                        >Profil</router-link
                    >
                </md-list-item>

                <md-list-item>
                    <md-icon>perm_scan_wifi</md-icon>
                    <router-link
                        to="/auth/festivals/list"
                        class="md-list-item-text"
                        >Fesztiválok</router-link
                    >
                </md-list-item>
                <md-list-item v-permission="'Firm'">
                    <md-icon>add</md-icon>
                    <router-link
                        to="/auth/festivals/create"
                        class="md-list-item-text"
                        >Új fesztivál</router-link
                    >
                </md-list-item>
                <md-list-item>
                    <md-icon>perm_scan_wifi</md-icon>
                    <router-link
                        to="/auth/drinks/list"
                        class="md-list-item-text"
                        >Italok</router-link
                    >
                </md-list-item>
                <md-list-item v-permission="'Firm'">
                    <md-icon>add</md-icon>
                    <router-link
                        to="/auth/drinks/create"
                        class="md-list-item-text"
                        >Új ital</router-link
                    >
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    > .content {
        flex: 1;
        display: flex;
        > * {
            flex: 1;
        }
    }
}
</style>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'App',
    data: () => ({
        show: false,
        sidebarOpen: false
    }),
    methods: {
        onScnackbarClose() {
            return this.$store.dispatch('closedSnackbar');
        },
        onSidebarClose() {
            return this.$store.dispatch('closeSidebar');
        },
        openSidebar() {
            return this.$store.dispatch('openSidebar');
        }
    },
    mounted() {
        this.$store.subscribeAction({
            after: action => {
                if (action.type === 'openSnackbar') {
                    this.$data.show = true;
                }
                if (action.type === 'openSidebar') {
                    this.$data.sidebarOpen = true;
                }
                if (action.type === 'closeSidebar') {
                    this.$data.sidebarOpen = false;
                }
            }
        });
    },
    computed: {
        getSnackbarError() {
            return this.$store.getters.getSnackbarError;
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedin;
        }
    }
})
export default class App extends Vue {}
</script>
