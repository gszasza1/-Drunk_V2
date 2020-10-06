<template>
    <div id="app">
        <md-toolbar md-elevation="0">
            <md-button to="/registration" class="md-primary"
                >Regisztráció</md-button
            >
            <md-button to="/login" class="md-primary">Bejelentkezés</md-button>
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
            <md-button class="md-primary" @click="showSnackbar = false"
                >Retry</md-button
            >
        </md-snackbar>
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
        show: false
    }),

    methods: {
        onScnackbarClose() {
            return this.$store.dispatch('closedSnackbar');
        }
    },
    created() {
        this.$store.subscribeAction({
            after: (action, state) => {
                if (action.type === 'openSnackbar') {
                    this.$data.show = true;
                }
            }
        });
    },
    computed: {
        getSnackbarError() {
            return this.$store.getters.getSnackbarError;
        }
    }
})
export default class App extends Vue {}
</script>
